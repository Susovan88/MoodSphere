"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

type AuthUser = {
  id: string
  name: string
  email: string
  phone?: string
}

type LoginPayload = {
  email: string
  password: string
}

type SignupPayload = {
  name: string
  email: string
  phone: string
  password: string
}

type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  loading: boolean
  login: (payload: LoginPayload) => Promise<void>
  signup: (payload: SignupPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || "http://localhost:5005"

const TOKEN_KEY = "moodsphere.token"
const USER_KEY = "moodsphere.user"

async function requestJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data?.message || "Request failed")
  }
  return data as T
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(TOKEN_KEY)
  })

  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null
    const savedUser = localStorage.getItem(USER_KEY)
    if (!savedUser) return null

    try {
      return JSON.parse(savedUser) as AuthUser
    } catch {
      localStorage.removeItem(USER_KEY)
      return null
    }
  })

  const loading = false

  const setSession = useCallback((nextToken: string, nextUser: AuthUser) => {
    setToken(nextToken)
    setUser(nextUser)
    localStorage.setItem(TOKEN_KEY, nextToken)
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
  }, [])

  const login = useCallback(
    async (payload: LoginPayload) => {
      const data = await requestJSON<{
        token: string
        user: AuthUser
      }>("/api/student/login", {
        method: "POST",
        body: JSON.stringify(payload),
      })

      setSession(data.token, data.user)
    },
    [setSession]
  )

  const signup = useCallback(
    async (payload: SignupPayload) => {
      const data = await requestJSON<{
        token: string
        user: AuthUser
      }>("/api/student/signup", {
        method: "POST",
        body: JSON.stringify(payload),
      })

      console.log("Signup response received:", data)
      setSession(data.token, data.user)
    },
    [setSession]
  )

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }, [])

  const value = useMemo(
    () => ({ user, token, loading, login, signup, logout }),
    [user, token, loading, login, signup, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}
