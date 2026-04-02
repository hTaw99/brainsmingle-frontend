import { request } from '../request'
import { queryOptions } from '@tanstack/react-query'

export const checkIsAdmin = async () => {
  return request({
    url: '/admin/check',
  })
    .then(() => true)
    .catch(() => false)
}

export const checkIsAdminQueryOptions = () => {
  return queryOptions({
    queryKey: ['check-admin'],
    queryFn: checkIsAdmin,
  })
}
