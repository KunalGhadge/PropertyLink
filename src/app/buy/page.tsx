import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { getProperties, getSiteSettings } from '@/lib/data/store'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { PropertyCard } from '@/components/public/PropertyCard'
import { FilterSidebar } from '@/components/public/FilterSidebar'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'
import { Search, ShieldCheck, CheckCircle2, Building2, KeyRound, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Buy Verified Properties in Panvel & Navi Mumbai | Apex Realty',
  description:
    'Discover premium 1, 2, 3 BHK apartments, penthouses, villas, and commercial shops for sale across Panvel, Kharghar, Kamothe, Taloja & Seawoods. Zero brokerage on new developer inventory.',
}

interface BuyPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BuyPage({ searchParams }: BuyPageProps) {
  const resolvedParams = await searchParams
  const settings = getSiteSettings()

  const query = typeof resolvedParams.query === 'string' ? resolvedParams.query : undefined
  const property_type = typeof resolvedParams.property_type === 'string' ? resolvedParams.property_type : undefined
  const bhk = typeof resolvedParams.bhk === 'string' ? (resolvedParams.bhk === 'all' ? 'all' : Number(resolvedParams.bhk)) : undefined
  const locality = typeof resolvedParams.locality === 'string' ? resolvedParams.locality : undefined
  const furnishing = typeof resolvedParams.furnishing === 'string' ? resolvedParams.furnishing : undefined
  const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : 'newest'
  const min_price = resolvedParams.min_price ? Number(resolvedParams.min_price) : undefined
  const max_price = resolvedParams.max_price ? Number(resolvedParams.max_price) : undefined

  // Fetch only 'sale' properties
  const properties = getProperties({
    query,
    listing_type: 'sale',
    property_type,
    bhk,
    locality,
    furnishing,
    sort,
    min_price,
    max_price,
  })

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar settings={settings} />

      {/* Header Banner */}
      <div className="pt-28 pb-12 sm:pb-16 bg-black text-white border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase font-medium tracking-widest text-neutral-400 block">
                Acquisitions & Purchases • Navi Mumbai
              </span>
              <h1 className="text-3xl sm:text-5xl font-normal text-white tracking-tight">
                {locality ? `Homes for Sale in ${locality}` : 'Properties for Sale in Navi Mumbai'}
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                Browse handpicked 1, 2, 3 BHK apartments, penthouses, villas, and commercial spaces with complete title clearance, direct builder pricing, and zero buyer brokerage on new launches.
              </p>
            </div>

            <WhatsAppButton
              phone={settings.whatsapp_number}
              label="WhatsApp Buyer Shortlist"
              size="md"
              className="self-start md:self-auto"
            />
          </div>

          {/* Buyer Trust Highlights */}
          <div className="mt-8 pt-6 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-neutral-400 font-light">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white shrink-0" />
              <span>100% MahaRERA Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
              <span>Zero Brokerage on Developer Inventory</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-white shrink-0" />
              <span>Free Doorstep AC Site Visits</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-white shrink-0" />
              <span>Pre-Approved Bank Loans (SBI, HDFC)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (Sticky on desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterSidebar totalCount={properties.length} defaultListingType="sale" />
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Filter Active Tags */}
            <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-neutral-200 shadow-xs text-xs text-neutral-600">
              <span className="font-sans font-semibold text-black text-sm">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} for sale
              </span>
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">Sort:</span>
                <span className="font-semibold text-black capitalize">
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
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 text-center space-y-5 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-black">
                  <Search className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-xl font-sans font-semibold text-black">No exact sale matches right now</h3>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    We frequently have off-market developer units and unlisted resale flats in Panvel & Kharghar. Share your requirement and we will send suitable options on WhatsApp.
                  </p>
                </div>
                <div className="pt-2 max-w-sm mx-auto">
                  <WhatsAppButton
                    phone={settings.whatsapp_number}
                    label="Send Requirement on WhatsApp"
                    size="md"
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Direct Advisory Section (Zero form, 1-click WhatsApp/Call) */}
        <div className="mt-16 pt-12 border-t border-neutral-200">
          <div className="bg-neutral-50 rounded-2xl p-6 sm:p-10 border border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block">
                Direct Advisory & Off-Market Access
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-black tracking-tight">
                Looking to buy in Panvel or Kharghar corridor?
              </h2>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Skip the endless browsing. Connect directly with our principal broker on WhatsApp for verified launches, unlisted resale opportunities, and accompanied doorstep AC cab site visits with zero buyer commission.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <WhatsAppButton
                phone={settings.whatsapp_number}
                size="md"
                label="Chat on WhatsApp"
                customMessage="Hi Rajesh, I am looking to buy a verified property in Navi Mumbai. Please share matching options."
              />
              <a
                href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                className="px-6 py-3 rounded-xl border border-neutral-300 text-black text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white hover:border-black transition-colors text-center"
              >
                Call Advisor
              </a>
            </div>
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
