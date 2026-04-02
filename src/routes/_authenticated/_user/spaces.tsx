import { useGetMe } from '@/api/users/get-me'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_user/spaces')({
  head: () => ({
    meta: [
      {
        title: 'Spaces | BrainsMingle',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { data: me } = useGetMe()

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Spaces</h1>
        {me?.data.accessToken.substring(0, 10)}
      </div>
    </div>
  )
}
