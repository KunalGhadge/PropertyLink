'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ShieldCheck, Star, Sparkles, Building, MapPin, ChevronDown } from 'lucide-react'
import { SiteSettings, PropertyWithImages } from '@/types'
import { SearchBar } from './SearchBar'
import { WhatsAppButton } from './WhatsAppButton'
import { formatIndianPrice } from '@/lib/utils'

interface HeroSectionProps {
  settings: SiteSettings
  sampleProperty?: PropertyWithImages
}

export function HeroSection({ settings, sampleProperty }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaGroupRef = useRef<HTMLDivElement>(null)
  const floatingCardRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 1. Initial Staggered Reveal on page load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
      })
        .from(
          subheadRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          ctaGroupRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.5'
        )
        .from(
          searchBarRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.4'
        )

      if (floatingCardRef.current) {
        tl.from(
          floatingCardRef.current,
          {
            scale: 0.85,
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          '-=0.6'
        )
      }

      // 2. Parallax background on scroll
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // 3. Floating effect on featured card
      if (floatingCardRef.current) {
        gsap.to(floatingCardRef.current, {
          y: -10,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const bgImage = settings.hero_bg_image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-24 pb-12 sm:pb-16 overflow-hidden bg-[#0c0f14]"
    >
      {/* Background Image with Parallax & Dark Gradient Overlay */}
      <div ref={bgRef} className="absolute inset-0 -top-16 -bottom-16 w-full h-[120%] pointer-events-none">
        <Image
          src={bgImage}
          alt="Luxury Homes in Navi Mumbai"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f14] via-[#0c0f14]/75 to-[#0c0f14]/80" />
        <div className="absolute inset-0 bg-radial-at-c from-[#c5a059]/10 via-transparent to-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a22]/90 border border-[#c5a059]/40 text-[#c5a059] text-xs font-bold backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>MahaRERA Verified Direct Inventory</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Brokerage on Developer Inventory</span>
          </div>
        </div>

        {/* Grid layout: Left Hero Headline & Search, Right Floating Property Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.14]"
            >
              {settings.hero_headline}
            </h1>

            {/* Subhead */}
            <p
              ref={subheadRef}
              className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl leading-relaxed"
            >
              {settings.hero_subheadline}
            </p>

            {/* CTAs */}
            <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient hover:opacity-95 text-[#0c0f14] font-extrabold text-sm shadow-lg shadow-[#c5a059]/25 active:scale-98 transition-all"
              >
                <span>{settings.hero_cta_text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <WhatsAppButton
                phone={settings.whatsapp_number}
                size="md"
                label={settings.hero_cta_secondary}
                className="py-3.5 px-5 shadow-lg shadow-emerald-950/40"
              />
            </div>

            {/* Editorial Trust Strip */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-300">
              <div>
                <span className="font-serif text-lg font-bold text-white block">14+ Years</span>
                <span className="text-[11px] text-stone-400">Local Panvel Experience</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-[#c5a059] block">1,200+</span>
                <span className="text-[11px] text-stone-400">Navi Mumbai Families</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-emerald-400 block">100% Verified</span>
                <span className="text-[11px] text-stone-400">Clear Titles & MahaRERA</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white block">Zero Brokerage</span>
                <span className="text-[11px] text-stone-400">On Developer Launches</span>
              </div>
            </div>
          </div>

          {/* Right Floating Highlight Card */}
          {sampleProperty && (
            <div className="hidden lg:block lg:col-span-4">
              <div
                ref={floatingCardRef}
                className="glass-dark rounded-3xl p-4 border border-[#c5a059]/30 shadow-2xl space-y-3"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900">
                  <Image
                    src={sampleProperty.images[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                    alt={sampleProperty.title}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#c5a059] text-[#0c0f14] shadow-sm">
                      ★ Handpicked Spotlight
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end">
                    <span className="px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-white font-serif font-bold text-sm border border-white/10">
                      {formatIndianPrice(sampleProperty.price)}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#c5a059] uppercase tracking-wider">
                    <MapPin className="w-3 h-3 text-[#c5a059]" />
                    <span>{sampleProperty.locality}, Navi Mumbai</span>
                  </div>
                  <h3 className="text-white font-serif font-bold text-sm line-clamp-1 mt-0.5">
                    {sampleProperty.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-stone-300 mt-2 pt-2 border-t border-white/10">
                    <span>{sampleProperty.bhk} BHK • {sampleProperty.carpet_area} sq.ft.</span>
                    <Link
                      href={`/property/${sampleProperty.slug}`}
                      className="text-[#c5a059] hover:text-[#dfba73] font-semibold inline-flex items-center gap-0.5"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Embedded Quick Search Bar */}
        <div ref={searchBarRef} className="mt-8 sm:mt-12 w-full">
          <SearchBar />
        </div>

        {/* Subtle Scroll Down Indicator */}
        <div className="flex justify-center mt-8">
          <a
            href="#featured"
            aria-label="Scroll to listings"
            className="flex flex-col items-center gap-1 text-[11px] font-semibold text-stone-400 hover:text-[#c5a059] transition-colors group"
          >
            <span className="tracking-widest uppercase text-[10px]">Curated Portfolio</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce text-[#c5a059]" />
          </a>
        </div>
      </div>
    </section>
  )
}
