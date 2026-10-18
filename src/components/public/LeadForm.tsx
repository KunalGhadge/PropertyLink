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
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-bold text-slate-900 leading-snug">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Hidden Honeypot Field */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          {...register('honeypot')}
        />

        {/* Full Name */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Rahul Sharma"
            {...register('name')}
            className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 ${
              errors.name ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
            }`}
          />
          {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name.message}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Mobile Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-xs font-bold text-slate-500">+91</span>
            <input
              type="tel"
              placeholder="98201 23456"
              {...register('phone')}
              className={`w-full pl-12 pr-3 py-2 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                errors.phone ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
              }`}
            />
          </div>
          {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone.message}</p>}
        </div>

        {/* Optional Email & Requirement (when not compact) */}
        {!compact && (
          <>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Your Requirement / Questions
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Need ready possession 2 BHK in Panvel, want to visit this Saturday..."
                {...register('message')}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Details...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Request Callback & Brochure</span>
            </>
          )}
        </button>
      </form>

      {/* WhatsApp Fallback */}
      <div className="pt-2 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-500 mb-2">Prefer instant reply on WhatsApp?</p>
        <WhatsAppButton
          propertyTitle={propertyTitle}
          price={priceFormatted}
          location={locality}
          label="Chat on WhatsApp Directly"
          variant="secondary"
          size="sm"
          className="w-full"
        />
      </div>
    </div>
  )
}
