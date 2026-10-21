import React from 'react'
import { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, ShieldCheck, Car, Building2 } from 'lucide-react'
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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar settings={settings} />

      <div className="pt-28 pb-14 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-2">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            We Are Always Here For You
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Walk into our Old Panvel advisory office or request a doorstep AC cab pickup for your property tour.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Office Details & Map */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
                <MapPin className="w-6 h-6 text-sky-600 mb-1" />
                <h3 className="text-sm font-bold text-slate-900">Head Office</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {settings.office_address}
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
                <Clock className="w-6 h-6 text-sky-600 mb-1" />
                <h3 className="text-sm font-bold text-slate-900">Working Hours</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Monday to Sunday: 9:30 AM – 8:00 PM<br />
                  (Site visits scheduled 7 days a week)
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
                <Phone className="w-6 h-6 text-sky-600 mb-1" />
                <h3 className="text-sm font-bold text-slate-900">Phone Support</h3>
                <p className="text-xs text-slate-600">
                  <a href={`tel:${settings.phone_number}`} className="font-semibold text-sky-600 hover:underline">
                    {settings.phone_number}
                  </a>
                </p>
                <p className="text-[11px] text-slate-400">Direct line to Senior Broker</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
                <Mail className="w-6 h-6 text-sky-600 mb-1" />
                <h3 className="text-sm font-bold text-slate-900">Email Enquiries</h3>
                <p className="text-xs text-slate-600">
                  <a href={`mailto:${settings.email}`} className="font-semibold text-sky-600 hover:underline">
                    {settings.email}
                  </a>
                </p>
                <p className="text-[11px] text-slate-400">Response within 2 hours</p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-900">Find Us On Google Maps</span>
                <span className="text-[11px] text-slate-500">Panvel Sector 15</span>
              </div>
              <div className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6690466606013!2d73.111816!3d18.989785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e84f67c54159%3A0xb366b5791fe93077!2sPanvel%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Apex Realty Panvel Office Map"
                />
              </div>
            </div>

            {/* Free Cab Site Visit Banner */}
            <div className="p-6 bg-gradient-to-r from-sky-900 to-slate-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Car className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Need Free Cab Pickup For Site Visits?</h4>
                  <p className="text-xs text-slate-300">Available from Panvel, Kharghar, or Khandeshwar station.</p>
                </div>
              </div>
              <WhatsAppButton
                phone={settings.whatsapp_number}
                size="sm"
                label="Request Pickup on WhatsApp"
              />
            </div>
          </div>

          {/* Direct Concierge Desk (Zero Forms) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/90 shadow-sm space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-2">
                Fast-Track Channel
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-black tracking-tight">
                Direct Principal Broker Access
              </h3>
              <p className="text-sm text-neutral-600 font-light mt-2 leading-relaxed">
                We respect your time and privacy. No lengthy web forms, no telemarketers. Connect directly with Rajesh Sharma on WhatsApp or call now.
              </p>
            </div>

            <div className="space-y-4">
              <WhatsAppButton
                phone={settings.whatsapp_number}
                size="lg"
                label="Open WhatsApp Chat"
                className="w-full justify-center"
                customMessage="Hi Rajesh, I would like to schedule a property consultation."
              />

              <a
                href={`tel:${settings.phone_number.replace(/\s+/g, '')}`}
                className="w-full py-4 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2.5 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call {settings.phone_number}</span>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="w-full py-3.5 px-6 rounded-xl border border-neutral-300 hover:border-black text-black text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email {settings.email}</span>
              </a>
            </div>

            <div className="pt-6 border-t border-neutral-100 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-neutral-600 font-light">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>MahaRERA: {settings.rera_number} (100% verified agency)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-600 font-light">
                <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Working Hours: Mon – Sun, 9:00 AM – 8:30 PM</span>
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
