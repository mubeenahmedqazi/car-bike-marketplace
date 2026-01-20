"use client"

import { useState, useEffect, useRef } from "react"
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ShieldCheck,
  Award,
  Heart
} from "lucide-react"

export default function CommentsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Raza",
      role: "Car Buyer",
      city: "Karachi",
      rating: 5,
      comment:
        "Found my dream Honda Civic within budget! The verification process gave me confidence in the purchase.",
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
      comment:
        "Sold my Yamaha YBR within 24 hours! The platform's reach is incredible.",
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
      comment:
        "As a first-time buyer, I was nervous. But verified sellers made it smooth.",
      avatar: "👨‍🎓",
      verified: false,
      purchase: "Toyota Corolla 2018",
      date: "3 days ago",
      helpful: 32
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [randomTestimonials, setRandomTestimonials] = useState(testimonials)
  const [isPaused, setIsPaused] = useState(false)

  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Shuffle testimonials on mount
  useEffect(() => {
    const shuffled = [...testimonials].sort(() => Math.random() - 0.5)
    setRandomTestimonials(shuffled)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    if (autoPlayRef.current) {
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
    setCurrentIndex(
      (prev) => (prev - 1 + randomTestimonials.length) % randomTestimonials.length
    )
  }

  const currentTestimonial = randomTestimonials[currentIndex]

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div
        className="bg-white rounded-3xl shadow-xl p-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{currentTestimonial.avatar}</div>
          <div>
            <h3 className="text-xl font-bold">
              {currentTestimonial.name}
            </h3>
            <p className="text-gray-500">{currentTestimonial.city}</p>
          </div>
        </div>

        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={
                i < currentTestimonial.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        <p className="text-gray-700 mb-6">
          “{currentTestimonial.comment}”
        </p>

        <div className="flex justify-between items-center">
          <button onClick={prevTestimonial}>
            <ChevronLeft />
          </button>

          <button onClick={nextTestimonial}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}
