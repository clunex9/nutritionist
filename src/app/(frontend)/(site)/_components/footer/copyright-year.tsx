// src/app/(frontend)/(site)/_components/footer/copyright-year.tsx
'use client'

import { useState, useEffect } from 'react'

export default function CopyrightYear() {
  const [year, setYear] = useState('')

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  // Jab tak client pe JS load na ho tab tak ek fallback year dikhega (hydration mismatch se bachne ke liye)
  return <span>{year || '2024'}</span>
}
