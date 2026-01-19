"use client"

import { Shield, Users, Target, Star, TrendingUp, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About CAR-BIKE MARKETPLACE</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Pakistan's #1 Auto Platform - Connecting Buyers & Sellers Since 2023
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Founded in 2023, CAR-BIKE MARKETPLACE started with a simple mission: to make buying 
                and selling vehicles in Pakistan easier, safer, and more transparent.
              </p>
              <p>
                What began as a small platform for car enthusiasts has grown into Pakistan's leading 
                auto marketplace, connecting thousands of buyers and sellers every month.
              </p>
              <p>
                We've revolutionized the way Pakistan buys and sells vehicles by introducing 
                verified listings, secure transactions, and a trusted community of automotive enthusiasts.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚗</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Journey</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">2023</span>
                  <span>Platform Launch</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">10,000+</span>
                  <span>Vehicles Listed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">50+ Cities</span>
                  <span>Nationwide Coverage</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">98%</span>
                  <span>Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission & Vision */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Target className="text-blue-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To create Pakistan's most trusted automotive marketplace by providing a safe, 
                transparent, and efficient platform that empowers both buyers and sellers to 
                make confident vehicle transactions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Star className="text-green-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To become the go-to automotive platform in Pakistan, setting industry standards 
                for safety, transparency, and customer satisfaction while continuously innovating 
                to meet evolving market needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-orange-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trust & Safety</h3>
            <p className="text-gray-600">
              Every listing is verified and every transaction is secured. Your safety is our priority.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Customer First</h3>
            <p className="text-gray-600">
              We listen to our community and continuously improve based on your feedback.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Transparency</h3>
            <p className="text-gray-600">
              Clear pricing, honest listings, and open communication in every transaction.
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-200 to-red-200 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Ali Khan</h3>
              <p className="text-orange-600 font-medium mb-2">Founder & CEO</p>
              <p className="text-gray-600">15+ years in automotive industry</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sara Ahmed</h3>
              <p className="text-orange-600 font-medium mb-2">CTO</p>
              <p className="text-gray-600">Tech innovation & platform development</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-200 to-emerald-200 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍🔧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Ahmed Raza</h3>
              <p className="text-orange-600 font-medium mb-2">Head of Verification</p>
              <p className="text-gray-600">Vehicle inspection & quality assurance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Listings</h3>
            <p className="text-gray-600 text-sm">Every vehicle undergoes thorough inspection</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Buyer Protection</h3>
            <p className="text-gray-600 text-sm">Secure transactions with money-back guarantee</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-gray-600 text-sm">Competitive pricing with no hidden fees</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Dedicated customer support team</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Be part of Pakistan's fastest growing automotive marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/sell"
              className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all hover:scale-105"
            >
              Start Selling
            </a>
            <a
              href="/buy"
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all"
            >
              Browse Vehicles
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}