'use client'

import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
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
import { useEffect, useState } from 'react'

const formSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email'),
    password: z.string().min(4, 'Minimum 4 characters required'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// 👇 callbackUrl as prop accept kar raha hai
export default function SignupForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter()
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  useEffect(() => {
    const handleResetLoading = () => {
      setIsGoogleLoading(false)
    }

    // Jab bhi user tab par wapas aaye ya page history se restore ho
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
    mode: 'onTouched',
  })

  const processSubmit = async (data: z.infer<typeof formSchema>) => {
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      toast.add({ type: 'error', title: 'You are offline. Check your connection.' })
      return
    }

    try {
      const { confirmPassword, ...backendData } = data
      const result = await registerAction(backendData)

      if (result.success) {
        form.reset()
        toast.add({
          type: 'success',
          title: 'Account created successfully!',
        })

        router.refresh()
        router.push(callbackUrl)
      } else {
        toast.add({ type: 'error', title: result.error })
      }
    } catch (error) {
      toast.add({ type: 'error', title: 'Something went wrong. Please try again.' })
      console.error('Signup Error:', error)
    }
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
                className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
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
                className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
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
                className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
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
                className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
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
            className="bg-green-70 hover:bg-green-80 text-foreground w-full rounded-sm font-semibold disabled:cursor-not-allowed disabled:opacity-80"
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
            className="bg-dark-green-20 border-dark-green-25 hover:bg-dark-green-25 text-green-97 hover:text-green-97 w-full cursor-pointer rounded-sm disabled:cursor-not-allowed disabled:opacity-70"
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
                Login with Google
              </>
            )}
          </Button>
          <FieldDescription className="text-dark-green-80 mt-4 text-center">
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
