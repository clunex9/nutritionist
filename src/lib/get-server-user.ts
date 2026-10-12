import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { User } from '@/payload-types'

export async function getServerUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value

    if (!token) return null

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

// import { cookies } from 'next/headers'
// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import type { User } from '@/payload-types'

// export type ServerAuthResult =
//   | { status: 'authenticated'; user: User }
//   | { status: 'unauthenticated' } // token nahi hai, ya invalid/expired hai
//   | { status: 'error' } // DB/Payload/server failure, token ka kasoor nahi

// export async function getServerAuth(): Promise<ServerAuthResult> {
//   try {
//     const cookieStore = await cookies()
//     const token = cookieStore.get('payload-token')?.value

//     if (!token) return { status: 'unauthenticated' }

//     const payload = await getPayload({ config: configPromise })

//     const { user } = await payload.auth({
//       headers: new Headers({
//         Authorization: `JWT ${token}`,
//       }),
//     })

//     // Payload ne khud bola ki is token ka koi valid user nahi
//     if (!user) return { status: 'unauthenticated' }

//     return { status: 'authenticated', user: user as User }
//   } catch (error: any) {
//     // Next.js ka internal signal hai, isko aage jane do
//     if (error && error.digest === 'DYNAMIC_SERVER_USAGE') {
//       throw error
//     }
//     // Yahan cookie delete NAHI hogi, sirf error state return hogi
//     console.error('[getServerAuth] verify failed:', error)
//     return { status: 'error' }
//   }
// }

// // Purani jagah jahan sirf user chahiye, wahan ye same chalta rahega
// export async function getServerUser(): Promise<User | null> {
//   const auth = await getServerAuth()
//   return auth.status === 'authenticated' ? auth.user : null
// }
