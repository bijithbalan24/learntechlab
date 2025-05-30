"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User,
  ArrowRight,
  Github,
  Chrome,
  Apple,
  CheckCircle,
  UserCheck,
  BookOpen,
  Trophy,
  Clock,
  Users,
  ArrowLeft,
  DollarSign,
  BarChart,
  Video,
  MessageSquare
} from "lucide-react"

export default function TeacherSignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    title: "",
    company: "",
    experience: "",
    expertise: [] as string[],
    bio: "",
    agreeToTerms: false,
    agreeToTeacher: false
  })

  const expertiseOptions = [
    "AI/Machine Learning",
    "Cloud Computing",
    "Web Development",
    "Data Science",
    "Mobile Development",
    "DevOps",
    "Cybersecurity",
    "UI/UX Design",
    "Project Management",
    "Software Architecture"
  ]

  const handleExpertiseChange = (expertise: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(expertise) 
        ? prev.expertise.filter(e => e !== expertise)
        : [...prev.expertise, expertise]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to teacher dashboard in real implementation
      window.location.href = "/teacher-dashboard"
    }, 2000)
  }

  const handleSocialSignup = (provider: string) => {
    console.log(`Teacher signup with ${provider}`)
    // Implement social auth here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to home
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Teacher Registration</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-emerald-600 text-white p-12 flex-col justify-center">
          <div className="max-w-md">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-4xl font-light mb-6">
              Shape the Future
            </h2>
            <p className="text-xl font-light text-green-100 mb-8">
              Join our community of expert instructors and help learners master cutting-edge technology.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Competitive Revenue Share</h3>
                  <p className="text-green-100 text-sm">Earn up to 70% revenue share on your course sales</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                  <BarChart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Advanced Analytics</h3>
                  <p className="text-green-100 text-sm">Track student progress and course performance in detail</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                  <Video className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Studio-Quality Tools</h3>
                  <p className="text-green-100 text-sm">Access professional recording and course creation tools</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Direct Student Interaction</h3>
                  <p className="text-green-100 text-sm">Engage with students through live sessions and Q&A</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-light">$5.2k</div>
                  <div className="text-green-200">Avg Monthly</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light">89%</div>
                  <div className="text-green-200">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light">200+</div>
                  <div className="text-green-200">Instructors</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-gray-900 mb-2">Join as an Instructor</h1>
              <p className="text-gray-600 font-light">Share your expertise and build your teaching career</p>
            </div>

            {/* Social Signup Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => handleSocialSignup('google')}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
              >
                <Chrome className="w-5 h-5 mr-3 text-blue-600" />
                Continue with Google
              </button>
              
              <button
                onClick={() => handleSocialSignup('linkedin')}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-200 hover:shadow-md"
              >
                <Users className="w-5 h-5 mr-3" />
                Continue with LinkedIn
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500 font-light">or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="block w-full px-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="block w-full px-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="block w-full px-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="e.g., Senior AI Engineer, Cloud Architect"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="block w-full px-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="e.g., Amazon, Google, Microsoft"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  <option value="">Select experience level</option>
                  <option value="2-5">2-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Areas of Expertise
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {expertiseOptions.map((expertise) => (
                    <label key={expertise} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.expertise.includes(expertise)}
                        onChange={() => handleExpertiseChange(expertise)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{expertise}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Brief Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="block w-full px-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 resize-none"
                  placeholder="Tell us about your background and why you want to teach..."
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-green-600 hover:text-green-500">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-green-600 hover:text-green-500">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    id="agreeToTeacher"
                    name="agreeToTeacher"
                    type="checkbox"
                    required
                    checked={formData.agreeToTeacher}
                    onChange={(e) => setFormData({...formData, agreeToTeacher: e.target.checked})}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="agreeToTeacher" className="ml-3 block text-sm text-gray-700">
                    I agree to the{' '}
                    <Link href="/teacher-agreement" className="text-green-600 hover:text-green-500">
                      Instructor Agreement
                    </Link>{' '}
                    and revenue sharing terms
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={!formData.agreeToTerms || !formData.agreeToTeacher || isLoading}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    Start Teaching Journey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="font-medium text-green-600 hover:text-green-500 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 