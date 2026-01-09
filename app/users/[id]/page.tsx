import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import UserProfileView from '@/components/UserProfileView'

export default async function UserProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      email: true,
      profile: {
        select: {
          skinType: true,
          concerns: true,
          sensitivities: true,
          conditions: true,
        },
      },
      stackItems: {
        include: {
          product: {
            select: {
              id: true,
              brand: true,
              name: true,
              category: true,
              imageUrl: true,
              // Exclude createdAt and updatedAt - not used in UserProfileView
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-4">The user you're looking for doesn't exist.</p>
          <a href="/users" className="text-purple hover:opacity-80">
            ← Back to User Search
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserProfileView user={user} currentUserId={session.user.id} />
    </div>
  )
}
