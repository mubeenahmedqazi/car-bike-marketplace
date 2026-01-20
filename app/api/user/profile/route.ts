import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import { verifyToken } from '@/lib/auth'
import mongoose from 'mongoose'

// GET: Fetch user profile - FIXED VERSION
export async function GET(request: NextRequest) {
  console.log('👤 === FETCHING USER PROFILE (GET) ===')
  
  try {
    // Get token from cookies
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      console.log('❌ No token found in cookies')
      return NextResponse.json(
        { message: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }
    
    console.log('✅ Token found, verifying...')
    
    // Verify token
    const payload = await verifyToken(token)
    
    if (!payload) {
      console.log('❌ Invalid token payload')
      return NextResponse.json(
        { message: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }
    
    console.log('✅ Token verified. User ID:', payload.userId)
    
    await connectDB()
    console.log('✅ MongoDB connected')
    
    // Convert userId to ObjectId
    const userId = new mongoose.Types.ObjectId(payload.userId)
    
    console.log('🔍 Looking for user with ID:', userId)
    
    // ===== FIX: Use direct MongoDB fetch instead of Mongoose =====
    const db = mongoose.connection.db
    
    // Fetch user directly from MongoDB collection
    const user = await db.collection('users').findOne(
      { _id: userId },
      { 
        projection: { 
          password: 0, // Exclude password
          refreshToken: 0 // Exclude refreshToken if exists
        }
      }
    )
    
    if (!user) {
      console.log('❌ User not found with ID:', userId)
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }
    
    console.log('✅ User found via direct MongoDB fetch:', {
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      profilePictureLength: user.profilePicture?.length || 0
    })
    
    // Return the user data
    const responseData = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      city: user.city || '',
      profilePicture: user.profilePicture || '', // This should now have the value
      joinedDate: user.createdAt || user.joinedDate || new Date(),
      role: user.role || 'user',
      isVerified: user.isVerified || false
    }
    
    console.log('📤 Sending response:', {
      profilePicture: responseData.profilePicture,
      hasProfilePicture: !!responseData.profilePicture
    })
    
    return NextResponse.json(responseData)
    
  } catch (error: any) {
    console.error('❌ Error fetching profile:', error)
    console.error('Stack trace:', error.stack)
    
    return NextResponse.json(
      { 
        message: 'Internal server error',
        error: error.message
      },
      { status: 500 }
    )
  }
}

// PUT: Update user profile
export async function PUT(request: NextRequest) {
  console.log('✏️ === UPDATING USER PROFILE (PUT) ===')
  
  try {
    // Get token from cookies
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      console.log('❌ No token found in cookies')
      return NextResponse.json(
        { message: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }
    
    // Verify token
    const payload = await verifyToken(token)
    
    if (!payload) {
      console.log('❌ Invalid token payload')
      return NextResponse.json(
        { message: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }
    
    const { name, email, phone, city } = await request.json()
    
    console.log('📝 Update data received:', { name, email, phone, city })
    
    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email' },
        { status: 400 }
      )
    }
    
    await connectDB()
    console.log('✅ MongoDB connected for update')
    
    // Check if email is already taken by another user
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: payload.userId }
    })
    
    if (existingUser) {
      console.log('❌ Email already taken by another user')
      return NextResponse.json(
        { message: 'Email is already taken' },
        { status: 400 }
      )
    }
    
    // Update user using direct MongoDB update
    const db = mongoose.connection.db
    const userId = new mongoose.Types.ObjectId(payload.userId)
    
    const updateResult = await db.collection('users').updateOne(
      { _id: userId },
      {
        $set: {
          name,
          email: email.toLowerCase(),
          phone: phone || '',
          city: city || '',
          updatedAt: new Date()
        }
      }
    )
    
    console.log('📊 Profile update result:', updateResult)
    
    if (updateResult.matchedCount === 0) {
      console.log('❌ User not found for update')
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }
    
    // Fetch updated user
    const updatedUser = await db.collection('users').findOne(
      { _id: userId },
      { projection: { password: 0 } }
    )
    
    console.log('✅ Profile updated successfully')
    
    return NextResponse.json({
      _id: updatedUser?._id.toString(),
      name: updatedUser?.name,
      email: updatedUser?.email,
      phone: updatedUser?.phone || '',
      city: updatedUser?.city || '',
      profilePicture: updatedUser?.profilePicture || '',
      joinedDate: updatedUser?.createdAt || updatedUser?.joinedDate || new Date(),
      role: updatedUser?.role || 'user',
      isVerified: updatedUser?.isVerified || false
    })
    
  } catch (error: any) {
    console.error('❌ Error updating profile:', error)
    console.error('Stack trace:', error.stack)
    
    return NextResponse.json(
      { 
        message: 'Internal server error',
        error: error.message
      },
      { status: 500 }
    )
  }
}