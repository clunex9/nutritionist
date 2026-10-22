import type { CollectionConfig } from 'payload'

export const TeamAvatar: CollectionConfig = {
  slug: 'team-avatar',
  admin: {
    group: 'avatar/image',
  },
  access: {
    read: () => true,
  },
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 256,
      },
    ],
    adminThumbnail: 'thumbnail',
    // 🔥 Pro-tip: Next-gen format use karne se file size 30-40% aur kam ho jayega quality loose kiye bina
    formatOptions: {
      format: 'webp',
      options: { quality: 80 },
    },
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
