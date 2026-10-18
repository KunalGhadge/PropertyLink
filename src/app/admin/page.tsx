'use client'

import React from 'react'
import Link from 'next/link'
import {
  Building2,
  Eye,
  MessageCircle,
  Phone,
  Calendar,
  Users,
  TrendingUp,
  Download,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { getDashboardStats, getLeads } from '@/lib/data/store'
import { formatIndianPrice } from '@/lib/utils'
import { AnalyticsChart, DistributionChart } from '@/components/admin/AnalyticsChart'

export default function AdminDashboardPage() {
  const stats = getDashboardStats()
  const leads = getLeads()

  // CSV Export for Leads
  const handleExportLeadsCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Preferred Location', 'Source', 'Status', 'Message', 'Created At']
    const rows = leads.map((l) => [
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
    <div className="space-y-8">
      {/* Top Welcome & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block">
            Agency Analytics Overview
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Welcome back, Rajesh!
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Apex Realty Panvel • 10 Live listings • {stats.newLeads} new leads waiting for follow-up today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportLeadsCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Leads CSV</span>
          </button>

          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Properties */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Properties</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {stats.totalProperties}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-emerald-600 font-bold">{stats.activeProperties} Available</span>
            <span>•</span>
            <span>{stats.soldProperties} Sold</span>
          </div>
        </div>

        {/* Total Property Views */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Views</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {stats.totalViews.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{stats.viewsToday} views today</span>
          </div>
        </div>

        {/* Total Leads / Enquiries */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {stats.totalLeads}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-sky-600 font-bold">{stats.newLeads} New</span>
            <span>•</span>
            <span>{stats.leadsByStatus.interested || 0} Interested</span>
          </div>
        </div>

        {/* WhatsApp & Call Engagements */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Direct Inquiries</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {stats.whatsappClicks + stats.callClicks}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-emerald-600 font-bold">{stats.whatsappClicks} WhatsApp</span>
            <span>•</span>
            <span className="text-blue-600 font-bold">{stats.callClicks} Calls</span>
          </div>
        </div>
      </div>

      {/* Traffic Trend Chart + Leads Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <AnalyticsChart trendData={stats.viewsTrend} />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <DistributionChart
            data={stats.leadsByStatus}
            title="Leads by Pipeline Stage"
            subtitle="Current status of inquiries"
          />
        </div>
      </div>

      {/* Top Viewed Properties Table & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Properties */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Top Performing Properties</h3>
              <p className="text-xs text-slate-500">Ranked by page views and WhatsApp enquiries</p>
            </div>
            <Link
              href="/admin/properties"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 underline"
            >
              View all →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-xl">Property</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3 text-center">Views</th>
                  <th className="py-2.5 px-3 text-center rounded-r-xl">WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {stats.topProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 block truncate max-w-[200px] sm:max-w-[260px]">
                        {prop.title}
                      </span>
                      <span className="text-[11px] text-slate-400">{prop.locality}</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {formatIndianPrice(prop.price)}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-sky-600">
                      {prop.view_count}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-600">
                      {prop.whatsapp_click_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Sources Distribution */}
        <div className="lg:col-span-5">
          <DistributionChart
            data={stats.leadsBySource}
            title="Leads Acquisition Source"
            subtitle="Where buyers are converting"
          />
        </div>
      </div>
    </div>
  )
}
