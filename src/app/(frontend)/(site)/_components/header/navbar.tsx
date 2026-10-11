// 'use client'

// import { useState, useRef } from 'react'
// import Link from 'next/link'
// import { usePathname, useRouter } from 'next/navigation'

// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'

// import { isAdmin } from '@/access/roles'
// import { useScrollLock } from '@/hooks/use-scroll-lock'
// import { useHeadroom } from '@/hooks/use-headroom'
// import { HugeiconsIcon } from '@hugeicons/react'
// import {
//   Bookmark01Icon,
//   HeartIcon,
//   LayoutDashboardIcon,
//   LogOutIcon,
//   Menu01Icon,
//   UserIcon,
//   XIcon,
//   LoaderCircleIcon,
// } from '@hugeicons/core-free-icons'
// import { useLogout, useMe } from '@/services/hooks'
// import { toast } from '@/components/ui/toast'
// import Logo from '@/components/shared/logo'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// const navlinks: { name: string; url: string }[] = [
//   { name: 'Home', url: '/' },
//   { name: 'About', url: '/about' },
//   { name: 'Team', url: '/team' },
//   { name: 'Process', url: '/process' },
//   { name: 'Pricing', url: '/pricing' },
//   { name: 'Blogs', url: '/blogs' },
//   { name: 'Contact', url: '/contact' },
// ]

// export default function Navbar() {
//   const pathname = usePathname()
//   const router = useRouter()
//   const headerRef = useRef<HTMLDivElement>(null)

//   const [isMenuOpen, setIsMenuOpen] = useState(false) // Mobile menu state
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false) // ✅ Desktop dropdown state (Base UI fix)

//   useScrollLock(isMenuOpen)
//   useHeadroom(headerRef)

//   const { data: user, isLoading } = useMe()
//   const displayAvatar = user?.avatar?.thumbnailURL || user?.avatar?.url || user?.googleAvatar || ''
//   const signout = useLogout()

//   // ✅ handleLogout mein event pass kiya aur proper logic lagaya
//   const handleLogout = (e?: React.MouseEvent) => {
//     if (e) e.preventDefault() // Dropdown ko turant close hone se rokne ke liye
//     if (signout.isPending) return // Double click prevention

//     signout.mutate(undefined, {
//       onSuccess: () => {
//         toast.add({ type: 'success', description: 'See you again soon! 👋' }) // ✅ Invalid toast type fix kiya
//         router.push('/')
//         setIsMenuOpen(false) // Close mobile menu
//         setIsDropdownOpen(false) // Close desktop dropdown
//         router.refresh()
//       },
//       onError: () => {
//         toast.add({ type: 'error', description: 'Failed to logout. Please try again.' })
//       },
//     })
//   }

//   const initials = user?.name
//     ? user.name
//         .trim()
//         .split(/\s+/)
//         .map((n) => n[0])
//         .join('')
//         .substring(0, 2)
//         .toUpperCase()
//     : 'U'

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

//   const handleLinkClick = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     url: string,
//     isMobile: boolean = false,
//   ) => {
//     if (isMobile) setIsMenuOpen(false)
//     if (url === pathname) {
//       e.preventDefault()
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//   }

//   return (
//     <nav ref={headerRef} className="bg-dark-green-15 sticky top-0 z-50 w-full shadow-sm">
//       <div className="container flex h-17.5 items-center justify-between">
//         {/* Logo Section */}
//         <Link href={'/'} className="relative z-40" onClick={(e) => handleLinkClick(e, '/')}>
//           <Logo />
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:block">
//           <ul className="flex items-center gap-6">
//             {navlinks.map(({ name, url }) => {
//               const isActive = pathname === url
//               return (
//                 <li key={name}>
//                   <Link
//                     href={url}
//                     onClick={(e) => handleLinkClick(e, url)}
//                     className={`font-semibold transition-colors ${isActive ? 'text-green-70' : 'text-green-97 hover:text-green-90'}`}
//                   >
//                     {name}
//                   </Link>
//                 </li>
//               )
//             })}
//             <li className="flex items-center gap-4">
//               {isLoading ? (
//                 <div className="bg-dark-green-25 size-8 animate-pulse rounded-full" />
//               ) : user ? (
//                 // ✅ Base UI Controlled Dropdown Logic Added
//                 <DropdownMenu
//                   open={isDropdownOpen}
//                   onOpenChange={(open) => {
//                     if (signout.isPending) return
//                     setIsDropdownOpen(open)
//                   }}
//                 >
//                   <DropdownMenuTrigger className="outline-none focus:outline-none">
//                     <Avatar>
//                       <AvatarImage
//                         className={'rounded-full'}
//                         src={displayAvatar}
//                         alt={user?.name || 'User'}
//                         referrerPolicy="no-referrer"
//                       />
//                       <AvatarFallback className={'bg-dark-green-20 text-green-95 rounded-full'}>
//                         {initials}
//                       </AvatarFallback>
//                     </Avatar>
//                   </DropdownMenuTrigger>

