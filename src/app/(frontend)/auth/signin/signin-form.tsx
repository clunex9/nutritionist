// 'use client'

// import Link from 'next/link'
// import { Controller, useForm } from 'react-hook-form'
// import { useEffect, useRef, useState } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import z from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'

// import { Button } from '@/components/ui/button'
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   FieldSeparator,
// } from '@/components/ui/field'
// import { Input } from '@/components/ui/input'
// import PasswordInput from '@/components/shared/password-input'
// import { toast } from '@/components/ui/toast'
// import { loginAction } from '@/actions/auth.action'

// // ✅ Zod Schema
// const formSchema = z.object({
//   email: z.email('Please enter a valid email address'),
//   password: z.string().min(1, 'Password is required'),
// })

// export default function SigninPage({ callbackUrl }: { callbackUrl: string }) {
//   const router = useRouter()
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false)
//   const searchParams = useSearchParams()

//   // 🔥 Double toast rokne ke liye useRef
//   const hasToasted = useRef(false)

//   // ✅ Verification Success Message Logic
//   useEffect(() => {
//     if (searchParams?.get('verified') === 'true' && !hasToasted.current) {
//       hasToasted.current = true

//       toast.add({
//         type: 'success',
//         title: 'Account Verified! 🎉',
//         description: 'You can now log in with your credentials.',
//       })

//       // URL se '?verified=true' hata dein taaki refresh par wapas toast na aaye
//       const cleanUrl = callbackUrl
//         ? `/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
//         : '/auth/signin'

//       router.replace(cleanUrl, { scroll: false })
//     }
//   }, [searchParams, router, callbackUrl])

//   useEffect(() => {
//     const handleResetLoading = () => {
//       setIsGoogleLoading(false)
//     }

//     window.addEventListener('focus', handleResetLoading)
//     window.addEventListener('pageshow', handleResetLoading)

//     return () => {
//       window.removeEventListener('focus', handleResetLoading)
//       window.removeEventListener('pageshow', handleResetLoading)
//     }
//   }, [])

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   })

//   // ✅ Core Submit Logic
//   const processSubmit = async (data: z.infer<typeof formSchema>) => {
//     if (typeof window !== 'undefined' && !window.navigator.onLine) {
//       toast.add({ type: 'error', title: 'You are offline. Check your connection.' })
//       return
//     }

//     try {
//       const result = await loginAction(data)

//       if (result.success) {
//         form.reset()
//         toast.add({ type: 'success', title: 'You have successfully logged in!' })
//         router.push(callbackUrl)
//         router.refresh()
//       } else {
//         toast.add({ type: 'error', title: result.error || 'Invalid credentials' })
//         form.setValue('password', '')
//       }
//     } catch (error) {
//       toast.add({ type: 'error', title: 'Something went wrong. Please try again.' })
//       console.error('Login Error:', error)
//     }
//   }

//   return (
//     <form
//       method="POST"
//       className="flex flex-col gap-6"
//       onSubmit={form.handleSubmit(processSubmit)}
//       noValidate
//     >
//       <FieldGroup>
//         <div className="flex flex-col items-center gap-1 text-center">
//           <h1 className="text-green-97 text-2xl font-bold">Login to your account</h1>
//           <p className="text-dark-green-80 text-sm text-balance">
//             Enter your email below to login to your account
//           </p>
//         </div>

//         {/* Field: Email */}
//         <Controller
//           name="email"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field>
//               <FieldLabel htmlFor="email" className="text-green-97">
//                 Email
//               </FieldLabel>
//               <Input
//                 {...field}
//                 id="email"
//                 required
//                 type="email"
//                 tabIndex={1}
//                 placeholder="m@example.com"
//                 autoComplete="email"
//                 autoCapitalize="none"
//                 autoCorrect="off"
//                 spellCheck="false"
//                 className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 rounded-sm py-4 transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         {/* Field: Password */}
//         <Controller
//           name="password"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field>
//               <div className="flex items-center">
//                 <FieldLabel htmlFor="password" className="text-green-97">
//                   Password
//                 </FieldLabel>
//                 <Link
//                   href="/auth/forgot-password"
//                   className="text-green-97 ml-auto inline-block text-xs underline-offset-4 hover:underline"
//                 >
//                   Forgot your password?
//                 </Link>
//               </div>
//               <PasswordInput
//                 {...field}
//                 required
//                 tabIndex={2}
//                 id="password"
//                 autoComplete="current-password"
//                 className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
//                 buttonClassName="text-dark-green-40 hover:text-green-97"
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Field>
//           <Button
//             type="submit"
//             disabled={form.formState.isSubmitting}
//             className="bg-green-70 hover:bg-green-80 text-foreground h-auto w-full rounded-sm py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-70"
//           >
//             {form.formState.isSubmitting ? (
//               <span className="flex items-center gap-2">
//                 <svg
//                   className="text-foreground h-5 w-5 animate-spin"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-20"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Logging in...
//               </span>
//             ) : (
//               'Login'
//             )}
//           </Button>
//         </Field>

//         <FieldSeparator className="*:data-[slot=field-separator-content]:bg-dark-green-15 *:data-[slot=field-separator-content]:text-dark-green-80 [&>.absolute]:bg-dark-green-25">
//           Or continue with
//         </FieldSeparator>

