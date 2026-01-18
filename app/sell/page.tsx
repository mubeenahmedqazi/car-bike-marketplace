"use client"

import { useState, useEffect } from "react"

export default function SellCarPage() {
  const [form, setForm] = useState({
    title: "",
    vehicleType: "Car",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    city: "",
    description: "",
    transmission: "Automatic",
    fuelType: "Petrol",
    condition: "Used",
    phone: "",
    images: [] as File[]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  
  // Mock brands for dropdown
  const vehicleBrands = {
    Car: ["Toyota", "Honda", "Suzuki", "Mercedes", "BMW", "Audi", "Hyundai", "Kia", "Ford", "Nissan", "Other"],
    Bike: ["Honda", "Yamaha", "Suzuki", "Kawasaki", "Harley-Davidson", "Other"]
  }

  const transmissions = ["Automatic", "Manual", "Semi-Automatic"]
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"]
  const conditions = ["New", "Used", "Reconditioned"]
  const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Other"]

  // Calculate form completion progress
  useEffect(() => {
    let filledFields = 0
    const totalFields = 13 // Total number of form fields
    
    Object.values(form).forEach(value => {
      if (value && value.toString().trim() !== "" && !(Array.isArray(value) && value.length === 0)) {
        filledFields++
      }
    })
    
    setProgress(Math.round((filledFields / totalFields) * 100))
  }, [form])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    
    // Animation feedback for interaction
    const element = e.target
    element.classList.add("input-active")
    setTimeout(() => {
      element.classList.remove("input-active")
    }, 300)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    
    const newImages = Array.from(files).slice(0, 10) // Limit to 10 images
    setForm({ ...form, images: [...form.images, ...newImages] })
  }

  const removeImage = (index: number) => {
    const newImages = [...form.images]
    newImages.splice(index, 1)
    setForm({ ...form, images: newImages })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create FormData
      const formData = new FormData()
      
      // Add all text fields
      Object.keys(form).forEach(key => {
        if (key !== 'images') {
          const value = form[key as keyof typeof form]
          if (value !== null && value !== undefined && value !== '') {
            formData.append(key, value.toString())
          }
        }
      })
      
      console.log("📤 Submitting form...")
      
      // Add images (all with same field name 'images')
      form.images.forEach((image) => {
        formData.append('images', image)
      })
      
      // Debug: log what we're sending
      console.log("Form entries:")
      for (let [key, value] of formData.entries()) {
        if (key !== 'images') {
          console.log(`${key}:`, value)
        } else {
          console.log(`${key}:`, (value as File).name)
        }
      }
      
      // Send to API
      const res = await fetch("/api/ads", {
        method: "POST",
        body: formData,
      })
      
      const data = await res.json()
      console.log("API Response:", data)
      
      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}: ${data.message || "Unknown error"}`)
      }
      
      if (data.success) {
        // Success animation
        document.querySelector(".success-animation")?.classList.add("active")
        
        // Reset form after successful submission
        setForm({
          title: "",
          vehicleType: "Car",
          brand: "",
          model: "",
          year: "",
          mileage: "",
          price: "",
          city: "",
          description: "",
          transmission: "Automatic",
          fuelType: "Petrol",
          condition: "Used",
          phone: "",
          images: []
        })
        
        setTimeout(() => {
          alert(`Ad posted successfully! ID: ${data.adId}`)
          setIsSubmitting(false)
          document.querySelector(".success-animation")?.classList.remove("active")
        }, 1500)
      } else {
        alert("Error: " + (data.details?.map((d: any) => d.message)?.join(", ") || data.error || "Unknown error"))
        setIsSubmitting(false)
      }
    } catch (error: any) {
      console.error("Error posting ad:", error)
      alert("Error: " + (error.message || "Network error. Please check your connection."))
      setIsSubmitting(false)
    }
  }

  const nextSection = () => {
    if (currentSection < 3) {
      setCurrentSection(prev => prev + 1)
      // Scroll to top of form section smoothly
      document.querySelector(".form-sections")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
      document.querySelector(".form-sections")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Check if form is valid before allowing submission
  const isFormValid = () => {
    const requiredFields = ['title', 'brand', 'model', 'year', 'price', 'city', 'description', 'phone', 'condition']
    return requiredFields.every(field => form[field as keyof typeof form]?.toString().trim() !== '')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Success Animation Overlay */}
        <div className="success-animation fixed inset-0 flex items-center justify-center bg-black/70 z-50 opacity-0 pointer-events-none transition-opacity duration-500">
          <div className="bg-white rounded-2xl p-10 text-center max-w-md">
            <div className="checkmark-animate w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Ad Posted Successfully!</h3>
            <p className="text-gray-600">Your vehicle listing is now live. Buyers can contact you soon.</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Post Your Vehicle Ad</h1>
            <div className="text-lg font-semibold text-orange-600">{progress}% Complete</div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-gray-600 mt-3">
            Fill in accurate details to reach genuine buyers quickly
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Form Navigation Tabs */}
          <div className="flex border-b border-gray-200">
            {["Basic Info", "Vehicle Details", "Location & Contact", "Photos & Description"].map((tab, index) => (
              <button
                key={index}
                className={`flex-1 py-5 text-center font-medium text-lg transition-all duration-300 ${currentSection === index 
                  ? "bg-orange-50 text-orange-700 border-b-2 border-orange-600" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setCurrentSection(index)}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center ${currentSection === index ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                    {index + 1}
                  </span>
                  {tab}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10">
            <div className="form-sections">
              {/* Section 1: Basic Information */}
              {currentSection === 0 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                    <p className="text-gray-600">Start with a catchy title and select your vehicle type</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-gray-800 font-medium mb-3 text-lg">
                        Ad Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="title"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none"
                        placeholder="e.g., Honda Civic 2020 1.8L Oriel White - Excellent Condition"
                        value={form.title}
                        onChange={handleChange}
                        required
                      />
                      <p className="text-gray-500 text-sm mt-2">Make it descriptive to attract more buyers</p>
                    </div>

                    <div>
                      <label className="block text-gray-800 font-medium mb-3 text-lg">
                        Vehicle Type <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          className={`flex-1 py-4 rounded-xl border-2 text-center font-medium transition-all duration-300 ${form.vehicleType === "Car" 
                            ? "border-orange-500 bg-orange-50 text-orange-700" 
                            : "border-gray-300 hover:border-gray-400 text-gray-700"}`}
                          onClick={() => setForm({...form, vehicleType: "Car"})}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-2xl mb-1">🚗</span>
                            <span>Car</span>
                          </div>
                        </button>
                        <button
                          type="button"
                          className={`flex-1 py-4 rounded-xl border-2 text-center font-medium transition-all duration-300 ${form.vehicleType === "Bike" 
                            ? "border-orange-500 bg-orange-50 text-orange-700" 
                            : "border-gray-300 hover:border-gray-400 text-gray-700"}`}
                          onClick={() => setForm({...form, vehicleType: "Bike"})}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-2xl mb-1">🏍️</span>
                            <span>Bike</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 2: Vehicle Details */}
              {currentSection === 1 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Details</h2>
                    <p className="text-gray-600">Provide specific details about your vehicle</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-800 font-medium mb-3">
                        Brand <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="brand"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none appearance-none bg-white"
                        value={form.brand}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Brand</option>
                        {vehicleBrands[form.vehicleType].map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-800 font-medium mb-3">
                        Model <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="model"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none"
                        placeholder="e.g., Civic, Corolla, City"
                        value={form.model}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-800 font-medium mb-3">
                        Year <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="year"
                        type="number"
                        min="1990"
                        max={new Date().getFullYear() + 1}
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none"
                        placeholder="e.g., 2020"
                        value={form.year}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-800 font-medium mb-3">
                        Mileage (km)
                      </label>
                      <input
                        name="mileage"
                        type="number"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none"
                        placeholder="e.g., 50000"
                        value={form.mileage}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-800 font-medium mb-3">
                        Transmission
                      </label>
                      <select
                        name="transmission"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none appearance-none bg-white"
                        value={form.transmission}
                        onChange={handleChange}
                      >
                        {transmissions.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-800 font-medium mb-3">
                        Fuel Type
                      </label>
                      <select
                        name="fuelType"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none appearance-none bg-white"
                        value={form.fuelType}
                        onChange={handleChange}
                      >
                        {fuelTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-800 font-medium mb-3">
                        Condition <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="condition"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none appearance-none bg-white"
                        value={form.condition}
                        onChange={handleChange}
                        required
                      >
                        {conditions.map(condition => (
                          <option key={condition} value={condition}>{condition}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-800 font-medium mb-3">
                        Price (PKR) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-bold">₨</span>
                        <input
                          name="price"
                          type="number"
                          className="w-full pl-12 pr-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none text-lg font-semibold"
                          placeholder="Enter price"
                          value={form.price}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Location & Contact */}
              {currentSection === 2 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Location & Contact</h2>
                    <p className="text-gray-600">Where is the vehicle located and how can buyers contact you?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-gray-800 font-medium mb-3 text-lg">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="city"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none appearance-none bg-white"
                        value={form.city}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select City</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-800 font-medium mb-3 text-lg">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none"
                        placeholder="03XX-XXXXXXX"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                      <p className="text-gray-500 text-sm mt-2">Buyers will contact you on this number</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 4: Photos & Description */}
              {currentSection === 3 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Photos & Description</h2>
                    <p className="text-gray-600">Add photos and write a detailed description to attract buyers</p>
                  </div>

                  <div>
                    <label className="block text-gray-800 font-medium mb-3 text-lg">
                      Photos <span className="text-red-500">*</span>
                      <span className="text-sm font-normal text-gray-500 ml-2">(Up to 10 images)</span>
                    </label>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-orange-400 transition-all duration-300">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer block">
                        <div className="text-5xl mb-4">📸</div>
                        <p className="text-xl font-medium text-gray-700 mb-2">Click to upload photos</p>
                        <p className="text-gray-500">Or drag and drop images here</p>
                        <p className="text-sm text-gray-400 mt-4">High-quality photos get more attention</p>
                      </label>
                    </div>

                    {/* Image Preview */}
                    {form.images.length > 0 && (
                      <div className="mt-6">
                        <p className="text-gray-700 mb-4">
                          {form.images.length} image{form.images.length !== 1 ? 's' : ''} uploaded
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {form.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                                <img 
                                  src={URL.createObjectURL(image)} 
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 text-center">
                                {index === 0 ? "Cover" : `Image ${index + 1}`}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-800 font-medium mb-3 text-lg">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      rows={6}
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none resize-none"
                      placeholder="Describe your vehicle in detail. Include features, condition, reason for selling, any issues, service history, etc."
                      value={form.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <p>Be honest and detailed for better response</p>
                      <p>{form.description.length}/2000 characters</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-10 mt-10 border-t border-gray-200">
              <button
                type="button"
                onClick={prevSection}
                className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${currentSection === 0 
                  ? "text-gray-400 cursor-not-allowed" 
                  : "text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"}`}
                disabled={currentSection === 0}
              >
                ← Back
              </button>

              {currentSection < 3 ? (
                <button
                  type="button"
                  onClick={nextSection}
                  className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  className="px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Posting Ad...
                    </>
                  ) : (
                    <>
                      
                      Post Ad Now
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Tips for a Successful Ad</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">📷</div>
              <h4 className="font-bold text-gray-800 mb-2">Quality Photos</h4>
              <p className="text-gray-600">Take clear photos in good lighting from multiple angles.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">📝</div>
              <h4 className="font-bold text-gray-800 mb-2">Honest Description</h4>
              <p className="text-gray-600">Mention any issues upfront to build trust with buyers.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">💰</div>
              <h4 className="font-bold text-gray-800 mb-2">Fair Pricing</h4>
              <p className="text-gray-600">Research similar vehicles to set a competitive price.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes checkmark {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .input-active {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(249, 115, 22, 0.1);
        }
        
        .checkmark-animate {
          animation: checkmark 0.5s ease-out;
        }
        
        .success-animation.active {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </div>
  )
}