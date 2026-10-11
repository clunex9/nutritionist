import type { User } from '@/payload-types'
import { isAdmin } from '@/access/roles' // ya jahan tumne rakha hai

type Args = {
  user?: User | null
  data?: any
}

// 🔄 REUSABLE CONDITION: Ye un sabhi fields ke liye hai jo 'Create First User' screen par hide karni hain
export const showIfUserExists = ({ user }: Args): boolean => {
  return !!user // Agar user hai toh true, nahi toh false
}

// 🔒 Admin UI condition for role field
export const canShowRoleField = ({ user, data }: Args): boolean => {
  // 1. Agar koi user login nahi hai, YA login user 'admin' nahi hai
  // Toh UI mein ye field hide kar do (false)
  if (!user || !isAdmin(user)) return false

  // 2. Agar login user Admin hai, par wo apni khud ki profile edit kar raha hai
  // Toh bhi field hide kar do (taaki admin galti se khud ka role change ya remove na kar baithe)
  if (data?.id === user.id) return false

  // 3. Agar admin kisi aur ki profile dekh/edit kar raha hai
  // Toh field ko UI mein show karo (true)
  return true
}

// 🔒 Admin UI condition for lockUntil field
export const canShowLockUntilField = ({ user, data }: Args): boolean => {
  // ❌ Not admin
  if (!user || !isAdmin(user)) return false

  // ❌ Admin editing own profile
  if (data?.id === user.id) return false

  // ✅ Admin editing someone else
  return true
}
