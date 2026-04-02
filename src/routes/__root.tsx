import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useMatches,
} from '@tanstack/react-router'
import { defaultLocale, getHTMLTextDir } from 'intlayer'
import { IntlayerProvider } from 'react-intlayer'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import PostHogProvider from '@/integrations/posthog/provider'

import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { clearAuthCookies } from '@/api/auth/clear-session'
import type { getMe } from '@/api/users/get-me'
import { getMeQueryOptions } from '@/api/users/get-me'
import { getIsomorphicAccessToken } from '@/api/request/request-interceptor'
import { QUERY_KEYS } from '@/constants/query-keys'
import { Direction } from 'radix-ui'
import { NotFoundComponent } from '@/components/not-found'

interface MyRouterContext {
  queryClient: QueryClient
  user?: Awaited<ReturnType<typeof getMe>> | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context }) => {
    const accessToken = await getIsomorphicAccessToken()

    if (!accessToken) {
      return { user: null }
    }

    const me = await context.queryClient.ensureQueryData(getMeQueryOptions())

    if (!me?.data) {
      await clearAuthCookies()
      context.queryClient.removeQueries({ queryKey: QUERY_KEYS.me })
      return { user: null }
    }

    context.queryClient.setQueryData(QUERY_KEYS.accessToken, accessToken)
    return { user: me }
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
  notFoundComponent: NotFoundComponent,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const matches = useMatches()
  const localeRoute = matches.find((m) => m.routeId === '/{-$locale}')
  const locale = localeRoute?.params.locale ?? defaultLocale

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>

      <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
        <IntlayerProvider locale={locale}>
          <Direction.Provider dir={getHTMLTextDir(locale) as any}>
            <PostHogProvider>
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
            </PostHogProvider>
          </Direction.Provider>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  )
}
