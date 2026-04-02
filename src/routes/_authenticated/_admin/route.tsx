import { checkIsAdminQueryOptions } from '@/api/auth/check-admin'

import { Header } from '@/components/header'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_admin')({
  beforeLoad: async ({ context }) => {
    const isAdmin = await context.queryClient.ensureQueryData(
      checkIsAdminQueryOptions(),
    )

    if (!isAdmin) {
      throw redirect({ to: '/' })
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
