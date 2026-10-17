'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { User, Avatar as AvatarType } from '@/payload-types'
import { cn } from '@/lib/utils' // ✅ Fixed import path

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
  priority = false, // ✅ Default false rakhein taaki har jagah images force-preload na hon
  unoptimized = false,
  showSkeleton = true,
  children,
}: UserAvatarProps) {
  const [isLoading, setIsLoading] = useState(showSkeleton)
  const imgRef = useRef<HTMLImageElement>(null)

  const avatarObj =
    typeof user?.avatar === 'object' && user.avatar !== null ? (user.avatar as AvatarType) : null

  const displayAvatar = removed
    ? undefined
    : src || avatarObj?.thumbnailURL || avatarObj?.url || undefined

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((n: string) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'U'

  useEffect(() => {
    if (!showSkeleton) return
    if (!displayAvatar) {
      setIsLoading(false)
      return
    }
    setIsLoading(!imgRef.current?.complete)
  }, [displayAvatar, showSkeleton])

  return (
    <Avatar className={cn('bg-dark-green-20 relative overflow-hidden rounded-md', className)}>
      {displayAvatar ? (
        <>
          {showSkeleton && isLoading && <div className="skeleton-shimmer absolute inset-0 z-20" />}
          <Image
            ref={imgRef}
            src={displayAvatar}
            alt={user?.name || 'User avatar'}
            fill
            priority={priority}
            sizes={sizes}
            unoptimized={unoptimized}
            onLoad={showSkeleton ? () => setIsLoading(false) : undefined}
            onError={showSkeleton ? () => setIsLoading(false) : undefined}
            className={cn('z-10 object-cover', imageClassName)}
          />
        </>
      ) : (
        <AvatarFallback className={cn('text-green-95 bg-transparent', fallbackClassName)}>
          {initials}
        </AvatarFallback>
      )}
      {children}
    </Avatar>
  )
}
