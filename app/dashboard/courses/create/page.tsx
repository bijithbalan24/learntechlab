'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, 
  Plus, 
  Save, 
  Eye, 
  Settings, 
  Users,
  Calendar,
  DollarSign,
  Tag,
  Globe,
  Upload,
  X,
  ArrowLeft
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { courseServiceDb as courseService, type CourseCategory } from '@/lib/course-service-db'
import Notification from '@/components/Notification'

interface CourseFormData {
  title: string
  slug: string
  short_description: string
  description: string
  category_id: string
  enrollment_method: 'manual' | 'self' | 'guest'
  enrollment_key: string
  guest_access: boolean
  max_participants: number | null
  start_date: string
  end_date: string
  enrollment_start_date: string
  enrollment_end_date: string
  price: number
  currency: string
  certificate_enabled: boolean
  completion_tracking: boolean
  language: string
  tags: string[]
  show_grades: boolean
  show_reports: boolean
}

export default function CreateCoursePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<CourseCategory[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [newTag, setNewTag] = useState('')
  const [notification, setNotification] = useState<{
    show: boolean
    type: 'success' | 'error'
    title: string
    message?: string
  }>({
    show: false,
    type: 'success',
    title: '',
    message: ''
  })

  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    category_id: '',
    enrollment_method: 'manual',
    enrollment_key: '',
    guest_access: false,
    max_participants: null,
    start_date: '',
    end_date: '',
    enrollment_start_date: '',
    enrollment_end_date: '',
    price: 0,
    currency: 'USD',
    certificate_enabled: false,
    completion_tracking: true,
    language: 'en',
    tags: [],
    show_grades: true,
    show_reports: true
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const result = await courseService.getCategories()
    if (result.success && result.categories) {
      setCategories(result.categories)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleInputChange = (field: keyof CourseFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-generate slug from title
    if (field === 'title') {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }))
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove))
  }

  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.title.trim()) stepErrors.title = 'Course title is required'
      if (!formData.short_description.trim()) stepErrors.short_description = 'Short description is required'
      if (!formData.category_id) stepErrors.category_id = 'Category is required'
    }

    if (step === 2) {
      if (formData.enrollment_method === 'self' && !formData.enrollment_key.trim()) {
        stepErrors.enrollment_key = 'Enrollment key is required for self-enrollment'
      }
      if (formData.start_date && formData.end_date && new Date(formData.start_date) >= new Date(formData.end_date)) {
        stepErrors.end_date = 'End date must be after start date'
      }
    }

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (status: 'draft' | 'published' = 'draft') => {
    if (!validateStep(3) || !user) return

    setLoading(true)
    try {
      const result = await courseService.createCourse({
        title: formData.title,
        slug: formData.slug,
        short_description: formData.short_description,
        description: formData.description,
        category_id: formData.category_id,
        organization_id: user.organization_id || '550e8400-e29b-41d4-a716-446655440010',
        created_by: user.id,
        format: 'topics',
        price: formData.price,
        enrollment_method: formData.enrollment_method,
        tags: formData.tags
      })

      if (result.success && result.course) {
        // Update additional course settings
        await courseService.updateCourse(result.course.id, {
          enrollment_key: formData.enrollment_key,
          guest_access: formData.guest_access,
          max_participants: formData.max_participants || undefined,
          start_date: formData.start_date || undefined,
          end_date: formData.end_date || undefined,
          enrollment_start_date: formData.enrollment_start_date || undefined,
          enrollment_end_date: formData.enrollment_end_date || undefined,
          currency: formData.currency,
          certificate_enabled: formData.certificate_enabled,
          completion_tracking: formData.completion_tracking,
          language: formData.language,
          show_grades: formData.show_grades,
          show_reports: formData.show_reports,
          status
        })

        // Show success notification
        setNotification({
          show: true,
          type: 'success',
          title: status === 'published' ? 'Course Published!' : 'Course Created!',
          message: status === 'published' 
            ? `"${formData.title}" has been published and is now available to students.`
            : `"${formData.title}" has been saved as a draft. You can publish it later.`
        })

        // Redirect after a short delay to show the notification
        setTimeout(() => {
          router.push(`/dashboard/courses/${result.course!.id}`)
        }, 2000)
      } else {
        setNotification({
          show: true,
          type: 'error',
          title: 'Creation Failed',
          message: result.error || 'Failed to create course. Please try again.'
        })
        setErrors({ general: result.error || 'Failed to create course' })
      }
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        title: 'Unexpected Error',
        message: 'An unexpected error occurred. Please try again.'
      })
      setErrors({ general: 'An unexpected error occurred' })
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Course details and content' },
    { id: 2, title: 'Settings & Access', description: 'Enrollment and scheduling' },
    { id: 3, title: 'Review & Publish', description: 'Final review and publication' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Notification
        type={notification.type}
        title={notification.title}
        message={notification.message}
        show={notification.show}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-light text-gray-900">Create New Course</h1>
                <p className="text-gray-600">Build engaging learning experiences</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleSubmit('draft')}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </button>
              <button
                onClick={() => handleSubmit('published')}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Create & Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center ${index < steps.length - 1 ? 'w-full' : ''}`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {step.id}
                </div>
                <div className="ml-4 min-w-0 flex-1">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-full h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </nav>

        {/* Form Content */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{errors.general}</p>
            </div>
          )}

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Course Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.title ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter course title"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="course-slug"
                    />
                    <p className="mt-1 text-xs text-gray-500">URL-friendly version of the title</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => handleInputChange('category_id', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.category_id ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description *
                    </label>
                    <textarea
                      value={formData.short_description}
                      onChange={(e) => handleInputChange('short_description', e.target.value)}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.short_description ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Brief description for course listings"
                    />
                    {errors.short_description && <p className="mt-1 text-sm text-red-600">{errors.short_description}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Detailed course description, learning objectives, prerequisites..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 hover:text-blue-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Add a tag"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Settings & Access */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Settings & Access</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Enrollment Settings */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Enrollment Settings</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enrollment Method
                        </label>
                        <select
                          value={formData.enrollment_method}
                          onChange={(e) => handleInputChange('enrollment_method', e.target.value as 'manual' | 'self' | 'guest')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="manual">Manual Enrollment</option>
                          <option value="self">Self Enrollment</option>
                          <option value="guest">Guest Access</option>
                        </select>
                      </div>

                      {formData.enrollment_method === 'self' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enrollment Key *
                          </label>
                          <input
                            type="text"
                            value={formData.enrollment_key}
                            onChange={(e) => handleInputChange('enrollment_key', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.enrollment_key ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Enter enrollment key"
                          />
                          {errors.enrollment_key && <p className="mt-1 text-sm text-red-600">{errors.enrollment_key}</p>}
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Participants
                        </label>
                        <input
                          type="number"
                          value={formData.max_participants || ''}
                          onChange={(e) => handleInputChange('max_participants', e.target.value ? parseInt(e.target.value) : null)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="No limit"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Course Dates */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Course Dates</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Course Start Date
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.start_date}
                          onChange={(e) => handleInputChange('start_date', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Course End Date
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.end_date}
                          onChange={(e) => handleInputChange('end_date', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.end_date ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enrollment Start
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.enrollment_start_date}
                          onChange={(e) => handleInputChange('enrollment_start_date', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enrollment End
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.enrollment_end_date}
                          onChange={(e) => handleInputChange('enrollment_end_date', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing & Certification</h3>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price
                        </label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          min="0"
                          step="0.01"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={formData.currency}
                          onChange={(e) => handleInputChange('currency', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="INR">INR (₹)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={formData.language}
                          onChange={(e) => handleInputChange('language', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="hi">Hindi</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Feature Toggles */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Course Features</h3>
                    
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.certificate_enabled}
                          onChange={(e) => handleInputChange('certificate_enabled', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">Enable Certificates</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.completion_tracking}
                          onChange={(e) => handleInputChange('completion_tracking', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">Track Completion</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.show_grades}
                          onChange={(e) => handleInputChange('show_grades', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">Show Grades to Students</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.show_reports}
                          onChange={(e) => handleInputChange('show_reports', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">Show Activity Reports</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.guest_access}
                          onChange={(e) => handleInputChange('guest_access', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">Allow Guest Access</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Publish */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Course Details</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{formData.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{formData.short_description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Enrollment:</span>
                      <span className="ml-2 capitalize">{formData.enrollment_method}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <span className="ml-2">{formData.price > 0 ? `${formData.currency} ${formData.price}` : 'Free'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Language:</span>
                      <span className="ml-2">{formData.language.toUpperCase()}</span>
                    </div>
                  </div>

                  {formData.tags.length > 0 && (
                    <div>
                      <span className="text-gray-500 text-sm">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Features enabled:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {formData.certificate_enabled && <li>Certificate upon completion</li>}
                      {formData.completion_tracking && <li>Progress tracking</li>}
                      {formData.show_grades && <li>Grade visibility</li>}
                      {formData.show_reports && <li>Activity reports</li>}
                      {formData.guest_access && <li>Guest access allowed</li>}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Next steps:</strong> After creating the course, you can add sections, activities, and enroll students. 
                    You can also modify these settings later from the course management page.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <div className="space-x-3">
                <button
                  onClick={() => handleSubmit('draft')}
                  disabled={loading}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => handleSubmit('published')}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create & Publish'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 