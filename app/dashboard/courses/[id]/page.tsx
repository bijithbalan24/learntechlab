'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft,
  BookOpen, 
  Users, 
  Calendar,
  Clock,
  Globe,
  DollarSign,
  Settings,
  Edit,
  Eye,
  Plus,
  Tag,
  Star,
  CheckCircle,
  XCircle,
  User,
  BarChart3,
  FileText
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { courseServiceDb as courseService, type Course, type CourseSection } from '@/lib/course-service-db'

export default function CourseDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [sections, setSections] = useState<CourseSection[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'students' | 'analytics'>('overview')

  useEffect(() => {
    if (id) {
      loadCourseData(id as string)
    }
  }, [id])

  const loadCourseData = async (courseId: string) => {
    setLoading(true)
    try {
      const result = await courseService.getCourse(courseId)
      if (result.success && result.course) {
        setCourse(result.course)
        
        // Load course sections
        const sectionsResult = await courseService.getCourseSections(courseId)
        if (sectionsResult.success && sectionsResult.sections) {
          setSections(sectionsResult.sections)
        }
      } else {
        // Course not found, redirect
        router.push('/dashboard/courses')
      }
    } catch (error) {
      console.error('Failed to load course:', error)
      router.push('/dashboard/courses')
    } finally {
      setLoading(false)
    }
  }

  const handlePublishToggle = async () => {
    if (!course) return
    
    const newStatus = course.status === 'published' ? 'draft' : 'published'
    const result = await courseService.updateCourse(course.id, { status: newStatus })
    
    if (result.success) {
      setCourse(prev => prev ? { ...prev, status: newStatus } : null)
    }
  }

  const canManageCourse = () => {
    return user?.role === 'admin' || course?.created_by === user?.id
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-2">Course not found</h2>
          <Link 
            href="/dashboard/courses"
            className="text-blue-600 hover:text-blue-700"
          >
            Back to courses
          </Link>
        </div>
      </div>
    )
  }

  const statusConfig = {
    published: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Published' },
    draft: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Draft' },
    archived: { color: 'bg-gray-100 text-gray-800', icon: XCircle, label: 'Archived' },
    hidden: { color: 'bg-red-100 text-red-800', icon: Eye, label: 'Hidden' }
  }

  const currentStatus = statusConfig[course.status as keyof typeof statusConfig]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/courses"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-light text-gray-900">{course.title}</h1>
                <div className="flex items-center space-x-3 mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
                    <currentStatus.icon className="w-3 h-3 mr-1" />
                    {currentStatus.label}
                  </span>
                  <span className="text-sm text-gray-500">
                    Created {new Date(course.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            {canManageCourse() && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePublishToggle}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    course.status === 'published'
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {course.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
                <Link
                  href={`/dashboard/courses/${course.id}/edit`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Course
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Header Info */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Enrollment</p>
                <p className="font-medium capitalize">{course.enrollment_method}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Format</p>
                <p className="font-medium capitalize">{course.format}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">
                  {course.price > 0 ? `${course.currency} ${course.price}` : 'Free'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Language</p>
                <p className="font-medium">{course.language.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'content', label: 'Content', icon: BookOpen },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Course Description */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Description</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{course.short_description}</p>
                {course.description && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-600 leading-relaxed">{course.description}</p>
                  </div>
                )}
              </div>

              {/* Course Features */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${course.certificate_enabled ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className="text-sm">Certificate upon completion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${course.completion_tracking ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className="text-sm">Progress tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${course.show_grades ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className="text-sm">Grade visibility</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${course.guest_access ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className="text-sm">Guest access</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Course Details */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Course ID:</span>
                    <span className="font-mono text-gray-900">{course.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Slug:</span>
                    <span className="font-mono text-gray-900">{course.slug}</span>
                  </div>
                  {course.start_date && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Start Date:</span>
                      <span className="text-gray-900">{new Date(course.start_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {course.end_date && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">End Date:</span>
                      <span className="text-gray-900">{new Date(course.end_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Course Content</h3>
              {canManageCourse() && (
                <Link
                  href={`/dashboard/courses/${course.id}/sections/create`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Link>
              )}
            </div>

            {sections.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No content yet</h4>
                <p className="text-gray-600 mb-6">Start building your course by adding sections and activities.</p>
                {canManageCourse() && (
                  <Link
                    href={`/dashboard/courses/${course.id}/sections/create`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Section
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{section.title}</h4>
                        {section.description && (
                          <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Section {index + 1}</span>
                        {canManageCourse() && (
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Enrolled Students</h3>
              {canManageCourse() && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Enroll Students
                </button>
              )}
            </div>
            
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No students enrolled</h4>
              <p className="text-gray-600">Students will appear here once they enroll in the course.</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Course Analytics</h3>
            
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Analytics coming soon</h4>
              <p className="text-gray-600">Detailed analytics and insights will be available here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 