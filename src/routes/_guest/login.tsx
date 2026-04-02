import { useLogin } from '#/api/auth/login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: login, isPending } = useLogin()

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
      onClick={() => login()}
      disabled={isPending}
    >
      {isPending ? 'Logging in...' : 'Login'}
    </button>
  )
}
