// src/collections/Bookmarks.ts
import type { CollectionConfig } from 'payload'

export const Bookmarks: CollectionConfig = {
  slug: 'bookmarks',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'blog', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return { user: { equals: user.id } }
      return false
    },
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => {
      if (user) return { user: { equals: user.id } }
      return false
    },
    update: () => false,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'blog',
      type: 'relationship',
      relationTo: 'blogs',
      required: true,
      hasMany: false,
    },
  ],
}
