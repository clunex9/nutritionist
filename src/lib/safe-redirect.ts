// src/lib/safe-redirect.ts
export function getSafeCallbackUrl(url: unknown, fallback = '/account/profile'): string {
  if (typeof url !== 'string' || !url.trim()) return fallback

  const decoded = decodeURIComponent(url.trim())

  // Sirf single '/' se shuru hone wale internal routes allow karo ('//' ya 'http:' block)
  if (decoded.startsWith('/') && !decoded.startsWith('//') && !decoded.includes('\\')) {
    return decoded
  }

  return fallback
}
