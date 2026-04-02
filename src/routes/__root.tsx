import { useEffect } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import PostHogProvider from '../integrations/posthog/provider'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { clearAuthCookies } from '@/api/auth/clear-session'
import type { getMe } from '@/api/users/get-me'
import { getMeQueryOptions } from '@/api/users/get-me'
import { getIsomorphicAccessToken } from '@/api/request/request-interceptor'
import { QUERY_KEYS } from '@/constants/query-keys'
import { useAuthStore } from '@/store/auth'

interface MyRouterContext {
  queryClient: QueryClient
  user?: Awaited<ReturnType<typeof getMe>> | null
  accessToken?: string | null
}

function RootComponent() {
  const { accessToken } = Route.useRouteContext()
  const setAccessToken = useAuthStore((s) => s.setAccessToken)

  useEffect(() => {
    if (accessToken) setAccessToken(accessToken)
  }, [accessToken, setAccessToken])

  return <Outlet />
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context }) => {
    const accessToken = await getIsomorphicAccessToken()

    if (!accessToken) {
      return { user: null, accessToken: null }
    }

    const me = await context.queryClient.ensureQueryData(getMeQueryOptions())

    if (!me?.data) {
      await clearAuthCookies()
      context.queryClient.removeQueries({ queryKey: QUERY_KEYS.me })
      return { user: null, accessToken: null }
    }

    return { user: me, accessToken }
  },

  head: () => {
    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: 'TanStack Start Starter',
        },
      ],
      links: [
        {
          rel: 'stylesheet',
          href: appCss,
        },
      ],
    }
  },
  notFoundComponent: () => (
    <div className="bg-background text-white h-screen flex items-center justify-center">
      Page not found
    </div>
  ),
  component: RootComponent,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
        <PostHogProvider>
          {/* <TanStackQueryProvider> */}
          {children}
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
          {/* </TanStackQueryProvider> */}
        </PostHogProvider>
        <Scripts />
      </body>
    </html>
  )
}
