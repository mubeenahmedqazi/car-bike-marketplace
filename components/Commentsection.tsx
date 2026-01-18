"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Quote, ChevronLeft, ChevronRight, User, ThumbsUp, ShieldCheck, Award, TrendingUp, Heart } from "lucide-react"

export default function CommentsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Raza",
      role: "Car Buyer",
      city: "Karachi",
      rating: 5,
      comment: "Found my dream Honda Civic within budget! The verification process gave me confidence in the purchase.",
      avatar: "👨‍💼",
      verified: true,
      purchase: "Honda Civic 2020",
      date: "2 days ago",
      helpful: 24
    },
    {
      id: 2,
      name: "Fatima Khan",
      role: "Bike Seller",
      city: "Lahore",
      rating: 4,
      comment: "Sold my Yamaha YBR within 24 hours! The platform's reach is incredible. Highly recommended for sellers.",
      avatar: "👩‍💼",
      verified: true,
      purchase: "Yamaha YBR 125",
      date: "1 week ago",
      helpful: 18
    },
    {
      id: 3,
      name: "Ali Hassan",
      role: "First-time Buyer",
      city: "Islamabad",
      rating: 5,
      comment: "As a first-time buyer, I was nervous. But the verified sellers and detailed listings made the process smooth.",
      avatar: "👨‍🎓",
      verified: false,
      purchase: "Toyota Corolla 2018",
      date: "3 days ago",
      helpful: 32
    },
    {
      id: 4,
      name: "Sara Malik",
      role: "Car Enthusiast",
      city: "Rawalpindi",
      rating: 5,
      comment: "The variety of options is amazing! From budget cars to luxury vehicles, everything is available in one place.",
      avatar: "👩‍🔧",
      verified: true,
      purchase: "Mercedes C200",
      date: "1 month ago",
      helpful: 45
    },
    {
      id: 5,
      name: "Bilal Ahmed",
      role: "Daily Commuter",
      city: "Faisalabad",
      rating: 4,
      comment: "Bought a Suzuki Cultus for daily commute. The price comparison feature helped me get the best deal.",
      avatar: "👨‍🚀",
      verified: true,
      purchase: "Suzuki Cultus 2021",
      date: "2 weeks ago",
      helpful: 29
    },
    {
      id: 6,
      name: "Zainab Shah",
      role: "Family Buyer",
      city: "Multan",
      rating: 5,
      comment: "Found the perfect family SUV. The inspection service gave us peace of mind. Excellent platform!",
      avatar: "👩‍👧‍👦",
      verified: true,
      purchase: "Toyota Fortuner",
      date: "3 days ago",
      helpful: 37
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [randomTestimonials, setRandomTestimonials] = useState(testimonials)
  const [isPaused, setIsPaused] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  // Shuffle testimonials on mount
  useEffect(() => {
    const shuffled = [...testimonials].sort(() => Math.random() - 0.5)
    setRandomTestimonials(shuffled)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPaused && autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    autoPlayRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % randomTestimonials.length)
      }
    }, 4000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isPaused, randomTestimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % randomTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + randomTestimonials.length) % randomTestimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = randomTestimonials[currentIndex]

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
          <Award size={16} />
          TRUSTED BY THOUSANDS
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What Our <span className="text-orange-600">Customers Say</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join thousands of satisfied customers who found their perfect vehicle with us
        </p>
      </div>

      {/* Main Testimonial Card */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto transition-all duration-500"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-red-50 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full translate-x-16 translate-y-16"></div>
        
        <div className="relative p-8 md:p-12">
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 text-orange-100">
            <Quote size={60} />
          </div>

          {/* User Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-3xl">
                  {currentTestimonial.avatar}
                </div>
                {currentTestimonial.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900">{currentTestimonial.name}</h3>
                  {currentTestimonial.verified && (
                    <BadgeCheck className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <p className="text-gray-600">{currentTestimonial.role}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <span>📍 {currentTestimonial.city}</span>
                  <span>•</span>
                  <span>{currentTestimonial.date}</span>
                </div>
              </div>
            </div>

            {/* Vehicle Badge */}
            <div className="md:ml-auto bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">Purchased</div>
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-lg">🚗</span>
                {currentTestimonial.purchase}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={`${
                  i < currentTestimonial.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="ml-2 text-lg font-bold text-gray-900">{currentTestimonial.rating}.0</span>
            <span className="text-gray-400">/ 5.0</span>
          </div>

          {/* Comment */}
          <div className="relative">
            <div className="text-lg text-gray-700 leading-relaxed mb-6 pl-6 border-l-4 border-orange-500">
              "{currentTestimonial.comment}"
            </div>
          </div>

          {/* Helpful Stats */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors group">
                <ThumbsUp size={18} className="group-hover:scale-110 transition-transform" />
                <span>Helpful ({currentTestimonial.helpful})</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors group">
                <Heart size={18} className="group-hover:scale-110 transition-transform" />
                <span>Save</span>
              </button>
            </div>
            
            {/* Verified Purchase Badge */}
            {currentTestimonial.verified && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                <ShieldCheck size={18} />
                <span className="font-medium">Verified Purchase</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={prevTestimonial}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:shadow-lg transition-all hover:scale-110"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>

        {/* Indicator Dots */}
        <div className="flex gap-3">
          {randomTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? "w-12 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                  : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextTestimonial}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:shadow-lg transition-all hover:scale-110"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Stats Bar */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Reviews", value: "12,847+", icon: "📝", color: "from-blue-500 to-cyan-500" },
          { label: "Average Rating", value: "4.8/5.0", icon: "⭐", color: "from-yellow-500 to-orange-500" },
          { label: "Verified Buyers", value: "9,432+", icon: "✅", color: "from-green-500 to-emerald-500" },
          { label: "Response Rate", value: "98.7%", icon: "⚡", color: "from-purple-500 to-pink-500" },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6">
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Experience</h3>
            <p className="text-gray-600">Help others make better decisions by sharing your story</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105">
              Write a Review
            </button>
            <button className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all">
              Read All Reviews
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

// BadgeCheck icon component (since lucide-react might not have it)
function BadgeCheck(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  )
}