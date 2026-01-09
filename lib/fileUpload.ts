import { writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import { randomBytes } from 'crypto'

export async function saveUploadedFile(file: File, userId: string): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Generate unique filename
  const extension = file.name.split('.').pop() || 'jpg'
  const filename = `${randomBytes(16).toString('hex')}.${extension}`
  
  // Create uploads directory if it doesn't exist
  const uploadsDir = join(process.cwd(), 'public', 'uploads', 'profiles')
  await mkdir(uploadsDir, { recursive: true })

  // Save file
  const filepath = join(uploadsDir, filename)
  await writeFile(filepath, buffer)

  // Return the public URL path
  return `/uploads/profiles/${filename}`
}

export async function deleteFile(filepath: string): Promise<void> {
  try {
    const fullPath = join(process.cwd(), 'public', filepath)
    await unlink(fullPath)
  } catch (error) {
    // File doesn't exist or already deleted, ignore
    console.log('File deletion skipped:', filepath)
  }
}
