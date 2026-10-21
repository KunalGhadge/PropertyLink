'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { cn, buildWhatsAppUrl } from '@/lib/utils'

interface WhatsAppButtonProps {
  phone?: string
  propertyTitle?: string
  price?: string
  location?: string
  propertyUrl?: string
  propertySlug?: string
  customMessage?: string
  propertyId?: string
  variant?: 'primary' | 'secondary' | 'icon' | 'floating'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

export function WhatsAppButton({
  phone = '+91 98201 23456',
  propertyTitle,
  price,
  location,
  propertyUrl,
  propertySlug,
  customMessage,
  propertyId,
  variant = 'primary',
  size = 'md',
  label = 'WhatsApp',
  className,
}: WhatsAppButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If propertyId is present, track click event
    if (propertyId) {
      try {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_type: 'whatsapp_click',
            property_id: propertyId,
          }),
        }).catch(() => {})
      } catch {
        // non-blocking
      }
    }

    // Dynamically upgrade relative URL to full URL upon user click without causing SSR hydration mismatch
    if (typeof window !== 'undefined') {
      const fullUrl = propertySlug
        ? `${window.location.origin}/property/${propertySlug}`
        : propertyUrl && propertyUrl.startsWith('/')
        ? `${window.location.origin}${propertyUrl}`
        : propertyUrl

      if (fullUrl && fullUrl !== propertyUrl) {
        const dynamicUrl = buildWhatsAppUrl(phone, {
          propertyTitle,
          price,
          location,
          propertyUrl: fullUrl,
          customMessage,
        })
        e.currentTarget.href = dynamicUrl
      }
    }
  }

  const resolvedPropertyUrl = propertyUrl || (propertySlug ? `/property/${propertySlug}` : undefined)

  const url = buildWhatsAppUrl(phone, {
    propertyTitle,
    price,
    location,
    propertyUrl: resolvedPropertyUrl,
    customMessage,
  })

  if (variant === 'floating') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        className={cn(
          'fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white font-semibold shadow-2xl hover:bg-[#20ba5a] active:scale-95 transition-all duration-200 border-2 border-white/80 group',
          className
        )}
      >
        <MessageCircle className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline font-medium">Chat with Broker</span>
      </a>
    )
  }

  if (variant === 'icon') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        className={cn(
          'inline-flex items-center justify-center p-2 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-150',
          className
        )}
      >
        <MessageCircle className="w-5 h-5 fill-current" />
      </a>
    )
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-bold',
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 shadow-sm active:scale-98',
        variant === 'primary'
          ? 'bg-[#25D366] text-white hover:bg-[#20ba5a] hover:shadow-md'
          : 'bg-emerald-50 text-[#128C7E] border border-emerald-200 hover:bg-emerald-100',
        sizeClasses[size],
        className
      )}
    >
      <MessageCircle className="w-4 h-4 fill-current shrink-0" />
      <span>{label}</span>
    </a>
  )
}
