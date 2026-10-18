// // src/actions/userActions.ts
// 'use server'

// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import { revalidatePath } from 'next/cache'
// import { getServerUser } from '@/lib/get-server-user'

// // Favorite Action
// export async function toggleFavoriteAction(blogId: string, currentPath: string) {
//   const payload = await getPayload({ config: configPromise })
//   const user = await getServerUser()

//   if (!user || !user.id) {
//     // ❌ error throw mat karo
//     // throw new Error('Please login to add to favorites.')
//     // ✅ error object return karo
//     return { error: 'Please login to add to favorites.' }
//   }

//   const existingFavorite = await payload.find({
//     collection: 'favorites',
//     where: {
//       and: [{ user: { equals: user.id } }, { blog: { equals: blogId } }],
//     },
//     depth: 0,
//   })

//   if (existingFavorite.totalDocs > 0) {
//     await payload.delete({
//       collection: 'favorites',
//       id: existingFavorite.docs[0].id,
//     })
//     revalidatePath(currentPath)
//     return { success: true, isFavorited: false }
//   } else {
//     await payload.create({
//       collection: 'favorites',
//       data: {
//         user: user.id,
//         blog: blogId,
//       },
//     })
//     revalidatePath(currentPath)
//     return { success: true, isFavorited: true }
//   }
// }

// // Bookmark Action
// export async function toggleBookmarkAction(blogId: string, currentPath: string) {
//   const payload = await getPayload({ config: configPromise })
//   const user = await getServerUser()

//   if (!user || !user.id) {
//     // ✅ Return error object here as well
//     return { error: 'Please login to bookmark.' }
//   }

//   const existingBookmark = await payload.find({
//     collection: 'bookmarks',
//     where: {
//       and: [{ user: { equals: user.id } }, { blog: { equals: blogId } }],
//     },
//     depth: 0,
//   })

//   if (existingBookmark.totalDocs > 0) {
//     await payload.delete({
//       collection: 'bookmarks',
//       id: existingBookmark.docs[0].id,
//     })
//     revalidatePath(currentPath)
//     return { success: true, isBookmarked: false }
//   } else {
//     await payload.create({
//       collection: 'bookmarks',
//       data: {
//         user: user.id,
//         blog: blogId,
//       },
//     })
//     revalidatePath(currentPath)
//     return { success: true, isBookmarked: true }
//   }
// }

// src/actions/userActions.ts
'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { getServerUser } from '@/lib/get-server-user'

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

// NAYA FUNCTION YAHAN ADD KAREIN 👇
export async function getUserInteractions(blogIds: string[]) {
  try {
    const payload = await getPayload({ config: configPromise })
    const user = await getServerUser()

    if (!user || !user.id) {
      return { favorites: [], bookmarks: [] }
    }

    const [userFavs, userBooks] = await Promise.all([
      payload.find({
        collection: 'favorites',
        where: {
          and: [{ user: { equals: user.id } }, { blog: { in: blogIds } }],
        },
        depth: 0,
        pagination: false,
      }),
      payload.find({
        collection: 'bookmarks',
        where: {
          and: [{ user: { equals: user.id } }, { blog: { in: blogIds } }],
        },
        depth: 0,
        pagination: false,
      }),
    ])

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
