import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { getSafeCallbackUrl } from '@/lib/safe-redirect'
import crypto from 'crypto'

async function uploadGoogleAvatarToPayload(payload: any, imageUrl: string) {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) return null

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const mimeType = response.headers.get('content-type') || 'image/jpeg'

    const uploadedAvatar = await payload.create({
      collection: 'avatars',
      data: {},
      overrideAccess: true,
      file: {
        data: buffer,
        mimetype: mimeType,
        name: `google-avatar-${Date.now()}.jpg`,
        size: buffer.byteLength,
      },
    })

    return uploadedAvatar.id
  } catch (error) {
    console.error('Failed to upload Google avatar:', error)
    return null
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const code = searchParams.get('code')
  const stateParam = searchParams.get('state')

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')

  // 🔒 1. CSRF State Verify karo
  const storedCsrf = req.cookies.get('google_oauth_state')?.value
  let callbackPath = '/account/profile'

  if (stateParam) {
    try {
      const decoded = JSON.parse(Buffer.from(stateParam, 'base64url').toString('utf-8'))
      if (!storedCsrf || decoded.csrfToken !== storedCsrf) {
        return NextResponse.redirect(`${appUrl}/auth/signin?error=OAuthStateMismatch`)
      }
      callbackPath = getSafeCallbackUrl(decoded.callbackUrl, '/account/profile')
    } catch {
      return NextResponse.redirect(`${appUrl}/auth/signin?error=OAuthStateMismatch`)
    }
  } else {
    return NextResponse.redirect(`${appUrl}/auth/signin?error=OAuthStateMismatch`)
  }

  const redirectTo = `${appUrl}${callbackPath}`

  if (!code) {
    return NextResponse.redirect(`${appUrl}/auth/signin?error=NoCode`)
  }

  try {
    const redirectUri = `${appUrl}/api/auth/google/callback`

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    const tokenData = await tokenRes.json()
    if (!tokenData.access_token) {
      throw new Error(tokenData.error_description || 'Google Token Failed')
    }

    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })
    const googleUser = await userRes.json()

    const userEmail = googleUser.email?.toLowerCase().trim()
    const isEmailVerified = Boolean(googleUser.verified_email ?? googleUser.email_verified)

    if (!userEmail || !isEmailVerified) {
      return NextResponse.redirect(`${appUrl}/auth/signin?error=EmailNotVerified`)
    }

    const highResAvatar = googleUser.picture
      ? googleUser.picture.replace('=s96-c', '=s400-c')
      : undefined

    const secureRandomPassword = crypto.randomBytes(32).toString('hex') + 'A1!@#'
    const payload = await getPayload({ config: configPromise })

    const existingUsers = await payload.find({
      collection: 'users',
      where: { email: { equals: userEmail } },
      limit: 1,
      overrideAccess: true,
    })

    if (existingUsers.docs.length > 0) {
      const user = existingUsers.docs[0]

      if (user.authProvider === 'email') {
        return NextResponse.redirect(`${appUrl}/auth/signin?error=AccountExistsWithEmail`)
      }

      let currentAvatarId = typeof user.avatar === 'object' ? user.avatar?.id : user.avatar
      if (!currentAvatarId && highResAvatar) {
        currentAvatarId = await uploadGoogleAvatarToPayload(payload, highResAvatar)
      }

      await payload.update({
        collection: 'users',
        id: user.id,
        overrideAccess: true,
        data: {
          password: secureRandomPassword,
          avatar: currentAvatarId || undefined,
          name: user.name || googleUser.name,
          _verified: true,
          loginAttempts: 0,
          lockUntil: null,
        },
      })
    } else {
      let newAvatarId = null
      if (highResAvatar) {
        newAvatarId = await uploadGoogleAvatarToPayload(payload, highResAvatar)
      }

      // 🔥 Payload Native Way: Create ke waqt _verified false hota hai,
      // isliye naya user create hone ke turant baad update karke _verified: true karna zaroori hai.
      const newUser = await payload.create({
        collection: 'users',
        overrideAccess: true,
        data: {
          email: userEmail,
          name: googleUser.name || 'User',
          avatar: newAvatarId || undefined,
          password: secureRandomPassword,
          authProvider: 'google',
        },
      })

      await payload.update({
        collection: 'users',
        id: newUser.id,
        overrideAccess: true,
        data: {
          _verified: true,
          _verificationToken: null,
        },
      })
    }

    const loginResult = await payload.login({
      collection: 'users',
      data: {
        email: userEmail,
        password: secureRandomPassword,
      },
    })

    if (!loginResult.token) {
      throw new Error('Payload Login Failed')
    }

    const maxAge = loginResult.exp
      ? Math.floor(loginResult.exp - Date.now() / 1000)
      : 30 * 24 * 60 * 60

    const isProduction = process.env.NODE_ENV === 'production'
    const isLocalhost = appUrl.startsWith('http://localhost')

    const finalRedirectUrl = new URL(redirectTo)
    const response = NextResponse.redirect(finalRedirectUrl.toString())

    response.cookies.delete('google_oauth_state')

    response.cookies.set({
      name: 'payload-token',
      value: loginResult.token,
      path: '/',
      httpOnly: true,
      secure: isProduction && !isLocalhost,
      sameSite: 'lax',
      maxAge,
    })

    revalidatePath('/', 'layout')
    return response
  } catch (error) {
    console.error('Google OAuth Error:', error)
    return NextResponse.redirect(`${appUrl}/auth/signin?error=OAuthFailed`)
  }
}
