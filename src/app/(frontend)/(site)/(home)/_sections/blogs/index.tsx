// Payload API imports
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'

// Types
import type { Blog, BlogImage, User, Avatar as AvatarType } from '@/payload-types'

// Client Component Import
import BlogsClient from './blogs-client'

export async function getCachedLatestBlogs() {
  'use cache'
  cacheLife('hours')
  cacheTag('blogs')

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'blogs',
    depth: 2, // Avatar nikalne ke liye 2 chahiye
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
}

export default async function Blogs() {
  const rawBlogs = await getCachedLatestBlogs()

  if (!rawBlogs || rawBlogs.length === 0) return null

  // 🔥 DATA SANITIZATION: Client ko sirf Strings aur zaroori data bhejenge
  const lightweightBlogs = rawBlogs.map((blog) => {
    // 1. Cover Image
    const coverImage =
      typeof blog.image === 'object' && blog.image !== null ? (blog.image as BlogImage) : null
    const finalCoverImageUrl = coverImage?.url || ''

    // 2. Author Details
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

  return <BlogsClient blogs={lightweightBlogs} />
}
