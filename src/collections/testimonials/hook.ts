import { CollectionAfterChangeHook } from 'payload'

export const deleteOldAvatar: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  const oldAvatarId =
    typeof previousDoc?.avatar === 'object' ? previousDoc.avatar?.id : previousDoc?.avatar

  const newAvatarId = typeof doc?.avatar === 'object' ? doc.avatar?.id : doc?.avatar

  if (oldAvatarId && oldAvatarId !== newAvatarId) {
    try {
      await req.payload.delete({
        collection: 'testimonial-avatar',
        id: oldAvatarId,
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error(`Failed to delete old avatar (ID: ${oldAvatarId}): ${error}`)
    }
  }

  return doc
}
