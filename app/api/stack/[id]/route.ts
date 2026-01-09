import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { rating, role, notes } = await request.json()

    const stackItem = await prisma.stackItem.findUnique({
      where: { id: params.id },
    })

    if (!stackItem || stackItem.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Stack item not found' },
        { status: 404 }
      )
    }

    const updated = await prisma.stackItem.update({
      where: { id: params.id },
      data: {
        rating: rating || null,
        role: role || null,
        notes: notes || null,
      },
      include: { product: true },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update stack item error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const stackItem = await prisma.stackItem.findUnique({
      where: { id: params.id },
    })

    if (!stackItem || stackItem.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Stack item not found' },
        { status: 404 }
      )
    }

    await prisma.stackItem.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Item removed from stack' })
  } catch (error) {
    console.error('Delete stack item error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
