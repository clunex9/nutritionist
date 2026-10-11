'use client'

import { useAuth } from '@payloadcms/ui'

export function CustomAvatar() {
  const { user } = useAuth()

  // 1. Avatar URL safely extract karein
  let avatarUrl = ''
  if (user?.avatar && typeof user.avatar === 'object' && user.avatar !== null) {
    const avatarObj = user.avatar as any
    avatarUrl = avatarObj?.thumbnailURL || avatarObj?.url || ''
  }

  const exactSize = '30px'

  // 2. Agar profile photo hai
  if (avatarUrl) {
    return (
      <div
        style={{
          width: exactSize,
          height: exactSize,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.5px solid var(--theme-elevation-300)',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={avatarUrl}
          alt={user?.name || 'User'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    )
  }

  // 3. Agar photo nahi hai toh (KB/U initials)
  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U'

  return (
    <>
      {/* 👇 Master Fix: Yeh style tag parent link ki underline ko force-remove kar dega */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .my-custom-avatar-wrapper {
            text-decoration: none !important;
          }
          a:has(.my-custom-avatar-wrapper),
          button:has(.my-custom-avatar-wrapper) {
            text-decoration: none !important;
          }
        `,
        }}
      />

      <div
        className="my-custom-avatar-wrapper"
        style={{
          width: exactSize,
          height: exactSize,
          borderRadius: '50%',
          backgroundColor: 'var(--theme-elevation-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--theme-text)',
          fontSize: '12px',
          fontWeight: '700',
          border: '1.5px solid var(--theme-elevation-300)',
          boxSizing: 'border-box',
        }}
      >
        {initials}
      </div>
    </>
  )
}
