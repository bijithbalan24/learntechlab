import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalMain from "@/components/ConditionalMain";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "LearnTechLab - Master the Future of AI Development",
  description: "Global leader in AI-driven technology education. Transform your career with cutting-edge tools like Amazon Q Developer, Cursor, and Large Language Models. Innovation accessible to all.",
  keywords: "AI development, programming courses, Amazon Q Developer, Cursor IDE, technology education, coding bootcamp, AI training",
  authors: [{ name: "LearnTechLab" }],
  creator: "LearnTechLab",
  publisher: "LearnTechLab",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learntechlab.com",
    title: "LearnTechLab - Master the Future of AI Development",
    description: "Transform your career with cutting-edge AI tools. Learn through hands-on, project-based training where innovation meets accessibility.",
    siteName: "LearnTechLab",
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnTechLab - Master the Future of AI Development",
    description: "Transform your career with cutting-edge AI tools. Innovation accessible to all.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-gray-900 font-apple">
        <AuthProvider>
          <ConditionalHeader />
          <ConditionalMain>
            {children}
          </ConditionalMain>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
