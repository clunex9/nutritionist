import type { Access, PayloadRequest, Where } from 'payload'
import { isAdmin, isEditor, isAuthor, isSubscriber, hasCmsAccess } from '@/access/roles'

export const publicAccess: Access = () => true

export const canAccessCmsUI = ({ req: { user } }: { req: PayloadRequest }): boolean => {
  return hasCmsAccess(user)
}

export const canReadUsers: Access = ({ req }) => {
  if (isAdmin(req.user)) return true

  if (isEditor(req.user)) {
    // ⚠️ MULTI-ROLE FIX: Editor unn users ko nahi dekh sakta jinki role array me 'admin' majood ho
    // 'not_in' operate karega DB array par
    return { roles: { not_in: ['admin'] } } as Where
  }

  if (isAuthor(req.user) || isSubscriber(req.user)) {
    if (!req.user?.id) return false
    return { id: { equals: req.user.id } }
  }

  return false
}

export const canUpdateUsers: Access = ({ req }) => {
  if (isAdmin(req.user)) return true

  if (isEditor(req.user) || isAuthor(req.user) || isSubscriber(req.user)) {
    if (!req.user?.id) return false
    return { id: { equals: req.user?.id } }
  }

  return false
}

export const canDeleteUsers: Access = ({ req }) => {
  if (isAdmin(req.user)) {
    if (!req.user?.id) return false
    return { id: { not_equals: req.user.id } }
  }

  if (isAuthor(req.user) || isEditor(req.user) || isSubscriber(req.user)) {
    if (!req.user?.id) return false
    return { id: { equals: req.user.id } }
  }

  return false
}

export const canUnlockUsers: Access = ({ req, id }) => {
  if (!isAdmin(req.user)) return false
  if (id && String(req.user?.id) === String(id)) return false
  return true
}
