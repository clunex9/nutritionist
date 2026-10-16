import { getServerUser } from '@/lib/get-server-user'
import NavbarClient from './navbar-client'

export default async function Navbar() {
  // 👇 Server se user data fetch karo (bohot fast hota hai)
  const user = await getServerUser()

  return <NavbarClient user={user} />
}
