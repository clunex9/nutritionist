'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { getServerUser } from '@/lib/get-server-user'

// 👉 1. Login Action
export async function loginAction(data: { email: string; password: string }) {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.login({
      collection: 'users',
      data,
    })

    if (!result.token) throw new Error('Login failed')

    const maxAge = result.exp ? Math.floor(result.exp - Date.now() / 1000) : 30 * 24 * 60 * 60

    // Next.js ke cookies mein token set karna
    const cookieStore = await cookies()
    cookieStore.set('payload-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    })

    revalidatePath('/', 'layout') // Poori app ko naya user state dikhane ke liye
    return { success: true, user: result.user }
  } catch (error: any) {
    return { success: false, error: error.message || 'Invalid credentials' }
  }
}

// 👉 2. Register Action
export async function registerAction(data: any) {
  try {
    const payload = await getPayload({ config: configPromise })

    // User create karo
    const result = await payload.create({
      collection: 'users',
      data,
    })

    // Register ke baad turant login karwana hai toh:
    const loginResult = await payload.login({
      collection: 'users',
      data: { email: data.email, password: data.password },
    })

    if (loginResult.token) {
      const maxAge = loginResult.exp
        ? Math.floor(loginResult.exp - Date.now() / 1000)
        : 30 * 24 * 60 * 60
      const cookieStore = await cookies()
      cookieStore.set('payload-token', loginResult.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge,
      })
    }

    revalidatePath('/', 'layout')
    return { success: true, user: result }
  } catch (error: any) {
    return { success: false, error: error.message || 'Registration failed' }
  }
}

// 👉 3. Logout Action
export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('payload-token') // Cookie delete karte hi user logout

  revalidatePath('/', 'layout') // Navbar waghera refresh karne ke liye
  return { success: true }
}

// 👉 Reset Password Action
export async function resetPasswordAction(data: { token: string; password: string }) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Payload ka native resetPassword function call karein
    const result = await payload.resetPassword({
      collection: 'users',
      data, // Isme token aur naya password dono jayenge
      overrideAccess: true,
    })

    const authResult = result as typeof result & { exp?: number }
    // Reset hone ke baad agar Payload token deta hai, toh user ko auto-login kar do
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

// 👉 Forgot Password Action
export async function forgotPasswordAction(data: { email: string }) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Payload ka native forgotPassword function
    await payload.forgotPassword({
      collection: 'users',
      data,
      // disableEmailTemplate: false, // Make sure ki email send ho
    })

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to send reset link.' }
  }
}

// 👉 Profile Update Action (Handles Image Upload directly to Payload)
export async function updateProfileAction(formData: FormData) {
  try {
    // 1. 🔒 Authentication Check (Yahan secure karo)
    const user = await getServerUser()
    if (!user) {
      return { success: false, error: 'Unauthorized. Please log in.' }
    }

    const payload = await getPayload({ config: configPromise })

    const name = formData.get('name') as string
    const gender = formData.get('gender') as string
    const avatarFile = formData.get('avatar') as File | null
    const removeAvatar = formData.get('removeAvatar') === 'true'

    let avatarId = undefined

    // 2. Avatar Upload Logic
    if (avatarFile && avatarFile.size > 0) {
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

    // 3. Data prepare karo
    const updateData: any = { name, gender }

    if (avatarId) {
      updateData.avatar = avatarId
    } else if (removeAvatar) {
      updateData.avatar = null
    }

    // 4. Update karo (user.id server se mil raha hai, toh 100% safe hai)
    await payload.update({
      collection: 'users',
      id: user.id, // 🔥 Trusted ID from server session
      data: updateData,
    })

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update profile' }
  }
}
