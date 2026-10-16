'use client'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError, // 👈 FieldError add kiya
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { useTransition } from 'react' // 👈 useTransition import kiya
import z from 'zod' // 👈 Zod import kiya
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordAction } from '@/actions/auth.action'

// 👇 Apni nayi Server Action import ki

// ✅ Schema (Email format validate karne ke liye)
const formSchema = z.object({
  email: z.email('Please enter a valid email address'),
})

export default function ForgotPasswordPage() {
  // 👇 Native React loading state
  const [isPending, startTransition] = useTransition()

  // 👇 Zod resolver form mein add kiya
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    // 👇 Action call
    startTransition(async () => {
      const result = await forgotPasswordAction(data)

      if (result.success) {
        toast.add({ type: 'success', title: 'Reset link sent to your email.' })
        form.reset()
      } else {
        toast.add({ type: 'error', title: result.error })
      }
    })
  }

  return (
    <form id="forgot-form" className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
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
            // 👈 fieldState add kiya
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
                className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 h-10 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
              />
              {/* 👇 Zod error show karne ke liye */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button
            type="submit"
            form="forgot-form"
            disabled={isPending} // 👈 isPending use kiya
            className="bg-green-70 hover:bg-green-80 text-foreground h-10 w-full rounded-sm font-semibold"
          >
            {isPending ? 'Sending reset link...' : 'Send Reset Link'}
          </Button>
        </Field>

        <FieldDescription className="text-dark-green-80 mt-4 text-center">
          Remember your password?{' '}
          <Link
            href="/auth/signin"
            className="hover:text-green-97! font-medium underline underline-offset-4"
          >
            Back to Sign In
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
