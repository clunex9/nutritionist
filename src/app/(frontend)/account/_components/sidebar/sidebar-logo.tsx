'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function SidebarLogo({
  brand,
}: {
  brand: {
    name: React.ReactNode
    logo: React.ReactNode
    plan: string
  }
}) {
  const { isMobile, setOpenMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* 👇 SidebarMenuButton ke andar Link wrap kar diya, onClick hata diya */}
        <Link
          href="/"
          className="w-full"
          onClick={() => {
            if (isMobile) setOpenMobile(false)
          }}
        >
          <SidebarMenuButton
            size="lg"
            className="hover:bg-dark-green-20 active:bg-dark-green-20 w-full"
          >
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
              {brand.logo}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-green-97 truncate font-semibold">{brand.name}</span>
              {/* <span className="text-green-97/70 truncate text-xs">{brand.plan}</span> */}
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
