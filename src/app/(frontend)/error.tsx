'use client'

import { startTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-4 text-center">
      <p>Abhi server se connect nahi ho pa raha. Aap logged in ho, bas dobara try karo.</p>
      <button
        type="button"
        className="rounded-md border px-4 py-2"
        onClick={() =>
          startTransition(() => {
            router.refresh()
            reset()
          })
        }
      >
        Retry
      </button>
    </div>
  )
}
