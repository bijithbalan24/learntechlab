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
  Cpu
} from "lucide-react"
import Link from "next/link"

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
    <div className="min-h-screen bg-white">
      {/* Hero Section - Updated with Vision */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
                <Bot className="w-4 h-4 mr-2" />
                🚀 Global Leader in AI-Driven Tech Education
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Master the Future of{' '}
                <span className="text-gradient-brand">AI Development</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
                Transform your career with cutting-edge AI tools like <strong>Amazon Q Developer</strong>, <strong>Cursor</strong>, 
                and <strong>Large Language Models</strong>. Learn through hands-on, project-based training 
                where innovation meets accessibility.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/programs/ai-development" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl">
                Start Building with AI
              </Link>
              <Link href="/business" className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                For Business Solutions
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-8 text-gray-600 flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium">2,500+ Global Learners</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">4.9 (1,200+ reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Innovation Accessible to All</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured AI Tools Section - New */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Cutting-Edge Tools
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Learn with <span className="text-blue-600">Next-Generation</span> AI Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the tools that are shaping the future of development. Train with the same AI platforms used by industry leaders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Amazon Q Developer</h3>
              <p className="text-gray-600 mb-4">Intelligent coding assistance and cloud-native workflows for modern development.</p>
              <div className="text-sm text-orange-600 font-medium">AI Coding Assistant</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cursor IDE</h3>
              <p className="text-gray-600 mb-4">AI-first integrated development environment built for modern full-stack development.</p>
              <div className="text-sm text-blue-600 font-medium">AI-First IDE</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">V0 by Vercel</h3>
              <p className="text-gray-600 mb-4">Rapid prototyping and deployment platform for building modern web applications.</p>
              <div className="text-sm text-purple-600 font-medium">Rapid Prototyping</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Supabase</h3>
              <p className="text-gray-600 mb-4">Backend-as-a-service platform for building scalable applications with AI integration.</p>
              <div className="text-sm text-green-600 font-medium">Backend-as-a-Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section - Updated with AI focus */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Flagship Programs
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Train <span className="text-purple-600">Builders & Innovators</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don&apos;t just teach tech—we train builders, innovators, and future-ready professionals. 
              From concept to deployed product using AI as your co-developer.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Development Program - Enhanced */}
            <div className="relative bg-white border-2 border-blue-200 rounded-2xl p-8 hover:shadow-2xl transition-all hover:border-blue-300">
              <div className="absolute -top-4 left-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  🚀 FLAGSHIP COURSE
                </span>
              </div>
              
              <div className="mb-6 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    AI Development
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Building Applications with AI
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Go from concept to deployed product using AI as a co-developer. 
                  Master the exact tools used by industry leaders, accessible even without traditional programming background.
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-6 text-gray-600 mb-6">
                  <span className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>8 weeks</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Jul 15, 2025</span>
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">All Levels</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold text-lg">4.9</span>
                    <span className="text-gray-600">(127 reviews)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 line-through text-sm">$2,499</div>
                    <div className="text-3xl font-bold text-gray-900">$1,999</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Cpu className="w-5 h-5 mr-2 text-blue-600" />
                    AI Development Tools:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {programs[0].tools.map((tool) => (
                      <div key={tool} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                        <span className="text-sm text-gray-700">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Link href="/programs/ai-development" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg text-center">
                  Start Building
                </Link>
                <Link href="/programs/ai-development" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-semibold transition-all text-center">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Other Programs Grid */}
            <div className="space-y-6">
              {programs.slice(1, 3).map((program) => (
                <div key={program.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {program.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{program.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{program.duration}</span>
                      <span>{program.level}</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">${program.price}</div>
                  </div>
                  
                  <Link href={`/programs/${program.id === 'cpmai' ? 'cpmai' : program.id === 'aws-cloud' ? 'aws' : 'networking'}`} className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg font-medium transition-colors block text-center">
                    View Program
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/programs" className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
              View All Programs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Proven Results
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success That Speaks
            </h2>
            <p className="text-xl text-gray-600">
              Our learners achieve remarkable career growth worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={metric.label} className="text-center bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`text-4xl font-bold mb-2 ${index % 2 === 0 ? 'text-blue-600' : 'text-purple-600'}`}>
                  {metric.value}
                </div>
                <div className="font-semibold text-gray-900 mb-1">{metric.label}</div>
                <div className="text-sm text-gray-600">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Enterprise Solutions
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transform Your <span className="text-orange-600">Entire Organization</span>
            </h2>
            <p className="text-xl text-gray-600">
              Equip your teams with cutting-edge AI development skills and future-ready capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessFeatures.map((feature) => (
              <div key={feature.title} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/business" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Schedule Enterprise Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Statement CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Innovation is <span className="text-yellow-300">Accessible to All</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl mx-auto">
            Join our global community of learners mastering AI-driven development, cloud computing, 
            and networking. Transform your career with hands-on training and cutting-edge tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programs" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Start Your Journey →
            </Link>
            <Link href="/business" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
