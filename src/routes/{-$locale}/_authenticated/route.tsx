import { Pending } from '@/components/pending'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/_authenticated')({
  ssr: false,

  beforeLoad: async ({ context, params, location }) => {
    if (!context.user?.data) {
      throw redirect({
        to: '/{-$locale}/login',
        search: { redirectTo: location.pathname },
        params: { locale: params.locale },
      })
    }
  },

  pendingMs: 0,

  pendingComponent: Pending,
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
