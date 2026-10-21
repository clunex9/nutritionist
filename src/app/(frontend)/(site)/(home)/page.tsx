import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Synchronous Import: Ye above-the-fold hai, isko turant load hona chahiye
import Hero from './_sections/hero'

// Server Components with DB Calls: Inko normal import karke Suspense me dalenge
import Blogs from './_sections/blogs'
import Testimonial from './_sections/testimonial'

// Heavy Client Components: Inko lazy load karein
const Features = dynamic(() => import('./_sections/features'))
const Pricing = dynamic(() => import('./_sections/pricing'))

// Loading Skeletons
const SectionSkeleton = () => (
  <div className="bg-green-95 container my-10 h-96 w-full animate-pulse rounded-lg" />
)

export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Blogs />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Testimonial />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Pricing />
      </Suspense>
    </React.Fragment>
  )
}
