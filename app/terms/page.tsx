import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/signup" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to signup
          </Link>
          
          <h1 className="text-4xl font-light text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 font-light">Effective date: January 1, 2024</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-light text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              By accessing and using LearnTechLab's services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              LearnTechLab provides online learning courses, hands-on labs, and certification programs in technology fields including AI development, cloud computing, and networking.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              To access certain features of our service, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">4. Course Access and Content</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Upon enrollment, you gain access to course materials for the duration specified in your enrollment terms. All course content is proprietary and protected by intellectual property laws.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">5. Payment and Refunds</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Course fees are due upon enrollment. Refund policies vary by course and are clearly stated at the time of purchase.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">6. Prohibited Uses</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              You may not use our service for any unlawful purpose or to violate any local, state, national, or international law.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">7. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@learntechlab.com" className="text-blue-600 hover:text-blue-500">
                legal@learntechlab.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 