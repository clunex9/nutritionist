import { getPayload } from 'payload'
import configPromise from '@payload-config'

import TeamMembersSection from './team-members.section'

export default async function TeamMembers() {
  const payload = await getPayload({ config: configPromise })

  // Database se saare team members fetch kiye (limit badha lena apni team size ke hisaab se)
  const { docs: teamData } = await payload.find({
    collection: 'team',
    limit: 50,
  })

  return <TeamMembersSection data={teamData} />
}
