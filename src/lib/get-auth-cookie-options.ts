const ACCESS_TOKEN_EXPIRY = 10 * 60  // 10 minutes in seconds
const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 7 // 7 days in seconds

const isProduction = process.env.NODE_ENV === 'production'
const SHARED_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'strict' : 'lax',
  path: '/',
}

function getAuthCookieOptions() {
  return {
    accessCookieOptions: {
      ...SHARED_COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_EXPIRY,
    } as any,
    refreshCookieOptions: {
      ...SHARED_COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_EXPIRY,
    } as any,
  }
}

export { getAuthCookieOptions }
