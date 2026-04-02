import axios from 'axios'

import { responseErrorInterceptor } from '@/api/request/response-interceptor'
import { requestInterceptor } from '@/api/request/request-interceptor'

const REQUEST_TIMEOUT = 30_000

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error),
)
apiClient.interceptors.response.use(
  (response) => response,
  responseErrorInterceptor,
)
