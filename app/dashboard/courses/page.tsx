'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Users, 
  Clock, 
  Star,
  Calendar,
  Tag,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { courseServiceDb as courseService, type Course, type CourseCategory } from '@/lib/course-service-db'

export default function CoursesPage() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<CourseCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock course data for demonstration
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
      created_by: 'teacher-1',
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
      created_by: 'teacher-2',
      created_at: '2024-01-10T10:00:00Z',
      updated_at: '2024-01-10T10:00:00Z'
    },
    {
      id: '3',
      title: 'Introduction to Machine Learning',
      slug: 'intro-machine-learning',
      short_description: 'Get started with machine learning concepts, algorithms, and practical applications.',
      description: 'Beginner-friendly course covering ML fundamentals, Python libraries, and real-world projects.',
      category_id: '1',
      format: 'topics',
      show_grades: true,
      show_reports: true,
      enrollment_method: 'self',
      guest_access: true,
      status: 'draft',
      is_featured: false,
      price: 0,
      currency: 'USD',
      certificate_enabled: false,
      completion_tracking: true,
      language: 'en',
      tags: ['Machine Learning', 'Python', 'Data Science', 'AI'],
      thumbnail_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
      organization_id: 'org-1',
      created_by: 'teacher-1',
      created_at: '2024-01-12T10:00:00Z',
      updated_at: '2024-01-12T10:00:00Z'
    }
  ]

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
    }
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Load courses from course service
      const coursesResult = await courseService.getCourses()
      if (coursesResult.success && coursesResult.courses) {
        setCourses(coursesResult.courses)
      } else {
        // Fallback to mock data if service fails
        setCourses(mockCourses)
      }

      // Load categories
      const categoriesResult = await courseService.getCategories()
      if (categoriesResult.success && categoriesResult.categories) {
        setCategories(categoriesResult.categories)
      } else {
        // Fallback to mock data if service fails
        setCategories(mockCategories)
      }
    } catch (error) {
      console.error('Failed to load courses:', error)
      // Fallback to mock data on error
      setCourses(mockCourses)
      setCategories(mockCategories)
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.short_description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '' || course.category_id === selectedCategory
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const canManageCourse = (course: Course) => {
    return user?.role === 'admin' || course.created_by === user?.id
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { color: 'bg-green-100 text-green-800', label: 'Published' },
      draft: { color: 'bg-yellow-100 text-yellow-800', label: 'Draft' },
      archived: { color: 'bg-gray-100 text-gray-800', label: 'Archived' },
      hidden: { color: 'bg-red-100 text-red-800', label: 'Hidden' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const CourseCard = ({ course }: { course: Course }) => (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Course Thumbnail */}
      <div className="relative h-48 bg-gray-200">
        {course.thumbnail_url ? (
          <img 
            src={course.thumbnail_url} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <BookOpen className="w-12 h-12 text-blue-400" />
          </div>
        )}
        
        {/* Status & Featured Badge */}
        <div className="absolute top-3 left-3">
          {getStatusBadge(course.status)}
        </div>
        
        {course.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </span>
          </div>
        )}

        {/* Course Actions */}
        {canManageCourse(course) && (
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center space-x-2">
              <Link
                href={`/dashboard/courses/${course.id}/edit`}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
              >
                <Edit className="w-4 h-4 text-gray-600" />
              </Link>
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {course.short_description}
            </p>
          </div>
        </div>

        {/* Course Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              0 students
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {course.format}
            </span>
          </div>
          
          {course.price > 0 ? (
            <span className="font-semibold text-green-600">
              {course.currency} {course.price}
            </span>
          ) : (
            <span className="font-semibold text-blue-600">Free</span>
          )}
        </div>

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {course.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{course.tags.length - 3} more</span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Link
            href={`/dashboard/courses/${course.id}`}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Course
          </Link>
          
          {course.certificate_enabled && (
            <span className="flex items-center text-xs text-gray-500">
              🏆 Certificate
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-gray-900">Courses</h1>
              <p className="text-gray-600">Manage and explore available courses</p>
            </div>
            
            {(user?.role === 'teacher' || user?.role === 'admin') && (
              <Link
                href="/dashboard/courses/create"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or create a new course.</p>
            {(user?.role === 'teacher' || user?.role === 'admin') && (
              <Link
                href="/dashboard/courses/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Link>
            )}
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 