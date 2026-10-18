import type { CollectionConfig } from 'payload'
import { deleteImageOnBlogDelete, deleteOldImage } from './hook'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['image', 'title', 'category', 'author', 'createdAt'],
  },
  hooks: {
    afterChange: [deleteOldImage],
    afterDelete: [deleteImageOnBlogDelete], // 🔥 Delete hook array me add kiya
  },
  access: {
    read: () => true, // API se publicly fetch karne ke liye
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'blog-image', // Blog cover image Media collection se aayegi
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users', // ✅ Aapke existing Users collection se link kiya
      required: true,
      admin: {
        // Option: Dropdown me sirf wahi users dikhaye jinka role admin/editor/author hai
        condition: () => true,
      },
    },
    {
      name: 'readTime',
      type: 'text',
      required: true,
      defaultValue: '5 min read',
    },
  ],
}
