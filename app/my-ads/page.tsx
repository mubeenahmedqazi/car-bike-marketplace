"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
    Car,
    Bike,
    Eye,
    Edit2,
    Trash2,
    Filter,
    Search,
    CheckCircle,
    Clock,
    XCircle,
    Shield,
    Star,
    TrendingUp,
    BarChart3,
    ExternalLink
} from "lucide-react"

interface AdData {
    _id: string
    title: string
    vehicleType: string
    brand: string
    model: string
    year: number
    price: number
    city: string
    status: string
    views: number
    isFeatured: boolean
    isVerified: boolean
    createdAt: string
    images: string[]
    description: string
    mileage: number
    fuelType: string
    transmission: string
    condition: string
    phone: string
}

export default function MyAdsPage() {
    const router = useRouter()
    const [ads, setAds] = useState<AdData[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortBy, setSortBy] = useState("newest")
    const [debugInfo, setDebugInfo] = useState<any>(null)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        fetchMyAds()
    }, [])

    const fetchMyAds = async () => {
        try {
            setLoading(true)
            setError("")

            console.log("🔄 Fetching my ads...")

            // Check authentication
            const authRes = await fetch('/api/auth/verify', {
                credentials: 'include'
            })

            if (!authRes.ok) {
                console.log("❌ Auth failed, redirecting to signin")
                router.push('/signin?redirect=/my-ads')
                return
            }

            const authData = await authRes.json()
            console.log("✅ Auth successful, user:", authData.user)
            setDebugInfo({ user: authData.user })

            // Fetch user's ads
            console.log("📡 Calling /api/ads/my...")
            const adsRes = await fetch('/api/ads/my', {
                credentials: 'include'
            })

            console.log("📊 Ads response status:", adsRes.status)

            if (adsRes.ok) {
                const data = await adsRes.json()
                console.log("✅ Ads data received:", data)
                console.log("📝 Number of ads:", data.ads?.length || 0)

                setAds(data.ads || [])
                setDebugInfo((prev: any) => ({
                    ...prev,
                    apiResponse: data,
                    adsCount: data.ads?.length || 0
                }))
            } else {
                const errorText = await adsRes.text()
                console.error("❌ Ads fetch failed:", errorText)
                setError(`Failed to fetch ads: ${adsRes.status}`)
                setDebugInfo((prev: any) => ({
                    ...prev,
                    error: errorText
                }))
            }

        } catch (error) {
            console.error('❌ Failed to fetch ads:', error)
            setError(error instanceof Error ? error.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
            case 'approved':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                    </span>
                )
            case 'pending':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                    </span>
                )
            case 'rejected':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                    </span>
                )
            default:
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {status}
                    </span>
                )
        }
    }

    const handleDeleteAd = async (adId: string) => {
        if (!confirm('Are you sure you want to delete this ad? This action cannot be undone.')) {
            return
        }

        try {
            const res = await fetch(`/api/ads/${adId}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (res.ok) {
                // Remove ad from state
                setAds(ads.filter(ad => ad._id !== adId))
                alert('Ad deleted successfully')
            } else {
                alert('Failed to delete ad')
            }
        } catch (error) {
            console.error('Delete error:', error)
            alert('Error deleting ad')
        }
    }

    const handleEditAd = (adId: string) => {
        // Redirect to edit page
        router.push(`/ads/edit/${adId}`)
    }

    const handleViewAd = (adId: string) => {
        // FIXED: Redirect to ad details page
        // Try different routes based on your app structure
        router.push(`/ads/${adId}`) // This should show ad details
        // OR if you have a different route:
        // router.push(`/buy/${adId}`)
        // router.push(`/vehicle/${adId}`)
    }

    // Make entire ad card clickable
    const handleAdClick = (adId: string) => {
        router.push(`/ads/${adId}`)
    }

    // Filter and sort ads
    const filteredAds = ads
        .filter(ad => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                return (
                    ad.title.toLowerCase().includes(query) ||
                    ad.brand.toLowerCase().includes(query) ||
                    ad.model.toLowerCase().includes(query) ||
                    ad.city.toLowerCase().includes(query)
                )
            }
            return true
        })
        .filter(ad => {
            // Status filter
            if (statusFilter === 'all') return true
            return ad.status.toLowerCase() === statusFilter.toLowerCase()
        })
        .sort((a, b) => {
            // Sort by
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                case 'price_low':
                    return a.price - b.price
                case 'price_high':
                    return b.price - a.price
                case 'views':
                    return b.views - a.views
                default:
                    return 0
            }
        })

    const stats = {
        total: ads.length,
        active: ads.filter(ad => ad.status.toLowerCase() === 'active' || ad.status.toLowerCase() === 'approved').length,
        pending: ads.filter(ad => ad.status.toLowerCase() === 'pending').length,
        featured: ads.filter(ad => ad.isFeatured).length,
        totalViews: ads.reduce((sum, ad) => sum + ad.views, 0),
        totalValue: ads.reduce((sum, ad) => sum + ad.price, 0)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your ads...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Debug Panel */}
            {debugInfo && (
                <div className="fixed bottom-4 right-4 z-50">
                    <details className="bg-white rounded-lg shadow-lg border border-gray-300 p-4 max-w-sm">
                        <summary className="font-medium cursor-pointer text-sm">Debug Info</summary>
                        <div className="mt-2 text-xs">
                            <pre className="overflow-auto max-h-64">
                                {JSON.stringify(debugInfo, null, 2)}
                            </pre>
                            {error && <p className="text-red-600 mt-2">Error: {error}</p>}
                            <button
                                onClick={fetchMyAds}
                                className="mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                            >
                                Refresh Data
                            </button>
                        </div>
                    </details>
                </div>
            )}

            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold">My Ads</h1>
                            <p className="text-red-100 mt-2">Manage all your vehicle listings in one place</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/sell"
                                className="bg-white text-red-500 font-semibold px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors flex items-center gap-2"
                            >
                                <Car className="w-5 h-5" />
                                Post New Ad
                            </Link>
                           
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="max-w-7xl mx-auto px-4 -mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <BarChart3 className="text-orange-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Ads</p>
                                <p className="text-xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Active</p>
                                <p className="text-xl font-bold text-gray-900">{stats.active}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="text-yellow-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-xl font-bold text-gray-900">{stats.pending}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Star className="text-purple-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Featured</p>
                                <p className="text-xl font-bold text-gray-900">{stats.featured}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Eye className="text-blue-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Views</p>
                                <p className="text-xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="text-green-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Value</p>
                                <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalValue)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search your ads..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5 text-gray-400" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                                <option value="views">Most Viewed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Ads Grid */}
                {filteredAds.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Car className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {ads.length === 0 ? 'No Ads Found' : 'No Matching Ads'}
                            </h3>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                {ads.length === 0
                                    ? 'You haven\'t posted any vehicle ads yet. Start by creating your first listing to reach thousands of buyers.'
                                    : 'No ads match your current filters. Try adjusting your search or filter criteria.'
                                }
                            </p>
                            <Link
                                href="/sell"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium px-8 py-4 rounded-xl hover:shadow-xl transition-all"
                            >
                                <Car className="w-5 h-5" />
                                {ads.length === 0 ? 'Create Your First Ad' : 'Post New Ad'}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredAds.map((ad) => (
                            <div
                                key={ad._id}
                                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                                onClick={() => handleAdClick(ad._id)}
                            >
                                <div className="md:flex">
                                    {/* Image Section */}
                                    <div className="md:w-2/5">
                                        <div className="h-48 md:h-full bg-gray-200 relative">
                                            {ad.images && ad.images.length > 0 ? (
                                                <img
                                                    src={ad.images[0]}
                                                    alt={ad.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                                    {ad.vehicleType === 'Car' ? (
                                                        <Car className="w-12 h-12 text-gray-500" />
                                                    ) : (
                                                        <Bike className="w-12 h-12 text-gray-500" />
                                                    )}
                                                </div>
                                            )}
                                            <div className="absolute top-3 left-3">
                                                {getStatusBadge(ad.status)}
                                            </div>
                                            {ad.isFeatured && (
                                                <div className="absolute top-3 right-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                        <Star className="w-3 h-3 mr-1" />
                                                        Featured
                                                    </span>
                                                </div>
                                            )}
                                            {ad.isVerified && (
                                                <div className="absolute bottom-3 left-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <Shield className="w-3 h-3 mr-1" />
                                                        Verified
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Details Section */}
                                    <div className="md:w-3/5 p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-orange-600 text-lg truncate">{ad.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="text-lg font-bold text-black-600">{formatCurrency(ad.price)}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Eye className="w-3 h-3" />
                                                        {ad.views} views
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-3">
                                            {ad.brand} {ad.model} • {ad.year} • {ad.city}
                                        </p>

                                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                                            <div className="text-gray-600">
                                                <span className="font-medium">Mileage:</span> {ad.mileage?.toLocaleString() || 'N/A'} km
                                            </div>
                                            <div className="text-gray-600">
                                                <span className="font-medium">Fuel:</span> {ad.fuelType || 'N/A'}
                                            </div>
                                            <div className="text-gray-600">
                                                <span className="font-medium">Transmission:</span> {ad.transmission || 'N/A'}
                                            </div>
                                            <div className="text-gray-600">
                                                <span className="font-medium">Condition:</span> {ad.condition || 'N/A'}
                                            </div>
                                        </div>

                                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                                            {ad.description}
                                        </p>

                                        <div className="flex justify-between items-center">
                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                <ExternalLink className="w-3 h-3" />
                                                Posted: {formatDate(ad.createdAt)}
                                            </div>
                                            <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => handleViewAd(ad._id)}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium rounded-lg transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={() => handleEditAd(ad._id)}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 text-sm font-medium rounded-lg transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteAd(ad._id)}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-red-600 hover:bg-orange-100 text-sm font-medium rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats Summary */}
                {ads.length > 0 && (
                    <div className="mt-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Ads Performance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-red-600">{stats.total}</div>
                                <div className="text-sm text-gray-600">Total Ads</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">
                                    {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%
                                </div>
                                <div className="text-sm text-gray-600">Active Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">
                                    {stats.total > 0 ? Math.round(stats.totalViews / stats.total) : 0}
                                </div>
                                <div className="text-sm text-gray-600">Avg. Views per Ad</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">
                                    {stats.total > 0 ? Math.round((stats.featured / stats.total) * 100) : 0}%
                                </div>
                                <div className="text-sm text-gray-600">Featured Rate</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}