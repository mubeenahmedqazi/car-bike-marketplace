import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    vehicleType: {
      type: String,
      required: [true, 'Vehicle type is required'],
      enum: ['Car', 'Bike', 'SUV', 'Truck', 'Other'],
      default: 'Car',
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1950, 'Year must be after 1950'],
      max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
    },
    mileage: {
      type: Number,
      min: [0, 'Mileage cannot be negative'],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [5000, 'Description cannot be more than 5000 characters'],
    },
    transmission: {
      type: String,
      enum: ['Automatic', 'Manual', 'Semi-Automatic', 'CVT', 'Other'],
      default: 'Manual',
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG', 'Other'],
      default: 'Petrol',
    },
    condition: {
      type: String,
      required: [true, 'Condition is required'],
      enum: ['New', 'Used', 'Reconditioned'],
      default: 'Used',
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^03[0-9]{2}[0-9]{7}$/, 'Please enter a valid Pakistani phone number'],
    },
    images: [{
      type: String,
      required: [true, 'At least one image is required'],
    }],
    status: {
      type: String,
      enum: ['active', 'sold', 'inactive', 'pending', 'rejected'],
      default: 'active',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isSponsored: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    sellerName: {
      type: String,
      trim: true,
    },
    sellerEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    features: [{
      type: String,
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for formatted price
AdSchema.virtual('formattedPrice').get(function() {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(this.price);
});

// Virtual for time ago
AdSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - this.createdAt.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
});

// Index for better performance
AdSchema.index({ status: 1, createdAt: -1 });
AdSchema.index({ vehicleType: 1, brand: 1, model: 1 });
AdSchema.index({ city: 1, price: 1 });
AdSchema.index({ isFeatured: 1, isSponsored: 1 });

export default mongoose.models.Ad || mongoose.model('Ad', AdSchema);