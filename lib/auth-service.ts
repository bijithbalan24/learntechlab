'use client'

export interface LoginCredentials {
  email: string
  password: string
  role: 'student' | 'teacher' | 'admin'
}

export interface AuthUser {
  id: string
  email: string
  role: 'student' | 'teacher' | 'admin'
  organization_id: string
  organization_name?: string
  first_name: string
  last_name: string
  status: 'active' | 'inactive' | 'suspended'
  student_data?: any
  teacher_data?: any
  admin_data?: any
}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: string | null
}

// Mock user data for development
const mockUsers: Record<string, AuthUser> = {
  'admin@learntechlab.com': {
    id: '550e8400-e29b-41d4-a716-446655440011',
    email: 'admin@learntechlab.com',
    role: 'admin',
    organization_id: '550e8400-e29b-41d4-a716-446655440010',
    organization_name: 'LearnTechLab',
    first_name: 'Admin',
    last_name: 'User',
    status: 'active',
    admin_data: {
      permissions: ['all'],
      created_courses: 0,
      managed_users: 50
    }
  },
  'teacher@learntechlab.com': {
    id: '550e8400-e29b-41d4-a716-446655440012',
    email: 'teacher@learntechlab.com',
    role: 'teacher',
    organization_id: '550e8400-e29b-41d4-a716-446655440010',
    organization_name: 'LearnTechLab',
    first_name: 'Sarah',
    last_name: 'Wilson',
    status: 'active',
    teacher_data: {
      specializations: ['AI/Machine Learning', 'Data Science'],
      experience_years: 10,
      courses_created: 5,
      students_taught: 150,
      average_rating: 4.8
    }
  },
  'student@learntechlab.com': {
    id: '550e8400-e29b-41d4-a716-446655440013',
    email: 'student@learntechlab.com',
    role: 'student',
    organization_id: '550e8400-e29b-41d4-a716-446655440010',
    organization_name: 'LearnTechLab',
    first_name: 'John',
    last_name: 'Smith',
    status: 'active',
    student_data: {
      enrollment_date: '2024-01-15',
      level: 'intermediate',
      completed_courses: 3,
      total_hours: 45,
      certificates_earned: 2
    }
  }
}

class AuthService {
  private currentUser: AuthUser | null = null
  private authListeners: ((user: AuthUser | null) => void)[] = []

  /**
   * Login user with email, password, and role
   */
  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user exists in mock data
      const user = mockUsers[credentials.email.toLowerCase()]
      
      if (!user) {
        return { success: false, error: 'Invalid email or password' }
      }

      // Check role matches
      if (user.role !== credentials.role) {
        return { success: false, error: 'Invalid role for this login type' }
      }

      // Check if user is active
      if (user.status !== 'active') {
        return { success: false, error: 'Account is not active. Please contact administrator.' }
      }

      // For demo purposes, accept any password
      // In production, you would validate against hashed password
      
      this.currentUser = user
      this.notifyListeners(user)
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_user', JSON.stringify(user))

      return { success: true, user }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<{ success: boolean; error?: string }> {
    try {
      this.currentUser = null
      this.notifyListeners(null)
      localStorage.removeItem('auth_user')
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      if (this.currentUser) {
        return this.currentUser
      }

      // Try to load from localStorage
      const stored = localStorage.getItem('auth_user')
      if (stored) {
        const user = JSON.parse(stored) as AuthUser
        this.currentUser = user
        return user
      }

      return null
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  }

  /**
   * Check if user has specific role
   */
  async hasRole(role: 'student' | 'teacher' | 'admin'): Promise<boolean> {
    const user = await this.getCurrentUser()
    return user?.role === role
  }

  /**
   * Check if user is admin
   */
  async isAdmin(): Promise<boolean> {
    return this.hasRole('admin')
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: {
    first_name?: string
    last_name?: string
    student_data?: any
    teacher_data?: any
  }): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.currentUser && this.currentUser.id === userId) {
        this.currentUser = { ...this.currentUser, ...updates }
        localStorage.setItem('auth_user', JSON.stringify(this.currentUser))
        this.notifyListeners(this.currentUser)
      }
      return { success: true }
    } catch (error) {
      console.error('Update profile error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  /**
   * Password reset (mock implementation)
   */
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const user = mockUsers[email.toLowerCase()]
      if (!user) {
        return { success: false, error: 'No account found with this email address' }
      }

      // In a real implementation, you would send a reset email
      console.log(`Password reset email sent to ${email}`)
      return { success: true }
    } catch (error) {
      console.error('Reset password error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange(callback: (user: AuthUser | null) => void): { data: { subscription: { unsubscribe: () => void } } } {
    this.authListeners.push(callback)
    
    // Immediately call with current user
    callback(this.currentUser)
    
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            const index = this.authListeners.indexOf(callback)
            if (index > -1) {
              this.authListeners.splice(index, 1)
            }
          }
        }
      }
    }
  }

  /**
   * Notify all listeners of auth state change
   */
  private notifyListeners(user: AuthUser | null) {
    this.authListeners.forEach(listener => listener(user))
  }

  /**
   * Get demo account credentials
   */
  getDemoCredentials() {
    return {
      admin: { email: 'admin@learntechlab.com', password: 'demo123', role: 'admin' as const },
      teacher: { email: 'teacher@learntechlab.com', password: 'demo123', role: 'teacher' as const },
      student: { email: 'student@learntechlab.com', password: 'demo123', role: 'student' as const }
    }
  }
}

export const authService = new AuthService()
export { AuthService } 