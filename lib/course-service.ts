'use client'

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

export interface CourseActivity {
  id: string
  course_id: string
  section_id: string
  title: string
  description?: string
  activity_type: 'video' | 'document' | 'quiz' | 'assignment' | 'forum' | 'scorm' | 'url' | 'file'
  content_data: any
  resource_url?: string
  file_attachments: string[]
  is_visible: boolean
  is_mandatory: boolean
  sort_order: number
  max_grade: number
  grade_to_pass: number
  completion_expected_date?: string
  availability_conditions: any
  time_limit_minutes?: number
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

export interface ActivityCompletion {
  id: string
  user_id: string
  course_id: string
  activity_id: string
  status: 'not_started' | 'in_progress' | 'completed' | 'failed'
  completion_date?: string
  time_spent_minutes: number
  grade?: number
  feedback?: string
  attempts: number
  completion_data: any
  created_at: string
  updated_at: string
}

// =====================================================
// MOCK DATA
// =====================================================

const mockCategories: CourseCategory[] = [
  {
    id: '1',
    name: 'AI & Machine Learning',
    slug: 'ai-ml',
    description: 'Artificial Intelligence and Machine Learning courses',
    sort_order: 1,
    is_visible: true,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Cloud Computing',
    slug: 'cloud',
    description: 'Cloud platforms and deployment strategies',
    sort_order: 2,
    is_visible: true,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '3',
    name: 'Web Development',
    slug: 'web-dev',
    description: 'Frontend and backend web development',
    sort_order: 3,
    is_visible: true,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  }
]

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'AI Development with Next.js',
    slug: 'ai-development-nextjs',
    short_description: 'Learn to build AI-powered applications using Next.js, OpenAI, and modern web technologies.',
    description: 'Complete course covering AI integration, API design, and deployment strategies.',
    category_id: '1',
    format: 'topics',
    show_grades: true,
    show_reports: true,
    enrollment_method: 'self',
    enrollment_key: 'ai2024',
    guest_access: false,
    status: 'published',
    is_featured: true,
    price: 299,
    currency: 'USD',
    certificate_enabled: true,
    completion_tracking: true,
    language: 'en',
    tags: ['AI', 'Next.js', 'JavaScript', 'OpenAI'],
    thumbnail_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop',
    organization_id: 'org-1',
    created_by: 'user-teacher-1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'AWS Cloud Computing Fundamentals',
    slug: 'aws-cloud-fundamentals',
    short_description: 'Master the fundamentals of AWS cloud services and deployment strategies.',
    description: 'Comprehensive introduction to AWS services, architecture patterns, and best practices.',
    category_id: '2',
    format: 'weeks',
    show_grades: true,
    show_reports: true,
    enrollment_method: 'manual',
    guest_access: false,
    status: 'published',
    is_featured: false,
    price: 199,
    currency: 'USD',
    certificate_enabled: true,
    completion_tracking: true,
    language: 'en',
    tags: ['AWS', 'Cloud', 'DevOps', 'Infrastructure'],
    thumbnail_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop',
    organization_id: 'org-1',
    created_by: 'user-teacher-1',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  }
]

// =====================================================
// COURSE SERVICE CLASS
// =====================================================

class CourseService {
  private courses: Course[] = [...mockCourses]
  private categories: CourseCategory[] = [...mockCategories]
  private enrollments: CourseEnrollment[] = []
  private sections: CourseSection[] = []
  private activities: CourseActivity[] = []
  private completions: ActivityCompletion[] = []
  
  // =====================================================
  // CATEGORY MANAGEMENT
  // =====================================================
  
  async createCategory(data: {
    name: string
    slug: string
    description?: string
    parent_id?: string
    sort_order?: number
  }): Promise<{ success: boolean; category?: CourseCategory; error?: string }> {
    try {
      const category: CourseCategory = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        slug: data.slug,
        description: data.description,
        parent_id: data.parent_id,
        sort_order: data.sort_order || 0,
        is_visible: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      this.categories.push(category)
      return { success: true, category }
    } catch (error) {
      console.error('Create category error:', error)
      return { success: false, error: 'Failed to create category' }
    }
  }

  async getCategories(): Promise<{ success: boolean; categories?: CourseCategory[]; error?: string }> {
    try {
      const categories = this.categories.filter(cat => cat.is_visible).sort((a, b) => a.sort_order - b.sort_order)
      return { success: true, categories }
    } catch (error) {
      console.error('Get categories error:', error)
      return { success: false, error: 'Failed to fetch categories' }
    }
  }

  // =====================================================
  // COURSE MANAGEMENT
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
      const course: Course = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title,
        slug: data.slug,
        short_description: data.short_description,
        description: data.description,
        category_id: data.category_id,
        organization_id: data.organization_id,
        created_by: data.created_by,
        format: (data.format as any) || 'topics',
        price: data.price || 0,
        enrollment_method: (data.enrollment_method as any) || 'manual',
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

