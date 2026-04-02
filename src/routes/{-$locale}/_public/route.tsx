import { Header } from '@/components/header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/_public')({
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
