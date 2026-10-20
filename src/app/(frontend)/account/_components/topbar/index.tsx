'use client'

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function Topbar() {
  return (
    <div className="bg-dark-green-20 sticky top-0 z-30 flex h-16 w-full shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger className="text-green-97 hover:bg-dark-green-25 hover:text-green-97 -ml-1 rounded-md p-4! [&_svg]:size-4!" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
      </div>
    </div>
  )
}
