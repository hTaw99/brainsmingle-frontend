import logoSvg from '@/assets/logo.png'

import { Link, useRouteContext } from '@tanstack/react-router'

import { useLogout } from '@/api/auth/logout'

export function Header() {
  const { user } = useRouteContext({ from: '__root__' })
  const isLoggedIn = !!user

  const logout = useLogout()

  return (
    <>
      <header className="relative " data-tour="logo">
        <div className="flex items-center justify-between bg-theme-surface-primary mx-auto mt-4 rounded-lg p-4 min-h-[8vh] px-1 sm:px-2 md:px-4 z-20">
          <div className="flex items-center shrink-0 min-w-0">
            <Link to="/" className="shrink-0">
              <img
                src={logoSvg}
                alt="BrainsMingle logo"
                className="w-12 sm:w-16 md:w-20 lg:w-[90px]"
              />
            </Link>

            <span className="title hidden lg:inline ml-2 truncate">
              Where meaningful connections, partnerships and friendships happen
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto shrink-0">
            {isLoggedIn ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <Link to="/spaces">Spaces</Link>
          </div>
        </div>
      </header>
    </>
  )
}
