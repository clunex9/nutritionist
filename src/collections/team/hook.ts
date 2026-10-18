import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const deleteOldAvatar: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  const oldAvatarId =
    typeof previousDoc?.avatar === 'object' ? previousDoc.avatar?.id : previousDoc?.avatar
  const newAvatarId = typeof doc?.avatar === 'object' ? doc.avatar?.id : doc?.avatar

  if (oldAvatarId && oldAvatarId !== newAvatarId) {
    try {
      await req.payload.delete({
        collection: 'team-avatar',
        id: oldAvatarId,
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error(`Failed to delete old avatar (ID: ${oldAvatarId}): ${error}`)
    }
  }

  // 🔥 FIX: Next.js 16.3+ me second argument dena zaroori hai.
  // { expire: 0 } ka matlab hai cache turant purge (delete) ho jayega.
  revalidateTag('team-data', { expire: 0 })

  return doc
}

export const deleteAvatarOnMemberDelete: CollectionAfterDeleteHook = async ({ req, doc }) => {
  const avatarId = typeof doc?.avatar === 'object' ? doc.avatar?.id : doc?.avatar

  if (avatarId) {
    try {
      await req.payload.delete({
        collection: 'team-avatar',
        id: avatarId,
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error(
        `Failed to delete avatar on member delete (ID: ${avatarId}): ${error}`,
      )
    }
  }

  // 🔥 FIX: Yahan bhi second argument pass karein
  revalidateTag('team-data', { expire: 0 })
}
