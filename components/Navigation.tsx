'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import ProfileDropdown from './ProfileDropdown'

export default function Navigation() {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  if (status === 'loading') {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold text-purple">MISORA</div>
          </div>
        </div>
      </nav>
    )
  }

  if (!session) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-purple">
              MISORA
            </Link>
            <div className="flex gap-4">
              <Link
                href="/auth/signin"
                className="text-gray-700 hover:text-purple px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-purple text-white hover:opacity-90 px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-purple">
            MISORA
          </Link>
          <div className="flex gap-1 items-center">
            <Link
              href="/browse"
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isActive('/browse')
                  ? 'bg-mint text-purple'
                  : 'text-gray-700 hover:text-purple hover:bg-gray-50'
              }`}
            >
              Browse Products
            </Link>
            <Link
              href="/stack"
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isActive('/stack')
                  ? 'bg-mint text-purple'
                  : 'text-gray-700 hover:text-purple hover:bg-gray-50'
              }`}
            >
              My Stack
            </Link>
            <Link
              href="/users"
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isActive('/users')
                  ? 'bg-mint text-purple'
                  : 'text-gray-700 hover:text-purple hover:bg-gray-50'
              }`}
            >
              Find Users
            </Link>
            {session.user.isAdmin && (
              <Link
                href="/admin"
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  isActive('/admin')
                    ? 'bg-mint text-purple'
                    : 'text-gray-700 hover:text-purple hover:bg-gray-50'
                }`}
              >
                Admin
              </Link>
            )}
            <div className="ml-4">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
