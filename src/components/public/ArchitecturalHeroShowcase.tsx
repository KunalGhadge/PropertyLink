'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PropertyWithImages } from '@/types'
import { PropertyCard } from './PropertyCard'
import { BookVisitModal } from './BookVisitModal'

interface ArchitecturalHeroShowcaseProps {
  properties: PropertyWithImages[]
  whatsappNumber?: string
  phoneNumber?: string
}

export function ArchitecturalHeroShowcase({
  properties,
  whatsappNumber = '+91 98201 23456',
  phoneNumber = '+91 98201 23456',
}: ArchitecturalHeroShowcaseProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const topProperties = properties.slice(0, 3)
  const sampleProp = topProperties[0] || properties[0]

  const handleBookCall = () => {
    setIsModalOpen(true)
  }

  const handleFreeConsult = () => {
    const text = encodeURIComponent('Hi Rajesh, I would like to book a private real estate consultation for Navi Mumbai properties.')
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank')
  }

  return (
    <div className="w-full bg-white text-black">
      {/* ======================================================== */}
      {/* SECTION 1: "Discover space you truly belong in"          */}
      {/* Exactly as depicted in the attached screenshot           */}
      {/* ======================================================== */}
      <section className="pt-16 sm:pt-24 pb-16 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-10 sm:mb-14">
          {/* Left: Main Heading & Book a Call Button */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black tracking-tight leading-[1.1] mb-8">
              Discover space you
              <br />
              truly belong in
            </h2>
            <button
              onClick={handleBookCall}
              className="inline-block px-8 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm"
            >
              BOOK A CALL
            </button>
          </div>

          {/* Right: Editorial Description */}
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-md">
              Experience more than a house; find a sanctuary where your journey unfolds, rich with comfort and endless opportunities.
            </p>
          </div>
        </div>

        {/* Centerpiece Architectural Photography */}
        <div className="relative w-full aspect-[16/9] max-h-[640px] rounded-2xl overflow-hidden bg-neutral-900 shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Modern luxury residence with illuminated glass balconies and pool"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: "Guiding you toward the residence..."         */}
      {/* Exactly as depicted in the attached screenshot           */}
      {/* ======================================================== */}
      <section id="residences" className="py-16 sm:py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 border-t border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start mb-12 sm:mb-16">
          {/* Left Column Heading */}
          <div className="lg:col-span-7">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-black tracking-tight leading-tight">
              Guiding you toward the
              <br className="hidden sm:inline" /> residence of your dreams
            </h3>
          </div>

          {/* Right Column Subtitle */}
          <div className="lg:col-span-5 lg:pt-2">
            <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-md">
              Our vision bridges balance, design, and attention so that every client resides in a space reflecting their values.
            </p>
          </div>
        </div>

        {/* 3-Column Architectural Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {topProperties.map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} priority={idx === 0} />
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: "Exclusive collection" Split Section          */}
      {/* Exactly as depicted in the attached screenshot           */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 border-t border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Text & Free Consult CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 block mb-3">
                Curated Portfolio
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-black tracking-tight leading-tight">
                Exclusive
                <br />
                collection
              </h3>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-md">
              Consultants curate custom lists of vetted homes. Featuring media, VR walk-ins, and private physical tours.
            </p>

            <div className="pt-2">
              <button
                onClick={handleFreeConsult}
                className="px-8 py-3 rounded-md border border-neutral-300 text-neutral-900 text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
              >
                Free consult
              </button>
            </div>
          </div>

          {/* Right Column: Stunning White Geometric Modern Home */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
                alt="White architectural cubist villa with black frame windows"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Book a Call / Site Visit */}
      {sampleProp && (
        <BookVisitModal
          propertyId={sampleProp.id}
          propertyTitle={sampleProp.title}
          locality={sampleProp.locality}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
