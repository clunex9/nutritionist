'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import BlogCoverImage from '@/components/shared/blog-cover-image'
import { fetchPaginatedBlogs } from '@/actions/blog.action'

// --- TYPES ---
type CleanBlog = {
  id: string
  title: string
  category: string
  description: string
  imageUrl: string
}

interface Props {
  initialBlogs: CleanBlog[]
  initialHasMore: boolean
  categories: string[]
}

// --- SKELETON COMPONENT ---
const BlogCardSkeleton = ({ index }: { index: number }) => (
  <div
    className={`border-green-85 flex animate-pulse flex-col border-b p-8 last:border-b-0 md:nth-last-[1]:border-b-0 md:nth-last-[2]:border-b-0 lg:p-12 ${
      index % 2 === 0 ? 'md:border-green-85 md:border-r' : ''
    }`}
  >
    <div className="mb-8">
      <div className="h-6 w-32 rounded bg-gray-200"></div>
    </div>
    <div className="mb-8 ml-auto aspect-video w-[90%] rounded-tl-lg rounded-tr-lg bg-gray-200 md:w-[80%] lg:w-[70%]"></div>
    <div className="flex grow flex-col items-start justify-center gap-4 xl:flex-row xl:items-center">
      <div className="w-full">
        <div className="mb-4 h-8 w-3/4 rounded bg-gray-300 lg:h-10"></div>
        <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
        <div className="mb-2 h-4 w-5/6 rounded bg-gray-200"></div>
        <div className="mb-8 h-4 w-4/6 rounded bg-gray-200"></div>
      </div>
      <div className="h-12 w-32 shrink-0 rounded-md bg-gray-300"></div>
    </div>
  </div>
)

