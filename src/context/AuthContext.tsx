import { createContext, useContext, useState, type ReactNode } from 'react'
import type { AuthUser } from '@/types'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const AUTH_KEY = 'pd_auth_token'
const TOKEN_VALUE = 'fake-jwt-token-prodexa'

function getStoredUser(): AuthUser | null {
  try {
    const token = localStorage.getItem(AUTH_KEY)
    if (token === TOKEN_VALUE) {
      const email = localStorage.getItem('pd_auth_email') ?? 'demo@prodexa.dev'
      return { email, name: email.split('@')[0] }
    }
  } catch {
    // localStorage unavailable
  }
  return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser)

  async function login(email: string, _password: string): Promise<void> {
    if (!email.trim()) throw new Error('Email is required')
    await new Promise((r) => setTimeout(r, 600))
    localStorage.setItem(AUTH_KEY, TOKEN_VALUE)
    localStorage.setItem('pd_auth_email', email)
    const name = email.split('@')[0]
    setUser({ email, name })
  }

  function logout(): void {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem('pd_auth_email')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
