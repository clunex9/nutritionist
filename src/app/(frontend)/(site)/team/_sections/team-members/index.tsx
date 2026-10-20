import type { Team, TeamAvatar } from '@/payload-types' // Avatar type import kiya
import { cacheLife, cacheTag } from 'next/cache'

import TeamMembersSection from './team-members.section'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function getCachedTeam() {
  'use cache'
  cacheLife('hours')
  cacheTag('team-data')

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
    },
  })

  return docs as unknown as Team[]
}

export default async function TeamMembers() {
  const rawTeamData = await getCachedTeam()

  // 🔥 THE MAGIC FIX: Client me bhejne se pehle data ko ekdum halka (lightweight) karein
  // Payload ke heavy objects server par hi chhod dein
  const lightweightTeamData = rawTeamData.map((member) => {
    const avatarObj =
      typeof member.avatar === 'object' && member.avatar !== null
        ? (member.avatar as TeamAvatar)
        : null

    const imageUrl = avatarObj?.url || avatarObj?.thumbnailURL || ''

    return {
      id: member.id as string,
      name: member.name,
      role: member.role,
      department: member.department,
      imageUrl: imageUrl, // Ab ye direct string hai, heavy object nahi!
    }
  })

  return <TeamMembersSection data={lightweightTeamData} />
}
