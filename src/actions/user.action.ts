// src/actions/userActions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { getServerUser } from '@/lib/get-server-user'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Favorite Action
export async function toggleFavoriteAction(blogId: string, currentPath: string) {
  try {
    const payload = await getPayload({ config: configPromise })
    const user = await getServerUser()

    if (!user || !user.id) {
      return { error: 'Please login to add to favorites.' }
    }

    const existingFavorite = await payload.find({
      collection: 'favorites',
      where: {
        and: [{ user: { equals: user.id } }, { blog: { equals: blogId } }],
      },
      depth: 0,
    })

    if (existingFavorite.totalDocs > 0) {
      await payload.delete({
        collection: 'favorites',
        id: existingFavorite.docs[0].id,
      })
      revalidatePath(currentPath)
      return { success: true, isFavorited: false }
    } else {
      await payload.create({
        collection: 'favorites',
        data: {
          user: user.id,
          blog: blogId,
        },
      })
      revalidatePath(currentPath)
      return { success: true, isFavorited: true }
    }
  } catch (error) {
    console.error('Error toggling favorite:', error)
    return { error: 'Something went wrong. Please try again later.' }
  }
}

// Bookmark Action
export async function toggleBookmarkAction(blogId: string, currentPath: string) {
  try {
    const payload = await getPayload({ config: configPromise })
    const user = await getServerUser()

    if (!user || !user.id) {
      return { error: 'Please login to bookmark.' }
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
      revalidatePath(currentPath)
      return { success: true, isBookmarked: true }
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error)
    return { error: 'Something went wrong. Please try again later.' }
  }
}

export async function getUserInteractions(blogIds: string[]) {
  try {
    const payload = await getPayload({ config: configPromise })
    const user = await getServerUser()

    if (!user || !user.id) {
      return { favorites: [], bookmarks: [] }
    }

    // Promise.all hataya aur pagination: false ki jagah limit: 100 lagaya
    const userFavs = await payload.find({
      collection: 'favorites',
      where: {
        and: [{ user: { equals: user.id } }, { blog: { in: blogIds } }],
      },
      depth: 0,
      limit: 100,
    })

    const userBooks = await payload.find({
      collection: 'bookmarks',
      where: {
        and: [{ user: { equals: user.id } }, { blog: { in: blogIds } }],
      },
      depth: 0,
      limit: 100,
    })

    const favorites = userFavs.docs
      .map((fav: any) => (typeof fav.blog === 'string' ? fav.blog : fav.blog?.id))
      .filter(Boolean) as string[]

    const bookmarks = userBooks.docs
      .map((book: any) => (typeof book.blog === 'string' ? book.blog : book.blog?.id))
      .filter(Boolean) as string[]

    return { favorites, bookmarks }
  } catch (error) {
    console.error('Error fetching user interactions:', error)
    return { favorites: [], bookmarks: [] }
  }
}
