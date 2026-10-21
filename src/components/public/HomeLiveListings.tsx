'use client'

import React, { useState, useMemo, useTransition } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown, MessageCircle, RotateCcw, Building2, Flame } from 'lucide-react'
import { PropertyWithImages } from '@/types'
import { PropertyCard } from './PropertyCard'
import { WhatsAppButton } from './WhatsAppButton'

interface HomeLiveListingsProps {
  initialProperties: PropertyWithImages[]
}

const ITEMS_PER_PAGE = 6

export function HomeLiveListings({ initialProperties }: HomeLiveListingsProps) {
  const [isPending, startTransition] = useTransition()

  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [listingType, setListingType] = useState<string>('all')
  const [locality, setLocality] = useState<string>('all')
  const [propertyType, setPropertyType] = useState<string>('all')
  const [bhk, setBhk] = useState<string>('all')
  const [budgetRange, setBudgetRange] = useState<string>('all')
  const [furnishing, setFurnishing] = useState<string>('all')
  const [status, setStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE)
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false)

  // Localities list derived from properties
  const localities = useMemo(() => {
    const set = new Set(initialProperties.map((p) => p.locality))
    return ['all', ...Array.from(set)]
  }, [initialProperties])

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    return initialProperties.filter((p) => {
      // 1. Search term (society, project, locality, title, keyword)
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase()
        const matchesTitle = p.title.toLowerCase().includes(q)
        const matchesLocality = p.locality.toLowerCase().includes(q)
        const matchesSociety = p.society_or_project?.toLowerCase().includes(q)
        const matchesDesc = p.description?.toLowerCase().includes(q)
        if (!matchesTitle && !matchesLocality && !matchesSociety && !matchesDesc) {
          return false
        }
      }

      // 2. Buy / Rent
      if (listingType !== 'all' && p.listing_type !== listingType) {
        return false
      }

      // 3. Location
      if (locality !== 'all' && p.locality.toLowerCase() !== locality.toLowerCase()) {
        return false
      }

      // 4. Property Type
      if (propertyType !== 'all' && p.property_type !== propertyType) {
        return false
      }

      // 5. BHK
      if (bhk !== 'all') {
        if (bhk === '4+' && (p.bhk || 0) < 4) return false
        if (bhk !== '4+' && p.bhk !== Number(bhk)) return false
      }

      // 6. Budget
      if (budgetRange !== 'all') {
        const [minStr, maxStr] = budgetRange.split('-')
        const min = minStr ? Number(minStr) : 0
        const max = maxStr ? Number(maxStr) : Infinity
        if (p.price < min || p.price > max) return false
      }

      // 7. Furnishing
      if (furnishing !== 'all' && p.furnishing !== furnishing) {
        return false
      }

      // 8. Status
      if (status !== 'all' && p.status !== status) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price
      if (sortBy === 'price_desc') return b.price - a.price
      // default: newest
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }, [
    initialProperties,
    searchTerm,
    listingType,
    locality,
    propertyType,
    bhk,
    budgetRange,
    furnishing,
    status,
    sortBy,
  ])

  const paginatedProperties = filteredProperties.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProperties.length

  const handleReset = () => {
    startTransition(() => {
      setSearchTerm('')
      setListingType('all')
      setLocality('all')
      setPropertyType('all')
      setBhk('all')
      setBudgetRange('all')
      setFurnishing('all')
      setStatus('all')
      setSortBy('newest')
      setVisibleCount(ITEMS_PER_PAGE)
    })
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
  }

  return (
    <section id="listings" className="py-16 sm:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 text-xs font-semibold uppercase tracking-wider mb-2 border border-neutral-200">
              <Building2 className="w-3.5 h-3.5" />
              <span>Direct Broker Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-black tracking-tight">
              Live Property Discovery
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light mt-1 max-w-xl">
              Filter by budget, locality, and configuration to find your ideal residence or investment.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700">
              Showing <strong className="text-black font-semibold">{filteredProperties.length}</strong> {filteredProperties.length === 1 ? 'property' : 'properties'}
            </span>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold py-2 px-3.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 shadow-sm transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-black" />
              <span>{showAdvanced ? 'Hide Filters' : 'More Filters'}</span>
            </button>
          </div>
        </div>

        {/* Primary Filter Bar */}
        <div className="bg-neutral-50/70 p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-sm space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Society, project, or landmark..."
                value={searchTerm}
                onChange={(e) => {
                  startTransition(() => {
                    setSearchTerm(e.target.value)
                    setVisibleCount(ITEMS_PER_PAGE)
                  })
                }}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Buy / Rent Toggle */}
            <select
              value={listingType}
              onChange={(e) => {
                startTransition(() => {
                  setListingType(e.target.value)
                  setVisibleCount(ITEMS_PER_PAGE)
                })
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="all">Buy & Rent (All)</option>
              <option value="sale">For Sale (Buy)</option>
              <option value="rent">For Rent</option>
            </select>

            {/* Locality Dropdown */}
            <select
              value={locality}
              onChange={(e) => {
                startTransition(() => {
                  setLocality(e.target.value)
                  setVisibleCount(ITEMS_PER_PAGE)
                })
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="all">All Localities</option>
              {localities.filter((loc) => loc !== 'all').map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <select
                value={sortBy}
                onChange={(e) => {
                  startTransition(() => {
                    setSortBy(e.target.value)
                  })
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Expandable Row */}
          {showAdvanced && (
            <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* BHK */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">BHK Config</label>
                <select
                  value={bhk}
                  onChange={(e) => {
                    startTransition(() => {
                      setBhk(e.target.value)
                      setVisibleCount(ITEMS_PER_PAGE)
                    })
                  }}
                  className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                >
                  <option value="all">Any BHK</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4+">4+ BHK / Penthouse</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Budget</label>
                <select
                  value={budgetRange}
                  onChange={(e) => {
                    startTransition(() => {
                      setBudgetRange(e.target.value)
                      setVisibleCount(ITEMS_PER_PAGE)
                    })
                  }}
                  className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                >
                  <option value="all">Any Budget</option>
                  <option value="0-5000000">Under ₹50 Lakh</option>
                  <option value="5000000-10000000">₹50 Lakh - ₹1 Cr</option>
                  <option value="10000000-20000000">₹1 Cr - ₹2 Cr</option>
                  <option value="20000000-100000000">Above ₹2 Cr</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => {
                    startTransition(() => {
                      setPropertyType(e.target.value)
                      setVisibleCount(ITEMS_PER_PAGE)
                    })
                  }}
                  className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                >
                  <option value="all">All Types</option>
                  <option value="flat">Apartment / Flat</option>
                  <option value="villa">Villa / Independent</option>
                  <option value="plot">Residential Plot</option>
                  <option value="shop">Retail Shop</option>
                  <option value="office">Commercial Office</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>

              {/* Furnishing */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Furnishing</label>
                <select
                  value={furnishing}
                  onChange={(e) => {
                    startTransition(() => {
                      setFurnishing(e.target.value)
                      setVisibleCount(ITEMS_PER_PAGE)
                    })
                  }}
                  className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                >
                  <option value="all">Any Furnishing</option>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi_furnished">Semi-Furnished</option>
                  <option value="fully_furnished">Fully Furnished</option>
                </select>
              </div>
            </div>
          )}

          {/* Active Filter Chips & Reset */}
          {(searchTerm || listingType !== 'all' || locality !== 'all' || propertyType !== 'all' || bhk !== 'all' || budgetRange !== 'all' || furnishing !== 'all' || status !== 'all') && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Filters Active</span>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-[#b38b42] hover:text-[#0c0f14] font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Listings Grid or Loading / Empty States */}
        {isPending ? (
          /* Skeleton Loader */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm animate-pulse">
                <div className="aspect-[16/10] bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-10 bg-slate-100 rounded-xl" />
                  <div className="h-8 bg-slate-200 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-dashed border-neutral-300 p-8 sm:p-14 text-center space-y-4 max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-neutral-100 text-black flex items-center justify-center mx-auto">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-normal text-black tracking-tight">
              No matching properties right now
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              We frequently receive unlisted developer launches and private resale inventory that match custom requirements. Connect directly with Rajesh Sharma on WhatsApp.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <WhatsAppButton
                phone="+91 98201 23456"
                customMessage="Hi Rajesh, I am looking for a property in Navi Mumbai with specific requirements. Could you please share relevant options?"
                label="Inquire on WhatsApp"
                size="md"
                className="w-full sm:w-auto"
              />
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-colors w-full sm:w-auto cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          /* Properties Grid */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedProperties.map((prop, idx) => (
                <PropertyCard key={prop.id} property={prop} priority={idx < 3} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-medium text-xs uppercase tracking-wider shadow-sm transition-all active:scale-98 cursor-pointer"
                >
                  <span>Load More Properties ({filteredProperties.length - visibleCount} remaining)</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
