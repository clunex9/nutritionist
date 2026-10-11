// src/collections/Favorites.ts
import type { CollectionConfig } from 'payload'

export const Favorites: CollectionConfig = {
  slug: 'favorites',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'blog', 'createdAt'],
  },
  access: {
    // Sirf logged-in users apne favorites dekh, bana aur delete kar sakte hain
    read: ({ req: { user } }) => {
      if (user) {
        return { user: { equals: user.id } } // User sirf apne favorites fetch kar sakega
      }
      return false
    },
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => {
      if (user) {
        return { user: { equals: user.id } }
      }
      return false
    },
    update: () => false, // Ek baar favorite ban gaya toh update nahi hoga, sirf delete hoga
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
