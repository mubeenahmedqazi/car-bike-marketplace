"use client"

import { useState, useEffect } from "react"
import { Car, Bike, MapPin, Calendar, Zap, Star, TrendingUp, ChevronLeft, ChevronRight, Heart, Eye, MessageCircle, Shield, Dice5 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface Ad {
  _id: string
  title: string
  price: number
  city: string
  year: number
  mileage?: number
  transmission?: string
  fuelType?: string
  condition: string
  images?: string[]
  brand: string
  model: string
  vehicleType: string
  views: number
  isVerified: boolean
  isFeatured: boolean
  isSponsored?: boolean
  status: string
  createdAt: string
  updatedAt: string
}

interface AdsSectionProps {
  title: string
  type?: "featured" | "sponsored" | "latest" | "trending" | "budget" | "random"
  limit?: number
  category?: string
  brand?: string
  city?: string
  showViewAll?: boolean
  showNavigation?: boolean
}

export default function AdsSection({ 
  title, 
  type = "featured", 
  limit = 8,
  category,
  brand,
  city,
  showViewAll = true,
  showNavigation = true
}: AdsSectionProps) {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [savedAds, setSavedAds] = useState<string[]>([])

  useEffect(() => {
    fetchAds()
  }, [type, category, brand, city])

  const fetchAds = async () => {
    try {
      setLoading(true)
      
      // Build query parameters
      const params = new URLSearchParams()
      params.append('limit', limit.toString())
      params.append('type', type)
      if (category) params.append('category', category)
      if (brand) params.append('brand', brand)
      if (city) params.append('city', city)

      const response = await fetch(`/api/ads?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ads: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        setAds(data.ads || [])
      } else {
        setError(data.error || 'Failed to load ads')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ads')
      console.error('Error fetching ads:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₨${(price / 1000000).toFixed(1)}M`
    } else if (price >= 100000) {
      return `₨${(price / 100000).toFixed(1)}L`
    } else if (price >= 1000) {
      return `₨${(price / 1000).toFixed(1)}k`
    }
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
      
      if (diffHours < 1) return 'Just now'
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`
      return format(date, 'MMM d')
    } catch {
      return 'Recently'
    }
  }

  const handleSaveAd = async (adId: string) => {
    try {
      // Toggle saved state
      if (savedAds.includes(adId)) {
        setSavedAds(savedAds.filter(id => id !== adId))
      } else {
        setSavedAds([...savedAds, adId])
      }
      
      
    } catch (err) {
      console.error('Error saving ad:', err)
    }
  }

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`ads-container-${type}`)
    if (container) {
      const scrollAmount = 300
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleRefresh = () => {
    fetchAds()
  }

  const getViewAllLink = () => {
    const params = new URLSearchParams()
    params.append('type', type)
    if (category) params.append('category', category)
    if (brand) params.append('brand', brand)
    if (city) params.append('city', city)
    
    return `/buy?${params.toString()}`
  }

  if (loading) {
    return <AdsSectionSkeleton title={title} />
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-orange-600">{error}</p>
          <button 
            onClick={fetchAds}
            className="mt-3 px-4 py-2 bg-red-100 text-orange-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (ads.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          
          {title}
        </h2>
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No ads found</h3>
          <p className="text-gray-500 mb-6">Check back later for new listings</p>
          <Link href="/sell">
            <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              Be the first to post!
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="">
            
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              {getSectionDescription(type)} • {ads.length} listings
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Refresh button for random */}
          {type === 'random' && (
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm"
              title="Refresh random ads"
            >
              <Dice5 size={16} />
              Refresh
            </button>
          )}
          
          {showViewAll && (
            <Link 
              href={getViewAllLink()}
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
            >
              View All
              <ChevronRight size={18} />
            </Link>
          )}
          
          {/* Navigation Arrows */}
          {showNavigation && (
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ads Container */}
      <div className="relative">
        <div 
          id={`ads-container-${type}`}
          className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {ads.map((ad) => (
            <AdCard 
              key={ad._id} 
              ad={ad} 
              formatPrice={formatPrice}
              formatDate={formatDate}
              isSaved={savedAds.includes(ad._id)}
              onSave={() => handleSaveAd(ad._id)}
            />
          ))}
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6 sm:hidden">
        {ads.slice(0, Math.min(ads.length, 5)).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const container = document.getElementById(`ads-container-${type}`)
              if (container) {
                const cardWidth = 320 // Approximate card width
                container.scrollTo({ left: index * (cardWidth + 24), behavior: 'smooth' })
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? 'bg-orange-500 w-6' : 'bg-gray-300'
            }`}
            aria-label={`Go to ad ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Individual Ad Card Component
function AdCard({ ad, formatPrice, formatDate, isSaved, onSave }: any) {
  const [imageError, setImageError] = useState(false)
  
  const getVehicleIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'car': return '🚗'
      case 'bike': return '🏍️'
      case 'suv': return '🚙'
      case 'truck': return '🚚'
      default: return '🚗'
    }
  }

  const getConditionColor = (condition: string) => {
    if (!condition) {
      return 'bg-gray-100 text-gray-800'
    }
    
    switch (condition.toLowerCase()) {
      case 'new': return 'bg-green-100 text-green-800'
      case 'used': return 'bg-blue-100 text-blue-800'
      case 'reconditioned': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTransmissionIcon = (transmission: string) => {
    switch (transmission?.toLowerCase()) {
      case 'automatic': return '🔄'
      case 'manual': return '🎛️'
      case 'semi-automatic': return '⚙️'
      default: return '⚙️'
    }
  }

  const getFuelIcon = (fuelType: string) => {
    switch (fuelType?.toLowerCase()) {
      case 'petrol': return '⛽'
      case 'diesel': return '⛽'
      case 'electric': return '⚡'
      case 'hybrid': return '🔋'
      case 'cng': return '💨'
      default: return '⛽'
    }
  }

  return (
    <div className="flex-shrink-0 w-full sm:w-80 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 group">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        {ad.images && ad.images.length > 0 && !imageError ? (
          <img
            src={ad.images[0]}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-4xl">{getVehicleIcon(ad.vehicleType)}</div>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {ad.isFeatured && (
            <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
              
              FEATURED
            </div>
          )}
          {ad.isSponsored && (
            <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
              
              SPONSORED
            </div>
          )}
          {ad.isVerified && (
            <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
              
              VERIFIED
            </div>
          )}
        </div>
        
        
        
        {/* Price Tag */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-2xl font-bold text-white drop-shadow-lg">
            {formatPrice(ad.price)}
          </div>
        </div>
        
        {/* Urgent Badge */}
        {ad.status === 'urgent' && (
          <div className="absolute bottom-3 right-3 px-3 py-1 bg-gradient-to-r from-orange-600 to-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
            <Zap size={10} />
            URGENT
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <Link href={`/ads/${ad._id}`}>
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors cursor-pointer">
            {ad.title}
          </h3>
        </Link>
        
        {/* Brand & Model */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            {ad.brand} {ad.model}
          </span>
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${getConditionColor(ad.condition)}`}>
            {ad.condition}
          </span>
        </div>
        
        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={14} />
            <span>{ad.city}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={14} />
            <span>{ad.year}</span>
            {ad.mileage && <span>• {ad.mileage.toLocaleString()} km</span>}
            {ad.transmission && <span>• {getTransmissionIcon(ad.transmission)} {ad.transmission}</span>}
            {ad.fuelType && <span>• {getFuelIcon(ad.fuelType)} {ad.fuelType}</span>}
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{ad.views?.toLocaleString() || 0} views</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={14} />
            <span>{formatDate(ad.createdAt)}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Link href={`/ads/${ad._id}`} className="flex-1">
            <button className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              View Details
            </button>
          </Link>
          <button className="px-4 py-2.5 bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105">
            Contact
          </button>
        </div>
      </div>
    </div>
  )
}

// Skeleton Loader
function AdsSectionSkeleton({ title }: { title: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-200 rounded-xl animate-pulse">
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
        </div>
        <div>
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      
      <div className="flex overflow-x-auto gap-6 pb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-shrink-0 w-80 bg-white rounded-2xl shadow border border-gray-200">
            <div className="h-56 bg-gray-200 rounded-t-2xl animate-pulse"></div>
            <div className="p-5">
              <div className="h-5 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



function getSectionDescription(type: string) {
  switch (type) {
    case 'featured': return 'Premium verified listings'
    case 'sponsored': return 'Promoted by our partners'
    case 'trending': return 'Most viewed this week'
    case 'latest': return 'Recently added vehicles'
    case 'budget': return 'Great deals under budget'
    case 'random': return 'Handpicked for you'
    default: return 'Best vehicle selections'
  }
}

// CSS for hiding scrollbar
const styles = `
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
`

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}