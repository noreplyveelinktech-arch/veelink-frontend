import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import authApi from '../api/authApi'
import { TOKEN_KEY, USER_KEY } from '../utils/helpers'

const AdminAuthContext = createContext(null)

const extractAuthPayload = (payload = {}) => ({
  token: payload.token || payload.accessToken || payload.jwt || '',
  user: payload.user || payload.admin || payload.profile || null,
})

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || '')
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY)
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)))

  const persist = useCallback((nextToken, nextUser) => {
    if (nextToken) {
      localStorage.setItem(TOKEN_KEY, nextToken)
      setToken(nextToken)
    } else {
      localStorage.removeItem(TOKEN_KEY)
      setToken('')
    }

    if (nextUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
      setUser(nextUser)
    } else {
      localStorage.removeItem(USER_KEY)
      setUser(null)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // ignore logout failures and clear local state
    } finally {
      persist('', null)
    }
  }, [persist])

  const login = useCallback(
    async (credentials) => {
      const response = await authApi.login(credentials)
      const { token: nextToken, user: nextUser } = extractAuthPayload(response)

      persist(nextToken, nextUser)
      return nextUser
    },
    [persist],
  )

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    const restore = async () => {
      try {
        const profile = await authApi.me()
        const nextUser = profile.user || profile.admin || profile
        persist(token, nextUser)
      } catch {
        persist('', null)
      } finally {
        setLoading(false)
      }
    }

    restore()
  }, [persist, token])

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [login, logout, loading, token, user],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)

  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }

  return context
}