//                   <DropdownMenuContent
//                     align="end"
//                     className="bg-dark-green-15 border-dark-green-25 w-fit rounded-md border ring-0"
//                   >
//                     <DropdownMenuGroup>
//                       <DropdownMenuLabel className="mb-1 font-normal">
//                         <div className="flex items-center gap-3 text-left text-sm">
//                           <Avatar>
//                             <AvatarImage
//                               className={'rounded-md'}
//                               src={displayAvatar}
//                               alt={user?.name || 'User'}
//                               referrerPolicy="no-referrer"
//                             />
//                             <AvatarFallback className={'bg-dark-green-20 text-green-95 rounded-md'}>
//                               {initials}
//                             </AvatarFallback>
//                           </Avatar>
//                           <div className="grid flex-1 text-left text-sm leading-tight">
//                             <span className="text-green-97 truncate font-medium">{user.name}</span>
//                             <span className="text-green-97/60 truncate text-xs">{user.email}</span>
//                           </div>
//                         </div>
//                       </DropdownMenuLabel>
//                     </DropdownMenuGroup>

//                     <DropdownMenuSeparator className="bg-white/10" />

//                     {/* Admin */}
//                     {isAdmin(user) && (
//                       <DropdownMenuItem className="text-green-97 focus:bg-dark-green-20! focus:text-green-97! focus:**:text-green-97! cursor-pointer transition-colors">
//                         <Link href="/admin" className="flex w-full items-center gap-2">
//                           <HugeiconsIcon icon={LayoutDashboardIcon} size={16} />
//                           <span>Admin</span>
//                         </Link>
//                       </DropdownMenuItem>
//                     )}

//                     {/* Profile */}
//                     <DropdownMenuItem className="text-green-97 focus:bg-dark-green-20! focus:text-green-97! focus:**:text-green-97! cursor-pointer transition-colors">
//                       <Link href="/account/profile" className="flex w-full items-center gap-2">
//                         <HugeiconsIcon icon={UserIcon} size={16} />
//                         <span>Profile</span>
//                       </Link>
//                     </DropdownMenuItem>

//                     {/* Bookmarks */}
//                     <DropdownMenuItem className="text-green-97 focus:bg-dark-green-20! focus:text-green-97! focus:**:text-green-97! cursor-pointer transition-colors">
//                       <Link href="/account/bookmarks" className="flex w-full items-center gap-2">
//                         <HugeiconsIcon icon={Bookmark01Icon} size={16} />
//                         <span>Bookmarks</span>
//                       </Link>
//                     </DropdownMenuItem>

//                     {/* Favorites */}
//                     <DropdownMenuItem className="text-green-97 focus:bg-dark-green-20! focus:text-green-97! focus:**:text-green-97! cursor-pointer transition-colors">
//                       <Link href="/account/favorites" className="flex w-full items-center gap-2">
//                         <HugeiconsIcon icon={HeartIcon} size={16} />
//                         <span>Favorites</span>
//                       </Link>
//                     </DropdownMenuItem>

//                     <DropdownMenuSeparator className="bg-dark-green-25" />

