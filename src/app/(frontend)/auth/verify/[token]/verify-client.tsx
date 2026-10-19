'use client'

import { useEffect, useState, useRef } from 'react'
import { verifyEmailAction } from '@/actions/auth.action'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from 'cn'

export default function VerifyEmailClient({ token }: { token: string }) {
  const hasAttempted = useRef(false)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [callbackDest, setCallbackDest] = useState('/account/profile')

  useEffect(() => {
    if (hasAttempted.current) return
    hasAttempted.current = true

    const verifyToken = async () => {
      try {
        const result = await verifyEmailAction(token)

        if (result.success) {
          setCallbackDest(result.callbackUrl || '/account/profile')
          setStatus('success')
        } else {
          setStatus('error')
        }
      } catch (error) {
        setStatus('error')
      }
    }

    verifyToken()
  }, [token])

  if (status === 'loading') {
    return (
      <div className="flex w-full flex-col items-center justify-center p-10 text-center">
        <div className="border-t-green-70 mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/10"></div>
        <h1 className="text-green-97 text-xl font-bold">Verifying your email...</h1>
        <p className="text-dark-green-80 mt-2 text-sm">Please wait a moment.</p>
      </div>
    )
  }

  // ✅ Success UI
  if (status === 'success') {
    return (
      <div className="flex w-full flex-col items-center justify-center text-center">
        <div className="mb-6 flex flex-col items-center gap-1">
          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-green-97 text-2xl font-bold">Email Verified! 🎉</h1>
          <p className="text-dark-green-80 mt-2 text-sm text-balance">
            Your account has been successfully verified. You can now log in.
          </p>
        </div>

        {/* 🔥 FIX 1: Added asChild prop */}
        <Link
          href={`/auth/signin?callbackUrl=${encodeURIComponent(callbackDest)}`}
          className={cn(
            buttonVariants(),
            'bg-green-70 hover:bg-green-80 text-foreground h-10 w-full max-w-sm rounded-sm font-semibold',
          )}
        >
          Continue to Login
        </Link>
      </div>
    )
  }

  // ✅ Error State
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div className="mb-6 flex flex-col items-center gap-1">
        <h1 className="text-2xl font-bold text-red-500">Link Invalid or Already Used</h1>
        <p className="text-dark-green-80 mt-2 text-sm text-balance">
          This verification link is no longer valid or has already been used to verify your account.
        </p>
      </div>

      {/* 🔥 FIX 2: Added Go to Login option and asChild on Buttons */}
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Link
          href="/auth/signin"
          className={cn(
            buttonVariants(),
            'bg-green-70 hover:bg-green-80 text-foreground h-10 w-full rounded-sm font-semibold',
          )}
        >
          Go to Login
        </Link>

        <Link
          className={cn(
            buttonVariants(),
            'border-dark-green-25 text-green-97 hover:text-green-97 hover:bg-dark-green-25 h-10 w-full rounded-sm',
          )}
          href="/auth/resend"
        >
          Request new link
        </Link>
      </div>
    </div>
  )
}
