import { checkIsAdminQueryOptions } from '@/api/auth/check-admin'

import { Header } from '@/components/header'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { defaultLocale } from 'intlayer'

export const Route = createFileRoute('/{-$locale}/_authenticated/_admin')({
  beforeLoad: async ({ context, params }) => {
    const isAdmin = await context.queryClient.ensureQueryData(
      checkIsAdminQueryOptions(),
    )

    if (!isAdmin) {
      throw redirect({
        to: '/{-$locale}',
        params: { locale: params.locale ?? defaultLocale },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-background text-white">
      <Header />
      <Outlet />
    </div>
  )
}
