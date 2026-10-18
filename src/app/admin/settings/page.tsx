'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { settingsSchema, SettingsFormValues } from '@/lib/validations/settings.schema'
import { getSiteSettings, updateSiteSettings } from '@/lib/data/store'
import { Save, CheckCircle2, ShieldCheck, Sparkles, Building2, Phone, Mail, MapPin } from 'lucide-react'

export default function AdminSettingsPage() {
  const currentSettings = getSiteSettings()
  const [isSaved, setIsSaved] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema) as any,
    defaultValues: {
      brand_name: currentSettings.brand_name,
      tagline: currentSettings.tagline || '',
      logo_url: currentSettings.logo_url || '',
      primary_color: currentSettings.primary_color || '#0F172A',
      secondary_color: currentSettings.secondary_color || '#0284C7',
      accent_color: currentSettings.accent_color || '#25D366',
      hero_headline: currentSettings.hero_headline,
      hero_subheadline: currentSettings.hero_subheadline || '',
      hero_bg_image: currentSettings.hero_bg_image || '',
      hero_cta_text: currentSettings.hero_cta_text,
      hero_cta_secondary: currentSettings.hero_cta_secondary,
      about_title: currentSettings.about_title || '',
      about_description: currentSettings.about_description || '',
      broker_name: currentSettings.broker_name || '',
      broker_designation: currentSettings.broker_designation || '',
      broker_experience_years: currentSettings.broker_experience_years || 14,
      broker_photo_url: currentSettings.broker_photo_url || '',
      areas_served: currentSettings.areas_served || [],
      phone_number: currentSettings.phone_number,
      whatsapp_number: currentSettings.whatsapp_number,
      email: currentSettings.email,
      office_address: currentSettings.office_address || '',
      rera_number: currentSettings.rera_number || '',
      footer_disclaimer: currentSettings.footer_disclaimer || '',
    },
  })

  const onSubmit = (data: SettingsFormValues) => {
    updateSiteSettings(data as any)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Site Customization & Agency Branding
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Customize the public site headline, colors, broker bio, phone numbers, and MahaRERA credentials without code.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all active:scale-98"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Settings Saved!' : 'Save All Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Branding, Hero & About */}
        <div className="lg:col-span-8 space-y-6">
          {/* Brand Identity */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Brand Identity & Theme
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Brand Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('brand_name')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
                {errors.brand_name && <p className="text-xs text-rose-600 mt-1">{errors.brand_name.message}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Tagline / Subheading
                </label>
                <input
                  type="text"
                  {...register('tagline')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Primary Color
                </label>
                <input
                  type="text"
                  {...register('primary_color')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Secondary Color
                </label>
                <input
                  type="text"
                  {...register('secondary_color')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  WhatsApp Accent
                </label>
                <input
                  type="text"
                  {...register('accent_color')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
            </div>
          </div>

          {/* Homepage Hero Customization */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Homepage Hero Section
            </h3>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Hero Headline (Shown with GSAP reveal) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register('hero_headline')}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
              {errors.hero_headline && <p className="text-xs text-rose-600 mt-1">{errors.hero_headline.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Hero Subheading
              </label>
              <textarea
                rows={2}
                {...register('hero_subheadline')}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  {...register('hero_cta_text')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Secondary CTA Text (WhatsApp)
                </label>
                <input
                  type="text"
                  {...register('hero_cta_secondary')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Hero Background Image URL (Parallax)
              </label>
              <input
                type="url"
                {...register('hero_bg_image')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
              />
            </div>
          </div>

          {/* Broker Profile */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Principal Broker Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Broker Name
                </label>
                <input
                  type="text"
                  {...register('broker_name')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  {...register('broker_designation')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  {...register('broker_experience_years')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Broker Photo URL
              </label>
              <input
                type="url"
                {...register('broker_photo_url')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                About Story / Bio
              </label>
              <textarea
                rows={4}
                {...register('about_description')}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Contact & Legal */}
        <div className="lg:col-span-4 space-y-6">
          {/* Contact Numbers */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Direct Contact & WhatsApp
            </h3>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Primary Calling Phone <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register('phone_number')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                WhatsApp Business Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register('whatsapp_number')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-700"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Official Agency Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Office Address
              </label>
              <textarea
                rows={3}
                {...register('office_address')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
              />
            </div>
          </div>

          {/* MahaRERA & Legal */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              MahaRERA & Legal Disclaimers
            </h3>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                MahaRERA Registration Number
              </label>
              <input
                type="text"
                {...register('rera_number')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Footer Disclaimer Text
              </label>
              <textarea
                rows={3}
                {...register('footer_disclaimer')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-600 leading-relaxed text-[11px]"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
