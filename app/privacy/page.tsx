import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/signup" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to signup
          </Link>
          
          <h1 className="text-4xl font-light text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 font-light">Effective date: January 1, 2024</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-light text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support. This includes your name, email address, and learning progress.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, process transactions, send course updates, and provide customer support.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">5. Cookies and Tracking</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your learning experience, remember your preferences, and analyze how our services are used.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              You have the right to access, update, or delete your personal information. You can manage your account settings or contact us for assistance with these requests.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">7. Changes to This Policy</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-4">8. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@learntechlab.com" className="text-blue-600 hover:text-blue-500">
                privacy@learntechlab.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 