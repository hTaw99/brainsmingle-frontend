import { useQueryClient } from '@tanstack/react-query'

import { clearAuthCookies } from '@/api/auth/clear-session'
import { useLocalizedNavigate } from '@/hooks/use-localized-navigate'

export const useLogout = () => {
  const navigate = useLocalizedNavigate()
  const queryClient = useQueryClient()

  return async () => {
    clearAuthCookies().then(async () => {
      queryClient.clear()
      navigate({
        to: '/',
      })
    })
  }
}
