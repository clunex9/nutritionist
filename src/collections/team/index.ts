import { CollectionConfig } from 'payload'
import { deleteOldAvatar } from './hook'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['avatar', 'name', 'role', 'department'],
  },
  hooks: {
    afterChange: [deleteOldAvatar],
  },
  access: {
    read: () => true, // Frontend API se fetch karne ke liye
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Designation / Role',
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      options: [
        { label: 'Management Team', value: 'management team' },
        { label: 'Nutritionists and Dietitians', value: 'nutritionists and dietitians' },
        { label: 'Customer Support', value: 'customer support' },
        { label: 'Marketing and Communications', value: 'marketing and communications' },
        { label: 'Technology and Development', value: 'technology and development' },
      ],
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'team-avatar',
      required: true,
    },
  ],
}
