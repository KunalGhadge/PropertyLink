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
          'fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-950/95 text-white shadow-2xl hover:bg-black active:scale-95 transition-all duration-200 border border-neutral-800/80 backdrop-blur-md group',
          className
        )}
      >
        <MessageCircle className="w-4 h-4 text-emerald-400 fill-current group-hover:scale-110 transition-transform" />
        <span className="text-xs font-medium tracking-tight">Chat with Broker</span>
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
          'inline-flex items-center justify-center p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 transition-colors duration-150 border border-neutral-200/60',
          className
        )}
      >
        <MessageCircle className="w-4 h-4 text-emerald-500 fill-current" />
      </a>
    )
  }

  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5 rounded-lg',
    md: 'px-4 py-2.5 text-xs sm:text-sm gap-2 rounded-xl',
    lg: 'px-6 py-3.5 text-sm sm:text-base gap-2.5 font-medium rounded-xl',
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-150 active:scale-98 shadow-xs',
        variant === 'primary'
          ? 'bg-neutral-950 text-white hover:bg-neutral-800 border border-neutral-900'
          : 'bg-neutral-100 text-neutral-900 border border-neutral-200 hover:bg-neutral-200/80',
        sizeClasses[size],
        className
      )}
    >
      <MessageCircle className="w-4 h-4 text-emerald-400 fill-current shrink-0" />
      <span>{label}</span>
    </a>
  )
}
