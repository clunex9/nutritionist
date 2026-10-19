import { Suspense } from 'react'
import SigninForm from './signin-form'

export default function SigninPage() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Suspense
        fallback={
          <div className="flex w-full items-center justify-center py-10">
            <div className="border-t-green-70 h-8 w-8 animate-spin rounded-full border-4 border-white/10"></div>
          </div>
        }
      >
        <SigninForm />
      </Suspense>
    </div>
  )
}
