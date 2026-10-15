'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { verifyEmailAction, resendVerificationAction } from '@/actions/auth.action'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function VerifyEmailClient({ token }: { token: string }) {
  const [status, setStatus] = useState<'loading' | 'error'>('loading')
  const [email, setEmail] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const router = useRouter()
  // 🔥 Double-call rokne ke liye useRef
  const hasAttempted = useRef(false)

  useEffect(() => {
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
        text: result.error || 'Could not send link. Please check if the email is correct.',
      })
    }

    setIsResending(false)
  }

  if (status === 'loading') {
    return (
      <div className="flex w-full flex-col items-center justify-center p-10 text-center">
        <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-700 border-t-transparent"></div>
        <h1 className="text-xl font-bold text-green-900">Verifying your email...</h1>
        <p className="mt-2 text-sm text-gray-600">
          Please wait a moment while we secure your account.
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <h1 className="text-xl font-bold text-red-500">Link Invalid or Already Used</h1>

      {/* 👇 Yahan text update kiya gaya hai */}
      <p className="mt-4 mb-6 text-sm text-gray-500">
        This verification link is invalid or has already been used. If your account is not verified
        yet, you can request a new link below.
      </p>

      {/* Resend Form */}
      <form onSubmit={handleResend} className="flex w-full flex-col gap-3">
        <Input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 rounded-sm py-4 text-center transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
        />

        <Button
          type="submit"
          disabled={isResending}
          className="bg-green-70 hover:bg-green-80 text-foreground h-auto w-full rounded-sm py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isResending ? 'Sending...' : 'Resend Verification Link'}
        </Button>
      </form>

      {/* Success/Error Message */}
      {resendMessage && (
        <p
          className={`mt-4 text-sm font-medium ${resendMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}
        >
          {resendMessage.text}
        </p>
      )}
    </div>
  )
}
