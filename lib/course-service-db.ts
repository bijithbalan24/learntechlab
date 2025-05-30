'use client'

import { supabase } from './supabase'
import type { Database } from './supabase'

// =====================================================
// TYPES & INTERFACES
// =====================================================

export interface CourseCategory {
  id: string
  name: string
  slug: string
  description?: string
  parent_id?: string
  sort_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  slug: string
  short_description?: string
  description?: string
  category_id?: string
  start_date?: string
  end_date?: string
  enrollment_start_date?: string
  enrollment_end_date?: string
  format: 'topics' | 'weeks' | 'social'
  show_grades: boolean
  show_reports: boolean
  max_participants?: number
  enrollment_method: 'manual' | 'self' | 'guest'
  enrollment_key?: string
  guest_access: boolean
  status: 'draft' | 'published' | 'archived' | 'hidden'
  is_featured: boolean
  price: number
  currency: string
  certificate_enabled: boolean
  completion_tracking: boolean
  language: string
  tags: string[]
  thumbnail_url?: string
  organization_id: string
  created_by: string
  last_modified_by?: string
  created_at: string
  updated_at: string
}

export interface CourseSection {
  id: string
  course_id: string
  title: string
  description?: string
  section_number: number
  is_visible: boolean
  start_date?: string
  end_date?: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CourseEnrollment {
  id: string
  user_id: string
  course_id: string
  role: 'student' | 'teacher' | 'moderator'
  status: 'active' | 'suspended' | 'completed' | 'dropped'
  enrolled_at: string
  last_accessed_at?: string
  completion_date?: string
  progress_percentage: number
  time_spent_minutes: number
  final_grade?: number
  grade_letter?: string
}

// =====================================================
// DATABASE COURSE SERVICE
// =====================================================

class DatabaseCourseService {
  // =====================================================
  // CATEGORIES MANAGEMENT
  // =====================================================

  async getCategories(): Promise<{ success: boolean; categories?: CourseCategory[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true })

      if (error) {
        console.error('Get categories error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, categories: data as CourseCategory[] }
    } catch (error) {
      console.error('Get categories error:', error)
      return { success: false, error: 'Failed to fetch categories' }
    }
  }

