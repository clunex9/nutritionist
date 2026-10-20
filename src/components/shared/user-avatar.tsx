'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { User, Avatar as AvatarType } from '@/payload-types'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  user?: User | null
  src?: string | null
  removed?: boolean
  className?: string
  fallbackClassName?: string
  imageClassName?: string
  sizes?: string
  priority?: boolean
  unoptimized?: boolean
  showSkeleton?: boolean
  children?: React.ReactNode
}

export default function UserAvatar({
  user,
  src,
  removed = false,
  className,
  fallbackClassName,
  imageClassName,
  sizes = '40px',
  priority = false,
  unoptimized = false,
  showSkeleton = true,
  children,
}: UserAvatarProps) {
  // 🔥 1. Clean aur explicit states
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const avatarObj =
    typeof user?.avatar === 'object' && user.avatar !== null ? (user.avatar as AvatarType) : null

  // URL generate karna
  const displayAvatar = removed
    ? undefined
    : src || avatarObj?.thumbnailURL || avatarObj?.url || undefined

  // Initials generate karna
  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((n: string) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'U'

  // 🔥 2. Main Logic: Fallback kab dikhana hai?
  // Agar URL hi nahi hai, YA phir image load hone me error aa gayi
  const showFallback = !displayAvatar || hasError

  return (
    <Avatar className={cn('bg-dark-green-20 relative overflow-hidden rounded-md', className)}>
      {!showFallback ? (
        /* 🔵 IMAGE WALA SCENARIO */
        <>
          {/* Shimmer layer tabhi aayegi jab isLoading true ho */}
          {showSkeleton && isLoading && <div className="skeleton-shimmer absolute inset-0 z-20" />}

          <Image
            src={displayAvatar!}
            alt={user?.name || 'User avatar'}
            fill
            priority={priority}
            sizes={sizes}
            unoptimized={unoptimized}
            className={cn('z-10 object-cover', imageClassName)}
            // Jaise hi image successfully load ho jaye, shimmer ko hata do
            onLoad={() => setIsLoading(false)}
            // Agar image broken hai ya fail ho jaye
            onError={() => {
              setIsLoading(false) // Shimmer hatao
              setHasError(true) // Error state set karo taaki fallback dikhe
            }}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </>
      ) : (
        /* 🔵 NO IMAGE / ERROR WALA SCENARIO */
        <AvatarFallback className={cn('text-green-95 bg-transparent', fallbackClassName)}>
          {initials}
        </AvatarFallback>
      )}

      {children}
    </Avatar>
  )
}
