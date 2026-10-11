import { CollectionAfterChangeHook } from 'payload'

export const deleteOldImage: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  const oldImageId =
    typeof previousDoc?.avatar === 'object' ? previousDoc.avatar?.id : previousDoc?.avatar

  const newImageId = typeof doc?.avatar === 'object' ? doc.avatar?.id : doc?.avatar

  if (oldImageId && oldImageId !== newImageId) {
    try {
      await req.payload.delete({
        collection: 'blog-image',
        id: oldImageId,
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error(`Failed to delete old avatar (ID: ${oldImageId}): ${error}`)
    }
  }

  return doc
}
