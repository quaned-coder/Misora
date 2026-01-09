'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface Profile {
  skinType: string | null
  concerns: string
  sensitivities: string
  conditions: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<Profile>({
    skinType: null,
    concerns: '[]',
    sensitivities: '[]',
    conditions: '[]',
  })

  const skinTypes = ['oily', 'dry', 'combination', 'normal']
  const concerns = ['acne', 'pigmentation', 'redness', 'aging', 'dullness', 'texture']
  const sensitivities = ['fragrance', 'retinoids', 'alcohol', 'sulfates', 'parabens']
  const conditions = ['acne-prone', 'rosacea', 'eczema', 'fungal acne']

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/signin')
    }
    if (status === 'authenticated') {
      fetchProfile()
    }
  }, [status])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setProfile({
            skinType: data.skinType,
            concerns: data.concerns || '[]',
            sensitivities: data.sensitivities || '[]',
            conditions: data.conditions || '[]',
          })
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skinType: profile.skinType,
          concerns: JSON.parse(profile.concerns),
          sensitivities: JSON.parse(profile.sensitivities),
          conditions: JSON.parse(profile.conditions),
        }),
      })

      if (response.ok) {
        alert('Profile saved successfully!')
      } else {
        alert('Failed to save profile')
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const toggleArrayItem = (arrayName: 'concerns' | 'sensitivities' | 'conditions', item: string) => {
    const current = JSON.parse(profile[arrayName] || '[]')
    const updated = current.includes(item)
      ? current.filter((i: string) => i !== item)
      : [...current, item]
    setProfile({ ...profile, [arrayName]: JSON.stringify(updated) })
  }

  if (status === 'loading' || loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  const selectedConcerns = JSON.parse(profile.concerns || '[]')
  const selectedSensitivities = JSON.parse(profile.sensitivities || '[]')
  const selectedConditions = JSON.parse(profile.conditions || '[]')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Skin Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skin Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {skinTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setProfile({ ...profile, skinType: type })}
                className={`px-4 py-2 rounded-md border ${
                  profile.skinType === type
                    ? 'bg-purple text-white border-purple'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Concerns
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {concerns.map((concern) => (
              <button
                key={concern}
                type="button"
                onClick={() => toggleArrayItem('concerns', concern)}
                className={`px-4 py-2 rounded-md border text-left ${
                  selectedConcerns.includes(concern)
                    ? 'bg-mint text-purple border-purple'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {concern.charAt(0).toUpperCase() + concern.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ingredient Sensitivities
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {sensitivities.map((sensitivity) => (
              <button
                key={sensitivity}
                type="button"
                onClick={() => toggleArrayItem('sensitivities', sensitivity)}
                className={`px-4 py-2 rounded-md border text-left ${
                  selectedSensitivities.includes(sensitivity)
                    ? 'bg-mint text-purple border-purple'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {sensitivity.charAt(0).toUpperCase() + sensitivity.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skin Conditions
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {conditions.map((condition) => (
              <button
                key={condition}
                type="button"
                onClick={() => toggleArrayItem('conditions', condition)}
                className={`px-4 py-2 rounded-md border text-left ${
                  selectedConditions.includes(condition)
                    ? 'bg-mint text-purple border-purple'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {condition.charAt(0).toUpperCase() + condition.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full px-6 py-3 bg-purple text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}
