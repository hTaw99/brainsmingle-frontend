import { useRouteContext } from '@tanstack/react-router'

export function UserDetails() {
  const { user } = useRouteContext({ from: '/_guest/' })

  return <div>{user?.data.accessToken.substring(0, 10)}</div>
}
