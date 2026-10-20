// src/actions/accountActions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { getServerUser } from '@/lib/get-server-user'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_AVATAR_SIZE = 2 * 1024 * 1024 // 2MB

// 👉 8. Profile Update Action
export async function updateProfileAction(formData: FormData) {
  let avatarId: string | number | undefined = undefined
  const payload = await getPayload({ config: configPromise })

  try {
    const user = await getServerUser()
    if (!user) {
      return { success: false, error: 'Unauthorized. Please log in.' }
    }

    const name = (formData.get('name') as string)?.trim()
    const gender = formData.get('gender') as 'male' | 'female' | 'other'
    const avatarFile = formData.get('avatar') as File | null
    const removeAvatar = formData.get('removeAvatar') === 'true'

    if (!name || !gender) {
      return { success: false, error: 'Name and gender are required.' }
    }

    if (avatarFile && avatarFile.size > 0) {
      if (!ALLOWED_IMAGE_TYPES.includes(avatarFile.type)) {
        return { success: false, error: 'Only JPG, PNG, WebP, or AVIF images are allowed.' }
      }
      if (avatarFile.size > MAX_AVATAR_SIZE) {
        return { success: false, error: 'Image size must be less than 2MB.' }
      }

      const arrayBuffer = await avatarFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const mediaDoc = await payload.create({
        collection: 'avatars',
        data: {},
        file: {
          data: buffer,
          name: avatarFile.name,
          mimetype: avatarFile.type,
          size: avatarFile.size,
        },
      })
      avatarId = mediaDoc.id
    }

    const updateData: Record<string, any> = { name, gender }

    if (avatarId) {
      updateData.avatar = avatarId
    } else if (removeAvatar) {
      updateData.avatar = null
    }

    await payload.update({
      collection: 'users',
      id: user.id,
      data: updateData,
    })

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (error: any) {
    // Agar user update fail ho jaye toh newly uploaded avatar rollback kar do
    if (avatarId) {
      await payload.delete({ collection: 'avatars', id: avatarId }).catch(() => {})
    }
    return { success: false, error: error.message || 'Failed to update profile' }
  }
}
