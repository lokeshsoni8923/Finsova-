import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
const maxSizeMB = 2; // MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' });
    }

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`
      });
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return NextResponse.json({
        success: false,
        error: `File size exceeds ${maxSizeMB}MB limit`
      });
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ success: true, filePath: `/uploads/${fileName}` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Upload failed' });
  }
}
