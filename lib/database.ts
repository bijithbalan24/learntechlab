import { supabase } from './supabase'
import { Database } from './supabase'
import bcrypt from 'bcryptjs'

type User = Database['public']['Tables']['users']['Row']
type UserInsert = Database['public']['Tables']['users']['Insert']
type UserUpdate = Database['public']['Tables']['users']['Update']
type Organization = Database['public']['Tables']['organizations']['Row']
type UserInvitation = Database['public']['Tables']['user_invitations']['Row']

export class DatabaseService {
  // =====================================================
  // AUTHENTICATION
  // =====================================================
  
  static async authenticateUser(email: string, password: string) {
    try {
      // Get user by email
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('status', 'active')
        .is('deleted_at', null)
        .single()

      if (error || !user) {
        return { success: false, error: 'Invalid credentials' }
      }

      // Check if account is locked
      if (user.locked_until && new Date(user.locked_until) > new Date()) {
        return { success: false, error: 'Account is temporarily locked' }
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password_hash)
      
      if (!passwordMatch) {
        // Increment failed attempts
        await this.incrementFailedAttempts(user.id)
        return { success: false, error: 'Invalid credentials' }
      }

      // Reset failed attempts and update last login
      await supabase
        .from('users')
        .update({
          failed_login_attempts: 0,
          locked_until: null,
          last_login_at: new Date().toISOString()
        })
        .eq('id', user.id)

      return { success: true, user }
    } catch (error) {
      console.error('Authentication error:', error)
      return { success: false, error: 'Authentication failed' }
    }
  }

  static async incrementFailedAttempts(userId: string) {
    const { data: user } = await supabase
      .from('users')
      .select('failed_login_attempts')
      .eq('id', userId)
      .single()

    const attempts = (user?.failed_login_attempts || 0) + 1
    const lockUntil = attempts >= 5 
      ? new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
      : null

    await supabase
      .from('users')
      .update({
        failed_login_attempts: attempts,
        locked_until: lockUntil
      })
      .eq('id', userId)
  }

  // =====================================================
  // USER MANAGEMENT
  // =====================================================

  static async createUser(userData: UserInsert, createdBy: string) {
    try {
      // Hash password
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(userData.password_hash, saltRounds)

      const { data, error } = await supabase
        .from('users')
        .insert({
          ...userData,
          password_hash: hashedPassword,
          created_by: createdBy
        })
        .select()
        .single()

      if (error) throw error
      return { success: true, user: data }
    } catch (error) {
      console.error('Create user error:', error)
      return { success: false, error: 'Failed to create user' }
    }
  }

  static async updateUser(userId: string, updates: UserUpdate) {
    try {
      // If password is being updated, hash it
      if (updates.password_hash) {
        const saltRounds = 12
        updates.password_hash = await bcrypt.hash(updates.password_hash, saltRounds)
      }

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return { success: true, user: data }
    } catch (error) {
      console.error('Update user error:', error)
      return { success: false, error: 'Failed to update user' }
    }
  }

