'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, BedDouble, Maximize2, Share2, Check, ArrowRight } from 'lucide-react'
import { PropertyWithImages } from '@/types'
import { formatIndianPrice, formatArea } from '@/lib/utils'
import { StatusBadge } from './StatusBadge'
import { WhatsAppButton } from './WhatsAppButton'

interface PropertyCardProps {
  property: PropertyWithImages
  className?: string
  priority?: boolean
}

export function PropertyCard({ property, className, priority = false }: PropertyCardProps) {
  const [copied, setCopied] = useState(false)
  const coverImage = property.images.find((img) => img.is_cover)?.url || property.images[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'

  const priceText = formatIndianPrice(property.price, property.listing_type, property.rent_period)
  const propertyUrl = typeof window !== 'undefined' ? `${window.location.origin}/property/${property.slug}` : `/property/${property.slug}`

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property in ${property.locality}: ${priceText}`,
          url: propertyUrl,
        })
        return
      } catch {
        // user cancelled or share failed, fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(propertyUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div
      className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_35px_-8px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 ${className || ''}`}
    >
      {/* Image Container */}
      <Link href={`/property/${property.slug}`} className="relative aspect-[16/10] overflow-hidden bg-slate-100 block">
        <Image
          src={coverImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
          {property.is_hot_deal && <StatusBadge isHotDeal />}
          {property.featured && !property.is_hot_deal && <StatusBadge featured />}
          {property.is_new && !property.is_hot_deal && !property.featured && <StatusBadge isNew />}
          <StatusBadge status={property.status} />
        </div>

        {/* Share Button on Top Right */}
        <button
          onClick={handleShare}
          aria-label="Share property link"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 hover:text-slate-900 hover:bg-white flex items-center justify-center shadow-md transition-all active:scale-90"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
        </button>

        {/* Price Tag in Indian Format overlay bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between z-10">
          <div className="bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white shadow-lg">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              {priceText}
            </span>
          </div>

          {property.rera_number && (
            <span className="text-[10px] uppercase font-semibold text-white/90 bg-slate-900/60 px-2 py-0.5 rounded backdrop-blur-sm tracking-wide">
              RERA Verified
            </span>
          )}
        </div>
      </Link>

      {/* Property Details Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Locality & Type */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-sky-600" />
            <span className="truncate">{property.locality}, {property.city}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium capitalize">{property.property_type}</span>
          </div>

          {/* Title */}
          <Link href={`/property/${property.slug}`} className="block group-hover:text-sky-600 transition-colors">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg line-clamp-1 leading-snug">
              {property.title}
            </h3>
          </Link>

          {/* Society / Landmark */}
          {property.society_or_project && (
            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-normal">
              {property.society_or_project}
            </p>
          )}

          {/* Specs Row: BHK, Carpet Area, Furnishing */}
          <div className="grid grid-cols-3 gap-2 my-3.5 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700">
            {property.bhk != null && (
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">{property.bhk} BHK</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-800">{formatArea(property.carpet_area, property.area_unit)}</span>
            </div>
            <div className="text-xs font-medium text-slate-600 capitalize truncate flex items-center justify-end">
              {property.furnishing.replace('_', ' ')}
            </div>
          </div>
        </div>

        {/* Footer Actions: WhatsApp CTA + View Detail */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 mt-auto">
          <WhatsAppButton
            propertyId={property.id}
            propertyTitle={property.title}
            price={priceText}
            location={`${property.locality}, ${property.city}`}
            propertyUrl={propertyUrl}
            size="sm"
            label="WhatsApp"
            className="flex-1"
          />

          <Link
            href={`/property/${property.slug}`}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors shrink-0"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
