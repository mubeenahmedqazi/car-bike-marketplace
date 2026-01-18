import { NextResponse } from "next/server"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No files provided" },
        { status: 400 }
      )
    }

    console.log(`📤 Uploading ${files.length} file(s) to Cloudinary...`)

    const uploadResults = []
    
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        return NextResponse.json(
          { success: false, message: `File ${file.name} exceeds 10MB limit` },
          { status: 400 }
        )
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: `File ${file.name} has invalid type. Only images are allowed` },
          { status: 400 }
        )
      }

      const result = await uploadToCloudinary(file, 'car-ads')
      
      if (result.success) {
        uploadResults.push({
          filename: file.name,
          url: result.url,
          public_id: result.public_id,
          size: file.size,
          type: file.type
        })
      } else {
        console.error(`Failed to upload ${file.name}:`, result.error)
        uploadResults.push({
          filename: file.name,
          error: result.error,
          success: false
        })
      }
    }

    const successfulUploads = uploadResults.filter(r => r.url)
    
    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${successfulUploads.length} of ${files.length} files`,
      files: uploadResults,
      uploaded: successfulUploads.map(f => f.url)
    })

  } catch (error: any) {
    console.error("❌ Upload API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Upload failed",
        error: error.toString()
      },
      { status: 500 }
    )
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Upload API is working. Use POST to upload files.",
    endpoints: {
      POST: {
        description: "Upload images to Cloudinary",
        body: "multipart/form-data with 'files' field",
        returns: "Array of uploaded image URLs"
      }
    }
  })
}