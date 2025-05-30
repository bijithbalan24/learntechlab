export interface Program {
  id: string
  title: string
  description: string
  slug: string
  category: ProgramCategory
  duration: number // in weeks
  price: number
  originalPrice?: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  format: 'Live Online' | 'Self-Paced' | 'Hybrid'
  image: string
  features: string[]
  learningOutcomes: string[]
  prerequisites?: string[]
  certifications: string[]
  instructor: Instructor
  cohorts: Cohort[]
  rating: number
  reviewCount: number
  enrollmentCount: number
  isPopular?: boolean
  isFree?: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ProgramCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
}

export interface Cohort {
  id: string
  programId: string
  startDate: Date
  endDate: Date
  maxStudents: number
  enrolledStudents: number
  status: 'Open' | 'Full' | 'Closed' | 'InProgress' | 'Completed'
  instructors: string[]
  schedule: {
    dayOfWeek: number
    startTime: string
    endTime: string
    timezone: string
  }[]
}

export interface Instructor {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  expertise: string[]
  experience: number // years
  certifications: string[]
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
  }
  rating: number
  totalStudents: number
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: 'student' | 'instructor' | 'admin' | 'business'
  enrollments: Enrollment[]
  profile: UserProfile
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile {
  bio?: string
  location?: string
  timezone?: string
  interests: string[]
  experience: string
  goals: string[]
  socialLinks: {
    linkedin?: string
    github?: string
    portfolio?: string
  }
}

export interface Enrollment {
  id: string
  userId: string
  programId: string
  cohortId: string
  status: 'Active' | 'Completed' | 'Dropped' | 'Paused'
  progress: number // percentage
  enrolledAt: Date
  completedAt?: Date
  certificate?: Certificate
}

export interface Certificate {
  id: string
  userId: string
  programId: string
  issueDate: Date
  certificateUrl: string
  credentialId: string
}

export interface Testimonial {
  id: string
  userId: string
  programId: string
  rating: number
  content: string
  author: {
    name: string
    title: string
    company: string
    avatar: string
  }
  isVerified: boolean
  isFeatured: boolean
  createdAt: Date
}

export interface BusinessSolution {
  id: string
  title: string
  description: string
  features: string[]
  pricing: {
    model: 'per-user' | 'flat-rate' | 'custom'
    price?: number
    period?: 'monthly' | 'annually'
  }
  programs: string[] // program IDs
  benefits: string[]
  minUsers?: number
  maxUsers?: number
  support: string[]
}

export interface Campaign {
  id: string
  title: string
  slug: string
  description: string
  type: 'promotion' | 'launch' | 'webinar' | 'free-trial'
  status: 'draft' | 'active' | 'paused' | 'completed'
  startDate: Date
  endDate: Date
  targetAudience: string[]
  ctaText: string
  ctaUrl: string
  landingPageUrl?: string
  discountCode?: string
  discountPercentage?: number
  bannerText?: string
  featuredPrograms: string[]
  metrics: CampaignMetrics
  createdAt: Date
  updatedAt: Date
}

export interface CampaignMetrics {
  views: number
  clicks: number
  conversions: number
  signups: number
  revenue: number
  conversionRate: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    title: string
  }
  category: string
  tags: string[]
  featuredImage: string
  status: 'draft' | 'published'
  publishedAt?: Date
  readTime: number
  seoMeta: {
    title: string
    description: string
    keywords: string[]
  }
  createdAt: Date
  updatedAt: Date
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  isVisible: boolean
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
  type: 'general' | 'business' | 'support' | 'partnership'
  source: string
  status: 'new' | 'replied' | 'resolved'
  createdAt: Date
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Form types
export interface EnrollmentFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  experience: string
  goals: string[]
  cohortId: string
  marketing: {
    source: string
    campaign?: string
  }
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
  type: 'general' | 'business' | 'support'
}

export interface BusinessInquiryFormData {
  contactName: string
  company: string
  email: string
  phone: string
  teamSize: number
  industry: string
  trainingNeeds: string[]
  timeline: string
  budget: string
  message?: string
} 