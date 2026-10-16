'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { verifyEmailAction, resendVerificationAction } from '@/actions/auth.action'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

// 👇 Zod Schema Bahar rakha gaya hai
const formSchema = z.object({
  email: z.email('Please enter a valid email address'),
})

type FormValues = z.infer<typeof formSchema>

export default function VerifyEmailClient({ token }: { token: string }) {
  const isResendMode = token === 'resend'
  const router = useRouter()
  const hasAttempted = useRef(false)

  // 👇 React Hook Form Setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const [status, setStatus] = useState<'loading' | 'error'>(isResendMode ? 'error' : 'loading')
  const [resendMessage, setResendMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  // 👇 Token Verification Logic
  useEffect(() => {
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

  // 👇 Form Submit Handler (Ab e.preventDefault nahi chahiye, RHF data deta hai)
  const onSubmit = async (data: FormValues) => {
    setResendMessage(null)

    const result = await resendVerificationAction(data.email)

    if (result.success) {
      setResendMessage({
        type: 'success',
        text: 'New verification link sent! Please check your inbox.',
      })
      form.reset() // 👈 Success hone par input clear kar dega
    } else {
      setResendMessage({
        type: 'error',
        text: result.error || 'Could not send link. Please check if the email is correct.',
      })
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex w-full flex-col items-center justify-center p-10 text-center">
        <div className="border-green-70 mb-4 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
        <h1 className="text-xl font-bold text-green-900">Verifying your email...</h1>
        <p className="mt-2 text-sm text-gray-600">
          Please wait a moment while we secure your account.
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form
        id="resend-form"
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)} // 👈 HandleSubmit RHF handle karega
      >
        <FieldGroup>
          <div className="mb-2 flex flex-col items-center gap-1 text-center">
            {/* 👇 Dynamic Heading/Text For Verification Context */}
            <h1 className={`text-2xl font-bold ${isResendMode ? 'text-green-97' : 'text-red-500'}`}>
              {isResendMode ? 'Verify Your Email' : 'Link Invalid or Already Used'}
            </h1>
            <p className="text-dark-green-80 mt-2 text-sm text-balance">
              {isResendMode
                ? 'Enter your registered email below to receive a new verification link.'
                : 'This verification link is invalid or has already been used. You can request a new link below.'}
            </p>
          </div>

          {/* Field: Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="email" className="text-green-97 block w-full text-left">
                  Email
                </FieldLabel>
                <Input
                  {...field} // 👈 RHF apne aap onChange, onBlur wagera handle kar lega
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 h-10 w-full rounded-sm text-left transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Field>
            <Button
              type="submit"
              form="resend-form"
              disabled={form.formState.isSubmitting} // 👈 ab isSubmitting properly kaam karega
              className="bg-green-70 hover:bg-green-80 text-foreground h-10 w-full rounded-sm font-semibold disabled:cursor-not-allowed disabled:opacity-80"
            >
              {form.formState.isSubmitting ? 'Sending link...' : 'Resend Verification Link'}
            </Button>
            <FieldDescription className="text-dark-green-80 text-center">
              Already verified or want to go back?{' '}
              <Link
                href="/auth/signin"
                className="hover:text-green-97! font-medium underline underline-offset-4"
              >
                Back to Sign In
              </Link>
            </FieldDescription>
          </Field>

          {/* Success/Error Message */}
          {resendMessage && (
            <p
              className={`text-sm font-medium ${
                resendMessage.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {resendMessage.text}
            </p>
          )}
        </FieldGroup>
      </form>
    </div>
  )
}
