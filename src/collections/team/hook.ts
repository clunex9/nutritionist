import { CollectionAfterChangeHook } from 'payload'

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
        collection: 'team-avatar', // Agar aapke avatars collection ka slug alag hai toh yahan change karein
        id: oldAvatarId,
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error(`Failed to delete old avatar (ID: ${oldAvatarId}): ${error}`)
    }
  }

  return doc
}
