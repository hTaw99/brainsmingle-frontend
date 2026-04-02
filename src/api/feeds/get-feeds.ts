import type { TFeed } from '@/types/feed'
import { request } from '@/api/request'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { TApiResponse } from '@/types/api-response'

export type TFeedQuery = {
  page?: number
  limit?: number
  feedType?: TFeed['type']
}

export const getFeeds = async (query?: TFeedQuery) => {
  return request<TApiResponse<TFeed>>({
    url: '/feed',
    params: query,
  })
}

export const getFeedsQueryOptions = (query?: TFeedQuery) => {
  return {
    queryKey: ['feeds', query],
    queryFn: () => getFeeds(query),
  }
}

export const useGetFeeds = (query?: TFeedQuery) => {
  return useSuspenseQuery(getFeedsQueryOptions(query))
}
