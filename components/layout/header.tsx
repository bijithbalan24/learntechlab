"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, BookOpen, Users, Building2, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    title: "Programs",
    href: "/programs",
    description: "Explore our comprehensive learning programs",
    items: [
      {
        title: "AI Development",
        href: "/programs/ai-development",
        description: "Building applications with AI",
        icon: Zap,
      },
      {
        title: "CPMAI Certification",
        href: "/programs/cpmai",
        description: "AI Project Management certification",
        icon: BookOpen,
      },
      {
        title: "AWS Cloud Computing",
        href: "/programs/aws",
        description: "Cloud computing with AWS",
        icon: Building2,
      },
      {
        title: "Networking",
        href: "/programs/networking",
        description: "Network infrastructure and security",
        icon: Users,
      },
    ],
  },
  {
    title: "For Business",
    href: "/business",
    description: "Corporate training solutions",
  },
  {
    title: "Success Stories",
    href: "/success-stories",
    description: "Alumni achievements and testimonials",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn about learntechlab",
  },
]

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm",
        className
      )}
      style={{ borderColor: 'hsl(214.3 31.8% 91.4%)' }}
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-sm">
            LT
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            learntechlab
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <div className="relative group">
            <button 
              className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              onMouseEnter={() => setIsProgramsOpen(true)}
              onMouseLeave={() => setIsProgramsOpen(false)}
            >
              <span>Programs</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {/* Dropdown */}
            {isProgramsOpen && (
              <div 
                className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
                onMouseEnter={() => setIsProgramsOpen(true)}
                onMouseLeave={() => setIsProgramsOpen(false)}
              >
                <div className="grid grid-cols-1 gap-3">
                  {navigation[0].items?.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navigation.slice(1).map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === item.href ? "text-blue-600" : "text-gray-600"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800" asChild>
            <Link href="/programs">Explore Programs</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <div key={item.title}>
                <Link
                  href={item.href}
                  className="block py-2 text-base font-medium text-gray-600 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
                {item.items && (
                  <div className="ml-4 space-y-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white" asChild>
                <Link href="/programs">Explore Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 