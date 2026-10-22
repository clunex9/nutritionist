'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Where } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'
import type { Blog, BlogImage, User, Avatar as AvatarType } from '@/payload-types'

export async function fetchHomePaginatedBlogs(page = 1, limit = 2) {
  // 🔥 NEXT.JS 16 CACHING MAGIC (Bas ye 3 lines add karni hain)
  'use cache'
  cacheLife('hours')
  cacheTag(`home-blogs-${page}`)
  cacheTag('home-blogs-all')

  // 👇 Aapka original code yahan se shuru hota hai
  // await connection()

  const payload = await getPayload({ config: configPromise })

  const { docs, hasNextPage } = await payload.find({
    collection: 'blogs',
    depth: 2, // Avatar nikalne ke liye 2 chahiye (Best part!)
    page,
    limit,
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

  // Data Sanitization (Ekdum safe aur lightweight)
  const lightweightBlogs = docs.map((rawBlog) => {
    const blog = rawBlog as unknown as Blog // Aapke types

    const coverImage =
      typeof blog.image === 'object' && blog.image !== null ? (blog.image as BlogImage) : null
    const finalCoverImageUrl = coverImage?.url || ''

    const author =
      typeof blog.author === 'object' && blog.author !== null ? (blog.author as User) : null
    const authorAvatar =
      typeof author?.avatar === 'object' && author?.avatar !== null
        ? (author.avatar as AvatarType)
        : null

    const finalAvatarUrl = authorAvatar?.thumbnailURL || authorAvatar?.url || ''
    const initials = author?.name
      ? author.name
          .trim()
          .split(/\s+/)
          .map((n) => n[0])
          .join('')
          .substring(0, 2)
          .toUpperCase()
      : 'U'

    return {
      id: blog.id,
      title: blog.title,
      category: blog.category,
      description: blog.description,
      createdAt: blog.createdAt,
      readTime: blog.readTime || '5 min read',
      coverImageUrl: finalCoverImageUrl,
      authorName: author?.name || 'Anonymous',
      authorAvatarUrl: finalAvatarUrl,
      authorInitials: initials,
    }
  })

  return {
    blogs: lightweightBlogs,
    hasNextPage,
  }
}

export async function fetchPaginatedBlogs(page = 1, limit = 2, category = 'all') {
  // 🔥 1. SERVER CACHING ON
  'use cache'
  cacheLife('hours')
  // Har category aur page ke hisaab se alag cache folder banega
  cacheTag(`blogs-${category}-${page}`)
  cacheTag('blogs-all-categories')

  // 🔥 2. FAKE DYNAMIC CONNECTION HATA DIYA
  // await connection()

  const payload = await getPayload({ config: configPromise })

  const queryWhere: Where | undefined =
    category !== 'all' ? { category: { equals: category } } : undefined

  const { docs, hasNextPage } = await payload.find({
    collection: 'blogs',
    depth: 1,
    page,
    limit,
    sort: '-createdAt',
    where: queryWhere,
    select: {
      title: true,
      category: true,
      description: true,
      image: true,
    },
  })

  const lightweightBlogs = docs.map((article: any) => {
    const imageObj =
      typeof article.image === 'object' && article.image !== null ? article.image : null
    const imageUrl = imageObj?.thumbnailURL || imageObj?.url || ''

    return {
      id: article.id,
      title: article.title,
      category: article.category,
      description: article.description,
      imageUrl,
    }
  })

  return {
    blogs: lightweightBlogs,
    hasNextPage,
  }
}

export async function getUniqueBlogCategories() {
  // 🔥 Isko bhi properly cache kar diya
  'use cache'
  cacheLife('hours')
  cacheTag('blog-categories')

  const payload = await getPayload({ config: configPromise })

  const { docs: allCategoriesData } = await payload.find({
    collection: 'blogs',
    limit: 500,
    select: { category: true },
  })

  const uniqueCategories = Array.from(
    new Set(allCategoriesData.map((b: any) => b.category).filter(Boolean)),
  )

  return uniqueCategories as string[]
}

export async function getSingleBlogAction(id: string) {
  // 🔥 NEXT.JS 16 SERVER CACHE
  'use cache'
  cacheLife('hours')
  cacheTag('blogs', `blog-${id}`) // Specific ID tag for revalidation

  const payload = await getPayload({ config: configPromise })

  try {
    const blog = await payload.findByID({
      collection: 'blogs',
      id: id,
      depth: 2,
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

    // Serialization safe return
    return JSON.parse(JSON.stringify(blog)) as Blog
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error)
    return null
  }
}
