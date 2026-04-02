import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  ssr: false,

  beforeLoad: async ({ context }) => {
    if (!context.user?.data) {
      throw redirect({ to: '/login' })
    }
  },

  pendingMs: 0,

  pendingComponent: () => (
    <div className="bg-background text-white h-screen flex items-center justify-center">
      Loading...
    </div>
  ),

  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
