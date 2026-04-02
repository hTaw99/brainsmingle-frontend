export type TApiResponse<T> = {
  status: number
  message: string
  data: {
    items: T[]
    hasMore: boolean
    page: number
    limit: number
    total: number
  }
}
