import React from 'react'
import Link from 'next/link'
import { Building2, Phone, Mail, MapPin, ShieldCheck, MessageCircle, ExternalLink } from 'lucide-react'
import { SiteSettings } from '@/types'
import { WhatsAppButton } from './WhatsAppButton'

interface FooterProps {
  settings?: SiteSettings
}

export function Footer({ settings }: FooterProps) {
  const brandName = settings?.brand_name || 'Apex Realty Panvel'
  const reraNumber = settings?.rera_number || 'MahaRERA Reg No: A52000012345'
  const address = settings?.office_address || 'Shop 12, Ground Floor, Orion Plaza, Sector 15, Old Panvel, Navi Mumbai - 410206'
  const phone = settings?.phone_number || '+91 98201 23456'
  const email = settings?.email || 'contact@apexrealty.in'
  const whatsappNumber = settings?.whatsapp_number || '+91 98201 23456'
  const disclaimer = settings?.footer_disclaimer || 'Disclaimer: Apex Realty is a registered real estate advisory and marketing agency under MahaRERA. Project specifications, layouts, and pricing are subject to builder verification. All rights reserved.'

  const areas = settings?.areas_served || [
    'Panvel',
    'Kharghar',
    'Kamothe',
    'Taloja',
    'New Panvel',
    'Seawoods',
    'CBD Belapur',
    'Ulwe',
    'Kalamboli',
  ]

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800/80">
          {/* Brand Info & RERA (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight block">
                  {brandName}
                </span>
                <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-widest block">
                  Navi Mumbai Advisory
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Navi Mumbai’s trusted boutique real estate advisory. Curated inventory across Panvel, Kharghar, Taloja, Kamothe, and Seawoods with 100% legal clarity and zero buyer brokerage on developer launches.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{reraNumber}</span>
            </div>

            {/* Direct WhatsApp CTA in Footer */}
            <div className="pt-2">
              <WhatsAppButton
                phone={whatsappNumber}
                size="sm"
                label="Direct WhatsApp Consultation"
                className="w-full sm:w-auto"
              />
            </div>
          </div>

          {/* Popular Locations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest">
              Areas Served
            </h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {areas.map((area) => (
                <Link
                  key={area}
                  href={`/properties?locality=${encodeURIComponent(area)}`}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs border border-neutral-800 transition-colors"
                >
                  {area}
                </Link>
              ))}
            </div>
            <p className="text-[11px] text-neutral-500 pt-2">
              All properties accompanied by local area specialists with doorstep site visits.
            </p>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/buy" className="hover:text-white transition-colors">
                  Buy Flats & Plots
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-white transition-colors">
                  Rental Residences
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Agency
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Office
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest">
              Office & Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mb-2 font-semibold">
                Follow Updates
              </span>
              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <span>•</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <span>•</span>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 space-y-4 text-center md:text-left">
          <p className="text-[11px] text-neutral-500 leading-relaxed max-w-5xl">
            {disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 pt-4 border-t border-neutral-900 gap-2">
            <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-neutral-300 transition-colors">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-neutral-300 transition-colors">
                Terms
              </Link>
              <span>•</span>
              <Link href="/admin" className="hover:text-white transition-colors">
                Broker Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
