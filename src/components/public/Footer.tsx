import React from 'react'
import Link from 'next/link'
import { Building2, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react'
import { SiteSettings } from '@/types'

interface FooterProps {
  settings?: SiteSettings
}

export function Footer({ settings }: FooterProps) {
  const brandName = settings?.brand_name || 'Apex Realty Panvel'
  const reraNumber = settings?.rera_number || 'MahaRERA Reg No: A52000012345'
  const address = settings?.office_address || 'Shop 12, Ground Floor, Orion Plaza, Sector 15, Old Panvel, Navi Mumbai - 410206'
  const phone = settings?.phone_number || '+91 98201 23456'
  const email = settings?.email || 'contact@apexrealty.in'
  const disclaimer = settings?.footer_disclaimer || 'Disclaimer: Apex Realty is an authorized marketing partner for registered builders under MahaRERA. Project images, specifications and pricing are subject to revision as per developer guidelines.'

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight block">
                  {brandName}
                </span>
                <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider block">
                  Navi Mumbai Advisory
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Navi Mumbai’s trusted boutique real estate advisory. Curated inventory across Panvel, Kharghar, Taloja, Kamothe, and Seawoods with 100% legal clarity.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{reraNumber}</span>
            </div>
          </div>

          {/* Popular Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Popular Locations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/properties?locality=Kharghar" className="hover:text-sky-400 transition-colors">
                  Properties in Kharghar
                </Link>
              </li>
              <li>
                <Link href="/properties?locality=Panvel" className="hover:text-sky-400 transition-colors">
                  Flats in Panvel & New Panvel
                </Link>
              </li>
              <li>
                <Link href="/properties?locality=Kamothe" className="hover:text-sky-400 transition-colors">
                  Apartments in Kamothe
                </Link>
              </li>
              <li>
                <Link href="/properties?locality=Taloja" className="hover:text-sky-400 transition-colors">
                  Affordable Homes in Taloja
                </Link>
              </li>
              <li>
                <Link href="/properties?locality=Seawoods" className="hover:text-sky-400 transition-colors">
                  Sea Facing Flats in Seawoods
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/properties?listing_type=sale" className="hover:text-sky-400 transition-colors">
                  Buy Flats & Penthouses
                </Link>
              </li>
              <li>
                <Link href="/properties?listing_type=rent" className="hover:text-sky-400 transition-colors">
                  Rental Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sky-400 transition-colors">
                  About Our Team & RERA
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-colors">
                  Schedule Free AC Site Visit
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-sky-400 transition-colors">
                  Broker Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Office & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 space-y-4 text-center md:text-left">
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-4xl">
            {disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-900 gap-2">
            <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Powered by <span className="font-semibold text-slate-300">PropertyLink</span> • White-Label Real Estate OS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
