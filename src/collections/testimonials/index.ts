// src/collections/testimonials.ts
import { CollectionConfig } from 'payload'
import { deleteOldAvatar } from './hook'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
  },
  hooks: {
    afterChange: [deleteOldAvatar],
  },
  access: {
    read: () => true, // API se publicly fetch karne ke liye
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
    },
    {
      name: 'review',
      type: 'textarea',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'testimonial-avatar',
      required: false,
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
  ],
}
