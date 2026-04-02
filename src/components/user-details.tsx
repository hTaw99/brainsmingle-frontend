import { useRouteContext } from '@tanstack/react-router'

export function UserDetails() {
  const { user } = useRouteContext({ from: '/{-$locale}/_guest/' })

  if (!user) return null

  return (
    <div className="bg-white/3 border self-start border-white/5 p-4 rounded-md">
      {user.data.accessToken.substring(0, 10)}
    </div>
  )
}
