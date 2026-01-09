'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchBar({
  initialSearch,
  categories,
  initialCategory,
}: {
  initialSearch: string
  categories: string[]
  initialCategory: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState(initialCategory)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    router.push(`/browse?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('')
    router.push('/browse')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end">
      <div className="flex-1">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by brand, name, or description..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple focus:border-purple"
        />
      </div>
      <div className="w-48">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple focus:border-purple"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-6 py-2 bg-purple text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple"
        >
          Search
        </button>
        {(search || category) && (
          <button
            type="button"
            onClick={clearFilters}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  )
}
