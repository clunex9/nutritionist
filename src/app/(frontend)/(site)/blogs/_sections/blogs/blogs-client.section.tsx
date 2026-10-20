'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import BlogCoverImage from '@/components/shared/blog-cover-image'

type CleanBlog = {
  id: string
  title: string
  category: string
  description: string
  imageUrl: string
}

export default function BlogsClientSection({ blogs }: { blogs: CleanBlog[] }) {
  if (!blogs || blogs.length === 0) return null

  // Dynamically Categories Extract karein
  const uniqueCategories = useMemo(
    () => Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean))),
    [blogs],
  )

  const categoryTabs = useMemo(
    () => [
      { label: 'All', value: 'all' },
      ...uniqueCategories.map((cat) => ({
        label: cat,
        value: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      })),
    ],
    [uniqueCategories],
  )

  // 🔥 MAGIC FIX: Saari categories ke filtered articles pehle hi memoize kar lo (Sirf 1 baar filter honge)
  const articlesByCategory = useMemo(() => {
    const map: Record<string, CleanBlog[]> = { all: blogs }
    uniqueCategories.forEach((cat) => {
      const val = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      map[val] = blogs.filter((article) => article.category === cat)
    })
    return map
  }, [blogs, uniqueCategories])

  return (
    <section id="blogs" className="scroll-mt-10 pb-7.5 lg:pb-10">
      <div className="container">
        <Tabs defaultValue="all" className="w-full">
          {/* Top Navigation Bar */}
          <TabsList className="bg-dark-green-20 text-background z-40 mb-10 flex h-auto! w-full scrollbar-none flex-nowrap justify-start gap-2 overflow-x-auto rounded-t-none rounded-b-lg p-4 [-ms-overflow-style:none] lg:px-20 [&::-webkit-scrollbar]:hidden">
            {categoryTabs.map(({ label, value }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="data-active:bg-dark-green-25 data-active:border-dark-green-30 text-background hover:text-background data-active:text-background shrink-0 rounded-sm border border-transparent px-4.5 py-3 text-sm font-semibold whitespace-nowrap capitalize transition-all data-active:border lg:text-base"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Contents */}
          {categoryTabs.map((category) => {
            const filteredArticles = articlesByCategory[category.value] || []

            return (
              <TabsContent key={category.value} value={category.value}>
                {filteredArticles.length === 0 ? (
                  <div className="py-20 text-center text-gray-500">
                    No articles found in this category.
                  </div>
                ) : (
                  <div className="border-green-85 bg-green-95 grid grid-cols-1 rounded-lg border md:grid-cols-2">
                    {filteredArticles.map((article, index) => (
                      <div
                        key={article.id}
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
                          priority={index < 2 && category.value === 'all'}
                          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 33vw"
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
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
