import type { CollectionConfig } from 'payload'

export const Avatars: CollectionConfig = {
  slug: 'avatars',
  admin: {
    group: 'avatar/image',
  },
  access: {
    read: () => true,
  },
  upload: {
    formatOptions: { format: 'webp', options: { quality: 75 } },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
        height: 150,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 75 } },
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      admin: {
        hidden: true,
      },
    },
  ],
}
