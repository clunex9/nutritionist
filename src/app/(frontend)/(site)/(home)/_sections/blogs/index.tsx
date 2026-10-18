// Payload API imports
import { unstable_cache } from 'next/cache' // 🔥 Cache import kiya
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Types
import type { Blog } from '@/payload-types'

// Client Component Import
import BlogsClient from './blogs-client'

// 🔥 Caching Logic
const getCachedLatestBlogs = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'blogs',
      depth: 1,
      limit: 4,
      sort: '-createdAt',
      select: {
        title: true,
        category: true,
        description: true,
        image: true,
        author: true,
        createdAt: true,
        readTime: true,
      },
    })

    return docs as unknown as Blog[]
  },
  ['home-latest-blogs-cache'], // 🔥 Unique Key
  {
    tags: ['blogs'], // 🔥 Tag jo aapke Payload hook ('blogs') se match karta hai
  },
)

export default async function Blogs() {
  // 🔥 Ab database hit nahi hoga, RAM se data aayega
  const blogs = await getCachedLatestBlogs()

  if (!blogs || blogs.length === 0) return null

  // Data pass to Client Component for GSAP Animations
  return <BlogsClient blogs={blogs} />
}
