'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  Flame,
  Sparkles,
  Eye,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import {
  getAllPropertiesAdmin,
  deleteProperty,
  duplicateProperty,
  updateProperty,
} from '@/lib/data/store'
import { formatIndianPrice, formatArea } from '@/lib/utils'
import { StatusBadge } from '@/components/public/StatusBadge'

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState(getAllPropertiesAdmin())
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [localityFilter, setLocalityFilter] = useState('all')

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProperty(id)
      setProperties(getAllPropertiesAdmin())
    }
  }

  const handleDuplicate = (id: string) => {
    duplicateProperty(id)
    setProperties(getAllPropertiesAdmin())
  }

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'available' ? 'sold' : 'available'
    updateProperty(id, { status: nextStatus as any })
    setProperties(getAllPropertiesAdmin())
  }

  const handleToggleFeatured = (id: string, current: boolean) => {
    updateProperty(id, { featured: !current })
    setProperties(getAllPropertiesAdmin())
  }

  const handleToggleHotDeal = (id: string, current: boolean) => {
    updateProperty(id, { is_hot_deal: !current })
    setProperties(getAllPropertiesAdmin())
  }

  // Filtered properties
  const filtered = properties.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    if (localityFilter !== 'all' && p.locality !== localityFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        p.title.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        (p.society_or_project && p.society_or_project.toLowerCase().includes(q))
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Property Listings ({properties.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Add, update pricing, toggle featured flags, or archive properties.
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, project, locality..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="sold">Sold Out</option>
            <option value="rented">Rented</option>
            <option value="under_negotiation">In Talks</option>
            <option value="hidden">Hidden</option>
          </select>

          <select
            value={localityFilter}
            onChange={(e) => setLocalityFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none"
          >
            <option value="all">All Localities</option>
            <option value="Panvel">Panvel</option>
            <option value="Kharghar">Kharghar</option>
            <option value="Kamothe">Kamothe</option>
            <option value="Taloja">Taloja</option>
            <option value="Seawoods">Seawoods</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Type & Area</th>
                <th className="py-3 px-4">Price (₹)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Featured / Hot</th>
                <th className="py-3 px-4 text-center">Views / Leads</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((prop) => {
                const cover = prop.images.find((i) => i.is_cover)?.url || prop.images[0]?.url
                return (
                  <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Property Thumbnail & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                          {cover && (
                            <Image
                              src={cover}
                              alt={prop.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/property/${prop.slug}`}
                            target="_blank"
                            className="font-bold text-slate-900 hover:text-sky-600 block truncate max-w-[200px] sm:max-w-[280px]"
                          >
                            {prop.title}
                          </Link>
                          <span className="text-[11px] text-slate-400">
                            {prop.locality}, {prop.city}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Type & Area */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800 capitalize block">
                        {prop.bhk ? `${prop.bhk} BHK ` : ''}{prop.property_type}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {formatArea(prop.carpet_area, prop.area_unit)}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {formatIndianPrice(prop.price, prop.listing_type, prop.rent_period)}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(prop.id, prop.status)}
                        className="cursor-pointer"
                        title="Click to toggle Available / Sold"
                      >
                        <StatusBadge status={prop.status} />
                      </button>
                    </td>

                    {/* Featured & Hot Deal quick toggles */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleFeatured(prop.id, prop.featured)}
                          title="Toggle Featured"
                          className={`p-1 rounded-lg text-xs font-bold transition-colors ${
                            prop.featured
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleHotDeal(prop.id, prop.is_hot_deal)}
                          title="Toggle Hot Deal"
                          className={`p-1 rounded-lg text-xs font-bold transition-colors ${
                            prop.is_hot_deal
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Stats */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="text-[11px]">
                        <span className="font-bold text-slate-800">{prop.view_count}</span> views
                        <span className="text-slate-300 mx-1">•</span>
                        <span className="font-bold text-emerald-600">{prop.whatsapp_click_count}</span> chats
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/property/${prop.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                          title="View on Live Site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={`/admin/properties/${prop.id}/edit`}
                          className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700"
                          title="Edit Listing"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDuplicate(prop.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                          title="Duplicate Listing"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(prop.id, prop.title)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
