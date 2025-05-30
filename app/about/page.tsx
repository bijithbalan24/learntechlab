import { 
  Bot,
  Target,
  TrendingUp,
  Globe,
  Lightbulb,
  Heart,
  Users,
  CheckCircle,
  Cpu
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              About <span className="text-gradient-brand">LearnTechLab</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Empowering the next generation of creators through AI-driven technology education
            </p>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Our Vision
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
              Leading the Future of <span className="text-blue-600">Tech Education</span>
            </h2>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                To be a <strong>global leader in transformative tech education</strong>, empowering individuals to master 
                AI-driven development, cloud computing, and networking through hands-on training with cutting-edge tools 
                like Amazon Q Developer, Cursor, and Large Language Models—enabling a future where 
                <span className="text-purple-600 font-semibold"> innovation is truly accessible to all</span>.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Globe className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-medium text-blue-600">Innovation Accessible to All</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Revolutionizing <span className="text-gradient-innovation">Tech Education</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At LearnTechLab, our mission is to transform how people learn and build with technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Revolutionize Learning</h3>
                  <p className="text-gray-600">Integrate state-of-the-art AI development platforms such as Amazon Q Developer, Cursor, Replit, and V0 by Vercel into dynamic, hands-on training environments.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Equip Industry-Ready Skills</h3>
                  <p className="text-gray-600">Provide learners with practical expertise in AI-assisted development, AWS cloud solutions, and networking fundamentals, regardless of their prior technical background.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Encourage Continuous Exploration</h3>
                  <p className="text-gray-600">Foster a &ldquo;learn-as-you-go&rdquo; culture that mirrors the evolving nature of modern tech landscapes and encourages lifelong learning.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Real-World Capabilities</h3>
                  <p className="text-gray-600">Enable project-based learning in full-stack web and mobile application development powered by AI technologies.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Promote Inclusive Access</h3>
                  <p className="text-gray-600">Ensure high-quality technology education is accessible to students, professionals, and entrepreneurs around the world.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Learn-as-You-Go Culture</h4>
                <p className="text-gray-600 mb-6">
                  Build real-world capabilities through project-based learning in full-stack web 
                  and mobile application development powered by AI.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Project-based learning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">AI-powered development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Real-world applications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Industry-ready skills</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                About LearnTechLab
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Innovative EdTech for <span className="text-gradient-innovation">Future Creators</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                LearnTechLab is an innovative edtech company dedicated to reshaping the way people learn and build with technology. 
                Founded with the belief that <strong>anyone can become a creator</strong> with the right tools and guidance, 
                we specialize in training programs that combine AI-assisted development, cloud computing (AWS), 
                and networking into one cohesive learning journey.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Practical, Project-Based Learning</h4>
                    <p className="text-gray-600">Emphasis on hands-on experience with real-world applications and deployments using next-generation AI development tools.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Accessible to Everyone</h4>
                    <p className="text-gray-600">Making application building accessible even to those without traditional programming background through AI-assisted development.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Training Future-Ready Professionals</h4>
                    <p className="text-gray-600">We don&apos;t just teach tech—we train builders, innovators, and future-ready professionals for the evolving digital economy.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What Sets Us Apart</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Next-Generation AI Tools</h4>
                    <p className="text-blue-700 text-sm">Amazon Q Developer, Cursor, Replit, V0 by Vercel, and Supabase integration for comprehensive AI-assisted development</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">AI as Co-Developer</h4>
                    <p className="text-purple-700 text-sm">Students go from concept to deployed product using AI assistance throughout the entire development process</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Cohesive Learning Journey</h4>
                    <p className="text-green-700 text-sm">Integrated curriculum combining AI, cloud computing, and networking in one comprehensive program</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Course Highlight */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Flagship Course
            </h2>
            <p className="text-xl text-gray-600">
              Experience our signature &ldquo;Building Applications with AI&rdquo; program
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  🚀 FLAGSHIP COURSE
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Building Applications with AI</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our flagship course allows students to go from concept to deployed product using AI as a co-developer, 
                  making application building accessible even to those without a traditional programming background.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">🤖 Amazon Q Developer Integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">⚡ Cursor IDE Mastery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">🚀 V0 by Vercel Deployment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">💾 Supabase Backend Development</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">8 weeks</div>
                  <div className="text-gray-600 mb-4">Comprehensive Training</div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">$1,999</div>
                  <div className="text-sm text-gray-500 line-through mb-4">$2,499</div>
                  <Link href="/programs/ai-development" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join our global community of learners and transform your career with AI-driven technology education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programs" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Explore Programs
            </Link>
            <Link href="/business" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 