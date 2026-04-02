import { getCookie, setCookie } from '@tanstack/react-start/server'
import { createIsomorphicFn } from '@tanstack/react-start'
import type { InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/auth'
import { getAuthCookieOptions } from '@/lib/get-auth-cookie-options'
import { ACCESS_TOKEN_NAME } from '@/constants/auth'
import { refreshToken } from '../auth/refresh-token'

export const requestSuccessInterceptor = async (
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
    let accessToken: string | null = getCookie(ACCESS_TOKEN_NAME) ?? null
    if (!accessToken) {
      accessToken = (await refreshToken()) as string | null
    }
    return accessToken
  })
  .client(() => {
    return useAuthStore.getState().accessToken
  })

export const setIsomorphicAccessToken = createIsomorphicFn()
  .server((data) => {
    const { accessCookieOptions } = getAuthCookieOptions()
    setCookie(ACCESS_TOKEN_NAME, data.accessToken, accessCookieOptions)
  })
  .client((data) => {
    useAuthStore.getState().setAccessToken(data.accessToken)
  })
