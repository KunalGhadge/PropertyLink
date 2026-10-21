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
} from 'lucide-react'
import { getPropertyBySlug, getSimilarProperties, getSiteSettings, getAgents, incrementPropertyMetric } from '@/lib/data/store'
import { formatIndianPrice, formatArea } from '@/lib/utils'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { PropertyGallery } from '@/components/public/PropertyGallery'
import { StatusBadge } from '@/components/public/StatusBadge'
import { PropertyActionButtons } from '@/components/public/PropertyActionButtons'
import { PropertyCard } from '@/components/public/PropertyCard'
import { LeadForm } from '@/components/public/LeadForm'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'
import { SoftLeadCapturePopup } from '@/components/public/SoftLeadCapturePopup'

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* RealEstateListing Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar settings={settings} />

      {/* Breadcrumb Bar */}
      <div className="pt-24 pb-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-slate-900">
              Properties
            </Link>
            <span>/</span>
            <Link href={`/properties?locality=${property.locality}`} className="hover:text-slate-900">
              {property.locality}
            </Link>
            <span>/</span>
            <span className="text-slate-900 truncate max-w-xs">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-24 lg:pb-10 w-full flex-1 space-y-10">
        {/* Title & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={property.status} />
              {property.is_hot_deal && <StatusBadge isHotDeal />}
              {property.featured && <StatusBadge featured />}
              {property.is_new && <StatusBadge isNew />}
              {property.rera_number && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#0c0f14] text-[#c5a059] border border-[#c5a059]/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  MahaRERA: {property.rera_number}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {property.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600">
              <span className="flex items-center gap-1 font-semibold text-[#b38b42]">
                <MapPin className="w-4 h-4 text-[#b38b42]" />
                {property.society_or_project ? `${property.society_or_project}, ` : ''}{property.locality}, {property.city}
              </span>
              <span>•</span>
              <span className="capitalize">{property.property_type}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Eye className="w-3.5 h-3.5" />
                {property.view_count} views
              </span>
            </div>
          </div>

          {/* Price Tag */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-lg border border-slate-800 self-start lg:self-auto text-left lg:text-right min-w-[220px]">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              {property.listing_type === 'rent' ? 'Expected Monthly Rent' : 'All-Inclusive Pricing'}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white block mt-0.5">
              {priceFormatted}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">
              Zero Buyer Brokerage Guaranteed
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
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4">Property Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 block mb-0.5">Configuration</span>
                  <span className="text-sm font-bold text-slate-900">{property.bhk || 0} BHK</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 block mb-0.5">Carpet Area</span>
                  <span className="text-sm font-bold text-slate-900">{formatArea(property.carpet_area, property.area_unit)}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 block mb-0.5">Floor Level</span>
                  <span className="text-sm font-bold text-slate-900">
                    {property.floor_number ? `${property.floor_number} of ${property.total_floors}` : 'Mid Floor'}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 block mb-0.5">Furnishing</span>
                  <span className="text-sm font-bold text-slate-900 capitalize">
                    {property.furnishing.replace('_', ' ')}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 block mb-0.5">Facing / Vastu</span>
                  <span className="text-sm font-bold text-slate-900">{property.facing || 'East Facing'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 block mb-0.5">Possession</span>
                  <span className="text-sm font-bold text-slate-900">{property.possession_date || 'Ready to Move'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 block mb-0.5">Bathrooms</span>
                  <span className="text-sm font-bold text-slate-900">{property.bathrooms} Baths</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 block mb-0.5">Balconies</span>
                  <span className="text-sm font-bold text-slate-900">{property.balconies} Balconies</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">About the Property</h2>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                {property.description}
              </div>
            </div>

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Amenities & Lifestyle Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-semibold text-slate-800"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location & Map Section */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Location & Neighborhood</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{property.full_address || `${property.locality}, Navi Mumbai`}</p>
                </div>
                {property.map_link && (
                  <a
                    href={property.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#b38b42] hover:text-[#9a7532] underline"
                  >
                    Open Google Maps ↗
                  </a>
                )}
              </div>

              {/* Map Embed or placeholder preview */}
              <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60377.34638641982!2d73.078426!3d19.015243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e84f67c54159%3A0xb366b5791fe93077!2sPanvel%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Property Location Map"
                />
              </div>

              {/* Landmark Connectivity Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-0.5">Upcoming Airport</span>
                  <span>15 Mins via Amra Marg / Expressway</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-0.5">Railway / Metro</span>
                  <span>5-8 Mins from nearest transit hub</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-0.5">Schools & Hospitals</span>
                  <span>DPS, MGM & Ryan within 3 km radius</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) Sticky CTAs & Lead Capture */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Main Actions Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xl space-y-4">
                <h3 className="text-base font-bold text-slate-900">Direct Broker Actions</h3>
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

              {/* Agent Profile Card */}
              {assignedAgent && (
                <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-800 border-2 border-[#c5a059] shrink-0">
                      <Image
                        src={assignedAgent.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                        alt={assignedAgent.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{assignedAgent.name}</h4>
                      <p className="text-xs text-[#c5a059] font-medium">{assignedAgent.designation}</p>
                      <p className="text-[11px] text-slate-400">{assignedAgent.experience_years}+ Years in Panvel Real Estate</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-xs text-slate-300">
                    <p>“I accompany every buyer personally. No pushy sales, just honest advice and verified titles.”</p>
                  </div>
                </div>
              )}

              {/* Lead Form */}
              <LeadForm
                propertyId={property.id}
                propertyTitle={property.title}
                locality={property.locality}
                priceFormatted={priceFormatted}
                title="Request Priority Site Visit"
                subtitle="Leave your contact below to get callback & floor plans."
                source="property_page"
                compact
              />
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="pt-10 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Similar Properties in {property.locality}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Explore other verified options nearby</p>
              </div>
              <Link
                href={`/properties?locality=${property.locality}`}
                className="text-xs font-bold text-[#b38b42] hover:text-[#9a7532] underline"
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

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Total Price</span>
          <span className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight block truncate">{priceFormatted}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`tel:${settings.phone_number.replace(/[^0-9+]/g, '')}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
          <a
            href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi Rajesh, I am interested in visiting: ${property.title} in ${property.locality} (${priceFormatted}). https://propertylink.in/property/${property.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Soft restrained Lead Capture Prompt */}
      <SoftLeadCapturePopup
        propertyTitle={property.title}
        propertyLocality={property.locality}
        propertyPrice={priceFormatted}
        propertySlug={property.slug}
      />

      <WhatsAppButton
        phone={settings.whatsapp_number}
        variant="floating"
      />

      <Footer settings={settings} />
    </div>
  )
}
