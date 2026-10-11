import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const rawCallbackUrl = searchParams.get('callbackUrl') || '/account/profile'

  // Open Redirect Defense
  const isSafeUrl = rawCallbackUrl.startsWith('/') && !rawCallbackUrl.startsWith('//')
  const callbackUrl = isSafeUrl ? rawCallbackUrl : '/account/profile'

  const clientId = process.env.GOOGLE_CLIENT_ID
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')
  const redirectUri = `${appUrl}/api/auth/google/callback`

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authUrl.searchParams.append('client_id', clientId!)
  authUrl.searchParams.append('redirect_uri', redirectUri)
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('scope', 'openid email profile')
  authUrl.searchParams.append('prompt', 'select_account')
  authUrl.searchParams.append('state', callbackUrl)

  return NextResponse.redirect(authUrl.toString())
}
