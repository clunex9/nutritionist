import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { HugeiconsIcon } from '@hugeicons/react'
import { BookmarkIcon } from '@hugeicons/core-free-icons'
import { cookies } from 'next/headers'
import RemoveButton from '@/components/shared/remove-button'
import type { BlogImage } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function BookmarksPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) {
    return <div className="p-8 text-center text-gray-500">Please login to view your bookmarks.</div>
  }

  const payload = await getPayload({ config: configPromise })

  const { user } = await payload.auth({
    headers: new Headers({ Authorization: `JWT ${token}` }),
  })

  if (!user) {
    return <div className="p-8 text-center text-gray-500">Session expired. Please login again.</div>
  }

  const { docs: bookmarks } = await payload.find({
    collection: 'bookmarks',
    where: { user: { equals: user.id } },
    depth: 2,
    limit: 50, // 🔥 FIX 1: Heavy payload crash se bachne ke liye limit lagayi
  })

  const hasBookmarks = bookmarks && bookmarks.length > 0

  return (
    <section
      className={`px-4 py-6 md:px-8 ${
        !hasBookmarks ? 'flex min-h-[calc(100vh-100px)] flex-col' : ''
      }`}
    >
      <div className="mb-8 shrink-0">
        <h1 className="text-dark-green-20 text-2xl font-black tracking-tight md:text-3xl">
          Saved Bookmarks
        </h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Articles you have saved to read later.
        </p>
      </div>

      {!hasBookmarks ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50/50 py-20 text-center">
          <HugeiconsIcon icon={BookmarkIcon} className="mb-4 h-12 w-12 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-500">No bookmarks yet</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((book: any) => {
            const blog = book.blog
            if (!blog || typeof blog === 'string') return null

            const coverImage =
              typeof blog.image === 'object' && blog.image !== null
                ? (blog.image as BlogImage)
                : null
            const finalCoverImageUrl = coverImage?.url || ''

            return (
              <Card
                key={book.id}
                className="bg-green-95 border-green-85 group relative flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
              >
                {/* 🔴 Type 'bookmark' already correct tha */}
                <RemoveButton blogId={blog.id} type="bookmark" />

                <div className="relative h-48 w-full bg-gray-100">
                  {finalCoverImageUrl ? (
                    <Image
                      src={finalCoverImageUrl}
                      alt={blog.title || 'Blog cover'}
                      fill
                      // 🔥 FIX 2: Desktop par unnecessary 100vw image download hone se bachaya
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <CardContent className="flex grow flex-col p-4">
                  <span className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
                    {blog.category}
                  </span>
                  <CardTitle className="line-clamp-2 text-lg leading-tight font-bold">
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="hover:text-dark-green-20 before:absolute before:inset-0 hover:underline"
                    >
                      {blog.title}
                    </Link>
                  </CardTitle>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </section>
  )
}
