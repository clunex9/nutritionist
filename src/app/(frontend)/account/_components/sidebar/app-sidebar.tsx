'use client'

import * as React from 'react'

import { NavProjects } from '@/app/(frontend)/account/_components/sidebar/nav-projects'
import { NavUser } from '@/app/(frontend)/account/_components/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  LayoutBottomIcon,
  AudioWave01Icon,
  CommandIcon,
  ComputerTerminalIcon,
  RoboticIcon,
  BookOpen02Icon,
  Settings05Icon,
  ProfileIcon,
  FavouriteIcon,
  Bookmark01Icon,
} from '@hugeicons/core-free-icons'
import { SidebarLogo } from './sidebar-logo'
import { User } from '@/payload-types'
import logoBrandName from '@/assets/svg/logo-brand-name.svg'
import lightLogo from '@/assets/svg/light-logo.svg'
import Image from 'next/image'

const data = {
  brand: {
    name: <Image src={logoBrandName} alt="light-logo" width={100} height={20} />,
    logo: <Image src={lightLogo} alt="light-logo" width={34} height={34} />,
    plan: 'Tagline ya Version',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: <HugeiconsIcon icon={LayoutBottomIcon} strokeWidth={2} />,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: <HugeiconsIcon icon={AudioWave01Icon} strokeWidth={2} />,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: <HugeiconsIcon icon={CommandIcon} strokeWidth={2} />,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: <HugeiconsIcon icon={ComputerTerminalIcon} strokeWidth={2} />,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: <HugeiconsIcon icon={RoboticIcon} strokeWidth={2} />,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: <HugeiconsIcon icon={BookOpen02Icon} strokeWidth={2} />,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Profile',
      url: '/account/profile',
      icon: <HugeiconsIcon icon={ProfileIcon} />,
    },
    {
      name: 'Favorites',
      url: '/account/favorites',
      icon: <HugeiconsIcon icon={FavouriteIcon} />,
    },
    {
      name: 'Bookmarks',
      url: '/account/bookmarks',
      icon: <HugeiconsIcon icon={Bookmark01Icon} />,
    },
  ],
}

// 👇 Yahan `user` ko as a prop receive kiya hai
export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User | null }) {
  return (
    <React.Fragment>
      <style>{`
        [data-mobile="true"][data-sidebar="sidebar"] {
          background-color: var(--color-dark-green-15) !important;
        }
      `}</style>

      <Sidebar
        collapsible="icon"
        {...props}
        className="**:data-[sidebar=sidebar]:bg-dark-green-15 border-r-dark-green-15"
      >
        <SidebarHeader>
          <SidebarLogo brand={data.brand as any} />
        </SidebarHeader>
        <SidebarContent>
          <NavProjects projects={data.projects} />
        </SidebarContent>
        <SidebarFooter>{user ? <NavUser user={user} /> : null}</SidebarFooter>
        {/* <SidebarRail /> */}
      </Sidebar>
    </React.Fragment>
  )
}
