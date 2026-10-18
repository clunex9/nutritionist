import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const deleteOldImage: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  // 🔥 FIX: 'avatar' ki jagah 'image' use kiya
  const oldImageId =
    typeof previousDoc?.image === 'object' ? previousDoc.image?.id : previousDoc?.image

  const newImageId = typeof doc?.image === 'object' ? doc.image?.id : doc?.image

  if (oldImageId && oldImageId !== newImageId) {
    try {
      await req.payload.delete({
        collection: 'blog-image', // Media collection name
        id: oldImageId,
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error(`Failed to delete old image (ID: ${oldImageId}): ${error}`)
    }
  }

  // 🔥 Cache Revalidation
  revalidateTag('blogs', { expire: 0 })

  return doc
}

export const deleteImageOnBlogDelete: CollectionAfterDeleteHook = async ({ req, doc }) => {
  // 🔥 FIX: 'avatar' ki jagah 'image' use kiya
  const imageId = typeof doc?.image === 'object' ? doc.image?.id : doc?.image

  if (imageId) {
    try {
      await req.payload.delete({
        collection: 'blog-image', // Media collection name
        id: imageId,
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error(`Failed to delete image on blog delete (ID: ${imageId}): ${error}`)
    }
  }

  // 🔥 Cache Revalidation
  revalidateTag('blogs', { expire: 0 })
}
