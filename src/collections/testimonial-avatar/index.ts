import type { CollectionConfig } from 'payload'

export const TestimonialAvatar: CollectionConfig = {
  slug: 'testimonial-avatar',
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
        width: 150,
        height: 150,
        position: 'centre',
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
