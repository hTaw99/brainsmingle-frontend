import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { apiClient } from '@/api/request/api-client'
import { getErrorMessage } from '@/api/request/error-handler'
import { setIsomorphicAccessToken } from '@/api/request/request-interceptor'
import { refreshToken } from '@/api/auth/refresh-token'
import { getContext } from '@/integrations/tanstack-query/root-provider'
import { QUERY_KEYS } from '@/constants/query-keys'

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: AxiosError | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve()
    }
  })
  failedQueue = []
}

const forceLogout = async () => {
  const { queryClient } = getContext()
  queryClient.removeQueries({ queryKey: QUERY_KEYS.accessToken })
  window.location.href = '/login'
}

export const responseErrorInterceptor = async (error: AxiosError) => {
  const originalRequest =
    error.config as unknown as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

  if (error.response?.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then(() => {
          return apiClient(originalRequest)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const refreshResponse = await refreshToken()

      if (refreshResponse?.accessToken) {
        originalRequest.headers.Authorization = `${refreshResponse.accessToken}`
        setIsomorphicAccessToken({ accessToken: refreshResponse.accessToken })

        processQueue(null)
        return apiClient(originalRequest)
      } else {
        processQueue(error)
        return Promise.reject(error)
      }
    } catch (refreshError) {
      processQueue(refreshError as AxiosError)
      await forceLogout()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }

  return Promise.reject(getErrorMessage(error))
}
