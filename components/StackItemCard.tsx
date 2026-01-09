'use client'

import { useState } from 'react'
import Image from 'next/image'

interface StackItem {
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
}

export default function StackItemCard({
  item,
  onUpdate,
  onRemove,
}: {
  item: StackItem
  onUpdate: (id: string, updates: Partial<StackItem>) => void
  onRemove: (id: string) => void
}) {
  const [rating, setRating] = useState(item.rating || '')
  const [role, setRole] = useState(item.role || '')
  const [notes, setNotes] = useState(item.notes || '')
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onUpdate(item.id, { rating, role, notes })
    setIsEditing(false)
  }

  const getRatingColor = (rating: string | null) => {
    if (!rating) return 'bg-gray-200'
    if (rating === 'works') return 'bg-green-500'
    if (rating === 'meh') return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getRatingText = (rating: string | null) => {
    if (!rating) return 'Not rated'
    if (rating === 'works') return 'Works'
    if (rating === 'meh') return 'Meh'
    return 'Bad'
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {item.product.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={item.product.imageUrl}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-1">{item.product.brand}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.product.name}</h3>
        <div className="text-sm text-purple mb-4">{item.product.category}</div>

        {!isEditing ? (
          <>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-700">Rating:</span>
                <span className={`px-2 py-1 rounded text-xs text-white ${getRatingColor(rating)}`}>
                  {getRatingText(rating)}
                </span>
              </div>
              {item.role && (
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Role:</span> {item.role}
                </div>
              )}
              {item.notes && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Notes:</span> {item.notes}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 px-4 py-2 bg-purple text-white rounded-md hover:opacity-90 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple focus:border-purple"
                >
                  <option value="">Not rated</option>
                  <option value="works">Works</option>
                  <option value="meh">Meh</option>
                  <option value="bad">Bad</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role (e.g., cleanser, serum)
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., cleanser, serum, moisturizer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple focus:border-purple"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Your experience with this product..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple focus:border-purple"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-purple text-white rounded-md hover:opacity-90 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setRating(item.rating || '')
                  setRole(item.role || '')
                  setNotes(item.notes || '')
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
