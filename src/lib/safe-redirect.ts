const DEFAULT_REDIRECT = '/account/profile'

/**
 * callbackUrl ko sirf tab accept karta hai jab wo same-site relative path ho.
 * Open redirect rokne ke liye: https://evil.com, //evil.com, /\evil.com,
 * javascript:..., control characters sab fallback pe chale jate hain.
 *
 * Page (server) aur route handlers (jaise /api/auth/google) dono me use karo.
 */
export function getSafeCallbackUrl(
  value: string | string[] | null | undefined,
  fallback: string = DEFAULT_REDIRECT,
): string {
  if (typeof value !== 'string') return fallback

  // Sirf '/' se shuru hone wala path, '//' ya '/\' nahi
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) {
    return fallback
  }

  // Backslash aur control characters (tab/newline) browser ko confuse kar sakte hain
  if (/[\\\u0000-\u001F\u007F]/.test(value)) return fallback

  try {
    const url = new URL(value, 'http://localhost')

    // Parse ke baad bhi origin same hona chahiye
    if (url.origin !== 'http://localhost') return fallback

    // Login ke baad auth pages ya API routes pe wapas bhejne ka matlab nahi
    // (/api/auth/clear pe bhejna to user ko seedha logout kar dega)
    if (
      url.pathname === '/auth' ||
      url.pathname.startsWith('/auth/') ||
      url.pathname === '/api' ||
      url.pathname.startsWith('/api/')
    ) {
      return fallback
    }

    return url.pathname + url.search + url.hash
  } catch {
    return fallback
  }
}
