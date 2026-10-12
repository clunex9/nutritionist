import React from 'react'
import type { Metadata, Viewport } from 'next'
import NextTopLoader from 'nextjs-toploader'
import { Urbanist } from 'next/font/google'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthSyncProvider } from '@/providers/auth-sync.provider'
import { Toaster } from '@/components/ui/toast'
import './styles.css'
import SmoothScrollProvider from '@/providers/smooth-scroll.provider'

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
})

export const viewport: Viewport = {
  themeColor: '#1a3129',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Nutritionist',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={urbanist.variable}>
      <body className="bg-green-97 font-sans antialiased">
        <SmoothScrollProvider>
          <AuthSyncProvider>
            <NextTopLoader color="#cbea7b" />
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </AuthSyncProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
