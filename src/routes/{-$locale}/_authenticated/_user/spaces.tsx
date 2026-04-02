import { useGetMe } from '@/api/users/get-me'
import { createFileRoute } from '@tanstack/react-router'
import { useIntlayer } from 'react-intlayer'

export const Route = createFileRoute('/{-$locale}/_authenticated/_user/spaces')(
  {
    head: () => ({
      meta: [
        {
          title: 'Spaces | BrainsMingle',
        },
      ],
    }),
    component: RouteComponent,
  },
)

function RouteComponent() {
  const { data: me } = useGetMe()
  const content = useIntlayer('app')

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{content.spaces.title}</h1>
        {me?.data.accessToken.substring(0, 10)}
      </div>
    </div>
  )
}
