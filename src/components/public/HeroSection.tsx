'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react'
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
    <section className="relative w-full h-[100dvh] min-h-[580px] flex flex-col overflow-hidden bg-black text-white">
      {/* 1. Full-screen Video Background with clean architectural look */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient vignette at bottom so text is crystal clear */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

      {/* 2. Top Navbar Bar */}
      <div className="relative z-30 w-full px-4 sm:px-8 md:px-12 lg:px-16 pt-4 sm:pt-6">
        <nav className="liquid-glass rounded-xl px-4 py-2.5 flex items-center justify-between border border-white/20">
          {/* Left: Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-white text-black font-extrabold flex items-center justify-center text-xs tracking-tight shadow-sm shrink-0">
              PL
            </div>
            <span className="text-sm sm:text-base font-semibold tracking-tight text-white block">
              Apex Realty Panvel
            </span>
          </Link>

          {/* Center Links (hidden on mobile, visible md+) */}
          <div className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-wider">
            <Link
              href="/properties"
              className="text-white/80 hover:text-white transition-colors"
            >
              All Properties
            </Link>
            <Link
              href="/buy"
              className="text-white/80 hover:text-white transition-colors"
            >
              Buy Homes
            </Link>
            <Link
              href="/rent"
              className="text-white/80 hover:text-white transition-colors"
            >
              Rentals
            </Link>
            <Link
              href="/about"
              className="text-white/80 hover:text-white transition-colors"
            >
              About Broker
            </Link>
            <Link
              href="/contact"
              className="text-white/80 hover:text-white transition-colors"
            >
              Office
            </Link>
          </div>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartChat}
              className="bg-white text-black px-3.5 sm:px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-sm flex items-center gap-1.5 active:scale-98"
            >
              <MessageCircle className="w-3.5 h-3.5 text-black" />
              <span>WhatsApp</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 liquid-glass rounded-2xl p-4 border border-white/20 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link
                href="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                All 100+ Properties
              </Link>
              <Link
                href="/buy"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Buy Homes & Plots
              </Link>
              <Link
                href="/rent"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Verified Rentals
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Broker & MahaRERA
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-center"
              >
                Contact & Office Location
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 3. Hero Content (Relevant real estate message, perfectly responsive) */}
      <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-8 sm:pb-12 lg:pb-14 pointer-events-none">
        <div className="lg:grid lg:grid-cols-12 lg:items-end gap-6 sm:gap-8 w-full">
          {/* Left Column: Heading, Subheading & Action Buttons */}
          <div className="lg:col-span-8 pointer-events-auto max-w-3xl">
            {/* Word-grouped character animation prevents broken words */}
            <AnimatedHeading
              text={'Curated Luxury Homes\nin Navi Mumbai.'}
              className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-normal mb-3 sm:mb-4 text-white leading-[1.1] sm:leading-[1.12]"
            />

            {/* Subheading: Real estate focused */}
            <FadeIn delay={600} duration={800}>
              <p className="text-xs sm:text-base md:text-lg text-neutral-200 mb-4 sm:mb-6 leading-relaxed font-light max-w-xl">
                100% MahaRERA-verified residences and direct builder pricing across Panvel, Kharghar & Seawoods. Doorstep AC cab tours with zero buyer brokerage.
              </p>
            </FadeIn>

            {/* Buttons Row */}
            <FadeIn delay={900} duration={800}>
              <div className="flex flex-col sm:flex-row gap-3 pt-1 w-full sm:w-auto">
                <button
                  onClick={handleStartChat}
                  className="w-full sm:w-auto bg-white text-black px-7 sm:px-9 py-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-black" />
                  <span>Chat on WhatsApp</span>
                </button>

                <a
                  href="#properties-section"
                  className="w-full sm:w-auto liquid-glass border border-white/20 text-white px-7 sm:px-9 py-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-pointer text-center inline-flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-98"
                >
                  <span>Explore Inventory</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Glass Card Tag */}
          <div className="lg:col-span-4 pointer-events-auto flex items-end justify-start lg:justify-end mt-4 sm:mt-6 lg:mt-0">
            <FadeIn delay={1100} duration={800}>
              <div className="liquid-glass border border-white/20 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <div className="text-left">
                  <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wide block">
                    Panvel • Kharghar • Seawoods
                  </span>
                  <span className="text-[10px] text-white/70 font-light block">
                    MahaRERA: A52000012345
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1.5 pointer-events-none opacity-75">
        <span className="text-[9px] uppercase tracking-widest text-white/60 font-mono">Explore</span>
        <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white animate-bounce" />
        </div>
      </div>
    </section>
  )
}
