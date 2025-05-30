'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { authService, type AuthUser, type LoginCredentials } from '@/lib/auth-service'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; user?: AuthUser; error?: string }>
  logout: () => Promise<void>
  updateProfile: (updates: any) => Promise<boolean>
  hasRole: (role: 'student' | 'teacher' | 'admin') => boolean
  isAdmin: () => boolean
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadCurrentUser()
  }, [])

  const loadCurrentUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Load current user error:', error)
    }
  }

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; user?: AuthUser; error?: string }> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await authService.login(credentials)
      
      if (result.success && result.user) {
        setUser(result.user)
        setError(null)
        return { success: true, user: result.user }
      } else {
        setError(result.error || 'Login failed')
        return { success: false, error: result.error }
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
      setError(null)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: any): Promise<boolean> => {
    if (!user) return false
    
    try {
      const result = await authService.updateProfile(user.id, updates)
      if (result.success) {
        // Reload user data
        await loadCurrentUser()
        return true
      }
      return false
    } catch (error) {
      console.error('Update profile error:', error)
      return false
    }
  }

  const hasRole = (role: 'student' | 'teacher' | 'admin'): boolean => {
    return user?.role === role
  }

  const isAdmin = (): boolean => {
    return user?.role === 'admin'
  }

  const clearError = () => {
    setError(null)
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    hasRole,
    isAdmin,
    clearError
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useStudentOnly() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) {
      router.push('/login?role=student')
    }
  }, [user, loading, router])

  return { user, loading, authorized: user?.role === 'student' }
}

export function useTeacherOnly() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== 'teacher')) {
      router.push('/login?role=teacher')
    }
  }, [user, loading, router])

  return { user, loading, authorized: user?.role === 'teacher' }
}

export function useAdminOnly() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login?role=admin')
    }
  }, [user, loading, router])

  return { user, loading, authorized: user?.role === 'admin' }
} 