import { Construction, ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"

interface ComingSoonProps {
  title?: string
  description?: string
  expectedDate?: string
  showBackButton?: boolean
}

export function ComingSoon({ 
  title = "Coming Soon", 
  description = "We're working hard to bring you this feature.",
  expectedDate = "30 Jun 2025",
  showBackButton = true 
}: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Expected Launch</h3>
            <p className="text-blue-600 font-medium">{expectedDate}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            We're building something amazing for the <strong>LearnTechLab</strong> community. 
            This page will be updated soon with exciting new features and content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {showBackButton && (
              <Link 
                href="/" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg inline-flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            )}
            
            <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-all">
              Notify Me When Ready
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Have questions? Reach out to us at{" "}
            <a href="mailto:info@learntechlab.com" className="text-blue-600 hover:text-blue-700 font-medium">
              info@learntechlab.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 