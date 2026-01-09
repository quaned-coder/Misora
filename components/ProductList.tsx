'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Product {
  id: string
  brand: string
  name: string
  category: string
  description: string | null
  imageUrl: string | null
}

interface ProductListProps {
  products: Product[]
  userId: string
}

export default function ProductList({ products, userId }: ProductListProps) {
  const [adding, setAdding] = useState<string | null>(null)

  const handleAddToStack = async (productId: string) => {
    setAdding(productId)
    try {
      const response = await fetch('/api/stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })

      if (!response.ok) {
        const data = await response.json()
        alert(data.error || 'Failed to add product')
        return
      }

      alert('Product added to your stack!')
    } catch (error) {
      alert('Something went wrong. Please try again.')
    } finally {
      setAdding(null)
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found. Try adjusting your search.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {product.imageUrl && (
            <div className="relative h-48 w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
            <div className="text-sm text-purple mb-2">{product.category}</div>
            {product.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
            )}
            <button
              onClick={() => handleAddToStack(product.id)}
              disabled={adding === product.id}
              className="w-full px-4 py-2 bg-purple text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple disabled:opacity-50"
            >
              {adding === product.id ? 'Adding...' : 'Add to Stack'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
