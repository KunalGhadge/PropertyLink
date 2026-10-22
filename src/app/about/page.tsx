import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Award, Users, CheckCircle2, MapPin, Phone, Mail, Building2, Sparkles, ArrowRight, MessageCircle } from 'lucide-react'
import { getSiteSettings, getAgents } from '@/lib/data/store'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'

export const metadata: Metadata = {
  title: 'About Apex Realty | Panvel & Navi Mumbai Real Estate Advisory',
  description:
    '14+ years of trust in Navi Mumbai real estate. Over 1,200 satisfied homebuyers. MahaRERA registered: A52000012345.',
}

export default function AboutPage() {
  const settings = getSiteSettings()
  const agents = getAgents()

  return (
    <div className="min-h-screen flex flex-col bg-white text-black selection:bg-black/10 selection:text-black">
      <Navbar settings={settings} />

      {/* Hero Header */}
      <div className="pt-28 pb-16 sm:pb-20 bg-black text-white border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-light mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>MahaRERA: {settings.rera_number}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
            14+ Years of Curated Property Advisory
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed max-w-2xl mx-auto font-light">
            We are not transactional brokers. We are your dedicated property advisors in Panvel and Navi Mumbai, committed to absolute legal transparency, clear titles, and zero buyer brokerage on developer launches.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 sm:py-20 w-full space-y-20">
        {/* Founder Story Section */}
        <section className="bg-neutral-50/70 rounded-3xl border border-neutral-200/90 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Founder Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
                <Image
                  src={settings.broker_photo_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                  alt={settings.broker_name || 'Founder'}
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Founder Message & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-1">
                  Message from our Founder
                </span>
                <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-tight">
                  {settings.broker_name}
                </h2>
                <p className="text-xs text-neutral-500 font-light mt-1">
                  {settings.broker_designation} • 14+ Years Panvel & Navi Mumbai Corridor
                </p>
              </div>

              <div className="space-y-4 text-sm text-neutral-600 font-light leading-relaxed">
                <p>
                  “When I founded Apex Realty 14 years ago, buying property in Panvel was convoluted and rife with speculative promises. I believed that home seekers deserved honest, transparent advice with full legal verification before paying a single rupee token.”
                </p>
                <p>
                  “Today, anchored by the Navi Mumbai International Airport (NMIA), the Atal Setu (MTHL), and the expanding Metro corridors, this region has become India’s most promising real estate destination. My team and I remain relentlessly dedicated to protecting your capital and helping you acquire residences that build generational wealth.”
                </p>
              </div>

              {/* 3 Proof Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200/80">
                  <span className="text-base font-semibold text-black block tracking-tight">1,200+</span>
                  <span className="text-[11px] text-neutral-500 font-light">Homes Handed Over</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200/80">
                  <span className="text-base font-semibold text-black block tracking-tight">0% Disputes</span>
                  <span className="text-[11px] text-neutral-500 font-light">Clean Title Record</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200/80">
                  <span className="text-base font-semibold text-black block tracking-tight">Direct Tier-1</span>
                  <span className="text-[11px] text-neutral-500 font-light">Builder Launches</span>
                </div>
              </div>

              {/* Founder Contact Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <WhatsAppButton
                  phone={settings.whatsapp_number}
                  size="md"
                  label="Direct WhatsApp with Rajesh"
                  customMessage={`Hi ${settings.broker_name}, I would like to consult with you directly regarding properties in Navi Mumbai.`}
                />
                <a
                  href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-neutral-300 hover:border-black text-black font-medium text-xs uppercase tracking-wider transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {settings.phone_number}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Core Guiding Principles */}
        <section className="space-y-10">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-2">
              Advisory Standards
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-tight">
              Our Core Guiding Principles
            </h2>
            <p className="text-sm text-neutral-500 font-light mt-1">
              Why hundreds of NRI, corporate, and local families choose our boutique firm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white rounded-2xl border border-neutral-200/90 hover:border-black transition-all space-y-4">
              <span className="font-mono text-xs text-neutral-400 tracking-widest block uppercase">
                01 / Legal Rigor
              </span>
              <h3 className="text-lg font-medium text-black tracking-tight">MahaRERA Audited Inventory</h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                We never promote unverified or non-RERA registered projects. Every floor plan, possession timeline, and carpet area is audited against the state registry before being showcased.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-neutral-200/90 hover:border-black transition-all space-y-4">
              <span className="font-mono text-xs text-neutral-400 tracking-widest block uppercase">
                02 / Commission Free
              </span>
              <h3 className="text-lg font-medium text-black tracking-tight">Zero Buyer Brokerage</h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                On all new launches and developer-direct residences, buyers pay zero commission. Our consultation, paperwork verification, and bank loan sanction services are completely free for home seekers.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-neutral-200/90 hover:border-black transition-all space-y-4">
              <span className="font-mono text-xs text-neutral-400 tracking-widest block uppercase">
                03 / Concierge Tour
              </span>
              <h3 className="text-lg font-medium text-black tracking-tight">Accompanied AC Cab Visits</h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                No meeting strangers at random street corners. We offer complimentary AC cab pickup from your residence or the nearest transit hub with a dedicated neighborhood specialist.
              </p>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section className="space-y-10">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-2">
              Boutique Team
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-tight">
              Meet Our Property Specialists
            </h2>
            <p className="text-sm text-neutral-500 font-light mt-1">
              Local neighborhood consultants living and working in Navi Mumbai.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-2xl border border-neutral-200/90 p-7 text-center space-y-4 hover:border-black transition-all"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto bg-neutral-100 border border-neutral-200">
                  <Image
                    src={agent.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'}
                    alt={agent.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-medium text-black">{agent.name}</h3>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">{agent.designation}</p>
                  <p className="text-[11px] text-neutral-400 font-light mt-0.5">{agent.experience_years} Years Experience</p>
                </div>
                <div className="pt-1 flex flex-wrap justify-center gap-1.5">
                  {agent.specialization?.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-normal"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-center gap-2">
                  <WhatsAppButton
                    phone={agent.whatsapp_number || agent.phone}
                    size="sm"
                    label="WhatsApp"
                    className="px-4 py-2 text-xs"
                  />
                  <a
                    href={`tel:${agent.phone}`}
                    aria-label={`Call ${agent.name}`}
                    className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Private Consultation Banner */}
        <section className="bg-black text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-neutral-900">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block">
                Direct Principal Broker Access
              </span>
              <h3 className="text-2xl sm:text-4xl font-normal text-white tracking-tight">
                Request a Curated Navi Mumbai Portfolio
              </h3>
              <p className="text-sm text-neutral-400 font-light max-w-xl leading-relaxed">
                Share your configuration, budget, and possession requirements directly on WhatsApp. We provide off-market units, verified developer launches, and private AC cab site tours.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <WhatsAppButton
                phone={settings.whatsapp_number}
                size="lg"
                label="Direct WhatsApp Consultation"
                className="w-full justify-center"
                customMessage="Hi Rajesh, I would like to request a curated portfolio of properties in Navi Mumbai."
              />
              <a
                href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                className="w-full py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-white/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call {settings.phone_number}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton phone={settings.whatsapp_number} variant="floating" />
      <Footer settings={settings} />
    </div>
  )
}
