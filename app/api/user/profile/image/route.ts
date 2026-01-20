import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import { verifyToken } from '@/lib/auth'
import cloudinary from '@/lib/cloudinary'
import mongoose from 'mongoose'

export async function POST(request: NextRequest) {
  console.log('📸 === PROFILE IMAGE UPLOAD STARTED ===')
  
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
    
    console.log('✅ Token verified successfully')
    console.log('📋 Token payload:', JSON.stringify(payload, null, 2))
    
    await connectDB()
    console.log('✅ MongoDB connected')
    
    // Get the form data
    const formData = await request.formData()
    const file = formData.get('profileImage') as File
    
    if (!file) {
      console.log('❌ No file provided in form data')
      return NextResponse.json(
        { message: 'No image file provided' },
        { status: 400 }
      )
    }
    
    console.log('📁 File received:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified
    })
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log('❌ Invalid file type:', file.type)
      return NextResponse.json(
        { message: 'File must be an image' },
        { status: 400 }
      )
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.log('❌ File too large:', file.size, 'bytes')
      return NextResponse.json(
        { message: 'Image size must be less than 5MB' },
        { status: 400 }
      )
    }
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    console.log('☁️ Uploading to Cloudinary...')
    
    // Convert buffer to base64 for Cloudinary
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`
    
    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: 'carbike-marketplace/profiles',
      public_id: `user_${payload.userId}_${Date.now()}`,
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto' }
      ]
    })
    
    console.log('✅ Cloudinary upload successful!')
    console.log('📎 Cloudinary URL:', uploadResult.secure_url)
    
    // ===== UPDATE MONGODB =====
    console.log('💾 Updating MongoDB...')
    
    // Convert userId to ObjectId
    const userId = new mongoose.Types.ObjectId(payload.userId)
    
    // Method 1: Try updateOne with Mongoose
    const updateResult = await User.updateOne(
      { _id: userId },
      { 
        $set: { 
          profilePicture: uploadResult.secure_url,
          updatedAt: new Date()
        }
      }
    )
    
    console.log('📊 Mongoose update result:', {
      matchedCount: updateResult.matchedCount,
      modifiedCount: updateResult.modifiedCount,
      acknowledged: updateResult.acknowledged
    })
    
    if (updateResult.matchedCount === 0) {
      console.log('❌ No user found with ID:', payload.userId)
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }
    
    // Method 2: Direct MongoDB driver update as backup
    console.log('🔄 Running direct MongoDB update as backup...')
    const db = mongoose.connection.db
    const directResult = await db.collection('users').updateOne(
      { _id: userId },
      { 
        $set: { 
          profilePicture: uploadResult.secure_url,
          updatedAt: new Date()
        }
      }
    )
    
    console.log('📊 Direct MongoDB update result:', directResult)
    
    // Fetch the updated user to verify
    const updatedUser = await User.findById(userId).select('-password')
    
    // Also fetch directly from MongoDB collection
    const directUser = await db.collection('users').findOne(
      { _id: userId },
      { projection: { profilePicture: 1, name: 1, email: 1, _id: 1 } }
    )
    
    console.log('🔍 Verification:')
    console.log('- Mongoose fetch:', {
      profilePicture: updatedUser?.profilePicture,
      name: updatedUser?.name
    })
    console.log('- Direct MongoDB fetch:', {
      profilePicture: directUser?.profilePicture,
      name: directUser?.name
    })
    
    console.log('✅ All updates completed successfully!')
    
    // Prepare response - use whichever user object is available
    let responseUser = null
    
    if (directUser) {
      responseUser = {
        _id: directUser._id.toString(),
        name: directUser.name,
        email: directUser.email,
        profilePicture: directUser.profilePicture || uploadResult.secure_url
      }
    } else if (updatedUser) {
      responseUser = {
        _id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture || uploadResult.secure_url
      }
    } else {
      // Fallback to payload data
      responseUser = {
        _id: payload.userId,
        name: payload.name || '',
        email: payload.email,
        profilePicture: uploadResult.secure_url
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Profile picture updated successfully',
      imageUrl: uploadResult.secure_url,
      user: responseUser
    })
    
  } catch (error: any) {
    console.error('❌ Error uploading profile image:', error)
    console.error('Stack trace:', error.stack)
    
    // More specific error messages
    if (error.message?.includes('Invalid api_key')) {
      return NextResponse.json(
        { message: 'Cloudinary configuration error. Please check your API credentials.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        message: 'Internal server error',
        error: error.message
      },
      { status: 500 }
    )
  }
}