import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { brand, name, category, description, ingredients, imageUrl } = await request.json()

    if (!brand || !name || !category) {
      return NextResponse.json(
        { error: 'Brand, name, and category are required' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        brand,
        name,
        category,
        description: description || null,
        ingredients: ingredients || null,
        imageUrl: imageUrl || null,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
