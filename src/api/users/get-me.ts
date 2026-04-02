import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { request } from '@/api/request'
import { QUERY_KEYS } from '@/constants/query-keys'
import type { TUser } from '@/types/user'

export type TMePayload = {
  accessToken: string
  user?: TUser | null
}

export const getMe = async (): Promise<{ data: TMePayload } | null> => {
  try {
    const res = await request<{ data: TMePayload }>({
      url: '/users/5501/',
    })
    return res
  } catch (error) {
    return null
  }
}

export const getMeQueryOptions = () =>
  queryOptions({
    queryKey: QUERY_KEYS.me,
    staleTime: Infinity,
    queryFn: getMe,
  })

export const useGetMe = () => {
  return useSuspenseQuery(getMeQueryOptions())
}
