"use client"

import { useState } from "react"
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Car, 
  Bike,
  RefreshCw
} from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface FilterProps {
  filters: {
    search: string
    category: string
    city: string
    brand: string
    minPrice: string
    maxPrice: string
    minYear: string
    maxYear: string
    transmission: string
    fuelType: string
    condition: string
    sortBy: string
  }
  onFilterChange: (key: string, value: string) => void
  onReset: () => void
  loading?: boolean
  className?: string
}

const cities = [
  "All Cities", "Karachi", "Lahore", "Islamabad", "Rawalpindi", 
  "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Other"
]

const brands = [
  "All Brands", "Toyota", "Honda", "Suzuki", "Mercedes", "BMW", "Audi",
  "Hyundai", "Kia", "Ford", "Nissan", "Mitsubishi", "Chevrolet", "Daihatsu", "Other"
]

const categories = [
  { id: "all", name: "All Vehicles", icon: "🚗" },
  { id: "car", name: "Cars", icon: "🚗" },
  { id: "bike", name: "Bikes", icon: "🏍️" },
  { id: "suv", name: "SUVs", icon: "🚙" },
  { id: "truck", name: "Trucks", icon: "🚚" }
]

const transmissions = [
  { id: "all", name: "All Transmissions" },
  { id: "automatic", name: "Automatic" },
  { id: "manual", name: "Manual" },
  { id: "semi-automatic", name: "Semi-Automatic" }
]

const fuelTypes = [
  { id: "all", name: "All Fuel Types" },
  { id: "petrol", name: "Petrol" },
  { id: "diesel", name: "Diesel" },
  { id: "electric", name: "Electric" },
  { id: "hybrid", name: "Hybrid" },
  { id: "cng", name: "CNG" }
]

const conditions = [
  { id: "all", name: "All Conditions" },
  { id: "new", name: "New" },
  { id: "used", name: "Used" },
  { id: "reconditioned", name: "Reconditioned" }
]

const sortOptions = [
  { id: "newest", name: "Newest First" },
  { id: "oldest", name: "Oldest First" },
  { id: "price_low", name: "Price: Low to High" },
  { id: "price_high", name: "Price: High to Low" },
  { id: "popular", name: "Most Popular" },
  { id: "featured", name: "Featured First" }
]

const priceRanges = [
  { id: "all", name: "Any Price", min: 0, max: 0 },
  { id: "under-5lakh", name: "Under 5 Lakh", min: 0, max: 500000 },
  { id: "5lakh-10lakh", name: "5 Lakh - 10 Lakh", min: 500000, max: 1000000 },
  { id: "10lakh-20lakh", name: "10 Lakh - 20 Lakh", min: 1000000, max: 2000000 },
  { id: "20lakh-50lakh", name: "20 Lakh - 50 Lakh", min: 2000000, max: 5000000 },
  { id: "over-50lakh", name: "Over 50 Lakh", min: 5000000, max: 0 }
]

const yearRanges = [
  { id: "all", name: "Any Year", min: 0, max: 0 },
  { id: "2020-2024", name: "2020 - 2024", min: 2020, max: 2024 },
  { id: "2015-2019", name: "2015 - 2019", min: 2015, max: 2019 },
  { id: "2010-2014", name: "2010 - 2014", min: 2010, max: 2014 },
  { id: "2005-2009", name: "2005 - 2009", min: 2005, max: 2009 },
  { id: "before-2005", name: "Before 2005", min: 0, max: 2004 }
]