  async createCategory(data: {
    name: string
    slug: string
    description?: string
    parent_id?: string
    sort_order?: number
  }): Promise<{ success: boolean; category?: CourseCategory; error?: string }> {
    try {
      const { data: category, error } = await supabase
        .from('categories')
        .insert({
          name: data.name,
          slug: data.slug,
          description: data.description,
          parent_id: data.parent_id,
          sort_order: data.sort_order || 0,
          is_visible: true
        })
        .select()
        .single()

      if (error) {
        console.error('Create category error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, category: category as CourseCategory }
    } catch (error) {
      console.error('Create category error:', error)
      return { success: false, error: 'Failed to create category' }
    }
  }

  // =====================================================
  // COURSES MANAGEMENT
  // =====================================================

  async createCourse(data: {
    title: string
    slug: string
    short_description?: string
    description?: string
    category_id?: string
    organization_id: string
    created_by: string
    format?: string
    price?: number
    enrollment_method?: string
    tags?: string[]
  }): Promise<{ success: boolean; course?: Course; error?: string }> {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      console.log('Environment check:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
        urlPrefix: supabaseUrl?.substring(0, 20) + '...',
        keyPrefix: supabaseKey?.substring(0, 20) + '...'
      })

      if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase environment variables not found, falling back to localStorage')
        // Fallback to localStorage-based storage
        const courseId = `course-${Date.now()}`
        const course: Course = {
          id: courseId,
          title: data.title,
          slug: data.slug,
          short_description: data.short_description,
          description: data.description,
          category_id: data.category_id,
          organization_id: data.organization_id,
          created_by: data.created_by,
          format: (data.format || 'topics') as 'topics' | 'weeks' | 'social',
          price: data.price || 0,
          enrollment_method: (data.enrollment_method || 'manual') as 'manual' | 'self' | 'guest',
          tags: data.tags || [],
          status: 'draft',
          show_grades: true,
          show_reports: true,
          guest_access: false,
          is_featured: false,
          currency: 'USD',
          certificate_enabled: false,
          completion_tracking: true,
          language: 'en',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        // Store in localStorage as fallback
        const existingCourses = JSON.parse(localStorage.getItem('courses') || '[]')
        existingCourses.push(course)
        localStorage.setItem('courses', JSON.stringify(existingCourses))
        
        return { success: true, course }
      }

      // Test basic connection first
      console.log('Testing Supabase connection...')
      try {
        const { data: connectionTest, error: connectionError } = await supabase
          .from('categories')
          .select('count')
          .limit(1)
        
        if (connectionError) {
          console.error('Supabase connection test failed:', connectionError)
          return { success: false, error: `Connection failed: ${connectionError.message}` }
        }
        console.log('Supabase connection successful')
      } catch (connErr) {
        console.error('Supabase connection exception:', connErr)
        return { success: false, error: 'Could not connect to database' }
      }

      const insertData = {
        title: data.title,
        slug: data.slug,
        short_description: data.short_description,
        description: data.description,
        category_id: data.category_id,
        organization_id: data.organization_id,
        created_by: data.created_by,
        format: data.format || 'topics',
        price: data.price || 0,
        enrollment_method: data.enrollment_method || 'manual',
        tags: data.tags || [],
        status: 'draft',
        show_grades: true,
        show_reports: true,
        guest_access: false,
        is_featured: false,
        currency: 'USD',
        certificate_enabled: false,
        completion_tracking: true,
        language: 'en'
      }

      // Validate required fields
      if (!insertData.title || !insertData.slug) {
        return { success: false, error: 'Title and slug are required' }
      }

      // Validate UUID formats
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      
      if (insertData.category_id && !uuidRegex.test(insertData.category_id)) {
        return { success: false, error: `Invalid category_id UUID format: ${insertData.category_id}` }
      }
      
      if (!uuidRegex.test(insertData.organization_id)) {
        return { success: false, error: `Invalid organization_id UUID format: ${insertData.organization_id}` }
      }
      
      if (!uuidRegex.test(insertData.created_by)) {
        return { success: false, error: `Invalid created_by UUID format: ${insertData.created_by}` }
      }

      console.log('Creating course with data:', insertData)

      const { data: course, error } = await supabase
        .from('courses')
        .insert(insertData)
        .select()
        .single()

      if (error) {
        console.error('Create course error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          fullError: JSON.stringify(error, null, 2)
        })
        
        console.error('Data that was sent:', JSON.stringify(insertData, null, 2))
        
        // Check for specific error types
        if (error.code === '23505') {
          return { success: false, error: 'A course with this slug already exists' }
        }
        if (error.code === '23503') {
          return { success: false, error: 'Invalid reference: Check if category_id, organization_id, or created_by exists' }
        }
        if (error.code === 'PGRST301') {
          return { success: false, error: 'Row Level Security policy violation. Check if user has permission to insert courses.' }
        }
        if (error.code === '22P02') {
          return { success: false, error: 'Invalid UUID format in one of the fields' }
        }
        
        return { success: false, error: error.message || `Database error (${error.code || 'unknown'})` }
      }

      if (!course) {
        console.error('No course returned from database')
        return { success: false, error: 'No data returned from database' }
      }

      console.log('Course created successfully:', course.id)
      return { success: true, course: course as Course }
    } catch (error) {
      console.error('Create course exception:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Failed to create course' }
    }
  }

