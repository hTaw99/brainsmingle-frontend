import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/{-$locale}/_authenticated/_admin/admin/users',
)({
  head: () => ({
    meta: [
      {
        title: 'Admin Users | BrainsMingle',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello Admin Users!</div>
}
