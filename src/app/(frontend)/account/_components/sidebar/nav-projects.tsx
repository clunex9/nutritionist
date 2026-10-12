'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  MoreHorizontalCircle01Icon,
  FolderIcon,
  ArrowRightIcon,
  Delete02Icon,
} from '@hugeicons/core-free-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  const { isMobile, setOpenMobile } = useSidebar()
  const pathname = usePathname()
  return (
    <SidebarGroup
    // className="group-data-[collapsible=icon]:hidden"
    >
      <SidebarGroupLabel className="text-green-97/70">Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const isActive = pathname === item.url
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                tooltip={item.name}
                isActive={isActive}
                onClick={() => {
                  if (isMobile) setOpenMobile(false)
                }}
                className={`active:bg-dark-green-20 hover:bg-dark-green-20 text-green-97 hover:text-green-97 active:text-green-97 ${
                  isActive ? 'bg-dark-green-20! text-green-97!' : ''
                }`}
                render={<Link href={item.url} />}
              >
                {item.icon}
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
