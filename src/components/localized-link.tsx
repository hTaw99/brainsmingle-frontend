import type { FC } from 'react'

import { Link } from '@tanstack/react-router'
import type { LinkComponentProps } from '@tanstack/react-router'
import { getPrefix } from 'intlayer'
import { useLocale } from 'react-intlayer'

export const LOCALE_ROUTE = '{-$locale}' as const

export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T

export type To = RemoveLocaleParam<LinkComponentProps['to']>

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer Head}//${infer Tail}`
    ? CollapseDoubleSlashes<`${Head}/${Tail}`>
    : TString

type LocalizedLinkProps = {
  to?: To
} & Omit<LinkComponentProps, 'to'>

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer Head}${TSub}${infer Tail}`
  ? RemoveAll<`${Head}${Tail}`, TSub>
  : TString

type RemoveLocaleFromString<TPath extends string> = CollapseDoubleSlashes<
  RemoveAll<TPath, typeof LOCALE_ROUTE>
>

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale()
  const { localePrefix } = getPrefix(locale)

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props.params === 'object' ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps['to']}
    />
  )
}
