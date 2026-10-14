'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { useState, useTransition } from 'react'
import { usePathname } from 'next/navigation'
import { toggleBookmarkAction } from '@/actions/user.action'

export default function AddToBookmark({
  id,
  initialBookmarked = false,
}: {
  id: string
  initialBookmarked?: boolean
}) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked)

  const handleToggle = () => {
    const previousState = isBookmarked

    // Optimistic Update
    setIsBookmarked(!previousState)

    const actionPromise = new Promise<{ isBookmarked: boolean }>((resolve, reject) => {
      startTransition(async () => {
        try {
          const result = await toggleBookmarkAction(id, pathname)

          if (result?.error) {
            setIsBookmarked(previousState)
            reject(new Error(result.error))
            return
          }

          setIsBookmarked(result.isBookmarked!)
          resolve(result as { isBookmarked: boolean })
        } catch (error: any) {
          setIsBookmarked(previousState)
          reject(new Error('Failed to update bookmark.'))
        }
      })
    })

    toast.promise(actionPromise, {
      loading: 'Updating bookmarks...',
      success: (data) => (data.isBookmarked ? 'Added to bookmarks.' : 'Removed from bookmarks.'),
      error: (err: Error) => err.message, // "Please login to bookmark." yahan dikhega
    })
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      variant="outline"
      size="icon"
      className={`bg-green-95 border-green-85 hover:bg-green-90 size-10 rounded-sm lg:size-12.5 ${isPending ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
      title="bookmark-button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.16699 17.5V4.5C4.16699 3.39543 5.06242 2.5 6.16699 2.5H13.8337C14.9382 2.5 15.8337 3.39543 15.8337 4.5V17.5L11.0818 14.4453C10.423 14.0217 9.57763 14.0217 8.91881 14.4453L4.16699 17.5Z"
          stroke="#4C4C4C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={isBookmarked ? '#4C4C4C' : 'none'}
        />
      </svg>
    </Button>
  )
}
