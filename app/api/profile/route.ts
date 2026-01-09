import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const profile = await prisma.skinProfile.findUnique({
    where: { userId: session.user.id },
    select: {
      skinType: true,
      concerns: true,
      sensitivities: true,
      conditions: true,
      // Exclude id, userId, createdAt, updatedAt - not used in ProfilePage
    },
  })

  return NextResponse.json(profile)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { skinType, concerns, sensitivities, conditions } = await request.json()

    const profile = await prisma.skinProfile.upsert({
      where: { userId: session.user.id },
      update: {
        skinType: skinType || null,
        concerns: JSON.stringify(concerns || []),
        sensitivities: JSON.stringify(sensitivities || []),
        conditions: JSON.stringify(conditions || []),
      },
      create: {
        userId: session.user.id,
        skinType: skinType || null,
        concerns: JSON.stringify(concerns || []),
        sensitivities: JSON.stringify(sensitivities || []),
        conditions: JSON.stringify(conditions || []),
      },
      select: {
        skinType: true,
        concerns: true,
        sensitivities: true,
        conditions: true,
        // Exclude id, userId, createdAt, updatedAt - not used in ProfilePage
      },
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
