import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Ad from "@/models/Ad"
import { getAuthUser } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    
    const user = await getAuthUser(req)
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      )
    }
    
    console.log("🔍 Fetching ads for user:", user.email)
    
    // Query by sellerEmail (lowercase for consistency)
    const ads = await Ad.find({ sellerEmail: user.email.toLowerCase() })
      .sort({ createdAt: -1 })
      .lean()
    
    console.log("📊 Found ads count:", ads.length)
    
    if (ads.length === 0) {
      // Also try without lowercase for existing ads
      const adsCaseSensitive = await Ad.find({ sellerEmail: user.email })
        .sort({ createdAt: -1 })
        .lean()
      
      console.log("🔍 Found ads (case sensitive):", adsCaseSensitive.length)
      
      if (adsCaseSensitive.length > 0) {
        ads.push(...adsCaseSensitive)
      }
    }
    
    // Format response
    const formattedAds = ads.map(ad => ({
      _id: ad._id?.toString() || '',
      title: ad.title || '',
      vehicleType: ad.vehicleType || 'Car',
      brand: ad.brand || '',
      model: ad.model || '',
      year: ad.year || 0,
      mileage: ad.mileage || 0,
      price: ad.price || 0,
      city: ad.city || '',
      description: ad.description || '',
      transmission: ad.transmission || 'Automatic',
      fuelType: ad.fuelType || 'Petrol',
      condition: ad.condition || 'Used',
      phone: ad.phone || '',
      images: ad.images || [],
      status: ad.status || 'active',
      views: ad.views || 0,
      isFeatured: ad.isFeatured || false,
      isVerified: ad.isVerified || false,
      createdAt: ad.createdAt?.toISOString() || new Date().toISOString(),
      sellerName: ad.sellerName || '',
      sellerEmail: ad.sellerEmail || ''
    }))
    
    return NextResponse.json({
      success: true,
      ads: formattedAds,
      userEmail: user.email,
      totalAds: formattedAds.length
    })
    
  } catch (error: any) {
    console.error('❌ Get my ads error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to fetch ads',
        ads: []
      },
      { status: 500 }
    )
  }
}