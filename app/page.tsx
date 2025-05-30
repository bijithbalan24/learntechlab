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
  ChevronRight
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/programs/ai-development" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
              >
                Start Building
              </Link>
              <Link 
                href="/programs" 
                className="border border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
              >
                Learn more
                <ChevronRight className="w-5 h-5 inline ml-2" />
              </Link>
            </div>

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

      {/* Other Programs - Clean Card Layout */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              More Programs
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Comprehensive training for every stage of your journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(1).map((program) => (
              <div key={program.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-8">
                  <div className="text-sm font-medium text-purple-600 mb-3 tracking-wide uppercase">
                    {program.category}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{program.title}</h3>
                  <p className="text-gray-600 font-light mb-6 leading-relaxed">{program.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-900">{program.rating}</span>
                    </div>
                    <div className="text-2xl font-light text-gray-900">${program.price}</div>
                  </div>
                  
                  <Link 
                    href={`/programs/${program.id === 'cpmai' ? 'cpmai' : program.id === 'aws-cloud' ? 'aws' : 'networking'}`} 
                    className="block w-full bg-gray-900 hover:bg-gray-800 text-white text-center py-3 rounded-full font-medium transition-all duration-300"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics - Apple Stats Style */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Success That Speaks
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Our learners achieve remarkable career growth worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={metric.label} className="text-center">
                <div className="text-5xl font-light text-blue-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-medium text-gray-900 mb-1">{metric.label}</div>
                <div className="text-sm text-gray-600 font-light">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Solutions */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              For Enterprise
            </h2>
            <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
              Transform your entire organization with cutting-edge AI development training
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {businessFeatures.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/business" 
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA - Apple-style */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
            Innovation is
            <br />
            <span className="text-blue-400">Accessible to All</span>
          </h2>
          <p className="text-xl font-light text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join our global community of learners mastering AI-driven development, cloud computing, and networking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/programs" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
            >
              Start Your Journey
            </Link>
            <Link 
              href="/business" 
              className="border border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
            >
              For Business
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
