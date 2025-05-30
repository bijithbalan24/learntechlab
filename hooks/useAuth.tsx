'use client'

import { useState, useEffect, useContext, createContext, ReactNode } from 'react'
import { authService, AuthUser, LoginCredentials } from '@/lib/auth-service'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<{ success: boolean; error?: string }>
  updateProfile: (updates: any) => Promise<{ success: boolean; error?: string }>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        console.error('Auth initialization error:', err)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await authService.login(credentials)
      
      if (result.success && result.user) {
        setUser(result.user)
        return { success: true }
      } else {
        setError(result.error || 'Login failed')
        return { success: false, error: result.error }
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await authService.logout()
      
      if (result.success) {
        setUser(null)
        return { success: true }
      } else {
        setError(result.error || 'Logout failed')
        return { success: false, error: result.error }
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: any) => {
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    setError(null)
    
    try {
      const result = await authService.updateProfile(user.id, updates)
      
      if (result.success) {
        // Refresh user data
        const updatedUser = await authService.getCurrentUser()
        setUser(updatedUser)
        return { success: true }
      } else {
        setError(result.error || 'Update failed')
        return { success: false, error: result.error }
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        login, 
        logout, 
        updateProfile, 
        clearError 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Role-based access hooks
export function useRequireAuth(requiredRole?: 'student' | 'teacher' | 'admin') {
  const { user, loading } = useAuth()
  
  const hasAccess = !requiredRole || user?.role === requiredRole
  const isAuthenticated = !!user
  
  return {
    user,
    loading,
    isAuthenticated,
    hasAccess,
    isAdmin: user?.role === 'admin',
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student'
  }
}

export function useAdminOnly() {
  return useRequireAuth('admin')
}

export function useTeacherOnly() {
  return useRequireAuth('teacher')
}

export function useStudentOnly() {
  return useRequireAuth('student')
} 