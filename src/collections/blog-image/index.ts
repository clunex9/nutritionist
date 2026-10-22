import type { CollectionConfig } from 'payload'

export const BlogImage: CollectionConfig = {
  slug: 'blog-image',
  admin: {
    group: 'avatar/image',
  },
  access: {
    read: () => true,
  },
  upload: {
    // 🔥 Original image ko auto WebP me compress karega (75% quality is visually perfect)
    formatOptions: { format: 'webp', options: { quality: 75 } },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 600,
        height: 400,
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
