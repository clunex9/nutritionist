export default function FavoritesLoading() {
  return (
    <section className="px-4 py-6 md:px-8">
      {/* Header Skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-8 w-48 rounded bg-gray-200 md:h-10"></div>
        <div className="mt-2 h-4 w-64 rounded bg-gray-100 md:h-5"></div>
      </div>

      {/* Cards Skeleton Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border-green-85 bg-green-95 flex h-72 animate-pulse flex-col overflow-hidden rounded-xl border"
          >
            {/* Image Placeholder */}
            <div className="h-48 w-full bg-gray-200/60"></div>

            {/* Content Placeholder */}
            <div className="flex grow flex-col p-4">
              <div className="mb-3 h-3 w-16 rounded bg-gray-200"></div>
              <div className="mb-2 h-5 w-full rounded bg-gray-200"></div>
              <div className="h-5 w-3/4 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
