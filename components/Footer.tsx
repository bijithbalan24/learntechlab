import Link from "next/link"
import { Globe, Mail, Phone, MapPin } from "lucide-react"

const footerSections = [
  {
    title: "Programs",
    links: [
      { name: "Building Applications with AI", href: "/programs/ai-development" },
      { name: "CPMAI Certification", href: "/programs/cpmai" },
      { name: "AWS Cloud Computing", href: "/programs/aws" },
      { name: "Network Infrastructure & Security", href: "/programs/networking" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About LearnTechLab", href: "/about" },
      { name: "Success Stories", href: "/success-stories" },
      { name: "Business Solutions", href: "/business" },
      { name: "Contact Us", href: "/contact" }
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/contact" },
      { name: "Course Support", href: "/contact" },
      { name: "Technical Issues", href: "/contact" },
      { name: "Schedule Demo", href: "/business" }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-semibold text-gray-900 tracking-tight">
                LearnTechLab
              </span>
            </Link>
            
            <p className="text-gray-600 font-light leading-relaxed mb-6 max-w-md">
              Global leader in AI-driven technology education. Empowering learners worldwide 
              through cutting-edge training and innovation-focused programs.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 text-sm">
                <Globe className="w-4 h-4 mr-3 text-blue-600" />
                <span>Innovation Accessible to All</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="w-4 h-4 mr-3 text-blue-600" />
                <a href="mailto:hello@learntechlab.com" className="hover:text-blue-600 transition-colors">
                  hello@learntechlab.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-900 font-semibold mb-4 text-sm tracking-wide uppercase">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 text-sm font-light transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-500">
              <p>© 2024 LearnTechLab. All rights reserved.</p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/accessibility" className="hover:text-blue-600 transition-colors">
                  Accessibility
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Built with cutting-edge AI tools
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 