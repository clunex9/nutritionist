'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import BlogCoverImage from '@/components/shared/blog-cover-image'

// 🔥 Naya simple type jisme koi heavy payload object nahi hai
type CleanBlog = {
  id: string
  title: string
  category: string
  description: string
  imageUrl: string
}

export default function BlogsClientSection({ blogs }: { blogs: CleanBlog[] }) {
  // Dynamically Categories Extract karein
  const uniqueCategories = Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean)))

  const categoryTabs = [
    { label: 'All', value: 'all' },
    ...uniqueCategories.map((cat) => ({
      label: cat,
      value: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    })),
  ]

  // 🔥 Tab State for Performance Tracking
  const [activeTab, setActiveTab] = useState('all')

  if (!blogs || blogs.length === 0) return null

  return (
    <section id="blogs" className="scroll-mt-10 pb-7.5 lg:pb-10">
      <div className="container">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
            const filteredArticles =
              category.value === 'all'
                ? blogs
                : blogs.filter((article) => article.category === category.label)

            return (
              <TabsContent key={category.value} value={category.value}>
                {/* 🔥 MAGIC FIX: Sirf active tab me render hoga, baaki sab memory me shant rahenge */}
                {activeTab === category.value && (
                  <>
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
                              priority={index < 2} // Pehle 2 cards fast load honge
                              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 33vw"
                              // Wrapper ki classes className me pass karein
                              className="mb-8 ml-auto aspect-video w-[90%] rounded-tl-lg rounded-tr-lg md:w-[80%] lg:w-[70%]"
                              // Image hover zoom effect imageClassName me pass karein
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
                  </>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
