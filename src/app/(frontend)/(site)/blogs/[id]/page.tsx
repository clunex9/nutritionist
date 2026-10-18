import { notFound } from 'next/navigation'
import Image from 'next/image'
import { cacheLife, cacheTag } from 'next/cache' // 🔥 Naye imports (unstable_cache hata diya)

// Components
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

// Payload Imports
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Types
import type { Blog, User, BlogImage, Avatar as AvatarType } from '@/payload-types'
import SingleBlogActions from './single-blogs-action'

interface PageProps {
  params: Promise<{ id: string }>
}

// 🔥 Naya Next.js 16 Caching Logic for Single Blog
// 'id' automatically cache key ban jayega
async function getCachedSingleBlog(id: string) {
  'use cache' // 👈 1. Directive lagaya
  cacheLife('hours') // 👈 2. Cache life
  cacheTag('blogs') // 👈 3. Tag (taaki admin update kare toh ye bhi refresh ho)

  const payload = await getPayload({ config: configPromise })

  try {
    const blog = await payload.findByID({
      collection: 'blogs',
      id: id,
      depth: 2, // 2 zaroori hai avatar URL ke liye
    })
    return blog as unknown as Blog
  } catch (error) {
    return null // NotFound handle karne ke liye null return karenge
  }
}

export default async function BlogSinglePage({ params }: PageProps) {
  const { id } = await params

  // 1. Sirf Cached Blog Fetch Karein (Super-fast RAM se)
  const blog = await getCachedSingleBlog(id)

  if (!blog) return notFound()

  // 2. Type Guards & Image Extraction
  const coverImage =
    typeof blog.image === 'object' && blog.image !== null ? (blog.image as BlogImage) : null
  const author =
    typeof blog.author === 'object' && blog.author !== null ? (blog.author as User) : null
  const authorAvatar =
    typeof author?.avatar === 'object' && author?.avatar !== null
      ? (author.avatar as AvatarType)
      : null

  const finalCoverImageUrl = coverImage?.url || ''
  const finalAvatarUrl = authorAvatar?.thumbnailURL || authorAvatar?.url || ''

  const initials = author?.name
    ? author?.name
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'U'

  return (
    <article className="min-h-screen bg-gray-50/30 pt-6 pb-16 lg:pt-10">
      <div className="container mx-auto max-w-4xl px-4">
        {/* 🟢 SHADCN BREADCRUMB */}
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
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

        {/* 🟢 HEADER SECTION */}
        <header className="mb-10 text-center md:text-left">
          <span className="text-dark-green-20 mb-4 inline-block rounded-full bg-[#C5E1A5]/30 px-4 py-1.5 text-sm font-semibold tracking-wider uppercase">
            {blog.category}
          </span>
          <h1 className="mb-6 text-3xl leading-tight font-black text-gray-900 md:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          <div className="border-green-80 flex flex-col items-center justify-between gap-6 rounded-lg border bg-white p-6 md:flex-row md:gap-4">
            {/* Author Info */}
            <div className="flex items-center gap-4 text-left">
              <div className="bg-dark-green-15 relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md lg:size-12.5">
                <Avatar className="bg-dark-green-15 size-10 shrink-0 overflow-hidden rounded-md lg:size-12.5">
                  {finalAvatarUrl ? (
                    <Image
                      src={finalAvatarUrl}
                      alt={author?.name || 'Author'}
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-green-95 bg-dark-green-15 rounded-md text-lg font-bold uppercase">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>
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

            {/* Actions: Client Component ko bulaya hai yahan 👇 */}
            <div className="flex items-center gap-3">
              <SingleBlogActions blogId={blog.id} />
            </div>
          </div>
        </header>

        {/* 🔵 HERO IMAGE */}
        <div className="border-green-85 relative mb-12 aspect-video w-full overflow-hidden rounded-lg border bg-gray-200">
          {finalCoverImageUrl ? (
            <Image
              src={finalCoverImageUrl}
              alt={blog.title}
              fill
              priority={true} // Ye hero image hai isliye priority zaroori hai
              sizes="(max-width: 896px) 100vw, 896px"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              No Cover Image
            </div>
          )}
        </div>

        {/* 🟠 MAIN CONTENT */}
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
