'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

// Plugins register karein
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ScrollSmoother initialize karein
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5, // Scroll smoothness (apne hisab se 1 se 2 ke beech adjust kar sakte hain)
      effects: true, // Parallax data-speed attributes enable karne ke liye
      normalizeScroll: true, // Mobile aur touch devices par smooth scroll consistency ke liye
    })

    return () => {
      // Cleanup on unmount
      smoother.kill()
    }
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
