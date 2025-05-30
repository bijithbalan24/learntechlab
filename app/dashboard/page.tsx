import { 
  BookOpen, 
  PlayCircle, 
  Trophy, 
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
  Bell,
  Settings,
  User
} from "lucide-react"
import Link from "next/link"

// Mock data - will be replaced with real data from backend
const enrolledPrograms = [
  {
    id: "ai-development",
    title: "Building Applications with AI",
    progress: 68,
    totalModules: 12,
    completedModules: 8,
    nextClass: "2024-01-15T14:00:00Z",
    instructor: "Dr. Sarah Chen",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: "aws-cloud",
    title: "AWS Cloud Computing",
    progress: 34,
    totalModules: 8,
    completedModules: 3,
    nextClass: "2024-01-16T10:00:00Z",
    instructor: "Mark Thompson",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: "cpmai",
    title: "CPMAI Certification",
    progress: 15,
    totalModules: 10,
    completedModules: 1,
    nextClass: "2024-01-18T16:00:00Z",
    instructor: "Lisa Rodriguez",
    status: "just-started",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&crop=center"
  }
]

const upcomingClasses = [
  {
    id: 1,
    title: "Building a Smart Chatbot with Amazon Q",
    program: "AI Development",
    date: "2024-01-15T14:00:00Z",
    duration: "2 hours",
    instructor: "Dr. Sarah Chen",
    type: "live"
  },
  {
    id: 2,
    title: "AWS Lambda Deep Dive",
    program: "AWS Cloud Computing", 
    date: "2024-01-16T10:00:00Z",
    duration: "1.5 hours",
    instructor: "Mark Thompson",
    type: "workshop"
  },
  {
    id: 3,
    title: "AI Project Management Frameworks",
    program: "CPMAI Certification",
    date: "2024-01-18T16:00:00Z",
    duration: "1 hour",
    instructor: "Lisa Rodriguez",
    type: "lecture"
  }
]

const recentActivities = [
  {
    id: 1,
    type: "completion",
    title: "Completed: Introduction to Cursor IDE",
    program: "AI Development",
    timestamp: "2 hours ago",
    points: 50
  },
  {
    id: 2,
    type: "certificate",
    title: "Earned: AWS Fundamentals Certificate",
    program: "AWS Cloud Computing",
    timestamp: "1 day ago",
    points: 100
  },
  {
    id: 3,
    type: "project",
    title: "Submitted: Portfolio Website Project",
    program: "AI Development",
    timestamp: "3 days ago",
    points: 150
  }
]

const learningStats = {
  totalHours: 124,
  completedCourses: 5,
  certificates: 2,
  currentStreak: 12,
  totalPoints: 2450,
  rank: "Advanced Learner"
}

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-light text-gray-900">{learningStats.totalHours}h</span>
          </div>
          <h3 className="font-medium text-gray-900">Total Learning Hours</h3>
          <p className="text-sm text-gray-600 font-light">+24h this month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-light text-gray-900">{learningStats.certificates}</span>
          </div>
          <h3 className="font-medium text-gray-900">Certificates Earned</h3>
          <p className="text-sm text-gray-600 font-light">Industry recognized</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-light text-gray-900">{learningStats.currentStreak}</span>
          </div>
          <h3 className="font-medium text-gray-900">Day Streak</h3>
          <p className="text-sm text-gray-600 font-light">Keep it going!</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-light text-gray-900">{learningStats.totalPoints}</span>
          </div>
          <h3 className="font-medium text-gray-900">Learning Points</h3>
          <p className="text-sm text-gray-600 font-light">{learningStats.rank}</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-100">
        <h1 className="text-3xl font-light text-gray-900 mb-2">Welcome back, Alex</h1>
        <p className="text-gray-600 font-light">Continue your learning journey</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Enrolled Programs */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-gray-900">My Programs</h2>
            <Link href="/programs" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Browse all programs
            </Link>
          </div>

          <div className="space-y-6">
            {enrolledPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-48 h-48 md:h-auto bg-cover bg-center"
                       style={{ backgroundImage: `url(${program.thumbnail})` }}>
                    <div className="w-full h-full bg-gradient-to-tr from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h3>
                        <p className="text-gray-600 font-light">Instructor: {program.instructor}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        program.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {program.status === 'active' ? 'Active' : 'Just Started'}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{program.completedModules}/{program.totalModules} modules</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${program.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{program.progress}% complete</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      <Link 
                        href={`/dashboard/programs/${program.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                      >
                        Continue Learning
                      </Link>
                      <button className="flex items-center text-gray-600 hover:text-gray-800 text-sm transition-colors">
                        <Calendar className="w-4 h-4 mr-1" />
                        Next class: Today 2:00 PM
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-xl font-light text-gray-900 mb-4">Quick Access</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/dashboard/labs" className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Hands-on Labs</h4>
                <p className="text-sm text-gray-600 font-light">Practice with real-world projects</p>
              </Link>

              <Link href="/dashboard/resources" className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Learning Resources</h4>
                <p className="text-sm text-gray-600 font-light">Access study materials and guides</p>
              </Link>

              <Link href="/dashboard/certificates" className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Certificates</h4>
                <p className="text-sm text-gray-600 font-light">Download your achievements</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Upcoming Classes & Activity */}
        <div>
          {/* Upcoming Classes */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Classes</h3>
              <Link href="/dashboard/schedule" className="text-blue-600 hover:text-blue-700 text-sm">
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingClasses.slice(0, 3).map((class_) => (
                <div key={class_.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{class_.title}</h4>
                      <p className="text-xs text-gray-600">{class_.program}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      class_.type === 'live' ? 'bg-red-100 text-red-800' :
                      class_.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {class_.type}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 space-x-3">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Today 2:00 PM
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {class_.duration}
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

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 py-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'completion' ? 'bg-green-100' :
                    activity.type === 'certificate' ? 'bg-blue-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'completion' && <BookOpen className="w-4 h-4 text-green-600" />}
                    {activity.type === 'certificate' && <Trophy className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'project' && <Code className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                  <span className="text-xs font-medium text-blue-600">+{activity.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 