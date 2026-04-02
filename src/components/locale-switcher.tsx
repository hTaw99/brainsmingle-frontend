import { useLocation } from '@tanstack/react-router'
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
} from 'intlayer'
import type { FC } from 'react'
import { useLocale } from 'react-intlayer'

import { LocalizedLink } from '@/components/localized-link'
import type { To } from '@/components/localized-link'

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation()
  const { availableLocales, locale, setLocale } = useLocale()
  const pathWithoutLocale = getPathWithoutLocale(pathname)

  return (
    <ol className="flex flex-wrap gap-2 border border-white/10 rounded-md p-2 text-sm">
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? 'page' : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            search={(prev) => prev}
            to={pathWithoutLocale as To}
            className="underline-offset-4 hover:underline"
          >
            <span className="sr-only">{localeEl}</span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {getLocaleName(localeEl, locale)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  )
}
