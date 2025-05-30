"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

const navigation = [
  {
    name: "Programs",
    href: "/programs",
    submenu: [
      { name: "Building Applications with AI", href: "/programs/ai-development" },
      { name: "CPMAI Certification", href: "/programs/cpmai" },
      { name: "AWS Cloud Computing", href: "/programs/aws" },
      { name: "Network Infrastructure & Security", href: "/programs/networking" }
    ]
  },
  { name: "About", href: "/about" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Business", href: "/business" },
  { name: "Contact", href: "/contact" }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              LearnTechLab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => item.submenu && setOpenSubmenu(item.name)}
                onMouseLeave={() => item.submenu && setOpenSubmenu(null)}
              >
                {item.submenu ? (
                  <>
                    <Link
                      href={item.href}
                      className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200 py-2"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>
                    
                    {/* Apple-style Submenu Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-80 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl py-6 transition-all duration-300 ease-out ${
                        openSubmenu === item.name 
                          ? 'opacity-100 visible translate-y-0' 
                          : 'opacity-0 invisible -translate-y-4 pointer-events-none'
                      }`}
                    >
                      {item.submenu.map((subItem, index) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="group/item block px-6 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 text-sm font-medium transition-all duration-200 rounded-lg mx-2"
                        >
                          <div className="flex items-center justify-between">
                            <span>{subItem.name}</span>
                            <div className="w-4 h-4 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            </div>
                          </div>
                        </Link>
                      ))}
                      
                      {/* Dropdown Arrow */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-4 h-4 bg-white border-l border-t border-gray-200/50 rotate-45 backdrop-blur-xl"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200 py-2"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/programs/ai-development"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Learning
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-100/50"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 transition-all duration-300 ease-out ${
          isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                      className="flex items-center justify-between w-full text-left py-3 px-4 text-gray-900 font-medium text-base rounded-xl hover:bg-gray-100/50 transition-all duration-200"
                    >
                      {item.name}
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                          openSubmenu === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Mobile Submenu */}
                    <div
                      className={`ml-4 space-y-1 transition-all duration-300 ease-out ${
                        openSubmenu === item.name 
                          ? 'max-h-96 opacity-100 visible mt-2' 
                          : 'max-h-0 opacity-0 invisible overflow-hidden'
                      }`}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-3 px-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 font-medium text-sm transition-all duration-200 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3 px-4 text-gray-900 hover:text-blue-600 hover:bg-gray-100/50 font-medium text-base transition-all duration-200 rounded-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          {/* Mobile CTA */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/programs/ai-development"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-full font-medium text-base transition-all duration-300 shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 