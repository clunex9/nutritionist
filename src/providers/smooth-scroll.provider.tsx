'use client'

import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import type { LenisOptions } from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const LENIS_OPTIONS: LenisOptions = {
  autoRaf: false,
  lerp: 0.08,
  allowNestedScroll: true,
  anchors: true,
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useLenis(ScrollTrigger.update)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update, false, true)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis root ref={lenisRef} options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  )
}
