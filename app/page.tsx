import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Star, 
  Clock, 
  Calendar,
  ArrowRight,
  Globe,
  Shield,
  Zap,
  Code,
  Cloud,
  Bot,
  Cpu,
  ChevronRight,
  GraduationCap,
  UserCheck,
  Settings
} from "lucide-react"
import Link from "next/link"
import SlidingTiles from "@/components/SlidingTiles"

const programs = [
  {
    id: "ai-development",
    title: "Building Applications with AI",
    description: "Go from concept to deployed product using AI as a co-developer. Master Amazon Q Developer, Cursor, and modern AI-assisted development.",
    duration: "8 weeks",
    nextCohort: "Jul 15, 2025",
    level: "All Levels",
    price: 1999,
    originalPrice: 2499,
    rating: 4.9,
    reviews: 127,
    enrollments: 890,
    category: "AI Development",
    features: ["Amazon Q Developer", "Cursor IDE", "Replit & V0 by Vercel", "Supabase Backend"],
    tools: ["🤖 Amazon Q Developer", "⚡ Cursor IDE", "🚀 V0 by Vercel", "💾 Supabase"],
    isPopular: true,
    image: "/images/programs/ai-development.jpg"
  },
  {
    id: "cpmai",
    title: "CPMAI Certification",
    description: "Lead AI initiatives at scale. Comprehensive certification program with hands-on AI project management experience.",
    duration: "6 weeks",
    nextCohort: "Jul 15, 2025",
    level: "Advanced",
    price: 1799,
    rating: 4.8,
    reviews: 89,
    enrollments: 456,
    category: "AI Project Management",
    features: ["Industry certification", "AI leadership skills", "Case studies", "Networking opportunities"],
    tools: ["📊 AI Project Tools", "🎯 Strategic Planning", "👥 Team Leadership", "📈 ROI Measurement"],
    image: "/images/programs/cpmai.jpg"
  },
  {
    id: "aws-cloud",
    title: "AWS Cloud Computing",
    description: "Master cloud-native development with AWS services integrated with AI development workflows and modern deployment.",
    duration: "4 weeks",
    nextCohort: "Jul 20, 2025",
    level: "Beginner",
    price: 1299,
    rating: 4.9,
    reviews: 234,
    enrollments: 1245,
    category: "Cloud Computing",
    features: ["AWS certification", "Cloud-native AI", "DevOps integration", "24/7 support"],
    tools: ["☁️ AWS Services", "🔧 DevOps Tools", "🏗️ Infrastructure", "🔒 Security"],
    image: "/images/programs/aws-cloud.jpg"
  },
  {
    id: "networking",
    title: "Network Infrastructure & Security",
    description: "Build secure, scalable networks for modern AI and cloud applications with hands-on lab experience.",
    duration: "10 weeks",
    nextCohort: "Aug 1, 2025",
    level: "Intermediate",
    price: 1699,
    rating: 4.7,
    reviews: 156,
    enrollments: 678,
    category: "Networking",
    features: ["CompTIA preparation", "Security focus", "Lab environments", "Modern protocols"],
    tools: ["🌐 Network Security", "🛡️ Cybersecurity", "🔌 Infrastructure", "📡 Protocols"],
    image: "/images/programs/networking.jpg"
  }
]

const successMetrics = [
  { label: "Success Rate", value: "94%", description: "Course completion rate" },
  { label: "Career Growth", value: "87%", description: "Received promotions within 6 months" },
  { label: "Salary Increase", value: "42%", description: "Average salary increase" },
  { label: "Job Placement", value: "91%", description: "Found new roles within 3 months" }
]

const businessFeatures = [
  {
    icon: Users,
    title: "Unlimited Team Access",
    description: "Provide your entire workforce with access to our comprehensive learning library"
  },
  {
    icon: BookOpen,
    title: "700+ Monthly Classes",
    description: "Access to live and interactive classes across AI, cloud, networking, and digital skills"
  },
  {
    icon: TrendingUp,
    title: "Proven ROI",
    description: "95% course completion rate and measurable business impact"
  },
  {
    icon: Shield,
    title: "Enterprise Support",
    description: "Dedicated account management and 24/7 technical support"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Apple-inspired */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 leading-none">
              Master the Future
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 text-blue-400">
              of AI Development
            </h2>
            <p className="text-xl md:text-2xl font-light text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Transform your career with cutting-edge AI tools. Learn through hands-on, project-based training where innovation meets accessibility.
            </p>
            
            <div className="text-sm text-gray-400 space-y-2">
              <p>Cutting-edge tools by Amazon Q Developer, Cursor, and Vercel</p>
              <div className="flex items-center justify-center space-x-8 text-xs">
                <span>2,500+ Global Learners</span>
                <span>•</span>
                <span>4.9★ Rating</span>
                <span>•</span>
                <span>Innovation Accessible to All</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section - Apple Product Grid Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Next-Generation AI Tools
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              Master the tools that are shaping the future of development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Bot, title: "Amazon Q Developer", desc: "Intelligent coding assistance", color: "orange" },
              { icon: Code, title: "Cursor IDE", desc: "AI-first development", color: "blue" },
              { icon: Zap, title: "V0 by Vercel", desc: "Rapid prototyping", color: "purple" },
              { icon: Cloud, title: "Supabase", desc: "Backend-as-a-Service", color: "green" }
            ].map((tool, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-${tool.color}-100`}>
                  <tool.icon className={`w-7 h-7 text-${tool.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{tool.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apple-Style Sliding Tiles */}
      <SlidingTiles />
    </div>
  )
}
