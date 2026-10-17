'use client'

import { useState, useTransition, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { hasCmsAccess } from '@/access/roles'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Bookmark01Icon,
  HeartIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  Menu01Icon,
  UserIcon,
  XIcon,
  LoaderCircleIcon,
} from '@hugeicons/core-free-icons'
import { toast } from '@/components/ui/toast'
import Logo from '@/components/shared/logo'
import { logoutAction } from '@/actions/auth.action'
import { notifyAuthChange } from '@/lib/auth-sync'
import type { User } from '@/payload-types'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/shared/user-avatar'

const navlinks: { name: string; url: string }[] = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Team', url: '/team' },
  { name: 'Process', url: '/process' },
  { name: 'Pricing', url: '/pricing' },
  { name: 'Blogs', url: '/blogs' },
  { name: 'Contact', url: '/contact' },
]

export default function NavbarClient({ user }: { user: User | null }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoggingOut, startLogout] = useTransition()
  const canAccessCms = Boolean(user && hasCmsAccess(user))

  useEffect(() => {
    if (!user) {
      setIsMenuOpen(false)
      setIsDropdownOpen(false)
    }
  }, [user])

  const handleLogout = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.preventDefault()
      if (isLoggingOut) return

      startLogout(async () => {
        try {
          const result = await logoutAction()

          if (result?.success) {
            toast.add({ type: 'success', title: 'See you again soon! 👋' })
            notifyAuthChange()
            router.push('/')
            router.refresh()
          } else {
            toast.add({ type: 'error', title: 'Failed to logout. Please try again.' })
          }
        } catch {
          toast.add({ type: 'error', title: 'Network error. Please try again.' })
        }
      })
    },
    [isLoggingOut, router],
  )

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, url: string, isMobile: boolean = false) => {
      if (isMobile) setIsMenuOpen(false)
      if (url === pathname) {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [pathname],
  )

  const toggleMenu = useCallback(() => {
    if (isLoggingOut) return
    setIsMenuOpen((prev) => !prev)
  }, [isLoggingOut])

  return (
    <nav className="bg-dark-green-15 sticky top-0 z-50 w-full shadow-sm">
      <div className="container flex h-17.5 items-center justify-between">
        {/* Logo Section */}
        <Link
          href="/"
          aria-label="Go to Nutritionist Home"
          className="relative z-40"
          onClick={(e) => handleLinkClick(e, '/')}
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navlinks.map(({ name, url }) => {
              const isActive =
                url === '/' ? pathname === url : pathname === url || pathname.startsWith(`${url}/`)

              return (
                <li key={name}>
                  <Link
                    href={url}
                    onClick={(e) => handleLinkClick(e, url)}
                    className={cn(
                      'font-semibold transition-colors',
                      isActive ? 'text-green-70' : 'text-green-97 hover:text-green-90',
                    )}
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
            <li className="flex items-center gap-4">
              {user ? (
                <DropdownMenu
                  open={isDropdownOpen}
                  onOpenChange={(open) => {
                    if (isLoggingOut) return
                    setIsDropdownOpen(open)
                  }}
                >
                  <DropdownMenuTrigger
                    render={
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Open user menu"
                        className="rounded-full"
                      >
                        <UserAvatar
                          user={user}
                          priority={true}
                          sizes="40px"
                          className="rounded-full"
                        />
                      </Button>
                    }
                  />

                  <DropdownMenuContent
                    align="end"
                    className="bg-dark-green-15 border-dark-green-25 min-w-56 rounded-md border ring-0"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>
                        <div className="flex items-center gap-3 text-left text-sm">
                          <UserAvatar user={user} priority={false} showSkeleton={false} />
                          <div className="grid flex-1 text-left leading-tight">
                            <span className="text-green-97 truncate text-sm font-medium">
                              {user.name}
                            </span>
                            <span className="text-green-97/60 truncate text-xs">{user.email}</span>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-white/10" />

                    {/* Admin */}
                    {canAccessCms && (
                      <DropdownMenuItem className="text-green-97 focus:bg-dark-green-20! focus:text-green-97! focus:**:text-green-97! cursor-pointer p-0! transition-colors">
                        <Link href="/cms" className="flex w-full items-center gap-2 px-2 py-1">
                          <HugeiconsIcon icon={LayoutDashboardIcon} size={16} />
                          <span>CMS</span>
                        </Link>
                      </DropdownMenuItem>
                    )}

                    {/* Profile */}
                    <DropdownMenuItem className="text-green-97 focus:bg-dark-green-20! focus:text-green-97! focus:**:text-green-97! cursor-pointer p-0! transition-colors">
                      <Link
                        href="/account/profile"
                        className="flex w-full items-center gap-2 px-2 py-1"
                      >
                        <HugeiconsIcon icon={UserIcon} size={16} />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>

                    {/* Bookmarks */}
                    <DropdownMenuItem className="text-green-97 focus:bg-dark-green-20! focus:text-green-97! focus:**:text-green-97! cursor-pointer p-0! transition-colors">
                      <Link
                        href="/account/bookmarks"
                        className="flex w-full items-center gap-2 px-2 py-1"
                      >
                        <HugeiconsIcon icon={Bookmark01Icon} size={16} />
                        <span>Bookmarks</span>
                      </Link>
                    </DropdownMenuItem>

                    {/* Favorites */}
                    <DropdownMenuItem className="text-green-97 focus:bg-dark-green-20! focus:text-green-97! focus:**:text-green-97! cursor-pointer p-0! transition-colors">
                      <Link
                        href="/account/favorites"
                        className="flex w-full items-center gap-2 px-2 py-1"
                      >
                        <HugeiconsIcon icon={HeartIcon} size={16} />
                        <span>Favorites</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-dark-green-25" />

                    {/* Signout */}
                    <DropdownMenuItem
                      className="text-green-97 focus:bg-dark-green-20! focus:text-green-97! focus:**:text-green-97! cursor-pointer transition-colors"
                      disabled={isLoggingOut}
                      closeOnClick={false}
                      onClick={handleLogout}
                    >
                      {isLoggingOut ? (
                        <HugeiconsIcon icon={LoaderCircleIcon} size={16} className="animate-spin" />
                      ) : (
                        <HugeiconsIcon icon={LogOutIcon} size={16} />
                      )}
                      <span>{isLoggingOut ? 'Logging out...' : 'Log out securely'}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  aria-label="Sign in"
                  href="/auth/signin"
                  className="bg-green-70 hover:bg-green-80 text-dark-green-20 flex size-8 items-center justify-center rounded-full font-semibold transition-colors"
                >
                  <HugeiconsIcon icon={UserIcon} size={18} />
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="text-green-97 relative z-110 p-2 transition-transform hover:scale-105 md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <HugeiconsIcon icon={XIcon} className="text-green-95" />
          ) : (
            <HugeiconsIcon icon={Menu01Icon} className="text-green-70" />
          )}
        </button>

        {/* Backdrop Overlay - ✅ Optimized transition-[opacity,visibility] for 60FPS blur */}
        <div
          aria-hidden="true"
          className={cn(
            'fixed inset-0 z-90 bg-black/60 backdrop-blur-sm transition-[opacity,visibility] duration-300 ease-in-out md:hidden',
            isMenuOpen
              ? 'pointer-events-auto visible opacity-100'
              : 'pointer-events-none invisible opacity-0',
          )}
          onClick={toggleMenu}
        />

        {/* Mobile Drawer - ✅ Shadow only rendered when menu is open */}
        <aside
          aria-hidden={!isMenuOpen}
          className={cn(
            'bg-dark-green-15 fixed top-0 right-0 z-100 flex h-dvh w-[85%] max-w-85 transform flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden',
            isMenuOpen
              ? 'translate-x-0 shadow-[-20px_0_40px_rgba(0,0,0,0.3)]'
              : 'pointer-events-none translate-x-full',
          )}
        >
          {/* Main Navigation Links */}
          <div className="flex-1 overflow-y-auto px-10 pt-28 pb-8">
            <ul className="flex flex-col gap-7">
              {navlinks.map(({ name, url }) => {
                const isActive =
                  url === '/'
                    ? pathname === url
                    : pathname === url || pathname.startsWith(`${url}/`)

                return (
                  <li key={name}>
                    <Link
                      href={url}
                      onClick={(e) => handleLinkClick(e, url, true)}
                      className="group flex w-fit items-center gap-4"
                    >
                      <span
                        className={cn(
                          'bg-green-70 h-0.5 rounded-full transition-all duration-300',
                          isActive
                            ? 'w-6 opacity-100'
                            : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-50',
                        )}
                      />
                      <span
                        className={cn(
                          'text-3xl font-black tracking-tight transition-all duration-300',
                          isActive
                            ? 'text-green-70 translate-x-0'
                            : 'text-white/40 group-hover:translate-x-1 group-hover:text-white/90',
                        )}
                      >
                        {name}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Minimalist User Section at Bottom */}
          <div className="px-10 pb-10">
            <div className="border-t border-white/10 pt-6">
              {user ? (
                <div className="flex flex-col gap-5">
                  {/* Clean Profile Info */}
                  <Link
                    href="/account/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center gap-3"
                  >
                    <UserAvatar user={user} priority={false} showSkeleton={false} />
                    <div className="flex min-w-0 flex-1 flex-col leading-tight">
                      <span className="group-hover:text-green-70 truncate text-sm font-medium text-white transition-colors">
                        {user.name}
                      </span>
                      <span className="truncate text-xs text-white/50">{user.email}</span>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-fit items-center gap-2.5 text-sm font-semibold text-white/50 transition-colors hover:text-red-400 disabled:opacity-50"
                  >
                    {isLoggingOut ? (
                      <HugeiconsIcon
                        icon={LoaderCircleIcon}
                        size={18}
                        className="animate-spin text-red-400"
                      />
                    ) : (
                      <HugeiconsIcon icon={LogOutIcon} size={18} />
                    )}
                    {isLoggingOut ? (
                      <span className="text-red-400">Logging out...</span>
                    ) : (
                      'Log out'
                    )}
                  </button>
                </div>
              ) : (
                <Link
                  className={cn(
                    buttonVariants(),
                    'bg-green-70 text-dark-green-20 hover:bg-green-80 w-full rounded-full py-6 text-lg font-bold',
                  )}
                  href="/auth/signin"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </aside>
      </div>
    </nav>
  )
}
