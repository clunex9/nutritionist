'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { HugeiconsIcon } from '@hugeicons/react'
import { ImageNotFound01Icon } from '@hugeicons/core-free-icons'

interface BlogCoverImageProps {
  src?: string | null
  alt: string
  className?: string
  imageClassName?: string
  priority?: boolean
  sizes?: string
}

export default function BlogCoverImage({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes = '(max-width: 896px) 100vw, 896px',
}: BlogCoverImageProps) {
  // 🔥 1. Clean explicit states
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // 🔥 2. Logic: Agar source nahi hai YA image load hone me error aayi
  const showFallback = !src || hasError

  if (showFallback) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center bg-gray-100 text-gray-400',
          className,
        )}
      >
        <HugeiconsIcon icon={ImageNotFound01Icon} className="mb-2 size-10 opacity-40" />
        <span className="text-sm font-medium tracking-wide">No Blog Cover Image</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden bg-gray-100', className)}>
      {/* 🔵 Jab tak image aayegi nahi, shimmer chalta rahega */}
      {isLoading && <div className="skeleton-shimmer absolute inset-0 z-20" />}

      <Image
        src={src!}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn('z-10 object-cover', imageClassName)}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
    </div>
  )
}
