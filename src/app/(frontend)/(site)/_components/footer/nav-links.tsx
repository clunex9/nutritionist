// src/app/(frontend)/(site)/_components/footer/nav-links.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

// 🔥 Array ko component ke bahar rakha taaki har render pe dobara create na ho
const navLinks: { name: string; url: string }[] = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Team', url: '/team' },
  { name: 'Process', url: '/process' },
  { name: 'Pricing', url: '/pricing' },
  { name: 'Blogs', url: '/blogs' },
  { name: 'Contact', url: '/contact' },
]

export default function NavLinks() {
  const pathname = usePathname()

  // 🔥 Helper function for cleaner code
  const checkIsActive = (url: string) => {
    return url === '/' ? pathname === url : pathname === url || pathname.startsWith(`${url}/`)
  }

  return (
    <nav>
      <ul className="flex flex-wrap items-center gap-4">
        {navLinks.map(({ name, url }) => {
          const isActive = checkIsActive(url)

          return (
            <li key={name}>
              <Link
                href={url}
                className={cn(
                  'text-sm font-semibold capitalize transition-colors duration-200',
                  isActive ? 'text-green-70' : 'text-green-97',
                )}
              >
                {name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
