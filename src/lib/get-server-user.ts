import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { User } from '@/payload-types'

export async function getServerUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    // Explicitly token cookie read karein
    const token = cookieStore.get('payload-token')?.value

    if (!token) return null

    const payload = await getPayload({ config: configPromise })

    // Token ko Authorization header mein manually pass karein
    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    })

    return (user as User) || null
  } catch (error: any) {
    // Next.js redirect/not-found errors ko throw hone dein
    if (error && error.digest === 'DYNAMIC_SERVER_USAGE') {
      throw error
    }
    // console.error('Error fetching server-side user:', error)
    return null
  }
}
