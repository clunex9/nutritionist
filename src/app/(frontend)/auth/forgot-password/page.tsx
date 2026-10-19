'use client'

import { useState } from 'react' // 🔥 useState import kiya
import { Button, buttonVariants } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordAction } from '@/actions/auth.action'
import { cn } from 'cn'

const formSchema = z.object({
  email: z.email('Please enter a valid email address'),
})

export default function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      toast.add({ type: 'error', title: 'You are offline. Check your connection.' })
      return
    }

    try {
      const result = await forgotPasswordAction(data)

      if (result.success) {
        // 🔥 Toast dikhane ki jagah hum seedha bada UI dikhayenge
        setSubmittedEmail(data.email)
        setIsSuccess(true)
      } else {
        toast.add({ type: 'error', title: result.error || 'Failed to send reset link.' })
      }
    } catch (error) {
      toast.add({ type: 'error', title: 'Something went wrong. Please try again.' })
    }
  }

  // ✅ NAYA: Success UI (Form hide hone ke baad ye dikhega)
  if (isSuccess) {
    return (
      <div className="flex w-full flex-col items-center justify-center text-center">
        <div className="mb-6 flex flex-col items-center gap-1">
          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-green-97 text-2xl font-bold">Check your email</h1>
          <p className="text-dark-green-80 mt-2 text-sm text-balance">
            We sent a password reset link to{' '}
            <span className="text-green-97 font-semibold">{submittedEmail}</span>
          </p>
        </div>

        <Link
          href="/auth/signin"
          className={cn(
            buttonVariants(),
            'bg-green-70 hover:bg-green-80 text-foreground h-10 w-full max-w-sm rounded-sm font-semibold',
          )}
        >
          Back to Login
        </Link>
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <div className="mb-2 flex flex-col items-center gap-1 text-center">
          <h1 className="text-green-97 text-2xl font-bold">Forgot Password</h1>
          <p className="text-dark-green-80 mt-2 text-sm text-balance">
            Enter your email address and we will send you a link to reset your password.
          </p>
        </div>

        {/* Field: Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email" className="text-green-97">
                Email
              </FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                required
                placeholder="m@example.com"
                autoComplete="email"
                className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 h-10 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-green-70 hover:bg-green-80 text-foreground h-10 w-full rounded-sm font-semibold disabled:cursor-not-allowed disabled:opacity-80"
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="text-foreground h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-20"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending reset link...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </Button>

          <FieldDescription className="text-dark-green-80 text-center">
            Remember your password?{' '}
            <Link
              href="/auth/signin"
              className="hover:text-green-97! font-medium underline underline-offset-4"
            >
              Back to Sign In
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
