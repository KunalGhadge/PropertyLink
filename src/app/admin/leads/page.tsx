'use client'

import React, { useState } from 'react'
import {
  Users2,
  Search,
  Filter,
  Download,
  MessageCircle,
  Phone,
  Calendar,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  User,
  ArrowRight,
} from 'lucide-react'
import { getLeads, updateLeadStatus, assignLead, getAgents, getProperties } from '@/lib/data/store'
import { Lead } from '@/types'
import { formatIndianPrice, formatDate, buildWhatsAppUrl } from '@/lib/utils'

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState(getLeads())
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [notesInput, setNotesInput] = useState('')

  const agents = getAgents()
  const properties = getProperties()

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead)
    setNotesInput(lead.notes || '')
  }

  const handleUpdateStatus = (leadId: string, newStatus: Lead['status']) => {
    const updated = updateLeadStatus(leadId, newStatus)
    setLeads(getLeads())
    if (selectedLead && selectedLead.id === leadId && updated) {
      setSelectedLead(updated)
    }
  }

  const handleSaveNotes = () => {
    if (!selectedLead) return
    const updated = updateLeadStatus(selectedLead.id, selectedLead.status, notesInput)
    setLeads(getLeads())
    if (updated) setSelectedLead(updated)
  }

  const handleAssignAgent = (agentId: string) => {
    if (!selectedLead) return
    const updated = assignLead(selectedLead.id, agentId || null)
    setLeads(getLeads())
    if (updated) setSelectedLead(updated)
  }

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Preferred Location', 'Source', 'Status', 'Notes', 'Created At']
    const rows = leads.map((l) => [
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.preferred_location || ''}"`,
      `"${l.source}"`,
      `"${l.status}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${l.created_at}"`,
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `propertylink_leads_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filtering
  const filtered = leads.filter((l) => {
    if (statusFilter !== 'all' && l.status !== statusFilter) return false
    if (sourceFilter !== 'all' && l.source !== sourceFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.preferred_location && l.preferred_location.toLowerCase().includes(q))
      )
    }
    return true
  })

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">New Lead</span>
      case 'contacted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Contacted</span>
      case 'interested':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">Interested</span>
      case 'site_visit_scheduled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">Site Visit</span>
      case 'negotiation':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Negotiation</span>
      case 'won':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Closed (Won)</span>
      case 'lost':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Lost</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Customer Enquiries & Pipeline ({leads.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Capture, follow up on WhatsApp, assign property consultants, and track conversions.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors self-start sm:self-auto shadow-xs"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export All Leads CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by buyer name, phone..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none"
          >
            <option value="all">All Stages</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="interested">Interested</option>
            <option value="site_visit_scheduled">Site Visit</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Closed (Won)</option>
            <option value="lost">Lost</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none"
          >
            <option value="all">All Channels</option>
            <option value="website_form">Website Form</option>
            <option value="whatsapp">WhatsApp Direct</option>
            <option value="property_page">Property Page</option>
            <option value="landing_page">Landing Page</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Buyer Details</th>
                <th className="py-3 px-4">Requirement / Location</th>
                <th className="py-3 px-4">Source Channel</th>
                <th className="py-3 px-4 text-center">Pipeline Stage</th>
                <th className="py-3 px-4">Assigned Agent</th>
                <th className="py-3 px-4 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((lead) => {
                const waUrl = buildWhatsAppUrl(lead.phone, {
                  customMessage: `Hi ${lead.name}, thank you for inquiring with Apex Realty Panvel. How can I assist you with your property search today?`,
                })

                return (
                  <tr
                    key={lead.id}
                    onClick={() => handleSelectLead(lead)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{lead.name}</span>
                      <span className="text-[11px] text-slate-500">{lead.phone}</span>
                      {lead.email && <span className="text-[11px] text-slate-400 block">{lead.email}</span>}
                    </td>

                    <td className="py-3 px-4 max-w-[220px]">
                      <span className="font-semibold text-slate-800 block truncate">
                        {lead.preferred_location || 'Panvel / Navi Mumbai'}
                      </span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {lead.message || 'No specific requirement written'}
                      </span>
                    </td>

                    <td className="py-3 px-4 capitalize whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[11px]">
                        {lead.source.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                      {lead.assigned_to ? 'Rajesh Sharma' : <span className="text-slate-400 italic">Unassigned</span>}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1.5">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                        </a>

                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                          title="Call Lead"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Drawer Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                {getStatusBadge(selectedLead.status)}
                <span className="text-xs text-slate-400">Captured: {formatDate(selectedLead.created_at)}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{selectedLead.name}</h3>
              <p className="text-xs text-slate-300">{selectedLead.phone} {selectedLead.email ? `• ${selectedLead.email}` : ''}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 pt-0 space-y-4 text-xs">
              {/* Message */}
              {selectedLead.message && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Buyer Requirement
                  </span>
                  <p className="text-slate-800 text-sm leading-relaxed">{selectedLead.message}</p>
                </div>
              )}

              {/* Status Selector */}
              <div>
                <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Change Pipeline Stage
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                >
                  <option value="new">New Inquiry</option>
                  <option value="contacted">Contacted via Phone/WhatsApp</option>
                  <option value="interested">Interested & Shortlisted Properties</option>
                  <option value="site_visit_scheduled">Site Visit Scheduled</option>
                  <option value="negotiation">Token / Negotiation Stage</option>
                  <option value="won">Closed / Deal Won</option>
                  <option value="lost">Lost / Dropped</option>
                </select>
              </div>

              {/* Assign Consultant */}
              <div>
                <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Assign Property Consultant
                </label>
                <select
                  value={selectedLead.assigned_to || ''}
                  onChange={(e) => handleAssignAgent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                >
                  <option value="">Unassigned</option>
                  {agents.map((ag) => (
                    <option key={ag.id} value={ag.id}>
                      {ag.name} ({ag.designation})
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Follow-up Notes & Deal Diary
                </label>
                <textarea
                  rows={3}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g. Budget flexible up to 95 Lakhs, prefers high floor facing garden, loan pre-approved with HDFC..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="mt-1 px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Save Notes
                </button>
              </div>

              {/* Quick Actions Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {selectedLead.phone}</span>
                </a>

                <a
                  href={buildWhatsAppUrl(selectedLead.phone, {
                    customMessage: `Hi ${selectedLead.name}, Rajesh from Apex Realty Panvel this side. Following up regarding your property requirement.`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-medium border border-neutral-900 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                  <span>Open WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
