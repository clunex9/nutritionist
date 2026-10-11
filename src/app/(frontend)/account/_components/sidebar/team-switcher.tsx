'use client'

import * as React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { HugeiconsIcon } from '@hugeicons/react'
import { UnfoldMoreIcon, PlusSignIcon } from '@hugeicons/core-free-icons'

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  if (!activeTeam) {
    return null
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-open:bg-sidebar-accent hover:bg-dark-green-20 active:bg-dark-green-20 data-open:text-sidebar-accent-foreground aria-expanded:bg-dark-green-20"
              />
            }
          >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              {activeTeam.logo}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-green-97 truncate font-medium">{activeTeam.name}</span>
              <span className="text-green-97 truncate text-xs">{activeTeam.plan}</span>
            </div>
            <HugeiconsIcon
              icon={UnfoldMoreIcon}
              strokeWidth={2}
              className="text-green-97 ml-auto"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-dark-green-15 border-dark-green-20 min-w-54 border"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-green-97/70 text-xs">Teams</DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="focus:bg-dark-green-20! text-green-97 focus:text-green-97 focus:**:text-green-97! gap-2 p-2"
                >
                  <div className="border-green-97/70 text-green-97/70 flex size-6 items-center justify-center rounded-md border">
                    {team.logo}
                  </div>
                  {team.name}
                  <DropdownMenuShortcut className="text-green-97/70">
                    ⌘{index + 1}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className={'bg-dark-green-20!'} />
            <DropdownMenuGroup>
              <DropdownMenuItem className="focus:bg-dark-green-20! text-green-97 focus:text-green-97 focus:**:text-green-97! gap-2 p-2">
                <div className="border-green-97/70 flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <HugeiconsIcon
                    icon={PlusSignIcon}
                    strokeWidth={2}
                    className="text-green-97/70 size-4"
                  />
                </div>
                <div className="text-green-97/70 font-medium">Add team</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
