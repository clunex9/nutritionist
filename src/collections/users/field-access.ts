import type { FieldAccess } from 'payload'
import { isAdmin } from '@/access/roles'

// --- FIELD LEVEL ACCESS ---
export const canUpdateOwnProfileField: FieldAccess = ({ req, id, doc }) => {
  // 1. Bina login wale request ko turant bahar nikalo.
  if (!req.user) return false

  // 2. Jis profile me update request aayi hai, uski ID nikalo (kabhi 'id' variable me hoti hai, kabhi 'doc.id' me).
  const profileId = id || doc?.id

  // 3. Login user ki ID ko aur Profile ID ko strictly String banakar check karo.
  // Agar donon same hain (matlab ye uski khud ki profile hai), tabhi fields update karne do.
  return String(req.user.id) === String(profileId)
}

export const canManageLockUntilField: FieldAccess = ({ req }) => {
  // Ye field (lockUntil) track karti hai ki account kab tak lock hai.
  // Isko read ya edit karne ka haq sirf aur sirf Admin ko hai.
  return isAdmin(req.user)
}

export const canManageRoleField: FieldAccess = ({ req }) => {
  // Kisi account ko konsa role milega (admin, editor, aadi), ye sirf Admin set ya update kar sakta hai.
  return isAdmin(req.user)
}
