import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { REDIRECT_URL_MAP } from './constants/redirect-url-map'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

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
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/account/profile', request.url))
  }

  // 4️⃣ Default
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!(?:api|trpc)(?:/|$)|(?:_next|_vercel)/|\\.well-known/|.*\\.(?:ico|png|jpe?g|gif|svg|webp|avif|bmp|css|m?js|map|woff2?|ttf|otf|eot|txt|xml|json|webmanifest|pdf|md|mp4|webm|mp3|wav|ogg|zip|wasm)$).*)',
  ],
}
