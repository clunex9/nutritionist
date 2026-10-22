'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
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
import { getUserInteractions } from '@/actions/user.action'
import BlogCoverImage from '@/components/shared/blog-cover-image'
import { fetchHomePaginatedBlogs } from '@/actions/blog.action'

// 🔥 1. SHIMMER SKELETON
const HomeBlogCardSkeleton = () => (
  <Card className="blog-card border-green-85 bg-green-95 flex animate-pulse flex-col rounded-lg border p-6 ring-0 lg:p-7.5">
    <div className="relative mb-4 aspect-video w-full rounded-lg bg-gray-200 md:aspect-3/2 lg:mb-6"></div>
    <CardHeader className="p-0">
      <div className="mb-2 h-4 w-24 rounded bg-gray-200"></div>
      <div className="mt-2 h-6 w-3/4 rounded bg-gray-300"></div>
    </CardHeader>
    <CardContent className="mt-3 grow p-0">
      <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
      <div className="h-4 w-5/6 rounded bg-gray-200"></div>
    </CardContent>
    <CardFooter className="mt-5 border-0 p-0">
      <div className="bg-green-97 border-green-85 flex w-full flex-col items-center justify-between gap-5 rounded-lg border p-4 sm:flex-row">
        <div className="flex w-full items-center gap-4">
          <div className="size-10 shrink-0 rounded-md bg-gray-300 lg:size-12.5"></div>
          <div className="flex w-full flex-col">
            <div className="mb-2 h-4 w-32 rounded bg-gray-300"></div>
            <div className="h-3 w-24 rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <div className="h-10 w-10 rounded-md bg-gray-200"></div>
          <div className="h-10 w-10 rounded-md bg-gray-200"></div>
        </div>
      </div>
    </CardFooter>
  </Card>
)

// 🔥 2. INNER COMPONENT: Yahan saara heavy client logic hai
function BlogsContent() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [isInteractionsLoading, setIsInteractionsLoading] = useState(true)

  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  // Scroll aane par fetch enable karo
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsSectionVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // TanStack Query
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['home-latest-blogs'],
    queryFn: async ({ pageParam = 1 }) => await fetchHomePaginatedBlogs(pageParam, 2),
    initialPageParam: 1,
    enabled: isSectionVisible,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length >= 2) return undefined
      return lastPage.hasNextPage ? allPages.length + 1 : undefined
    },
  })

  const blogs = data?.pages.flatMap((page) => page.blogs) || []
  const blogIdsString = blogs.map((b) => b.id).join(',')

  // Bottom scroll detect karke agla page lao
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // User interactions fetch
  useEffect(() => {
    const fetchUserData = async () => {
      const blogIds = blogIdsString ? blogIdsString.split(',') : []
      if (blogIds.length > 0) {
        setIsInteractionsLoading(true)
        try {
          const interactionsData = await getUserInteractions(blogIds)
          setFavorites(interactionsData?.favorites || [])
          setBookmarks(interactionsData?.bookmarks || [])
        } catch (error) {
          console.error(error)
        } finally {
          setIsInteractionsLoading(false)
        }
      } else {
        setIsInteractionsLoading(false)
      }
    }
    fetchUserData()
  }, [blogIdsString])

  return (
    <div ref={sectionRef} className="container mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
      {isLoading && isSectionVisible && (
        <>
          <HomeBlogCardSkeleton />
          <HomeBlogCardSkeleton />
        </>
      )}

      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className="blog-card border-green-85 bg-green-95 flex flex-col rounded-lg border p-6 ring-0 lg:p-7.5"
        >
          <BlogCoverImage
            src={blog.coverImageUrl}
            alt={blog.title}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 33vw"
            className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg md:aspect-3/2 lg:mb-6"
            imageClassName="object-cover transition-transform duration-500 hover:scale-105"
          />
          <CardHeader className="p-0">
            <span className="text-gray-20 text-sm font-medium lg:text-[16px]">{blog.category}</span>
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
                  isLoading={isInteractionsLoading}
                />
                <AddToBookmark
                  id={blog.id}
                  initialBookmarked={bookmarks.includes(blog.id)}
                  isLoading={isInteractionsLoading}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}

      {isFetchingNextPage && (
        <>
          <HomeBlogCardSkeleton />
          <HomeBlogCardSkeleton />
        </>
      )}
      {hasNextPage && <div ref={loaderRef} className="h-10 w-full" />}
    </div>
  )
}

// 🔥 3. EXPORT COMPONENT: Ab 3G par blank space nahi, Skeletons aayenge
export default function Blogs() {
  const [isMounted, setIsMounted] = useState(false)

  // Jab JS load ho jayegi, tab hum isMounted true kar denge
  useEffect(() => {
    setIsMounted(true)
  }, [])

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

      {/* 🔥 THE MAGIC FIX */}
      {isMounted ? (
        // JS load hone ke baad actual TanStack logic chalega
        <BlogsContent />
      ) : (
        // JS load hone se pehle (Slow 3G par) HTML mein yeh Skeletons dikhenge
        <div className="container mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <HomeBlogCardSkeleton />
          <HomeBlogCardSkeleton />
        </div>
      )}
    </section>
  )
}
