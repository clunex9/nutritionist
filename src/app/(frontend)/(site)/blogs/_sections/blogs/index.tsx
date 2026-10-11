import Image from 'next/image'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from 'cn'

// Payload API imports
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Blog, BlogImage } from '@/payload-types' // 👈 Types imported

export default async function Blogs() {
  const payload = await getPayload({ config: configPromise })

  // 1. Database se saare blogs fetch karein aur Type define karein
  const { docs: blogs } = (await payload.find({
    collection: 'blogs',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  })) as unknown as { docs: Blog[] }

  // 2. Dynamically Categories Extract karein
  const uniqueCategories = Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean)))

  // Categories array for Tabs
  const categoryTabs = [
    { label: 'All', value: 'all' },
    ...uniqueCategories.map((cat) => ({
      label: cat,
      value: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    })),
  ]

  if (!blogs || blogs.length === 0) return null

  return (
    <section id="blogs" className="scroll-mt-10 pb-7.5 lg:pb-10">
      <div className="container">
        <Tabs defaultValue="all" className="w-full">
          {/* Top Navigation Bar */}
          <TabsList
            className="bg-dark-green-20 text-background z-40 mb-10 flex h-auto! w-full scrollbar-none flex-nowrap justify-start gap-2 overflow-x-auto rounded-t-none rounded-b-lg p-4 [-ms-overflow-style:none] lg:px-20 [&::-webkit-scrollbar]:hidden"
            // style={{
            //   top: 'calc(var(--header-height, 70px) + var(--header-offset, 0px))',
            // }}
          >
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
                {filteredArticles.length === 0 ? (
                  <div className="py-20 text-center text-gray-500">
                    No articles found in this category.
                  </div>
                ) : (
                  <div className="border-green-85 bg-green-95 grid grid-cols-1 rounded-lg border md:grid-cols-2">
                    {filteredArticles.map((article: Blog, index: number) => {
                      // 🔥 Type Guard for Media (Bilkul Team Section ki tarah)
                      const imageObj =
                        typeof article.image === 'object' && article.image !== null
                          ? (article.image as BlogImage)
                          : null

                      // 👇 Direct aur safe URL extraction
                      const finalCoverImageUrl = imageObj?.url || ''

                      return (
                        <div
                          key={article.id}
                          className={`border-green-85 flex flex-col border-b p-8 last:border-b-0 md:nth-last-[1]:border-b-0 md:nth-last-[2]:border-b-0 lg:p-12 ${
                            index % 2 === 0 ? 'md:border-green-85 md:border-r' : ''
                          }`}
                        >
                          {/* Category Label */}
                          <div className="mb-8">
                            <span className="border-b-2 border-[#C5E1A5] pb-1 text-lg font-semibold text-gray-900 capitalize lg:text-xl">
                              {article.category}
                            </span>
                          </div>

                          {/* Image Container */}
                          <div className="relative mb-8 ml-auto aspect-video w-[90%] overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-200 md:w-[80%] lg:w-[70%]">
                            {finalCoverImageUrl ? (
                              // 👇 Next.js Image hata kar native img tag lagaya
                              <Image
                                src={finalCoverImageUrl}
                                alt={article.title}
                                fill
                                priority={index < 2}
                                fetchPriority={index < 2 ? 'high' : 'auto'}
                                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 33vw"
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <span className="text-sm text-gray-500">No Image</span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex grow flex-col items-start justify-center gap-4 xl:flex-row xl:items-center">
                            <div>
                              <h3 className="mb-4 text-xl leading-tight font-bold text-gray-900 lg:text-2xl">
                                {article.title}
                              </h3>
                              <p className="mb-8 line-clamp-3 grow text-base text-gray-600">
                                {article.description}
                              </p>
                            </div>

                            {/* Read More Button with Link */}
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
                      )
                    })}
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
