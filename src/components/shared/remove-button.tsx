// src/components/RemoveButton.tsx
'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { HugeiconsIcon } from '@hugeicons/react'
import { TrashIcon } from '@hugeicons/core-free-icons'
import { toggleBookmarkAction, toggleFavoriteAction } from '@/actions/user.action'
import { usePathname } from 'next/navigation'

export default function RemoveButton({
  blogId,
  type,
}: {
  blogId: string
  type: 'favorite' | 'bookmark'
}) {
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  const handleRemove = () => {
    startTransition(async () => {
      try {
        if (type === 'favorite') {
          await toggleFavoriteAction(blogId, pathname)
        } else {
          await toggleBookmarkAction(blogId, pathname)
        }
        toast.add({ type: 'success', title: `Removed from ${type}s` })
      } catch (err: any) {
        toast.add({ type: 'error', title: err.message || 'Failed to remove' })
      }
    })
  }

  return (
    <Button
      variant="destructive"
      size="icon"
      disabled={isPending}
      onClick={handleRemove}
      className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-red-500 opacity-0 shadow-md transition-opacity group-hover:opacity-100 hover:bg-red-600"
      title={`Remove from ${type}s`}
    >
      <HugeiconsIcon icon={TrashIcon} className="h-4 w-4 text-white" />
    </Button>
  )
}
