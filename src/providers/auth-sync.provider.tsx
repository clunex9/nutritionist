'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { listenAuthChange } from '@/lib/auth-sync' // Apna path check kar lena

export const AuthSyncProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  useEffect(() => {
    // 1. Listen start karo
    const unsubscribe = listenAuthChange(() => {
      router.refresh()
    })

    // 2. React cleanup function
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [router])

  return children
}
