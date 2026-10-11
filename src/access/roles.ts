import type { User } from '@/payload-types'

export const checkRole = (allowedRoles: string[] = [], user?: User | null): boolean => {
  if (!user || !user.roles) return false

  return user.roles.some((userRole) => allowedRoles.includes(userRole))
}

export const hasCmsAccess = (user?: User | null): boolean => {
  return checkRole(['admin', 'editor', 'author'], user)
}

export const isAdmin = (user?: User | null): boolean => {
  return user?.roles?.includes('admin') || false
}

export const isEditor = (user?: User | null): boolean => {
  return user?.roles?.includes('editor') || false
}

export const isAuthor = (user?: User | null): boolean => {
  return user?.roles?.includes('author') || false
}

export const isSubscriber = (user?: User | null): boolean => {
  return user?.roles?.includes('subscriber') || false
}
