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

const data = {
  brand: {
    name: (
      <svg
        width="107"
        height="13"
        viewBox="0 0 107 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-fit! w-fit!"
      >
        <path
          d="M9.231 9.112V0.561H11.815V12.461H8.092L2.873 3.927H2.584V12.461H0V0.561H3.485V0.578H3.723L8.925 9.112H9.231Z"
          fill="white"
        />
        <path
          d="M21.216 2.924H23.8V12.461H21.216V11.067H21.097C20.485 11.917 19.618 12.461 17.901 12.461C13.872 12.461 13.77 9.095 13.77 7.701V2.924H16.337V7.701C16.337 8.449 16.167 10.251 18.649 10.251C20.876 10.251 21.216 8.823 21.216 7.531V2.924Z"
          fill="white"
        />
        <path
          d="M29.274 5.134V8.517V8.721C29.274 10.098 29.886 9.911 32.368 9.775V12.291C32.368 12.291 31.858 12.461 29.274 12.461C26.673 12.461 26.673 10.336 26.673 8.959V5.134H25.415V2.958H26.673V0.204H29.274V2.958H32.368V5.134H29.274Z"
          fill="white"
        />
        <path
          d="M39.6461 2.924C40.3261 2.924 40.8871 3.077 41.3291 3.179L40.9211 5.61C40.6831 5.542 40.0201 5.406 39.2041 5.406C37.2831 5.406 36.7221 6.902 36.7221 8.194V12.461H34.1381V2.924H36.7221V4.335H36.8751C37.4191 3.417 37.9971 2.924 39.6461 2.924Z"
          fill="white"
        />
        <path
          d="M45.2788 12.461H42.7118V2.992H45.2788V12.461ZM45.2788 2.312H42.7118V0H45.2788V2.312Z"
          fill="white"
        />
        <path
          d="M50.9111 5.134V8.517V8.721C50.9111 10.098 51.5231 9.911 54.0051 9.775V12.291C54.0051 12.291 53.4951 12.461 50.9111 12.461C48.3101 12.461 48.3101 10.336 48.3101 8.959V5.134H47.0521V2.958H48.3101V0.204H50.9111V2.958H54.0051V5.134H50.9111Z"
          fill="white"
        />
        <path
          d="M58.2925 12.461H55.7255V2.992H58.2925V12.461ZM58.2925 2.312H55.7255V0H58.2925V2.312Z"
          fill="white"
        />
        <path
          d="M65.3698 2.754C68.2768 2.754 70.6908 4.301 70.6908 7.616C70.6908 10.965 68.2768 12.461 65.3698 12.461C62.4798 12.461 60.0658 10.914 60.0658 7.616C60.0658 4.335 62.4798 2.754 65.3698 2.754ZM65.3698 10.115C67.0018 10.115 68.1578 9.333 68.1578 7.616C68.1578 5.848 67.0018 5.117 65.3698 5.117C63.7548 5.117 62.5988 5.814 62.5988 7.616C62.5988 9.401 63.7548 10.115 65.3698 10.115Z"
          fill="white"
        />
        <path
          d="M78.3236 2.924C82.3526 2.924 82.4546 6.307 82.4546 7.701V12.461H79.8876V7.701C79.8876 6.953 80.0406 5.151 77.5756 5.151C75.3316 5.151 75.0086 6.579 75.0086 7.871V12.461H72.4246V2.924H75.0086V4.335H75.1276C75.7396 3.485 76.6066 2.924 78.3236 2.924Z"
          fill="white"
        />
        <path
          d="M86.9687 12.461H84.4017V2.992H86.9687V12.461ZM86.9687 2.312H84.4017V0H86.9687V2.312Z"
          fill="white"
        />
        <path
          d="M93.642 6.681C95.801 7.004 98.249 7.378 98.249 9.639C98.249 12.002 96.549 12.461 93.625 12.461C91.466 12.461 89.987 12.07 89.222 11.305C88.559 10.642 88.559 9.843 88.576 9.35V9.163H91.228V9.248C91.228 10.064 91.84 10.438 93.557 10.438C94.594 10.438 95.58 10.302 95.58 9.673C95.58 8.959 94.662 8.823 93.625 8.704C93.489 8.687 93.353 8.67 93.217 8.653C90.48 8.296 88.78 7.684 88.78 5.78C88.78 4.454 89.545 2.873 93.217 2.873C97.161 2.873 97.994 4.624 97.994 6.086V6.171H95.359V6.086C95.359 5.338 94.713 4.93 93.217 4.93C91.772 4.93 91.466 5.457 91.466 5.746C91.466 6.171 91.755 6.409 93.421 6.664L93.642 6.681Z"
          fill="white"
        />
        <path
          d="M103.3 5.134V8.517V8.721C103.3 10.098 103.912 9.911 106.394 9.775V12.291C106.394 12.291 105.884 12.461 103.3 12.461C100.699 12.461 100.699 10.336 100.699 8.959V5.134H99.4407V2.958H100.699V0.204H103.3V2.958H106.394V5.134H103.3Z"
          fill="white"
        />
      </svg>
    ),
    logo: (
      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7.5! w-7.5!"
      >
        <path
          d="M16.8991 13.7498C11.7468 8.73683 15.2958 0 22.4844 0C29.673 0 33.222 8.73684 28.0698 13.7498L22.4844 19.1842L16.8991 13.7498Z"
          fill="#CBEA7B"
        />
        <path
          d="M16.9313 31.2502C11.7791 36.2632 15.3281 45 22.5166 45C29.7052 45 33.2542 36.2632 28.102 31.2502L22.5166 25.8158L16.9313 31.2502Z"
          fill="#CBEA7B"
        />
        <path
          d="M13.7498 28.1014C8.73683 33.2537 0 29.7046 0 22.5161C0 15.3275 8.73684 11.7785 13.7498 16.9307L19.1842 22.5161L13.7498 28.1014Z"
          fill="#CBEA7B"
        />
        <path
          d="M31.2502 28.0692C36.2632 33.2214 45 29.6724 45 22.4838C45 15.2953 36.2632 11.7463 31.2502 16.8985L25.8158 22.4838L31.2502 28.0692Z"
          fill="#CBEA7B"
        />
      </svg>
    ),
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

      <Sidebar collapsible="icon" {...props} className="**:data-[sidebar=sidebar]:bg-dark-green-15">
        <SidebarHeader>
          <SidebarLogo brand={data.brand as any} />
        </SidebarHeader>
        <SidebarContent>
          <NavProjects projects={data.projects} />
        </SidebarContent>
        <SidebarFooter>{user ? <NavUser user={user} /> : null}</SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </React.Fragment>
  )
}
