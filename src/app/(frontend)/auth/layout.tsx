import React from 'react'
import Link from 'next/link'
import signinImage from './_images/signin-img.jpg'
import Logo from '@/components/shared/logo'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-dark-green-15 grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href={'/'} className="relative z-40">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={signinImage.src}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