      this.courses.push(course)
      return { success: true, course }
    } catch (error) {
      console.error('Create course error:', error)
      return { success: false, error: 'Failed to create course' }
    }
  }

  async getCourse(courseId: string): Promise<{ success: boolean; course?: Course; error?: string }> {
    try {
      const course = this.courses.find(c => c.id === courseId)
      if (!course) {
        return { success: false, error: 'Course not found' }
      }
      return { success: true, course }
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
      let filteredCourses = [...this.courses]

      if (filters?.category_id) {
        filteredCourses = filteredCourses.filter(c => c.category_id === filters.category_id)
      }
      if (filters?.status) {
        filteredCourses = filteredCourses.filter(c => c.status === filters.status)
      }
      if (filters?.organization_id) {
        filteredCourses = filteredCourses.filter(c => c.organization_id === filters.organization_id)
      }

      // Sort by creation date (newest first)
      filteredCourses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      // Apply pagination
      if (filters?.offset !== undefined && filters?.limit !== undefined) {
        filteredCourses = filteredCourses.slice(filters.offset, filters.offset + filters.limit)
      } else if (filters?.limit) {
        filteredCourses = filteredCourses.slice(0, filters.limit)
      }

      return { success: true, courses: filteredCourses, count: this.courses.length }
    } catch (error) {
      console.error('Get courses error:', error)
      return { success: false, error: 'Failed to fetch courses' }
    }
  }

  async updateCourse(courseId: string, updates: Partial<Course>): Promise<{ success: boolean; course?: Course; error?: string }> {
    try {
      const courseIndex = this.courses.findIndex(c => c.id === courseId)
      if (courseIndex === -1) {
        return { success: false, error: 'Course not found' }
      }

      this.courses[courseIndex] = {
        ...this.courses[courseIndex],
        ...updates,
        updated_at: new Date().toISOString()
      }

      return { success: true, course: this.courses[courseIndex] }
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
      const section: CourseSection = {
        id: Math.random().toString(36).substr(2, 9),
        course_id: data.course_id,
        title: data.title,
        description: data.description,
        section_number: data.section_number,
        sort_order: data.section_number,
        is_visible: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      this.sections.push(section)
      return { success: true, section }
    } catch (error) {
      console.error('Create section error:', error)
      return { success: false, error: 'Failed to create section' }
    }
  }

  async getCourseSections(courseId: string): Promise<{ success: boolean; sections?: CourseSection[]; error?: string }> {
    try {
      const sections = this.sections
        .filter(s => s.course_id === courseId && s.is_visible)
        .sort((a, b) => a.sort_order - b.sort_order)

      return { success: true, sections }
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
      const existingEnrollment = this.enrollments.find(e => 
        e.user_id === data.user_id && e.course_id === data.course_id
      )

      if (existingEnrollment) {
        return { success: false, error: 'User is already enrolled in this course' }
      }

      const enrollment: CourseEnrollment = {
        id: Math.random().toString(36).substr(2, 9),
        user_id: data.user_id,
        course_id: data.course_id,
        role: (data.role as any) || 'student',
        status: 'active',
        enrolled_at: new Date().toISOString(),
        progress_percentage: 0,
        time_spent_minutes: 0
      }

      this.enrollments.push(enrollment)
      return { success: true, enrollment }
    } catch (error) {
      console.error('Enroll user error:', error)
      return { success: false, error: 'Failed to enroll user' }
    }
  }

  async getUserEnrollments(userId: string): Promise<{ success: boolean; enrollments?: any[]; error?: string }> {
    try {
      const userEnrollments = this.enrollments
        .filter(e => e.user_id === userId && e.status === 'active')
        .map(enrollment => ({
          ...enrollment,
          course: this.courses.find(c => c.id === enrollment.course_id)
        }))

      return { success: true, enrollments: userEnrollments }
    } catch (error) {
      console.error('Get user enrollments error:', error)
      return { success: false, error: 'Failed to fetch user enrollments' }
    }
  }

  async getCourseEnrollments(courseId: string): Promise<{ success: boolean; enrollments?: any[]; error?: string }> {
    try {
      const courseEnrollments = this.enrollments
        .filter(e => e.course_id === courseId)
        .map(enrollment => ({
          ...enrollment,
          user: {
            id: enrollment.user_id,
            email: `user${enrollment.user_id}@example.com`,
            first_name: 'Student',
            last_name: 'User',
            avatar_url: null
          }
        }))

      return { success: true, enrollments: courseEnrollments }
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
    level?: string
    language?: string
    organization_id?: string
  }): Promise<{ success: boolean; courses?: Course[]; error?: string }> {
    try {
      let filteredCourses = this.courses.filter(course => 
        course.status === 'published' &&
        (course.title.toLowerCase().includes(query.toLowerCase()) ||
         course.description?.toLowerCase().includes(query.toLowerCase()) ||
         course.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
      )

      if (filters?.category_id) {
        filteredCourses = filteredCourses.filter(c => c.category_id === filters.category_id)
      }
      if (filters?.organization_id) {
        filteredCourses = filteredCourses.filter(c => c.organization_id === filters.organization_id)
      }
      if (filters?.language) {
        filteredCourses = filteredCourses.filter(c => c.language === filters.language)
      }
      if (filters?.price_range) {
        filteredCourses = filteredCourses.filter(c => 
          c.price >= filters.price_range![0] && c.price <= filters.price_range![1]
        )
      }

      filteredCourses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      return { success: true, courses: filteredCourses }
    } catch (error) {
      console.error('Search courses error:', error)
      return { success: false, error: 'Failed to search courses' }
    }
  }
}

export const courseService = new CourseService()
export { CourseService } 