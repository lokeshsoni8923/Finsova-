import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    // Validate size (10MB default limit like UI)
    const MAX_MB = 10
    const sizeInBytes = file.size
    if (sizeInBytes > MAX_MB * 1024 * 1024) {
      return NextResponse.json({ success: false, error: `File exceeds ${MAX_MB}MB` }, { status: 400 })
    }

    // Validate type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'Invalid file type' }, { status: 400 })
    }

    // Prepare file system paths
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadsDir, { recursive: true })

    const originalName = (file as any).name as string | undefined
    const safeBase = (originalName || 'upload')
      .replace(/[^a-zA-Z0-9_.-]/g, '_')
      .slice(0, 100)

    const timePart = Date.now()
    const finalName = `${timePart}_${safeBase}`
    const savePath = path.join(uploadsDir, finalName)

    // Read file and write to disk
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFile(savePath, buffer)

    // Public URL path
    const publicPath = `/uploads/${finalName}`

    return NextResponse.json({ success: true, filePath: publicPath })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Upload failed' }, { status: 500 })
  }
}


