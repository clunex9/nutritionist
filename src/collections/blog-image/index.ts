import type { CollectionConfig } from 'payload'

export const BlogImage: CollectionConfig = {
  slug: 'blog-image',
  admin: {
    group: 'avatar/image',
  },
  access: {
    read: () => true, // Frontend par images dikhane ke liye zaroori hai
  },
  upload: true,
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
