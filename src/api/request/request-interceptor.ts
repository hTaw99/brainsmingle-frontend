import { getCookie, setCookie } from '@tanstack/react-start/server'
import { createIsomorphicFn } from '@tanstack/react-start'
import type { InternalAxiosRequestConfig } from 'axios'
import { getAuthCookieOptions } from '@/lib/get-auth-cookie-options'
import { ACCESS_TOKEN_NAME } from '@/constants/auth'
import { refreshToken } from '@/api/auth/refresh-token'
import { getContext } from '@/integrations/tanstack-query/root-provider'
import { QUERY_KEYS } from '@/constants/query-keys'

export const requestInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  const accessToken = await getIsomorphicAccessToken()

  if (accessToken) {
    config.headers.Authorization = `${accessToken}`
  }

  return config
}

export const getIsomorphicAccessToken = createIsomorphicFn()
  .server(async () => {
    let accessToken = getCookie(ACCESS_TOKEN_NAME) ?? null
    if (!accessToken) {
      accessToken = await refreshToken()
    }
    return accessToken
  })
  .client(() => {
    return getContext().queryClient.getQueryData(QUERY_KEYS.accessToken)
  })

export const setIsomorphicAccessToken = createIsomorphicFn()
  .server((data) => {
    const { accessCookieOptions } = getAuthCookieOptions()
    setCookie(ACCESS_TOKEN_NAME, data.accessToken, accessCookieOptions)
  })
  .client((data) => {
    getContext().queryClient.setQueryData(
      QUERY_KEYS.accessToken,
      data.accessToken,
    )
  })
