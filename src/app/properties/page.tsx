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
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <Navbar settings={settings} />

      {/* Header Banner */}
      <div className="pt-28 pb-10 sm:pb-14 bg-black text-white border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-medium tracking-widest text-neutral-400 block">
                Portfolio Inventory
              </span>
              <h1 className="text-3xl sm:text-5xl font-normal text-white tracking-tight">
                {locality ? `Verified Properties in ${locality}` : 'All Verified Properties'}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl font-light">
                Showing {properties.length} verified listings with 100% legal title scrutiny, transparent developer pricing, and zero buyer brokerage on new launches.
              </p>
            </div>

            <WhatsAppButton
              phone={settings.whatsapp_number}
              label="Share Requirement on WhatsApp"
              size="md"
              className="self-start md:self-auto"
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10 w-full">
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
            <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-xl border border-neutral-200 text-xs text-neutral-600">
              <span className="font-medium text-black text-sm">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
              </span>
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">Sort:</span>
                <span className="font-medium text-black capitalize">
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
              <div className="bg-white rounded-3xl border border-[#e8e2d5] p-8 sm:p-12 text-center space-y-5 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-[#f5f1e9] flex items-center justify-center mx-auto text-[#b38b42]">
                  <Search className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-xl font-serif font-bold text-[#0c0f14]">
                    No properties match your exact filters
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    We frequently have off-market resale inventory and unlisted pre-launch units in Panvel and Kharghar. Share your requirement and we will send suitable options on WhatsApp.
                  </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/properties"
                    className="px-5 py-2.5 rounded-xl bg-[#f5f1e9] hover:bg-[#ede7dc] text-[#0c0f14] text-xs font-bold transition-colors"
                  >
                    Clear All Filters
                  </Link>
                  <WhatsAppButton
                    phone={settings.whatsapp_number}
                    label="Send Requirement on WhatsApp"
                    size="md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Sticky Mobile WhatsApp Button */}
      <WhatsAppButton
        phone={settings.whatsapp_number}
        variant="floating"
      />

      <Footer settings={settings} />
    </div>
  )
}
