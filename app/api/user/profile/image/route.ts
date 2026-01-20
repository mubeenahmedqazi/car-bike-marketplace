import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"
import cloudinary from "@/lib/cloudinary"
import mongoose from "mongoose"

export async function POST(request: NextRequest) {
  console.log("📸 === PROFILE IMAGE UPLOAD STARTED ===")

  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No token provided" },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)

    if (!payload?.userId) {
      return NextResponse.json(
        { message: "Unauthorized - Invalid token" },
        { status: 401 }
      )
    }

    await connectDB()

    const formData = await request.formData()
    const file = formData.get("profileImage") as File | null

    if (!file) {
      return NextResponse.json(
        { message: "No image file provided" },
        { status: 400 }
      )
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "File must be an image" },
        { status: 400 }
      )
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Image size must be less than 5MB" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`

    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "carbike-marketplace/profiles",
      public_id: `user_${payload.userId}_${Date.now()}`,
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto" }
      ]
    })

    const userId = new mongoose.Types.ObjectId(payload.userId)

    const updateResult = await User.findByIdAndUpdate(
      userId,
      {
        profilePicture: uploadResult.secure_url,
        updatedAt: new Date()
      },
      { new: true, select: "-password" }
    )

    if (!updateResult) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Profile picture updated successfully",
      imageUrl: uploadResult.secure_url,
      user: {
        _id: updateResult._id.toString(),
        name: updateResult.name,
        email: updateResult.email,
        profilePicture: updateResult.profilePicture
      }
    })

  } catch (error: any) {
    console.error("❌ Error uploading profile image:", error)

    if (error.message?.includes("Invalid api_key")) {
      return NextResponse.json(
        { message: "Cloudinary configuration error" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message
      },
      { status: 500 }
    )
  }
}
