'use client'

import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/shared/password-input'
import { toast } from '@/components/ui/toast'
import { registerAction } from '@/actions/auth.action'
import { getSafeCallbackUrl } from '@/lib/safe-redirect'
import { cn } from 'cn'

const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(60, 'Name cannot exceed 60 characters'),
    email: z.email('Please enter a valid email address'),
    password: z
      .string()
      .min(4, 'Minimum 4 characters required')
      .max(100, 'Password cannot exceed 100 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function SignupForm() {
  const searchParams = useSearchParams()
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  // 1. Naye states add karein
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  // 🔥 URL se callbackUrl yahi Client Component mein nikal lein
  const rawCallbackUrl = searchParams?.get('callbackUrl')
  const callbackUrl = getSafeCallbackUrl(rawCallbackUrl, '/account/profile')

  useEffect(() => {
    const handleResetLoading = () => setIsGoogleLoading(false)
    window.addEventListener('focus', handleResetLoading)
    window.addEventListener('pageshow', handleResetLoading)

    return () => {
      window.removeEventListener('focus', handleResetLoading)
      window.removeEventListener('pageshow', handleResetLoading)
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const processSubmit = async (data: z.infer<typeof formSchema>) => {
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      toast.add({ type: 'error', title: 'You are offline. Check your connection.' })
      return
    }

    try {
      const { confirmPassword, ...backendData } = data
      const result = await registerAction(backendData, callbackUrl)

      if (result.success) {
        // 1. Success States set kiye (Ye UI dikhayega)
        setSubmittedEmail(data.email)
        setIsSuccess(true)

        // 2. Toast dikhaya
        toast.add({
          type: 'success',
          title: 'Account created successfully! 🎉',
          description: 'Please check your email to verify your account.',
        })

        form.reset()
      } else {
        toast.add({
          type: 'error',
          title: result.error || 'Registration failed',
        })
      }
    } catch (error) {
      toast.add({ type: 'error', title: 'Something went wrong. Please try again.' })
    }
  }

  // 3. Component ke return mein sabse upar Success UI add karein
  if (isSuccess) {
    const inboxUrl = getEmailProviderUrl(submittedEmail)

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
            We sent a verification link to{' '}
            <span className="text-green-97 font-semibold">{submittedEmail}</span>
          </p>
        </div>

        <div className="flex w-full max-w-sm flex-col gap-3">
          {/* 🔥 Agar standard provider hai toh Inbox ka button dikhega */}
          {inboxUrl && (
            <a
              href={inboxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                'bg-green-70 hover:bg-green-80 text-foreground h-10 w-full rounded-sm font-semibold',
              )}
            >
              Open Email App
            </a>
          )}

          {/* Standard Signin Button */}
          <Link
            href={`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className={cn(
              buttonVariants({ variant: inboxUrl ? 'outline' : 'default' }),
              inboxUrl
                ? 'border-dark-green-25 text-green-97 hover:text-green-97 hover:bg-dark-green-25 h-10 w-full rounded-sm'
                : 'bg-green-70 hover:bg-green-80 text-foreground h-10 w-full rounded-sm font-semibold',
            )}
            // 🔥 NAYA FIX: Jaate waqt state clean kar dein
            onClick={() => {
              setIsSuccess(false)
              setSubmittedEmail('')
            }}
          >
            Continue to Sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form
      method="POST"
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(processSubmit)}
      noValidate
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-green-97 text-2xl font-bold">Create an account</h1>
          <p className="text-dark-green-80 text-sm text-balance">
            Enter your details below to create your new account
          </p>
        </div>

        {/* Field: Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name" className="text-green-97">
                Name
              </FieldLabel>
              <Input
                {...field}
                id="name"
                required
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                autoCapitalize="words"
                spellCheck="false"
                className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 h-10 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
                required
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 h-10 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Field: Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password" className="text-green-97">
                Password
              </FieldLabel>
              <PasswordInput
                {...field}
                required
                id="password"
                autoComplete="new-password"
                className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 h-10 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
                buttonClassName="text-dark-green-40 hover:text-green-97"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Field: Confirm Password */}
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="confirmPassword" className="text-green-97">
                Confirm Password
              </FieldLabel>
              <PasswordInput
                {...field}
                required
                id="confirmPassword"
                autoComplete="new-password"
                className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 h-10 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
                buttonClassName="text-dark-green-40 hover:text-green-97"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Submit Button */}
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
                Creating...
              </span>
            ) : (
              'Create Account'
            )}
          </Button>
        </Field>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-dark-green-15 *:data-[slot=field-separator-content]:text-dark-green-80 [&>.absolute]:bg-dark-green-25">
          Or continue with
        </FieldSeparator>

        <Field>
          <Button
            variant="outline"
            type="button"
            disabled={form.formState.isSubmitting || isGoogleLoading}
            onClick={() => {
              setIsGoogleLoading(true)
              window.location.href = `/api/auth/google?callbackUrl=${encodeURIComponent(callbackUrl)}`
            }}
            className="bg-dark-green-20 border-dark-green-25 hover:bg-dark-green-25 text-green-97 hover:text-green-97 h-10 w-full cursor-pointer rounded-sm disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isGoogleLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="text-green-70 h-5 w-5 animate-spin"
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
                Connecting to Google...
              </span>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="text-green-70 mr-2 h-5 w-5"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>
          <FieldDescription className="text-dark-green-80 text-center">
            Already have an account?{' '}
            <Link
              href={`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="hover:text-green-97! font-medium underline underline-offset-4"
            >
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

// Ise aap apne helpers ya utils file me rakh sakte hain, ya component me hi define kar sakte hain
// Naya aur Smart Email Provider Helper
function getEmailProviderUrl(email: string) {
  if (!email) return null

  const domain = email.split('@')[1]?.toLowerCase()
  const encodedEmail = encodeURIComponent(email)

  if (['gmail.com', 'googlemail.com'].includes(domain)) {
    // 🔥 FIX: Google Account Chooser ka use karke specific email par redirect
    return `https://accounts.google.com/AccountChooser?Email=${encodedEmail}&continue=https://mail.google.com/mail/`
  }

  if (['outlook.com', 'hotmail.com', 'live.com'].includes(domain)) {
    return 'https://outlook.live.com/mail/0/inbox'
  }

  if (['yahoo.com', 'ymail.com'].includes(domain)) {
    return 'https://mail.yahoo.com'
  }

  if (['icloud.com', 'me.com', 'mac.com'].includes(domain)) {
    return 'https://www.icloud.com/mail'
  }

  return null // Agar custom domain hai toh button hide rahega
}
