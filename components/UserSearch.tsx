'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import UserCard from './UserCard'

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

export default function UserSearch({ currentUserId }: { currentUserId: string }) {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setUsers([])
      return
    }

    setLoading(true)
    fetch(`/api/users/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error)
          setUsers([])
        } else {
          setUsers(data.users || [])
        }
      })
      .catch((error) => {
        console.error('Search error:', error)
        setUsers([])
      })
      .finally(() => setLoading(false))
  }, [debouncedQuery])

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email (min. 2 characters)..."
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-purple focus:border-purple text-lg"
        />
        {loading && (
          <p className="mt-2 text-sm text-gray-500">Searching...</p>
        )}
      </div>

      {query.trim().length > 0 && query.trim().length < 2 && (
        <p className="text-gray-500 text-center py-8">
          Type at least 2 characters to search
        </p>
      )}

      {debouncedQuery.trim().length >= 2 && !loading && users.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No users found matching "{debouncedQuery}"
        </p>
      )}

      {users.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
