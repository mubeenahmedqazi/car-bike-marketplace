"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Eye, MapPin, Calendar, Star, Shield, Zap, Fuel, Gauge } from "lucide-react"
import { 
  formatPrice, 
  timeAgo, 
  getVehicleIcon, 
  getConditionColor,
  getTransmissionIcon,
  getFuelIcon 
} from "@/lib/utils"

interface AdCardProps {
  ad: {
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
    status?: string
    createdAt: string
  }
  variant?: "grid" | "list" | "compact"
  showSaveButton?: boolean
  onSave?: (adId: string) => void
}

export default function AdCard({ 
  ad, 
  variant = "grid", 
  showSaveButton = true,
  onSave 
}: AdCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(!isSaved)
    if (onSave) onSave(ad._id)
  }

  if (variant === "list") {
    return (
      <Link href={`/ads/${ad._id}`}>
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden group">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-64 relative h-48 md:h-auto">
              {ad.images && ad.images.length > 0 && !imageError ? (
                <img
                  src={ad.images[0]}
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-4xl">{getVehicleIcon(ad.vehicleType)}</div>
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {ad.isFeatured && (
                  <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Star size={10} />
                    Featured
                  </div>
                )}
                {ad.isSponsored && (
                  <div className="px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                    Sponsored
                  </div>
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {ad.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                      {ad.brand} {ad.model}
                    </span>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${getConditionColor(ad.condition).bg} ${getConditionColor(ad.condition).text}`}>
                      {ad.condition}
                    </span>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-orange-600">
                  {formatPrice(ad.price)}
                </div>
              </div>
              
              {/* Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span>{ad.year}</span>
                </div>
                
                {ad.mileage && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Gauge size={16} />
                    <span>{ad.mileage.toLocaleString()} km</span>
                  </div>
                )}
                
                {ad.transmission && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-lg">{getTransmissionIcon(ad.transmission)}</span>
                    <span>{ad.transmission}</span>
                  </div>
                )}
                
                {ad.fuelType && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-lg">{getFuelIcon(ad.fuelType)}</span>
                    <span>{ad.fuelType}</span>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{ad.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{ad.views.toLocaleString()} views</span>
                  </div>
                  <div>
                    <span>{timeAgo(ad.createdAt)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {ad.isVerified && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <Shield size={14} />
                      <span>Verified</span>
                    </div>
                  )}
                  
                  {showSaveButton && (
                    <button
                      onClick={handleSave}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title={isSaved ? "Remove from saved" : "Save ad"}
                    >
                      <Heart 
                        size={20} 
                        className={isSaved ? "fill-red-500 text-red-500" : "text-gray-400"} 
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === "compact") {
    return (
      <Link href={`/ads/${ad._id}`}>
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 p-3 group">
          <div className="flex items-start gap-3">
            {/* Image */}
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              {ad.images && ad.images.length > 0 && !imageError ? (
                <img
                  src={ad.images[0]}
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-xl">{getVehicleIcon(ad.vehicleType)}</div>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-orange-600">
                {ad.title}
              </h4>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                  {ad.brand}
                </span>
                <span className="text-xs text-gray-500">{ad.year}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="font-bold text-orange-600 text-sm">
                  {formatPrice(ad.price)}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin size={10} />
                  {ad.city}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Default grid variant
  return (
    <Link href={`/ads/${ad._id}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {ad.images && ad.images.length > 0 && !imageError ? (
            <img
              src={ad.images[0]}
              alt={ad.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-4xl">{getVehicleIcon(ad.vehicleType)}</div>
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {ad.isFeatured && (
              <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                <Star size={10} />
                Featured
              </div>
            )}
            {ad.isSponsored && (
              <div className="px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                Sponsored
              </div>
            )}
            {ad.isVerified && (
              <div className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                <Shield size={10} />
                Verified
              </div>
            )}
            {ad.condition === 'New' && (
              <div className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                New
              </div>
            )}
          </div>
          
          {/* Save Button */}
          {showSaveButton && (
            <button
              onClick={handleSave}
              className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-lg"
              title={isSaved ? "Remove from saved" : "Save ad"}
            >
              <Heart 
                size={16} 
                className={isSaved ? "fill-red-500 text-red-500" : "text-gray-600"} 
              />
            </button>
          )}
          
          {/* Price */}
          <div className="absolute bottom-2 left-2 right-2">
            <div className="text-2xl font-bold text-white drop-shadow-lg">
              {formatPrice(ad.price)}
            </div>
          </div>
          
          {/* Urgent Badge */}
          {ad.status === 'urgent' && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
              <Zap size={10} />
              URGENT
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {ad.title}
          </h3>
          
          {/* Brand & Model */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
              {ad.brand} {ad.model}
            </span>
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${getConditionColor(ad.condition).bg} ${getConditionColor(ad.condition).text}`}>
              {ad.condition}
            </span>
          </div>
          
          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={14} />
              <span>{ad.city}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{ad.year}</span>
              </div>
              
              {ad.mileage && (
                <div className="flex items-center gap-1">
                  <span>•</span>
                  <Gauge size={14} />
                  <span>{ad.mileage.toLocaleString()} km</span>
                </div>
              )}
              
              {ad.transmission && (
                <div className="flex items-center gap-1">
                  <span>•</span>
                  <span className="text-sm">{getTransmissionIcon(ad.transmission)}</span>
                  <span>{ad.transmission}</span>
                </div>
              )}
              
              {ad.fuelType && (
                <div className="flex items-center gap-1">
                  <span>•</span>
                  <span className="text-sm">{getFuelIcon(ad.fuelType)}</span>
                  <span>{ad.fuelType}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{ad.views.toLocaleString()} views</span>
            </div>
            <div>
              <span>{timeAgo(ad.createdAt)}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <div className="flex-1">
              <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">
                View Details
              </button>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105 text-sm">
              Contact
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}