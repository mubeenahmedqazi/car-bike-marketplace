import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { createToken, setTokenCookie } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    console.log('📝 Signup API called');
    await connectDB();
    
    const { name, email, password, phone, city } = await req.json();
    
    console.log('📝 Signup data received:', { name, email, phone, city });

    // Basic validation
    if (!name || !email || !password || !phone || !city) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return NextResponse.json(
        { success: false, error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    console.log('🔐 Hashing password...');
    // Hash password - NO MIDDLEWARE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('👤 Creating user...');
    // Create new user with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Use the hashed password
      phone,
      city,
    });

    console.log('✅ User created:', user._id);

    // Create JWT token
    const token = createToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    console.log('🔑 Token created');

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          role: user.role,
        },
      },
      { status: 201 }
    );

    // Set token as HTTP-only cookie
    setTokenCookie(response, token);
    
    console.log('🎉 Signup successful for:', email);

    return response;
  } catch (error: any) {
    console.error('❌ Signup error details:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    // Handle duplicate key error (unique constraint)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 400 }
      );
    }
    
    // Generic error
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Internal server error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}