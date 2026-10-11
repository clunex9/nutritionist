import React from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getServerUser } from '@/lib/get-server-user'
import { AppSidebar } from './_components/sidebar/app-sidebar'
import Topbar from './_components/topbar'
import { redirect } from 'next/navigation'

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser()

  if (!user) {
    redirect('/api/auth/clear')
  }
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
