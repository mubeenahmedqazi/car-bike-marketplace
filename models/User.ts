// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  city: {
    type: String,
    required: [true, 'Please provide a city'],
  },
  profilePicture: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  // Add these options
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add this to ensure profilePicture is always included
UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    // Ensure profilePicture is included
    ret.profilePicture = ret.profilePicture || '';
    return ret;
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);