'use client'

import Link from 'next/link'
import { useState } from 'react'

export const VisitSiteButton = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href="/"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '8px',
        width: '100%',
        padding: '10px 12px',
        marginBottom: '16px', // Neeche wali list se thoda gap rakhne ke liye
        backgroundColor: isHovered ? 'var(--theme-elevation-150)' : 'var(--theme-elevation-50)',
        color: 'var(--theme-text)',
        borderRadius: '4px',
        border: '1px solid var(--theme-elevation-150)',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '12px',
        letterSpacing: '0.5px',
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
        boxSizing: 'border-box',
      }}
      title="Live site par jayen"
    >
      {/* 🌐 Custom Globe Icon */}
      <svg
        style={{ width: '18px', height: '18px', opacity: 0.8 }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
      NUTRITIONIST
    </Link>
  )
}
