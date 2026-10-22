import BlogsClientSection from './blogs-client.section'
import { fetchPaginatedBlogs, getUniqueBlogCategories } from '@/actions/blog.action'

export default async function BlogsPage() {
  // 1. Initial load (Cached Server Action se)
  const initialData = await fetchPaginatedBlogs(1, 2, 'all')

  // 2. Categories load (Naye Cached Server Action se)
  const uniqueCategories = await getUniqueBlogCategories()

  return (
    <BlogsClientSection
      initialBlogs={initialData.blogs}
      initialHasMore={initialData.hasNextPage}
      categories={uniqueCategories}
    />
  )
}