  async getCourse(courseId: string): Promise<{ success: boolean; course?: Course; error?: string }> {
    try {
      const { data: course, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single()

      if (error) {
        console.error('Get course error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, course: course as Course }
    } catch (error) {
      console.error('Get course error:', error)
      return { success: false, error: 'Failed to fetch course' }
    }
  }

  async getCourses(filters?: {
    category_id?: string
    status?: string
    organization_id?: string
    limit?: number
    offset?: number
  }): Promise<{ success: boolean; courses?: Course[]; count?: number; error?: string }> {
    try {
      // Check if Supabase is properly configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn('Supabase environment variables not found, using localStorage fallback')
        
        // Get courses from localStorage
        const courses: Course[] = JSON.parse(localStorage.getItem('courses') || '[]')
        let filteredCourses = courses

        // Apply filters
        if (filters?.category_id) {
          filteredCourses = filteredCourses.filter(course => course.category_id === filters.category_id)
        }
        if (filters?.status) {
          filteredCourses = filteredCourses.filter(course => course.status === filters.status)
        }
        if (filters?.organization_id) {
          filteredCourses = filteredCourses.filter(course => course.organization_id === filters.organization_id)
        }

        // Apply pagination
        let paginatedCourses = filteredCourses
        if (filters?.offset !== undefined && filters?.limit !== undefined) {
          paginatedCourses = filteredCourses.slice(filters.offset, filters.offset + filters.limit)
        } else if (filters?.limit) {
          paginatedCourses = filteredCourses.slice(0, filters.limit)
        }

        return { success: true, courses: paginatedCourses, count: filteredCourses.length }
      }

      let query = supabase.from('courses').select('*', { count: 'exact' })

      if (filters?.category_id) {
        query = query.eq('category_id', filters.category_id)
      }
      if (filters?.status) {
        query = query.eq('status', filters.status)
      }
      if (filters?.organization_id) {
        query = query.eq('organization_id', filters.organization_id)
      }

      // Sort by creation date (newest first)
      query = query.order('created_at', { ascending: false })

      // Apply pagination
      if (filters?.offset !== undefined && filters?.limit !== undefined) {
        query = query.range(filters.offset, filters.offset + filters.limit - 1)
      } else if (filters?.limit) {
        query = query.limit(filters.limit)
      }

      const { data: courses, error, count } = await query

      if (error) {
        console.error('Get courses error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, courses: courses as Course[], count: count || 0 }
    } catch (error) {
      console.error('Get courses error:', error)
      return { success: false, error: 'Failed to fetch courses' }
    }
  }

  async updateCourse(courseId: string, updates: Partial<Course>): Promise<{ success: boolean; course?: Course; error?: string }> {
    try {
      const { data: course, error } = await supabase
        .from('courses')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId)
        .select()
        .single()

      if (error) {
        console.error('Update course error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, course: course as Course }
    } catch (error) {
      console.error('Update course error:', error)
      return { success: false, error: 'Failed to update course' }
    }
  }

  async publishCourse(courseId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await this.updateCourse(courseId, { status: 'published' })
      return { success: result.success, error: result.error }
    } catch (error) {
      console.error('Publish course error:', error)
      return { success: false, error: 'Failed to publish course' }
    }
  }

  async deleteCourse(courseId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId)

      if (error) {
        console.error('Delete course error:', error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error('Delete course error:', error)
      return { success: false, error: 'Failed to delete course' }
    }
  }

  // =====================================================
  // COURSE SECTIONS MANAGEMENT
  // =====================================================

  async createSection(data: {
    course_id: string
    title: string
    description?: string
    section_number: number
  }): Promise<{ success: boolean; section?: CourseSection; error?: string }> {
    try {
      const { data: section, error } = await supabase
        .from('course_sections')
        .insert({
          course_id: data.course_id,
          title: data.title,
          description: data.description,
          section_number: data.section_number,
          sort_order: data.section_number,
          is_visible: true
        })
        .select()
        .single()

      if (error) {
        console.error('Create section error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, section: section as CourseSection }
    } catch (error) {
      console.error('Create section error:', error)
      return { success: false, error: 'Failed to create section' }
    }
  }

  async getCourseSections(courseId: string): Promise<{ success: boolean; sections?: CourseSection[]; error?: string }> {
    try {
      const { data: sections, error } = await supabase
        .from('course_sections')
        .select('*')
        .eq('course_id', courseId)
        .eq('is_visible', true)
        .order('sort_order', { ascending: true })

      if (error) {
        console.error('Get course sections error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, sections: sections as CourseSection[] }
    } catch (error) {
      console.error('Get course sections error:', error)
      return { success: false, error: 'Failed to fetch course sections' }
    }
  }

  // =====================================================
  // ENROLLMENT MANAGEMENT
  // =====================================================

  async enrollUser(data: {
    user_id: string
    course_id: string
    role?: string
  }): Promise<{ success: boolean; enrollment?: CourseEnrollment; error?: string }> {
    try {
      // Check if user is already enrolled
      const { data: existingEnrollment } = await supabase
        .from('course_enrollments')
        .select('id')
        .eq('user_id', data.user_id)
        .eq('course_id', data.course_id)
        .single()

      if (existingEnrollment) {
        return { success: false, error: 'User is already enrolled in this course' }
      }

      const { data: enrollment, error } = await supabase
        .from('course_enrollments')
        .insert({
          user_id: data.user_id,
          course_id: data.course_id,
          role: data.role || 'student',
          status: 'active',
          progress_percentage: 0,
          time_spent_minutes: 0
        })
        .select()
        .single()

      if (error) {
        console.error('Enroll user error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, enrollment: enrollment as CourseEnrollment }
    } catch (error) {
      console.error('Enroll user error:', error)
      return { success: false, error: 'Failed to enroll user' }
    }
  }

  async getUserEnrollments(userId: string): Promise<{ success: boolean; enrollments?: any[]; error?: string }> {
    try {
      const { data: enrollments, error } = await supabase
        .from('course_enrollments')
        .select(`
          *,
          course:courses(*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')

      if (error) {
        console.error('Get user enrollments error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, enrollments: enrollments }
    } catch (error) {
      console.error('Get user enrollments error:', error)
      return { success: false, error: 'Failed to fetch user enrollments' }
    }
  }

  async getCourseEnrollments(courseId: string): Promise<{ success: boolean; enrollments?: any[]; error?: string }> {
    try {
      const { data: enrollments, error } = await supabase
        .from('course_enrollments')
        .select(`
          *,
          user:users(id, email, first_name, last_name, avatar_url)
        `)
        .eq('course_id', courseId)

      if (error) {
        console.error('Get course enrollments error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, enrollments: enrollments }
    } catch (error) {
      console.error('Get course enrollments error:', error)
      return { success: false, error: 'Failed to fetch course enrollments' }
    }
  }

  // =====================================================
  // SEARCH AND DISCOVERY
  // =====================================================

  async searchCourses(query: string, filters?: {
    category_id?: string
    price_range?: [number, number]
    language?: string
    organization_id?: string
  }): Promise<{ success: boolean; courses?: Course[]; error?: string }> {
    try {
      let dbQuery = supabase
        .from('courses')
        .select('*')
        .eq('status', 'published')

      // Text search
      if (query.trim()) {
        dbQuery = dbQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%,short_description.ilike.%${query}%`)
      }

      if (filters?.category_id) {
        dbQuery = dbQuery.eq('category_id', filters.category_id)
      }
      if (filters?.organization_id) {
        dbQuery = dbQuery.eq('organization_id', filters.organization_id)
      }
      if (filters?.language) {
        dbQuery = dbQuery.eq('language', filters.language)
      }
      if (filters?.price_range) {
        dbQuery = dbQuery.gte('price', filters.price_range[0]).lte('price', filters.price_range[1])
      }

      dbQuery = dbQuery.order('created_at', { ascending: false })

      const { data: courses, error } = await dbQuery

      if (error) {
        console.error('Search courses error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, courses: courses as Course[] }
    } catch (error) {
      console.error('Search courses error:', error)
      return { success: false, error: 'Failed to search courses' }
    }
  }
}

export const courseServiceDb = new DatabaseCourseService()
export { DatabaseCourseService } 