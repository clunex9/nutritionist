import { getServerUser } from '@/lib/get-server-user'
import { redirect } from 'next/navigation'
import ProfileForm from './profile-form'

export default async function ProfilePage() {
  const user = await getServerUser()

  if (!user) {
    redirect('/auth/signin')
  }

  // Profile Form render karo aur user pass kardo
  return <ProfileForm user={user} />
}
