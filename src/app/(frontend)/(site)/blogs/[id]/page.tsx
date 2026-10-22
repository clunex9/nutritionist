import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getSingleBlogAction } from '@/actions/blog.action'
import SingleBlogClient from './single-blog-client'

interface PageProps {
  params: Promise<{ id: string }>
}

function BlogSkeleton() {
  return (
    <article className="min-h-screen bg-gray-50/30 pt-6 pb-16 lg:pt-10">
      <div className="container mx-auto max-w-4xl animate-pulse px-4">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <div className="h-4 w-12 rounded bg-gray-200"></div>
          <div className="h-4 w-4 rounded bg-gray-200"></div>
          <div className="h-4 w-12 rounded bg-gray-200"></div>
          <div className="h-4 w-4 rounded bg-gray-200"></div>
          <div className="h-4 w-32 rounded bg-gray-200"></div>
        </div>

        {/* Header Skeleton */}
        <header className="mb-10 text-center md:text-left">
          <div className="mb-4 inline-block h-8 w-24 rounded-full bg-[#C5E1A5]/50"></div>
          <div className="mx-auto mb-3 h-10 w-3/4 rounded bg-gray-200 md:mx-0 md:h-12 lg:h-14"></div>
          <div className="mx-auto mb-6 h-10 w-1/2 rounded bg-gray-200 md:mx-0 md:h-12 lg:h-14"></div>

          {/* Author Box */}
          <div className="border-green-80 flex flex-col items-center justify-between gap-6 rounded-lg border bg-white p-6 md:flex-row md:gap-4">
            <div className="flex w-full items-center justify-center gap-4 md:w-auto md:justify-start">
              <div className="size-10 shrink-0 rounded-md bg-gray-200 lg:size-12.5"></div>
              <div className="flex flex-col gap-2">
                <div className="h-5 w-32 rounded bg-gray-200"></div>
                <div className="h-4 w-48 rounded bg-gray-100"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-md bg-gray-200"></div>
              <div className="size-10 rounded-md bg-gray-200"></div>
            </div>
          </div>
        </header>

        {/* Hero Image Skeleton */}
        <div className="mb-12 aspect-video w-full rounded-lg bg-gray-200"></div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-5 w-full rounded bg-gray-200"></div>
          <div className="h-5 w-[95%] rounded bg-gray-200"></div>
          <div className="h-5 w-[90%] rounded bg-gray-200"></div>
          <div className="h-5 w-[85%] rounded bg-gray-200"></div>
        </div>
      </div>
    </article>
  )
}

// 🔥 1. Move `await params` INSIDE the data loader
async function BlogDataLoader({ params }: PageProps) {
  const { id } = await params

  const initialBlog = await getSingleBlogAction(id)

  if (!initialBlog) return notFound()

  return <SingleBlogClient initialBlog={initialBlog} blogId={id} />
}

// 🔥 2. Make the main page synchronous and pass the Promise down
export default function BlogSinglePage({ params }: PageProps) {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogDataLoader params={params} />
    </Suspense>
  )
}
