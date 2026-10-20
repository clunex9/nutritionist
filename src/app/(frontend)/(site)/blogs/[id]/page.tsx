import { notFound } from 'next/navigation'
import { cacheLife, cacheTag } from 'next/cache'
import { Suspense } from 'react'

// Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

// Types
import type { Blog, User, BlogImage } from '@/payload-types'
import SingleBlogActions from './single-blogs-action'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import UserAvatar from '@/components/shared/user-avatar'
import BlogCoverImage from '@/components/shared/blog-cover-image'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getCachedSingleBlog(id: string) {
  'use cache'
  cacheLife('hours')
  cacheTag('blogs')

  const payload = await getPayload({ config: configPromise })

  try {
    const blog = await payload.findByID({
      collection: 'blogs',
      id: id,
      depth: 1,
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
    return blog as unknown as Blog
  } catch (error) {
    return null
  }
}

// 🔥 Proper Skeleton Loading Component
function BlogSkeleton() {
  return (
    <article className="min-h-screen bg-gray-50/30 pt-6 pb-16 lg:pt-10">
      <div className="container mx-auto max-w-4xl animate-pulse px-4">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <div className="h-4 w-12 rounded bg-gray-200"></div>
          <div className="h-4 w-4 rounded bg-gray-200"></div>
          <div className="h-4 w-12 rounded bg-gray-200"></div>
          <div className="h-4 w-4 rounded bg-gray-200"></div>
          <div className="h-4 w-32 rounded bg-gray-200"></div>
        </div>

        {/* Header Skeleton */}
        <header className="mb-10 text-center md:text-left">
          {/* Category Badge */}
          <div className="mb-4 inline-block h-8 w-24 rounded-full bg-[#C5E1A5]/50"></div>

          {/* Title */}
          <div className="mx-auto mb-3 h-10 w-3/4 rounded bg-gray-200 md:mx-0 md:h-12 lg:h-14"></div>
          <div className="mx-auto mb-6 h-10 w-1/2 rounded bg-gray-200 md:mx-0 md:h-12 lg:h-14"></div>

          {/* Author Box */}
          <div className="border-green-80 flex flex-col items-center justify-between gap-6 rounded-lg border bg-white p-6 md:flex-row md:gap-4">
            <div className="flex w-full items-center justify-center gap-4 md:w-auto md:justify-start">
              {/* Avatar */}
              <div className="size-10 shrink-0 rounded-md bg-gray-200 lg:size-12.5"></div>
              {/* Name & Date */}
              <div className="flex flex-col gap-2">
                <div className="h-5 w-32 rounded bg-gray-200"></div>
                <div className="h-4 w-48 rounded bg-gray-100"></div>
              </div>
            </div>
            {/* Actions Skeleton */}
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-md bg-gray-200"></div>
              <div className="size-10 rounded-md bg-gray-200"></div>
            </div>
          </div>
        </header>

        {/* Hero Image Skeleton */}
        <div className="mb-12 aspect-video w-full rounded-lg bg-gray-200"></div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-5 w-full rounded bg-gray-200"></div>
          <div className="h-5 w-[95%] rounded bg-gray-200"></div>
          <div className="h-5 w-[90%] rounded bg-gray-200"></div>
          <div className="h-5 w-[85%] rounded bg-gray-200"></div>
        </div>
      </div>
    </article>
  )
}

// Extracted Data Component
async function BlogDetails({ params }: PageProps) {
  const { id } = await params
  const blog = await getCachedSingleBlog(id)

  if (!blog) return notFound()

  const coverImage =
    typeof blog.image === 'object' && blog.image !== null ? (blog.image as BlogImage) : null
  const author =
    typeof blog.author === 'object' && blog.author !== null ? (blog.author as User) : null

  const finalCoverImageUrl = coverImage?.url || ''

  return (
    <article className="min-h-screen bg-gray-50/30 pt-6 pb-16 lg:pt-10">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href={'/'}> Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={'/blogs'}>Blogs</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-37.5 truncate md:max-w-75 lg:max-w-100">
                  {blog.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <header className="mb-10 text-center md:text-left">
          <span className="text-dark-green-20 mb-4 inline-block rounded-full bg-[#C5E1A5]/30 px-4 py-1.5 text-sm font-semibold tracking-wider uppercase">
            {blog.category}
          </span>
          <h1 className="mb-6 text-3xl leading-tight font-black text-gray-900 md:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          <div className="border-green-80 flex flex-col items-center justify-between gap-6 rounded-lg border bg-white p-6 md:flex-row md:gap-4">
            <div className="flex items-center gap-4 text-left">
              <div className="bg-dark-green-15 relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md lg:size-12.5">
                <UserAvatar
                  user={author}
                  className="bg-dark-green-15 size-10 shrink-0 rounded-md lg:size-12.5"
                  fallbackClassName="text-lg font-bold uppercase text-green-95"
                />
              </div>

              <div className="flex flex-col">
                <span className="mb-1 text-lg leading-none font-bold text-gray-900">
                  {author?.name || 'Anonymous'}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}{' '}
                  • {blog.readTime || '5 min read'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <SingleBlogActions blogId={blog.id} />
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <BlogCoverImage
          src={finalCoverImageUrl}
          alt={blog.title}
          priority={true} // Hero image hai isliye priority true rahegi
          className="border-green-85 relative mb-12 aspect-video w-full rounded-lg border"
        />

        {/* Main Content */}
        <div className="prose prose-lg prose-green prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 mx-auto max-w-none">
          <p className="mb-8 text-xl leading-relaxed font-medium text-gray-600">
            {blog.description}
          </p>
          <hr className="border-green-80 my-10" />
        </div>
      </div>
    </article>
  )
}

// Wrap the dynamic component in a Suspense boundary with the new Skeleton
export default function BlogSinglePage({ params }: PageProps) {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogDetails params={params} />
    </Suspense>
  )
}
