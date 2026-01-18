import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Ad from "@/models/Ad"
import { uploadToCloudinary } from "@/lib/cloudinary"

// =======================
// GET ALL ADS
// =======================
export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)

    const type = searchParams.get("type") || "latest"
    const limit = Number(searchParams.get("limit") || 8)
    const page = Number(searchParams.get("page") || 1)
    const category = searchParams.get("category")
    const brand = searchParams.get("brand")
    const city = searchParams.get("city")
    const search = searchParams.get("search") // ADDED
    const sort = searchParams.get("sort") || "newest" // ADDED
    const minPrice = searchParams.get("minPrice") // ADDED
    const maxPrice = searchParams.get("maxPrice") // ADDED
    const minYear = searchParams.get("minYear") // ADDED
    const maxYear = searchParams.get("maxYear") // ADDED

    console.log("📥 GET /api/ads params:", {
      type,
      limit,
      page,
      category,
      brand,
      city,
      search,
      sort,
      minPrice,
      maxPrice,
      minYear,
      maxYear
    })

    let query: any = { status: "active" }

    if (category && category !== "all") {
      query.vehicleType = category.charAt(0).toUpperCase() + category.slice(1)
    }

    if (brand && brand !== "all") {
      query.brand = new RegExp(brand, "i")
    }

    if (city && city !== "all") {
      query.city = new RegExp(city, "i")
    }

    // ADDED: Search functionality
    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { brand: new RegExp(search, "i") },
        { model: new RegExp(search, "i") },
        { city: new RegExp(search, "i") },
        { description: new RegExp(search, "i") }
      ]
    }

    // ADDED: Price range filter
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    // ADDED: Year range filter
    if (minYear || maxYear) {
      query.year = {}
      if (minYear) query.year.$gte = Number(minYear)
      if (maxYear) query.year.$lte = Number(maxYear)
    }

    let sortOptions: any = { createdAt: -1 }

    // UPDATED: Sorting based on sort parameter
    if (sort === "oldest") {
      sortOptions = { createdAt: 1 }
    } else if (sort === "price_low") {
      sortOptions = { price: 1 }
    } else if (sort === "price_high") {
      sortOptions = { price: -1 }
    } else if (sort === "popular") {
      sortOptions = { views: -1 }
    }

    if (type === "featured") query.isFeatured = true
    if (type === "sponsored") query.isSponsored = true
    if (type === "trending") sortOptions = { views: -1 }
    if (type === "budget") {
      if (!query.price) query.price = {}
      query.price.$lte = 500000
      if (sort !== "price_low" && sort !== "price_high") {
        sortOptions = { price: 1 }
      }
    }

    const skip = (page - 1) * limit
    const total = await Ad.countDocuments(query)

    let ads = await Ad.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)

    if (type === "random") {
      ads = ads.sort(() => Math.random() - 0.5)
    }

    const adsData = ads.map((ad) => {
      const obj = ad.toObject()
      obj._id = obj._id.toString()
      return obj
    })

    return NextResponse.json({
      success: true,
      ads: adsData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error("❌ GET /api/ads ERROR:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch ads" },
      { status: 500 }
    )
  }
}

// =======================
// CREATE NEW AD
// =======================
export async function POST(request: Request) {
  try {
    await connectDB()

    const formData = await request.formData()

    const title = formData.get("title") as string
    const vehicleType = formData.get("vehicleType") as string
    const brand = formData.get("brand") as string
    const model = formData.get("model") as string
    const year = Number(formData.get("year"))
    const mileage = Number(formData.get("mileage") || 0)
    const price = Number(formData.get("price"))
    const city = formData.get("city") as string
    const description = formData.get("description") as string
    const transmission = formData.get("transmission") as string
    const fuelType = formData.get("fuelType") as string
    const condition = formData.get("condition") as string
    const phone = formData.get("phone") as string

    if (!title || !brand || !model || !price || !city || !phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      )
    }

    const imageFiles = formData.getAll("images") as File[]
    const images: string[] = []

    for (const file of imageFiles) {
      if (file.size > 0) {
        const upload = await uploadToCloudinary(file, "car-ads")
        if (upload.success && upload.url) {
          images.push(upload.url)
        }
      }
    }

    if (images.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      )
    }

    const ad = await Ad.create({
      title,
      vehicleType,
      brand,
      model,
      year,
      mileage,
      price,
      city,
      description,
      transmission,
      fuelType,
      condition,
      phone,
      images,
      status: "active",
      views: 0,
      isVerified: false,
      isFeatured: false,
      isSponsored: false,
    })

    return NextResponse.json(
      {
        success: true,
        adId: ad._id.toString(),
        message: "Ad created successfully",
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("❌ POST /api/ads ERROR:", error)
    return NextResponse.json(
      { success: false, message: "Failed to create ad" },
      { status: 500 }
    )
  }
}