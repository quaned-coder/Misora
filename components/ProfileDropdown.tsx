'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfileDropdown() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (!session) return null

  const getInitials = () => {
    if (session.user.name) {
      return session.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return session.user.email[0].toUpperCase()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple rounded-full"
      >
        {session.user.profileImageUrl && !imageError ? (
          <Image
            src={session.user.profileImageUrl}
            alt={session.user.name || 'Profile'}
            width={40}
            height={40}
            className="rounded-full object-cover border-2 border-purple"
            unoptimized={session.user.profileImageUrl.startsWith('/uploads/')}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-purple text-white flex items-center justify-center font-semibold text-sm border-2 border-purple">
            {getInitials()}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              {session.user.name || 'User'}
            </p>
            <p className="text-sm text-gray-500 truncate">{session.user.email}</p>
          </div>
          
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-mint hover:text-purple"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
          
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-mint hover:text-purple"
            onClick={() => setIsOpen(false)}
          >
            Skin Profile
          </Link>
          
          <Link
            href="/stack"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-mint hover:text-purple"
            onClick={() => setIsOpen(false)}
          >
            My Stack
          </Link>

          {session.user.isAdmin && (
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-mint hover:text-purple"
              onClick={() => setIsOpen(false)}
            >
              Admin Panel
            </Link>
          )}

          <div className="border-t border-gray-200 mt-1">
            <button
              onClick={() => {
                setIsOpen(false)
                router.push('/api/auth/signout')
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
