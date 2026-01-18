"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, MapPin, Calendar, Fuel, Gauge, ShieldCheck, 
  Phone, MessageCircle, Heart, Share2, Eye, Car, Bike, 
  CheckCircle, AlertCircle, Star
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
  description: string
  phone: string
  isVerified: boolean
  isFeatured: boolean
  views: number
  createdAt: string
  updatedAt: string
  sellerName?: string
  sellerEmail?: string
  features?: string[]
}

export default function AdDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [ad, setAd] = useState<Ad | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchAd()
    }
  }, [params.id])

  const fetchAd = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/ads/${params.id}`)
      const data = await response.json()
      
      if (data.success) {
        setAd(data.ad)
      } else {
        setError(data.message || "Ad not found")
      }
    } catch (err) {
      setError("Failed to load ad")
      console.error("Error fetching ad:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const handleSaveAd = () => {
    setIsSaved(!isSaved)
    // In real app, make API call to save ad
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: ad?.title,
          text: `Check out this ${ad?.brand} ${ad?.model} for ${formatPrice(ad?.price || 0)}`,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="h-96 bg-gray-300 rounded-xl mb-4"></div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-300 rounded w-20"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-6 w-1/2"></div>
                <div className="h-48 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Ad Not Found"}
          </h2>
          <p className="text-gray-600 mb-6">
            The ad you're looking for doesn't exist or has been removed
          </p>
          <Link href="/buy">
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Browse Other Vehicles
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Results
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="relative h-96 bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              {ad.images && ad.images.length > 0 ? (
                <img
                  src={ad.images[selectedImage]}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  {ad.vehicleType === 'Bike' ? (
                    <Bike size={64} className="text-gray-400" />
                  ) : (
                    <Car size={64} className="text-gray-400" />
                  )}
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {ad.isVerified && (
                  <div className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
                    <ShieldCheck size={14} />
                    Verified
                  </div>
                )}
                {ad.isFeatured && (
                  <div className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
                    <Star size={14} />
                    Featured
                  </div>
                )}
                {ad.condition === 'New' && (
                  <div className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded-full">
                    Brand New
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleSaveAd}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                >
                  <Heart 
                    size={20} 
                    className={isSaved ? "fill-red-500 text-red-500" : "text-gray-600"} 
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                >
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {ad.images && ad.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {ad.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index 
                        ? 'border-orange-500' 
                        : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${ad.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div>
            {/* Title and Price */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {ad.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-orange-600">
                  {formatPrice(ad.price)}
                </div>
                {ad.condition !== 'New' && (
                  <div className="text-sm text-gray-600">
                    Price is negotiable
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar size={18} />
                  <span className="font-medium">Year</span>
                </div>
                <div className="text-lg font-semibold">{ad.year}</div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Gauge size={18} />
                  <span className="font-medium">Mileage</span>
                </div>
                <div className="text-lg font-semibold">
                  {ad.mileage.toLocaleString()} km
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Fuel size={18} />
                  <span className="font-medium">Fuel</span>
                </div>
                <div className="text-lg font-semibold">{ad.fuelType}</div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <span className="text-lg">⚙️</span>
                  <span className="font-medium">Transmission</span>
                </div>
                <div className="text-lg font-semibold">{ad.transmission}</div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <MapPin size={18} />
                  <span className="font-medium">City</span>
                </div>
                <div className="text-lg font-semibold">{ad.city}</div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Eye size={18} />
                  <span className="font-medium">Views</span>
                </div>
                <div className="text-lg font-semibold">
                  {ad.views.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <div className="text-gray-700 whitespace-pre-line">
                {ad.description}
              </div>
            </div>

            {/* Features */}
            {ad.features && ad.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Features
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {ad.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Contact */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Contact Seller
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Phone className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Phone Number</div>
                    {showPhone ? (
                      <div className="text-lg font-semibold text-gray-900">
                        {ad.phone}
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowPhone(true)}
                        className="px-4 py-2 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition-colors"
                      >
                        Click to Reveal Phone Number
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={`tel:${ad.phone}`}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-center"
                  >
                    Call Now
                  </a>
                  <button className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <MessageCircle size={20} />
                    Chat
                  </button>
                </div>
                
                <div className="text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle size={16} />
                    <span>Safety Tips</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Meet in a public place</li>
                    <li>Inspect the vehicle thoroughly before payment</li>
                    <li>Never pay in advance</li>
                    <li>Verify all documents</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Vehicle Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Brand</span>
                  <span className="font-medium">{ad.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span>Model</span>
                  <span className="font-medium">{ad.model}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vehicle Type</span>
                  <span className="font-medium">{ad.vehicleType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Condition</span>
                  <span className="font-medium">{ad.condition}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Listing Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Posted</span>
                  <span className="font-medium">{formatDate(ad.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated</span>
                  <span className="font-medium">{formatDate(ad.updatedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ad ID</span>
                  <span className="font-medium">{ad._id.slice(-8)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Report Ad</h3>
              <p className="text-sm text-gray-600 mb-3">
                If this ad violates our terms, please report it
              </p>
              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                Report This Ad
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}