"use client"
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { usePathname } from "next/navigation"
import Cookies from "js-cookie"

interface AuthContextType {
  token: string | null
  setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const storedToken = Cookies.get("token")
    if (storedToken) {
      setTokenState(storedToken)
    }
  }, [])

  useEffect(() => {
    if (pathname === "/login" || pathname === "/signup") {
      Cookies.remove("token")
      setTokenState(null)
    }
  }, [pathname])

  const setToken = (newToken: string | null) => {
    setTokenState(newToken)
    if (newToken) {
      Cookies.set("token", newToken, {expires: 1, sameSite: 'strict', secure: true})
    } else {
      Cookies.remove("token")
    }
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
