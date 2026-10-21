'use client'

import React from 'react'
import Link from 'next/link'
import {
  BookOpen,
  PlusCircle,
  Building2,
  Users2,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Download,
  Calendar,
  Sparkles,
  PhoneCall,
  Sliders,
  FileSpreadsheet,
} from 'lucide-react'

export default function AdminGuidePage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#1c1811] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#c5a059] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            1-Page Operations Manual
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif">
            Broker Launch & Operations Guide
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Welcome to your private property inventory and client conversion platform. This 1-page operational guide explains how to manage listings, handle high-intent leads, and operate your digital agency.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c5a059] hover:bg-[#b38b42] text-[#0c0f14] text-xs font-bold transition-all shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add First Property</span>
            </Link>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
            >
              <Users2 className="w-4 h-4 text-[#c5a059]" />
              <span>View Inbound Leads</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Public Site</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Listing Creation */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#b38b42] flex items-center justify-center font-bold text-base border border-amber-200">
            1
          </div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#b38b42]" />
            Adding & Publishing Properties
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your inventory is your primary business asset. Maintain high quality standards so buyers trust the listing instantly:
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Indian Pricing Format:</strong> Enter the price in numeric INR (e.g., 8500000); the system automatically displays ₹85 Lakh or ₹1.25 Cr.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Real Photography:</strong> Use 16:9 or 4:3 high-res images. Set a captivating living room or elevation shot as the Cover Image.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>MahaRERA Registration:</strong> Enter the project RERA number (e.g., P52000034567). It renders a verified badge with clear title signal.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Floor Plans & Brochure:</strong> Provide PDF or image links for floor plans to satisfy high-intent buyers before site visits.</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/admin/properties"
              className="text-xs font-bold text-[#b38b42] hover:text-[#9a7532] inline-flex items-center gap-1"
            >
              Go to Property Manager <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Step 2: Inbound Leads & WhatsApp Conversion */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-base border border-emerald-200">
            2
          </div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users2 className="w-5 h-5 text-emerald-600" />
            Lead Pipeline & Rapid WhatsApp Follow-Up
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Real estate conversion hinges on speed-to-lead. Respond to inbound enquiries within 15–30 minutes:
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Auto-Captured Context:</strong> Every lead records the specific property, locality, budget, and source page so you know their requirement before calling.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>1-Click WhatsApp:</strong> Click the green WhatsApp button on any enquiry row to open a chat with a pre-formatted message referencing the property.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Status Pipeline:</strong> Progress leads from <em>New</em> → <em>Contacted</em> → <em>Site Visit Scheduled</em> → <em>Negotiation</em> → <em>Closed Won</em>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Lead Export:</strong> Use the CSV Export button at any time to download your client database for marketing or backup.</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
            >
              View Enquiry Pipeline <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Step 3: Marking Sold / Under Negotiation */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-base border border-sky-200">
            3
          </div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            Marking Sold / Under Negotiation
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Keeping your public inventory fresh builds tremendous client trust and prevents wasted calls:
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span><strong>Under Negotiation:</strong> When an agreement token is received, set status to <em>Under Negotiation</em> to alert other buyers without taking the listing offline.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span><strong>Sold / Rented:</strong> Mark as <em>Sold</em> or <em>Rented</em> upon registration. This showcases your closed deal track record to prospective sellers.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span><strong>Duplicate Listing:</strong> Listing similar 2 BHKs in the same tower? Use the Duplicate button to clone specifications and save data-entry time.</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/admin/properties"
              className="text-xs font-bold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1"
            >
              Update Listing Status <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Step 4: Site Settings & Brand Control */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-base border border-purple-200">
            4
          </div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-600" />
            Agency Settings & Brand Customization
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Manage your public identity without touching code:
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>WhatsApp & Phone Numbers:</strong> Ensure your active WhatsApp Business number (+91 98200 XXXXX) is configured for floating widgets and inquiry deep links.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Office Address:</strong> Update your physical Panvel / Kharghar office address, operational hours, and Google Maps location.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Broker RERA ID:</strong> Prominently display your MahaRERA individual/firm license number to comply with Maharashtra real estate regulations.</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/admin/settings"
              className="text-xs font-bold text-purple-700 hover:text-purple-800 inline-flex items-center gap-1"
            >
              Open Site Settings <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust & Best Practices Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-[#c5a059]" />
          <h3 className="text-lg font-bold text-white font-serif">
            Broker Pro-Tips for Maximum Conversions
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="font-bold text-white block">Respond to WhatsApp in &lt;15 mins</span>
            <span>Over 74% of Navi Mumbai home seekers prefer immediate WhatsApp brochure delivery over scheduled calls.</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="font-bold text-white block">Accurate Carpet Areas Only</span>
            <span>Always state RERA Carpet Area clearly. Buyers appreciate honesty over inflated super built-up claims.</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="font-bold text-white block">High Quality Video Tours</span>
            <span>Paste YouTube walkthrough URLs in property records; listings with videos generate 2.8x more site visit requests.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
