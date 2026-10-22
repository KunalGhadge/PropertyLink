'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react'
import { SiteSettings } from '@/types'
import { AnimatedHeading } from './AnimatedHeading'
import { FadeIn } from './FadeIn'

interface HeroSectionProps {
  settings?: SiteSettings
}

export function HeroSection({ settings }: HeroSectionProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const whatsappNumber = (settings?.whatsapp_number || '+91 98201 23456').replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Rajesh, I would like to explore verified residential and commercial opportunities.')}`

  const handleStartChat = () => {
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="relative w-full h-[100dvh] min-h-[580px] flex flex-col overflow-hidden bg-black text-white">
      {/* 1. Full-screen Video Background with NO overlays whatsoever */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. Top Navbar Bar */}
      <div className="relative z-30 w-full px-4 sm:px-8 md:px-12 lg:px-16 pt-4 sm:pt-6">
        <nav className="liquid-glass rounded-xl px-4 py-2.5 flex items-center justify-between border border-white/20">
          {/* Left: Logo */}
          <Link
            href="/"
            className="text-xl sm:text-2xl font-semibold tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            VEX
          </Link>

          {/* Center Links (hidden on mobile, visible md+) */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link
              href="#residences"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Story
            </Link>
            <Link
              href="/buy"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Investing
            </Link>
            <Link
              href="/properties"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Building
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Advisory
            </Link>
          </div>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartChat}
              className="bg-white text-black px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 md:hidden text-black" />
              <span>Start a Chat</span>
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
                href="#residences"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
              >
                Story
              </Link>
              <Link
                href="/buy"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
              >
                Buy / Investing
              </Link>
              <Link
                href="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
              >
                All Properties
              </Link>
              <Link
                href="/rent"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
              >
                Rentals
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
              >
                About Advisory
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
              >
                Contact & Office
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 3. Hero Content (Pushed to bottom of viewport) */}
      <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-8 sm:pb-12 lg:pb-16 pointer-events-none">
        <div className="lg:grid lg:grid-cols-2 lg:items-end gap-6 sm:gap-8 w-full">
          {/* Left Column: Heading, Subheading & Action Buttons */}
          <div className="pointer-events-auto max-w-2xl">
            {/* Character-by-character entrance heading */}
            <AnimatedHeading
              text={'Shaping tomorrow\nwith vision and action.'}
              className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-normal mb-3 sm:mb-4 text-white leading-[1.12] sm:leading-tight"
            />

            {/* Subheading: Fade-in 800ms delay, 1000ms duration */}
            <FadeIn delay={800} duration={1000}>
              <p className="text-xs sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-5 leading-relaxed font-light max-w-lg">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            {/* Buttons Row: Fade-in 1200ms delay, 1000ms duration */}
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-col sm:flex-row gap-3 pt-1 w-full sm:w-auto">
                <button
                  onClick={handleStartChat}
                  className="w-full sm:w-auto bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer shadow-lg text-center"
                >
                  Start a Chat
                </button>
                <a
                  href="#residences"
                  className="w-full sm:w-auto liquid-glass border border-white/20 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-white hover:text-black transition-all cursor-pointer text-center inline-block"
                >
                  Explore Now
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Glass Card Tag */}
          <div className="pointer-events-auto flex items-end justify-start lg:justify-end mt-4 sm:mt-6 lg:mt-0">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light text-white tracking-wide">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1.5 pointer-events-none opacity-75">
        <span className="text-[9px] uppercase tracking-widest text-white/60 font-mono">Explore</span>
        <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white animate-bounce" />
        </div>
      </div>
    </section>
  )
}
