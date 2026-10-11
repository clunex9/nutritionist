// import { NextResponse } from 'next/server'

// export async function GET(request: Request) {
//   const url = new URL('/auth/signin', request.url)
//   url.searchParams.set('reason', 'expired')

//   const response = NextResponse.redirect(url)
//   // Cookie seedha response pe delete karo, redirect ke sath pakka jayegi
//   response.cookies.delete('payload-token')

//   return response
// }

import { NextResponse } from 'next/server'

// Ye route sirf tab hit hona chahiye jab account layout ne confirm kiya ho
// ki token sach me invalid ya expired hai (network/DB error me nahi).
export async function GET(request: Request) {
  const url = new URL('/auth/signin', request.url)
  url.searchParams.set('reason', 'expired')

  const response = NextResponse.redirect(url)

  // Cookie seedha response pe delete karo, redirect ke sath pakka jayegi.
  // Agar Payload me custom cookiePrefix ya domain set hai to yahan wahi use karo.
  response.cookies.delete('payload-token')
  response.headers.set('Cache-Control', 'no-store')

  return response
}
