import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: "learntechlab - Master the Future of Technology",
    template: "%s | learntechlab"
  },
  description: "Transform your career with industry-leading programs in AI, Cloud Computing, and Advanced Networking. Learn from certified experts with hands-on labs and real-world projects.",
  keywords: [
    "AI development",
    "CPMAI certification", 
    "AWS cloud computing",
    "networking certification",
    "technology training",
    "online learning",
    "career advancement"
  ],
  authors: [{ name: "learntechlab" }],
  creator: "learntechlab",
  publisher: "learntechlab",
  metadataBase: new URL("https://learntechlab.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learntechlab.com",
    siteName: "learntechlab",
    title: "learntechlab - Master the Future of Technology",
    description: "Transform your career with industry-leading programs in AI, Cloud Computing, and Advanced Networking.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "learntechlab - Technology Training Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "learntechlab - Master the Future of Technology",
    description: "Transform your career with industry-leading programs in AI, Cloud Computing, and Advanced Networking.",
    images: ["/og-image.jpg"],
    creator: "@learntechlab",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification-code-here",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Header />
        <main>{children}</main>
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-sm">
                    LT
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">learntechlab</span>
                </div>
                <p className="text-sm text-gray-600">
                  Transforming careers through innovative technology education and industry-leading programs.
                </p>
              </div>

              {/* Programs */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Programs</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/programs/ai-development" className="hover:text-blue-600 transition-colors">AI Development</a></li>
                  <li><a href="/programs/cpmai" className="hover:text-blue-600 transition-colors">CPMAI Certification</a></li>
                  <li><a href="/programs/aws" className="hover:text-blue-600 transition-colors">AWS Cloud Computing</a></li>
                  <li><a href="/programs/networking" className="hover:text-blue-600 transition-colors">Networking</a></li>
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Company</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/about" className="hover:text-blue-600 transition-colors">About Us</a></li>
                  <li><a href="/success-stories" className="hover:text-blue-600 transition-colors">Success Stories</a></li>
                  <li><a href="/business" className="hover:text-blue-600 transition-colors">For Business</a></li>
                  <li><a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Support</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/help" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                  <li><a href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                  <li><a href="/blog" className="hover:text-blue-600 transition-colors">Blog</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
              <p>&copy; 2025 learntechlab. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
