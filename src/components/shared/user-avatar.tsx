'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { User, Avatar as AvatarType } from '@/payload-types'
import { cn } from 'cn'

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
  priority = true,
  unoptimized = false,
  children,
}: UserAvatarProps) {
  const [isLoading, setIsLoading] = useState(true)
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
    if (!displayAvatar) {
      setIsLoading(false)
      return
    }
    setIsLoading(!imgRef.current?.complete)
  }, [displayAvatar])

  return (
    <Avatar className={cn('bg-dark-green-20 relative overflow-hidden rounded-md', className)}>
      {displayAvatar ? (
        <>
          {isLoading && <div className="skeleton-shimmer absolute inset-0 z-20" />}
          <Image
            ref={imgRef}
            src={displayAvatar}
            alt={user?.name || 'User avatar'}
            fill
            priority={priority}
            sizes={sizes}
            unoptimized={unoptimized}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
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
