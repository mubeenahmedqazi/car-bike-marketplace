"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  User, Camera, Mail, Phone, MapPin, Edit2, Save, X,
  Upload, AlertCircle, Calendar, CheckCircle
} from "lucide-react"

interface UserProfile {
  _id: string
  name: string
  email: string
  phone: string
  city: string
  profilePicture: string
  joinedDate: string
}

export default function MyProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<UserProfile>({
    _id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    profilePicture: "",
    joinedDate: ""
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: ""
  })
  const [loading, setLoading] = useState(true)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError("")

      console.log('🔄 Fetching profile from API...')

      const res = await fetch('/api/auth/verify', {
        credentials: 'include'
      })

      if (!res.ok) {
        router.push('/signin?redirect=/my-profile')
        return
      }

      // Fetch user's profile data
      const profileRes = await fetch('/api/user/profile', {
        credentials: 'include'
      })

      console.log('📥 Profile API response status:', profileRes.status)

      if (profileRes.ok) {
        const profileData = await profileRes.json()
        console.log('✅ Profile data received:', {
          name: profileData.name,
          profilePicture: profileData.profilePicture,
          hasPicture: !!profileData.profilePicture,
          pictureLength: profileData.profilePicture?.length || 0
        })

        setProfile(profileData)
        setEditForm({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone || "",
          city: profileData.city || ""
        })
      } else {
        console.error('❌ Failed to fetch profile:', profileRes.status)
        throw new Error('Failed to fetch profile')
      }

    } catch (error) {
      console.error('Error fetching profile:', error)
      setError("Failed to load profile data")
    } finally {
      setLoading(false)
    }
  }
  const handleEditClick = () => {
    setIsEditing(true)
    setError("")
    setSuccess("")
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      city: profile.city
    })
    setError("")
    setSuccess("")
  }

  const handleSaveProfile = async () => {
    try {
      setSaveLoading(true)
      setError("")
      setSuccess("")

      // Validate phone number
      const phoneRegex = /^03[0-9]{2}[0-9]{7}$/
      if (editForm.phone && !phoneRegex.test(editForm.phone)) {
        setError("Please enter a valid Pakistani phone number (03001234567)")
        return
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(editForm.email)) {
        setError("Please enter a valid email address")
        return
      }

      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
        credentials: 'include'
      })

      if (res.ok) {
        const updatedProfile = await res.json()
        setProfile(updatedProfile)
        setIsEditing(false)
        setSuccess("Profile updated successfully!")

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000)
      } else {
        const errorData = await res.json()
        setError(errorData.message || "Failed to update profile")
      }

    } catch (error) {
      console.error('Error updating profile:', error)
      setError("An error occurred. Please try again.")
    } finally {
      setSaveLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log('🔼 Frontend: Image upload started')
    console.log('📁 File info:', {
      name: file.name,
      type: file.type,
      size: file.size
    })

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file (JPEG, PNG, etc.)")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    try {
      setUploadingImage(true)
      setError("")
      setSuccess("")

      const formData = new FormData()
      formData.append('profileImage', file)

      console.log('📤 Sending request to /api/user/profile/image...')

      const res = await fetch('/api/user/profile/image', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      console.log('📥 Response received:', {
        status: res.status,
        statusText: res.statusText,
        ok: res.ok
      })

      const data = await res.json()
      console.log('📊 Response data:', data)

      if (res.ok) {
        console.log('✅ Server response successful')
        console.log('🖼️ Image URL from server:', data.imageUrl)

        // Update profile with new image URL
        setProfile(prev => ({
          ...prev,
          profilePicture: data.imageUrl
        }))

        console.log('✅ Local state updated with new profile picture')

        setSuccess("Profile picture updated successfully!")

        // Fetch fresh profile data to confirm database update
        console.log('🔄 Refreshing profile data...')
        fetchProfile()

        setTimeout(() => setSuccess(""), 3000)
      } else {
        console.error('❌ Server returned error:', data)
        setError(data.message || `Failed to upload image. Status: ${res.status}`)
      }

    } catch (error) {
      console.error('❌ Network/fetch error:', error)
      setError("Network error. Please check console for details.")
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const formatPhoneNumber = (phone: string) => {
    if (phone && phone.length === 11) {
      return `${phone.slice(0, 4)}-${phone.slice(4, 7)}-${phone.slice(7)}`
    }
    return phone || "Not provided"
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-fadeIn">
            <CheckCircle className="text-green-600" size={20} />
            <p className="text-green-800">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-fadeIn">
            <AlertCircle className="text-red-600" size={20} />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Picture */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="text-center">
                {/* Profile Picture */}
                <div className="relative mx-auto w-40 h-40 mb-4">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                    {profile.profilePicture ? (
                      <img
                        src={profile.profilePicture}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // If image fails to load, show default avatar
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.parentElement?.querySelector('.default-avatar')?.classList.remove('hidden')
                        }}
                      />
                    ) : null}

                    {/* Default Avatar (hidden if image loads successfully) */}
                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 ${profile.profilePicture ? 'hidden default-avatar' : ''}`}>
                      <User className="w-16 h-16 text-orange-400" />
                    </div>
                  </div>

                  {/* Camera Icon Overlay */}
                  <button
                    onClick={triggerFileInput}
                    disabled={uploadingImage}
                    className="absolute bottom-2 right-2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Change profile picture"
                  >
                    {uploadingImage ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Camera className="w-6 h-6 text-white" />
                    )}
                  </button>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                    id="profileImageUpload"
                  />
                </div>

                {/* Name */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{profile.name || "User"}</h2>

                {/* Join Date */}
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span>Joined {formatDate(profile.joinedDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Information */}
          <div className="lg:col-span-2">
            {/* Profile Information Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
                {!isEditing ? (
                  <button
                    onClick={handleEditClick}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 hover:bg-orange-100 font-medium rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saveLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      {saveLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                      placeholder="Enter your full name"
                      required
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="text-gray-400" size={20} />
                      <span className="text-gray-900">{profile.name || "Not provided"}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                      placeholder="Enter your email"
                      required
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="text-gray-400" size={20} />
                      <span className="text-gray-900">{profile.email || "Not provided"}</span>
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="03001234567"
                        pattern="03[0-9]{2}[0-9]{7}"
                        title="Please enter a valid Pakistani phone number (e.g., 03001234567)"
                      />
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">+92</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="text-gray-400" size={20} />
                      <span className="text-gray-900">{formatPhoneNumber(profile.phone)}</span>
                    </div>
                  )}
                </div>

                {/* City Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                      placeholder="Enter your city"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="text-gray-400" size={20} />
                      <span className="text-gray-900">{profile.city || "Not provided"}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}