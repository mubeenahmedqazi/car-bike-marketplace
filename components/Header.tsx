"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Search, User, Menu, X, ChevronDown, Car, Bike, Phone, Home, TrendingUp, Heart, FileText, HelpCircle, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatNumber } from "@/lib/utils"

interface Brand {
  name: string
  slug: string
  totalAds: number
}

interface Ad {
  _id: string
  title: string
  price: number
  city: string
  year: number
  images?: string[]
  brand: string
  model: string
}

export default function Header() {
  const router = useRouter()
  const [isSticky, setIsSticky] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("cars")
  const [brands, setBrands] = useState<Brand[]>([])
  const [loadingBrands, setLoadingBrands] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [recentAds, setRecentAds] = useState<Ad[]>([])
  const [isLoadingAds, setIsLoadingAds] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  // User authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  
  // Refs for click outside detection
  const searchRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Check authentication status
  const checkAuth = async () => {
    try {
      setIsCheckingAuth(true)
      const response = await fetch('/api/auth/verify', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setIsLoggedIn(true)
          setUserName(data.user?.name || "User")
        } else {
          setIsLoggedIn(false)
          setUserName("")
        }
      } else {
        setIsLoggedIn(false)
        setUserName("")
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      setIsLoggedIn(false)
      setUserName("")
    } finally {
      setIsCheckingAuth(false)
    }
  }

  // Check auth on mount and when route changes
  useEffect(() => {
    checkAuth()
    
    // Listen for route changes
    const handleRouteChange = () => {
      checkAuth()
    }
    
    window.addEventListener('focus', checkAuth)
    return () => window.removeEventListener('focus', checkAuth)
  }, [])

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsSticky(scrollY > 50)
      setIsScrolled(scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fetch brands and recent ads
  useEffect(() => {
    fetchBrands()
    fetchRecentAds()
  }, [])

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && 
          !(event.target as Element).closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch search suggestions
  useEffect(() => {
    if (searchQuery.length > 2) {
      fetchSearchSuggestions(searchQuery)
    } else {
      setSearchSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const fetchBrands = async () => {
    try {
      setLoadingBrands(true)
      const response = await fetch('/api/brands')
      if (!response.ok) throw new Error('Failed to fetch brands')
      
      const data = await response.json()
      
      if (data.success) {
        setBrands(data.brands)
      }
    } catch (error) {
      console.error('Error fetching brands:', error)
      // Fallback to static brands if API fails
      setBrands([
        { name: 'Toyota', slug: 'toyota', totalAds: 1250 },
        { name: 'Honda', slug: 'honda', totalAds: 980 },
        { name: 'Suzuki', slug: 'suzuki', totalAds: 850 },
        { name: 'Mercedes', slug: 'mercedes', totalAds: 320 },
        { name: 'BMW', slug: 'bmw', totalAds: 280 },
        { name: 'Audi', slug: 'audi', totalAds: 210 },
        { name: 'Hyundai', slug: 'hyundai', totalAds: 430 },
        { name: 'Kia', slug: 'kia', totalAds: 390 },
        { name: 'Ford', slug: 'ford', totalAds: 280 },
        { name: 'Nissan', slug: 'nissan', totalAds: 220 }
      ])
    } finally {
      setLoadingBrands(false)
    }
  }

  const fetchRecentAds = async () => {
    try {
      setIsLoadingAds(true)
      const response = await fetch('/api/ads?limit=4')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.ads) {
          setRecentAds(data.ads.slice(0, 4))
        }
      }
    } catch (error) {
      console.error('Error fetching recent ads:', error)
    } finally {
      setIsLoadingAds(false)
    }
  }

  const fetchSearchSuggestions = async (query: string) => {
    try {
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.suggestions) {
          setSearchSuggestions(data.suggestions)
          setShowSuggestions(true)
        }
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const query = encodeURIComponent(searchQuery.trim())
      router.push(`/search?q=${query}&category=${selectedCategory}`)
      setIsSearchOpen(false)
      setShowSuggestions(false)
    }
  }

  const handleQuickSearch = (suggestion: string) => {
    setSearchQuery(suggestion)
    router.push(`/search?q=${encodeURIComponent(suggestion)}&category=${selectedCategory}`)
    setIsSearchOpen(false)
    setShowSuggestions(false)
  }

  // Handle brand click - filter by specific brand
  const handleBrandClick = (brandSlug: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
    }
    router.push(`/buy?brand=${brandSlug}`)
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  // Handle "All Categories" click - show all ads
  const handleAllCategoriesClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
    }
    router.push(`/buy`)
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  const formatAdCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
    return count.toString()
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      
      if (response.ok) {
        // Clear local state
        setIsLoggedIn(false)
        setUserName("")
        setIsUserMenuOpen(false)
        
        // Redirect to home
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error("Logout error:", error)
      // Still clear local state on error
      setIsLoggedIn(false)
      setUserName("")
      setIsUserMenuOpen(false)
      router.push('/')
    }
  }

  const handleSellClick = () => {
    if (!isLoggedIn) {
      // Redirect to signin with redirect parameter
      router.push('/signin?redirect=/sell')
      return
    }
    router.push('/sell')
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>Need help? Call us: <strong>0300-CAR-BIKE</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">🚚 Free Inspection</span>
            <span className="flex items-center gap-1">⭐ Verified Sellers</span>
            <span className="flex items-center gap-1">🛡️ Buyer Protection</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`w-full top-0 z-50 transition-all duration-300 ${
          isSticky 
            ? "fixed shadow-xl backdrop-blur-lg bg-white/95 supports-[backdrop-filter]:bg-white/80" 
            : "relative bg-white border-b border-gray-100"
        } ${isScrolled ? 'py-2' : 'py-4'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo with Placeholder Image */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                {/* Logo Image */}
                <div className="relative">
                  <div className="w-30 h-30 bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden group-hover:scale-105 transition-transform duration-200 border border-amber-600">
                    {/* Free placeholder logo - Replace with your actual logo */}
                    <img 
                      src="LOGO.png" 
                      alt="CAR-BIKE MARKETPLACE"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full search-container" ref={searchRef}>
                <form onSubmit={handleSearch}>
                  <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-gray-200 hover:border-orange-400 focus-within:border-orange-500 focus-within:shadow-lg transition-all duration-300">
                    {/* Category Dropdown */}
                    <div className="relative">
                      <button 
                        type="button"
                        className="flex items-center gap-2 px-4 py-3 text-gray-700 border-r border-gray-300 hover:bg-gray-100 rounded-l-2xl transition-colors"
                        onClick={() => setSelectedCategory(selectedCategory === "cars" ? "bikes" : "cars")}
                      >
                        {selectedCategory === "cars" ? (
                          <>
                            <Car size={18} />
                            <span>Cars</span>
                          </>
                        ) : (
                          <>
                            <Bike size={18} />
                            <span>Bikes</span>
                          </>
                        )}
                        <ChevronDown size={16} />
                      </button>
                    </div>
                    
                    {/* Search Input */}
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
                        placeholder={`Search ${selectedCategory} by brand, model, city...`}
                        className="w-full px-4 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                      />
                      
                      {/* Search Suggestions */}
                      {showSuggestions && searchSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                          <div className="py-2">
                            {searchSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => handleQuickSearch(suggestion)}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700 flex items-center gap-3"
                              >
                                <Search size={16} className="text-gray-400" />
                                <span>{suggestion}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Search Button */}
                    <button 
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-r-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center gap-2"
                    >
                      <Search size={20} />
                      <span className="font-semibold">Search</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                
                
                <Link 
                  href="/buy" 
                  className="text-gray-700 hover:text-orange-600 font-medium transition-colors relative group"
                >
                  <div className="flex items-center gap-2">
                    <Car size={18} />
                    <span>Buy</span>
                  </div>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                
                <button
                  onClick={handleSellClick}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-500 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Sell Now
                </button>
                
                {/* User Menu */}
                <div className="relative user-menu" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-gray-300">
                      <User size={20} />
                    </div>
                    <ChevronDown size={16} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fadeIn">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        {isLoggedIn ? (
                          <>
                            <p className="font-semibold text-gray-900">Welcome, {userName}!</p>
                            <p className="text-sm text-gray-500">Manage your account</p>
                          </>
                        ) : (
                          <>
                            <p className="font-semibold text-gray-900">Welcome, Guest!</p>
                            <p className="text-sm text-gray-500">Sign in to access your account</p>
                          </>
                        )}
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        {!isLoggedIn ? (
                          // NOT LOGGED IN - Show Sign In / Register
                          <>
                            <Link 
                              href="/signin" 
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <User size={18} />
                              <span>Sign In</span>
                            </Link>
                            
                            <Link 
                              href="/signup" 
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <User size={18} />
                              <span>Register</span>
                            </Link>
                          </>
                        ) : (
                          // LOGGED IN - Show User Options
                          <>
                            <Link 
                              href="/my-ads" 
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <FileText size={18} />
                              <span>My Ads</span>
                            </Link>
                            
                           
                            <Link 
                              href="/my-profile" 
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <User size={18} />
                              <span>My Profile</span>
                            </Link>
                            
                            <Link 
                              href="/saved" 
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Heart size={18} />
                              <span>Saved Vehicles</span>
                            </Link>
                          </>
                        )}
                      </div>
                      
                      {/* Help & Logout */}
                      <div className="border-t border-gray-100 pt-2">
                        <Link 
                          href="/help" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <HelpCircle size={18} />
                          <span>Help Center</span>
                        </Link>
                        
                        {isLoggedIn && (
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-red-600 transition-colors text-left"
                          >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </nav>

              {/* Mobile Search & Menu Buttons */}
              <div className="flex items-center gap-3 md:hidden">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-orange-600 transition-colors mobile-menu-button"
                >
                  <Search size={22} />
                </button>
                
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-gray-600 hover:text-orange-600 transition-colors mobile-menu-button"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 animate-fadeIn">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-4" ref={searchRef}>
              <div className="flex items-center gap-2 mb-4">
                <Search className="text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cars, bikes, brands..."
                  className="flex-1 text-lg outline-none placeholder-gray-400"
                  autoFocus
                />
                <button 
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Quick Suggestions */}
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {['Honda Civic', 'Toyota Corolla', 'Suzuki Cultus', 'Mercedes C-Class', 'BMW 3 Series'].map((term) => (
                    <button
                      key={term}
                      onClick={() => handleQuickSearch(term)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Recent Listings */}
              {recentAds.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Recent Listings</h3>
                  <div className="space-y-2">
                    {recentAds.map((ad) => (
                      <Link
                        key={ad._id}
                        href={`/ads/${ad._id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                          {ad.images && ad.images.length > 0 ? (
                            <img 
                              src={ad.images[0]} 
                              alt={ad.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Car size={20} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">{ad.title}</p>
                          <p className="text-xs text-gray-500">{ad.city} • {ad.year}</p>
                        </div>
                        <div className="font-semibold text-orange-600 text-sm">
                          {formatNumber(ad.price)}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              <button 
                type="button"
                onClick={handleSearch}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl mt-4"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fadeIn">
            <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl animate-slideIn" ref={mobileMenuRef}>
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <div className="text-xl font-bold text-gray-900">Menu</div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-1 mb-8">
                    <Link 
                      href="/" 
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Home size={20} />
                      Home
                    </Link>
                    
                    <Link 
                      href="/buy" 
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Car size={20} />
                      Buy Vehicle
                    </Link>
                    
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          router.push('/signin?redirect=/sell')
                        } else {
                          router.push('/sell')
                        }
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 font-medium text-left"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Sell Vehicle
                    </button>

                    {/* User Menu for Mobile */}
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      {isLoggedIn ? (
                        <>
                          <div className="px-3 py-2 mb-3">
                            <p className="font-semibold text-gray-900">Welcome, {userName}!</p>
                          </div>
                          <Link 
                            href="/my-ads" 
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <FileText size={20} />
                            My Ads
                          </Link>
                          <Link 
                            href="/dashboard" 
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <TrendingUp size={20} />
                            My Dashboard
                          </Link>
                          <Link 
                            href="/my-profile" 
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <User size={20} />
                            My Profile
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout()
                              setIsMobileMenuOpen(false)
                            }}
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-red-600 font-medium text-left"
                          >
                            <LogOut size={20} />
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link 
                            href="/signin" 
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <User size={20} />
                            Sign In
                          </Link>
                          <Link 
                            href="/signup" 
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <User size={20} />
                            Register
                          </Link>
                        </>
                      )}
                    </div>

                    {/* Popular Brands */}
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h3 className="font-medium text-gray-900 mb-3 px-3">Popular Brands</h3>
                      <div className="space-y-1">
                        {brands.slice(0, 6).map((brand) => (
                          <button
                            key={brand.name}
                            onClick={(e) => handleBrandClick(brand.slug, e)}
                            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl text-gray-700 text-left"
                          >
                            <span>{brand.name}</span>
                            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                              {formatAdCount(brand.totalAds)}
                            </span>
                          </button>
                        ))}
                        <Link
                          href="/buy"
                          className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded-xl text-blue-600 font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>View All Brands</span>
                          <ChevronDown size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  {!isLoggedIn && (
                    <div className="space-y-2">
                      <Link 
                        href="/signin"
                        className="block w-full py-3 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      
                      <div className="text-center text-sm text-gray-500">
                        New to AutoBazaar?{' '}
                        <Link href="/signup" className="text-orange-600 font-medium">
                          Create Account
                        </Link>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} AutoBazaar. All rights reserved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Category Navigation Bar */}
      <div className={`hidden md:block bg-white border-b border-gray-100 transition-all duration-300 ${
        isSticky ? 'fixed top-16 left-0 right-0 shadow-md z-40' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-6 overflow-x-auto py-3">
            {/* All Categories Button */}
            <button
              onClick={handleAllCategoriesClick}
              className="flex items-center gap-2 text-orange-600 font-semibold whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              All Categories
            </button>
            
            {loadingBrands ? (
              <div className="flex items-center gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {brands.slice(0, 8).map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => handleBrandClick(brand.slug)}
                    className="group relative text-gray-600 hover:text-orange-600 font-medium whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span>{brand.name}</span>
                      <span className="text-xs bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-full">
                        {formatAdCount(brand.totalAds)}
                      </span>
                    </div>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                  </button>
                ))}
                
                <Link 
                  href="/buy"
                  className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-blue-50"
                >
                  View All
                  <ChevronDown size={16} />
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Add padding when header is sticky to prevent content jump */}
      {isSticky && <div className="h-20 md:h-24"></div>}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        /* Hide scrollbar for category navigation */
        .overflow-x-auto {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}