// --- MAIN CLIENT COMPONENT ---
export default function BlogsClientSection({ initialBlogs, initialHasMore, categories }: Props) {
  const [activeTab, setActiveTab] = useState('all')
  const loaderRef = useRef<HTMLDivElement | null>(null)

  // 🔥 QueryClient initialize kiya taaki hum dusre tabs ka cache padh sakein
  const queryClient = useQueryClient()

  // 🔥 TANSTACK QUERY: Smart Caching, Infinite Scroll & Placeholder Magic
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['blogs', activeTab],
    queryFn: async ({ pageParam = 1 }) => {
      // Server se page 1 par 2 blogs fetch karo
      return await fetchPaginatedBlogs(pageParam, 2, activeTab)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined
    },
    // Initial Load: 'all' tab ke liye server component ka data inject karo
    initialData:
      activeTab === 'all'
        ? {
            pages: [{ blogs: initialBlogs, hasNextPage: initialHasMore }],
            pageParams: [1],
          }
        : undefined,

    // 🔥 THE MAGIC CODE (Placeholder Data / Optimistic UI)
    placeholderData: (previousData) => {
      // Agar is current tab ka data pehle se hai, toh wahi dikhao
      if (previousData) return previousData

      // Agar naya tab khula hai (aur wo 'all' nahi hai)
      if (activeTab !== 'all') {
        // 'all' tab wale cache dibbe me jhaanko
        const allCache = queryClient.getQueryData<any>(['blogs', 'all'])
        if (allCache) {
          // Usme se sirf activeTab (jaise 'Nutrition') ke blogs nikal lo
          const allBlogs = allCache.pages.flatMap((page: any) => page.blogs)
          const matchedBlogs = allBlogs.filter((blog: any) => blog.category === activeTab)

          // Agar hume 1 bhi blog mil gaya 'all' cache me, toh usko turant screen par dikha do!
          if (matchedBlogs.length > 0) {
            return {
              pages: [{ blogs: matchedBlogs, hasNextPage: true }],
              pageParams: [1],
            }
          }
        }
      }
      return undefined // Agar kuch nahi mila, tabhi loading skeleton aayega
    },
  })

  // Data array ko flatten karna grid ke liye
  const blogs = data?.pages.flatMap((page) => page.blogs) || []

  // 🔥 Intersection Observer: Scroll karne par list ke end me fetchNextPage trigger karna
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

  return (
    <section id="blogs" className="scroll-mt-10 pb-7.5 lg:pb-10">
      <div className="container">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* TAB NAVIGATION */}
          <TabsList className="bg-dark-green-20 text-background z-40 mb-10 flex h-auto! w-full scrollbar-none flex-nowrap justify-start gap-2 overflow-x-auto rounded-t-none rounded-b-lg p-4 [-ms-overflow-style:none] lg:px-20 [&::-webkit-scrollbar]:hidden">
            <TabsTrigger
              value="all"
              className="data-active:bg-dark-green-25 data-active:border-dark-green-30 text-background hover:text-background data-active:text-background shrink-0 rounded-sm border border-transparent px-4.5 py-3 text-sm font-semibold whitespace-nowrap transition-all data-active:border lg:text-base"
            >
              All
            </TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="data-active:bg-dark-green-25 data-active:border-dark-green-30 text-background hover:text-background data-active:text-background shrink-0 rounded-sm border border-transparent px-4.5 py-3 text-sm font-semibold whitespace-nowrap capitalize transition-all data-active:border lg:text-base"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* TAB CONTENT */}
          <TabsContent value={activeTab}>
            {blogs.length === 0 && !isLoading ? (
              <div className="py-20 text-center text-gray-500">
                No articles found in this category.
              </div>
            ) : (
              <>
                <div className="border-green-85 bg-green-95 grid grid-cols-1 rounded-lg border md:grid-cols-2">
                  {/* REAL BLOGS */}
                  {blogs.map((article, index) => (
                    <div
                      key={`${article.id}-${index}`}
                      className={`border-green-85 flex flex-col border-b p-8 last:border-b-0 md:nth-last-[1]:border-b-0 md:nth-last-[2]:border-b-0 lg:p-12 ${
                        index % 2 === 0 ? 'md:border-green-85 md:border-r' : ''
                      }`}
                    >
                      <div className="mb-8">
                        <span className="border-b-2 border-[#C5E1A5] pb-1 text-lg font-semibold text-gray-900 capitalize lg:text-xl">
                          {article.category}
                        </span>
                      </div>
                      <BlogCoverImage
                        src={article.imageUrl}
                        alt={article.title}
                        priority={index < 2 && activeTab === 'all'}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 33vw"
                        className="mb-8 ml-auto aspect-video w-[90%] rounded-tl-lg rounded-tr-lg md:w-[80%] lg:w-[70%]"
                        imageClassName="transition-transform duration-500 hover:scale-105"
                      />
                      <div className="flex grow flex-col items-start justify-center gap-4 xl:flex-row xl:items-center">
                        <div>
                          <h3 className="mb-4 text-xl leading-tight font-bold text-gray-900 lg:text-2xl">
                            {article.title}
                          </h3>
                          <p className="mb-8 line-clamp-3 grow text-base text-gray-600">
                            {article.description}
                          </p>
                        </div>
                        <Link
                          href={`/blogs/${article.id}`}
                          className={cn(
                            buttonVariants(),
                            'bg-green-70 hover:bg-green-80 h-auto! cursor-pointer rounded-md px-6 py-3 text-base font-medium text-gray-900 transition-colors',
                          )}
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  ))}

                  {/* LOADING 1: Jab pehli baar naya tab khule aur cache/placeholder me data na ho */}
                  {isLoading &&
                    Array.from({ length: 2 }).map((_, i) => (
                      <BlogCardSkeleton key={`skeleton-full-${i}`} index={i} />
                    ))}

                  {/* LOADING 2: Jab scroll karne par next page (limit 2) load ho raha ho */}
                  {isFetchingNextPage && (
                    <>
                      <BlogCardSkeleton key={`skeleton-end-1`} index={blogs.length} />
                      <BlogCardSkeleton key={`skeleton-end-2`} index={blogs.length + 1} />
                    </>
                  )}
                </div>

                {/* INVISIBLE SCROLL TRIGGER */}
                {hasNextPage && <div ref={loaderRef} className="h-10 w-full" />}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
