// import Image from 'next/image'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import type { Team, TeamAvatar } from '@/payload-types' // 👈 Payload types import kiye

// // 👇 Hardcoded array ki jagah sirf categories define ki hain mapping ke liye
// const departments = [
//   { label: 'Management Team', value: 'management team' },
//   { label: 'Nutritionists and Dietitians', value: 'nutritionists and dietitians' },
//   { label: 'Customer Support', value: 'customer support' },
//   { label: 'Marketing and Communications', value: 'marketing and communications' },
//   { label: 'Technology and Development', value: 'technology and development' },
// ]

// // 👇 Custom 'TeamMemberDoc' hata kar official 'Team' type use kiya
// export default function TeamMembersSection({ data = [] }: { data: Team[] }) {
//   // 👇 Flat data ko department wise group karna
//   const teamSections = departments
//     .map((dept) => ({
//       label: dept.label,
//       value: dept.value,
//       // Database se match karne wale members ko filter kiya
//       members: data.filter((member) => member.department === dept.value),
//     }))
//     .filter((section) => section.members.length > 0) // Jin tabs mein koi data nahi hai, unhe hide kar dega

//   if (!teamSections || teamSections.length === 0) return null

//   const defaultTab = teamSections[0]?.value

//   return (
//     <section id="team-members" className="scroll-mt-10 pb-7.5 lg:pb-10">
//       <div className="container">
//         {/* Default tab wahi hoga jisme pehla data available ho */}
//         <Tabs defaultValue={teamSections[0]?.value} className="w-full gap-0">
//           <TabsList className="bg-dark-green-20 text-background flex h-auto! w-full scrollbar-none flex-nowrap justify-start gap-2 overflow-x-auto rounded-t-none rounded-b-lg px-4 py-6 [-ms-overflow-style:none] lg:px-20 [&::-webkit-scrollbar]:hidden">
//             {teamSections.map(({ label, value }) => (
//               <TabsTrigger
//                 key={value}
//                 value={value}
//                 className="data-active:bg-dark-green-25 data-active:border-dark-green-30 text-background hover:text-background data-active:text-background shrink-0 rounded-sm border border-transparent px-4.5 py-3 text-sm font-semibold whitespace-nowrap transition-all data-active:border lg:text-base"
//               >
//                 {label}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {/* Har Tab Content ke liye Grid */}
//           {teamSections.map(({ value, members }) => (
//             <TabsContent key={value} value={value} className="mt-7.5 lg:mt-10">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 {members.map((member, index) => {
//                   // 🔥 Type Guard for Image (Jaise Avatar mein kiya tha)
//                   const imageObj =
//                     typeof member.avatar === 'object' && member.avatar !== null
//                       ? (member.avatar as TeamAvatar)
//                       : null

//                   // Ab safely .url nikal sakte hain
//                   const imageUrl = imageObj?.url || ''

//                   // 🔥 THE FIX: Sirf tabhi preload karo jab wo pehla (default) tab ho AUR index 4 se kam ho
//                   const isDefaultTab = value === defaultTab
//                   const shouldPreload = isDefaultTab && index < 4

//                   return (
//                     <div key={member.id} className="relative flex flex-col items-center rounded-lg">
//                       {/* Image Container */}
//                       <div className="relative flex aspect-305/340 w-full items-end justify-center overflow-hidden rounded-md">
//                         <div className="team-bg-pattern absolute inset-0 z-0 h-full w-full" />

//                         {/* 👇 Dynamic Image URL */}
//                         {imageUrl && (
//                           <Image
//                             src={imageUrl}
//                             alt={member.name}
//                             fill

//                             sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                             priority={shouldPreload} // 1. Shuruati images ko Next.js preload karega
//                             loading={index < 4 ? 'eager' : 'lazy'}
//                             decoding={shouldPreload ? 'sync' : 'async'} // 3. 🔥 YEH SABSE ZAROORI HAI: Browser ko force karega image turant dikhane ke liye
//                             fetchPriority={index < 4 ? 'high' : 'auto'}
//                             className="relative z-10 h-full w-full object-contain pt-5"
//                           />
//                         )}
//                       </div>

