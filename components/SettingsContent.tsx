'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface SettingsContentProps {
  user: {
    id: string
    name: string | null
    email: string
    profileImageUrl: string | null
    profile: {
      skinType: string | null
      concerns: string
      sensitivities: string
      conditions: string
    } | null
  }
  stackCount: number
}

export default function SettingsContent({ user, stackCount }: SettingsContentProps) {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [profileImageUrl, setProfileImageUrl] = useState(user.profileImageUrl || '')
  const [name, setName] = useState(user.name || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const getInitials = () => {
    if (name) {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return user.email[0].toUpperCase()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB')
        return
      }

      setImageFile(file)
      setError('')

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setProfileImageUrl('')
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', name || '')
      
      if (imageFile) {
        formData.append('image', imageFile)
      } else if (!profileImageUrl) {
        formData.append('removeImage', 'true')
      }

      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to update profile')
        return
      }

      setSuccess('Profile updated successfully!')
      setImageFile(null)
      setImagePreview(null)
      if (data.profileImageUrl) {
        setProfileImageUrl(data.profileImageUrl)
      }
      await update() // Refresh session
      router.refresh()
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const concerns = user.profile ? JSON.parse(user.profile.concerns || '[]') : []
  const sensitivities = user.profile ? JSON.parse(user.profile.sensitivities || '[]') : []
  const conditions = user.profile ? JSON.parse(user.profile.conditions || '[]') : []

  return (
    <form onSubmit={handleUpdateProfile} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Profile Image Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Profile Picture</h2>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-purple text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            {(imagePreview || profileImageUrl) ? (
              <Image
                src={imagePreview || profileImageUrl || ''}
                alt={name || 'Profile'}
                width={100}
                height={100}
                className="rounded-full object-cover border-4 border-purple"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-purple text-white flex items-center justify-center font-semibold text-2xl border-4 border-purple">
                {getInitials()}
              </div>
            )}
            {(imagePreview || profileImageUrl) && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                title="Remove image"
              >
                ×
              </button>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple focus:border-purple file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple file:text-white hover:file:opacity-90"
            />
            <p className="mt-2 text-xs text-gray-500">
              Upload an image from your device (max 5MB). Supported formats: JPG, PNG, GIF, WebP
            </p>
          </div>
        </div>
      </div>

      {/* Basic Info Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple focus:border-purple"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
          </div>
        </div>
      </div>

      {/* Skin Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Skin Profile</h2>
          <Link
            href="/profile"
            className="text-purple hover:opacity-80 text-sm font-medium"
          >
            Edit Profile →
          </Link>
        </div>
        
        {user.profile ? (
          <div className="space-y-3">
            {user.profile.skinType && (
              <div>
                <span className="text-sm font-medium text-gray-700">Skin Type: </span>
                <span className="text-gray-900 capitalize">{user.profile.skinType}</span>
              </div>
            )}

            {concerns.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-700">Concerns: </span>
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
                <span className="text-sm font-medium text-gray-700">Sensitivities: </span>
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
                <span className="text-sm font-medium text-gray-700">Conditions: </span>
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
          <div>
            <p className="text-gray-500 text-sm mb-3">No skin profile set up yet.</p>
            <Link
              href="/profile"
              className="text-purple hover:opacity-80 text-sm font-medium"
            >
              Create your skin profile →
            </Link>
          </div>
        )}
      </div>

      {/* Stack Count Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Product Stack</h2>
            <p className="text-3xl font-bold text-purple">{stackCount}</p>
            <p className="text-sm text-gray-500 mt-1">
              {stackCount === 1 ? 'product' : 'products'} in your stack
            </p>
          </div>
          <Link
            href="/stack"
            className="px-6 py-2 bg-purple text-white rounded-md hover:opacity-90"
          >
            View Stack →
          </Link>
        </div>
      </div>
    </form>
  )
}
