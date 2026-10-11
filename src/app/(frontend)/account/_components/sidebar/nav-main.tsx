'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { ChevronRightIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-green-97/70">Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            defaultOpen={item.isActive}
            className="group/collapsible"
            render={<SidebarMenuItem />}
          >
            <CollapsibleTrigger
              render={
                <SidebarMenuButton
                  className="active:bg-dark-green-20 hover:bg-dark-green-20 hover:text-green-97 active:text-green-97 text-green-97"
                  tooltip={item.title}
                />
              }
            >
              {item.icon}
              <span>{item.title}</span>
              <HugeiconsIcon
                icon={ChevronRightIcon}
                className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90"
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="border-dark-green-20">
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      className="hover:bg-dark-green-20 active:bg-dark-green-20 text-green-97 hover:text-green-97 active:text-green-97"
                      render={<Link href={subItem.url} />}
                    >
                      <span>{subItem.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
