import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { saveUploadedFile, deleteFile } from '@/lib/fileUpload'

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const name = formData.get('name') as string | null
    const imageFile = formData.get('image') as File | null
    const removeImage = formData.get('removeImage') === 'true'

    // Get current user to check for existing image
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { profileImageUrl: true },
    })

    let profileImageUrl: string | null = currentUser?.profileImageUrl || null

    // Handle image upload
    if (imageFile && imageFile.size > 0 && imageFile.name && imageFile.name !== 'undefined') {
      // Validate file type
      if (!imageFile.type || !imageFile.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'File must be an image' },
          { status: 400 }
        )
      }

      // Validate file size (max 5MB)
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Image must be less than 5MB' },
          { status: 400 }
        )
      }

      // Delete old image if it exists
      if (profileImageUrl && profileImageUrl.startsWith('/uploads/')) {
        await deleteFile(profileImageUrl)
      }

      // Save new image
      try {
        profileImageUrl = await saveUploadedFile(imageFile, session.user.id)
      } catch (uploadError: any) {
        console.error('File upload error:', uploadError)
        return NextResponse.json(
          { error: 'Failed to upload image: ' + (uploadError.message || 'Unknown error') },
          { status: 500 }
        )
      }
    } else if (removeImage) {
      // Delete existing image
      if (profileImageUrl && profileImageUrl.startsWith('/uploads/')) {
        await deleteFile(profileImageUrl)
      }
      profileImageUrl = null
    }
    // If neither imageFile nor removeImage, keep existing profileImageUrl

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || null,
        profileImageUrl,
      },
      select: {
        id: true,
        email: true,
        name: true,
        profileImageUrl: true,
        isAdmin: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
