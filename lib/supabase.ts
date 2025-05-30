import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Types for our database schema
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          first_name: string
          last_name: string
          display_name: string | null
          avatar_url: string | null
          phone: string | null
          role: 'student' | 'teacher' | 'admin'
          permissions: Json
          status: 'active' | 'suspended' | 'inactive' | 'pending'
          created_by: string | null
          organization_id: string | null
          email_verified: boolean
          last_login_at: string | null
          password_reset_token: string | null
          password_reset_expires_at: string | null
          failed_login_attempts: number
          locked_until: string | null
          bio: string | null
          timezone: string
          language: string
          notification_preferences: Json
          student_data: Json | null
          teacher_data: Json | null
          admin_data: Json | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          first_name: string
          last_name: string
          display_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role: 'student' | 'teacher' | 'admin'
          permissions?: Json
          status?: 'active' | 'suspended' | 'inactive' | 'pending'
          created_by?: string | null
          organization_id?: string | null
          email_verified?: boolean
          last_login_at?: string | null
          password_reset_token?: string | null
          password_reset_expires_at?: string | null
          failed_login_attempts?: number
          locked_until?: string | null
          bio?: string | null
          timezone?: string
          language?: string
          notification_preferences?: Json
          student_data?: Json | null
          teacher_data?: Json | null
          admin_data?: Json | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          first_name?: string
          last_name?: string
          display_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'student' | 'teacher' | 'admin'
          permissions?: Json
          status?: 'active' | 'suspended' | 'inactive' | 'pending'
          created_by?: string | null
          organization_id?: string | null
          email_verified?: boolean
          last_login_at?: string | null
          password_reset_token?: string | null
          password_reset_expires_at?: string | null
          failed_login_attempts?: number
          locked_until?: string | null
          bio?: string | null
          timezone?: string
          language?: string
          notification_preferences?: Json
          student_data?: Json | null
          teacher_data?: Json | null
          admin_data?: Json | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parent_id: string | null
          sort_order: number
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          parent_id?: string | null
          sort_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          parent_id?: string | null
          sort_order?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string
          short_description: string | null
          description: string | null
          category_id: string | null
          start_date: string | null
          end_date: string | null
          enrollment_start_date: string | null
          enrollment_end_date: string | null
          format: string
          show_grades: boolean
          show_reports: boolean
          max_participants: number | null
          enrollment_method: string
          enrollment_key: string | null
          guest_access: boolean
          status: 'draft' | 'published' | 'archived' | 'hidden'
          is_featured: boolean
          price: number
          currency: string
          certificate_enabled: boolean
          completion_tracking: boolean
          language: string
          tags: string[]
          thumbnail_url: string | null
          organization_id: string | null
          created_by: string | null
          last_modified_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          short_description?: string | null
          description?: string | null
          category_id?: string | null
          start_date?: string | null
          end_date?: string | null
          enrollment_start_date?: string | null
          enrollment_end_date?: string | null
          format?: string
          show_grades?: boolean
          show_reports?: boolean
          max_participants?: number | null
          enrollment_method?: string
          enrollment_key?: string | null
          guest_access?: boolean
          status?: 'draft' | 'published' | 'archived' | 'hidden'
          is_featured?: boolean
          price?: number
          currency?: string
          certificate_enabled?: boolean
          completion_tracking?: boolean
          language?: string
          tags?: string[]
          thumbnail_url?: string | null
          organization_id?: string | null
          created_by?: string | null
          last_modified_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          short_description?: string | null
          description?: string | null
          category_id?: string | null
          start_date?: string | null
          end_date?: string | null
          enrollment_start_date?: string | null
          enrollment_end_date?: string | null
          format?: string
          show_grades?: boolean
          show_reports?: boolean
          max_participants?: number | null
          enrollment_method?: string
          enrollment_key?: string | null
          guest_access?: boolean
          status?: 'draft' | 'published' | 'archived' | 'hidden'
          is_featured?: boolean
          price?: number
          currency?: string
          certificate_enabled?: boolean
          completion_tracking?: boolean
          language?: string
          tags?: string[]
          thumbnail_url?: string | null
          organization_id?: string | null
          created_by?: string | null
          last_modified_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      course_sections: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          section_number: number
          is_visible: boolean
          start_date: string | null
          end_date: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          section_number: number
          is_visible?: boolean
          start_date?: string | null
          end_date?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          section_number?: number
          is_visible?: boolean
          start_date?: string | null
          end_date?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      course_enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          role: string
          status: 'active' | 'suspended' | 'completed' | 'dropped'
          enrolled_at: string
          last_accessed_at: string | null
          completion_date: string | null
          progress_percentage: number
          time_spent_minutes: number
          final_grade: number | null
          grade_letter: string | null
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          role?: string
          status?: 'active' | 'suspended' | 'completed' | 'dropped'
          enrolled_at?: string
          last_accessed_at?: string | null
          completion_date?: string | null
          progress_percentage?: number
          time_spent_minutes?: number
          final_grade?: number | null
          grade_letter?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          role?: string
          status?: 'active' | 'suspended' | 'completed' | 'dropped'
          enrolled_at?: string
          last_accessed_at?: string | null
          completion_date?: string | null
          progress_percentage?: number
          time_spent_minutes?: number
          final_grade?: number | null
          grade_letter?: string | null
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          domain: string | null
          subdomain: string | null
          logo_url: string | null
          settings: Json
          subscription_plan: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          domain?: string | null
          subdomain?: string | null
          logo_url?: string | null
          settings?: Json
          subscription_plan?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          domain?: string | null
          subdomain?: string | null
          logo_url?: string | null
          settings?: Json
          subscription_plan?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_sessions: {
        Row: {
          id: string
          user_id: string
          session_token: string
          device_info: Json | null
          ip_address: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_token: string
          device_info?: Json | null
          ip_address?: string | null
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_token?: string
          device_info?: Json | null
          ip_address?: string | null
          expires_at?: string
          created_at?: string
        }
      }
      user_invitations: {
        Row: {
          id: string
          email: string
          role: 'student' | 'teacher'
          invited_by: string
          organization_id: string | null
          invitation_token: string
          expires_at: string
          accepted_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          role: 'student' | 'teacher'
          invited_by: string
          organization_id?: string | null
          invitation_token: string
          expires_at: string
          accepted_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'student' | 'teacher'
          invited_by?: string
          organization_id?: string | null
          invitation_token?: string
          expires_at?: string
          accepted_at?: string | null
          created_at?: string
        }
      }
    }
  }
} 