import { createFileRoute } from '@tanstack/react-router'
import { useIntlayer } from 'react-intlayer'

export const Route = createFileRoute('/{-$locale}/_authenticated/_user/community')({
  component: RouteComponent,
})

function RouteComponent() {
  const content = useIntlayer('app')

  return (
    <div className="h-screen text-6xl flex items-center justify-center">
      {content.community.title}
    </div>
  )
}
