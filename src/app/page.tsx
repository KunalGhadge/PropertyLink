import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShieldCheck,
  BadgePercent,
  Building2,
  Car,
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  Layers,
  Home,
  Building,
  Key,
  MessageCircle,
} from 'lucide-react'
import { getFeaturedProperties, getAllPropertiesAdmin, getSiteSettings, getTestimonials } from '@/lib/data/store'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { HeroSection } from '@/components/public/HeroSection'
import { PropertyCard } from '@/components/public/PropertyCard'
import { HomeLiveListings } from '@/components/public/HomeLiveListings'
import { LeadForm } from '@/components/public/LeadForm'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'

export default function HomePage() {
  const settings = getSiteSettings()
  const featuredProperties = getFeaturedProperties(6)
  const allProperties = getAllPropertiesAdmin().filter((p) => p.status !== 'hidden')
  const testimonials = getTestimonials()

  // Icon mapping for Why Choose Us
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#b38b42]" />
      case 'BadgePercent':
        return <BadgePercent className="w-6 h-6 text-amber-600" />
      case 'MessageCircle':
        return <MessageCircle className="w-6 h-6 text-[#25D366]" />
      case 'Car':
        return <Car className="w-6 h-6 text-sky-600" />
      default:
        return <Sparkles className="w-6 h-6 text-[#b38b42]" />
    }
  }

  const categories = [
    { title: 'Apartments & Flats', count: '100+ Live', type: 'flat', icon: Building2, desc: '1, 2 & 3 BHK luxury residences' },
    { title: 'Luxury Penthouses', count: '12 Exclusive', type: 'penthouse', icon: Sparkles, desc: 'Duplex & golf-facing suites' },
    { title: 'Row Houses & Villas', count: '25 Available', type: 'villa', icon: Home, desc: 'Private garden gated communities' },
    { title: 'Commercial Shops', count: '40 High Footfall', type: 'shop', icon: Building, desc: 'Main road retail spaces' },
    { title: 'Corporate Offices', count: '18 Available', type: 'office', icon: Layers, desc: 'Grade-A business parks' },
    { title: 'Verified Rentals', count: '65 Live', type: 'rent', icon: Key, desc: 'Families & corporate leases' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] selection:bg-[#c5a059]/25 selection:text-[#0c0f14]">
      {/* Sticky Header */}
      <Navbar settings={settings} />

      {/* Hero Section with Parallax & Quick Search */}
      <HeroSection settings={settings} sampleProperty={featuredProperties[0]} />

      {/* Featured Properties Section */}
      <section id="featured" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f4efe6] text-[#b38b42] mb-2 border border-[#e8e2d5]">
              <Sparkles className="w-3.5 h-3.5 text-[#b38b42]" />
              Curated Local Inventory
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0c0f14] tracking-tight">
              Featured Properties in Panvel & Navi Mumbai
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-1.5 max-w-xl">
              Handpicked residential homes, commercial spaces, and approved plots verified for clear title and direct developer pricing.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0c0f14] hover:bg-[#1f2733] text-white font-bold text-sm shadow-md transition-all self-start md:self-auto"
          >
            <span>Explore All Properties</span>
            <ArrowRight className="w-4 h-4 text-[#c5a059]" />
          </Link>
        </div>

        {/* 6 Curated Property Cards Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.slice(0, 6).map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} priority={idx < 3} />
          ))}
        </div>

        {/* Bottom CTA to all properties */}
        <div className="mt-12 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#b38b42] hover:text-[#8f6a27] underline underline-offset-4"
          >
            Looking for something specific? Search verified Navi Mumbai properties with custom filters →
          </Link>
        </div>
      </section>

      {/* Property Categories Grid */}
      <section className="py-16 bg-[#f7f4ed] border-y border-[#e8e2d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#b38b42] uppercase tracking-wider">
              Browse by Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0c0f14] mt-1 tracking-tight">
              Explore Property Types
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Find exactly what matches your lifestyle, family needs, or commercial investment goals.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon
              const link = cat.type === 'rent' ? '/rent' : `/properties?property_type=${cat.type}`
              return (
                <Link
                  key={cat.title}
                  href={link}
                  className="group p-5 bg-white hover:bg-[#fbf9f5] rounded-2xl border border-[#e8e2d5] hover:border-[#c5a059] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all text-center flex flex-col items-center justify-between"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#f5f1e9] group-hover:bg-[#0c0f14] text-[#b38b42] group-hover:text-[#c5a059] flex items-center justify-center shadow-xs transition-colors mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-[#0c0f14] group-hover:text-[#b38b42] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-0.5">{cat.count}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Live Interactive Property Listings on Homepage */}
      <HomeLiveListings initialProperties={allProperties} />

      {/* Why Choose This Broker */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#b38b42] uppercase tracking-wider">
            Why Apex Realty Panvel
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0c0f14] mt-1 tracking-tight">
            Built On Complete Legal Transparency
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Navi Mumbai real estate can be overwhelming. We cut through the confusion with thorough legal scrutiny, zero buyer commission on developer inventory, and end-to-end guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(settings.why_choose_us as any[] || []).map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e8e2d5] shadow-luxury hover:shadow-luxury-hover transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#f5f1e9] flex items-center justify-center mb-5 text-[#b38b42]">
                {getIcon(card.icon)}
              </div>
              <h3 className="text-base font-serif font-bold text-[#0c0f14] mb-2">{card.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Broker Section */}
      <section className="py-16 sm:py-20 bg-[#0c0f14] text-white border-y border-[#c5a059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Broker Photo Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#c5a059]/30 shadow-2xl bg-stone-900">
                <Image
                  src={settings.broker_photo_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                  alt={settings.broker_name || 'Rajesh Sharma'}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f14] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider block">
                    {settings.broker_designation}
                  </span>
                  <h3 className="text-xl font-serif font-bold">{settings.broker_name}</h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    {settings.broker_experience_years}+ Years Navi Mumbai Advisory
                  </p>
                </div>
              </div>
            </div>

            {/* Broker Info Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c222c] border border-[#c5a059]/30 text-[#dfba73] text-xs font-semibold backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{settings.rera_number}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-snug">
                {settings.about_title}
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                {settings.about_description}
              </p>

              {/* Areas Served Chips */}
              <div>
                <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider block mb-2">
                  Areas Served in Navi Mumbai
                </span>
                <div className="flex flex-wrap gap-2">
                  {settings.areas_served.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={`tel:${settings.phone_number}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#0c0f14] font-bold text-sm hover:bg-stone-100 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#b38b42]" />
                  <span>Call {settings.phone_number}</span>
                </a>

                <WhatsAppButton
                  phone={settings.whatsapp_number}
                  size="md"
                  label="Direct WhatsApp Consultation"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Homeowner Reviews */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#b38b42] uppercase tracking-wider">
            Verified Homeowner Reviews
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0c0f14] mt-1 tracking-tight">
            Trusted by 1,200+ Families
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Real experiences from homebuyers, sellers, and corporate investors who found their ideal property with Apex Realty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e8e2d5] shadow-luxury flex flex-col justify-between space-y-4"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#c5a059] mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-stone-200 shrink-0 border border-[#e8e2d5]">
                  <Image
                    src={t.client_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={t.client_name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-serif font-bold text-[#0c0f14]">{t.client_name}</h4>
                  <p className="text-[11px] text-stone-500">{t.client_location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Section: "Looking for a property in Panvel, Kharghar, or Navi Mumbai?" */}
      <section className="py-16 sm:py-24 bg-[#f7f4ed] border-t border-[#e8e2d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4efe6] border border-[#e8e2d5] text-[#b38b42] text-xs font-bold uppercase tracking-wider">
                <span>Personalized Advisory</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0c0f14] tracking-tight leading-snug">
                Looking for a property in Panvel, Kharghar, or Navi Mumbai?
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                Share your requirement and get matching options on WhatsApp. We provide direct builder pricing, legal scrutiny, and curated resale units with zero buyer brokerage on new launches.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Free doorstep AC cab site visit for all verified buyers</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Bank loan pre-approval through SBI, HDFC, ICICI & Bank of Baroda</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>100% legal title verification by our in-house advocate</span>
                </div>
              </div>
            </div>

            {/* Lead Form */}
            <div className="lg:col-span-5">
              <LeadForm
                title="Get Matching Properties on WhatsApp"
                subtitle="Share your requirement below and we will send suitable options shortly."
                source="landing_page"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Sticky Mobile WhatsApp Button */}
      <WhatsAppButton
        phone={settings.whatsapp_number}
        variant="floating"
      />

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  )
}
