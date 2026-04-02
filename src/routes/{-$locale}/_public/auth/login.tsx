import z from 'zod'
import { useLogin } from '@/api/auth/login'
import { createFileRoute } from '@tanstack/react-router'
import { useIntlayer } from 'react-intlayer'

export const Route = createFileRoute('/{-$locale}/_public/auth/login')({
  validateSearch: z.object({
    redirectTo: z.string().optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const content = useIntlayer('app')
  const { mutate: login, isPending } = useLogin()

  return (
    <div className="text-white flex items-center justify-center flex-col gap-4">
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
        onClick={() => login()}
        disabled={isPending}
      >
        {isPending ? content.login.pending : content.login.cta}
      </button>
    </div>
  )
}
