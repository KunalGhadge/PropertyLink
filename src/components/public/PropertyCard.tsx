'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Maximize2, Layers, BedDouble, Bath, ArrowUpRight, MessageCircle, Share2, Check } from 'lucide-react'
import { PropertyWithImages } from '@/types'
import { formatIndianPrice, formatArea } from '@/lib/utils'

interface PropertyCardProps {
  property: PropertyWithImages
  className?: string
  priority?: boolean
}

export function PropertyCard({ property, className = '', priority = false }: PropertyCardProps) {
  const [copied, setCopied] = useState(false)
  const coverImage =
    property.images.find((img) => img.is_cover)?.url ||
    property.images[0]?.url ||
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'

  const priceText = formatIndianPrice(property.price, property.listing_type, property.rent_period)
  const propertyUrl = `/property/${property.slug}`

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${propertyUrl}` : propertyUrl

    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out ${property.title} in ${property.locality}: ${priceText}`,
          url: shareUrl,
        })
        return
      } catch {
        // fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const text = `Hi Rajesh, I am interested in ${property.title} in ${property.locality} (${priceText}). https://propertylink.in${propertyUrl}`
    window.open(`https://wa.me/919820123456?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <article className={`group flex flex-col bg-transparent ${className}`}>
      {/* 1. Architectural Cover Photo */}
      <Link
        href={propertyUrl}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 block mb-4"
      >
        <Image
          src={coverImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Top Badges: Status / MahaRERA */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
          {property.status === 'sold' ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide uppercase bg-black text-white">
              Sold
            </span>
          ) : property.is_hot_deal ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide uppercase bg-white/95 text-black backdrop-blur-sm shadow-sm">
              Featured
            </span>
          ) : null}
          {property.rera_number && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wider uppercase bg-black/60 text-white backdrop-blur-sm">
              RERA
            </span>
          )}
        </div>

        {/* Top Right Action Buttons: Share & WhatsApp */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={handleShare}
            aria-label="Share property link"
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center backdrop-blur-sm shadow-sm transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleWhatsApp}
            aria-label="WhatsApp broker about this property"
            className="w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm shadow-sm transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtle hover detail indicator */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* 2. Title & Price Line (Exactly matching attached image) */}
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <Link href={propertyUrl} className="group-hover:text-neutral-600 transition-colors truncate">
          <h4 className="text-base sm:text-lg font-medium text-black truncate tracking-tight">
            {property.title}
          </h4>
        </Link>
        <span className="text-base sm:text-lg font-semibold text-black shrink-0 tracking-tight">
          {priceText}
        </span>
      </div>

      {/* 3. Locality Line (Subtle gray, matching attached image) */}
      <p className="text-xs text-neutral-500 font-light truncate mb-3">
        {property.society_or_project ? `${property.society_or_project}, ` : ''}{property.locality}, {property.city}
      </p>

      {/* 4. Minimalist Specifications Bar (Matching attached image) */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-neutral-600 font-light pt-2 border-t border-neutral-200/80">
        <div className="flex items-center gap-1.5 shrink-0">
          <Maximize2 className="w-3.5 h-3.5 text-neutral-400 stroke-[1.5]" />
          <span>{formatArea(property.carpet_area, property.area_unit)}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Layers className="w-3.5 h-3.5 text-neutral-400 stroke-[1.5]" />
          <span>{property.floor_number ? `Floor ${property.floor_number}` : 'Mid Floor'}</span>
        </div>
        {property.bhk != null && (
          <div className="flex items-center gap-1.5 shrink-0">
            <BedDouble className="w-3.5 h-3.5 text-neutral-400 stroke-[1.5]" />
            <span>{property.bhk} Beds</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 shrink-0">
          <Bath className="w-3.5 h-3.5 text-neutral-400 stroke-[1.5]" />
          <span>{property.bathrooms || 2} Baths</span>
        </div>
      </div>
    </article>
  )
}
