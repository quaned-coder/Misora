'use client'

import Link from 'next/link'

interface User {
  id: string
  name: string | null
  email: string
  profile: {
    skinType: string | null
    concerns: string
    sensitivities: string
    conditions: string
  } | null
  _count: {
    stackItems: number
  }
}

export default function UserCard({ user }: { user: User }) {
  const concerns = user.profile ? JSON.parse(user.profile.concerns || '[]') : []
  const sensitivities = user.profile ? JSON.parse(user.profile.sensitivities || '[]') : []
  const conditions = user.profile ? JSON.parse(user.profile.conditions || '[]') : []

  return (
    <Link href={`/users/${user.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {user.name || 'Anonymous User'}
          </h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {user.profile && (
          <div className="space-y-2 mb-4">
            {user.profile.skinType && (
              <div className="text-sm">
                <span className="font-medium text-gray-700">Skin Type: </span>
                <span className="text-gray-600 capitalize">{user.profile.skinType}</span>
              </div>
            )}

            {concerns.length > 0 && (
              <div className="text-sm">
                <span className="font-medium text-gray-700">Concerns: </span>
                <span className="text-gray-600">
                  {concerns.slice(0, 3).map((c: string) => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}
                  {concerns.length > 3 && ` +${concerns.length - 3} more`}
                </span>
              </div>
            )}

            {sensitivities.length > 0 && (
              <div className="text-sm">
                <span className="font-medium text-gray-700">Sensitivities: </span>
                <span className="text-gray-600">
                  {sensitivities.slice(0, 2).map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}
                  {sensitivities.length > 2 && ` +${sensitivities.length - 2} more`}
                </span>
              </div>
            )}

            {conditions.length > 0 && (
              <div className="text-sm">
                <span className="font-medium text-gray-700">Conditions: </span>
                <span className="text-gray-600">
                  {conditions.slice(0, 2).map((c: string) => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}
                  {conditions.length > 2 && ` +${conditions.length - 2} more`}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {user._count.stackItems} product{user._count.stackItems !== 1 ? 's' : ''} in stack
            </span>
            <span className="text-sm text-purple font-medium">View Profile →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
