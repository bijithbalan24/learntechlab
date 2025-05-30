'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  BookOpen, 
  Bell, 
  Settings, 
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">LearnTechLab</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/courses" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Courses
              </Link>
              {(user.role === 'teacher' || user.role === 'admin') && (
                <Link 
                  href="/dashboard/courses/create" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Create Course
                </Link>
              )}
              {user.role === 'admin' && (
                <Link 
                  href="/dashboard/admin" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <Link 
                  href="/dashboard" 
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/dashboard/courses" 
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Courses
                </Link>
                {(user.role === 'teacher' || user.role === 'admin') && (
                  <Link 
                    href="/dashboard/courses/create" 
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Create Course
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link 
                    href="/dashboard/admin" 
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      {children}
    </div>
  )
} 