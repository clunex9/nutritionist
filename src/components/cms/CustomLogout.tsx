'use client'

import { useAuth } from '@payloadcms/ui'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export function CustomLogout() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  if (!user) return null

  let avatarUrl = ''
  if (user?.avatar && typeof user.avatar === 'object' && user.avatar !== null) {
    const avatarObj = user.avatar as any
    avatarUrl = avatarObj?.thumbnailURL || avatarObj?.url || ''
  }

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* 🚀 MASTER FIX: Payload ke invisible parent wrapper ko full-width aur bottom me force karne ke liye */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          div:has(> .my-custom-logout-wrapper) {
            width: 100% !important;
            align-self: stretch !important;
            display: flex !important;
            flex-direction: column !important;
            margin-top: auto !important;
            margin-bottom: -16px !important;
          }
        `,
        }}
      />

      <div
        className="my-custom-logout-wrapper"
        ref={menuRef}
        style={{
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* 🚀 POPUP DROPDOWN MENU (SMOOTH ANIMATION FIX) */}
        {/* Conditional rendering hata diya gaya hai taaki CSS transition kaam kare */}
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '0',
            right: '0',
            width: '100%',
            backgroundColor: 'var(--theme-elevation-100)',
            border: '1px solid var(--theme-elevation-200)',
            borderRadius: '4px',
            padding: '8px',
            boxSizing: 'border-box',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            // 🟢 SMOOTH ANIMATION PROPERTIES
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
            pointerEvents: isOpen ? 'auto' : 'none',
            transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease', // Matches trigger timing
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px',
              borderBottom: '1px solid var(--theme-elevation-200)',
              marginBottom: '4px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: 'var(--theme-elevation-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: '0',
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user?.name || 'User'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--theme-text)' }}>
                  {initials}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--theme-text-100)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.name || 'User'}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  opacity: 0.6,
                  color: 'var(--theme-text-500)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.email}
              </span>
            </div>
          </div>

          <Link
            href="/cms/account"
            onClick={() => setIsOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              fontSize: '12px',
              color: 'var(--theme-text)',
              textDecoration: 'none',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--theme-elevation-200)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg
              style={{ width: '14px', height: '14px', opacity: 0.7 }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Account Settings
          </Link>

          <Link
            href="/cms/logout"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              fontSize: '12px',
              color: '#ef4444',
              textDecoration: 'none',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg
              style={{ width: '14px', height: '14px' }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log out
          </Link>
        </div>

        {/* 🟢 MAIN FOOTER TRIGGER BAR */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            cursor: 'pointer',
            color: 'currentColor',
            backgroundColor: isOpen ? 'var(--theme-elevation-150)' : 'transparent',
            borderRadius: '4px',
            width: '100%',
            boxSizing: 'border-box',
            userSelect: 'none',
            transition: 'background-color 0.2s ease',
          }}
          title="Profile & Options"
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: 'var(--theme-elevation-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: '1.5px solid var(--theme-elevation-300)',
            }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user?.name || 'User'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--theme-text)',
                  opacity: 0.9,
                }}
              >
                {initials}
              </span>
            )}
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flexGrow: 1 }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'var(--theme-text-100)',
                lineHeight: '1.2',
                marginBottom: '2px',
              }}
            >
              {user?.name || 'User'}
            </span>
            <span
              style={{
                fontSize: '10px',
                opacity: 0.5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'var(--theme-text-500)',
                lineHeight: '1.2',
              }}
            >
              {user?.email}
            </span>
          </div>

          <svg
            style={{
              width: '14px',
              height: '14px',
              flexShrink: 0,
              opacity: 0.6,
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </>
  )
}
