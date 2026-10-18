import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Team } from '@/payload-types'

import TeamMembersSection from './team-members.section'

const getCachedTeam = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'team',
      limit: 50,
      depth: 1,
      pagination: false,
      select: {
        name: true,
        role: true,
        department: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return docs as unknown as Team[]
  },
  ['team-members-cache'],
  {
    // 🔥 Yahan se revalidate: 3600 hata diya. Ab ye forever cache me rahega!
    tags: ['team-data'],
  },
)

export default async function TeamMembers() {
  const teamData = await getCachedTeam()
  return <TeamMembersSection data={teamData} />
}
