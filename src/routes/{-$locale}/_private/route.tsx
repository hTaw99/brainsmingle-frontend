import { Pending } from '@/components/pending'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getPathWithoutLocale } from 'intlayer'

export const Route = createFileRoute('/{-$locale}/_private')({
  ssr: false,

  beforeLoad: async ({ context, params, location }) => {
    if (!context.user?.data) {
      throw redirect({
        to: '/{-$locale}/auth/login',
        search: { redirectTo: getPathWithoutLocale(location.pathname) },
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
