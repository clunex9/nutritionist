'use client'

import { useState, useTransition } from 'react'
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
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import { logoutAction } from '@/actions/auth.action'
import { notifyAuthChange } from '@/lib/auth-sync'
import { User } from '@/payload-types'
import { hasCmsAccess } from '@/access/roles'
import Link from 'next/link'
import UserAvatar from '@/components/shared/user-avatar'

export function NavUser({ user }: { user: User }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, startLogout] = useTransition()
  const { isMobile } = useSidebar()

  const handleLogout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()

    if (isLoggingOut) return

    startLogout(async () => {
      const result = await logoutAction()

      if (result.success) {
        setIsOpen(false)
        toast.add({
          type: 'success',
          title: 'See you again soon! 👋',
        })
        router.push('/auth/signin')
        notifyAuthChange()
      } else {
        toast.add({ type: 'error', title: 'Failed to logout. Please try again.' })
      }
    })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu
          open={isOpen}
          onOpenChange={(open) => {
            if (isLoggingOut) return
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
            <UserAvatar user={user} />

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
                  <UserAvatar user={user} />
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
                    cms
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
              disabled={isLoggingOut}
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
