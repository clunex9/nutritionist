'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { verifyEmailAction, resendVerificationAction } from '@/actions/auth.action'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FieldDescription, FieldLabel } from '@/components/ui/field'
import Link from 'next/link'

export default function VerifyEmailClient({ token }: { token: string }) {
  // 👇 Check karein ki user link se aaya hai ya 'resend' button pe click karke
  const isResendMode = token === 'resend'

  // Agar 'resend' mode hai toh loading mat dikhao, seedha form dikhao
  const [status, setStatus] = useState<'loading' | 'error'>(isResendMode ? 'error' : 'loading')
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
    // Agar user sirf email resend karne aaya hai, toh backend verify call mat karo
    if (isResendMode) return

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
  }, [token, router, isResendMode])

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
      {/* 👇 Dynamic Heading: Resend mode me normal title, galat token par Red Error */}
      <h1 className={`text-xl font-bold ${isResendMode ? 'text-green-97' : 'text-red-500'}`}>
        {isResendMode ? 'Verify Your Email' : 'Link Invalid or Already Used'}
      </h1>

      {/* 👇 Dynamic Description */}
      <p className="mt-4 mb-6 text-sm text-gray-400">
        {isResendMode
          ? 'Enter your registered email below to receive a new verification link.'
          : 'This verification link is invalid or has already been used. If your account is not verified yet, you can request a new link below.'}
      </p>

      {/* Resend Form */}
      <form onSubmit={handleResend} className="flex w-full flex-col gap-4">
        <FieldLabel htmlFor="email" className="text-green-97">
          Email
        </FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 h-10 rounded-sm text-center transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
        />

        <Button
          type="submit"
          disabled={isResending}
          className="bg-green-70 hover:bg-green-80 text-foreground h-10 w-full rounded-sm font-semibold disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isResending ? 'Sending...' : 'Resend Verification Link'}
        </Button>
      </form>

      {/* Success/Error Message */}
      {resendMessage && (
        <p
          className={`mt-4 text-sm font-medium ${
            resendMessage.type === 'success' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {resendMessage.text}
        </p>
      )}

      <FieldDescription className="text-dark-green-80 mt-4! text-center">
        Already verified or want to go back?{' '}
        <Link
          href="/auth/signin"
          className="hover:text-green-97! font-medium underline underline-offset-4"
        >
          Back to Sign In
        </Link>
      </FieldDescription>
    </div>
  )
}
