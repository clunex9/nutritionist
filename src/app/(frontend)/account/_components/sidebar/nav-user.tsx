'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  UnfoldMoreIcon,
  SparklesIcon,
  CheckmarkBadgeIcon,
  CreditCardIcon,
  NotificationIcon,
  LogoutIcon,
  LoaderCircleIcon,
  LayoutDashboardIcon,
} from '@hugeicons/core-free-icons'
import { useState, useTransition } from 'react' // 👈 useTransition import kiya
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import { logoutAction } from '@/actions/auth.action'
import { notifyAuthChange } from '@/lib/auth-sync'
import { User, Avatar as AvatarType } from '@/payload-types'
import { hasCmsAccess } from '@/access/roles'
import Link from 'next/link'
import Image from 'next/image'

// 👇 Apni Server Action import ki

export function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // 👇 React Query hata kar native useTransition lagaya
  const [isLoggingOut, startLogout] = useTransition()

  const handleLogout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Dropdown ko turant band hone se rokne ke liye
    e.preventDefault()

    // Agar pehle se loading chal rahi hai toh dobara click rok do
    if (isLoggingOut) return

    startLogout(async () => {
      const result = await logoutAction()

      if (result.success) {
        setIsOpen(false) // Success hone par dropdown close karo
        toast.add({
          type: 'success',
          title: 'See you again soon! 👋',
        })
        router.push('/auth/signin')
        notifyAuthChange()
        // ❌ router.refresh() hata diya kyunki action mein revalidatePath('/') handle kar lega
      } else {
        toast.add({ type: 'error', title: 'Failed to logout. Please try again.' })
      }
    })
  }

  const avatarObj =
    typeof user?.avatar === 'object' && user.avatar !== null ? (user.avatar as AvatarType) : null
  const displayAvatar = avatarObj?.thumbnailURL || avatarObj?.url || undefined

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((n: string) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'U'
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu
          open={isOpen}
          onOpenChange={(open) => {
            // ✅ Agar API request chal rahi hai, toh Base UI ko menu close karne se rok do!
            if (isLoggingOut) return // 👈 isLoggingOut use kiya
            setIsOpen(open)
          }}
        >
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="aria-expanded:bg-dark-green-20 hover:bg-dark-green-20 active:bg-dark-green-20"
              />
            }
          >
            <Avatar className="bg-dark-green-20 relative overflow-hidden rounded-md">
              {displayAvatar ? (
                <Image
                  src={displayAvatar}
                  alt={user?.name || 'User'}
                  fill
                  priority
                  sizes="40px"
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="text-green-95 bg-transparent">{initials}</AvatarFallback>
              )}
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-green-97 truncate font-medium">{user.name}</span>
              <span className="text-green-97/70 truncate text-xs">{user.email}</span>
            </div>
            <HugeiconsIcon
              icon={UnfoldMoreIcon}
              strokeWidth={2}
              className="text-green-97 ml-auto size-4"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-dark-green-15 border-dark-green-20 min-w-54 border"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="bg-dark-green-20 relative overflow-hidden rounded-md">
                    {displayAvatar ? (
                      <Image
                        src={displayAvatar}
                        alt={user?.name || 'User'}
                        fill
                        priority
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : (
                      <AvatarFallback className="text-green-95 bg-transparent">
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="text-green-97/70 truncate font-medium">{user.name}</span>
                    <span className="text-green-97/70 truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className={'bg-dark-green-20!'} />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={
                  'focus:bg-dark-green-20 text-green-97 focus:**:text-green-97! focus:text-green-97'
                }
              >
                <HugeiconsIcon icon={SparklesIcon} strokeWidth={2} className="text-green-97/70" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className={'bg-dark-green-20!'} />
            <DropdownMenuGroup>
              {hasCmsAccess(user) && (
                <DropdownMenuItem
                  className={
                    'focus:bg-dark-green-20 text-green-97 focus:**:text-green-97! focus:text-green-97 p-0!'
                  }
                >
                  <Link href={'/cms'} className="flex w-full items-center gap-2 px-2 py-1">
                    <HugeiconsIcon
                      icon={LayoutDashboardIcon}
                      strokeWidth={2}
                      className="text-green-97/70"
                    />
                    CMS
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className={
                  'focus:bg-dark-green-20 text-green-97 focus:**:text-green-97! focus:text-green-97'
                }
              >
                <HugeiconsIcon
                  icon={CheckmarkBadgeIcon}
                  strokeWidth={2}
                  className="text-green-97/70"
                />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem
                className={
                  'focus:bg-dark-green-20 text-green-97 focus:**:text-green-97! focus:text-green-97'
                }
              >
                <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} className="text-green-97/70" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem
                className={
                  'focus:bg-dark-green-20 text-green-97 focus:**:text-green-97! focus:text-green-97'
                }
              >
                <HugeiconsIcon
                  icon={NotificationIcon}
                  strokeWidth={2}
                  className="text-green-97/70"
                />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className={'bg-dark-green-20!'} />

            <DropdownMenuItem
              className="focus:bg-dark-green-20 text-green-97 focus:**:text-green-97! focus:text-green-97"
              disabled={isLoggingOut} // 👈 isLoggingOut use kiya
              closeOnClick={false}
              onClick={handleLogout}
            >
              {isLoggingOut ? (
                <HugeiconsIcon icon={LoaderCircleIcon} className="text-green-97/70 animate-spin" />
              ) : (
                <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} className="text-green-97/70" />
              )}
              {isLoggingOut ? 'Logging out...' : 'Log out'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
