// src/app/actions/userActions.ts
'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { getServerUser } from '@/lib/get-server-user'

// Favorite Action
export async function toggleFavoriteAction(blogId: string, currentPath: string) {
  const payload = await getPayload({ config: configPromise })
  const user = await getServerUser()

  if (!user || !user.id) {
    throw new Error('Please login to add to favorites.')
  }

  // Check if favorite exists
  const existingFavorite = await payload.find({
    collection: 'favorites',
    where: {
      and: [{ user: { equals: user.id } }, { blog: { equals: blogId } }],
    },
    depth: 0,
  })

  if (existingFavorite.totalDocs > 0) {
    // Delete favorite (Toggle OFF)
    await payload.delete({
      collection: 'favorites',
      id: existingFavorite.docs[0].id,
    })
    // revalidatePath('/')
    revalidatePath(currentPath)
    return { success: true, isFavorited: false }
  } else {
    // Create favorite (Toggle ON)
    await payload.create({
      collection: 'favorites',
      data: {
        user: user.id, // Pass ID string directly
        blog: blogId, // Pass ID string directly
      },
    })
    // revalidatePath('/')
    revalidatePath(currentPath)
    return { success: true, isFavorited: true }
  }
}

// Bookmark Action
export async function toggleBookmarkAction(blogId: string, currentPath: string) {
  const payload = await getPayload({ config: configPromise })
  const user = await getServerUser()

  if (!user || !user.id) {
    throw new Error('Please login to bookmark.')
  }

  const existingBookmark = await payload.find({
    collection: 'bookmarks',
    where: {
      and: [{ user: { equals: user.id } }, { blog: { equals: blogId } }],
    },
    depth: 0,
  })

  if (existingBookmark.totalDocs > 0) {
    await payload.delete({
      collection: 'bookmarks',
      id: existingBookmark.docs[0].id,
    })
    // revalidateTag('user-data')
    revalidatePath(currentPath)
    return { success: true, isBookmarked: false }
  } else {
    await payload.create({
      collection: 'bookmarks',
      data: {
        user: user.id,
        blog: blogId,
      },
    })
    // revalidateTag('user-data')
    revalidatePath(currentPath)
    return { success: true, isBookmarked: true }
  }
}
