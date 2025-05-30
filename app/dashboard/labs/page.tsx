import { 
  ArrowLeft,
  Play,
  CheckCircle,
  Clock, 
  Code, 
  Calendar,
  TrendingUp,
  Star,
  Monitor,
  Cpu,
  ChevronRight,
  Lock,
  Trophy,
  Terminal,
  Cloud,
  Bot,
  GitBranch,
  Zap,
  Settings,
  Users,
  Globe
} from "lucide-react"
import Link from "next/link"

// Mock data for labs
const labCategories = [
  {
    id: "ai-development",
    title: "AI Development Labs",
    description: "Hands-on projects with Amazon Q Developer, Cursor, and AI tools",
    color: "from-blue-600 to-purple-600",
    icon: Bot,
    totalLabs: 8,
    completedLabs: 5
  },
  {
    id: "aws-cloud",
    title: "AWS Cloud Labs",
    description: "Real AWS environments for cloud computing practice",
    color: "from-orange-500 to-red-600",
    icon: Cloud,
    totalLabs: 6,
    completedLabs: 2
  },
  {
    id: "networking",
    title: "Network Security Labs",
    description: "Virtual network environments and security simulations",
    color: "from-green-500 to-teal-600",
    icon: Globe,
    totalLabs: 10,
    completedLabs: 0
  }
]

const featuredLabs = [
  {
    id: 1,
    title: "Build an AI-Powered E-commerce Assistant",
    description: "Create a complete shopping assistant using Amazon Q Developer and modern AI tools",
    program: "AI Development",
    difficulty: "Intermediate",
    duration: "4-6 hours",
    status: "available",
    tools: ["Amazon Q Developer", "Cursor IDE", "Supabase", "V0 by Vercel"],
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&crop=center",
    participants: 234,
    rating: 4.8
  },
  {
    id: 2,
    title: "Deploy Serverless AI App on AWS",
    description: "Learn to deploy AI applications using AWS Lambda, API Gateway, and serverless architecture",
    program: "AWS Cloud",
    difficulty: "Advanced",
    duration: "3-4 hours",
    status: "available",
    tools: ["AWS Lambda", "API Gateway", "DynamoDB", "CloudFormation"],
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&crop=center",
    participants: 187,
    rating: 4.9
  },
  {
    id: 3,
    title: "AI Project Management Dashboard",
    description: "Build a comprehensive dashboard for managing AI projects and team collaboration",
    program: "CPMAI",
    difficulty: "Intermediate",
    duration: "5-7 hours",
    status: "current",
    tools: ["React", "Node.js", "MongoDB", "Chart.js"],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center",
    participants: 156,
    rating: 4.7
  },
  {
    id: 4,
    title: "Secure Network Architecture Design",
    description: "Design and implement enterprise-grade network security using virtual lab environments",
    program: "Networking",
    difficulty: "Advanced", 
    duration: "6-8 hours",
    status: "locked",
    tools: ["Cisco Packet Tracer", "pfSense", "Wireshark", "Nmap"],
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop&crop=center",
    participants: 98,
    rating: 4.6
  }
]

const labEnvironments = [
  {
    id: "aws-sandbox",
    name: "AWS Sandbox Environment",
    description: "Full AWS account with $100 monthly credits",
    status: "active",
    expires: "28 days remaining",
    icon: Cloud
  },
  {
    id: "coding-workspace",
    name: "AI Development Workspace",
    description: "Pre-configured environment with all AI tools",
    status: "active", 
    expires: "Always available",
    icon: Code
  },
  {
    id: "network-lab",
    name: "Virtual Network Lab",
    description: "Cisco and security simulation environment",
    status: "available",
    expires: "Activate when needed",
    icon: Globe
  }
]

export default function LabsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center mb-4">
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">Hands-on Labs</h1>
              <p className="text-gray-600 font-light">Practice with real-world projects and live environments</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-light text-gray-900">7/24</div>
                <div className="text-sm text-gray-600">Labs Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Lab Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Lab Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {labCategories.map((category) => (
              <Link 
                key={category.id}
                href={`/dashboard/labs/${category.id}`}
                className="group"
              >
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white hover:scale-105 transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-4">
                    <category.icon className="w-8 h-8" />
                    <div className="text-right">
                      <div className="text-2xl font-light">{category.completedLabs}/{category.totalLabs}</div>
                      <div className="text-xs opacity-80">Completed</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{category.description}</p>
                  
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(category.completedLabs / category.totalLabs) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Lab Environments */}
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Your Lab Environments</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {labEnvironments.map((env) => (
              <div key={env.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <env.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    env.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {env.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{env.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{env.description}</p>
                <p className="text-xs text-gray-500 mb-4">{env.expires}</p>
                
                <button className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                  env.status === 'active' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}>
                  {env.status === 'active' ? 'Access Environment' : 'Activate'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Labs */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-gray-900">Featured Labs</h2>
            <Link href="/dashboard/labs/all" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View all labs
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredLabs.map((lab) => (
              <div key={lab.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${lab.thumbnail})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lab.status === 'available' ? 'bg-green-100 text-green-800' :
                        lab.status === 'current' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lab.status === 'locked' ? 'Locked' : lab.status === 'current' ? 'In Progress' : 'Available'}
                      </span>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center text-white text-sm space-x-4">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {lab.participants}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {lab.rating}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {lab.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-600">{lab.program}</span>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      lab.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      lab.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lab.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{lab.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{lab.description}</p>
                  
                  {/* Tools Used */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Tools & Technologies:</p>
                    <div className="flex flex-wrap gap-1">
                      {lab.tools.map((tool, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button 
                      disabled={lab.status === 'locked'}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center ${
                        lab.status === 'locked' 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : lab.status === 'current'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      {lab.status === 'locked' ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </>
                      ) : lab.status === 'current' ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Continue Lab
                        </>
                      ) : (
                        <>
                          <Monitor className="w-4 h-4 mr-2" />
                          Start Lab
                        </>
                      )}
                    </button>
                    
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lab Statistics */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Your Lab Progress</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-light text-gray-900 mb-1">7</div>
              <div className="text-sm text-gray-600">Labs Completed</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-light text-gray-900 mb-1">42h</div>
              <div className="text-sm text-gray-600">Hands-on Time</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Code className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-light text-gray-900 mb-1">15</div>
              <div className="text-sm text-gray-600">Projects Built</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <GitBranch className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-2xl font-light text-gray-900 mb-1">3</div>
              <div className="text-sm text-gray-600">Skill Levels Gained</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 