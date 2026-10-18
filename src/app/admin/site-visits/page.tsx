'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  Car,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
  Building2,
} from 'lucide-react'
import { getSiteVisits, updateSiteVisitStatus, getProperties, getAgents } from '@/lib/data/store'
import { SiteVisit } from '@/types'
import { buildWhatsAppUrl, formatDate } from '@/lib/utils'

export default function AdminSiteVisitsPage() {
  const [visits, setVisits] = useState(getSiteVisits())
  const properties = getProperties()
  const agents = getAgents()

  const handleStatusChange = (id: string, newStatus: SiteVisit['status']) => {
    updateSiteVisitStatus(id, newStatus)
    setVisits(getSiteVisits())
  }

  const getStatusBadge = (status: SiteVisit['status']) => {
    switch (status) {
      case 'scheduled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">Scheduled</span>
      case 'confirmed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Confirmed (Cab Dispatched)</span>
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">Completed</span>
      case 'cancelled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Cancelled</span>
      case 'no_show':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">No Show</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Accompanied Site Visits Schedule ({visits.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track accompanied buyer pickups, assign advisors, and update visit completion statuses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visits.map((visit) => {
          const prop = properties.find((p) => p.id === visit.property_id)
          const agent = agents.find((a) => a.id === visit.assigned_agent_id) || agents[0]

          const waUrl = buildWhatsAppUrl(visit.customer_phone, {
            customMessage: `Hi ${visit.customer_name}, regarding your upcoming site visit for ${prop?.title || 'property in Panvel'} on ${visit.visit_date} at ${visit.visit_time}. Your advisor ${agent?.name} will be accompanying you. Please let us know if you need pickup assistance!`,
          })

          return (
            <div
              key={visit.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header status & date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    <span>{formatDate(visit.visit_date)}</span>
                    <span className="text-slate-300">•</span>
                    <Clock className="w-4 h-4 text-sky-600" />
                    <span>{visit.visit_time}</span>
                  </div>
                  {getStatusBadge(visit.status)}
                </div>

                {/* Property Name */}
                {prop && (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Property</span>
                    <Link
                      href={`/property/${prop.slug}`}
                      target="_blank"
                      className="font-bold text-slate-900 hover:text-sky-600 text-sm block truncate"
                    >
                      {prop.title}
                    </Link>
                    <span className="text-xs text-slate-500">{prop.locality}, Navi Mumbai</span>
                  </div>
                )}

                {/* Customer Details */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-900 block text-sm">{visit.customer_name}</span>
                  <div className="flex items-center gap-3 text-slate-600">
                    <span>Phone: {visit.customer_phone}</span>
                    {visit.customer_email && <span>Email: {visit.customer_email}</span>}
                  </div>
                </div>

                {/* Notes & Pickup */}
                {visit.notes && (
                  <div className="flex items-start gap-2 text-xs text-slate-600 bg-sky-50/70 p-3 rounded-xl border border-sky-100">
                    <Car className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span><strong>Pickup Notes:</strong> {visit.notes}</span>
                  </div>
                )}

                {/* Assigned Agent */}
                <div className="text-xs text-slate-500 pt-1">
                  <span>Assigned Consultant: <strong>{agent?.name}</strong></span>
                </div>
              </div>

              {/* Status Update & Contact Controls */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Status:</label>
                  <select
                    value={visit.status}
                    onChange={(e) => handleStatusChange(visit.id, e.target.value as any)}
                    className="px-2 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no_show">No Show</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${visit.customer_phone}`}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                    title="Call Customer"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a]"
                    title="Send WhatsApp confirmation"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
