'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useConfig } from '@payloadcms/ui'
import { HugeiconsIcon } from '@hugeicons/react'
import { LayoutDashboardIcon } from '@hugeicons/core-free-icons'

export const DashboardLink = () => {
  const { config } = useConfig()
  const pathname = usePathname()

  const href = config.routes.admin // '/cms'
  const isActive = pathname === href || pathname === `${href}/`

  return (
    <Link
      href={href}
      prefetch={false}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 0',
        marginBottom: '12px',
        color: 'inherit',
        textDecoration: 'none',
        fontWeight: isActive ? 600 : 400,
        opacity: isActive ? 1 : 0.8,
      }}
    >
      <HugeiconsIcon icon={LayoutDashboardIcon} size={14} />
      Dashboard
    </Link>
  )
}
