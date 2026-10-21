import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { getProperties, getSiteSettings } from '@/lib/data/store'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { PropertyCard } from '@/components/public/PropertyCard'
import { FilterSidebar } from '@/components/public/FilterSidebar'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'
import { LeadForm } from '@/components/public/LeadForm'
import { SoftLeadCapturePopup } from '@/components/public/SoftLeadCapturePopup'
import { Search, ShieldCheck, CheckCircle2, FileCheck, Key, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rental Homes & Flats in Panvel, Kharghar & Navi Mumbai | Apex Realty',
  description:
    'Search verified 1, 2, 3 BHK rental apartments, furnished flats, and office spaces in Panvel, Kharghar, Kamothe, Kalamboli & Seawoods. Seamless registered rent agreements and police verification support.',
}

interface RentPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function RentPage({ searchParams }: RentPageProps) {
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

  // Fetch only 'rent' properties
  const properties = getProperties({
    query,
    listing_type: 'rent',
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
      <div className="pt-28 pb-12 sm:pb-16 bg-[#0c0f14] text-white border-b border-[#c5a059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c222c] border border-[#c5a059]/30 text-[#dfba73] text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Verified Rental Inventory • Panvel & Navi Mumbai</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                {locality ? `Rental Properties in ${locality}` : 'Verified Rental Homes in Navi Mumbai'}
              </h1>
              <p className="text-sm sm:text-base text-stone-300 font-normal leading-relaxed">
                Find family-friendly, semi-furnished, and fully furnished rental residences across Panvel, Kharghar, Kamothe, Kalamboli, and Seawoods with transparent agreements and immediate move-in support.
              </p>
            </div>

            <WhatsAppButton
              phone={settings.whatsapp_number}
              label="Share Rental Requirement"
              size="md"
              className="self-start md:self-auto"
            />
          </div>

          {/* Tenant Trust Highlights */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Title & Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Doorstep Biometric Agreement</span>
            </div>
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Ready for Immediate Move-in</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Police Verification Assistance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (Sticky on desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterSidebar totalCount={properties.length} defaultListingType="rent" />
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Filter Active Tags */}
            <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-[#e8e2d5] shadow-xs text-xs text-stone-600">
              <span className="font-serif font-bold text-[#0c0f14] text-sm">
                {properties.length} rental {properties.length === 1 ? 'property' : 'properties'} available
              </span>
              <div className="flex items-center gap-2">
                <span className="text-stone-400">Sort:</span>
                <span className="font-bold text-[#0c0f14] capitalize">
                  {sort === 'price_asc'
                    ? 'Rent: Low to High'
                    : sort === 'price_desc'
                    ? 'Rent: High to Low'
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
                  <h3 className="text-xl font-serif font-bold text-[#0c0f14]">No exact rental matches right now</h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Rental inventory moves rapidly. Share your preferred location, budget, and family/bachelor status on WhatsApp, and we will share fresh verified listings.
                  </p>
                </div>
                <div className="pt-2 max-w-sm mx-auto">
                  <WhatsAppButton
                    phone={settings.whatsapp_number}
                    label="WhatsApp Your Rental Requirement"
                    size="md"
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lead Capture Section */}
        <div className="mt-16 pt-12 border-t border-[#e8e2d5]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[#b38b42] uppercase tracking-wider block">
                Quick Move-In Concierge
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0c0f14]">
                Looking for a flat for rent in Navi Mumbai?
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed font-normal">
                Avoid fake listings and shady brokerages. We only list flats with verified owner papers, standard society NOCs, and straightforward security deposit terms.
              </p>
            </div>
            <div className="lg:col-span-5">
              <LeadForm
                title="Get Verified Rental Options"
                subtitle="Direct WhatsApp callback with photos, society maintenance details & deposit terms."
                source="website_form"
              />
            </div>
          </div>
        </div>
      </main>

      <SoftLeadCapturePopup />

      <WhatsAppButton
        phone={settings.whatsapp_number}
        variant="floating"
      />

      <Footer settings={settings} />
    </div>
  )
}
