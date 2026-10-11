import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name', // Admin panel mein list mein user ka naam dikhega
    description: 'Submissions from the website contact form.',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
  },
  access: {
    // 🔥 Public users form submit kar sakein isliye create ko true karna zaroori hai
    create: () => true,
    // Data sirf admins ko dikhna chahiye
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text', // String rakha hai taaki +91 ya spaces save ho sakein
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
