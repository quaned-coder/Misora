import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import ProductList from '@/components/ProductList'
import SearchBar from '@/components/SearchBar'

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  const where: any = {}
  
  if (searchParams.search) {
    const searchLower = searchParams.search.toLowerCase()
    where.OR = [
      { name: { contains: searchParams.search } },
      { brand: { contains: searchParams.search } },
      { description: { contains: searchParams.search } },
    ]
  }

  if (searchParams.category) {
    where.category = searchParams.category
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ['category'],
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Products</h1>
        <SearchBar 
          initialSearch={searchParams.search || ''}
          categories={categories.map(c => c.category)}
          initialCategory={searchParams.category || ''}
        />
      </div>
      <ProductList products={products} userId={session.user.id} />
    </div>
  )
}
