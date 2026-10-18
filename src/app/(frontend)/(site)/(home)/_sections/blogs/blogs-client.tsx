'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import AddToFavorite from '@/components/shared/add-to-favorite'
import AddToBookmark from '@/components/shared/add-to-bookmark'
import { useEffect, useState } from 'react'
import { getUserInteractions } from '@/actions/user.action'

// 🔥 Naya Clean Type
export type CleanLatestBlog = {
  id: string
  title: string
  category: string
  description: string
  createdAt: string
  readTime: string
  coverImageUrl: string
  authorName: string
  authorAvatarUrl: string
  authorInitials: string
}

interface BlogsClientProps {
  blogs: CleanLatestBlog[]
}

export default function BlogsClient({ blogs }: BlogsClientProps) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const blogIds = blogs.map((b) => b.id)
      if (blogIds.length > 0) {
        try {
          const data = await getUserInteractions(blogIds)
          setFavorites(data.favorites)
          setBookmarks(data.bookmarks)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [blogs])

  return (
    <section id="blogs" className="scroll-mt-10 py-10 lg:py-16">
      <div className="blogs-header container">
        <h2 className="text-gray-15 text-center text-[28px] font-bold lg:text-[38px]">
          Latest Articles
        </h2>
        <p className="text-gray-20 mx-auto mt-2 max-w-2xl text-center text-sm lg:text-[16px]">
          Discover informative and engaging articles written by our team of nutritionists,
          dietitians, and wellness experts.
        </p>
      </div>

      <div className="container mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {blogs.map((blog, index) => (
          <Card
            key={blog.id}
            className="blog-card border-green-85 bg-green-95 flex flex-col rounded-lg border p-6 ring-0 lg:p-7.5"
          >
            {/* Cover Image Wrapper */}
            <div className="relative mb-4 aspect-3/2 w-full overflow-hidden rounded-lg lg:mb-6">
              {blog.coverImageUrl ? (
                <Image
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  fill
                  priority={index < 2}
                  fetchPriority={index < 2 ? 'high' : 'auto'}
                  decoding={index < 2 ? 'sync' : 'async'}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={process.env.NODE_ENV !== 'production'} // 🔥 Local lag fix
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <span className="text-sm text-gray-500">No Image</span>
                </div>
              )}
            </div>

            <CardHeader className="p-0">
              <span className="text-gray-20 text-sm font-medium lg:text-[16px]">
                {blog.category}
              </span>
              <CardTitle className="text-gray-15 mt-2 text-[20px] leading-tight font-semibold lg:text-[22px]">
                <Link
                  href={`/blogs/${blog.id}`}
                  className="hover:text-dark-green-20 transition-colors hover:underline"
                >
                  {blog.title}
                </Link>
              </CardTitle>
            </CardHeader>

            <CardContent className="mt-3 grow p-0">
              <CardDescription className="text-gray-30 line-clamp-3 text-sm leading-relaxed font-medium lg:text-[16px]">
                {blog.description}
              </CardDescription>
            </CardContent>

            <CardFooter className="mt-5 border-0 p-0">
              <div className="bg-green-97 border-green-85 flex w-full flex-col items-center justify-between gap-5 rounded-lg border p-4 sm:flex-row">
                <div className="flex w-full items-center gap-4">
                  <Avatar className="bg-dark-green-15 size-10 shrink-0 overflow-hidden rounded-md lg:size-12.5">
                    {blog.authorAvatarUrl ? (
                      <Image
                        src={blog.authorAvatarUrl}
                        alt={blog.authorName}
                        fill
                        sizes="(max-width: 1024px) 40px, 50px"
                        className="object-cover"
                      />
                    ) : (
                      <AvatarFallback className="text-green-95 bg-dark-green-15 rounded-md font-bold uppercase">
                        {blog.authorInitials}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex flex-col">
                    <span className="text-dark-green-15 leading-none font-semibold lg:text-lg">
                      {blog.authorName}
                    </span>
                    <span className="text-gray-35 mt-1 text-sm font-medium lg:text-[16px]">
                      {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}{' '}
                      - {blog.readTime}
                    </span>
                  </div>
                </div>

                <div className="ml-auto flex gap-2">
                  <AddToFavorite
                    id={blog.id}
                    initialFavorited={favorites.includes(blog.id)}
                    isLoading={isLoading}
                  />
                  <AddToBookmark
                    id={blog.id}
                    initialBookmarked={bookmarks.includes(blog.id)}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
