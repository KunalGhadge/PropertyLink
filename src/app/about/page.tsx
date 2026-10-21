import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/image'
import { ShieldCheck, Award, Users, CheckCircle2, MapPin, Phone, Mail, Building2 } from 'lucide-react'
import { getSiteSettings, getAgents } from '@/lib/data/store'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'

export const metadata: Metadata = {
  title: 'About Apex Realty | Panvel & Navi Mumbai Real Estate Advisory',
  description: '14+ years of trust in Navi Mumbai real estate. Over 1,200 satisfied homebuyers. MahaRERA registered: A52000012345.',
}

export default function AboutPage() {
  const settings = getSiteSettings()
  const agents = getAgents()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar settings={settings} />

      {/* Hero Header */}
      <div className="pt-28 pb-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-amber-300 text-xs font-bold mb-4 border border-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{settings.rera_number}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            14+ Years of Trust & Client-First Advisory
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            We are not just brokers — we are your local property partners in Panvel and Navi Mumbai, committed to absolute title transparency and zero buyer brokerage on developer inventory.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
        {/* Founder Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={settings.broker_photo_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                alt={settings.broker_name || 'Founder'}
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
                Message from our Founder
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {settings.broker_name}
              </h2>
              <p className="text-xs font-semibold text-slate-500">{settings.broker_designation} • 14 Years in Panvel</p>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              “When I started Apex Realty 14 years ago, buying property in Panvel was confusing and rife with vague promises. I believed that families deserved honest, transparent advice with full legal verification before paying a single rupee token.”
            </p>

            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              “Today, with the upcoming Navi Mumbai International Airport, Mumbai Trans Harbour Link (Atal Setu), and the Navi Mumbai Metro, this region is India’s most promising real estate corridor. My team and I remain dedicated to protecting your hard-earned savings and helping you make the right investment decision.”
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1,200+ Homes Handed Over</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Legal Disputes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Direct Builder Partner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our Guiding Principles</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Why hundreds of NRI, corporate, and local families choose us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">MahaRERA Rigor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We never promote unverified or non-RERA registered projects. Every floor plan, possession timeline, and carpet area is audited against the state portal.
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Commission for Buyers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                On all new launch and developer direct inventory, buyers pay 0% brokerage. Our services from site visit to bank loan sanction are 100% free for home buyers.
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Accompanied Site Visits</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No meeting strangers at random corners. We offer complimentary AC cab pickup from your residence or the nearest station with an experienced consultant.
              </p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Meet Our Property Advisors</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Local neighborhood experts living and working in Navi Mumbai.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 text-center space-y-4 shadow-sm"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto bg-slate-200 border-2 border-sky-400">
                  <Image
                    src={agent.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'}
                    alt={agent.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{agent.name}</h3>
                  <p className="text-xs text-sky-600 font-semibold">{agent.designation}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{agent.experience_years} Years Experience</p>
                </div>
                <div className="pt-2 flex flex-wrap justify-center gap-1.5">
                  {agent.specialization?.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2">
                  <WhatsAppButton phone={agent.whatsapp_number || agent.phone} size="sm" label="Chat" />
                  <a
                    href={`tel:${agent.phone}`}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <WhatsAppButton phone={settings.whatsapp_number} variant="floating" />
      <Footer settings={settings} />
    </div>
  )
}
