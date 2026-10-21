'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadSchema, LeadFormValues } from '@/lib/validations/lead.schema'
import { Send, CheckCircle2, MessageCircle, AlertCircle, Loader2 } from 'lucide-react'
import { WhatsAppButton } from './WhatsAppButton'

interface LeadFormProps {
  propertyId?: string
  propertyTitle?: string
  locality?: string
  priceFormatted?: string
  title?: string
  subtitle?: string
  source?: 'website_form' | 'whatsapp' | 'property_page' | 'landing_page'
  className?: string
  compact?: boolean
}

export function LeadForm({
  propertyId,
  propertyTitle,
  locality,
  priceFormatted,
  title = 'Interested in this property?',
  subtitle = 'Get verified floor plans, brochure, and direct builder offers.',
  source = 'website_form',
  className = '',
  compact = false,
}: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema) as any,
    defaultValues: {
      property_id: propertyId || null,
      source: propertyId ? 'property_page' : source,
      preferred_location: locality || '',
      honeypot: '',
    },
  })

  const onSubmit = async (data: LeadFormValues) => {
    // If bot filled the honeypot, silently abort
    if (data.honeypot) {
      setIsSuccess(true)
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          property_id: propertyId || null,
          source: propertyId ? 'property_page' : source,
        }),
      })

      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit enquiry')
      }

      setIsSuccess(true)
      reset()
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please reach out via WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={`p-6 sm:p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4 ${className}`}>
        <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Enquiry Received!</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
            Our Senior Property Consultant will contact you within 15 minutes with verified details and pricing.
          </p>
        </div>
        <div className="pt-2">
          <WhatsAppButton
            propertyTitle={propertyTitle}
            price={priceFormatted}
            location={locality}
            label="Need Urgent Help? Chat on WhatsApp"
            size="sm"
            className="w-full"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-5 ${className}`}>
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 mb-2 border border-neutral-200/80">
          Direct Broker Consultation
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight leading-snug">{title}</h3>
        {subtitle && <p className="text-xs sm:text-sm text-neutral-500 mt-1">{subtitle}</p>}
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Hidden Honeypot Field */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          {...register('honeypot')}
        />

        {/* Purpose Toggle: Buy vs Rent (When not on specific property) */}
        {!propertyId && (
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 block mb-1.5">
              I am looking to
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="buy"
                  {...register('listing_purpose')}
                  className="peer sr-only"
                  defaultChecked
                />
                <span className="flex items-center justify-center py-2 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-700 peer-checked:bg-black peer-checked:text-white peer-checked:border-black transition-all">
                  Buy Property
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="rent"
                  {...register('listing_purpose')}
                  className="peer sr-only"
                />
                <span className="flex items-center justify-center py-2 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-700 peer-checked:bg-black peer-checked:text-white peer-checked:border-black transition-all">
                  Rent Property
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Rajesh Patil"
            {...register('name')}
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50/60 border rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 text-neutral-950 transition-colors ${
              errors.name ? 'border-rose-300 bg-rose-50/50' : 'border-neutral-200'
            }`}
          />
          {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name.message}</p>}
        </div>

        {/* Mobile Number OR Email Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
              WhatsApp / Mobile <span className="text-neutral-400 font-normal">(or Email)</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs font-bold text-neutral-400">+91</span>
              <input
                type="tel"
                placeholder="98201 23456"
                {...register('phone')}
                className={`w-full pl-12 pr-3 py-2.5 text-xs sm:text-sm bg-neutral-50/60 border rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 text-neutral-950 transition-colors ${
                  errors.phone ? 'border-rose-300 bg-rose-50/50' : 'border-neutral-200'
                }`}
              />
            </div>
            {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
              Email Address <span className="text-neutral-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50/60 border rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 text-neutral-950 transition-colors ${
                errors.email ? 'border-rose-300 bg-rose-50/50' : 'border-neutral-200'
              }`}
            />
            {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* Location & Budget / Property Type (Expanded when not compact) */}
        {!compact && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                Preferred Area
              </label>
              <select
                {...register('preferred_location')}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 text-neutral-950 transition-colors"
              >
                <option value="">Any Navi Mumbai Area</option>
                <option value="Panvel">Panvel</option>
                <option value="Kharghar">Kharghar</option>
                <option value="Kamothe">Kamothe</option>
                <option value="Taloja">Taloja</option>
                <option value="New Panvel">New Panvel</option>
                <option value="Seawoods">Seawoods</option>
                <option value="CBD Belapur">CBD Belapur</option>
                <option value="Ulwe">Ulwe</option>
                <option value="Kalamboli">Kalamboli</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                Property Type
              </label>
              <select
                {...register('property_type')}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 text-neutral-950 transition-colors"
              >
                <option value="">Any Type</option>
                <option value="flat">1 / 2 / 3 BHK Flat</option>
                <option value="penthouse">Luxury Penthouse</option>
                <option value="villa">Row House / Villa</option>
                <option value="plot">Approved Plot / Land</option>
                <option value="commercial">Shop / Office</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                Budget Range
              </label>
              <select
                {...register('budget_range')}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 text-neutral-950 transition-colors"
              >
                <option value="">Flexible Budget</option>
                <option value="Under ₹50 Lakh">Under ₹50 Lakh</option>
                <option value="₹50L - ₹85L">₹50L - ₹85L</option>
                <option value="₹85L - ₹1.5 Cr">₹85L - ₹1.5 Cr</option>
                <option value="₹1.5 Cr - ₹3 Cr">₹1.5 Cr - ₹3 Cr</option>
                <option value="₹3 Cr+">₹3 Cr+ Ultra Luxury</option>
              </select>
            </div>
          </div>
        )}

        {/* Message / Requirement Context */}
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
            Requirement Details <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={compact ? 2 : 2}
            placeholder={
              propertyTitle
                ? `Inquiring about ${propertyTitle}. Looking for floor plan & site visit timings...`
                : "e.g. Looking for a ready 2 BHK near station with car parking. Best builder deals only."
            }
            {...register('message')}
            className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:outline-none focus:bg-white focus:border-neutral-900 text-neutral-950 resize-none transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-5 rounded-xl bg-black hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-neutral-300" />
              <span>Sending Your Details...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-neutral-300" />
              <span>{propertyTitle ? 'Request Site Visit & Floor Plan' : 'Get Matching Options on WhatsApp'}</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-neutral-500 text-center">
          🔒 Zero spam guarantee. Direct response from principal broker within 30 minutes.
        </p>
      </form>

      {/* WhatsApp Deep Link fallback */}
      <div className="pt-3 border-t border-neutral-100 text-center">
        <WhatsAppButton
          propertyTitle={propertyTitle}
          price={priceFormatted}
          location={locality}
          label="Prefer Instant Chat on WhatsApp?"
          variant="secondary"
          size="sm"
          className="w-full"
        />
      </div>
    </div>
  )
}
