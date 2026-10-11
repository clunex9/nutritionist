import { ArrowLeft02Icon, Home01Icon, SearchXIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
// import { Home, ArrowLeft, SearchX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="bg-green-97 relative flex min-h-dvh flex-col items-center justify-center overflow-hidden">
      {/* Decorative Background - आपके हीरो सेक्शन जैसा ग्रिड लुक */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-size-[40px_40px]"></div>
      </div>

      <div className="relative z-10 container flex flex-col items-center px-4 text-center">
        {/* Floating Icon with your Glass Shine effect */}
        <div className="bg-dark-green-20 glass-shine relative mb-8 flex h-24 w-24 rotate-3 items-center justify-center rounded-3xl shadow-2xl transition-transform duration-300 hover:rotate-0">
          {/* <SearchX className="text-green-90 relative z-10 h-12 w-12" /> */}
          <HugeiconsIcon icon={SearchXIcon} className="text-green-90 relative z-10 h-12 w-12" />
        </div>

        {/* 404 Text */}
        <h1 className="text-dark-green-15 absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-8xl font-black tracking-tighter opacity-10 select-none md:text-9xl">
          404
        </h1>

        {/* Heading & Paragraph */}
        <div className="mx-auto max-w-lg space-y-4">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-5xl">
            Oops! Page not found.
          </h2>
          <p className="text-muted-foreground text-lg">
            It seems we've lost this page in the matrix. The page you are looking for might have
            been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Call to Actions (CTAs) */}
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="text-green-95 bg-dark-green-20 hover:bg-dark-green-25 flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto"
          >
            {/* <Home className="h-4 w-4" /> */}
            <HugeiconsIcon icon={Home01Icon} className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="text-dark-green-20 bg-green-95 border-dark-green-20/20 hover:bg-green-90 flex w-full items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-sm font-medium transition-all duration-300 sm:w-auto"
          >
            {/* <ArrowLeft className="h-4 w-4" /> */}
            <HugeiconsIcon icon={ArrowLeft02Icon} className="h-4 w-4" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
