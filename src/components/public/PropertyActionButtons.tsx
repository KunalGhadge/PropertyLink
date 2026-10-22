'use client'

import React, { useState } from 'react'
import { Phone, Calendar, Share2, Check, Download, FileText } from 'lucide-react'
import { WhatsAppButton } from './WhatsAppButton'
import { formatPhoneNumber } from '@/lib/utils'

interface PropertyActionButtonsProps {
  propertyId: string
  propertyTitle: string
  priceFormatted: string
  locality: string
  phone: string
  whatsappNumber: string
  propertySlug?: string
  brochureUrl?: string | null
  floorPlanUrl?: string | null
  ownerName?: string | null
  ownerPhone?: string | null
  hideOwnerContact?: boolean
}

export function PropertyActionButtons({
  propertyId,
  propertyTitle,
  priceFormatted,
  locality,
  phone,
  whatsappNumber,
  propertySlug,
  brochureUrl,
  floorPlanUrl,
  ownerName,
  ownerPhone,
  hideOwnerContact = true,
}: PropertyActionButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const handleBookVisitWhatsApp = () => {
    const text = `Hi Rajesh, I would like to schedule a site visit for: ${propertyTitle} in ${locality} (${priceFormatted}). Please share available slots.\n${window.location.href}`
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleShareWhatsApp = () => {
    const text = `Take a look at this verified property: ${propertyTitle} in ${locality} (${priceFormatted})\n${window.location.href}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="space-y-3">
      {/* Primary WhatsApp Action */}
      <WhatsAppButton
        propertyId={propertyId}
        propertyTitle={propertyTitle}
        price={priceFormatted}
        location={locality}
        phone={whatsappNumber}
        propertySlug={propertySlug}
        propertyUrl={propertySlug ? `/property/${propertySlug}` : undefined}
        label="Chat on WhatsApp"
        size="lg"
        className="w-full bg-black text-white hover:bg-neutral-800 rounded-xl py-3.5 text-xs font-semibold uppercase tracking-wider shadow-xs"
      />

      {/* Call Direct & Schedule Visit Row */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black font-medium text-xs transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-neutral-600" />
          <span>Call Advisor</span>
        </a>

        <button
          onClick={handleBookVisitWhatsApp}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black font-medium text-xs transition-colors cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-neutral-600" />
          <span>Book Visit</span>
        </button>
      </div>

      {/* Secondary Utilities: Brochure & Share */}
      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-light">
        {brochureUrl ? (
          <a
            href={brochureUrl}
            download
            className="inline-flex items-center gap-1 text-neutral-700 hover:text-black font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400" />
            <span>Brochure PDF</span>
          </a>
        ) : (
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-neutral-700 hover:text-black font-medium transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-neutral-400" />}
            <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
          </button>
        )}

        <button
          onClick={handleShareWhatsApp}
          className="inline-flex items-center gap-1 text-neutral-700 hover:text-black font-medium transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-neutral-400" />
          <span>Share Property</span>
        </button>
      </div>

      {/* Owner Contact (if visible) */}
      {!hideOwnerContact && ownerPhone && (
        <div className="mt-3 p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-800">
          <span className="font-semibold block">Owner: {ownerName || 'Direct Owner'}</span>
          <span className="text-neutral-500">{formatPhoneNumber(ownerPhone)}</span>
        </div>
      )}
    </div>
  )
}
