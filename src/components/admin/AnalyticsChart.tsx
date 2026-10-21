'use client'

import React from 'react'

interface TrendDataPoint {
  date: string
  views: number
  leads: number
}

interface AnalyticsChartProps {
  trendData: TrendDataPoint[]
}

export function AnalyticsChart({ trendData }: AnalyticsChartProps) {
  const maxViews = Math.max(...trendData.map((d) => d.views), 100)

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Weekly Traffic & Enquiries</h3>
          <p className="text-xs text-slate-500">Page views vs leads captured in past 7 days</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#c5a059]" />
            <span className="text-slate-600">Views</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-600">Leads</span>
          </div>
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div className="h-56 w-full flex items-end gap-3 sm:gap-6 pt-6 pb-2 px-2">
        {trendData.map((item, idx) => {
          const heightPercent = Math.max((item.views / maxViews) * 100, 8)
          const leadHeight = Math.max((item.leads / 25) * 80, 6)

          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-2 rounded pointer-events-none z-10 whitespace-nowrap shadow-md">
                {item.views} Views • {item.leads} Leads
              </div>

              {/* Bars container */}
              <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-full">
                {/* Views Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-1/2 max-w-[28px] bg-gradient-to-t from-[#b38b42] to-[#c5a059] rounded-t-lg transition-all group-hover:brightness-110 shadow-xs"
                />
                {/* Leads Bar */}
                <div
                  style={{ height: `${leadHeight}%` }}
                  className="w-1/2 max-w-[28px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all group-hover:brightness-110 shadow-xs"
                />
              </div>

              {/* Day Label */}
              <span className="text-[11px] font-bold text-slate-500 mt-2">{item.date}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface DistributionChartProps {
  data: Record<string, number>
  title: string
  subtitle?: string
}

export function DistributionChart({ data, title, subtitle }: DistributionChartProps) {
  const total = Object.values(data).reduce((sum, v) => sum + v, 0) || 1
  const colors = ['#c5a059', '#10b981', '#b38b42', '#059669', '#d97706', '#475569']

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
      <div>
        <h3 className="font-bold text-slate-900 text-base">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      <div className="space-y-3">
        {Object.entries(data).map(([key, count], index) => {
          const percent = Math.round((count / total) * 100)
          const color = colors[index % colors.length]

          return (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="capitalize">{key.replace('_', ' ')}</span>
                <span className="text-slate-500">{count} ({percent}%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${percent}%`, backgroundColor: color }}
                  className="h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
