"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, MapPin, ChevronDown, ChevronUp, Car, Bike, DollarSign, Calendar, Zap, Shield } from "lucide-react"
import Link from "next/link"

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
  createdAt: string
}

// Main page wrapper with Suspense
export default function BuyPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-lg">Loading page...</div>}>
      <BuyPageContent />
    </Suspense>
  )
}

// Actual client component with useSearchParams
function BuyPageContent() {
  const searchParams = useSearchParams()
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [minYear, setMinYear] = useState("")
  const [maxYear, setMaxYear] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Read URL parameters on client mount
  useEffect(() => {
    const brand = searchParams.get("brand")
    const category = searchParams.get("category")
    if (brand) {
      setSelectedBrand(brand)
      setSearchQuery(brand.charAt(0).toUpperCase() + brand.slice(1))
      setPage(1)
    }
    if (category && category !== "all") {
      setSelectedCategory(category)
      setPage(1)
    }
  }, [searchParams])

  const cities = ["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Gujranwala"]
  const brands = ["Toyota","Honda","Suzuki","Mercedes","BMW","Audi","Hyundai","Kia","Ford","Nissan","Mitsubishi","Chevrolet"]
  const categories = [
    { value: "all", label: "All Vehicles" },
    { value: "car", label: "Cars" },
    { value: "bike", label: "Bikes" }
    
  ]

  // Fetch ads whenever filters/page change
  useEffect(() => {
    fetchAds()
  }, [page, sortBy, selectedCategory, selectedCity, selectedBrand, minPrice, maxPrice, minYear, maxYear, searchQuery])

  const fetchAds = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.append("page", page.toString())
      params.append("limit", "12")
      params.append("sort", sortBy)
      if (searchQuery) params.append("search", searchQuery)
      if (selectedCategory !== "all") params.append("category", selectedCategory)
      if (selectedCity !== "all") params.append("city", selectedCity)
      if (selectedBrand !== "all") params.append("brand", selectedBrand)
      if (minPrice) params.append("minPrice", minPrice)
      if (maxPrice) params.append("maxPrice", maxPrice)
      if (minYear) params.append("minYear", minYear)
      if (maxYear) params.append("maxYear", maxYear)

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

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setPage(1) }
  const handleResetFilters = () => {
    setSearchQuery(""); setSelectedCategory("all"); setSelectedCity("all"); setSelectedBrand("all")
    setMinPrice(""); setMaxPrice(""); setMinYear(""); setMaxYear(""); setSortBy("newest"); setPage(1)
    window.history.replaceState({}, "", "/buy")
  }
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand); setPage(1)
    setSearchQuery(brand !== "all" ? brand.charAt(0).toUpperCase() + brand.slice(1) : "")
  }
  const handleCategoryChange = (category: string) => { setSelectedCategory(category); setPage(1) }
  const formatPrice = (price: number) => {
    if (price >= 10000000) return `${(price / 1000000).toFixed(1)}M`
    if (price >= 100000) return `${(price / 100000).toFixed(1)}L`
    return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(price)
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString), now = new Date()
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000*60*60))
    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffHours < 168) return `${Math.floor(diffHours/24)}d ago`
    return date.toLocaleDateString("en-PK",{day:"numeric",month:"short"})
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero + Search */}
      <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{selectedBrand !== "all" ? `${selectedBrand} Vehicles` : "Find Your Perfect Vehicle"}</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">{selectedBrand !== "all" ? `Browse all ${selectedBrand} vehicles available` : "Browse thousands of verified cars, bikes, and more"}</p>

          <form onSubmit={handleSearch} className="max-w-4xl">
            <div className="bg-white rounded-xl p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
                  placeholder="Search by brand, model, keyword..." className="w-full pl-12 pr-4 py-3 text-gray-900 rounded-lg border-0 focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <div className="flex gap-2">
                <select value={selectedCategory} onChange={(e)=>handleCategoryChange(e.target.value)} className="px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border-0 focus:ring-2 focus:ring-orange-500 outline-none">
                  {categories.map(cat => <option key={cat.value} value={cat.value}> {cat.label}</option>)}
                </select>
                <button type="button" onClick={()=>setShowFilters(!showFilters)} className="px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <Filter size={20} /> Filters {showFilters ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                  <Search size={20}/> Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="all">All Cities</option>
                {cities.map(city=> <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select value={selectedBrand} onChange={(e)=>handleBrandChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="all">All Brands</option>
                {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div className="flex gap-2">
                <input type="number" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} placeholder="Min" className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"/>
                <input type="number" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} placeholder="Max" className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"/>
              </div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Year Range</label>
              <div className="flex gap-2">
                <input type="number" value={minYear} onChange={(e)=>setMinYear(e.target.value)} placeholder="From" min="1950" max={new Date().getFullYear()} className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"/>
                <input type="number" value={maxYear} onChange={(e)=>setMaxYear(e.target.value)} placeholder="To" min="1950" max={new Date().getFullYear()} className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"/>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
            <button onClick={handleResetFilters} className="px-4 py-2 text-gray-600 hover:text-gray-900">Reset Filters</button>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i)=> <div key={i} className="bg-white rounded-xl shadow animate-pulse h-64"></div>)}
          </div>
        ) : ads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ads.map(ad => (
              <Link key={ad._id} href={`/ads/${ad._id}`} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  {ad.images?.[0] ? <img src={ad.images[0]} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/> : 
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"><Car size={48} className="text-gray-400"/></div>}
                  {ad.isVerified && <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1"><Shield size={10}/>Verified</div>}
                  {ad.condition==="New" && <div className="absolute top-8 left-2 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">New</div>}
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded-full"><MapPin size={10} className="inline mr-1"/>{ad.city}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{ad.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">{ad.brand} {ad.model}</span>
                    <span className="text-sm text-gray-600">• {ad.year}</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2"><Calendar size={14}/><span>{ad.mileage.toLocaleString()} km</span></div>
                    <div className="flex items-center gap-2"><Zap size={14}/><span>{ad.transmission} • {ad.fuelType}</span></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-orange-600">{formatPrice(ad.price)}</div>
                    <div className="text-xs text-gray-500">{formatDate(ad.createdAt)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{selectedBrand!=="all" ? `No ${selectedBrand} vehicles found` : "No vehicles found"}</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button onClick={handleResetFilters} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all">Reset Filters</button>
          </div>
        )}
      </div>
    </div>
  )
}
