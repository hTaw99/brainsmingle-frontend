// https://github.com/aymericzip/intlayer-tanstack-start-template/blob/main/src/hooks/useLocalizedNavigate.ts

import { useNavigate } from '@tanstack/react-router'
import { getPrefix } from 'intlayer'
import { useLocale } from 'react-intlayer'

import type { FileRouteTypes } from '@/routeTree.gen'

import { LOCALE_ROUTE } from '@/components/localized-link'

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}/`
  | `/${typeof LOCALE_ROUTE}`
  ? '/'
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never

export type LocalizedTo = StripLocalePrefix<FileRouteTypes['to']>

export const useLocalizedNavigate = () => {
  const navigate = useNavigate()

  const { locale } = useLocale()

  type LocalizedNavigate = (
    args: ({ to: LocalizedTo } & Record<string, unknown>) | LocalizedTo,
  ) => ReturnType<typeof navigate>

  const localizedNavigate: LocalizedNavigate = (args) => {
    if (typeof args === 'string') {
      // `locale` is valid for all `/{-$locale}/*` routes; TypeScript can't verify
      // this when `to` is constructed dynamically at runtime.
      return navigate({
        params: { locale: getPrefix(locale).localePrefix },
        to: `/${LOCALE_ROUTE}${args}`,
      })
    }

    const { params: existingParams, to, ...rest } = args

    const localizedTo = `/${LOCALE_ROUTE}${to}`

    return navigate({
      ...rest,
      params: {
        locale: getPrefix(locale).localePrefix,
        ...(existingParams ?? {}),
      },
      to: localizedTo,
    })
  }

  return localizedNavigate
}
