'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import PasswordInput from '@/components/shared/password-input'
import { useParams, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/toast'
import { resetPasswordAction } from '@/actions/auth.action'
import { notifyAuthChange } from '@/lib/auth-sync'

// ✅ Zod Schema
const formSchema = z
  .object({
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

export default function ResetPasswordPage() {
  const router = useRouter()
  const params = useParams()
  const token = params.token as string

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  // ✅ Function ko async banayein
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!token) {
      toast.add({ type: 'error', title: 'Invalid or missing token.' })
      return
    }

    try {
      // 1. API Call normally await karein (Is waqt isSubmitting = true rahega)
      const result = await resetPasswordAction({
        token,
        password: data.password,
      })

      if (result.success) {
        toast.add({ type: 'success', title: 'Password Reset & Login successful! 🎉' })
        form.reset()
        notifyAuthChange()

        // 2. Sirf Navigation ko transition mein daalein (Is waqt isPending = true ho jayega)
        startTransition(() => {
          router.push('/account/profile')
        })
      } else {
        toast.add({ type: 'error', title: result.error || 'Failed to reset password.' })
      }
    } catch (error) {
      toast.add({ type: 'error', title: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <div className="mb-2 flex flex-col items-center gap-1 text-center">
          <h1 className="text-green-97 text-2xl font-bold">Reset Password</h1>
          <p className="text-dark-green-80 mt-2 text-sm text-balance">
            Please enter your new password below.
          </p>
        </div>

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

        {/* Submit Button with Loading Spinner & Redirect State */}
        <Field>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || isPending}
            className="bg-green-70 hover:bg-green-80 text-foreground h-10 w-full rounded-sm font-semibold disabled:cursor-not-allowed disabled:opacity-80"
          >
            {form.formState.isSubmitting || isPending ? (
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
                {form.formState.isSubmitting ? 'Updating...' : 'Redirecting...'}
              </span>
            ) : (
              'Update Password'
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