//                       {/* Info Card */}
//                       <div className="relative z-20 -mt-7.5 w-full">
//                         <div className="bg-green-95 inline-block min-w-[80%] rounded-tr-xl rounded-bl-md p-4">
//                           <h3 className="text-gray-15 text-lg font-semibold lg:text-xl">
//                             {member.name}
//                           </h3>
//                           <p className="text-gray-30 text-sm font-medium lg:text-base">
//                             {member.role}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </div>
//     </section>
//   )
// }

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Team, TeamAvatar } from '@/payload-types'

const departments = [
  { label: 'Management Team', value: 'management team' },
  { label: 'Nutritionists and Dietitians', value: 'nutritionists and dietitians' },
  { label: 'Customer Support', value: 'customer support' },
  { label: 'Marketing and Communications', value: 'marketing and communications' },
  { label: 'Technology and Development', value: 'technology and development' },
]

export default function TeamMembersSection({ data = [] }: { data: Team[] }) {
  const teamSections = departments
    .map((dept) => ({
      label: dept.label,
      value: dept.value,
      members: data.filter((member) => member.department === dept.value),
    }))
    .filter((section) => section.members.length > 0)

  if (!teamSections || teamSections.length === 0) return null

  const defaultTab = teamSections[0]?.value

  return (
    <section id="team-members" className="scroll-mt-10 pb-7.5 lg:pb-10">
      <div className="container">
        <Tabs defaultValue={teamSections[0]?.value} className="w-full gap-0">
          <TabsList className="bg-dark-green-20 text-background flex h-auto! w-full scrollbar-none flex-nowrap justify-start gap-2 overflow-x-auto rounded-t-none rounded-b-lg px-4 py-6 [-ms-overflow-style:none] lg:px-20 [&::-webkit-scrollbar]:hidden">
            {teamSections.map(({ label, value }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="data-active:bg-dark-green-25 data-active:border-dark-green-30 text-background hover:text-background data-active:text-background shrink-0 rounded-sm border border-transparent px-4.5 py-3 text-sm font-semibold whitespace-nowrap transition-all data-active:border lg:text-base"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {teamSections.map(({ value, members }) => (
            <TabsContent key={value} value={value} className="mt-7.5 lg:mt-10">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {members.map((member, index) => {
                  const imageObj =
                    typeof member.avatar === 'object' && member.avatar !== null
                      ? (member.avatar as TeamAvatar)
                      : null

                  const imageUrl = imageObj?.url || ''
                  const isDefaultTab = value === defaultTab
                  const shouldPreload = isDefaultTab && index < 4

                  return (
                    <TeamMemberCard
                      key={member.id}
                      member={member}
                      imageUrl={imageUrl}
                      shouldPreload={shouldPreload}
                      index={index}
                    />
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

function TeamMemberCard({
  member,
  imageUrl,
  shouldPreload,
  index,
}: {
  member: Team
  imageUrl: string
  shouldPreload: boolean
  index: number
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative flex flex-col items-center rounded-lg">
      <div className="relative flex aspect-305/340 w-full items-end justify-center overflow-hidden rounded-md">
        {/* 👉 Background Pattern */}
        <div className="team-bg-pattern absolute inset-0 z-0 h-full w-full" />

        {/* 👉 THE PULSE ANIMATION (Skeleton) */}
        <div
          className={`bg-green-90 absolute inset-0 z-0 h-full w-full transition-opacity duration-500 ease-in-out ${
            isLoaded ? 'pointer-events-none opacity-0' : 'animate-pulse opacity-100'
          }`}
        />

        {/* 👉 Actual Image */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={shouldPreload}
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding={shouldPreload ? 'sync' : 'async'}
            onLoad={() => setIsLoaded(true)}
            className={`relative z-10 h-full w-full object-contain pt-5 transition-opacity duration-500 ease-in-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      <div className="relative z-20 -mt-7.5 w-full">
        <div className="bg-green-95 inline-block min-w-[80%] rounded-tr-xl rounded-bl-md p-4">
          <h3 className="text-gray-15 text-lg font-semibold lg:text-xl">{member.name}</h3>
          <p className="text-gray-30 text-sm font-medium lg:text-base">{member.role}</p>
        </div>
      </div>
    </div>
  )
}
