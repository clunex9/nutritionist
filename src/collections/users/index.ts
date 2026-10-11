import { type CollectionConfig } from 'payload'
import { deleteOldAvatar, ensureFirstUserIsAdmin } from './hooks'
import {
  canAccessCmsUI,
  canDeleteUsers,
  canReadUsers,
  canUnlockUsers,
  canUpdateUsers,
  publicAccess,
} from './access'
import {
  canManageLockUntilField,
  canManageRoleField,
  canUpdateOwnProfileField,
} from './field-access'
import { canShowLockUntilField, canShowRoleField, showIfUserExists } from './conditions'
import { resetPasswordTemplate } from '@/templates/reset-password.template'

export const Users: CollectionConfig = {
  slug: 'users',

  admin: {
    // group: 'users',
    defaultColumns: ['avatar', 'name', 'email', 'roles'],
    useAsTitle: 'name',
  },

  auth: {
    tokenExpiration: 30 * 24 * 60 * 60, // 30 days * 24 hours * 60 mins * 60 secs
    maxLoginAttempts: 3,
    lockTime: 15 * 60 * 1000, // 15 minutes

    forgotPassword: {
      generateEmailHTML: (args) => resetPasswordTemplate(args),
    },
  },

  hooks: {
    afterChange: [deleteOldAvatar],
  },

  access: {
    admin: canAccessCmsUI,
    create: publicAccess,
    read: canReadUsers,
    update: canUpdateUsers,
    delete: canDeleteUsers,
    unlock: canUnlockUsers,
  },

  fields: [
    // email
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      access: {
        update: canUpdateOwnProfileField,
      },
    },

    // auth provider
    {
      name: 'authProvider',
      type: 'select',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Google', value: 'google' },
      ],
      defaultValue: 'email',
      admin: {
        readOnly: true,
        condition: (data, _, { user }) => showIfUserExists({ user }),
      },
    },

    // gender
    {
      name: 'gender',
      type: 'select',
      admin: {
        condition: (data, _, { user }) => showIfUserExists({ user }),
      },
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
    },

    // avatar
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'avatars', // Agar aapke paas 'avatars' naam ka collection hai jahan images save hoti hain
      required: false,
      admin: {
        condition: (data, _, { user }) => showIfUserExists({ user }),
      },
    },

    // lockUntil
    {
      name: 'lockUntil',
      type: 'date',
      access: {
        read: canManageLockUntilField,
        update: canManageLockUntilField,
      },
      admin: {
        condition: (data, _, { user }) => canShowLockUntilField({ user, data }),
      },
    },

    // name
    {
      name: 'name',
      type: 'text',
      access: {
        update: canUpdateOwnProfileField,
      },
    },

    // role
    {
      name: 'roles',
      type: 'select',
      access: {
        read: () => true,
        create: canManageRoleField,
        update: canManageRoleField,
      },
      admin: {
        condition: (data, _, { user }) => canShowRoleField({ user, data }),
      },
      defaultValue: ['subscriber'],
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'editor',
          value: 'editor',
        },
        {
          label: 'author',
          value: 'author',
        },
        {
          label: 'subscriber',
          value: 'subscriber',
        },
      ],
    },
  ],
}
