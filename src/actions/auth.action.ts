'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { getServerUser } from '@/lib/get-server-user'
import crypto from 'crypto'
import { resendVerificationTemplate } from '@/templates/resend-verification.template'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_AVATAR_SIZE = 2 * 1024 * 1024 // 2MB

// 👉 1. Login Action
export async function loginAction(data: { email: string; password: string }) {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.login({
      collection: 'users',
      data: {
        email: data.email.toLowerCase().trim(),
        password: data.password,
      },
    })

    if (!result.token) throw new Error('Login failed')

    const maxAge = result.exp ? Math.floor(result.exp - Date.now() / 1000) : 30 * 24 * 60 * 60

    const cookieStore = await cookies()
    cookieStore.set('payload-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    })

    revalidatePath('/', 'layout')
    return { success: true, user: result.user }
  } catch (error: any) {
    return { success: false, error: error.message || 'Invalid credentials' }
  }
}

// 👉 2. Register Action
export async function registerAction(
  data: { name: string; email: string; password: string },
  callbackUrl: string,
) {
  try {
    const payload = await getPayload({ config: configPromise })

    // 🔒 Security Fix: Sirf name, email, password pass karo (taaki koi 'roles' inject na kar sake)
    await payload.create({
      collection: 'users',
      data: {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password,
      },
    })

    const isSafeUrl = callbackUrl.startsWith('/') && !callbackUrl.startsWith('//')
    const safeCallbackUrl = isSafeUrl ? callbackUrl : '/account/profile'

    const cookieStore = await cookies()
    cookieStore.set('pending-callback-url', safeCallbackUrl, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours (cleanup timer ke barabar)
    })

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Registration failed' }
  }
}

// 👉 3. Logout Action
export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('payload-token')

  revalidatePath('/', 'layout')
  return { success: true }
}

// 👉 4. Reset Password Action
export async function resetPasswordAction(data: { token: string; password: string }) {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.resetPassword({
      collection: 'users',
      data,
      overrideAccess: true,
    })

    const authResult = result as typeof result & { exp?: number }
    if (authResult.token) {
      const maxAge = authResult.exp
        ? Math.floor(authResult.exp - Date.now() / 1000)
        : 30 * 24 * 60 * 60
      const cookieStore = await cookies()
      cookieStore.set('payload-token', authResult.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge,
      })
    }

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Password reset failed or token expired' }
  }
}

// 👉 5. Forgot Password Action
export async function forgotPasswordAction(data: { email: string }) {
  try {
    const payload = await getPayload({ config: configPromise })

    await payload.forgotPassword({
      collection: 'users',
      data: { email: data.email.toLowerCase().trim() },
      overrideAccess: true,
    })

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to send reset link.' }
  }
}

// 👉 6. Verify Email Action (100% Native - First time aur Resend dono tokens handle karta hai)
export async function verifyEmailAction(token: string) {
  try {
    const payload = await getPayload({ config: configPromise })

    const cookieStore = await cookies()
    const storedCallbackUrl = cookieStore.get('pending-callback-url')?.value
    const destination = storedCallbackUrl || '/account/profile'

    // ✅ Payload natively '_verificationToken' match karke '_verified: true' set karta hai
    const isVerified = await payload.verifyEmail({
      collection: 'users',
      token: token.trim(),
    })

    if (!isVerified) {
      throw new Error('Verification failed. Token might be invalid or expired.')
    }

    cookieStore.delete('pending-callback-url')
    return { success: true, callbackUrl: destination }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Verification failed. Token might be invalid or expired.',
    }
  }
}

// 👉 7. Resend Verification Action
export async function resendVerificationAction(email: string) {
  try {
    const payload = await getPayload({ config: configPromise })
    const cleanEmail = email.toLowerCase().trim()

    const users = await payload.find({
      collection: 'users',
      where: { email: { equals: cleanEmail } },
      limit: 1,
      overrideAccess: true,
    })

    const user = users.docs[0]

    if (!user) {
      throw new Error('No user found with this email.')
    }

    if (user._verified) {
      throw new Error('This account is already verified.')
    }

    const verificationToken = crypto.randomBytes(20).toString('hex')

    await payload.update({
      collection: 'users',
      id: user.id,
      overrideAccess: true,
      data: {
        _verificationToken: verificationToken,
      },
    })

    const emailHtml = await resendVerificationTemplate({
      token: verificationToken,
      user: user as any,
    })

    await payload.sendEmail({
      to: cleanEmail,
      subject: 'New Verification Link - NUTRITIONIST',
      html: emailHtml,
    })

    return { success: true }
  } catch (error: any) {
    console.error('Resend Error:', error)
    return { success: false, error: error.message || 'Failed to resend email' }
  }
}

// 👉 8. Profile Update Action
export async function updateProfileAction(formData: FormData) {
  let avatarId: string | number | undefined = undefined
  const payload = await getPayload({ config: configPromise })

  try {
    const user = await getServerUser()
    if (!user) {
      return { success: false, error: 'Unauthorized. Please log in.' }
    }

    const name = (formData.get('name') as string)?.trim()
    const gender = formData.get('gender') as 'male' | 'female' | 'other'
    const avatarFile = formData.get('avatar') as File | null
    const removeAvatar = formData.get('removeAvatar') === 'true'

    if (!name || !gender) {
      return { success: false, error: 'Name and gender are required.' }
    }

    if (avatarFile && avatarFile.size > 0) {
      if (!ALLOWED_IMAGE_TYPES.includes(avatarFile.type)) {
        return { success: false, error: 'Only JPG, PNG, WebP, or AVIF images are allowed.' }
      }
      if (avatarFile.size > MAX_AVATAR_SIZE) {
        return { success: false, error: 'Image size must be less than 2MB.' }
      }

      const arrayBuffer = await avatarFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const mediaDoc = await payload.create({
        collection: 'avatars',
        data: {},
        file: {
          data: buffer,
          name: avatarFile.name,
          mimetype: avatarFile.type,
          size: avatarFile.size,
        },
      })
      avatarId = mediaDoc.id
    }

    const updateData: Record<string, any> = { name, gender }

    if (avatarId) {
      updateData.avatar = avatarId
    } else if (removeAvatar) {
      updateData.avatar = null
    }

    await payload.update({
      collection: 'users',
      id: user.id,
      data: updateData,
    })

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (error: any) {
    // Agar user update fail ho jaye toh newly uploaded avatar rollback kar do
    if (avatarId) {
      await payload.delete({ collection: 'avatars', id: avatarId }).catch(() => {})
    }
    return { success: false, error: error.message || 'Failed to update profile' }
  }
}
