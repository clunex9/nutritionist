import React from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getServerUser } from '@/lib/get-server-user'
import { AppSidebar } from './_components/sidebar/app-sidebar'
import Topbar from './_components/topbar'

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser()

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <Topbar />
        <div className="flex-1 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
