"use client"

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { User, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user, logout } = useAuth()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            LearnTechLab
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/programs" className="text-gray-600 hover:text-gray-900 transition-colors">
              Programs
            </Link>
            <Link href="/business" className="text-gray-600 hover:text-gray-900 transition-colors">
              Business
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
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
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/login" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/contact" 
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full font-medium transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-2">
              <Link 
                href="/programs" 
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Programs
              </Link>
              <Link 
                href="/business" 
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Business
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                About
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="px-3 py-2 text-sm text-gray-900">
                    {user.first_name} {user.last_name} ({user.role})
                  </div>
                  <button
                    onClick={() => {
                      setShowMobileMenu(false)
                      handleLogout()
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <Link 
                    href="/login" 
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block px-3 py-2 bg-gray-900 text-white rounded-lg mx-3 text-center transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 