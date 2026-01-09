import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import UserSearch from '@/components/UserSearch'

export default async function UsersPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Users</h1>
      <p className="text-gray-600 mb-6">
        Find other users to see their skincare routines and profiles.
      </p>
      <UserSearch currentUserId={session.user.id} />
    </div>
  )
}
