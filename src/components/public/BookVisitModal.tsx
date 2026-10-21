'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { siteVisitSchema, SiteVisitFormValues } from '@/lib/validations/lead.schema'
import { Calendar, Clock, X, CheckCircle2, Loader2, Car, ShieldCheck } from 'lucide-react'

interface BookVisitModalProps {
  propertyId: string
  propertyTitle: string
  locality: string
  isOpen: boolean
  onClose: () => void
}

export function BookVisitModal({
  propertyId,
  propertyTitle,
  locality,
  isOpen,
  onClose,
}: BookVisitModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Default to tomorrow's date formatted as YYYY-MM-DD
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SiteVisitFormValues>({
    resolver: zodResolver(siteVisitSchema) as any,
    defaultValues: {
      property_id: propertyId,
      visit_date: tomorrow,
      visit_time: '11:00 AM',
      notes: '',
      honeypot: '',
    },
  })

  if (!isOpen) return null

  const onSubmit = async (data: SiteVisitFormValues) => {
    if (data.honeypot) {
      setIsSuccess(true)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/site-visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Failed to book site visit')
      }

      setIsSuccess(true)
      reset()
    } catch (err: any) {
      setError(err.message || 'Failed to schedule site visit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#1c1811] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#c5a059] text-xs font-bold uppercase tracking-wider mb-1 font-serif">
            <Calendar className="w-4 h-4 text-[#c5a059]" />
            <span>Free AC Cab Site Visit</span>
          </div>
          <h2 className="text-lg font-bold text-white line-clamp-1 font-serif">{propertyTitle}</h2>
          <p className="text-xs text-slate-300 mt-1">Locality: {locality}, Navi Mumbai</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Site Visit Scheduled!</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Our property specialist will call you shortly to confirm the pickup point and share the driver details.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSuccess(false)
                    onClose()
                  }}
                  className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-xl text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
                  {error}
                </div>
              )}

              {/* Bot Honeypot */}
              <input type="text" tabIndex={-1} style={{ display: 'none' }} {...register('honeypot')} />

              {/* Name */}
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anand Mahindra"
                  {...register('customer_name')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]"
                />
                {errors.customer_name && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.customer_name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-slate-500">+91</span>
                  <input
                    type="tel"
                    placeholder="98201 23456"
                    {...register('customer_phone')}
                    className="w-full pl-12 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]"
                  />
                </div>
                {errors.customer_phone && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.customer_phone.message}</p>
                )}
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                    Visit Date
                  </label>
                  <input
                    type="date"
                    min={tomorrow}
                    {...register('visit_date')}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                    Time Slot
                  </label>
                  <select
                    {...register('visit_time')}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]"
                  >
                    <option value="10:00 AM">10:00 AM - Morning</option>
                    <option value="11:30 AM">11:30 AM - Morning</option>
                    <option value="02:30 PM">02:30 PM - Afternoon</option>
                    <option value="04:30 PM">04:30 PM - Evening</option>
                    <option value="06:00 PM">06:00 PM - Sunset View</option>
                  </select>
                </div>
              </div>

              {/* Notes / Station Pickup */}
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Pickup Preference / Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Free AC cab pickup from Panvel Station / Own vehicle"
                  {...register('notes')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              {/* Feature Highlights */}
              <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-center gap-3 text-xs text-amber-900">
                <Car className="w-5 h-5 text-[#b38b42] shrink-0" />
                <span>Complimentary AC cab pickup from nearest station or your doorstep.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming Slot...</span>
                  </>
                ) : (
                  <span>Book Free Accompanied Visit</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
