import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_user/community')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-screen text-6xl flex items-center justify-center">
      Community
    </div>
  )
}
