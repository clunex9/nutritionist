// app/auth/verify-email/[token]/verify-client.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { verifyEmailAction } from '@/actions/auth.action'

export default function VerifyEmailClient({ token }: { token: string }) {
  const [status, setStatus] = useState<'loading' | 'error'>('loading')
  const router = useRouter()

  useEffect(() => {
    let isMounted = true

    const verifyToken = async () => {
      try {
        const result = await verifyEmailAction(token)

        if (result.success && isMounted) {
          // Success hote hi seedha smoothly redirect karein
          router.push(
            `/auth/signin?verified=true&callbackUrl=${encodeURIComponent(result.callbackUrl || '/account/profile')}`,
          )
        } else if (isMounted) {
          setStatus('error')
        }
      } catch (error) {
        if (isMounted) setStatus('error')
      }
    }

    // Call function on mount
    verifyToken()

    return () => {
      isMounted = false
    }
  }, [token, router])

  if (status === 'loading') {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-md flex-col items-center justify-center p-10 text-center">
        {/* Loading Spinner */}
        <div className="border-green-70 mb-4 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
        <h1 className="text-green-97 text-xl font-bold">Verifying your email...</h1>
        <p className="text-dark-green-80 mt-2 text-sm">
          Please wait a moment while we secure your account.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-md flex-col items-center justify-center p-10 text-center">
      <h1 className="text-xl font-bold text-red-500">Verification Failed</h1>
      <p className="mt-4 text-sm text-gray-500">
        The link is invalid or has already been used. Please try logging in or registering again.
      </p>
    </div>
  )
}
