import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

// Synchronous Import (Above the fold)
import Hero from './_sections/hero'

// Client Component with internal scroll logic
import Blogs from './_sections/blogs'

// Server Component (Needs Suspense)
import Testimonial from './_sections/testimonial'

// Heavy Client Components (Lazy loaded)
const Features = dynamic(() => import('./_sections/features'))
const Pricing = dynamic(() => import('./_sections/pricing'))

// ==========================================
// 🔥 PREMIUM CUSTOM SKELETONS (Shimmer UI)
// ==========================================

const FeaturesSkeleton = () => (
  <section className="py-7.5 lg:py-10">
    <div className="container flex flex-col items-center">
      <div className="mb-2 h-10 w-48 animate-pulse rounded-md bg-gray-200"></div>
      <div className="h-4 w-3/4 max-w-2xl animate-pulse rounded-md bg-gray-200"></div>
    </div>
    <div className="container mt-7.5 grid grid-cols-1 gap-5 md:grid-cols-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card
          key={i}
          className="border-green-85 bg-green-95 animate-pulse rounded-lg border p-7.5 ring-0"
        >
          <CardHeader className="p-0">
            <div className="flex items-center gap-4">
              <div className="size-9 shrink-0 rounded-sm bg-gray-200 lg:size-12"></div>
              <div className="h-6 w-1/2 rounded bg-gray-300"></div>
            </div>
          </CardHeader>
          <CardContent className="mt-4 p-0">
            <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
            <div className="mb-2 h-4 w-5/6 rounded bg-gray-200"></div>
            <div className="h-4 w-4/5 rounded bg-gray-200"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
)

const TestimonialSkeleton = () => (
  <section className="overflow-hidden py-7.5 lg:py-10">
    <div className="container flex flex-col items-center">
      <div className="mb-2 h-10 w-64 animate-pulse rounded-md bg-gray-200"></div>
      <div className="h-4 w-3/4 max-w-2xl animate-pulse rounded-md bg-gray-200"></div>
    </div>
    <div className="container mt-7.5">
      <div className="flex gap-5">
        {/* Mimicking Carousel slides */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full min-w-full md:min-w-[calc(50%-10px)] lg:min-w-[calc(33.333%-13px)]"
          >
            <Card className="border-green-85 bg-green-95 flex h-65 animate-pulse flex-col rounded-lg border ring-0">
              <CardHeader className="px-7.5 py-6">
                <div className="size-8 rounded bg-gray-300"></div>
              </CardHeader>
              <CardContent className="flex grow flex-col justify-center px-7.5">
                <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
                <div className="mb-2 h-4 w-5/6 rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              </CardContent>
              <CardFooter className="border-green-85 mt-auto flex items-center gap-3 border-t px-7.5 py-5">
                <div className="size-10 shrink-0 rounded-full bg-gray-300 lg:size-12.5"></div>
                <div className="h-5 w-32 rounded bg-gray-300"></div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      {/* Skeleton for Carousel Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="size-10 animate-pulse rounded-sm bg-gray-200 lg:size-12.5"></div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="size-4 animate-pulse rounded-full bg-gray-200"></div>
          ))}
        </div>
        <div className="size-10 animate-pulse rounded-sm bg-gray-200 lg:size-12.5"></div>
      </div>
    </div>
  </section>
)

const PricingSkeleton = () => (
  <section className="py-7.5 lg:py-10">
    <div className="container flex flex-col items-center">
      <div className="mb-4 h-10 w-48 animate-pulse rounded-md bg-gray-200"></div>
      <div className="h-4 w-3/4 max-w-2xl animate-pulse rounded-md bg-gray-200"></div>
    </div>
    <div className="container mt-7.5 flex flex-col items-center">
      <div className="mb-2 h-12 w-64 animate-pulse rounded-md bg-gray-200"></div>
      <div className="mb-7.5 h-4 w-32 animate-pulse rounded-md bg-gray-200"></div>
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="border-green-85 bg-green-95 flex animate-pulse flex-col rounded-lg border p-7.5 ring-0"
          >
            <CardHeader className="mb-2 p-0">
              <div className="mb-2 h-8 w-3/4 rounded bg-gray-300"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </CardHeader>
            <CardContent className="mt-4 grow p-0">
              <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-5/6 rounded bg-gray-200"></div>
              <div className="h-4 w-4/5 rounded bg-gray-200"></div>
            </CardContent>
            <CardFooter className="mt-5 flex flex-col gap-6 border-0 p-0">
              <div className="h-10 w-32 self-start rounded bg-gray-300"></div>
              <div className="h-14 w-full rounded-sm bg-gray-300"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

// ==========================================
// 🔥 MAIN HOME COMPONENT
// ==========================================

export default function Home() {
  return (
    <React.Fragment>
      <Hero />

      {/* Features ke layout se exact match karta hua Skeleton */}
      <Suspense fallback={<FeaturesSkeleton />}>
        <Features />
      </Suspense>

      {/* Blogs Client khud apna skeleton manage kar raha hai */}
      <Blogs />

      {/* Testimonial Carousel se match karta hua Skeleton */}
      <Suspense fallback={<TestimonialSkeleton />}>
        <Testimonial />
      </Suspense>

      {/* Pricing Tabs & Cards se match karta hua Skeleton */}
      <Suspense fallback={<PricingSkeleton />}>
        <Pricing />
      </Suspense>
    </React.Fragment>
  )
}
