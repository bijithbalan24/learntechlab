"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Mail, 
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock
} from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <h2 className="mt-6 text-center text-3xl font-light text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-light max-w-sm mx-auto">
            We've sent password reset instructions to <strong>{email}</strong>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900 mb-1">
                      What to do next
                    </h3>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p>1. Check your email inbox (and spam folder)</p>
                      <p>2. Click the reset link in the email</p>
                      <p>3. Follow the instructions to create a new password</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Didn't receive the email? Check your spam folder or
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail("")
                  }}
                  className="text-blue-600 hover:text-blue-500 font-medium text-sm transition-colors"
                >
                  Try again with a different email
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <Link 
                  href="/login"
                  className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="font-semibold text-gray-900 text-2xl">LearnTechLab</span>
          </Link>
        </div>
        
        <h2 className="mt-8 text-center text-3xl font-light text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 font-light">
          Enter your email and we'll send you reset instructions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending instructions...
                </>
              ) : (
                <>
                  Send reset instructions
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link 
              href="/login" 
              className="flex items-center justify-center text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to sign in
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need help?</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              If you're having trouble accessing your account, you can{' '}
              <Link href="/contact" className="text-blue-600 hover:text-blue-500">
                contact our support team
              </Link>{' '}
              for assistance.
            </p>
            <p>
              Don't have an account yet?{' '}
              <Link href="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 