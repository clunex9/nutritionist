import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { REDIRECT_URL_MAP } from './constants/redirect-url-map'

// Helper: JWT token ki expiration safely check karne ke liye (Edge compatible)
function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return true
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'))
    if (!payload.exp) return false
    // Current time seconds me (Date.now() ms me hota hai)
    return Date.now() >= payload.exp * 1000
  } catch {
    return true // Agar decode na ho sake toh invalid maan lo
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1️⃣ Redirect url Map
  if (REDIRECT_URL_MAP[pathname]) {
    return NextResponse.redirect(new URL(REDIRECT_URL_MAP[pathname], request.url))
  }

  const tokenCookie = request.cookies.get('payload-token')
  const token = tokenCookie?.value

  // 🔒 Token Expired/Invalid check
  const hasValidToken = token ? !isTokenExpired(token) : false

  const isAuthRoute = pathname.startsWith('/auth')
  const isAccountRoute = pathname.startsWith('/account')

  // 3️⃣ Route Protection Logic
  // Condition A: Agar token nahi hai YA token expire ho chuka hai aur user '/account' par jana chahta hai
  if (!hasValidToken && isAccountRoute) {
    const signInUrl = new URL('/auth/signin', request.url)
    if (pathname !== '/account/profile') {
      signInUrl.searchParams.set('callbackUrl', pathname)
    }

    const response = NextResponse.redirect(signInUrl)

    // 🧹 Infinite Loop Prevention: Agar purani kharab/expired cookie padi hai toh use yhi uda do!
    if (token) {
      response.cookies.delete('payload-token')
    }
    return response
  }

  // Condition B: Agar valid token HAI aur user '/auth' (signin/signup) par jana chahta hai
  if (hasValidToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/account/profile', request.url))
  }

  // ✅ FIX: Agar invalid/expired token ke sath user kisi bhi route (Public ya Auth) par hai, toh cookie delete karo
  const response = NextResponse.next()
  if (token && !hasValidToken) {
    response.cookies.delete('payload-token')
  }

  return response
}

export const config = {
  matcher: [
    '/((?!(?:api|trpc)(?:/|$)|(?:_next|_vercel)/|\\.well-known/|.*\\.(?:ico|png|jpe?g|gif|svg|webp|avif|bmp|css|m?js|map|woff2?|ttf|otf|eot|txt|xml|json|webmanifest|pdf|md|mp4|webm|mp3|wav|ogg|zip|wasm)$).*)',
  ],
}
