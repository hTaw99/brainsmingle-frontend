import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/constants/auth'
import { getAuthCookieOptions } from '@/lib/get-auth-cookie-options'
import { QUERY_KEYS } from '@/constants/query-keys'

export const refreshToken = createServerFn().handler(async () => {
  const existingRefreshToken = getCookie(REFRESH_TOKEN_NAME)
  if (!existingRefreshToken) return null

  try {
    // const res = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ refreshToken: existingRefreshToken }),
    // })
    // if (!res.ok) return null

    // const data: { accessToken: string } = await res.json()
    // if (!data.accessToken) return null

    const { accessCookieOptions } = getAuthCookieOptions()

    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTUwMSwiZmlyc3ROYW1lIjoiSGFkeSIsImxhc3ROYW1lIjoiVGF3ZmlrIiwidXNlcm5hbWUiOiJoYWR5NDYzMCIsImVtYWlsIjoiaGFkeS50YXdmaWtAYmFzaGFyc29mdC5jb20iLCJjb3VudHJ5IjoiRWd5cHQiLCJub3RpZmljYXRpb25FbWFpbCI6ImhhZHkudGF3ZmlrQGJhc2hhcnNvZnQuY29tIiwidGl0bGUiOiJGcm9udGVuZCIsImNvbXBhbnkiOiJXVVpaVUYiLCJiaW8iOm51bGwsIndlYnNpdGUiOm51bGwsInR3aXR0ZXIiOm51bGwsInN0YXR1cyI6ImFjdGl2ZSIsInVzZXJQcm92aWRlcklEIjoiMTAxNzM4MTE1NTkwNDM5MjU2MzU2IiwibGlua2VkaW5VcmwiOm51bGwsInBpY3R1cmVVcmwiOiJodHRwczovL21lZGlhLmJyYWluc21pbmdsZS5jb20vNTUwMS9kM2I5Y2YzYi02ZWMyLTQ5MTAtOTllMS0wMzUwNzIzZTdhMTgucG5nIiwiaW52aXRlQ29kZSI6ImhhZHk0MTgwIiwic2lnbnVwUHJvdmlkZXIiOiJnb29nbGUiLCJwbGFuIjp7InBsYW5JRCI6MSwibWF4TWlucyI6NjAsIm1heENhcGFjaXR5IjoxMDAsIm5hbWUiOiJGcmVlIiwiZmVhdHVyZXMiOlsiaW50cm9fcm9vbSJdLCJwbGF0Zm9ybUZlZXNQZXJjZW50YWdlIjoyMH0sImpvYlN0YXR1cyI6Im5vIiwiZGlzcGxheUpvYlN0YXR1cyI6MSwib25ib2FyZGluZ0NvbXBsZXRlZCI6MSwicHJvZmlsZU9uYm9hcmRpbmdDb21wbGV0ZWQiOjEsImlzVmVyaWZpZWQiOjEsImlhdCI6MTc3NTAxNzA3NCwiZXhwIjoxNzgwMjAxMDc0fQ.gC1ok7KSF8M5GR82GXS55jQi2EwqdXiIOMQy4jgGLyE'

    setCookie(ACCESS_TOKEN_NAME, accessToken, accessCookieOptions)

    return accessToken
  } catch {
    return null
  }
})

export const refreshTokenQueryOptions = () => {
  return {
    queryKey: QUERY_KEYS.refreshToken,
    queryFn: refreshToken,
  }
}
