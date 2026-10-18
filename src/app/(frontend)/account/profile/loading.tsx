import React from 'react'

export default function ProfileLoading() {
  return (
    <section className="px-4 pt-6 pb-10 lg:pb-16">
      <div className="mx-auto max-w-4xl">
        {/* Header Skeleton */}
        <div className="mb-8 flex flex-col items-center md:mb-10 md:items-start">
          <div className="mb-2 h-10 w-64 animate-pulse rounded-md bg-gray-200"></div>
          <div className="h-5 w-80 animate-pulse rounded-md bg-gray-100"></div>
        </div>

        {/* Card Container Skeleton */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          {/* Top Section: Avatar & Upload Button Skeleton */}
          <div className="flex flex-col items-center gap-6 border-b border-gray-100 bg-gray-50/50 p-6 sm:flex-row sm:items-start md:gap-8 md:p-10">
            {/* Avatar Circle */}
            <div className="h-28 w-28 shrink-0 animate-pulse rounded-full bg-gray-200 md:h-32 md:w-32"></div>

            <div className="flex w-full flex-col items-center justify-center gap-3 pt-2 sm:items-start">
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-64 animate-pulse rounded bg-gray-100"></div>

              <div className="flex gap-3">
                {/* Upload Button */}
                <div className="h-10 w-36 animate-pulse rounded-3xl bg-gray-200"></div>
                {/* Remove Button */}
                <div className="h-10 w-28 animate-pulse rounded-3xl bg-gray-100"></div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Form Inputs Skeleton */}
          <div className="space-y-8 p-6 md:space-y-10 md:p-10">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="space-y-2.5">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                <div className="h-14 w-full animate-pulse rounded-xl bg-gray-100"></div>
              </div>
              <div className="space-y-2.5">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                <div className="h-14 w-full animate-pulse rounded-xl bg-gray-100"></div>
              </div>
            </div>

            {/* Gender Row */}
            <div className="space-y-3 pt-2">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="h-14 w-full animate-pulse rounded-xl bg-gray-100"></div>
                <div className="h-14 w-full animate-pulse rounded-xl bg-gray-100"></div>
                <div className="h-14 w-full animate-pulse rounded-xl bg-gray-100"></div>
              </div>
            </div>
          </div>

          {/* Footer Section: Submit Button Skeleton */}
          <div className="flex items-center justify-end border-t border-gray-100 bg-gray-50/50 p-6 md:p-10">
            <div className="h-14 w-full animate-pulse rounded-full bg-gray-200 sm:w-40"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
