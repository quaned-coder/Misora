'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import StackItemCard from './StackItemCard'

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

export default function StackList({ userId }: { userId: string }) {
  const [stackItems, setStackItems] = useState<StackItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStackItems()
  }, [])

  const fetchStackItems = async () => {
    try {
      const response = await fetch('/api/stack')
      if (response.ok) {
        const data = await response.json()
        setStackItems(data)
      }
    } catch (error) {
      console.error('Failed to fetch stack items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (id: string) => {
    if (!confirm('Remove this product from your stack?')) return

    try {
      const response = await fetch(`/api/stack/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setStackItems(stackItems.filter(item => item.id !== id))
      } else {
        alert('Failed to remove product')
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    }
  }

  const handleUpdate = async (id: string, updates: Partial<StackItem>) => {
    try {
      const response = await fetch(`/api/stack/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const updated = await response.json()
        setStackItems(stackItems.map(item => 
          item.id === id ? updated : item
        ))
      } else {
        alert('Failed to update product')
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (stackItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Your stack is empty.</p>
        <a
          href="/browse"
          className="text-purple hover:opacity-80 font-medium"
        >
          Browse products to get started
        </a>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stackItems.map((item) => (
        <StackItemCard
          key={item.id}
          item={item}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
}
