'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { verifyEmailAction, resendVerificationAction } from '@/actions/auth.action'

export default function VerifyEmailClient({ token }: { token: string }) {
  const [status, setStatus] = useState<'loading' | 'error'>('loading')
  const [email, setEmail] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const router = useRouter()
  // 🔥 Double-call rokne ke liye useRef add kiya hai
  const hasAttempted = useRef(false)

  useEffect(() => {
    // Agar ek baar call ho chuka hai, toh dobara API call mat karo
    if (hasAttempted.current) return
    hasAttempted.current = true

    const verifyToken = async () => {
      try {
        const result = await verifyEmailAction(token)

        if (result.success) {
          router.push(
            `/auth/signin?verified=true&callbackUrl=${encodeURIComponent(result.callbackUrl || '/account/profile')}`,
          )
        } else {
          setStatus('error')
        }
      } catch (error) {
        setStatus('error')
      }
    }

    verifyToken()
  }, [token, router])

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsResending(true)
    setResendMessage(null)

    const result = await resendVerificationAction(email)

    if (result.success) {
      setResendMessage({
        type: 'success',
        text: 'New verification link sent! Please check your inbox.',
      })
      setEmail('')
    } else {
      setResendMessage({
        type: 'error',
        text: 'Could not send link. Please check if the email is correct.',
      })
    }

    setIsResending(false)
  }

  if (status === 'loading') {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-md flex-col items-center justify-center p-10 text-center">
        <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-700 border-t-transparent"></div>
        <h1 className="text-xl font-bold text-green-900">Verifying your email...</h1>
        <p className="mt-2 text-sm text-gray-600">
          Please wait a moment while we secure your account.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-md flex-col items-center justify-center p-10 text-center">
      <h1 className="text-xl font-bold text-red-600">Verification Failed</h1>
      <p className="mt-4 mb-6 text-sm text-gray-500">
        The link is invalid or has expired. If you registered recently, you can request a new link
        below.
      </p>

      {/* Resend Form */}
      <form onSubmit={handleResend} className="flex w-full flex-col gap-3">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-green-97 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isResending}
          className="w-full rounded-md bg-green-700 py-2 text-sm font-medium text-white transition-all hover:bg-green-800 disabled:opacity-70"
        >
          {isResending ? 'Sending...' : 'Resend Verification Link'}
        </button>
      </form>

      {/* Success/Error Message */}
      {resendMessage && (
        <p
          className={`mt-4 text-sm font-medium ${resendMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
        >
          {resendMessage.text}
        </p>
      )}
    </div>
  )
}
