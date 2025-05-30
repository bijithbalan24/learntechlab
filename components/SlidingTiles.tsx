"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, Star, Users, Clock } from "lucide-react"
import Link from "next/link"

interface SlidingTile {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  color: string
  textColor: string
  cta: {
    text: string
    href: string
  }
  stats?: {
    rating: number
    students: string
    duration: string
  }
}

const tiles: SlidingTile[] = [
  {
    id: "ai-development",
    title: "Building Applications",
    subtitle: "with AI",
    description: "Master Amazon Q Developer, Cursor IDE, and modern AI-assisted development. From concept to deployed product.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center",
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
    textColor: "text-white",
    cta: {
      text: "Start Building",
      href: "/programs/ai-development"
    },
    stats: {
      rating: 4.9,
      students: "890+",
      duration: "8 weeks"
    }
  },
  {
    id: "cpmai",
    title: "CPMAI",
    subtitle: "Certification",
    description: "Lead AI initiatives at scale. Comprehensive certification program with hands-on project management experience.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=center",
    color: "bg-gradient-to-br from-purple-600 to-purple-800",
    textColor: "text-white",
    cta: {
      text: "Get Certified",
      href: "/programs/cpmai"
    },
    stats: {
      rating: 4.8,
      students: "456+",
      duration: "6 weeks"
    }
  },
  {
    id: "aws-cloud",
    title: "AWS Cloud",
    subtitle: "Computing",
    description: "Master cloud-native development with AWS services integrated with AI workflows and modern deployment.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=center",
    color: "bg-gradient-to-br from-orange-500 to-orange-700",
    textColor: "text-white",
    cta: {
      text: "Master Cloud",
      href: "/programs/aws"
    },
    stats: {
      rating: 4.9,
      students: "1245+",
      duration: "4 weeks"
    }
  },
  {
    id: "innovation",
    title: "Innovation is",
    subtitle: "Accessible to All",
    description: "Join our global community of 2,500+ learners mastering cutting-edge technology and shaping the future.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=center",
    color: "bg-gradient-to-br from-gray-900 to-black",
    textColor: "text-white",
    cta: {
      text: "Join Community",
      href: "/programs"
    }
  }
]

export default function SlidingTiles() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 8000)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isTransitioning) {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true)
        setCurrentSlide((prev) => (prev + 1) % tiles.length)
        setTimeout(() => setIsTransitioning(false), 800)
      }, 4000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, isTransitioning])

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide || isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide(index)
    stopAutoPlay()
    setTimeout(() => setIsTransitioning(false), 800)
  }, [currentSlide, isTransitioning, stopAutoPlay])

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % tiles.length)
    stopAutoPlay()
    setTimeout(() => setIsTransitioning(false), 800)
  }, [isTransitioning, stopAutoPlay])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + tiles.length) % tiles.length)
    stopAutoPlay()
    setTimeout(() => setIsTransitioning(false), 800)
  }, [isTransitioning, stopAutoPlay])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Transform Your Career
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Discover our flagship programs designed for the future
          </p>
        </div>

        {/* Sliding Tiles Container */}
        <div className="relative">
          {/* Main Slider */}
          <div className="relative h-[600px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
            {tiles.map((tile, index) => (
              <div
                key={tile.id}
                className={`absolute inset-0 w-full h-full ${tile.color} transition-transform duration-700 ease-in-out`}
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%)`,
                }}
              >
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${tile.image})` }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="max-w-6xl mx-auto px-6 w-full">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      {/* Text Content */}
                      <div className={`${tile.textColor} z-10`}>
                        <div className={`transform transition-all duration-700 ease-out ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}>
                          <h3 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none mb-4">
                            {tile.title}
                            <br />
                            <span className="text-blue-400">{tile.subtitle}</span>
                          </h3>
                          
                          <p className="text-xl md:text-2xl font-light leading-relaxed mb-8 text-gray-200 max-w-lg">
                            {tile.description}
                          </p>

                          {/* Stats */}
                          {tile.stats && (
                            <div className="flex items-center space-x-6 mb-8 flex-wrap">
                              <div className="flex items-center space-x-2">
                                <Star className="w-5 h-5 text-yellow-400" />
                                <span className="font-medium">{tile.stats.rating}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Users className="w-5 h-5 text-blue-400" />
                                <span className="font-medium">{tile.stats.students} students</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-green-400" />
                                <span className="font-medium">{tile.stats.duration}</span>
                              </div>
                            </div>
                          )}

                          <Link
                            href={tile.cta.href}
                            className="inline-flex items-center bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            {tile.cta.text}
                            <Play className="w-5 h-5 ml-2" />
                          </Link>
                        </div>
                      </div>

                      {/* Visual Element */}
                      <div className="hidden md:block">
                        <div className={`relative transform transition-all duration-700 ease-out ${
                          index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}>
                          <div className="w-full h-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/15">
                            <div className="text-center">
                              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-white/30">
                                <Play className="w-10 h-10 text-white" />
                              </div>
                              <h4 className="text-2xl font-semibold text-white mb-2">
                                Interactive Learning
                              </h4>
                              <p className="text-white/80 font-light">
                                Hands-on experience with real projects
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-xl hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-xl hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {tiles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                  currentSlide === index 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="absolute top-6 right-6 z-10">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'
            }`}></div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="mt-8 flex justify-center space-x-4 flex-wrap gap-2">
          {tiles.map((tile, index) => (
            <button
              key={tile.id}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed ${
                currentSlide === index
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {tile.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
} 