import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/_public/_auth')({
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: '/{-$locale}',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
