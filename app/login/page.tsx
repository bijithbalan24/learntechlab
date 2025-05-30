"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  UserCheck,
  Settings,
  AlertCircle
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { login, loading, error, clearError } = useAuth()
  const role = searchParams.get('role') || 'student'
  
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })

  const roleConfig = {
    student: {
      title: "Student Portal",
      subtitle: "Access your courses and track your progress",
      icon: GraduationCap,
      color: "blue",
      gradient: "from-blue-600 to-purple-600",
      dashboard: "/dashboard/student"
    },
    teacher: {
      title: "Teacher Portal", 
      subtitle: "Manage your courses and track student progress",
      icon: UserCheck,
      color: "green",
      gradient: "from-green-600 to-emerald-600",
      dashboard: "/dashboard/teacher"
    },
    admin: {
      title: "Administrator Panel",
      subtitle: "Manage users and oversee the learning platform",
      icon: Settings,
      color: "purple", 
      gradient: "from-purple-600 to-indigo-600",
      dashboard: "/dashboard/admin"
    }
  }

  const currentRole = roleConfig[role as keyof typeof roleConfig] || roleConfig.student

  // Clear error when role changes
  useEffect(() => {
    clearError()
  }, [role, clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    
    if (!formData.email || !formData.password) {
      return
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
        role: role as 'student' | 'teacher' | 'admin'
      })

      if (result.success) {
        // Redirect to main dashboard
        router.push('/dashboard')
      }
    } catch (err) {
      console.error('Login error:', err)
    }
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
              <div className={`w-8 h-8 bg-${currentRole.color}-100 rounded-full flex items-center justify-center`}>
                <currentRole.icon className={`w-4 h-4 text-${currentRole.color}-600`} />
              </div>
              <span className="text-sm font-medium text-gray-900">{currentRole.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Side - Role Info */}
        <div className={`hidden lg:flex lg:w-1/2 bg-gradient-to-br ${currentRole.gradient} text-white p-12 flex-col justify-center`}>
          <div className="max-w-md">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
              <currentRole.icon className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-4xl font-light mb-6">
              {currentRole.title}
            </h2>
            <p className="text-xl font-light text-white/90 mb-8">
              {currentRole.subtitle}
            </p>

            <div className="space-y-6">
              {role === 'student' && (
                <>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Course Access</h3>
                      <p className="text-blue-100 text-sm">Access assigned courses and learning materials</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Progress Tracking</h3>
                      <p className="text-blue-100 text-sm">Monitor your learning progress and achievements</p>
                    </div>
                  </div>
                </>
              )}

              {role === 'teacher' && (
                <>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Course Management</h3>
                      <p className="text-green-100 text-sm">Create and manage your course content</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Student Analytics</h3>
                      <p className="text-green-100 text-sm">Track student progress and engagement</p>
                    </div>
                  </div>
                </>
              )}

              {role === 'admin' && (
                <>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">User Management</h3>
                      <p className="text-purple-100 text-sm">Create and manage student and teacher accounts</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">System Analytics</h3>
                      <p className="text-purple-100 text-sm">Access comprehensive learning analytics</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <p className="text-sm text-white/80 text-center mb-4">
                Demo Credentials (Development Mode)
              </p>
              <div className="text-xs text-white/60 text-center space-y-1">
                <p><strong>Admin:</strong> admin@learntechlab.com / demo123</p>
                <p><strong>Teacher:</strong> teacher@learntechlab.com / demo123</p>
                <p><strong>Student:</strong> student@learntechlab.com / demo123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600 font-light">Sign in to access your {role} portal</p>
            </div>

            {/* Role Switcher */}
            <div className="flex space-x-2 mb-8 p-1 bg-gray-100 rounded-lg">
              <Link 
                href="/login?role=student"
                className={`flex-1 text-center py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  role === 'student' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Student
              </Link>
              <Link 
                href="/login?role=teacher"
                className={`flex-1 text-center py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  role === 'teacher' 
                    ? 'bg-white text-green-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Teacher
              </Link>
              <Link 
                href="/login?role=admin"
                className={`flex-1 text-center py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  role === 'admin' 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Admin
              </Link>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="Enter your email"
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
                    className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <Link 
                  href="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-${currentRole.color}-600 hover:bg-${currentRole.color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${currentRole.color}-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to {currentRole.title}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Need access? Contact your administrator for credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 