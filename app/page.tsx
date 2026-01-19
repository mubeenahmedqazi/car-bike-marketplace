"use client"

import AdsSection from "../components/AdsSection"
import CommentsSection from "../components/Commentsection"
import { Car, Bike, Shield, TrendingUp, Zap, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section with Image Slideshow */}
      <div className="relative text-white overflow-hidden h-[500px] md:h-[600px]">
        {/* Background Images Slideshow */}
        <div className="absolute inset-0">
          {/* Image 1 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30">
            <img
              src="/hero1.jpg"
              alt="CAR-BIKE MARKETPLACE"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Image 2 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 opacity-0 animate-slide2">
            <img
              src="/hero2.jpg"
              alt="CAR-BIKE MARKETPLACE"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Image 3 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 opacity-0 animate-slide3">
            <img
              src="/hero3.jpg"
              alt="CAR-BIKE MARKETPLACE"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Find Your Dream Vehicle
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Browse thousands of verified cars, bikes, and more from trusted sellers across Pakistan
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center bg-black/30 backdrop-blur-sm px-6 py-4 rounded-xl">
                <div className="text-3xl font-bold">2,500+</div>
                <div className="text-sm opacity-80">Vehicles Listed</div>
              </div>
              <div className="text-center bg-black/30 backdrop-blur-sm px-6 py-4 rounded-xl">
                <div className="text-3xl font-bold">1,800+</div>
                <div className="text-sm opacity-80">Verified Sellers</div>
              </div>
              <div className="text-center bg-black/30 backdrop-blur-sm px-6 py-4 rounded-xl">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm opacity-80">Satisfied Customers</div>
              </div>
            </div>

            {/* Slideshow Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-white/50"></div>
              <div className="w-3 h-3 rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slide2 {
            0%, 33.33% { opacity: 0; }
            33.34%, 66.66% { opacity: 1; }
            66.67%, 100% { opacity: 0; }
          }
          
          @keyframes slide3 {
            0%, 66.66% { opacity: 0; }
            66.67%, 99.99% { opacity: 1; }
            100% { opacity: 0; }
          }
          
          .animate-slide2 {
            animation: slide2 9s infinite;
          }
          
          .animate-slide3 {
            animation: slide3 9s infinite;
          }
        `}</style>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-orange-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Listings</h3>
            <p className="text-gray-600">Every vehicle is thoroughly inspected for authenticity</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-gray-600">Competitive pricing with no hidden costs</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted Sellers</h3>
            <p className="text-gray-600">Connect with verified and reliable sellers</p>
          </div>
        </div>
      </div>

      {/* Random Ads Section (Shows mixed random ads) */}
      <AdsSection
        title="Discover Amazing Deals"
        type="random"
        limit={8}
      />

      {/* Featured Vehicles */}
      <AdsSection
        title="Featured Vehicles"
        type="featured"
        limit={6}
      />

      {/* Latest Arrivals */}
      <AdsSection
        title="Latest Arrivals"
        type="latest"
        limit={6}
      />

      {/* Budget Friendly */}
      <AdsSection
        title="Budget Friendly Deals"
        type="budget"
        limit={6}
      />

      {/* Trending Now */}
      <AdsSection
        title="Trending Now"
        type="trending"
        limit={6}
      />

      {/* Popular Categories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/buy?category=car"
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow group"
          >
            <div className="text-4xl mb-3">🚗</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cars</h3>
            <p className="text-gray-600">Browse 1,200+ listings</p>
          </a>

          <a
            href="/buy?category=bike"
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow group"
          >
            <div className="text-4xl mb-3">🏍️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bikes</h3>
            <p className="text-gray-600">Browse 800+ listings</p>
          </a>

          <a
            href="/buy?category=suv"
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow group"
          >
            <div className="text-4xl mb-3">🚙</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">SUVs</h3>
            <p className="text-gray-600">Browse 300+ listings</p>
          </a>

          <a
            href="/buy?category=truck"
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow group"
          >
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trucks</h3>
            <p className="text-gray-600">Browse 200+ listings</p>
          </a>
        </div>
      </div>

      {/* Popular Brands */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Popular Brands</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: 'Toyota', logo: 'https://up.yimg.com/ib/th/id/OIP.Kbp3gng1wI1tWSFALCvvVQHaFC?pid=Api&rs=1&c=1&qlt=95&w=158&h=107' },
            { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/2560px-Honda.svg.png' },
            { name: 'Suzuki', logo: 'https://up.yimg.com/ib/th/id/OIP.HjQtuTJ8MSIuW9ge9ccJxQHaHa?pid=Api&rs=1&c=1&qlt=95&w=71&h=71' },
            { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png' },
            { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png' },
            { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/2048px-Audi-Logo_2016.svg.png' }
          ].map((brand) => (
            <a
              key={brand.name}
              href={`/buy?brand=${brand.name.toLowerCase()}`}
              className="bg-white p-4 rounded-xl shadow text-center hover:shadow-lg transition-shadow group"
            >
              <div className="mb-2 flex justify-center">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`}
                  className="h-10 object-contain"
                />
              </div>
              <h3 className="font-bold text-gray-900">{brand.name}</h3>
              <p className="text-sm text-gray-600">View Listings</p>
            </a>
          ))}
        </div>
      </div>

      {/* Sponsored Ads Section */}
      <AdsSection
        title="Sponsored Ads"
        type="sponsored"
        limit={4}
      />

      {/* Recommended Comments Carousel */}
      <CommentsSection />

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Sell Your Vehicle?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            List your vehicle for free and reach thousands of potential buyers
          </p>
          <a
            href="/sell"
            className="inline-block bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all hover:scale-105"
          >
            Post Your Ad Now
          </a>
        </div>
      </div>
    </div>
  )
}