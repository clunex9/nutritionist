'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Team, TeamAvatar } from '@/payload-types'

export default function TeamMembersSection({ data = [] }: { data: Team[] }) {
  // 🔥 Dynamic Departments Extract (Jaise Blogs me kiya tha)
  const teamSections = useMemo(() => {
    // Unique departments nikalna
    const uniqueDepts = Array.from(new Set(data.map((member) => member.department).filter(Boolean)))

    return uniqueDepts.map((deptName) => ({
      label: deptName, // CMS se jo aayega wahi dikhega
      value: deptName?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
      members: data.filter((member) => member.department === deptName),
    }))
  }, [data])

  if (!teamSections || teamSections.length === 0) return null

  const defaultTab = teamSections[0]?.value

  return (
    <section id="team-members" className="scroll-mt-10 pb-7.5 lg:pb-10">
      <div className="container">
        <Tabs defaultValue={defaultTab} className="w-full gap-0">
          <TabsList className="bg-dark-green-20 text-background flex h-auto! w-full scrollbar-none flex-nowrap justify-start gap-2 overflow-x-auto rounded-t-none rounded-b-lg px-4 py-6 [-ms-overflow-style:none] lg:px-20 [&::-webkit-scrollbar]:hidden">
            {teamSections.map(({ label, value }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="data-active:bg-dark-green-25 data-active:border-dark-green-30 text-background hover:text-background data-active:text-background shrink-0 rounded-sm border border-transparent px-4.5 py-3 text-sm font-semibold whitespace-nowrap capitalize transition-all data-active:border lg:text-base"
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
}: {
  member: Team
  imageUrl: string
  shouldPreload: boolean
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
            priority={shouldPreload} // 🔥 Ye apne aap loading="eager" handle kar lega
            decoding={shouldPreload ? 'sync' : 'async'}
            onLoad={() => setIsLoaded(true)}
            className={`relative z-10 h-full w-full object-contain pt-5 transition-opacity duration-500 ease-in-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      <div className="relative z-20 -mt-7.5 w-full">
        <div className="bg-green-95 inline-block min-w-[80%] rounded-tr-xl rounded-bl-md p-4 shadow-sm">
          <h3 className="text-gray-15 text-lg font-semibold capitalize lg:text-xl">
            {member.name}
          </h3>
          <p className="text-gray-30 text-sm font-medium capitalize lg:text-base">{member.role}</p>
        </div>
      </div>
    </div>
  )
}
