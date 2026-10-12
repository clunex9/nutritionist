import { notFound } from 'next/navigation'
import AddToFavorite from '@/components/shared/add-to-favorite'
import AddToBookmark from '@/components/shared/add-to-bookmark'

// 👇 Shadcn Breadcrumb Imports
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
import { cookies } from 'next/headers'

// 👇 Sabhi zaroori Payload types import kiye
import type { Blog, User, BlogImage, Avatar as AvatarType } from '@/payload-types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'

// Next.js ke params Next.js 15+ me Promise hote hain
interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BlogSinglePage({ params }: PageProps) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. Fetch current blog by ID (Strictly Typed)
  let blog: Blog
  try {
    blog = (await payload.findByID({
      collection: 'blogs',
      id: id,
      depth: 2,
    })) as unknown as Blog
  } catch (error) {
    return notFound()
  }

  if (!blog) return notFound()

  // 2. Fetch User & Auth state for Favorites/Bookmarks
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  let userId = null
  let isFavorited = false
  let isBookmarked = false

  if (token) {
    try {
      const { user } = await payload.auth({
        headers: new Headers({ Authorization: `JWT ${token}` }),
      })
      userId = user?.id || null

      if (userId) {
        // Check if THIS specific blog is favorited by the user
        const favCheck = await payload.find({
          collection: 'favorites',
          where: { and: [{ user: { equals: userId } }, { blog: { equals: id } }] },
          depth: 0,
        })
        isFavorited = favCheck.totalDocs > 0

        // Check if THIS specific blog is bookmarked by the user
        const bookCheck = await payload.find({
          collection: 'bookmarks',
          where: { and: [{ user: { equals: userId } }, { blog: { equals: id } }] },
          depth: 0,
        })
        isBookmarked = bookCheck.totalDocs > 0
      }
    } catch (e) {
      console.error('Auth check failed on single blog page')
    }
  }

  // 3. Extract details safely (🔥 Type Guards applied)
  const coverImage =
    typeof blog.image === 'object' && blog.image !== null ? (blog.image as BlogImage) : null

  const author =
    typeof blog.author === 'object' && blog.author !== null ? (blog.author as User) : null

  const authorAvatar =
    typeof author?.avatar === 'object' && author?.avatar !== null
      ? (author.avatar as AvatarType)
      : null

  // 👇 Simplified Image URLs
  const finalCoverImageUrl = coverImage?.url || ''
  const finalAvatarUrl = authorAvatar?.thumbnailURL || authorAvatar?.url || ''

  const initials = author?.name
    ? author?.name
        .trim()
        .split(/\s+/)
        .map((n: string) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'U'

  return (
    <article className="min-h-screen bg-gray-50/30 pt-6 pb-16 lg:pt-10">
      <div className="container mx-auto max-w-4xl px-4">
        {/* 🟢 SHADCN BREADCRUMB SECTION */}
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

        {/* 🟢 HEADER SECTION: Category, Title, Author */}
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
              {/* 👇 Shadcn Avatar hata kar Native div/img lagaya */}
              <div className="bg-dark-green-15 relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md lg:size-12.5">
                <Avatar className="bg-dark-green-15 size-10 shrink-0 overflow-hidden rounded-md lg:size-12.5">
                  {finalAvatarUrl ? (
                    <Image
                      src={finalAvatarUrl}
                      alt={author?.name || 'Author'}
                      width={50}
                      height={50}
                      priority={true} // 🔥 Preload
                      decoding="sync" // 🔥 Force browser to paint instantly
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

            {/* Actions: Favorite & Bookmark */}
            <div className="flex items-center gap-3">
              <AddToFavorite id={blog.id} initialFavorited={isFavorited} />
              <AddToBookmark id={blog.id} initialBookmarked={isBookmarked} />
            </div>
          </div>
        </header>

        {/* 🔵 HERO IMAGE */}
        {/* 👇 Next.js Image hata kar Native img lagaya aur bg-gray-200 add kiya as placeholder */}
        <div className="border-green-85 relative mb-12 aspect-video w-full overflow-hidden rounded-lg border bg-gray-200">
          {finalCoverImageUrl ? (
            <Image
              src={finalCoverImageUrl}
              alt={blog.title}
              fill
              priority={true} // 🔥 Preload
              fetchPriority="high" // 🔥 Network priority
              decoding="sync" // 🔥 Browser ko rukne nahi dega, direct paint karega
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