//                     {/* Signout */}
//                     <DropdownMenuItem
//                       className="text-green-97 focus:bg-dark-green-20! focus:text-green-97! focus:**:text-green-97! cursor-pointer transition-colors"
//                       disabled={signout.isPending}
//                       closeOnClick={false}
//                       onClick={handleLogout} // ✅ Missing onClick yahan add kar diya
//                     >
//                       {/* ✅ Loader icon add kiya for better UX */}
//                       {signout.isPending ? (
//                         <HugeiconsIcon icon={LoaderCircleIcon} size={16} className="animate-spin" />
//                       ) : (
//                         <HugeiconsIcon icon={LogOutIcon} size={16} />
//                       )}
//                       <span>{signout.isPending ? 'Logging out...' : 'Log out securely'}</span>
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               ) : (
//                 <Link
//                   href="/auth/signin"
//                   className="bg-green-70 hover:bg-green-80 text-dark-green-20 flex size-8 items-center justify-center rounded-full font-semibold"
//                 >
//                   <HugeiconsIcon icon={UserIcon} size={18} />
//                 </Link>
//               )}
//             </li>
//           </ul>
//         </div>

//         {/* Mobile Toggle Button */}
//         <button
//           className="text-green-97 relative z-110 p-2 transition-transform hover:scale-105 md:hidden"
//           onClick={toggleMenu}
//           aria-label="Toggle Menu"
//         >
//           {isMenuOpen ? (
//             <HugeiconsIcon icon={XIcon} className="text-green-95" />
//           ) : (
//             <HugeiconsIcon icon={Menu01Icon} className="text-green-70" />
//           )}
//         </button>

//         {/* Backdrop Overlay */}
//         <div
//           className={`fixed inset-0 z-90 bg-black/60 backdrop-blur-sm transition-all duration-400 ease-in-out md:hidden ${
//             isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
//           }`}
//           onClick={toggleMenu}
//         />

//         <aside
//           className={`bg-dark-green-15 fixed top-0 right-0 z-100 flex h-dvh w-[85%] max-w-85 transform flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
//             isMenuOpen ? 'translate-x-0' : 'translate-x-full'
//           }`}
//         >
//           {/* Main Navigation Links */}
//           <div className="flex-1 overflow-y-auto px-10 pt-28 pb-8">
//             <ul className="flex flex-col gap-7">
//               {navlinks.map(({ name, url }) => {
//                 const isActive = pathname === url
//                 return (
//                   <li key={name}>
//                     <Link
//                       href={url}
//                       onClick={(e) => handleLinkClick(e, url, true)}
//                       className="group flex w-fit items-center gap-4"
//                     >
//                       {/* Active Indicator Line */}
//                       <span
//                         className={`bg-green-70 h-0.5 rounded-full transition-all duration-300 ${
//                           isActive
//                             ? 'w-6 opacity-100'
//                             : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-50'
//                         }`}
//                       />
//                       <span
//                         className={`text-3xl font-black tracking-tight transition-all duration-300 ${
//                           isActive
//                             ? 'text-green-70 translate-x-0'
//                             : 'text-white/40 group-hover:translate-x-1 group-hover:text-white/90'
//                         }`}
//                       >
//                         {name}
//                       </span>
//                     </Link>
//                   </li>
//                 )
//               })}
//             </ul>
//           </div>

//           {/* Minimalist User Section at Bottom */}
//           <div className="px-10 pb-10">
//             <div className="border-t border-white/10 pt-8">
//               {isLoading ? (
//                 <div className="flex items-center gap-4">
//                   <div className="size-12 animate-pulse rounded-full bg-white/10" />
//                   <div className="space-y-2">
//                     <div className="h-4 w-24 animate-pulse rounded-md bg-white/10" />
//                     <div className="h-3 w-32 animate-pulse rounded-md bg-white/10" />
//                   </div>
//                 </div>
//               ) : user ? (
//                 <div className="flex flex-col gap-6">
//                   {/* Clean Profile Info */}
//                   <Link
//                     href="/account/profile"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="group flex items-center gap-4"
//                   >
//                     <Avatar>
//                       <AvatarImage
//                         className={'rounded-md'}
//                         src={displayAvatar}
//                         alt={user?.name || 'User'}
//                         referrerPolicy="no-referrer"
//                       />
//                       <AvatarFallback className={'rounded-md'}>{initials}</AvatarFallback>
//                     </Avatar>
//                     <div className="flex flex-col">
//                       <span className="group-hover:text-green-70 text-lg leading-tight font-bold text-white transition-colors">
//                         {user.name}
//                       </span>
//                       <span className="text-sm text-white/50">{user.email}</span>
//                     </div>
//                   </Link>

//                   {/* Subtle Text-based Logout (Mobile) */}
//                   <button
//                     onClick={handleLogout} // ✅ handleLogout yahan directly pass kiya
//                     disabled={signout.isPending}
//                     className="flex w-fit items-center gap-3 font-semibold text-white/50 transition-colors hover:text-red-400 disabled:opacity-50"
//                   >
//                     {/* ✅ Spinner Add kiya Mobile Menu ke liye bhi */}
//                     {signout.isPending ? (
//                       <HugeiconsIcon
//                         icon={LoaderCircleIcon}
//                         size={20}
//                         className="animate-spin text-red-400"
//                       />
//                     ) : (
//                       <HugeiconsIcon icon={LogOutIcon} size={20} />
//                     )}

//                     {signout.isPending ? (
//                       <span className="text-red-400">Logging out...</span>
//                     ) : (
//                       'Log out'
//                     )}
//                   </button>
//                 </div>
//               ) : (
//                 <Button className="bg-green-70 text-dark-green-20 hover:bg-green-80 w-full rounded-full py-6 text-lg font-bold transition-transform hover:-translate-y-1">
//                   <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
//                     Sign In
//                   </Link>
//                 </Button>
//               )}
//             </div>
//           </div>
//         </aside>
//       </div>
//     </nav>
//   )
// }

// import Navbar from '@/components/Navbar' // aapka Navbar ka path
// import { getServerUser } from '@/lib/getServerUser' // Ya jahan bhi aapne banaya tha

import { getServerUser } from '@/lib/get-server-user'
import NavbarClient from './navbar-client'

export default async function Navbar() {
  // 👇 Server se user data fetch karo (bohot fast hota hai)
  const user = await getServerUser()

  return <NavbarClient user={user} />
}