  static async getUserById(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .is('deleted_at', null)
        .single()

      if (error) throw error
      return { success: true, user: data }
    } catch (error) {
      return { success: false, error: 'User not found' }
    }
  }

  static async getUsersByOrganization(organizationId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('organization_id', organizationId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { success: true, users: data }
    } catch (error) {
      return { success: false, error: 'Failed to fetch users' }
    }
  }

  static async suspendUser(userId: string) {
    return this.updateUser(userId, { status: 'suspended' })
  }

  static async activateUser(userId: string) {
    return this.updateUser(userId, { status: 'active' })
  }

  static async softDeleteUser(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error

      // Also invalidate all sessions
      await supabase
        .from('user_sessions')
        .delete()
        .eq('user_id', userId)

      return { success: true, user: data }
    } catch (error) {
      return { success: false, error: 'Failed to delete user' }
    }
  }

  // =====================================================
  // INVITATIONS
  // =====================================================

  static async createInvitation(
    email: string,
    role: 'student' | 'teacher',
    invitedBy: string,
    organizationId: string
  ) {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single()

      if (existingUser) {
        return { success: false, error: 'User with this email already exists' }
      }

      // Generate invitation token
      const { data: tokenData } = await supabase.rpc('generate_invitation_token')
      const invitationToken = tokenData

      const { data, error } = await supabase
        .from('user_invitations')
        .insert({
          email,
          role,
          invited_by: invitedBy,
          organization_id: organizationId,
          invitation_token: invitationToken,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        })
        .select()
        .single()

      if (error) throw error
      return { success: true, invitation: data }
    } catch (error) {
      console.error('Create invitation error:', error)
      return { success: false, error: 'Failed to create invitation' }
    }
  }

  static async getInvitationByToken(token: string) {
    try {
      const { data, error } = await supabase
        .from('user_invitations')
        .select('*')
        .eq('invitation_token', token)
        .is('accepted_at', null)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (error) throw error
      return { success: true, invitation: data }
    } catch (error) {
      return { success: false, error: 'Invalid or expired invitation' }
    }
  }

  static async acceptInvitation(token: string, password: string) {
    try {
      const invitationResult = await this.getInvitationByToken(token)
      if (!invitationResult.success || !invitationResult.invitation) {
        return { success: false, error: 'Invalid invitation' }
      }

      const invitation = invitationResult.invitation

      // Create user account
      const userResult = await this.createUser({
        email: invitation.email,
        password_hash: password,
        first_name: '', // Will be updated by user
        last_name: '',
        role: invitation.role,
        organization_id: invitation.organization_id!,
        status: 'active',
        email_verified: true
      }, invitation.invited_by)

      if (!userResult.success) {
        return userResult
      }

      // Mark invitation as accepted
      await supabase
        .from('user_invitations')
        .update({ accepted_at: new Date().toISOString() })
        .eq('invitation_token', token)

      return { success: true, user: userResult.user }
    } catch (error) {
      return { success: false, error: 'Failed to accept invitation' }
    }
  }

  // =====================================================
  // SESSIONS
  // =====================================================

  static async createSession(userId: string, deviceInfo?: any, ipAddress?: string) {
    try {
      const { data: tokenData } = await supabase.rpc('generate_session_token')
      const sessionToken = tokenData

      const { data, error } = await supabase
        .from('user_sessions')
        .insert({
          user_id: userId,
          session_token: sessionToken,
          device_info: deviceInfo,
          ip_address: ipAddress,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        })
        .select()
        .single()

      if (error) throw error
      return { success: true, session: data }
    } catch (error) {
      return { success: false, error: 'Failed to create session' }
    }
  }

  static async validateSession(sessionToken: string) {
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .select(`
          *,
          users (
            id, email, first_name, last_name, role, 
            organization_id, status, avatar_url
          )
        `)
        .eq('session_token', sessionToken)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (error) throw error
      return { success: true, session: data }
    } catch (error) {
      return { success: false, error: 'Invalid session' }
    }
  }

  static async deleteSession(sessionToken: string) {
    try {
      await supabase
        .from('user_sessions')
        .delete()
        .eq('session_token', sessionToken)

      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to delete session' }
    }
  }

  // =====================================================
  // ORGANIZATIONS
  // =====================================================

  static async getOrganization(organizationId: string) {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', organizationId)
        .single()

      if (error) throw error
      return { success: true, organization: data }
    } catch (error) {
      return { success: false, error: 'Organization not found' }
    }
  }

  // =====================================================
  // UTILITY FUNCTIONS
  // =====================================================

  static async cleanupExpiredSessions() {
    try {
      await supabase.rpc('cleanup_expired_sessions')
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to cleanup sessions' }
    }
  }

  static async cleanupExpiredInvitations() {
    try {
      await supabase.rpc('cleanup_expired_invitations')
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to cleanup invitations' }
    }
  }
} 