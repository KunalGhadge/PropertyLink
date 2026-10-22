import React from 'react'
import Link from 'next/link'
import { Building2, Phone, Mail, MapPin, ShieldCheck, MessageCircle, ExternalLink } from 'lucide-react'
import { SiteSettings } from '@/types'
import { WhatsAppButton } from './WhatsAppButton'

interface FooterProps {
  settings?: SiteSettings
}

export function Footer({ settings }: FooterProps) {
  const brandName = settings?.brand_name || 'Apex Realty'
  const reraNumber = settings?.rera_number || 'MahaRERA: A52000012345'
  const address = settings?.office_address || 'Orion Plaza, Sector 15, Old Panvel, Navi Mumbai'
  const phone = settings?.phone_number || '+91 98201 23456'
  const email = settings?.email || 'contact@apexrealty.in'
  const whatsappNumber = settings?.whatsapp_number || '+91 98201 23456'

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 lg:py-16">
        {/* Main Grid: Brand + Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-neutral-900">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-lg font-semibold tracking-tight text-white uppercase block">
                {brandName}
              </span>
            </Link>
            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-sm">
              Navi Mumbai boutique real estate advisory. Curated residential and commercial inventory across Panvel, Kharghar & Seawoods with zero buyer brokerage on developer launches.
            </p>
            <div className="pt-1 text-[11px] text-neutral-500 font-medium">
              <span>{reraNumber}</span> • <span>Panvel & Kharghar</span>
            </div>
          </div>

          {/* Quick Links (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Inventory */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-semibold text-white uppercase tracking-wider">
                Inventory
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/properties" className="hover:text-white transition-colors">
                    All Properties
                  </Link>
                </li>
                <li>
                  <Link href="/buy" className="hover:text-white transition-colors">
                    Buy Residences
                  </Link>
                </li>
                <li>
                  <Link href="/rent" className="hover:text-white transition-colors">
                    Rental Homes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Advisory */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-semibold text-white uppercase tracking-wider">
                Advisory
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Our Agency
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Office Location
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

            {/* Direct Connect */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="text-[11px] font-semibold text-white uppercase tracking-wider">
                Direct Contact
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi Rajesh, I would like to inquire about properties in Navi Mumbai.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Chat
                  </a>
                </li>
                <li className="text-neutral-500 text-[11px] leading-tight pt-1">
                  {address}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean, Minimalist Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500 font-light">
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
            <Link href="/admin" className="hover:text-neutral-300 transition-colors">
              Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
