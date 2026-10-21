'use client'

import React, { useState, useEffect } from 'react'
import { X, Sparkles, MessageCircle, Send, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react'
import { WhatsAppButton } from './WhatsAppButton'

interface SoftLeadCapturePopupProps {
  propertyTitle?: string
  propertyLocality?: string
  propertyPrice?: string
  propertySlug?: string
}

export function SoftLeadCapturePopup({
  propertyTitle,
  propertyLocality,
  propertyPrice,
  propertySlug,
}: SoftLeadCapturePopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [contactMode, setContactMode] = useState<'phone' | 'email'>('phone')
  const [contactValue, setContactValue] = useState('')
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('₹50 Lakh - ₹1 Crore')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Only show once per session
    const hasShown = sessionStorage.getItem('propertylink_popup_shown')
    if (hasShown) return

    let timer: NodeJS.Timeout

    // Trigger 1: 30 seconds delay
    timer = setTimeout(() => {
      const shownAlready = sessionStorage.getItem('propertylink_popup_shown')
      if (!shownAlready) {
        sessionStorage.setItem('propertylink_popup_shown', 'true')
        setIsOpen(true)
      }
    }, 30000)

    // Trigger 2: Scroll depth > 65%
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const scrollPercent = (window.scrollY / scrollHeight) * 100

      if (scrollPercent > 65) {
        const shownAlready = sessionStorage.getItem('propertylink_popup_shown')
        if (!shownAlready) {
          sessionStorage.setItem('propertylink_popup_shown', 'true')
          setIsOpen(true)
        }
      }
    }

    // Trigger 3: Desktop Exit Intent (mouse moving out of window top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        const shownAlready = sessionStorage.getItem('propertylink_popup_shown')
        if (!shownAlready) {
          sessionStorage.setItem('propertylink_popup_shown', 'true')
          setIsOpen(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isOpen) return null

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactValue.trim()) return

    setIsSubmitting(true)

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Website Visitor',
          phone: contactMode === 'phone' ? contactValue.trim() : undefined,
          email: contactMode === 'email' ? contactValue.trim() : undefined,
          budget_range: budget,
          preferred_location: propertyLocality || 'Panvel / Kharghar',
          source: propertyTitle ? 'popup_property' : 'popup_homepage',
          message: propertyTitle
            ? `Requested details/floor plan for ${propertyTitle} (${propertyPrice || ''})`
            : `Looking for curated options in Panvel/Navi Mumbai with budget ${budget}`,
        }),
      })

      setIsSuccess(true)
      setTimeout(() => {
        setIsOpen(false)
      }, 3500)
    } catch {
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 sm:p-8 overflow-hidden text-neutral-950">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-950 tracking-tight">Requirement Received!</h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-sm mx-auto">
                We will share handpicked verified listings matching your budget on WhatsApp within 2 hours.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Spam Guarantee</span>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 mb-2 border border-neutral-200/80">
                <Sparkles className="w-3.5 h-3.5" />
                {propertyTitle ? 'Request Property Brochure' : 'Curated WhatsApp Alert'}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight leading-snug">
                {propertyTitle
                  ? `Get Floor Plan & Pricing for ${propertyTitle}`
                  : 'Receive New Matching Properties in Panvel on WhatsApp'}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                {propertyTitle
                  ? 'We will send the official brochure, verified carpet area layout, and developer payment scheme directly to your WhatsApp.'
                  : 'Skip endless portal searches. Tell us your budget and receive verified, off-market inventory directly.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Optional Name */}
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                  Your Name <span className="text-neutral-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 text-neutral-950 transition-colors"
                />
              </div>

              {/* Contact Mode Switcher (Phone OR Email) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                    Send Details Via:
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setContactMode('phone')}
                      className={`font-semibold pb-0.5 border-b-2 transition-all ${
                        contactMode === 'phone'
                          ? 'border-neutral-900 text-neutral-950'
                          : 'border-transparent text-neutral-400 hover:text-neutral-700'
                      }`}
                    >
                      WhatsApp / Phone
                    </button>
                    <span className="text-neutral-300">|</span>
                    <button
                      type="button"
                      onClick={() => setContactMode('email')}
                      className={`font-semibold pb-0.5 border-b-2 transition-all ${
                        contactMode === 'email'
                          ? 'border-neutral-900 text-neutral-950'
                          : 'border-transparent text-neutral-400 hover:text-neutral-700'
                      }`}
                    >
                      Email
                    </button>
                  </div>
                </div>

                {contactMode === 'phone' ? (
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-neutral-400">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="98201 23456"
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      className="w-full pl-12 pr-3 py-2.5 text-xs sm:text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 text-neutral-950 transition-colors"
                    />
                  </div>
                ) : (
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 text-neutral-950 transition-colors"
                  />
                )}
              </div>

              {!propertyTitle && (
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                    Your Approximate Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 text-neutral-950 transition-colors"
                  >
                    <option value="Under ₹50 Lakh">Under ₹50 Lakh (Affordable / 1 BHK)</option>
                    <option value="₹50 Lakh - ₹1 Crore">₹50 Lakh - ₹1 Crore (2 BHK)</option>
                    <option value="₹1 Crore - ₹2 Crore">₹1 Crore - ₹2 Crore (3 BHK / Townships)</option>
                    <option value="₹2 Crore+">₹2 Crore+ (Villas & Penthouses)</option>
                  </select>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2 active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-300" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-neutral-300" />
                    <span>{propertyTitle ? 'Send Floor Plan & Brochure' : 'Send Me Matching Options'}</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center text-[11px] text-neutral-500">
              <span>Your privacy is protected. No spam. MahaRERA: A52000012345.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
