import { 
  Bot,
  Target,
  TrendingUp,
  Globe,
  Lightbulb,
  Heart,
  Users,
  CheckCircle,
  Cpu,
  Award,
  BookOpen
} from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Target,
    title: "Innovation-First",
    description: "We lead with cutting-edge technology and forward-thinking approaches to education."
  },
  {
    icon: Heart,
    title: "Accessible Learning",
    description: "Making complex technology education accessible to learners from all backgrounds."
  },
  {
    icon: Users,
    title: "Community-Driven",
    description: "Building a global network of learners, creators, and industry professionals."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Empowering individuals worldwide to shape the future of technology."
  }
]

const achievements = [
  { number: "2,500+", label: "Global Learners" },
  { number: "94%", label: "Completion Rate" },
  { number: "87%", label: "Career Growth" },
  { number: "4.9/5", label: "Average Rating" }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-none">
            About
            <br />
            <span className="text-blue-600">LearnTechLab</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We&rsquo;re reshaping the future of technology education through AI-driven learning experiences
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm font-medium text-blue-600 mb-4 tracking-wide uppercase">
                Our Vision
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                Global Leader in
                <br />
                <span className="text-blue-600">Transformative Education</span>
              </h2>
              <p className="text-xl font-light text-gray-600 leading-relaxed">
                To become the world&rsquo;s premier destination for AI-driven technology education, 
                empowering learners to master cutting-edge tools and shape the future of innovation.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 flex items-center justify-center">
              <div className="text-center">
                <Lightbulb className="w-20 h-20 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Innovation Driven</h3>
                <p className="text-gray-600 font-light">Leading the future of education</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 flex items-center justify-center order-2 lg:order-1">
              <div className="text-center">
                <Target className="w-20 h-20 text-purple-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mission Focused</h3>
                <p className="text-gray-600 font-light">Transforming lives through technology</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="text-sm font-medium text-purple-600 mb-4 tracking-wide uppercase">
                Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                Revolutionize Learning
                <br />
                <span className="text-purple-600">Through AI Integration</span>
              </h2>
              <div className="space-y-6 text-lg font-light text-gray-600 leading-relaxed">
                <p>
                  Transform technology education by seamlessly integrating AI platforms into 
                  comprehensive learning experiences.
                </p>
                <p>
                  Equip learners with industry-ready skills through hands-on training with 
                  cutting-edge tools and methodologies.
                </p>
                <p>
                  Foster continuous exploration and innovation while building real-world 
                  capabilities that drive career success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Our Story
            </h2>
            <p className="text-xl font-light text-gray-300 max-w-3xl mx-auto">
              Born from the belief that anyone can become a creator
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-lg font-light text-gray-300 leading-relaxed">
              <p>
                LearnTechLab was founded on a simple yet powerful belief: that anyone, regardless 
                of their background, can become a creator and innovator in the digital age. We 
                recognized that traditional education wasn&rsquo;t keeping pace with the rapid 
                evolution of technology, particularly in AI and cloud computing.
              </p>
              
              <p>
                As an innovative edtech company, we&rsquo;re dedicated to reshaping how people 
                learn technology. Our specialization in AI-assisted development programs reflects 
                our commitment to staying at the forefront of technological advancement, ensuring 
                our learners are always equipped with the most current and relevant skills.
              </p>
              
              <p>
                We&rsquo;ve created a &ldquo;learn-as-you-go&rdquo; approach that combines 
                theoretical knowledge with practical application, allowing students to build 
                real-world projects while mastering the tools that are defining the future of 
                software development.
              </p>
              
              <p>
                Today, we&rsquo;re proud to be a global community of learners, creators, and 
                innovators who are actively shaping the future of technology through AI-driven 
                development, cloud computing mastery, and cutting-edge networking solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl font-light text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our Impact
            </h2>
            <p className="text-xl font-light text-gray-600">
              Making a difference in learners&rsquo; lives worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={achievement.label} className="text-center">
                <div className="text-4xl md:text-5xl font-light text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-medium text-gray-900">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
            Join Our Mission
          </h2>
          <p className="text-xl font-light mb-12 leading-relaxed max-w-3xl mx-auto">
            Be part of the future of technology education. Start your journey with cutting-edge 
            AI tools and transform your career today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/programs/ai-development"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
            >
              Start Learning
            </a>
            <a
              href="/business"
              className="border border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 