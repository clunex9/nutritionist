import { cookies } from 'next/headers'
import type { User } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { connection } from 'next/server'

export async function getServerUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value

    if (!token) return null

    await connection()

    const payload = await getPayload({ config: configPromise })

    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    })

    return (user as User) || null
  } catch (error: any) {
    if (error && error.digest === 'DYNAMIC_SERVER_USAGE') {
      throw error
    }
    return null
  }
}
