import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { getProperties, getSiteSettings } from '@/lib/data/store'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { PropertyCard } from '@/components/public/PropertyCard'
import { FilterSidebar } from '@/components/public/FilterSidebar'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'
import { Search, Home, Building2, MessageCircle, SlidersHorizontal } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Properties for Sale & Rent in Panvel & Navi Mumbai | Apex Realty',
  description: 'Search verified apartments, penthouses, and commercial spaces across Panvel, Kharghar, Kamothe, Taloja & Seawoods. Zero brokerage on new launches.',
}

interface PropertiesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const resolvedParams = await searchParams
  const settings = getSiteSettings()

  const query = typeof resolvedParams.query === 'string' ? resolvedParams.query : undefined
  const listing_type = typeof resolvedParams.listing_type === 'string' ? resolvedParams.listing_type : undefined
  const property_type = typeof resolvedParams.property_type === 'string' ? resolvedParams.property_type : undefined
  const bhk = typeof resolvedParams.bhk === 'string' ? (resolvedParams.bhk === 'all' ? 'all' : Number(resolvedParams.bhk)) : undefined
  const locality = typeof resolvedParams.locality === 'string' ? resolvedParams.locality : undefined
  const furnishing = typeof resolvedParams.furnishing === 'string' ? resolvedParams.furnishing : undefined
  const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : 'newest'
  const min_price = resolvedParams.min_price ? Number(resolvedParams.min_price) : undefined
  const max_price = resolvedParams.max_price ? Number(resolvedParams.max_price) : undefined

  // Fetch filtered properties
  const properties = getProperties({
    query,
    listing_type,
    property_type,
    bhk,
    locality,
    furnishing,
    sort,
    min_price,
    max_price,
  })

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar settings={settings} />

      {/* Header Banner */}
      <div className="pt-24 pb-8 sm:pb-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                Navi Mumbai Real Estate Directory
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                {locality ? `Properties in ${locality}` : 'All Verified Properties'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Showing {properties.length} verified listings with direct developer pricing and zero buyer brokerage.
              </p>
            </div>

            <WhatsAppButton
              phone={settings.whatsapp_number}
              label="Send Custom Requirement"
              size="md"
              className="self-start md:self-auto"
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (Sticky on desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterSidebar totalCount={properties.length} />
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Filter Active Tags */}
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200/80 shadow-sm text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                {properties.length} properties found
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Sort:</span>
                <span className="font-bold text-slate-800 capitalize">
                  {sort === 'price_asc'
                    ? 'Price: Low to High'
                    : sort === 'price_desc'
                    ? 'Price: High to Low'
                    : sort === 'popular'
                    ? 'Most Viewed'
                    : 'Newest'}
                </span>
              </div>
            </div>

            {/* Property Cards */}
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              /* Empty State with WhatsApp fallback */
              <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-5 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    No properties match your exact filters
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    We frequently have off-market resale inventory and unlisted pre-launch units in Panvel and Kharghar.
                  </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/properties"
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    Clear All Filters
                  </Link>
                  <WhatsAppButton
                    phone={settings.whatsapp_number}
                    label="Send Requirement on WhatsApp"
                    size="sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <WhatsAppButton
        phone={settings.whatsapp_number}
        variant="floating"
      />

      <Footer settings={settings} />
    </div>
  )
}