//         <Field>
//           <Button
//             variant="outline"
//             type="button"
//             disabled={form.formState.isSubmitting || isGoogleLoading}
//             onClick={() => {
//               setIsGoogleLoading(true)
//               window.location.href = `/api/auth/google?callbackUrl=${encodeURIComponent(callbackUrl)}`
//             }}
//             className="bg-dark-green-20 border-dark-green-25 hover:bg-dark-green-25 text-green-97 hover:text-green-97 h-auto w-full cursor-pointer rounded-sm py-2 disabled:cursor-not-allowed disabled:opacity-70"
//           >
//             {isGoogleLoading ? (
//               <span className="flex items-center gap-2">
//                 <svg
//                   className="text-green-70 h-5 w-5 animate-spin"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-20"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Connecting to Google...
//               </span>
//             ) : (
//               <>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   className="text-green-70 mr-2 h-5 w-5"
//                 >
//                   <path
//                     d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
//                     fill="currentColor"
//                   />
//                 </svg>
//                 Login with Google
//               </>
//             )}
//           </Button>
//           <FieldDescription className="text-dark-green-80 mt-4 text-center">
//             Don&apos;t have an account?{' '}
//             <Link
//               href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
//               className="hover:text-green-97! font-medium underline underline-offset-4"
//             >
//               Sign up
//             </Link>
//           </FieldDescription>
//         </Field>
//       </FieldGroup>
//     </form>
//   )
// }

'use client'

import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
import { loginAction } from '@/actions/auth.action'
import { notifyAuthChange } from '@/lib/auth-sync'

const formSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  AccountExistsWithEmail:
    'An account with this email already exists. Please login with your email and password.',
  EmailNotVerified: 'Your Google email is not verified.',
  OAuthStateMismatch: 'Security check failed. Please try logging in with Google again.',
  NoCode: 'Google authentication was cancelled.',
  OAuthFailed: 'Google authentication failed. Please try again.',
}

export default function SigninForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter()
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const searchParams = useSearchParams()
  const hasToasted = useRef(false)

  // ✅ Verification Success + OAuth Error Toasts
  useEffect(() => {
    if (hasToasted.current) return

    const verified = searchParams?.get('verified')
    const errorCode = searchParams?.get('error')

    if (verified === 'true') {
      hasToasted.current = true
      toast.add({
        type: 'success',
        title: 'Account Verified! 🎉',
        description: 'You can now log in with your credentials.',
      })
    } else if (errorCode) {
      hasToasted.current = true
      toast.add({
        type: 'error',
        title: 'Sign-in Error',
        description: OAUTH_ERROR_MESSAGES[errorCode] || 'Authentication failed. Please try again.',
      })
    } else {
      return
    }

    const cleanUrl = callbackUrl
      ? `/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
      : '/auth/signin'

    router.replace(cleanUrl, { scroll: false })
  }, [searchParams, router, callbackUrl])

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
      email: '',
      password: '',
    },
  })

  const processSubmit = async (data: z.infer<typeof formSchema>) => {
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      toast.add({ type: 'error', title: 'You are offline. Check your connection.' })
      return
    }

    try {
      const result = await loginAction(data)

      if (result.success) {
        form.reset()
        toast.add({ type: 'success', title: 'You have successfully logged in!' })
        notifyAuthChange() // 🔥 Sync auth state across components/tabs
        router.push(callbackUrl)
        router.refresh()
      } else {
        toast.add({ type: 'error', title: result.error || 'Invalid credentials' })
        form.setValue('password', '')
      }
    } catch (error) {
      toast.add({ type: 'error', title: 'Something went wrong. Please try again.' })
      console.error('Login Error:', error)
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
          <h1 className="text-green-97 text-2xl font-bold">Login to your account</h1>
          <p className="text-dark-green-80 text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

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
                tabIndex={1}
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

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password" className="text-green-97">
                  Password
                </FieldLabel>
                <Link
                  href="/auth/forgot-password"
                  className="text-green-97 ml-auto inline-block text-xs underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <PasswordInput
                {...field}
                required
                tabIndex={2}
                id="password"
                autoComplete="current-password"
                className="bg-dark-green-20 border-dark-green-25 text-green-97 placeholder:text-dark-green-40 focus-visible:border-dark-green-40 focus-visible:ring-dark-green-20 focus-visible:ring-offset-dark-green-20 h-10 rounded-sm transition-all duration-300 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:white] focus-visible:ring-offset-2"
                buttonClassName="text-dark-green-40 hover:text-green-97"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-green-70 hover:bg-green-80 text-foreground h-10 w-full rounded-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
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
          <FieldDescription className="text-dark-green-80 mt-4 text-center">
            Don&apos;t have an account?{' '}
            <Link
              href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="hover:text-green-97! font-medium underline underline-offset-4"
            >
              Sign up
            </Link>
          </FieldDescription>
          <FieldDescription className="text-dark-green-80 mt-4 text-center">
            Didn&apos;t verify your email?{' '}
            <Link
              href={`/auth/verify-email/resend`}
              className="hover:text-green-97! font-medium underline underline-offset-4"
            >
              Resend verification link
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
