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
  const { isMobile } = useSidebar()
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
                className={`active:bg-dark-green-20 hover:bg-dark-green-20 text-green-97 hover:text-green-97 active:text-green-97 ${
                  isActive ? 'bg-dark-green-20! text-green-97!' : ''
                }`}
                render={<Link href={item.url} />}
              >
                {item.icon}
                <span>{item.name}</span>
              </SidebarMenuButton>
              {/* <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction
                    showOnHover
                    className="aria-expanded:bg-dark-green-20 hover:bg-dark-green-20"
                  />
                }
              >
                <HugeiconsIcon
                  icon={MoreHorizontalCircle01Icon}
                  strokeWidth={2}
                  className="text-green-97"
                />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-dark-green-15 border-dark-green-20 w-fit border"
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem
                  className={
                    'focus:bg-dark-green-20 text-green-97 focus:**:text-green-97! focus:text-green-97'
                  }
                >
                  <HugeiconsIcon icon={FolderIcon} strokeWidth={2} className="text-green-97/70" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    'focus:bg-dark-green-20 text-green-97 focus:**:text-green-97! focus:text-green-97'
                  }
                >
                  <HugeiconsIcon
                    icon={ArrowRightIcon}
                    strokeWidth={2}
                    className="text-green-97/70"
                  />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className={'bg-dark-green-20'} />
                <DropdownMenuItem variant="destructive">
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            </SidebarMenuItem>
          )
        })}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="active:bg-dark-green-20 hover:bg-dark-green-20 text-green-97/70 hover:text-green-97 active:text-green-97">
            <HugeiconsIcon
              icon={MoreHorizontalCircle01Icon}
              strokeWidth={2}
              className="text-green-97/70"
            />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  )
}
