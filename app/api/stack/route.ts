import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stackItems = await prisma.stackItem.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      rating: true,
      role: true,
      notes: true,
      product: {
        select: {
          id: true,
          brand: true,
          name: true,
          category: true,
          imageUrl: true,
          // Exclude createdAt and updatedAt - not used in StackItemCard
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(stackItems)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if already in stack
    const existing = await prisma.stackItem.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Product already in your stack' },
        { status: 400 }
      )
    }

    const stackItem = await prisma.stackItem.create({
      data: {
        userId: session.user.id,
        productId,
      },
      select: {
        id: true,
        rating: true,
        role: true,
        notes: true,
        product: {
          select: {
            id: true,
            brand: true,
            name: true,
            category: true,
            imageUrl: true,
            // Exclude createdAt and updatedAt - not used in StackItemCard
          },
        },
      },
    })

    return NextResponse.json(stackItem, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Product already in your stack' },
        { status: 400 }
      )
    }
    console.error('Stack error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
