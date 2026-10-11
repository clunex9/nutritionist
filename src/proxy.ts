import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { REDIRECT_URL_MAP } from './constants/redirect-url-map'

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // 1️⃣ Redirect url Map
  if (REDIRECT_URL_MAP[pathname]) {
    return NextResponse.redirect(new URL(REDIRECT_URL_MAP[pathname], request.url))
  }

  // 2️⃣ Auth Token Check
  // Payload CMS by default 'payload-token' cookie use karta hai.
  const token = request.cookies.get('payload-token')?.value

  // Routes check karne ke liye boolean flags
  const isAuthRoute = pathname.startsWith('/auth')
  const isAccountRoute = pathname.startsWith('/account')

  // 3️⃣ Route Protection Logic
  // Condition A: Agar user logged in NAHI hai aur '/account' access karna chahta hai -> Redirect to Sign In
  if (!token && isAccountRoute) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname) // UX Improvement: Login ke baad wapas yahi aayega
    return NextResponse.redirect(signInUrl)
  }

  // Condition B: Agar user logged in HAI aur '/auth' (signin/signup) access karna chahta hai -> Redirect to Account/Profile
  if (token && isAuthRoute && searchParams.get('reason') !== 'expired') {
    return NextResponse.redirect(new URL('/account/profile', request.url))
  }

  // 4️⃣ Default
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
