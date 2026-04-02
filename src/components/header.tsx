import logoSvg from '@/assets/logo.png'

import { rootRouteId, useRouteContext } from '@tanstack/react-router'
import { useIntlayer } from 'react-intlayer'

import { useLogout } from '@/api/auth/logout'
import { LocalizedLink } from '@/components/localized-link'
import { LocaleSwitcher } from '@/components/locale-switcher'

export function Header() {
  const { user } = useRouteContext({ from: rootRouteId })
  const isLoggedIn = !!user
  const content = useIntlayer('app')

  const logout = useLogout()

  return (
    <>
      <header
        className="relative bg-[#15171f] w-[60%] mb-8 rounded-lg mx-auto"
        data-tour="logo"
      >
        <div className="flex items-center w-full justify-between bg-theme-surface-primary mx-auto mt-4 rounded-lg p-4 min-h-[8vh] px-1 sm:px-2 md:px-4 z-20 gap-2">
          <div className="flex items-center shrink-0 min-w-0">
            <LocalizedLink to="/" className="shrink-0">
              <img
                src={logoSvg}
                alt="BrainsMingle logo"
                className="w-12 sm:w-16 md:w-20 lg:w-[90px]"
              />
            </LocalizedLink>
          </div>

          <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4 ms-auto shrink-0">
            <LocaleSwitcher />

            <LocalizedLink to="/spaces" className="text-sm cursor-pointer">
              {content.nav.spaces}
            </LocalizedLink>

            <LocalizedLink to="/community" className="text-sm cursor-pointer">
              {content.community.title}
            </LocalizedLink>

            {isLoggedIn && (
              <button
                type="button"
                className="text-sm cursor-pointer"
                onClick={logout}
              >
                {content.nav.logout}
              </button>
            )}

            {!isLoggedIn && (
              <LocalizedLink
                to="/login"
                className="px-4 py-1 bg-purple-600 text-white rounded-md transition-all cursor-pointer hover:bg-purple-600/90 ml-auto text-sm"
              >
                {content.nav.login}
              </LocalizedLink>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
