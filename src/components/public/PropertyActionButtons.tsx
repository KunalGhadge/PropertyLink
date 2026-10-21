'use client'

import React, { useState } from 'react'
import { Phone, Calendar, Share2, Check, Download, FileText } from 'lucide-react'
import { WhatsAppButton } from './WhatsAppButton'
import { BookVisitModal } from './BookVisitModal'
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
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false)
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

  const handleShareWhatsApp = () => {
    const text = `Take a look at this property in ${locality}: ${propertyTitle} (${priceFormatted})\n${window.location.href}`
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <>
      <div className="space-y-3">
        {/* Primary WhatsApp Enquiry */}
        <WhatsAppButton
          propertyId={propertyId}
          propertyTitle={propertyTitle}
          price={priceFormatted}
          location={locality}
          phone={whatsappNumber}
          propertySlug={propertySlug}
          propertyUrl={propertySlug ? `/property/${propertySlug}` : undefined}
          label="Enquire on WhatsApp"
          size="lg"
          className="w-full shadow-md"
        />

        {/* Call Broker & Book Visit Row */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-black hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm transition-all shadow-xs active:scale-98"
          >
            <Phone className="w-4 h-4 text-neutral-300" />
            <span>Call Broker</span>
          </a>

          <button
            onClick={() => setIsVisitModalOpen(true)}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 text-black font-medium text-xs sm:text-sm transition-all shadow-xs active:scale-98"
          >
            <Calendar className="w-4 h-4 text-neutral-700" />
            <span>Book Visit</span>
          </button>
        </div>

        {/* Share & Copy Link */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100 text-neutral-800 text-xs font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-neutral-600" />
            <span>Share on WhatsApp</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100 text-neutral-800 text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-neutral-500" />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Downloads */}
        {(brochureUrl || floorPlanUrl) && (
          <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
            {brochureUrl && (
              <a
                href={brochureUrl}
                download
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Brochure PDF</span>
              </a>
            )}
            {floorPlanUrl && (
              <a
                href={floorPlanUrl}
                download
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Floor Plan</span>
              </a>
            )}
          </div>
        )}

        {/* Owner Contact (Controlled by Broker) */}
        {!hideOwnerContact && ownerPhone && (
          <div className="mt-3 p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-800">
            <span className="font-semibold block">Owner Contact:</span>
            <span>{ownerName || 'Property Owner'}: {formatPhoneNumber(ownerPhone)}</span>
          </div>
        )}
      </div>

      {/* Book Visit Modal */}
      <BookVisitModal
        propertyId={propertyId}
        propertyTitle={propertyTitle}
        locality={locality}
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />
    </>
  )
}
