import type { FieldHook, CollectionAfterChangeHook } from 'payload'
import type { User } from '@/payload-types'

export const ensureFirstUserIsAdmin: FieldHook<User> = async ({ operation, req, value }) => {
  if (operation === 'create') {
    // Depth 0 for performance, limit 0 to just get totalDocs
    const users = await req.payload.find({ collection: 'users', depth: 0, limit: 0 })

    if (users.totalDocs === 0) {
      // ⚠️ MULTI-ROLE FIX: Pehla user humesha admin hoga, return array
      return ['admin']
    }
  }

  // Baaki cases me jo frontend se aaya hai wahi return karo (Payload default array handle karega)
  return value || ['subscriber']
}

export const deleteOldAvatar: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  // 1. Purane aur naye avatar ki ID nikalein
  const oldAvatarId =
    typeof previousDoc?.avatar === 'object' ? previousDoc.avatar?.id : previousDoc?.avatar

  const newAvatarId = typeof doc?.avatar === 'object' ? doc.avatar?.id : doc?.avatar

  // 2. Agar avatar change hua hai (ya remove hua hai), aur purana avatar tha
  if (oldAvatarId && oldAvatarId !== newAvatarId) {
    try {
      // 3. Media collection se delete karein
      // Payload ka Uploadthing plugin file ko storage se bhi delete kar dega
      await req.payload.delete({
        collection: 'avatars', // Agar aapke avatars collection ka slug alag hai toh yahan change karein
        id: oldAvatarId,
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error(`Failed to delete old avatar (ID: ${oldAvatarId}): ${error}`)
    }
  }

  return doc
}
