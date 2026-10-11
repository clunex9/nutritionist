// app/(frontend)/profile/favorites/page.tsx (Ya jahan bhi ye file hai)
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { HugeiconsIcon } from '@hugeicons/react'
import { HeartIcon } from '@hugeicons/core-free-icons'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import RemoveButton from '@/components/shared/remove-button'
import { BlogImage } from '@/payload-types'

// 👇 Page ab async Server Component ban gaya hai
export default async function FavoritesPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) {
    return <div className="p-8 text-center">Please login to view your favorites.</div>
  }

  const payload = await getPayload({ config: configPromise })

  // 1. Token verify karke user nikala
  const { user } = await payload.auth({
    headers: new Headers({ Authorization: `JWT ${token}` }),
  })

  if (!user) {
    return <div className="p-8 text-center">Session expired. Please login again.</div>
  }

  // 2. Direct database se Favorites fetch kiye
  const { docs: favorites } = await payload.find({
    collection: 'favorites',
    where: { user: { equals: user.id } },
    depth: 2, // Blog ka poora data laane ke liye depth 2 rakha
  })

  const hasFavorites = favorites && favorites.length > 0

  return (
    <section
      className={`px-4 py-6 md:px-8 ${
        !hasFavorites ? 'flex min-h-[calc(100vh-100px)] flex-col' : ''
      }`}
    >
      <div className="mb-8">
        <h1 className="text-dark-green-20 text-2xl font-black tracking-tight md:text-3xl">
          My Favorites
        </h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Blogs and articles you have loved.
        </p>
      </div>

      {!hasFavorites ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50/50 py-20 text-center">
          <HugeiconsIcon icon={HeartIcon} className="mb-4 h-12 w-12 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-500">No favorites yet</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((fav: any) => {
            const blog = fav.blog
            if (!blog || typeof blog === 'string') return null

            const coverImage =
              typeof blog.image === 'object' && blog.image !== null
                ? (blog.image as BlogImage)
                : null
            const finalCoverImageUrl = coverImage?.url || ''

            return (
              <Card
                key={fav.id}
                className="bg-green-95 border-green-85 group relative flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
              >
                {/* 🔴 Naya Client Component Button Yahan Laga Diya */}
                <RemoveButton blogId={blog.id} type="favorite" />

                <div className="relative h-48 w-full bg-gray-100">
                  {finalCoverImageUrl ? (
                    <Image
                      src={finalCoverImageUrl}
                      alt={blog.title}
                      fill
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
