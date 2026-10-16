import { getServerUser } from '@/lib/get-server-user'
import NavbarClient from './navbar-client'

export default async function Navbar() {
  const user = await getServerUser()

  return <NavbarClient user={user} />
}
