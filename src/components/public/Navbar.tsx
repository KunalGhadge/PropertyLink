'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, MessageCircle, Menu, X, Shield, Building2 } from 'lucide-react'
import { SiteSettings } from '@/types'
import { WhatsAppButton } from './WhatsAppButton'

interface NavbarProps {
  settings?: SiteSettings
}

export function Navbar({ settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const brandName = settings?.brand_name || 'Apex Realty Panvel'
  const phoneNumber = settings?.phone_number || '+91 98201 23456'
  const whatsappNumber = settings?.whatsapp_number || '+91 98201 23456'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.08)] py-3 border-b border-slate-200/80'
          : 'bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1c222c] to-[#0c0f14] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shadow-md group-hover:scale-105 transition-all">
              <Building2 className="w-5 h-5 text-[#c5a059]" />
            </div>
            <div>
              <span
                className={`text-lg sm:text-xl font-serif font-bold tracking-tight block leading-tight ${
                  isScrolled ? 'text-[#0c0f14]' : 'text-white'
                }`}
              >
                {brandName}
              </span>
              <span
                className={`text-[10px] uppercase font-bold tracking-widest block -mt-0.5 ${
                  isScrolled ? 'text-[#b38b42]' : 'text-[#dfba73]'
                }`}
              >
                Panvel & Navi Mumbai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links: Properties, Buy, Rent, About, Contact */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="/properties"
              className={`text-sm font-semibold transition-colors hover:text-[#b38b42] ${
                isScrolled ? 'text-[#161a22]' : 'text-slate-100'
              }`}
            >
              Properties
            </Link>
            <Link
              href="/buy"
              className={`text-sm font-semibold transition-colors hover:text-[#b38b42] ${
                isScrolled ? 'text-[#161a22]' : 'text-slate-100'
              }`}
            >
              Buy
            </Link>
            <Link
              href="/rent"
              className={`text-sm font-semibold transition-colors hover:text-[#b38b42] ${
                isScrolled ? 'text-[#161a22]' : 'text-slate-100'
              }`}
            >
              Rent
            </Link>
            <Link
              href="/about"
              className={`text-sm font-semibold transition-colors hover:text-[#b38b42] ${
                isScrolled ? 'text-[#161a22]' : 'text-slate-100'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-semibold transition-colors hover:text-[#b38b42] ${
                isScrolled ? 'text-[#161a22]' : 'text-slate-100'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action CTAs: Call & WhatsApp */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                isScrolled
                  ? 'border-[#e8e2d5] text-[#0c0f14] hover:bg-[#f5f1e9]'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#b38b42]" />
              <span>Call Broker</span>
            </a>

            <WhatsAppButton
              phone={whatsappNumber}
              size="sm"
              label="WhatsApp"
              className="shadow-sm"
            />

            <Link
              href="/admin"
              className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors ml-1 ${
                isScrolled ? 'text-stone-500 hover:text-stone-900' : 'text-stone-400 hover:text-white'
              }`}
              title="Broker Portal Login"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <WhatsAppButton phone={whatsappNumber} size="sm" variant="icon" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl ${
                isScrolled ? 'text-[#0c0f14] hover:bg-[#f5f1e9]' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fdfbf7] text-[#0c0f14] border-b border-[#e8e2d5] px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-[#0c0f14] hover:text-[#b38b42] py-1 border-b border-stone-200/50"
            >
              Explore Properties
            </Link>
            <Link
              href="/buy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-[#0c0f14] hover:text-[#b38b42] py-1 border-b border-stone-200/50"
            >
              Buy Homes & Plots
            </Link>
            <Link
              href="/rent"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-[#0c0f14] hover:text-[#b38b42] py-1 border-b border-stone-200/50"
            >
              Rent Verified Properties
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-[#0c0f14] hover:text-[#b38b42] py-1 border-b border-stone-200/50"
            >
              About Broker & MahaRERA
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-[#0c0f14] hover:text-[#b38b42] py-1"
            >
              Contact & Office Address
            </Link>
          </nav>

          <div className="pt-4 border-t border-[#e8e2d5] space-y-2.5">
            <a
              href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-[#e8e2d5] text-[#0c0f14] font-bold text-sm shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#b38b42]" />
              <span>Call Broker: {phoneNumber}</span>
            </a>

            <WhatsAppButton
              phone={whatsappNumber}
              size="md"
              label="Chat on WhatsApp"
              className="w-full justify-center"
            />

            <div className="pt-2 text-center">
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800"
              >
                Broker Admin Portal →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
