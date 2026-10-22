'use client'

import React from 'react'
import Link from 'next/link'
import {
  Building2,
  Users,
  MessageCircle,
  Phone,
  Calendar,
  Plus,
  Download,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Edit,
  Eye,
  Settings,
  UserCheck,
  BookOpen,
} from 'lucide-react'
import { getDashboardStats, getLeads, getAllPropertiesAdmin } from '@/lib/data/store'
import { formatIndianPrice } from '@/lib/utils'

export default function AdminDashboardPage() {
  const stats = getDashboardStats()
  const allLeads = getLeads()
  const allProperties = getAllPropertiesAdmin()
  const properties = allProperties.slice(0, 5)
  const recentLeads = allLeads.slice(0, 5)

  // CSV Export for Leads
  const handleExportLeadsCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Preferred Location', 'Source', 'Status', 'Message', 'Created At']
    const rows = allLeads.map((l) => [
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.preferred_location || ''}"`,
      `"${l.source}"`,
      `"${l.status}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.created_at}"`,
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `apex_realty_leads_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* 1. Clean Top Header & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
              Agency Operations Center
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Welcome back, Rajesh
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5 font-light">
            {stats.activeProperties} Live listings active • {stats.newLeads} new buyer inquiries awaiting response today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportLeadsCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-neutral-500" />
            <span>Export CSV</span>
          </button>

          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {/* 2. Four Essential KPI Summary Cards (Simple, High Contrast) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Active Listings */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Inventory</span>
            <Building2 className="w-4 h-4 text-neutral-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            {stats.activeProperties}
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100">
            <span className="text-neutral-500 font-light">{stats.totalProperties} total listed</span>
            <Link href="/admin/properties" className="font-semibold text-black hover:underline">
              Manage →
            </Link>
          </div>
        </div>

        {/* Inbound Leads */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">New Enquiries</span>
            <Users className="w-4 h-4 text-neutral-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
            <span>{stats.newLeads}</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Needs Reply
            </span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100">
            <span className="text-neutral-500 font-light">{stats.totalLeads} total in pipeline</span>
            <Link href="/admin/leads" className="font-semibold text-black hover:underline">
              Respond →
            </Link>
          </div>
        </div>

        {/* Site Visits */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Site Visits</span>
            <Calendar className="w-4 h-4 text-neutral-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Active
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100">
            <span className="text-neutral-500 font-light">Doorstep AC Cab Tours</span>
            <Link href="/admin/site-visits" className="font-semibold text-black hover:underline">
              Schedule →
            </Link>
          </div>
        </div>

        {/* Total Buyer Engagements */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Direct Contacts</span>
            <MessageCircle className="w-4 h-4 text-neutral-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            {stats.whatsappClicks + stats.callClicks}
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100">
            <span className="text-neutral-500 font-light">{stats.whatsappClicks} WA • {stats.callClicks} Calls</span>
            <Link href="/admin/analytics" className="font-semibold text-black hover:underline">
              Metrics →
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Actionable Operations Grid: Inbound Leads (Left) & Active Properties (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Inbound Buyer Enquiries (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm sm:text-base tracking-tight">
                Inbound Inquiries Requiring Follow-Up
              </h3>
              <p className="text-xs text-neutral-500 font-light">Direct WhatsApp and web inquiries from potential buyers</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-black hover:underline inline-flex items-center gap-1"
            >
              <span>View All ({allLeads.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900 text-xs sm:text-sm">{lead.name}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        lead.status === 'new'
                          ? 'bg-amber-100 text-amber-900'
                          : lead.status === 'site_visit_scheduled'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {lead.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 font-light truncate">
                    Interested in:{' '}
                    <strong className="text-neutral-800 font-medium">
                      {allProperties.find((p) => p.id === lead.property_id)?.title ||
                        lead.preferred_location ||
                        'Navi Mumbai Residences'}
                    </strong>
                  </p>
                  <p className="text-[11px] text-neutral-400 font-light">
                    {lead.phone} • {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi ${lead.name}, this is Rajesh Sharma from Apex Realty Panvel. Following up on your inquiry about ${
                        allProperties.find((p) => p.id === lead.property_id)?.title ||
                        lead.preferred_location ||
                        'properties in Navi Mumbai'
                      }. How may I assist you today?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                    className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors"
                    title={`Call ${lead.name}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Inventory Quick Manager (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm sm:text-base tracking-tight">
                Live Inventory
              </h3>
              <p className="text-xs text-neutral-500 font-light">Quick edit and status manager</p>
            </div>
            <Link
              href="/admin/properties"
              className="text-xs font-semibold text-black hover:underline inline-flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100 space-y-1">
            {properties.map((prop) => (
              <div key={prop.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="min-w-0 space-y-0.5">
                  <Link
                    href={`/admin/properties/${prop.id}/edit`}
                    className="font-medium text-xs sm:text-sm text-neutral-900 hover:text-black hover:underline block truncate"
                  >
                    {prop.title}
                  </Link>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-light">
                    <span>{prop.locality}</span>
                    <span>•</span>
                    <span className="font-semibold text-neutral-800">{formatIndianPrice(prop.price)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Link
                    href={`/property/${prop.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
                    title="View Public Page"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/admin/properties/${prop.id}/edit`}
                    className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors"
                    title="Edit Property"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <Link
              href="/admin/properties/new"
              className="w-full py-2.5 rounded-xl border border-dashed border-neutral-300 hover:border-black text-neutral-700 hover:text-black text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List New Residence or Commercial</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Quick Operational Shortcuts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <Link
          href="/admin/site-visits"
          className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-black transition-all shadow-xs flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-900">Site Visits Calendar</h4>
            <p className="text-[11px] text-neutral-500 font-light">Schedule & assign doorstep AC cab tours</p>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-black transition-all shadow-xs flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black shrink-0">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-900">Agency Settings & Branding</h4>
            <p className="text-[11px] text-neutral-500 font-light">MahaRERA reg, phone, office address</p>
          </div>
        </Link>

        <Link
          href="/admin/guide"
          className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-black transition-all shadow-xs flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-900">Operations Manual</h4>
            <p className="text-[11px] text-neutral-500 font-light">Staff guide & client conversion checklist</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
