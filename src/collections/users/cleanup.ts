import type { Payload } from 'payload'

const globalForCleanup = globalThis as unknown as {
  unverifiedCleanupTimer?: ReturnType<typeof setInterval>
}

export const startUnverifiedUserCleanup = (payload: Payload) => {
  if (globalForCleanup.unverifiedCleanupTimer) {
    clearInterval(globalForCleanup.unverifiedCleanupTimer)
  }

  const runCleanup = async () => {
    try {
      const EXPIRATION_MS = 24 * 60 * 60 * 1000
      const cutoffDate = new Date(Date.now() - EXPIRATION_MS).toISOString()

      const result = await payload.delete({
        collection: 'users',
        where: {
          and: [
            { _verified: { equals: false } },
            { authProvider: { equals: 'email' } },
            { roles: { not_in: ['admin'] } },
            { createdAt: { less_than: cutoffDate } },
          ],
        },
        overrideAccess: true,
      })

      if (result.docs.length > 0) {
        payload.logger.info(
          `🧹 [Auto-Cleanup] Deleted ${result.docs.length} unverified account(s).`,
        )
      }
    } catch (error) {
      payload.logger.error({
        err: error,
        msg: 'Failed to delete expired unverified users',
      })
    }
  }

  void runCleanup()

  const INTERVAL_MS = 60 * 60 * 1000
  globalForCleanup.unverifiedCleanupTimer = setInterval(() => {
    void runCleanup()
  }, INTERVAL_MS)
}
