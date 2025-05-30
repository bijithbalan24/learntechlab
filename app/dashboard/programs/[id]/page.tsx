import { 
  ArrowLeft,
  BookOpen, 
  Play,
  CheckCircle,
  Clock, 
  Users, 
  Code, 
  Calendar,
  TrendingUp,
  Star,
  Download,
  Video,
  FileText,
  Cpu,
  ChevronRight,
  Lock,
  Trophy,
  Monitor,
  Headphones
} from "lucide-react"
import Link from "next/link"

// Mock data for program details
const programData = {
  "ai-development": {
    title: "Building Applications with AI",
    instructor: "Dr. Sarah Chen",
    progress: 68,
    totalModules: 12,
    completedModules: 8,
    estimatedHours: 48,
    difficulty: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&crop=center",
    modules: [
      {
        id: 1,
        title: "Introduction to AI Development",
        duration: "2h 30m",
        status: "completed",
        type: "video",
        description: "Overview of AI development landscape and tools"
      },
      {
        id: 2,
        title: "Setting Up Your Development Environment",
        duration: "1h 45m",
        status: "completed",
        type: "hands-on",
        description: "Configure Amazon Q Developer and Cursor IDE"
      },
      {
        id: 3,
        title: "Your First AI-Powered Application",
        duration: "3h 15m",
        status: "completed",
        type: "project",
        description: "Build a simple chatbot using AI tools"
      },
      {
        id: 4,
        title: "Working with Amazon Q Developer",
        duration: "2h 20m",
        status: "completed",
        type: "video",
        description: "Advanced features and best practices"
      },
      {
        id: 5,
        title: "Cursor IDE Mastery",
        duration: "2h 10m",
        status: "completed",
        type: "hands-on",
        description: "AI-assisted coding and productivity features"
      },
      {
        id: 6,
        title: "Building with V0 by Vercel",
        duration: "1h 50m",
        status: "completed",
        type: "project",
        description: "Rapid prototyping and UI generation"
      },
      {
        id: 7,
        title: "Backend with Supabase",
        duration: "2h 40m",
        status: "completed",
        type: "hands-on",
        description: "Database setup and AI integration"
      },
      {
        id: 8,
        title: "Advanced AI Integration Patterns",
        duration: "3h 00m",
        status: "completed",
        type: "video",
        description: "Complex AI workflows and optimization"
      },
      {
        id: 9,
        title: "Portfolio Project: E-commerce AI Assistant",
        duration: "4h 30m",
        status: "current",
        type: "project",
        description: "Build a complete AI-powered shopping assistant"
      },
      {
        id: 10,
        title: "Deployment and Production",
        duration: "2h 15m",
        status: "locked",
        type: "hands-on",
        description: "Deploy your AI application to production"
      },
      {
        id: 11,
        title: "Performance Optimization",
        duration: "1h 45m",
        status: "locked",
        type: "video",
        description: "Optimize AI models and application performance"
      },
      {
        id: 12,
        title: "Final Project & Certification",
        duration: "5h 00m",
        status: "locked",
        type: "project",
        description: "Capstone project for course completion"
      }
    ],
    resources: [
      {
        title: "Course Handbook",
        type: "pdf",
        size: "2.4 MB",
        downloadUrl: "#"
      },
      {
        title: "Code Examples Repository",
        type: "github",
        size: "15 files",
        downloadUrl: "#"
      },
      {
        title: "AI Development Toolkit",
        type: "tools",
        size: "Various",
        downloadUrl: "#"
      }
    ],
    upcomingClasses: [
      {
        title: "Live Coding: Building E-commerce AI Assistant",
        date: "Today 2:00 PM",
        duration: "2 hours",
        type: "live"
      },
      {
        title: "Q&A Session with Dr. Sarah Chen",
        date: "Tomorrow 10:00 AM", 
        duration: "1 hour",
        type: "office-hours"
      }
    ]
  }
}

