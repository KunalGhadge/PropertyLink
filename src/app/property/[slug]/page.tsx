import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Building2,
  Calendar,
  Layers,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Check,
  Sparkles,
  Phone,
  Clock,
  ArrowLeft,
  MessageSquare,
  FileText,
} from 'lucide-react'
import { getPropertyBySlug, getSimilarProperties, getSiteSettings, getAgents, incrementPropertyMetric } from '@/lib/data/store'
import { formatIndianPrice, formatArea } from '@/lib/utils'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { PropertyGallery } from '@/components/public/PropertyGallery'
import { PropertyActionButtons } from '@/components/public/PropertyActionButtons'
import { PropertyCard } from '@/components/public/PropertyCard'

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    return {
      title: 'Property Not Found | PropertyLink',
    }
  }

  const priceText = formatIndianPrice(property.price, property.listing_type)
  const title = property.meta_title || `${property.title} in ${property.locality} | ${priceText}`
  const description = property.meta_description || property.description?.slice(0, 160) || `Buy ${property.bhk} BHK property in ${property.locality}, Navi Mumbai.`
  const ogImage = property.images[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  // Increment view metric
  incrementPropertyMetric(property.id, 'view')

  const settings = getSiteSettings()
  const agents = getAgents()
  const assignedAgent = agents[0] // Primary broker / agent
  const similarProperties = getSimilarProperties(property.id, property.locality, 3)

  const priceFormatted = formatIndianPrice(property.price, property.listing_type, property.rent_period)

  // JSON-LD RealEstateListing Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `https://apexrealty.in/property/${property.slug}`,
    image: property.images.map((img) => img.url),
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'INR',
      availability: property.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.locality,
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* RealEstateListing Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar settings={settings} />

      {/* Clean Breadcrumb Bar */}
      <div className="pt-24 pb-3 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-light">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-black transition-colors">
              Properties
            </Link>
            <span>/</span>
            <Link href={`/properties?locality=${property.locality}`} className="hover:text-black transition-colors">
              {property.locality}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-32 lg:pb-16 w-full flex-1 space-y-8">
        {/* Clean Spacious Title & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="space-y-2.5 max-w-3xl">
            {/* Minimal Understated Tags (Max 2 clean pills) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-neutral-100 text-neutral-800 border border-neutral-200">
                {property.status === 'sold' ? 'Sold Out' : property.listing_type === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
              {property.rera_number && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-900 text-white">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  MahaRERA: {property.rera_number.replace(/^MahaRERA:?\s*/i, '')}
                </span>
              )}
              {property.is_hot_deal && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-700">
                  Featured
                </span>
              )}
            </div>

            {/* Spacious, Elegant Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-black tracking-tight leading-snug">
              {property.title}
            </h1>

            {/* Breathing Location & Specs Subtitle */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-neutral-500 font-light">
              <span className="flex items-center gap-1 font-medium text-black">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                {property.society_or_project ? `${property.society_or_project}, ` : ''}{property.locality}, {property.city}
              </span>
              <span>•</span>
              <span>{property.bhk} BHK</span>
              <span>•</span>
              <span>{formatArea(property.carpet_area, property.area_unit)}</span>
              <span>•</span>
              <span className="capitalize">{property.furnishing.replace('_', ' ')}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-neutral-400">
                <Eye className="w-3.5 h-3.5" />
                {property.view_count} views
              </span>
            </div>
          </div>

          {/* Clean Price Display */}
          <div className="flex flex-col lg:items-end justify-center pt-2 lg:pt-0 shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
              {property.listing_type === 'rent' ? 'Expected Monthly Rent' : 'All-Inclusive Pricing'}
            </span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black tracking-tight mt-0.5">
              {priceFormatted}
            </span>
            <span className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Zero Buyer Brokerage
            </span>
          </div>
        </div>

        {/* 2-Column Main Layout: Left Gallery & Details, Right Sticky Contact Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Image Gallery with fullscreen lightbox & video embed */}
            <PropertyGallery
              images={property.images}
              title={property.title}
              videoUrl={property.video_url}
            />

            {/* Quick Specs Overview Grid */}
            <div className="bg-neutral-50/70 rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-xs">
              <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3 sm:mb-4">
                Property Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
                <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200/80">
                  <span className="text-neutral-400 block mb-0.5 text-[10px] sm:text-[11px]">Configuration</span>
                  <span className="text-xs sm:text-sm font-semibold text-black">{property.bhk || 0} BHK</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200/80">
                  <span className="text-neutral-400 block mb-0.5 text-[10px] sm:text-[11px]">Carpet Area</span>
                  <span className="text-xs sm:text-sm font-semibold text-black">{formatArea(property.carpet_area, property.area_unit)}</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200/80">
                  <span className="text-neutral-400 block mb-0.5 text-[10px] sm:text-[11px]">Floor Level</span>
                  <span className="text-xs sm:text-sm font-semibold text-black truncate block">
                    {property.floor_number ? `${property.floor_number} of ${property.total_floors}` : 'Mid Floor'}
                  </span>
                </div>
                <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200/80">
                  <span className="text-neutral-400 block mb-0.5 text-[10px] sm:text-[11px]">Furnishing</span>
                  <span className="text-xs sm:text-sm font-semibold text-black capitalize truncate block">
                    {property.furnishing.replace('_', ' ')}
                  </span>
                </div>
                <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200/80">
                  <span className="text-neutral-400 block mb-0.5 text-[10px] sm:text-[11px]">Facing / Vastu</span>
                  <span className="text-xs sm:text-sm font-semibold text-black truncate block">{property.facing || 'East Facing'}</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200/80">
                  <span className="text-neutral-400 block mb-0.5 text-[10px] sm:text-[11px]">Possession</span>
                  <span className="text-xs sm:text-sm font-semibold text-black truncate block">{property.possession_date || 'Ready to Move'}</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200/80">
                  <span className="text-neutral-400 block mb-0.5 text-[10px] sm:text-[11px]">Bathrooms</span>
                  <span className="text-xs sm:text-sm font-semibold text-black">{property.bathrooms} Baths</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200/80">
                  <span className="text-neutral-400 block mb-0.5 text-[10px] sm:text-[11px]">Balconies</span>
                  <span className="text-xs sm:text-sm font-semibold text-black">{property.balconies} Balconies</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-8 shadow-xs space-y-3 sm:space-y-4">
              <h2 className="text-sm sm:text-base font-semibold text-black tracking-tight">About this Residence</h2>
              <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed whitespace-pre-line space-y-3 font-light">
                {property.description}
              </div>
            </div>

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-8 shadow-xs space-y-3 sm:space-y-4">
                <h2 className="text-sm sm:text-base font-semibold text-black tracking-tight">Amenities & Lifestyle Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-xs font-medium text-neutral-800"
                    >
                      <Check className="w-3.5 h-3.5 text-black shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location & Map Section */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-black tracking-tight">Location & Neighborhood</h2>
                  <p className="text-xs text-neutral-500 mt-0.5">{property.full_address || `${property.locality}, Navi Mumbai`}</p>
                </div>
                {property.map_link && (
                  <a
                    href={property.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-black hover:underline"
                  >
                    Open Google Maps ↗
                  </a>
                )}
              </div>

              {/* Map Embed or placeholder preview */}
              <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60377.34638641982!2d73.078426!3d19.015243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e84f67c54159%3A0xb366b5791fe93077!2sPanvel%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Property Location Map"
                />
              </div>

              {/* Landmark Connectivity Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-neutral-600">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="font-semibold text-black block mb-0.5">Upcoming Airport</span>
                  <span className="text-neutral-500">15 Mins via Amra Marg / Expressway</span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="font-semibold text-black block mb-0.5">Railway / Metro</span>
                  <span className="text-neutral-500">5-8 Mins from nearest transit hub</span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="font-semibold text-black block mb-0.5">Schools & Hospitals</span>
                  <span className="text-neutral-500">DPS, MGM & Ryan within 3 km radius</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) Sticky CTAs & Verified Advisory Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-5">
              {/* Primary Direct Broker Actions Card */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="pb-2 border-b border-neutral-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-black tracking-tight">Direct Broker Inquiry</h3>
                    <p className="text-xs text-neutral-500 font-light mt-0.5">Zero Buyer Brokerage • Verified Title</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Broker active online" />
                </div>

                <PropertyActionButtons
                  propertyId={property.id}
                  propertyTitle={property.title}
                  priceFormatted={priceFormatted}
                  locality={property.locality}
                  phone={settings.phone_number}
                  whatsappNumber={settings.whatsapp_number}
                  propertySlug={property.slug}
                  brochureUrl={property.brochure_url}
                  floorPlanUrl={property.floor_plan_url}
                  ownerName={property.owner_name}
                  ownerPhone={property.owner_phone}
                  hideOwnerContact={property.hide_owner_contact}
                />
              </div>

              {/* Dedicated Advisor Profile Card (Standout, High Trust) */}
              {assignedAgent && (
                <div className="bg-[#0c0d10] text-white rounded-2xl p-5 border border-neutral-800 space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">
                      Your Dedicated Advisor
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      MahaRERA Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 shrink-0">
                      <Image
                        src={assignedAgent.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                        alt={assignedAgent.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">{assignedAgent.name}</h4>
                      <p className="text-xs text-neutral-400 font-light truncate">{assignedAgent.designation}</p>
                      <p className="text-[10px] text-neutral-500 mt-0.5">{assignedAgent.experience_years}+ Years Local Market Advisory</p>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 font-light pt-2.5 border-t border-neutral-800 leading-relaxed italic">
                    “Personal accompanied site visits in private AC cab. 100% legal scrutiny & zero buyer brokerage.”
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="pt-12 border-t border-neutral-100 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-normal text-black tracking-tight">
                  Similar Properties in {property.locality}
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-0.5">Explore curated residences nearby</p>
              </div>
              <Link
                href={`/properties?locality=${property.locality}`}
                className="text-xs font-semibold text-neutral-900 hover:text-black underline"
              >
                View all in {property.locality} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((sim) => (
                <PropertyCard key={sim.id} property={sim} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Sticky Action Bar (Clean, zero overlap, high z-index) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">Total Price</span>
          <span className="text-sm sm:text-base font-bold text-black leading-tight block truncate">{priceFormatted}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`tel:${settings.phone_number.replace(/[^0-9+]/g, '')}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-300 text-xs font-medium text-black bg-white hover:bg-neutral-50 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
          <a
            href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi Rajesh, I am interested in visiting: ${property.title} in ${property.locality} (${priceFormatted}). https://propertylink.in/property/${property.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white bg-black hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <Footer settings={settings} />
    </div>
  )
}
