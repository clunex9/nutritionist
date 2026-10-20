import { cacheLife, cacheTag } from 'next/cache'
import BlogsClientSection from './blogs-client.section' // 👈 Client UI import kiya
import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function getCachedAllBlogs() {
  'use cache'
  cacheLife('hours')
  cacheTag('blogs')

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'blogs',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
    select: {
      title: true,
      category: true,
      description: true,
      image: true,
    },
  })

  return docs
}

export default async function BlogsPage() {
  const rawBlogs = await getCachedAllBlogs()

  // 🔥 DATA SANITIZATION: Client ko heavy Payload object nahi bhejenge.
  // Isse network payload 80-90% chhota ho jayega!
  const lightweightBlogs = rawBlogs.map((article: any) => {
    const imageObj =
      typeof article.image === 'object' && article.image !== null ? article.image : null

    // Fallback: Pehle chhota card/thumbnail dekho, agar nahi toh full image (Fast load ke liye)
    const imageUrl = imageObj?.url || imageObj?.sizes?.thumbnail?.url || ''

    return {
      id: article.id,
      title: article.title,
      category: article.category,
      description: article.description,
      imageUrl: imageUrl, // Direct string!
    }
  })

  return <BlogsClientSection blogs={lightweightBlogs} />
}
