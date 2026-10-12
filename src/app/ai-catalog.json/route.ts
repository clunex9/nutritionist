import { NextResponse } from 'next/server'

// Yeh line Vercel ko batati hai ki is route ko kabhi cache nahi karna hai
export const dynamic = 'force-dynamic'

export async function GET() {
  return new NextResponse(
    JSON.stringify({
      version: '1.0',
      resources: [],
    }),
    {
      status: 200,
      headers: {
        // Strict JSON headers aur Cache-Control
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    },
  )
}
