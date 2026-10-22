'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import UserAvatar from '@/components/shared/user-avatar'
import BlogCoverImage from '@/components/shared/blog-cover-image'
import SingleBlogActions from './single-blogs-action'

// Types & Actions
import type { Blog, User, BlogImage } from '@/payload-types'
import { getSingleBlogAction } from '@/actions/blog.action'

interface Props {
  initialBlog: Blog
  blogId: string
}

export default function SingleBlogClient({ initialBlog, blogId }: Props) {
  // 🔥 TANSTACK MAGIC: Client Cache Memory
  const { data: blog } = useQuery({
    queryKey: ['single-blog', blogId],
    queryFn: async () => await getSingleBlogAction(blogId),
    initialData: initialBlog, // Server ka data yahan inject hoga (For SEO)
    staleTime: 1000 * 60 * 60, // 1 Ghante tak browser memory mein lock rahega!
  })

  // Agar galti se data nahi aata
  if (!blog) return null

  // Safe destructuring
  const coverImage =
    typeof blog.image === 'object' && blog.image !== null ? (blog.image as BlogImage) : null
  const author =
    typeof blog.author === 'object' && blog.author !== null ? (blog.author as User) : null

  const finalCoverImageUrl = coverImage?.thumbnailURL || coverImage?.url || ''

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
          priority={true}
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
