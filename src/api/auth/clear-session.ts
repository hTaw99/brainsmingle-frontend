import { createServerFn } from '@tanstack/react-start'
import { deleteCookie } from '@tanstack/react-start/server'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '#/constants/auth'
import { getAuthCookieOptions } from '#/lib/get-auth-cookie-options'

export const clearAuthCookies = createServerFn().handler(async () => {
  const { accessCookieOptions, refreshCookieOptions } = getAuthCookieOptions()
  deleteCookie(ACCESS_TOKEN_NAME, accessCookieOptions)
  deleteCookie(REFRESH_TOKEN_NAME, refreshCookieOptions)
})
