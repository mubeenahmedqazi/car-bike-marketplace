import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"
import mongoose from "mongoose"

/* =========================
   GET: Fetch User Profile
========================= */
export async function GET(request: NextRequest) {
  console.log("👤 === FETCHING USER PROFILE (GET) ===")

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

    const db = mongoose.connection.db
    if (!db) {
      throw new Error("MongoDB database connection not established")
    }

    const userId = new mongoose.Types.ObjectId(payload.userId)

    const user = await db.collection("users").findOne(
      { _id: userId },
      {
        projection: {
          password: 0,
          refreshToken: 0
        }
      }
    )

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      city: user.city || "",
      profilePicture: user.profilePicture || "",
      joinedDate: user.createdAt || user.joinedDate || new Date(),
      role: user.role || "user",
      isVerified: user.isVerified || false
    })

  } catch (error: any) {
    console.error("❌ Error fetching profile:", error)

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message
      },
      { status: 500 }
    )
  }
}

/* =========================
   PUT: Update User Profile
========================= */
export async function PUT(request: NextRequest) {
  console.log("✏️ === UPDATING USER PROFILE (PUT) ===")

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

    const { name, email, phone, city } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      )
    }

    const emailRegex =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email" },
        { status: 400 }
      )
    }

    await connectDB()

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: payload.userId }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already taken" },
        { status: 400 }
      )
    }

    const db = mongoose.connection.db
    if (!db) {
      throw new Error("MongoDB database connection not established")
    }

    const userId = new mongoose.Types.ObjectId(payload.userId)

    const updateResult = await db.collection("users").updateOne(
      { _id: userId },
      {
        $set: {
          name,
          email: email.toLowerCase(),
          phone: phone || "",
          city: city || "",
          updatedAt: new Date()
        }
      }
    )

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    const updatedUser = await db.collection("users").findOne(
      { _id: userId },
      { projection: { password: 0 } }
    )

    return NextResponse.json({
      _id: updatedUser?._id.toString(),
      name: updatedUser?.name,
      email: updatedUser?.email,
      phone: updatedUser?.phone || "",
      city: updatedUser?.city || "",
      profilePicture: updatedUser?.profilePicture || "",
      joinedDate:
        updatedUser?.createdAt ||
        updatedUser?.joinedDate ||
        new Date(),
      role: updatedUser?.role || "user",
      isVerified: updatedUser?.isVerified || false
    })

  } catch (error: any) {
    console.error("❌ Error updating profile:", error)

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message
      },
      { status: 500 }
    )
  }
}
