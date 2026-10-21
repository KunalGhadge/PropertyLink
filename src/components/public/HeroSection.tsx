'use client'

import React from 'react'
import Link from 'next/link'
import { SiteSettings } from '@/types'
import { AnimatedHeading } from './AnimatedHeading'
import { FadeIn } from './FadeIn'

interface HeroSectionProps {
  settings?: SiteSettings
}

export function HeroSection({ settings }: HeroSectionProps) {
  const whatsappNumber = (settings?.whatsapp_number || '+91 98201 23456').replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Rajesh, I would like to explore verified residential and commercial opportunities.')}`

  const handleStartChat = () => {
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="relative w-full h-screen min-h-[680px] flex flex-col overflow-hidden bg-black text-white">
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
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-16 pt-6">
        <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between border border-white/20">
          {/* Left: Logo */}
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-white hover:opacity-90 transition-opacity"
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

          {/* Right Button */}
          <button
            onClick={handleStartChat}
            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Start a Chat
          </button>
        </nav>
      </div>

      {/* 3. Hero Content (Pushed to bottom of viewport) */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16 pointer-events-none">
        <div className="lg:grid lg:grid-cols-2 lg:items-end gap-8 w-full">
          {/* Left Column: Heading, Subheading & Action Buttons */}
          <div className="pointer-events-auto max-w-2xl">
            {/* Character-by-character entrance heading */}
            <AnimatedHeading
              text={'Shaping tomorrow\nwith vision and action.'}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white leading-tight"
            />

            {/* Subheading: Fade-in 800ms delay, 1000ms duration */}
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-5 leading-relaxed font-light">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            {/* Buttons Row: Fade-in 1200ms delay, 1000ms duration */}
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4 pt-1">
                <button
                  onClick={handleStartChat}
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer shadow-lg"
                >
                  Start a Chat
                </button>
                <a
                  href="#residences"
                  className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all cursor-pointer text-center inline-block"
                >
                  Explore Now
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Glass Card Tag */}
          <div className="pointer-events-auto flex items-end justify-start lg:justify-end mt-6 lg:mt-0">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white tracking-wide">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
