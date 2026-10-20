'use client' // ✅ Ye likhna bohot zaruri hai Next.js ke liye

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import lightLogo from '@/assets/svg/light-logo.svg'
import logoBrandName from '@/assets/svg/logo-brand-name.svg'

export default function FooterLogo() {
  const pathname = usePathname()

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Agar user pehle se Home ('/') par hai, toh sirf scroll top hoga
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // Agar kisi aur page (jaise /about) par hai, toh ye automatically Home page par chala jayega (Next.js Link handle karega)
  }

  return (
    <Link
      href="/"
      aria-label="Go to Nutritionist Home"
      className="relative z-40 flex items-center justify-center gap-2"
      onClick={scrollToTop}
    >
      <Image src={lightLogo} alt="light-logo" width={34} height={34} />
      <Image src={logoBrandName} alt="light-logo" width={100} height={20} />
    </Link>
  )
}
