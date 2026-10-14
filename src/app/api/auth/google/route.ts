import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSafeCallbackUrl } from '@/lib/safe-redirect'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const callbackUrl = getSafeCallbackUrl(searchParams.get('callbackUrl'), '/account/profile')

  const clientId = process.env.GOOGLE_CLIENT_ID
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')
  const redirectUri = `${appUrl}/api/auth/google/callback`

  // 🔒 CSRF Token generate karo
  const csrfToken = crypto.randomBytes(16).toString('hex')
  const statePayload = JSON.stringify({ csrfToken, callbackUrl })
  const encodedState = Buffer.from(statePayload).toString('base64url')

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authUrl.searchParams.append('client_id', clientId!)
  authUrl.searchParams.append('redirect_uri', redirectUri)
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('scope', 'openid email profile')
  authUrl.searchParams.append('prompt', 'select_account')
  authUrl.searchParams.append('state', encodedState)

  const response = NextResponse.redirect(authUrl.toString())

  response.cookies.set('google_oauth_state', csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 10 * 60, // 10 minutes
  })

  return response
}
