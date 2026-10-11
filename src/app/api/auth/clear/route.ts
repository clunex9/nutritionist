import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL('/auth/signin', request.url)
  url.searchParams.set('reason', 'expired')

  const response = NextResponse.redirect(url)
  // Cookie seedha response pe delete karo, redirect ke sath pakka jayegi
  response.cookies.delete('payload-token')

  return response
}
