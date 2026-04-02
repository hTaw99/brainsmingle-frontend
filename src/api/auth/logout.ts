import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

import { clearAuthCookies } from '@/api/auth/clear-session'
import { useLocalizedNavigate } from '@/hooks/use-localized-navigate'

export const useLogout = () => {
  const navigate = useLocalizedNavigate()
  const router = useRouter()
  const queryClient = useQueryClient()

  return async () => {
    clearAuthCookies().then(async () => {
      queryClient.clear()
      await navigate({
        to: '/',
      })
      await router.invalidate()
    })
  }
}
