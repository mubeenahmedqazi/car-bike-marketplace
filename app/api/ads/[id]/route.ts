import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Ad from "@/models/Ad"
import { deleteFromCloudinary } from "@/lib/cloudinary"
import mongoose from "mongoose"

// Get single ad
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // params is a Promise
) {
  try {
    // Await the params first!
    const { id } = await params
    
    // Check if id exists
    if (!id) {
      console.log("❌ No ID provided in params")
      return NextResponse.json(
        { success: false, message: "Ad ID is required" },
        { status: 400 }
      )
    }
    
    console.log("🔍 GET /api/ads/[id] called with ID:", id)
    console.log("ID length:", id?.length || "undefined")
    
    await connectDB()
    
    console.log("✅ Database connected")
    
    // Try multiple methods to find the ad
    let ad = null
    
    // Method 1: Try direct findById (handles both string and ObjectId)
    ad = await Ad.findById(id)
    
    // Method 2: If not found, try as string
    if (!ad) {
      console.log("🔄 Trying findOne with string ID...")
      ad = await Ad.findOne({ _id: id })
    }
    
    // Method 3: If still not found and it looks like an ObjectId, try with ObjectId
    if (!ad && mongoose.Types.ObjectId.isValid(id)) {
      console.log("🔄 Trying findOne with ObjectId...")
      const objectId = new mongoose.Types.ObjectId(id)
      ad = await Ad.findOne({ _id: objectId })
    }
    
    // Method 4: Last resort - try findById with ObjectId
    if (!ad && mongoose.Types.ObjectId.isValid(id)) {
      console.log("🔄 Trying findById with ObjectId...")
      const objectId = new mongoose.Types.ObjectId(id)
      ad = await Ad.findById(objectId)
    }
    
    if (!ad) {
      console.log("❌ Ad not found with any method")
      
      // Debug: Check what ads exist in database
      const allAds = await Ad.find({}, { _id: 1, title: 1 }).limit(5)
      console.log("First 5 ads in database:")
      allAds.forEach((a, i) => {
        const idStr = a._id.toString()
        console.log(`${i + 1}. ID: ${idStr}, Length: ${idStr.length}, Title: ${a.title}`)
      })
      
      // Check total count
      const total = await Ad.countDocuments({})
      console.log("Total ads in database:", total)
      
      return NextResponse.json(
        { 
          success: false, 
          message: "Ad not found",
          totalAds: total,
          sampleIds: allAds.map(a => a._id.toString())
        },
        { status: 404 }
      )
    }
    
    console.log("✅ Found ad:", ad.title)
    
    // Increment view count
    ad.views += 1
    await ad.save()
    
    // Convert to plain object with string ID
    const adData = ad.toObject()
    adData._id = adData._id.toString()
    
    return NextResponse.json({ 
      success: true, 
      ad: adData
    })
    
  } catch (error: any) {
    console.error("GET /api/ads/[id] ERROR:", error)
    console.error("Error stack:", error.stack)
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Failed to fetch ad",
        error: error.toString()
      },
      { status: 500 }
    )
  }
}

// Update ad - FIX THIS ONE TOO
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params first!
    const { id } = await params
    
    // Check if id exists
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Ad ID is required" },
        { status: 400 }
      )
    }
    
    await connectDB()
    
    const data = await request.json()
    
    // Try multiple methods to find the ad
    let ad = await Ad.findById(id)
    
    if (!ad) {
      ad = await Ad.findOne({ _id: id })
    }
    
    if (!ad && mongoose.Types.ObjectId.isValid(id)) {
      const objectId = new mongoose.Types.ObjectId(id)
      ad = await Ad.findOne({ _id: objectId })
    }
    
    if (!ad) {
      return NextResponse.json(
        { success: false, message: "Ad not found" },
        { status: 404 }
      )
    }
    
    // Update the ad
    Object.assign(ad, data)
    await ad.save()
    
    return NextResponse.json({ 
      success: true, 
      ad,
      message: "Ad updated successfully" 
    })
    
  } catch (error: any) {
    console.error("PUT /api/ads/[id] ERROR:", error)
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Failed to update ad"
      },
      { status: 500 }
    )
  }
}

// Delete ad - FIX THIS ONE TOO
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params first!
    const { id } = await params
    
    // Check if id exists
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Ad ID is required" },
        { status: 400 }
      )
    }
    
    await connectDB()
    
    // Try multiple methods to find the ad
    let ad = await Ad.findById(id)
    
    if (!ad) {
      ad = await Ad.findOne({ _id: id })
    }
    
    if (!ad && mongoose.Types.ObjectId.isValid(id)) {
      const objectId = new mongoose.Types.ObjectId(id)
      ad = await Ad.findOne({ _id: objectId })
    }
    
    if (!ad) {
      return NextResponse.json(
        { success: false, message: "Ad not found" },
        { status: 404 }
      )
    }
    
    // Delete images from Cloudinary
    for (const imageUrl of ad.images) {
      try {
        // Extract public_id from Cloudinary URL
        const publicIdMatch = imageUrl.match(/\/upload\/v\d+\/(.+)\.\w+$/)
        if (publicIdMatch && publicIdMatch[1]) {
          await deleteFromCloudinary(publicIdMatch[1])
        }
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error)
      }
    }
    
    // Delete from database
    if (mongoose.Types.ObjectId.isValid(id)) {
      const objectId = new mongoose.Types.ObjectId(id)
      await Ad.findOneAndDelete({ _id: objectId })
    } else {
      await Ad.findOneAndDelete({ _id: id })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Ad deleted successfully" 
    })
    
  } catch (error: any) {
    console.error("DELETE /api/ads/[id] ERROR:", error)
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Failed to delete ad"
      },
      { status: 500 }
    )
  }
}