'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus,
  Search,
  Filter,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  Flame,
  Sparkles,
  Eye,
  CheckCircle2,
  RotateCcw,
  LayoutGrid,
  List,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react'
import {
  getAllPropertiesAdmin,
  deleteProperty,
  softDeleteProperty,
  restoreProperty,
  markPropertyAsSold,
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
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const refresh = () => {
    setProperties(getAllPropertiesAdmin())
    setSelectedIds([])
  }

  // Action handlers
  const handleMarkAsSold = (id: string, title: string) => {
    if (confirm(`Are you sure you want to mark "${title}" as SOLD? This will update the public badge to Sold Out.`)) {
      markPropertyAsSold(id)
      refresh()
    }
  }

  const handleSoftDelete = (id: string, title: string) => {
    if (confirm(`Move "${title}" to Trash? You can restore it anytime from the Archived tab.`)) {
      softDeleteProperty(id)
      refresh()
    }
  }

  const handlePermanentDelete = (id: string, title: string) => {
    if (confirm(`PERMANENT ACTION: Are you sure you want to permanently delete "${title}"? This cannot be undone.`)) {
      deleteProperty(id)
      refresh()
    }
  }

  const handleRestore = (id: string) => {
    restoreProperty(id)
    refresh()
  }

  const handleDuplicate = (id: string) => {
    duplicateProperty(id)
    refresh()
  }

  const handleToggleFeatured = (id: string, current: boolean) => {
    updateProperty(id, { featured: !current })
    refresh()
  }

  const handleToggleHotDeal = (id: string, current: boolean) => {
    updateProperty(id, { is_hot_deal: !current })
    refresh()
  }

  // Bulk actions
  const handleSelectAll = (filteredList: typeof properties) => {
    if (selectedIds.length === filteredList.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredList.map((p) => p.id))
    }
  }

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleBulkMarkAsSold = () => {
    if (confirm(`Mark ${selectedIds.length} selected properties as Sold?`)) {
      selectedIds.forEach((id) => markPropertyAsSold(id))
      refresh()
    }
  }

  const handleBulkTrash = () => {
    if (confirm(`Move ${selectedIds.length} selected properties to Trash?`)) {
      selectedIds.forEach((id) => softDeleteProperty(id))
      refresh()
    }
  }

  const handleBulkRestore = () => {
    selectedIds.forEach((id) => restoreProperty(id))
    refresh()
  }

  const handleBulkToggleFeatured = () => {
    selectedIds.forEach((id) => {
      const prop = properties.find((p) => p.id === id)
      if (prop) updateProperty(id, { featured: !prop.featured })
    })
    refresh()
  }

  // Filter properties
  const filtered = properties.filter((p) => {
    // Tab condition
    const isDeleted = Boolean(p.deleted_at || p.status === 'hidden')
    if (activeTab === 'active' && isDeleted) return false
    if (activeTab === 'archived' && !isDeleted) return false

    // Dropdown filters
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    if (localityFilter !== 'all' && p.locality !== localityFilter) return false

    // Search query
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

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1
  const paginatedList = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const activeCount = properties.filter((p) => !p.deleted_at && p.status !== 'hidden').length
  const archivedCount = properties.filter((p) => p.deleted_at || p.status === 'hidden').length

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059]" />
            <span className="text-xs uppercase tracking-wider font-bold text-[#b38b42]">
              Inventory Management
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight mt-1">
            Properties & Listings
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Add new listings, update Indian pricing (Lakhs/Crores), toggle featured badges, or duplicate records.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* View mode toggle */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-[#c5a059] text-white font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {/* Tabs: Active vs Archived */}
      <div className="flex items-center gap-2 border-b border-stone-200">
        <button
          onClick={() => {
            setActiveTab('active')
            setCurrentPage(1)
            setSelectedIds([])
          }}
          className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'active'
              ? 'border-stone-900 text-stone-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Active Listings ({activeCount})
        </button>
        <button
          onClick={() => {
            setActiveTab('archived')
            setCurrentPage(1)
            setSelectedIds([])
          }}
          className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'archived'
              ? 'border-[#c5a059] text-[#b38b42]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Trash / Archived ({archivedCount})</span>
        </button>
      </div>

      {/* Filter, Search & Bulk Actions Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by title, project, locality..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl text-stone-700 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="sold">Sold Out</option>
              <option value="rented">Rented</option>
              <option value="under_negotiation">In Talks</option>
            </select>

            <select
              value={localityFilter}
              onChange={(e) => {
                setLocalityFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl text-stone-700 focus:outline-none"
            >
              <option value="all">All Localities</option>
              <option value="Panvel">Panvel</option>
              <option value="Kharghar">Kharghar</option>
              <option value="Kamothe">Kamothe</option>
              <option value="Taloja">Taloja</option>
              <option value="Seawoods">Seawoods</option>
              <option value="Belapur">Belapur</option>
              <option value="New Panvel">New Panvel</option>
              <option value="Kalamboli">Kalamboli</option>
              <option value="Ulwe">Ulwe</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Controls */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-stone-900 text-white rounded-xl text-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#c5a059]">{selectedIds.length}</span>
              <span>properties selected</span>
            </div>
            <div className="flex items-center gap-2">
              {activeTab === 'active' ? (
                <>
                  <button
                    onClick={handleBulkMarkAsSold}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                  >
                    Mark as Sold
                  </button>
                  <button
                    onClick={handleBulkToggleFeatured}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors"
                  >
                    Toggle Featured
                  </button>
                  <button
                    onClick={handleBulkTrash}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors"
                  >
                    Move to Trash
                  </button>
                </>
              ) : (
                <button
                  onClick={handleBulkRestore}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restore Selected
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content: Table or Grid */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-bold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4 w-10 text-center">
                    <button
                      onClick={() => handleSelectAll(paginatedList)}
                      className="cursor-pointer"
                      title="Select All on page"
                    >
                      {selectedIds.length === paginatedList.length && paginatedList.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-stone-900" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-400" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Type & Area</th>
                  <th className="py-3 px-4">Price (₹)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Featured / Hot</th>
                  <th className="py-3 px-4 text-center">Views / Leads</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                {paginatedList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-stone-400">
                      No matching properties found.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((prop) => {
                    const cover = prop.images.find((i) => i.is_cover)?.url || prop.images[0]?.url
                    const isSelected = selectedIds.includes(prop.id)
                    const isArchived = Boolean(prop.deleted_at || prop.status === 'hidden')

                    return (
                      <tr
                        key={prop.id}
                        className={`hover:bg-stone-50/80 transition-colors ${
                          isSelected ? 'bg-amber-50/40' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleSelectOne(prop.id)}
                            className="cursor-pointer"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-stone-900" />
                            ) : (
                              <Square className="w-4 h-4 text-stone-300 hover:text-stone-500" />
                            )}
                          </button>
                        </td>

                        {/* Property Thumbnail & Title */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-10 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                              {cover && (
                                <Image
                                  src={cover}
                                  alt={prop.title}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <div className="min-w-0">
                              <Link
                                href={`/property/${prop.slug}`}
                                target="_blank"
                                className="font-bold text-stone-900 hover:text-[#c5a059] block truncate max-w-[200px] sm:max-w-[280px]"
                              >
                                {prop.title}
                              </Link>
                              <span className="text-[11px] text-stone-400">
                                {prop.locality}, {prop.city}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Type & Area */}
                        <td className="py-3 px-4">
                          <span className="font-semibold text-stone-800 capitalize block">
                            {prop.bhk ? `${prop.bhk} BHK ` : ''}
                            {prop.property_type}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            {formatArea(prop.carpet_area, prop.area_unit)}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4 font-bold text-stone-900 whitespace-nowrap">
                          {formatIndianPrice(prop.price, prop.listing_type, prop.rent_period)}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <StatusBadge status={prop.status} />
                        </td>

                        {/* Featured & Hot Deal quick toggles */}
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleToggleFeatured(prop.id, prop.featured)}
                              title="Toggle Featured"
                              className={`p-1 rounded-lg text-xs font-bold transition-colors ${
                                prop.featured
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-stone-100 text-stone-400 hover:text-stone-600'
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
                                  : 'bg-stone-100 text-stone-400 hover:text-stone-600'
                              }`}
                            >
                              <Flame className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Stats */}
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <div className="text-[11px]">
                            <span className="font-bold text-stone-800">{prop.view_count}</span> views
                            <span className="text-stone-300 mx-1">•</span>
                            <span className="font-bold text-emerald-600">
                              {prop.whatsapp_click_count}
                            </span> chats
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1">
                            {!isArchived ? (
                              <>
                                <button
                                  onClick={() => handleMarkAsSold(prop.id, prop.title)}
                                  className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px] transition-colors"
                                  title="Mark as Sold with confirmation"
                                >
                                  Mark Sold
                                </button>

                                <Link
                                  href={`/property/${prop.slug}`}
                                  target="_blank"
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600"
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
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600"
                                  title="Duplicate Listing"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => handleSoftDelete(prop.id, prop.title)}
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                                  title="Move to Trash"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleRestore(prop.id)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-[11px]"
                                  title="Restore Property to Active"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Restore</span>
                                </button>

                                <button
                                  onClick={() => handlePermanentDelete(prop.id, prop.title)}
                                  className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700"
                                  title="Permanently Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedList.length === 0 ? (
            <div className="col-span-full py-12 text-center text-stone-400 bg-white rounded-3xl border border-stone-200">
              No matching properties found.
            </div>
          ) : (
            paginatedList.map((prop) => {
              const cover = prop.images.find((i) => i.is_cover)?.url || prop.images[0]?.url
              const isSelected = selectedIds.includes(prop.id)
              const isArchived = Boolean(prop.deleted_at || prop.status === 'hidden')

              return (
                <div
                  key={prop.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden p-3 space-y-3 relative ${
                    isSelected ? 'border-[#c5a059] ring-2 ring-[#c5a059]/20' : 'border-stone-200'
                  }`}
                >
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100">
                    {cover && (
                      <Image
                        src={cover}
                        alt={prop.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-2 left-2">
                      <button
                        onClick={() => toggleSelectOne(prop.id)}
                        className="p-1 rounded bg-black/60 text-white backdrop-blur-xs cursor-pointer"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#c5a059]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="absolute top-2 right-2">
                      <StatusBadge status={prop.status} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-stone-900 text-xs line-clamp-1">{prop.title}</h3>
                    <p className="text-[11px] text-stone-400">
                      {prop.locality}, {prop.city}
                    </p>
                    <p className="text-sm font-bold text-stone-900 mt-1">
                      {formatIndianPrice(prop.price, prop.listing_type, prop.rent_period)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    <span className="text-[10px] text-stone-500">
                      {prop.view_count} views • {prop.whatsapp_click_count} chats
                    </span>
                    <div className="flex items-center gap-1">
                      {!isArchived ? (
                        <>
                          <Link
                            href={`/admin/properties/${prop.id}/edit`}
                            className="p-1 rounded bg-sky-50 text-sky-700"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDuplicate(prop.id)}
                            className="p-1 rounded bg-stone-100 text-stone-600"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleSoftDelete(prop.id, prop.title)}
                            className="p-1 rounded bg-rose-50 text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleRestore(prop.id)}
                          className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold"
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200/90 text-xs text-stone-600">
        <div>
          Showing{' '}
          <span className="font-bold text-stone-900">
            {filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
          </span>{' '}
          to{' '}
          <span className="font-bold text-stone-900">
            {Math.min(currentPage * itemsPerPage, filtered.length)}
          </span>{' '}
          of <span className="font-bold text-stone-900">{filtered.length}</span> properties
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-stone-800">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

