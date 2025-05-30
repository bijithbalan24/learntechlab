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
  Settings,
  BookOpen,
  Trophy,
  Clock,
  Users,
  ArrowLeft,
  Building,
  BarChart,
  Shield,
  Zap
} from "lucide-react"

export default function AdminSignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jobTitle: "",
    company: "",
    companySize: "",
    industry: "",
    teamSize: "",
    useCase: [] as string[],
    agreeToTerms: false,
    agreeToEnterprise: false
  })

  const useCaseOptions = [
    "Employee Training",
    "Skills Development",
    "Technical Onboarding",
    "Certification Programs",
    "Team Upskilling",
    "Leadership Development",
    "Compliance Training",
    "Knowledge Management"
  ]

  const handleUseCaseChange = (useCase: string) => {
    setFormData(prev => ({
      ...prev,
      useCase: prev.useCase.includes(useCase) 
        ? prev.useCase.filter(u => u !== useCase)
        : [...prev.useCase, useCase]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to admin dashboard in real implementation
      window.location.href = "/admin-dashboard"
    }, 2000)
  }

  const handleSocialSignup = (provider: string) => {
    console.log(`Admin signup with ${provider}`)
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
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Settings className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Administrator Registration</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-12 flex-col justify-center">
          <div className="max-w-md">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
              <Settings className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-4xl font-light mb-6">
              Scale Your Organization
            </h2>
            <p className="text-xl font-light text-purple-100 mb-8">
              Empower your team with enterprise-grade learning management and comprehensive analytics.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Team Management</h3>
                  <p className="text-purple-100 text-sm">Centralized user management and role-based access control</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                  <BarChart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Advanced Analytics</h3>
                  <p className="text-purple-100 text-sm">Detailed insights into team progress and ROI metrics</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Enterprise Security</h3>
                  <p className="text-purple-100 text-sm">SSO integration, compliance reporting, and data protection</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Custom Integration</h3>
                  <p className="text-purple-100 text-sm">API access and seamless integration with your existing tools</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-light">500+</div>
                  <div className="text-purple-200">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light">98%</div>
                  <div className="text-purple-200">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light">24/7</div>
                  <div className="text-purple-200">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-gray-900 mb-2">Enterprise Account</h1>
              <p className="text-gray-600 font-light">Set up your organization's learning platform</p>
            </div>

            {/* Social Signup Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => handleSocialSignup('google')}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
              >
                <Chrome className="w-5 h-5 mr-3 text-blue-600" />
                Continue with Google Workspace
              </button>
              
              <button
                onClick={() => handleSocialSignup('microsoft')}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-200 hover:shadow-md"
              >
                <Building className="w-5 h-5 mr-3" />
                Continue with Microsoft
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
                    className="block w-full px-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
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
                    className="block w-full px-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Work email address
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="john@company.com"
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
                    className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
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
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  className="block w-full px-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="e.g., Learning & Development Manager"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="block w-full px-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="e.g., Acme Corporation"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                    className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Team Size
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                    className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  >
                    <option value="">Select team size</option>
                    <option value="1-5">1-5 people</option>
                    <option value="6-25">6-25 people</option>
                    <option value="26-100">26-100 people</option>
                    <option value="100+">100+ people</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="block w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="education">Education</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Primary Use Cases
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {useCaseOptions.map((useCase) => (
                    <label key={useCase} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.useCase.includes(useCase)}
                        onChange={() => handleUseCaseChange(useCase)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{useCase}</span>
                    </label>
                  ))}
                </div>
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
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-purple-600 hover:text-purple-500">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    id="agreeToEnterprise"
                    name="agreeToEnterprise"
                    type="checkbox"
                    required
                    checked={formData.agreeToEnterprise}
                    onChange={(e) => setFormData({...formData, agreeToEnterprise: e.target.checked})}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="agreeToEnterprise" className="ml-3 block text-sm text-gray-700">
                    I agree to the{' '}
                    <Link href="/enterprise-agreement" className="text-purple-600 hover:text-purple-500">
                      Enterprise Agreement
                    </Link>{' '}
                    and understand that this is a business account
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={!formData.agreeToTerms || !formData.agreeToEnterprise || isLoading}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Setting up account...
                  </>
                ) : (
                  <>
                    Create Enterprise Account
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
                  className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                >
                  Sign in
                </Link>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Need help? <Link href="/contact" className="text-purple-600 hover:text-purple-500">Contact our sales team</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 