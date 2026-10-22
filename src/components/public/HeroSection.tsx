'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react'
import { SiteSettings } from '@/types'
import { AnimatedHeading } from './AnimatedHeading'
import { FadeIn } from './FadeIn'

interface HeroSectionProps {
  settings?: SiteSettings
}

export function HeroSection({ settings }: HeroSectionProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const whatsappNumber = (settings?.whatsapp_number || '+91 98201 23456').replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Rajesh, I would like to explore verified residential and commercial properties in Navi Mumbai.'
  )}`

  const handleStartChat = () => {
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="relative w-full h-[100dvh] min-h-[560px] flex flex-col justify-between overflow-hidden bg-black text-white">
      {/* 1. Full-screen Video Background */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle bottom vignette for text contrast without hiding the video */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30 pointer-events-none" />

      {/* 2. Top Navigation Bar (Clean & Uncluttered) */}
      <div className="relative z-30 w-full px-4 sm:px-8 md:px-12 lg:px-16 pt-4 sm:pt-6">
        <nav className="liquid-glass rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border border-white/15 shadow-lg">
          {/* Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white text-black font-extrabold flex items-center justify-center text-xs tracking-tight shadow-sm shrink-0">
              PL
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-white block">
              Apex Realty Panvel
            </span>
          </Link>

          {/* Desktop Links (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wider">
            <Link href="/properties" className="text-white/80 hover:text-white transition-colors">
              Properties
            </Link>
            <Link href="/buy" className="text-white/80 hover:text-white transition-colors">
              Buy
            </Link>
            <Link href="/rent" className="text-white/80 hover:text-white transition-colors">
              Rent
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Action: Desktop only WhatsApp button; Mobile clean hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartChat}
              className="hidden sm:inline-flex bg-white text-black px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-sm items-center gap-1.5 active:scale-98"
            >
              <MessageCircle className="w-3.5 h-3.5 text-black" />
              <span>WhatsApp</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 liquid-glass rounded-2xl p-4 border border-white/20 space-y-2.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link
                href="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                All Properties
              </Link>
              <Link
                href="/buy"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Buy Homes
              </Link>
              <Link
                href="/rent"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Rentals
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                About Broker
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-center"
              >
                Contact & Office
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 3. Hero Content (Spacious, Breathable & Editorial) */}
      <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-16 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-2xl sm:max-w-3xl space-y-3 sm:space-y-4">
          {/* Architectural Luxury Headline */}
          <AnimatedHeading
            text={'Curated Luxury Homes\nin Navi Mumbai.'}
            className="text-3xl sm:text-5xl md:text-6xl font-light text-white leading-[1.12] tracking-tight"
          />

          {/* Crisp, Breathable Subheading */}
          <FadeIn delay={400} duration={700}>
            <p className="text-xs sm:text-base text-neutral-300 font-light leading-relaxed max-w-lg">
              MahaRERA-verified residences & direct builder pricing across Panvel, Kharghar & Seawoods. Zero buyer brokerage.
            </p>
          </FadeIn>

          {/* Compact, Non-Congested Action Row (Side-by-side on both mobile & desktop) */}
          <FadeIn delay={600} duration={700}>
            <div className="pt-2 flex items-center gap-3 w-full sm:w-auto">
              <a
                href="#properties-section"
                className="flex-1 sm:flex-initial px-6 sm:px-8 py-3 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-1.5 shadow-xl hover:scale-[1.02] active:scale-98"
              >
                <span>Explore Inventory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleStartChat}
                className="flex-1 sm:flex-initial px-6 sm:px-7 py-3 rounded-xl liquid-glass border border-white/25 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
