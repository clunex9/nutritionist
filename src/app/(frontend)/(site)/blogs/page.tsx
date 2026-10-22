import React, { Suspense } from 'react'
import HeaderInformation from './_sections/header-information'
import CTASection from './_sections/cta'
import BlogsPage from './_sections/blogs'

// 🔥 1. Shimmering Skeleton Component (Ekdum Flipkart/Instagram jaisa)
const BlogsPageSkeleton = () => (
  <section className="scroll-mt-10 pb-7.5 lg:pb-10">
    <div className="container animate-pulse">
      {/* Fake Tabs Shimmer */}
      <div className="mb-10 flex h-18 w-full items-center gap-4 overflow-hidden rounded-b-lg bg-gray-200/50 p-4 lg:px-20">
        <div className="h-10 w-24 rounded-sm bg-gray-300/50"></div>
        <div className="h-10 w-32 rounded-sm bg-gray-300/50"></div>
        <div className="hidden h-10 w-28 rounded-sm bg-gray-300/50 sm:block"></div>
        <div className="hidden h-10 w-36 rounded-sm bg-gray-300/50 md:block"></div>
      </div>

      {/* Fake Grid + 2 Blog Cards Shimmer */}
      <div className="border-green-85 bg-green-95 grid grid-cols-1 rounded-lg border md:grid-cols-2">
        {[0, 1].map((index) => (
          <div
            key={index}
            className={`border-green-85 flex flex-col border-b p-8 last:border-b-0 md:nth-last-[1]:border-b-0 md:nth-last-[2]:border-b-0 lg:p-12 ${
              index % 2 === 0 ? 'md:border-green-85 md:border-r' : ''
            }`}
          >
            {/* Fake Category */}
            <div className="mb-8">
              <div className="h-6 w-32 rounded bg-gray-200"></div>
            </div>

            {/* Fake Cover Image */}
            <div className="mb-8 ml-auto aspect-video w-[90%] rounded-tl-lg rounded-tr-lg bg-gray-200 md:w-[80%] lg:w-[70%]"></div>

            {/* Fake Title, Description & Button */}
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
        ))}
      </div>
    </div>
  </section>
)

// 🔥 3. Main Page Component
export default function Blog() {
  return (
    <React.Fragment>
      <HeaderInformation />

      {/* Ab kharab text ki jagah mast shimmer karta hua UI aayega */}
      <Suspense fallback={<BlogsPageSkeleton />}>
        <BlogsPage />
      </Suspense>

      <CTASection />
    </React.Fragment>
  )
}