export default function Filters({ 
  filters, 
  onFilterChange, 
  onReset, 
  loading = false,
  className = "" 
}: FilterProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [priceRange, setPriceRange] = useState("all")
  const [yearRange, setYearRange] = useState("all")

  const handlePriceRangeSelect = (rangeId: string) => {
    setPriceRange(rangeId)
    const range = priceRanges.find(r => r.id === rangeId)
    if (range) {
      onFilterChange("minPrice", range.min.toString())
      onFilterChange("maxPrice", range.max > 0 ? range.max.toString() : "")
    }
  }

  const handleYearRangeSelect = (rangeId: string) => {
    setYearRange(rangeId)
    const range = yearRanges.find(r => r.id === rangeId)
    if (range) {
      onFilterChange("minYear", range.min > 0 ? range.min.toString() : "")
      onFilterChange("maxYear", range.max > 0 ? range.max.toString() : "")
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
          disabled={loading}
        >
          <RefreshCw size={16} />
          Reset All
        </button>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Category</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange("category", cat.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                filters.category === cat.id
                  ? "bg-orange-50 border-orange-500 text-orange-700"
                  : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
              }`}
              disabled={loading}
            >
              <span className="text-xl mb-1">{cat.icon}</span>
              <span className="text-sm font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <MapPin size={16} />
            City
          </label>
          <select
            value={filters.city}
            onChange={(e) => onFilterChange("city", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
            disabled={loading}
          >
            {cities.map((city) => (
              <option key={city} value={city === "All Cities" ? "all" : city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <select
            value={filters.brand}
            onChange={(e) => onFilterChange("brand", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
            disabled={loading}
          >
            {brands.map((brand) => (
              <option key={brand} value={brand === "All Brands" ? "all" : brand.toLowerCase()}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <DollarSign size={16} />
          Price Range
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {priceRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => handlePriceRangeSelect(range.id)}
              className={`p-2 text-sm rounded-lg border transition-all ${
                priceRange === range.id
                  ? "bg-orange-50 border-orange-500 text-orange-700"
                  : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
              }`}
              disabled={loading}
            >
              {range.name}
            </button>
          ))}
        </div>
        
        {/* Custom Price Inputs */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Min Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₨</span>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => onFilterChange("minPrice", e.target.value)}
                placeholder="Min"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₨</span>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange("maxPrice", e.target.value)}
                placeholder="Max"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full py-3 bg-gray-50 hover:bg-gray-100 rounded-lg mb-6 transition-colors flex items-center justify-between"
        disabled={loading}
      >
        <span className="font-medium text-gray-900">Advanced Filters</span>
        {showAdvanced ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-6 mb-6">
          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} />
              Year Range
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {yearRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => handleYearRangeSelect(range.id)}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    yearRange === range.id
                      ? "bg-orange-50 border-orange-500 text-orange-700"
                      : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                  disabled={loading}
                >
                  {range.name}
                </button>
              ))}
            </div>
            
            {/* Custom Year Inputs */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">From Year</label>
                <input
                  type="number"
                  value={filters.minYear}
                  onChange={(e) => onFilterChange("minYear", e.target.value)}
                  min="1950"
                  max={currentYear}
                  placeholder="1950"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">To Year</label>
                <input
                  type="number"
                  value={filters.maxYear}
                  onChange={(e) => onFilterChange("maxYear", e.target.value)}
                  min="1950"
                  max={currentYear}
                  placeholder={currentYear.toString()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transmission
            </label>
            <div className="grid grid-cols-2 gap-2">
              {transmissions.map((trans) => (
                <button
                  key={trans.id}
                  onClick={() => onFilterChange("transmission", trans.id)}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    filters.transmission === trans.id
                      ? "bg-orange-50 border-orange-500 text-orange-700"
                      : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                  disabled={loading}
                >
                  {trans.name}
                </button>
              ))}
            </div>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuel Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {fuelTypes.map((fuel) => (
                <button
                  key={fuel.id}
                  onClick={() => onFilterChange("fuelType", fuel.id)}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    filters.fuelType === fuel.id
                      ? "bg-orange-50 border-orange-500 text-orange-700"
                      : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                  disabled={loading}
                >
                  {fuel.name}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {conditions.map((cond) => (
                <button
                  key={cond.id}
                  onClick={() => onFilterChange("condition", cond.id)}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    filters.condition === cond.id
                      ? "bg-orange-50 border-orange-500 text-orange-700"
                      : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                  disabled={loading}
                >
                  {cond.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
          disabled={loading}
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters */}
      {(filters.category !== "all" || 
        filters.city !== "all" || 
        filters.brand !== "all" ||
        filters.minPrice || 
        filters.maxPrice ||
        filters.minYear ||
        filters.maxYear ||
        filters.transmission !== "all" ||
        filters.fuelType !== "all" ||
        filters.condition !== "all") && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.category !== "all" && (
              <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                <span>{categories.find(c => c.id === filters.category)?.name}</span>
                <button 
                  onClick={() => onFilterChange("category", "all")}
                  className="ml-1 hover:text-orange-900"
                  disabled={loading}
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {filters.city !== "all" && (
              <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <MapPin size={12} />
                <span>{filters.city.charAt(0).toUpperCase() + filters.city.slice(1)}</span>
                <button 
                  onClick={() => onFilterChange("city", "all")}
                  className="ml-1 hover:text-blue-900"
                  disabled={loading}
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {filters.brand !== "all" && (
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <span>{filters.brand.charAt(0).toUpperCase() + filters.brand.slice(1)}</span>
                <button 
                  onClick={() => onFilterChange("brand", "all")}
                  className="ml-1 hover:text-green-900"
                  disabled={loading}
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {(filters.minPrice || filters.maxPrice) && (
              <div className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                <DollarSign size={12} />
                <span>
                  {filters.minPrice && `From ${formatPrice(parseInt(filters.minPrice))}`}
                  {filters.minPrice && filters.maxPrice && " - "}
                  {filters.maxPrice && `To ${formatPrice(parseInt(filters.maxPrice))}`}
                </span>
                <button 
                  onClick={() => {
                    onFilterChange("minPrice", "")
                    onFilterChange("maxPrice", "")
                    setPriceRange("all")
                  }}
                  className="ml-1 hover:text-purple-900"
                  disabled={loading}
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {/* Add more active filter chips as needed */}
          </div>
        </div>
      )}

      {/* Apply Filters Button */}
      <button
        onClick={() => {}} // This would typically refresh the results
        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Applying Filters...
          </div>
        ) : (
          "Apply Filters"
        )}
      </button>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600">1,234</div>
            <div className="text-sm text-gray-600">Cars Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">987</div>
            <div className="text-sm text-gray-600">Verified Ads</div>
          </div>
        </div>
      </div>
    </div>
  )
}