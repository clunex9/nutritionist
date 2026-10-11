import React from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getServerAuth } from '@/lib/get-server-user'
import { AppSidebar } from './_components/sidebar/app-sidebar'
import Topbar from './_components/topbar'
import { redirect } from 'next/navigation'

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const auth = await getServerAuth()

  // Server ne confirm kiya ki token invalid/expired hai:
  // route handler cookie saaf karke signin bhejega.
  // redirect() ko try/catch me mat daalna.
  if (auth.status === 'unauthenticated') {
    redirect('/api/auth/clear')
  }

  // DB/server issue: cookie ko mat chhedo, error boundary Retry dikhayega.
  if (auth.status === 'error') {
    throw new Error('SESSION_VERIFY_FAILED')
  }
  return (
    <SidebarProvider>
      <AppSidebar user={auth.user} />
      <SidebarInset>
        <Topbar />
        <div className="flex-1 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
