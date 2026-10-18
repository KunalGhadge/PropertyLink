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
} from 'lucide-react'
import { getFeaturedProperties, getSiteSettings, getTestimonials } from '@/lib/data/store'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { HeroSection } from '@/components/public/HeroSection'
import { PropertyCard } from '@/components/public/PropertyCard'
import { LeadForm } from '@/components/public/LeadForm'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'

export default function HomePage() {
  const settings = getSiteSettings()
  const featuredProperties = getFeaturedProperties(6)
  const testimonials = getTestimonials()

  // Icon mapping for Why Choose Us
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-500" />
      case 'BadgePercent':
        return <BadgePercent className="w-6 h-6 text-amber-500" />
      case 'Building2':
        return <Building2 className="w-6 h-6 text-sky-500" />
      case 'Car':
        return <Car className="w-6 h-6 text-purple-500" />
      default:
        return <Sparkles className="w-6 h-6 text-sky-500" />
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
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-sky-500 selection:text-white">
      {/* Sticky Header */}
      <Navbar settings={settings} />

      {/* Hero Section with GSAP scroll animation & Quick Search */}
      <HeroSection settings={settings} sampleProperty={featuredProperties[0]} />

      {/* Featured Properties Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Handpicked Deals
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Properties in Navi Mumbai
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
              Prime residential projects in Panvel, Kharghar, Kamothe, and Seawoods verified for title clearance and best builder pricing.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all self-start md:self-auto"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} priority={idx < 3} />
          ))}
        </div>

        {/* Bottom CTA to all properties */}
        <div className="mt-12 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 underline underline-offset-4"
          >
            Looking for something specific? Search 100+ Navi Mumbai properties with custom filters →
          </Link>
        </div>
      </section>

      {/* Property Categories Grid */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Browse by Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Explore Property Types
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Find exactly what matches your lifestyle or commercial investment criteria.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon
              const link = cat.type === 'rent' ? '/properties?listing_type=rent' : `/properties?property_type=${cat.type}`
              return (
                <Link
                  key={cat.title}
                  href={link}
                  className="group p-5 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xl hover:-translate-y-1 transition-all text-center flex flex-col items-center justify-between"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-sky-600 text-sky-600 group-hover:text-white flex items-center justify-center shadow-sm transition-colors mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{cat.count}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Why Apex Realty Panvel
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
            Built On Complete Transparency
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Indian real estate can be overwhelming. We cut through the confusion with legal due diligence and zero buyer commission on developer units.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(settings.why_choose_us as any[] || []).map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
                {getIcon(card.icon)}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{card.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Broker Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Broker Photo Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image
                  src={settings.broker_photo_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                  alt={settings.broker_name || 'Rajesh Sharma'}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                    {settings.broker_designation}
                  </span>
                  <h3 className="text-xl font-bold">{settings.broker_name}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {settings.broker_experience_years}+ Years Navi Mumbai Experience
                  </p>
                </div>
              </div>
            </div>

            {/* Broker Info Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-900/60 border border-sky-400/30 text-sky-300 text-xs font-semibold backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{settings.rera_number}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {settings.about_title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {settings.about_description}
              </p>

              {/* Areas Served Chips */}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
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
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
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

      {/* Testimonials */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Verified Homeowner Reviews
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
            Trusted by 1,200+ Families
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Real experiences from homebuyers and investors who found their ideal property with Apex Realty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
                  <Image
                    src={t.client_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={t.client_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.client_name}</h4>
                  <p className="text-[11px] text-slate-500">{t.client_location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Lead Capture Section */}
      <section className="py-16 sm:py-24 bg-slate-100/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Need Help Finding A Home?
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Send Us Your Requirement & Get A Curated WhatsApp List
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Tell us your budget, preferred station distance, and BHK config. We will match you with off-market resale inventory and exclusive developer payment plans with zero broker charge.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Free doorstep AC cab site visit for all verified buyers</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Bank loan pre-approval through SBI, HDFC, ICICI & Bank of Baroda</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>100% legal title verification by our in-house advocate</span>
                </div>
              </div>
            </div>

            {/* Lead Form */}
            <div className="lg:col-span-5">
              <LeadForm
                title="Get Free Property Shortlist"
                subtitle="Fill details below or chat directly on WhatsApp."
                source="landing_page"
                className="shadow-xl"
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
