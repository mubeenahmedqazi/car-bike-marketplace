"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, MapPin, Calendar, Star, Shield, Zap, Gauge } from "lucide-react"
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
}

export default function AdCard({ ad, variant = "grid" }: AdCardProps) {
  const [imageError, setImageError] = useState(false)

  if (variant !== "grid") return null

  return (
    <Link href={`/ads/${ad._id}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden group w-full">

        {/* ✅ SQUARE IMAGE (Desktop + Mobile) */}
        <div className="relative aspect-square w-full overflow-hidden">
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

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {ad.isFeatured && (
              <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                <Star size={10} /> Featured
              </div>
            )}
            {ad.isSponsored && (
              <div className="px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                Sponsored
              </div>
            )}
            {ad.isVerified && (
              <div className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                <Shield size={10} /> Verified
              </div>
            )}
            {ad.condition === "New" && (
              <div className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                New
              </div>
            )}
          </div>

          {/* Price */}
          <div className="absolute bottom-2 left-2 text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
            {formatPrice(ad.price)}
          </div>

          {/* Urgent */}
          {ad.status === "urgent" && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-gradient-to-r from-orange-600 to-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
              <Zap size={10} /> URGENT
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-orange-600">
            {ad.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
              {ad.brand} {ad.model}
            </span>
            <span className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full ${getConditionColor(ad.condition).bg} ${getConditionColor(ad.condition).text}`}>
              {ad.condition}
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              {ad.city}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Calendar size={14} />
              {ad.year}

              {ad.mileage && (
                <>
                  <span>•</span>
                  <Gauge size={14} />
                  {ad.mileage.toLocaleString()} km
                </>
              )}

              {ad.transmission && (
                <>
                  <span>•</span>
                  {getTransmissionIcon(ad.transmission)}
                  {ad.transmission}
                </>
              )}

              {ad.fuelType && (
                <>
                  <span>•</span>
                  {getFuelIcon(ad.fuelType)}
                  {ad.fuelType}
                </>
              )}
            </div>
          </div>

          <div className="flex justify-between text-xs sm:text-sm text-gray-500 border-t pt-3">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              {ad.views.toLocaleString()} views
            </div>
            <span>{timeAgo(ad.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
