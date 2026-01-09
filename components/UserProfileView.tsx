'use client'

import Link from 'next/link'
import Image from 'next/image'

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
  stackItems: Array<{
    id: string
    rating: string | null
    role: string | null
    notes: string | null
    product: {
      id: string
      brand: string
      name: string
      category: string
      imageUrl: string | null
    }
  }>
}

export default function UserProfileView({
  user,
  currentUserId,
}: {
  user: User
  currentUserId: string
}) {
  const isOwnProfile = user.id === currentUserId
  const concerns = user.profile ? JSON.parse(user.profile.concerns || '[]') : []
  const sensitivities = user.profile ? JSON.parse(user.profile.sensitivities || '[]') : []
  const conditions = user.profile ? JSON.parse(user.profile.conditions || '[]') : []

  const getRatingColor = (rating: string | null) => {
    if (!rating) return 'bg-gray-200 text-gray-700'
    if (rating === 'works') return 'bg-green-500 text-white'
    if (rating === 'meh') return 'bg-yellow-500 text-white'
    return 'bg-red-500 text-white'
  }

  const getRatingText = (rating: string | null) => {
    if (!rating) return 'Not rated'
    if (rating === 'works') return 'Works'
    if (rating === 'meh') return 'Meh'
    return 'Bad'
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/users"
          className="text-purple hover:opacity-80 text-sm font-medium mb-4 inline-block"
        >
          ← Back to User Search
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {user.name || 'Anonymous User'}'s Profile
        </h1>
        <p className="text-gray-600 mt-1">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skin Profile</h2>
            
            {user.profile ? (
              <div className="space-y-4">
                {user.profile.skinType && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Skin Type:</span>
                    <p className="text-gray-900 capitalize">{user.profile.skinType}</p>
                  </div>
                )}

                {concerns.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Main Concerns:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {concerns.map((concern: string) => (
                        <span
                          key={concern}
                          className="px-2 py-1 bg-mint text-purple rounded text-xs"
                        >
                          {concern.charAt(0).toUpperCase() + concern.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {sensitivities.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Sensitivities:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {sensitivities.map((sensitivity: string) => (
                        <span
                          key={sensitivity}
                          className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs"
                        >
                          {sensitivity.charAt(0).toUpperCase() + sensitivity.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {conditions.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Conditions:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {conditions.map((condition: string) => (
                        <span
                          key={condition}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                        >
                          {condition.charAt(0).toUpperCase() + condition.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No profile information available</p>
            )}
          </div>
        </div>

        {/* Stack Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Product Stack ({user.stackItems.length})
            </h2>

            {user.stackItems.length === 0 ? (
              <p className="text-gray-500">No products in stack yet</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.stackItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    {item.product.imageUrl && (
                      <div className="relative h-32 w-full mb-3 rounded overflow-hidden">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="text-sm text-gray-500 mb-1">{item.product.brand}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.product.name}</h3>
                    <div className="text-xs text-purple mb-2">{item.product.category}</div>
                    
                    {item.rating && (
                      <div className="mb-2">
                        <span className={`px-2 py-1 rounded text-xs ${getRatingColor(item.rating)}`}>
                          {getRatingText(item.rating)}
                        </span>
                      </div>
                    )}
                    
                    {item.role && (
                      <div className="text-xs text-gray-600 mb-1">
                        <span className="font-medium">Role:</span> {item.role}
                      </div>
                    )}
                    
                    {item.notes && (
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Notes:</span> {item.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
