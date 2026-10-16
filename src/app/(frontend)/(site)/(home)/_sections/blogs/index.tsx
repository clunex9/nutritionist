// Payload API imports
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'

// Types
import type { Blog } from '@/payload-types'

// Client Component Import
import BlogsClient from './blogs-client' // Apne path ke hisab se adjust karein

export default async function Blogs() {
  const payload = await getPayload({ config: configPromise })

  // 1. Home page ke liye sirf Latest 4 blogs fetch karein
  const { docs: blogs } = (await payload.find({
    collection: 'blogs',
    depth: 2,
    limit: 4,
    sort: '-createdAt',
  })) as unknown as { docs: Blog[] }

  // 2. User Auth Check
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  let userId = null
  let userFavoriteBlogsIds: string[] = []
  let userBookmarkBlogsIds: string[] = []

  if (token) {
    try {
      const { user } = await payload.auth({
        headers: new Headers({ Authorization: `JWT ${token}` }),
      })
      userId = user?.id || null

      if (userId) {
        const displayedBlogIds = blogs.map((b) => b.id)

        const [userFavs, userBooks] = await Promise.all([
          payload.find({
            collection: 'favorites',
            where: {
              and: [{ user: { equals: userId } }, { blog: { in: displayedBlogIds } }],
            },
            depth: 0,
            pagination: false,
          }),
          payload.find({
            collection: 'bookmarks',
            where: {
              and: [{ user: { equals: userId } }, { blog: { in: displayedBlogIds } }],
            },
            depth: 0,
            pagination: false,
          }),
        ])

        userFavoriteBlogsIds = userFavs.docs
          .map((fav: Record<string, any>) =>
            typeof fav.blog === 'string' ? fav.blog : fav.blog?.id,
          )
          .filter(Boolean) as string[]

        userBookmarkBlogsIds = userBooks.docs
          .map((book: Record<string, any>) =>
            typeof book.blog === 'string' ? book.blog : book.blog?.id,
          )
          .filter(Boolean) as string[]
      }
    } catch (e) {
      console.error('Failed to authenticate user in Blogs.tsx')
    }
  }

  if (!blogs || blogs.length === 0) return null

  // Data pass to Client Component for GSAP Animations
  return (
    <BlogsClient
      blogs={blogs}
      userFavoriteBlogsIds={userFavoriteBlogsIds}
      userBookmarkBlogsIds={userBookmarkBlogsIds}
    />
  )
}
