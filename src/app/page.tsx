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
import { WhatsAppButton } from '@/components/public/WhatsAppButton'
import { ScrollReveal } from '@/components/public/ScrollReveal'

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
      <section className="py-14 sm:py-20 bg-neutral-50/70 border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <ScrollReveal direction="up" delay={40}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3">
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
                className="text-xs font-semibold text-black hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5 self-start md:self-auto"
              >
                <span>View all inventory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon
                const link = cat.type === 'rent' ? '/rent' : `/properties?property_type=${cat.type}`
                return (
                  <Link
                    key={cat.title}
                    href={link}
                    className="group p-4 sm:p-5 bg-white rounded-xl border border-neutral-200/90 hover:border-black transition-all flex flex-col items-center justify-between text-center min-h-[120px] sm:min-h-[140px] hover:shadow-md"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 group-hover:bg-black group-hover:text-white text-black flex items-center justify-center transition-colors mb-2 sm:mb-3">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-black group-hover:text-neutral-700 transition-colors leading-tight">
                        {cat.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{cat.count}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Live Interactive Property Discovery with Search and Filters */}
      <div id="properties-section" className="py-10 sm:py-14 bg-white">
        <HomeLiveListings initialProperties={allProperties} />
      </div>

      {/* 5. Trust & Quality Standards */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 border-t border-neutral-100">
        <ScrollReveal direction="up" delay={50}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start mb-12 sm:mb-16">
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-2">
                Our Advisory Standard
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-black tracking-tight leading-tight">
                Built on verified titles and transparent execution
              </h3>
            </div>
            <div className="lg:col-span-6 lg:pt-3">
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-lg">
                Navi Mumbai real estate requires rigorous legal verification. We curate developer and private inventory with 100% MahaRERA documentation, clear chain of titles, and zero buyer commission on direct builder launches.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(settings.why_choose_us as any[] || []).map((card, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 hover:bg-neutral-50 transition-colors card-interactive"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center mb-4 text-black">
                  {getIcon(card.icon)}
                </div>
                <h4 className="text-base font-medium text-black mb-1.5 tracking-tight">{card.title}</h4>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 6. Founder & Principal Broker Section (Standout, Prestigious, Executive Advisory) */}
      <section className="py-20 sm:py-28 bg-[#0c0d10] text-white border-y border-neutral-800/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Founder Portrait with Executive Presentation */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <ScrollReveal direction="left" delay={40}>
                <div className="relative w-full max-w-[320px] sm:max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-700/80 bg-neutral-900 shadow-2xl group">
                  <Image
                    src={settings.broker_photo_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                    alt={settings.broker_name || 'Rajesh Sharma'}
                    fill
                    sizes="(max-width: 768px) 320px, 420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Floating Verified Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[11px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>MahaRERA: {(settings.rera_number || 'A52000012345').replace(/^MahaRERA:?\s*/i, '')}</span>
                  </div>

                  {/* Bottom Overlay Identity */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest block mb-0.5">
                      Founder & Principal Advisor
                    </span>
                    <h4 className="text-xl sm:text-2xl font-normal tracking-tight text-white">
                      {settings.broker_name}
                    </h4>
                    <p className="text-xs text-neutral-300 font-light mt-0.5">
                      14+ Years Dedicated Panvel & Kharghar Corridor
                    </p>
                  </div>
                </div>

                {/* Direct Guarantee Tag */}
                <div className="hidden sm:flex items-center gap-2 mt-4 text-xs text-neutral-400 font-light">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero Buyer Brokerage Guaranteed on Developer Launches</span>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Authoritative Personal Philosophy & Standout Proof */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal direction="right" delay={80}>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-2">
                    Who You Work With
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
                    Direct founder advisory.<br />
                  <span className="text-neutral-400">No telemarketers. No junior agents.</span>
                </h3>
              </div>

              {/* Personal Statement Quote */}
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed border-l-2 border-white/30 pl-4 py-1 italic">
                “When you acquire a home in Navi Mumbai, you are committing a lifetime of savings. I personally scrutinize every title deed, accompany you on site visits in my private AC cab, and negotiate developer pricing directly for you.”
              </p>

              {/* 3 Standout High-Confidence Numbers */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1">
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-center sm:text-left">
                  <span className="text-xl sm:text-3xl font-light text-white block tracking-tight">14+</span>
                  <span className="text-[10px] sm:text-[11px] text-neutral-400 font-light mt-0.5 block leading-tight">Years Local Advisory</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-center sm:text-left">
                  <span className="text-xl sm:text-3xl font-light text-white block tracking-tight">1,200+</span>
                  <span className="text-[10px] sm:text-[11px] text-neutral-400 font-light mt-0.5 block leading-tight">Families Housed</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-center sm:text-left">
                  <span className="text-xl sm:text-3xl font-light text-white block tracking-tight">0%</span>
                  <span className="text-[10px] sm:text-[11px] text-neutral-400 font-light mt-0.5 block leading-tight">Buyer Commission</span>
                </div>
              </div>

              {/* Micro-markets covered */}
              <div className="pt-1">
                <span className="text-[11px] uppercase font-medium tracking-wider text-neutral-400 block mb-2">
                  Specialized Micro-Markets
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {settings.areas_served.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 rounded-full bg-white/5 text-neutral-300 text-xs font-light border border-white/10 hover:border-white/30 transition-colors"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <WhatsAppButton
                    phone={settings.whatsapp_number}
                    size="lg"
                    label="Consult Directly with Rajesh"
                    customMessage={`Hi ${settings.broker_name}, I would like to consult with you directly regarding verified properties in Navi Mumbai.`}
                    className="justify-center"
                  />
                  <a
                    href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 hover:border-white text-white font-medium text-xs uppercase tracking-wider transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call {settings.phone_number}</span>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Client Experiences */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 border-t border-neutral-100">
        <ScrollReveal direction="up" delay={40}>
          <div className="max-w-2xl mb-10 sm:mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-2">
              Client Testimonials
            </span>
            <h3 className="text-2xl sm:text-4xl font-normal text-black tracking-tight">
              Trusted by 1,200+ Homeowners & Investors
            </h3>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <ScrollReveal key={t.id} direction="up" delay={idx * 100}>
              <div
                className="p-5 sm:p-7 rounded-2xl border border-neutral-200/80 bg-neutral-50/40 flex flex-col justify-between space-y-5 card-interactive h-full"
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
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 8. Direct Private Consultation & Concierge */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <ScrollReveal direction="up" delay={50}>
            <div className="bg-neutral-50/70 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 border border-neutral-200/90 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-black text-xs font-medium tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>VIP Buyer Advisory</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-black tracking-tight leading-tight">
                    Looking for a verified home in Navi Mumbai?
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-xl">
                    Skip the clunky forms and automated bots. Connect directly with our principal broker on WhatsApp for handpicked off-market inventory, transparent carpet prices, and accompanied AC cab visits with zero buyer commission.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700 font-light">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Complimentary AC cab site visit from your doorstep or station</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700 font-light">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Bank loan pre-approval through SBI, HDFC & ICICI</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700 font-light">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% legal title verification by our in-house advocate</span>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp & Call Action Box */}
                <div className="lg:col-span-5 bg-neutral-950 text-white rounded-2xl p-6 sm:p-8 space-y-5">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 block mb-1">
                      Direct Contact Channel
                    </span>
                    <h4 className="text-lg sm:text-xl font-normal text-white tracking-tight">
                      Instant Advisory Access
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 font-light">
                      Direct response within 15 minutes • No spam guarantee
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    <WhatsAppButton
                      phone={settings.whatsapp_number}
                      size="lg"
                      label="Chat on WhatsApp"
                      className="w-full justify-center"
                      customMessage="Hi Rajesh, I am looking for a verified home in Navi Mumbai. Please share curated options."
                    />

                    <a
                      href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                      className="w-full py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-white/20"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Direct: {settings.phone_number}</span>
                    </a>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 font-light flex items-center justify-between">
                    <span>MahaRERA: {settings.rera_number}</span>
                    <span>Panvel & Kharghar</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
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