export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  const program = programData[params.id as keyof typeof programData]
  
  if (!program) {
    return <div>Program not found</div>
  }

  const currentModule = program.modules.find(m => m.status === 'current')

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
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-xl bg-cover bg-center border border-gray-200"
                     style={{ backgroundImage: `url(${program.thumbnail})` }}>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-light text-gray-900 mb-2">{program.title}</h1>
                  <p className="text-gray-600 font-light mb-3">Instructor: {program.instructor}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {program.estimatedHours} hours
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {program.difficulty}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {program.totalModules} modules
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              {/* Progress Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="text-center mb-4">
                  <div className="text-3xl font-light text-gray-900 mb-1">{program.progress}%</div>
                  <p className="text-gray-600 font-light">Course Progress</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${program.progress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 text-center">
                  {program.completedModules} of {program.totalModules} modules completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2">
            {/* Continue Learning Section */}
            {currentModule && (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Continue Learning</h3>
                    <p className="text-blue-100 mb-1">Module {currentModule.id}: {currentModule.title}</p>
                    <p className="text-blue-200 text-sm">{currentModule.description}</p>
                  </div>
                  <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-medium transition-colors flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    Resume
                  </button>
                </div>
              </div>
            )}

            {/* Course Modules */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8">
              <h2 className="text-2xl font-light text-gray-900 mb-6">Course Modules</h2>
              
              <div className="space-y-3">
                {program.modules.map((module) => (
                  <div 
                    key={module.id}
                    className={`border rounded-xl p-4 transition-all duration-200 ${
                      module.status === 'completed' ? 'border-green-200 bg-green-50' :
                      module.status === 'current' ? 'border-blue-200 bg-blue-50' :
                      'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          module.status === 'completed' ? 'bg-green-100' :
                          module.status === 'current' ? 'bg-blue-100' :
                          'bg-gray-100'
                        }`}>
                          {module.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : module.status === 'current' ? (
                            <Play className="w-6 h-6 text-blue-600" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className={`font-medium ${
                              module.status === 'locked' ? 'text-gray-400' : 'text-gray-900'
                            }`}>
                              Module {module.id}: {module.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                              module.type === 'video' ? 'bg-purple-100 text-purple-800' :
                              module.type === 'hands-on' ? 'bg-blue-100 text-blue-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {module.type === 'hands-on' ? 'Lab' : module.type}
                            </span>
                          </div>
                          <p className={`text-sm ${
                            module.status === 'locked' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {module.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-sm ${
                          module.status === 'locked' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {module.duration}
                        </div>
                        {module.status !== 'locked' && (
                          <button className={`mt-2 px-4 py-1 rounded-lg text-xs font-medium transition-colors ${
                            module.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                            module.status === 'current' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                            'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}>
                            {module.status === 'completed' ? 'Review' : module.status === 'current' ? 'Continue' : 'Start'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Resources */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-2xl font-light text-gray-900 mb-6">Learning Resources</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {program.resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        {resource.type === 'pdf' && <FileText className="w-5 h-5 text-blue-600" />}
                        {resource.type === 'github' && <Code className="w-5 h-5 text-blue-600" />}
                        {resource.type === 'tools' && <Cpu className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.size}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* Upcoming Classes */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Classes</h3>
              
              <div className="space-y-4">
                {program.upcomingClasses.map((class_, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{class_.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 space-x-3">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {class_.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {class_.duration}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        class_.type === 'live' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {class_.type === 'office-hours' ? 'Q&A' : class_.type}
                      </span>
                    </div>
                    <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center">
                      <Video className="w-3 h-3 mr-1" />
                      Join Class
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link href="/dashboard/discussion" className="flex items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <Users className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium text-gray-900">Discussion Forum</span>
                </Link>
                
                <Link href="/dashboard/assignments" className="flex items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <Trophy className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="font-medium text-gray-900">Assignments</span>
                </Link>
                
                <Link href="/dashboard/support" className="flex items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <Headphones className="w-5 h-5 text-green-600 mr-3" />
                  <span className="font-medium text-gray-900">Get Help</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 