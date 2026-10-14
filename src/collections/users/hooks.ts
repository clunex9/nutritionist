import type { FieldHook, CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { User } from '@/payload-types'

export const ensureFirstUserIsAdmin: FieldHook<User> = async ({ operation, req, value }) => {
  if (operation === 'create') {
    const users = await req.payload.find({ collection: 'users', depth: 0, limit: 0 })

    if (users.totalDocs === 0) {
      return ['admin']
    }
  }

  return value
}

export const deleteOldAvatar: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  const oldAvatarId =
    typeof previousDoc?.avatar === 'object' ? previousDoc.avatar?.id : previousDoc?.avatar

  const newAvatarId = typeof doc?.avatar === 'object' ? doc.avatar?.id : doc?.avatar

  if (oldAvatarId && oldAvatarId !== newAvatarId) {
    try {
      await req.payload.delete({
        collection: 'avatars',
        id: oldAvatarId,
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error(`Failed to delete old avatar (ID: ${oldAvatarId}): ${error}`)
    }
  }

  return doc
}

// User delete hone par uski photo bhi Vercel Blob se uda do
export const deleteAvatarOnUserDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  const avatarId = typeof doc?.avatar === 'object' ? doc.avatar?.id : doc?.avatar

  if (avatarId) {
    try {
      await req.payload.delete({
        collection: 'avatars',
        id: avatarId,
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error(`Failed to delete avatar on user delete (ID: ${avatarId}): ${error}`)
    }
  }

  return doc
}
