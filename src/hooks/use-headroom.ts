import { RefObject, useEffect, useRef } from 'react'

export function useHeadroom(headerRef: RefObject<HTMLElement | null>) {
  const lastScrollYRef = useRef(0)
  const tickingRef = useRef(false)
  const headerHeightRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const header = headerRef.current
    if (!header) return

    // Initialize scroll position & header height
    lastScrollYRef.current = window.scrollY
    headerHeightRef.current = header.offsetHeight

    // ✅ NEW: Initial values set karein
    document.documentElement.style.setProperty('--header-height', `${headerHeightRef.current}px`)
    document.documentElement.style.setProperty('--header-offset', `0px`)

    const updateHeaderPosition = () => {
      const currentScrollY = window.scrollY
      const diff = currentScrollY - lastScrollYRef.current
      const currentTop = header.style.top ? parseFloat(header.style.top) : 0

      let newTop = currentTop - diff
      newTop = Math.max(-headerHeightRef.current, Math.min(0, newTop))

      header.style.top = `${newTop}px`

      // ✅ NEW: Navbar kitna upar chupa hai, uski exact pixel value update karein
      document.documentElement.style.setProperty('--header-offset', `${newTop}px`)

      lastScrollYRef.current = currentScrollY
      tickingRef.current = false
    }

    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateHeaderPosition)
        tickingRef.current = true
      }
    }

    // ResizeObserver for responsive headers
    const resizeObserver = new ResizeObserver(() => {
      if (header) {
        headerHeightRef.current = header.offsetHeight
        // ✅ NEW: Agar screen size change hone pe header ki height badle, toh ise bhi update karein
        document.documentElement.style.setProperty(
          '--header-height',
          `${headerHeightRef.current}px`,
        )
      }
    })

    resizeObserver.observe(header)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
    }
  }, [])
}
