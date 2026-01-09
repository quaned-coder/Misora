import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.error('Error getting session:', error)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to{' '}
          <span className="text-purple">MISORA</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover skincare products, build your personal routine stack, and track what works for your skin.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          {session ? (
            <div className="flex gap-4 justify-center">
              <Link
                href="/browse"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple hover:opacity-90"
              >
                Browse Products
              </Link>
              <Link
                href="/stack"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View My Stack
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple hover:opacity-90"
              >
                Get Started
              </Link>
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="pt-6">
          <div className="flow-root bg-white rounded-lg px-6 pb-8">
            <div className="-mt-6">
              <div className="inline-flex items-center justify-center p-3 bg-purple rounded-md shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Discover Products</h3>
              <p className="mt-5 text-base text-gray-500">
                Browse a searchable directory of skincare products with detailed information about ingredients, categories, and more.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <div className="flow-root bg-white rounded-lg px-6 pb-8">
            <div className="-mt-6">
              <div className="inline-flex items-center justify-center p-3 bg-purple rounded-md shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Build Your Stack</h3>
              <p className="mt-5 text-base text-gray-500">
                Create your personal skincare routine by adding products and tracking how they work for your skin.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <div className="flow-root bg-white rounded-lg px-6 pb-8">
            <div className="-mt-6">
              <div className="inline-flex items-center justify-center p-3 bg-purple rounded-md shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Track Results</h3>
              <p className="mt-5 text-base text-gray-500">
                Rate products and maintain a profile of your skin type, concerns, and sensitivities to find what works best.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
