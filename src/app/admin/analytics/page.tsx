'use client'

import React from 'react'
import {
  BarChart3,
  TrendingUp,
  Eye,
  MessageCircle,
  Phone,
  Calendar,
  Users,
  Target,
  ArrowUpRight,
} from 'lucide-react'
import { getDashboardStats } from '@/lib/data/store'
import { AnalyticsChart, DistributionChart } from '@/components/admin/AnalyticsChart'
import { formatIndianPrice } from '@/lib/utils'

export default function AdminAnalyticsPage() {
  const stats = getDashboardStats()

  // Conversion funnel calculations
  const totalViews = stats.totalViews
  const totalInquiries = stats.totalLeads + stats.whatsappClicks
  const siteVisits = stats.siteVisitsScheduled
  const wonDeals = stats.leadsByStatus.won || 1

  const viewToLeadRate = ((totalInquiries / (totalViews || 1)) * 100).toFixed(1)
  const leadToVisitRate = ((siteVisits / (totalInquiries || 1)) * 100).toFixed(1)
  const visitToCloseRate = ((wonDeals / (siteVisits || 1)) * 100).toFixed(1)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Performance Analytics & Conversion Funnel
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Detailed metrics across web traffic, buyer enquiries, WhatsApp chats, and closed property transactions.
        </p>
      </div>

      {/* Traffic KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Views Today
          </span>
          <div className="text-3xl font-black text-slate-900">
            {stats.viewsToday}
          </div>
          <p className="text-xs text-emerald-600 font-semibold">+18% vs yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Views This Week
          </span>
          <div className="text-3xl font-black text-slate-900">
            {stats.viewsThisWeek.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-emerald-600 font-semibold">Active search spike in Kharghar & Panvel</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Monthly Impressions
          </span>
          <div className="text-3xl font-black text-slate-900">
            {stats.viewsThisMonth.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-sky-600 font-semibold">Direct Organic & WhatsApp shares</p>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Conversion Funnel</h3>
          <p className="text-xs text-slate-500">Visitor progression from browsing to sale closure</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[11px] uppercase font-bold text-slate-400">Step 1: Visitors</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900">{totalViews}</div>
            <span className="text-[10px] text-slate-500">Total Property Views</span>
          </div>

          <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 space-y-1">
            <span className="text-[11px] uppercase font-bold text-sky-600">Step 2: Leads ({viewToLeadRate}%)</span>
            <div className="text-xl sm:text-2xl font-black text-sky-900">{totalInquiries}</div>
            <span className="text-[10px] text-sky-700">Form + WhatsApp Inquiries</span>
          </div>

          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 space-y-1">
            <span className="text-[11px] uppercase font-bold text-purple-600">Step 3: Visits ({leadToVisitRate}%)</span>
            <div className="text-xl sm:text-2xl font-black text-purple-900">{siteVisits}</div>
            <span className="text-[10px] text-purple-700">Doorstep Site Visits</span>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-1">
            <span className="text-[11px] uppercase font-bold text-emerald-600">Step 4: Closures ({visitToCloseRate}%)</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-900">{wonDeals}</div>
            <span className="text-[10px] text-emerald-700">Successful Bookings</span>
          </div>
        </div>
      </div>

      {/* Traffic Trend Chart + Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <AnalyticsChart trendData={stats.viewsTrend} />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <DistributionChart
            data={stats.leadsBySource}
            title="Channel Conversion"
            subtitle="Website form vs WhatsApp click-to-chat"
          />
        </div>
      </div>
    </div>
  )
}
