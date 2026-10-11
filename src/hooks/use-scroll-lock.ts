import { useEffect } from 'react'

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLocked])
}
