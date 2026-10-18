'use client'

import { useEffect, useState } from 'react'
import AddToFavorite from '@/components/shared/add-to-favorite'
import AddToBookmark from '@/components/shared/add-to-bookmark'
import { getUserInteractions } from '@/actions/user.action'

export default function SingleBlogActions({ blogId }: { blogId: string }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // 🔥 Loading state add ki

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const data = await getUserInteractions([blogId])
        if (data.favorites.includes(blogId)) setIsFavorited(true)
        if (data.bookmarks.includes(blogId)) setIsBookmarked(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAuthData()
  }, [blogId])

  return (
    <>
      {/* isLoading prop pass kar rahe hain */}
      <AddToFavorite id={blogId} initialFavorited={isFavorited} isLoading={isLoading} />
      <AddToBookmark id={blogId} initialBookmarked={isBookmarked} isLoading={isLoading} />
    </>
  )
}
