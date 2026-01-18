"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Search, Filter, MapPin, Calendar, ChevronDown, 
  ChevronUp, Car, Bike, Truck, Sparkles 
} from "lucide-react"

interface Ad {
  _id: string
  title: string
  price: number
  city: string
  year: number
  mileage: number
  transmission: string
  fuelType: string
  condition: string
  images: string[]
  brand: string
  model: string
  vehicleType: string
  views: number
  isVerified: boolean
  isFeatured: boolean
  createdAt: string
}

export default function AllAdsPage() {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const cities = [
    "All Cities", "Karachi", "Lahore", "Islamabad", "Rawalpindi", 
    "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot"
  ]

  const brands = [
    "All Brands", "Toyota", "Honda", "Suzuki", "Mercedes", 
    "BMW", "Audi", "Hyundai", "Kia", "Ford", "Nissan"
  ]

  const categories = [
    { value: "all", label: "All Vehicles", icon: <Car size={20} /> },
    { value: "car", label: "Cars", icon: <Car size={20} /> },
    { value: "bike", label: "Bikes", icon: <Bike size={20} /> },
    { value: "truck", label: "Trucks", icon: <Truck size={20} /> },
  ]

  useEffect(() => {
    fetchAds()
  }, [page, sortBy, selectedCategory, selectedCity, selectedBrand])

  const fetchAds = async () => {
    try {
      setLoading(true)
      
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('limit', '20')
      params.append('sort', sortBy)
      
      if (searchQuery) params.append('search', searchQuery)
      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      if (selectedCity !== 'all') params.append('city', selectedCity)
      if (selectedBrand !== 'all') params.append('brand', selectedBrand)
      if (minPrice) params.append('minPrice', minPrice)
      if (maxPrice) params.append('maxPrice', maxPrice)
      
      const response = await fetch(`/api/ads?${params.toString()}`)
      const data = await response.json()
      
      if (data.success) {
        setAds(data.ads)
        setTotalPages(data.pagination?.pages || 1)
      }
    } catch (error) {
      console.error("Error fetching ads:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchAds()
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 1000000).toFixed(1)}M`
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)}L`
    }
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`
    
    return date.toLocaleDateString('en-PK', { 
      day: 'numeric', 
      month: 'short' 
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Browse All Vehicles</h1>
          <p className="text-lg opacity-90">
            Find your perfect vehicle from thousands of listings
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by brand, model, keyword..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Filter size={20} />
                Filters
                {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {cities.map((city) => (
                <option key={city} value={city === "All Cities" ? "all" : city.toLowerCase()}>
                  {city}
                </option>
              ))}
            </select>
            
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand === "All Brands" ? "all" : brand.toLowerCase()}>
                  {brand}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (PKR)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Min"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Max"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="From"
                      min="1950"
                      max={new Date().getFullYear()}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="To"
                      min="1950"
                      max={new Date().getFullYear()}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      New
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Used
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {ads.length} Vehicles Found
          </h2>
          <div className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : ads.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ads.map((ad) => (
                <Link
                  key={ad._id}
                  href={`/ads/${ad._id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {ad.images && ad.images.length > 0 ? (
                      <img
                        src={ad.images[0]}
                        alt={ad.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        {ad.vehicleType === 'Bike' ? (
                          <Bike size={48} className="text-gray-400" />
                        ) : (
                          <Car size={48} className="text-gray-400" />
                        )}
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      {ad.isFeatured && (
                        <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                          <Sparkles size={10} />
                          Featured
                        </div>
                      )}
                      {ad.isVerified && (
                        <div className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                          Verified
                        </div>
                      )}
                    </div>
                    
                    {/* City */}
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
                      <MapPin size={10} />
                      {ad.city}
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {ad.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                        {ad.brand} {ad.model}
                      </span>
                      <span className="text-sm text-gray-600">• {ad.year}</span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{ad.mileage.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⚙️</span>
                        <span>{ad.transmission} • {ad.fuelType}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-bold text-orange-600">
                        {formatPrice(ad.price)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(ad.createdAt)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1
                  if (totalPages > 5) {
                    if (page <= 3) pageNum = i + 1
                    else if (page >= totalPages - 2) pageNum = totalPages - 4 + i
                    else pageNum = page - 2 + i
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-4 py-2 rounded-lg ${
                        page === pageNum
                          ? 'bg-orange-500 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No vehicles found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search filters
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedCity("all")
                setSelectedBrand("all")
                setPage(1)
              }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}