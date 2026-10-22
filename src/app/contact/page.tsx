import React from 'react'
import { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, ShieldCheck, Car, Building2, MessageCircle } from 'lucide-react'
import { getSiteSettings } from '@/lib/data/store'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Contact Apex Realty | Panvel Office & Site Visit Booking',
  description: 'Visit our office in Orion Plaza Panvel or schedule a free AC site visit across Kharghar, Kamothe, and Taloja.',
}

export default function ContactPage() {
  const settings = getSiteSettings()

  return (
    <div className="min-h-screen flex flex-col bg-white text-black selection:bg-black/10 selection:text-black">
      <Navbar settings={settings} />

      {/* Hero Header */}
      <div className="pt-28 pb-16 bg-black text-white border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-3">
            Concierge & Advisory Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-white tracking-tight">
            Direct Principal Broker Access
          </h1>
          <p className="text-sm text-neutral-400 font-light mt-3 leading-relaxed">
            Visit our Panvel advisory office or request a complimentary doorstep AC cab pickup for your property tour.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 w-full space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Office Details & Map (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-neutral-50/70 p-6 rounded-2xl border border-neutral-200/90 space-y-2">
                <MapPin className="w-5 h-5 text-black mb-1" />
                <h3 className="text-sm font-medium text-black">Advisory Office</h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {settings.office_address}
                </p>
              </div>

              <div className="bg-neutral-50/70 p-6 rounded-2xl border border-neutral-200/90 space-y-2">
                <Clock className="w-5 h-5 text-black mb-1" />
                <h3 className="text-sm font-medium text-black">Advisory Hours</h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Monday to Sunday: 9:30 AM – 8:00 PM<br />
                  (Site visits scheduled 7 days a week)
                </p>
              </div>

              <div className="bg-neutral-50/70 p-6 rounded-2xl border border-neutral-200/90 space-y-2">
                <Phone className="w-5 h-5 text-black mb-1" />
                <h3 className="text-sm font-medium text-black">Telephone</h3>
                <p className="text-xs text-neutral-600">
                  <a href={`tel:${settings.phone_number.replace(/\s+/g, '')}`} className="font-semibold text-black hover:underline">
                    {settings.phone_number}
                  </a>
                </p>
                <p className="text-[11px] text-neutral-400 font-light">Direct line to Principal Broker</p>
              </div>

              <div className="bg-neutral-50/70 p-6 rounded-2xl border border-neutral-200/90 space-y-2">
                <Mail className="w-5 h-5 text-black mb-1" />
                <h3 className="text-sm font-medium text-black">Email Advisory</h3>
                <p className="text-xs text-neutral-600">
                  <a href={`mailto:${settings.email}`} className="font-semibold text-black hover:underline">
                    {settings.email}
                  </a>
                </p>
                <p className="text-[11px] text-neutral-400 font-light">Response within 2 hours</p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-neutral-50/70 rounded-2xl border border-neutral-200/90 p-4 space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-medium text-black">Office Location & Directions</span>
                <span className="text-[11px] text-neutral-500 font-light">Panvel Sector 15</span>
              </div>
              <div className="relative aspect-[16/8] w-full rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6690466606013!2d73.111816!3d18.989785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e84f67c54159%3A0xb366b5791fe93077!2sPanvel%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Apex Realty Panvel Office Map"
                />
              </div>
            </div>

            {/* Free Cab Site Visit Banner */}
            <div className="p-7 bg-black rounded-2xl text-white border border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-white">Complimentary AC Cab Site Visit</h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    Available from Panvel, Kharghar, or Khandeshwar station directly to projects.
                  </p>
                </div>
              </div>
              <WhatsAppButton
                phone={settings.whatsapp_number}
                size="sm"
                label="Book AC Cab Visit"
                customMessage="Hi Rajesh, I would like to schedule a complimentary AC cab site visit in Navi Mumbai."
              />
            </div>
          </div>

          {/* Direct Concierge Desk (5 cols - Zero Forms) */}
          <div className="lg:col-span-5 bg-neutral-50/70 rounded-2xl p-8 sm:p-10 border border-neutral-200/90 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-2">
                Fast-Track Channel
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-black tracking-tight">
                Instant Advisory Consultation
              </h3>
              <p className="text-sm text-neutral-600 font-light mt-2 leading-relaxed">
                We respect your time and privacy. Zero automated bots, no telemarketers. Connect directly with Rajesh Sharma on WhatsApp or call now.
              </p>
            </div>

            <div className="space-y-3">
              <WhatsAppButton
                phone={settings.whatsapp_number}
                size="lg"
                label="Open WhatsApp Chat"
                className="w-full justify-center"
                customMessage="Hi Rajesh, I would like to schedule a property consultation."
              />

              <a
                href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                className="w-full py-3.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {settings.phone_number}</span>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="w-full py-3.5 px-6 rounded-xl border border-neutral-300 hover:border-black text-black text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email Direct</span>
              </a>
            </div>

            <div className="pt-6 border-t border-neutral-200/80 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-neutral-600 font-light">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>MahaRERA: {settings.rera_number} (100% verified advisory)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-600 font-light">
                <Building2 className="w-4 h-4 text-black shrink-0" />
                <span>Sector 15, Panvel & Kharghar Micro-Markets</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WhatsAppButton phone={settings.whatsapp_number} variant="floating" />
      <Footer settings={settings} />
    </div>
  )
}
