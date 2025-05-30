import { Construction, Mail, Calendar } from "lucide-react"
import Link from "next/link"

interface ComingSoonProps {
  title: string
  description?: string
  expectedDate?: string
}

export default function ComingSoon({ 
  title, 
  description = "We're working hard to bring you something amazing.", 
  expectedDate = "30 Jun 2025" 
}: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Apple Style */}
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Construction className="w-12 h-12 text-blue-600" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
              {title}
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* Expected Launch */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-12 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600 tracking-wide uppercase">
                Expected Launch
              </span>
            </div>
            <div className="text-2xl font-light text-gray-900">{expectedDate}</div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/programs"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
            >
              Explore Other Programs
            </Link>
            <Link
              href="/contact"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
            >
              Get Notified
            </Link>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <p className="text-gray-600 mb-4 font-light">
              Have questions? We'd love to hear from you.
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Mail className="w-4 h-4" />
              <a 
                href="mailto:info@learntechlab.com"
                className="text-blue-600 hover:text-blue-500 transition-colors"
              >
                info@learntechlab.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </div>
  )
} 