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
import { Footer } from '@/components/public/Footer'
import { HeroSection } from '@/components/public/HeroSection'
import { ArchitecturalHeroShowcase } from '@/components/public/ArchitecturalHeroShowcase'
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
        return <ShieldCheck className="w-5 h-5 text-black" />
      case 'Building2':
        return <Building2 className="w-5 h-5 text-black" />
      case 'BadgePercent':
        return <BadgePercent className="w-5 h-5 text-black" />
      case 'MessageCircle':
        return <MessageCircle className="w-5 h-5 text-black" />
      case 'Car':
        return <Car className="w-5 h-5 text-black" />
      default:
        return <Sparkles className="w-5 h-5 text-black" />
    }
  }

  const categories = [
    { title: 'Apartments & Flats', count: '100+ Live', type: 'flat', icon: Building2 },
    { title: 'Luxury Penthouses', count: '12 Exclusive', type: 'penthouse', icon: Sparkles },
    { title: 'Row Houses & Villas', count: '25 Available', type: 'villa', icon: Home },
    { title: 'Commercial Shops', count: '40 High Footfall', type: 'shop', icon: Building },
    { title: 'Corporate Offices', count: '18 Available', type: 'office', icon: Layers },
    { title: 'Verified Rentals', count: '65 Live', type: 'rent', icon: Key },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white text-black selection:bg-black/10 selection:text-black">
      {/* 1. Exact Full-screen Video Hero Section with Liquid Glass Navbar */}
      <HeroSection settings={settings} />

      {/* 2. Architectural Sections: "Discover space you truly belong in",
          "Guiding you toward the residence of your dreams", and "Exclusive collection"
          Exactly matching the user's attached screenshot */}
      <ArchitecturalHeroShowcase
        properties={featuredProperties}
        whatsappNumber={settings.whatsapp_number}
        phoneNumber={settings.phone_number}
      />

      {/* 3. Category Navigation in Clean Monochrome Layout */}
      <section className="py-16 sm:py-20 bg-neutral-50 border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-1">
                Portfolio Categories
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-black tracking-tight">
                Explore by Property Configuration
              </h3>
            </div>
            <Link
              href="/properties"
              className="text-xs font-semibold text-black hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5"
            >
              <span>View all inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon
              const link = cat.type === 'rent' ? '/rent' : `/properties?property_type=${cat.type}`
              return (
                <Link
                  key={cat.title}
                  href={link}
                  className="group p-5 bg-white rounded-xl border border-neutral-200/90 hover:border-black transition-all flex flex-col items-center justify-between text-center min-h-[140px]"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-100 group-hover:bg-black group-hover:text-white text-black flex items-center justify-center transition-colors mb-3">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-black group-hover:text-neutral-700 transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{cat.count}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Live Interactive Property Discovery with Search and Filters */}
      <div id="properties-section" className="py-12 bg-white">
        <HomeLiveListings initialProperties={allProperties} />
      </div>

      {/* 5. Trust & Quality Standards */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 border-t border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16">
          <div className="lg:col-span-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-2">
              Our Advisory Standard
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-black tracking-tight leading-tight">
              Built on verified titles and transparent execution
            </h3>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-lg">
              Navi Mumbai real estate requires rigorous legal verification. We curate developer and private inventory with 100% MahaRERA documentation, clear chain of titles, and zero buyer commission on direct builder launches.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {(settings.why_choose_us as any[] || []).map((card, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center mb-5 text-black">
                {getIcon(card.icon)}
              </div>
              <h4 className="text-base font-medium text-black mb-2 tracking-tight">{card.title}</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Broker Profile & Credentials */}
      <section className="py-20 bg-neutral-950 text-white border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Broker Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
                <Image
                  src={settings.broker_photo_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                  alt={settings.broker_name || 'Rajesh Sharma'}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest block">
                    {settings.broker_designation}
                  </span>
                  <h4 className="text-xl font-normal tracking-tight text-white">{settings.broker_name}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 font-light">
                    {settings.broker_experience_years}+ Years Panvel & Kharghar Corridor
                  </p>
                </div>
              </div>
            </div>

            {/* Broker Information */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>MahaRERA: {settings.rera_number}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-normal text-white tracking-tight leading-snug">
                {settings.about_title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                {settings.about_description}
              </p>

              {/* Areas Served Chips */}
              <div>
                <span className="text-xs uppercase font-medium tracking-wider text-neutral-400 block mb-2.5">
                  Micro-Markets Served
                </span>
                <div className="flex flex-wrap gap-2">
                  {settings.areas_served.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 rounded-md bg-neutral-900 text-neutral-300 text-xs font-light border border-neutral-800"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a
                  href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {settings.phone_number}</span>
                </a>
                <WhatsAppButton
                  phone={settings.whatsapp_number}
                  size="md"
                  label="Enquire on WhatsApp"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Client Experiences */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 border-t border-neutral-100">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-2">
            Client Testimonials
          </span>
          <h3 className="text-3xl sm:text-4xl font-normal text-black tracking-tight">
            Trusted by 1,200+ Homeowners & Investors
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-2xl border border-neutral-200/80 bg-neutral-50/40 flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center gap-1 text-black mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
                  "{t.review}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/60">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                  <Image
                    src={t.client_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={t.client_name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-medium text-black">{t.client_name}</h5>
                  <p className="text-[11px] text-neutral-500 font-light">{t.client_location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Low Friction Consultation Lead Capture */}
      <section className="py-20 bg-neutral-50 border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block">
                Direct Consultation
              </span>
              <h3 className="text-3xl sm:text-4xl font-normal text-black tracking-tight leading-snug">
                Looking for a home in Panvel, Kharghar, or Navi Mumbai?
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Share your criteria and receive handpicked, verified options on WhatsApp. We provide direct builder pricing, legal scrutiny, and accompanied AC cab visits with zero buyer brokerage on new launches.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-700 font-light">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  <span>Complimentary AC cab site visit from your doorstep or station</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-700 font-light">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  <span>Bank loan pre-approval through SBI, HDFC & ICICI</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-700 font-light">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  <span>100% legal title verification by our in-house advocate</span>
                </div>
              </div>
            </div>

            {/* Lead Form */}
            <div className="lg:col-span-5">
              <LeadForm
                title="Get Matching Properties on WhatsApp"
                subtitle="Share your requirement below; we will send curated options within 30 minutes."
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
