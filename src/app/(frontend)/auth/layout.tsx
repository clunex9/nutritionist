import React from 'react'
import Link from 'next/link'
import authImage from '@/assets/images/auth.jpg'
import Image from 'next/image'
import lightLogo from '@/assets/svg/light-logo.svg'
import logoBrandName from '@/assets/svg/logo-brand-name.svg'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-dark-green-15 grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            aria-label="Go to Nutritionist Home"
            className="relative z-40 flex items-center justify-center gap-2"
          >
            <Image src={lightLogo} alt="light-logo" width={34} height={34} />
            <Image src={logoBrandName} alt="light-logo" width={100} height={20} />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={authImage}
          alt="Authentication Background"
          fill
          priority // 🔥 LCP ke liye priority zaroori hai, isko rehne dein
          placeholder="blur" // 🔥 FIX 1: Jab tak original image load hogi, ek fast blur effect dikhega
          sizes="50vw" // Desktop par 50% width hi chahiye, perfect!
          // 🔥 FIX 2: decoding="sync" ko poori tarah hata diya. Ab browser hang nahi hoga!
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
