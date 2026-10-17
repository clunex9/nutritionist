'use client'

import { Button } from '@/components/ui/button'
import { ArrowUp02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export default function ScrollToTop({ className }: { className?: string }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="text-background text-sm font-semibold">Go To Top</span>
      <Button
        onClick={scrollToTop}
        aria-label="scroll-to-top"
        className="bg-dark-green-20 hover:bg-dark-green-25 flex size-10 cursor-pointer items-center justify-center rounded-md"
      >
        <HugeiconsIcon icon={ArrowUp02Icon} className="text-background" />
      </Button>
    </div>
  )
}
