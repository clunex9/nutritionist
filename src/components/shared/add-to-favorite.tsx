'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { useState, useTransition } from 'react'
import { usePathname } from 'next/navigation' // 👈 1. Pathname import kiya
import { toggleFavoriteAction } from '@/actions/user.action'

export default function AddToFavorite({
  id,
  initialFavorited = false,
}: {
  id: string
  initialFavorited?: boolean
}) {
  const pathname = usePathname() // 👈 2. Current page ka URL nikal liya
  const [isPending, startTransition] = useTransition()
  const [isFavorited, setIsFavorited] = useState(initialFavorited)

  const handleToggle = () => {
    // 1. Current state ko ek variable me save kar lo
    const previousState = isFavorited

    // 2. Optimistic Update (UI ko turant change karo bina server ka wait kiye)
    setIsFavorited(!previousState)

    startTransition(async () => {
      try {
        // 👇 3. Action call karte waqt pathname bhi pass kar diya
        const result = await toggleFavoriteAction(id, pathname)

        // Server jo final state de, wo set karo
        setIsFavorited(result.isFavorited)

        toast.add({
          type: 'success',
          title: result.isFavorited ? 'Added to favorites.' : 'Removed from favorites.',
        })
      } catch (error: any) {
        setIsFavorited(previousState)

        toast.add({
          type: 'error',
          title: error.message || 'Failed to update favorite.',
        })
      }
    })
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      variant="outline"
      size="icon"
      className="bg-green-95 border-green-85 hover:bg-green-90 size-10 cursor-pointer rounded-sm lg:size-12.5"
      title="favorite-button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.3337 7.38518C18.3337 8.67395 17.8389 9.91177 16.9551 10.8274C14.921 12.9359 12.9482 15.1344 10.8381 17.1664C10.3544 17.6254 9.58712 17.6086 9.12432 17.1289L3.04512 10.8274C1.20762 8.92267 1.20762 5.84769 3.04512 3.94298C4.90069 2.01954 7.92361 2.01954 9.77918 3.94298L10.0001 4.17201L10.221 3.9431C11.1107 3.02042 12.3223 2.5 13.5881 2.5C14.8538 2.5 16.0654 3.02037 16.9551 3.94298C17.8389 4.8587 18.3337 6.09647 18.3337 7.38518Z"
          stroke="#4C4C4C"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill={isFavorited ? '#FF4B4B' : 'none'}
          className={isFavorited ? 'stroke-red-500' : 'stroke-[#4C4C4C]'}
        />
      </svg>
    </Button>
  )
}
