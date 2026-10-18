import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload' // 🔥 Delete hook bhi import kiya
import { revalidateTag } from 'next/cache' // 🔥 Next.js cache revalidation

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

  // 🔥 FIX: Testimonial update/add hone par Next.js 16.3 cache turant clear karega
  revalidateTag('testimonials-data', { expire: 0 })

  return doc
}

// 🔥 NAYA HOOK: Jab pura testimonial delete ho, tab uska avatar delete karein aur cache hatayein
export const deleteAvatarOnTestimonialDelete: CollectionAfterDeleteHook = async ({ req, doc }) => {
  const avatarId = typeof doc?.avatar === 'object' ? doc.avatar?.id : doc?.avatar

  if (avatarId) {
    try {
      await req.payload.delete({
        collection: 'testimonial-avatar',
        id: avatarId,
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error(
        `Failed to delete avatar on testimonial delete (ID: ${avatarId}): ${error}`,
      )
    }
  }

  // 🔥 FIX: Testimonial delete hone par bhi cache clear zaroori hai
  revalidateTag('testimonials-data', { expire: 0 })
}
