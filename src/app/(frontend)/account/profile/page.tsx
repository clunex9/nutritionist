import { getServerUser } from '@/lib/get-server-user'
import ProfileForm, { type CleanUser } from './profile-form'
import type { Avatar as AvatarType } from '@/payload-types'

export default async function ProfilePage() {
  const user = await getServerUser()

  if (!user) {
    return <ProfileForm user={null} />
  }

  // 🔥 DATA SANITIZATION: Client ko heavy Payload object nahi jayega
  const avatarObj =
    typeof user.avatar === 'object' && user.avatar !== null ? (user.avatar as AvatarType) : null

  // Sirf zaroori data ka lightweight object banaya
  const cleanUser: CleanUser = {
    id: user.id,
    name: user.name || '',
    email: user.email || '',
    gender: (user.gender as 'male' | 'female' | 'other') || null,
    avatarUrl: avatarObj?.thumbnailURL || avatarObj?.url || '',
    fullSizeAvatarUrl: avatarObj?.url || avatarObj?.thumbnailURL || '',
    avatarId: avatarObj?.id || '',
    avatarUpdatedAt: avatarObj?.updatedAt || '',
  }

  return <ProfileForm user={cleanUser} />
}
