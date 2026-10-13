import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

// ✅ Helper function: Google se image download karke Payload me upload karne ke liye
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
  const state = searchParams.get('state')

  // 🔥 Fix 1: appUrl ko top par nikal liya taaki URL banane mein crash na ho
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')

  const rawRedirect = state ? decodeURIComponent(state) : '/account/profile'
  const isSafeRedirect = rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
  const redirectTo = isSafeRedirect ? `${appUrl}${rawRedirect}` : `${appUrl}/account/profile`

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

    const userEmail = googleUser.email?.toLowerCase()
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
    })

    if (existingUsers.docs.length > 0) {
      const user = existingUsers.docs[0]

      // 🛡️ NATIVE RULE: Agar manual email user hai toh block karo
      if (user.authProvider === 'email') {
        return NextResponse.redirect(`${appUrl}/auth/signin?error=AccountExistsWithEmail`)
      }

      // ✅ Agar user ke paas pehle se avatar nahi hai, tabhi naya download karo (Duplicate uploads rokne ke liye)
      let currentAvatarId = typeof user.avatar === 'object' ? user.avatar?.id : user.avatar
      if (!currentAvatarId && highResAvatar) {
        currentAvatarId = await uploadGoogleAvatarToPayload(payload, highResAvatar)
      }

      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          password: secureRandomPassword,
          avatar: currentAvatarId || undefined, // 👈 'googleAvatar' field hata kar direct 'avatar' use kiya
          name: user.name || googleUser.name,
        },
      })
    } else {
      // ✅ Naya User: Photo download karo aur ID link karo
      let newAvatarId = null
      if (highResAvatar) {
        newAvatarId = await uploadGoogleAvatarToPayload(payload, highResAvatar)
      }

      const newUser = await payload.create({
        collection: 'users',
        data: {
          email: userEmail,
          name: googleUser.name || 'User',
          avatar: newAvatarId || undefined, // 👈 Uploaded image ki ID
          password: secureRandomPassword,
          roles: ['subscriber'],
          authProvider: 'google',
        },
      })

      // 2. 🔥 FIX: Create hone ke turant baad explicitly _verified true karo
      await payload.update({
        collection: 'users',
        id: newUser.id,
        overrideAccess: true,
        data: {
          _verified: true,
        },
      })
    }

    // 🚀 NATIVE PAYLOAD LOGIN
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

    // ✅ THE LOOP FIX: Naya response object banaya aur cookie directly is par set ki
    const response = NextResponse.redirect(redirectTo)

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
