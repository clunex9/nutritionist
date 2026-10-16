'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import PasswordInput from '@/components/shared/password-input'
import { useParams, useRouter } from 'next/navigation'
import { useTransition } from 'react' // 👈 1. useTransition import kiya
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/toast'
import { resetPasswordAction } from '@/actions/auth.action'
import { notifyAuthChange } from '@/lib/auth-sync'

// 👇 2. Nayi Server Action import ki

// ✅ Schema
const formSchema = z
  .object({
    password: z.string().min(4, 'Minimum 4 characters required'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function ResetPasswordPage() {
  const router = useRouter()
  const params = useParams()
  const token = params.token as string

  // 👇 3. Native React loading state
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (!token) {
      toast.add({ type: 'error', title: 'Invalid or missing token.' })
      return
    }

    // 👇 4. Action call
    startTransition(async () => {
      const result = await resetPasswordAction({
        token,
        password: data.password,
      })

      if (result.success) {
        toast.add({ type: 'success', title: 'Password Reset & Login successful' })
        form.reset()
        router.push('/account/profile')
        notifyAuthChange()
        // router.refresh() ki zaroorat nahi
      } else {
        toast.add({ type: 'error', title: result.error })
      }
    })
  }

  return (
    <form id="reset-form" className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
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
            // 👈 5. fieldState add kiya
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
              {/* 👇 Zod error show karne ke liye */}
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
            form="reset-form"
            disabled={isPending} // 👈 isPending use kiya
            className="bg-green-70 hover:bg-green-80 text-foreground h-10 w-full rounded-sm font-semibold"
          >
            {isPending ? 'Updating...' : 'Update Password'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
