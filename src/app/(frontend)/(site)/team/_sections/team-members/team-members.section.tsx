'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type CleanTeamMember = {
  id: string
  name: string
  role: string
  department: string
  imageUrl: string
}

export default function TeamMembersSection({ data = [] }: { data: CleanTeamMember[] }) {
  // 🔥 Optimization 1: Single Pass Grouping O(N) instead of O(N * M)
  const teamSections = useMemo(() => {
    // Ek dictionary banayi jo sirf 1 baar loop chalkar sabko apne-apne department me daal degi
    const groupMap = data.reduce(
      (acc, member) => {
        if (!member.department) return acc

        if (!acc[member.department]) {
          acc[member.department] = []
        }
        acc[member.department].push(member)

        return acc
      },
      {} as Record<string, CleanTeamMember[]>,
    )

    // Dictionary ko wapas array me convert kiya Tabs ke format me
    return Object.entries(groupMap).map(([deptName, members]) => ({
      label: deptName,
      value: deptName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      members,
    }))
  }, [data])

  if (!teamSections || teamSections.length === 0) return null

  const defaultTab = teamSections[0].value

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

          {teamSections.map(({ value, members }) => {
            const isDefaultTab = value === defaultTab

            return (
              <TabsContent key={value} value={value} className="mt-7.5 lg:mt-10">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {members.map((member, index) => {
                    const shouldPreload = isDefaultTab && index < 4

                    return (
                      <TeamMemberCard
                        key={member.id}
                        member={member}
                        shouldPreload={shouldPreload}
                      />
                    )
                  })}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}

function TeamMemberCard({
  member,
  shouldPreload,
}: {
  member: CleanTeamMember
  shouldPreload: boolean
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative flex flex-col items-center rounded-lg">
      <div className="relative flex aspect-305/340 w-full items-end justify-center overflow-hidden rounded-md">
        <div className="team-bg-pattern absolute inset-0 z-0 h-full w-full" />

        <div
          className={`absolute inset-0 z-0 h-full w-full transition-opacity duration-500 ease-in-out ${
            isLoaded ? 'pointer-events-none opacity-0' : 'skeleton-shimmer opacity-100'
          }`}
        />

        {member.imageUrl && (
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={shouldPreload}
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
