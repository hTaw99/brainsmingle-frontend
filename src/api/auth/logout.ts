import { useRouter } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth'
import { clearAuthCookies } from '@/api/auth/clear-session'

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { clearAccessToken } = useAuthStore()

  return async () => {
    clearAuthCookies().then(async () => {
      clearAccessToken()
      queryClient.clear()
      router.navigate({ to: '/', replace: true })
    })
  }
}
