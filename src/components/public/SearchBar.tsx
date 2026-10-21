'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Home, IndianRupee, Layers } from 'lucide-react'

interface SearchBarProps {
  initialType?: string
  initialListingType?: string
  initialLocality?: string
  initialBhk?: string
  initialBudget?: string
  className?: string
  variant?: 'hero' | 'compact'
}

export function SearchBar({
  initialType = 'all',
  initialListingType = 'sale',
  initialLocality = '',
  initialBhk = 'all',
  initialBudget = 'all',
  className = '',
  variant = 'hero',
}: SearchBarProps) {
  const router = useRouter()
  const [listingType, setListingType] = useState(initialListingType)
  const [locality, setLocality] = useState(initialLocality)
  const [bhk, setBhk] = useState(initialBhk)
  const [propertyType, setPropertyType] = useState(initialType)
  const [budgetRange, setBudgetRange] = useState(initialBudget)

  const localities = [
    { label: 'All Localities in Navi Mumbai', value: '' },
    { label: 'Panvel', value: 'Panvel' },
    { label: 'Kharghar', value: 'Kharghar' },
    { label: 'Kamothe', value: 'Kamothe' },
    { label: 'Taloja Phase 1 & 2', value: 'Taloja' },
    { label: 'Seawoods & Nerul', value: 'Seawoods' },
    { label: 'CBD Belapur', value: 'Belapur' },
    { label: 'New Panvel', value: 'New Panvel' },
    { label: 'Ulwe', value: 'Ulwe' },
  ]

  const budgetOptions = [
    { label: 'Any Budget', value: 'all' },
    { label: 'Under ₹50 Lakh', value: '0-5000000' },
    { label: '₹50 Lakh - ₹1 Crore', value: '5000000-10000000' },
    { label: '₹1 Crore - ₹2 Crore', value: '10000000-20000000' },
    { label: '₹2 Crore+', value: '20000000-100000000' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (listingType && listingType !== 'all') params.set('listing_type', listingType)
    if (locality) params.set('locality', locality)
    if (bhk && bhk !== 'all') params.set('bhk', bhk)
    if (propertyType && propertyType !== 'all') params.set('property_type', propertyType)

    if (budgetRange && budgetRange !== 'all') {
      const [min, max] = budgetRange.split('-')
      if (min) params.set('min_price', min)
      if (max) params.set('max_price', max)
    }

    router.push(`/properties?${params.toString()}`)
  }

  return (
    <div
      className={`w-full bg-white rounded-2xl md:rounded-3xl shadow-sm border border-neutral-200 p-4 sm:p-6 ${className}`}
    >
      {/* Buy / Rent Switch Tabs */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setListingType('sale')}
          className={`px-5 sm:px-7 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
            listingType === 'sale'
              ? 'bg-black text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Buy Property
        </button>
        <button
          type="button"
          onClick={() => setListingType('rent')}
          className={`px-5 sm:px-7 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
            listingType === 'rent'
              ? 'bg-black text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Rent Flat / Shop
        </button>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
        {/* Locality Dropdown */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            Location
          </label>
          <div className="relative">
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full bg-neutral-50/70 hover:bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:border-black transition-all cursor-pointer shadow-xs"
            >
              {localities.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* BHK Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-neutral-400" />
            BHK Config
          </label>
          <select
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            className="w-full bg-neutral-50/70 hover:bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:border-black transition-all cursor-pointer shadow-xs"
          >
            <option value="all">Any BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK / Penthouse</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-neutral-50/70 hover:bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:border-black transition-all cursor-pointer shadow-xs"
          >
            <option value="all">All Types</option>
            <option value="flat">Apartment / Flat</option>
            <option value="penthouse">Penthouse</option>
            <option value="villa">Row House / Villa</option>
            <option value="plot">Plot / Land</option>
            <option value="shop">Retail Shop</option>
            <option value="office">Commercial Office</option>
          </select>
        </div>

        {/* Budget Range */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5 text-neutral-400" />
            Budget Range
          </label>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full bg-neutral-50/70 hover:bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:border-black transition-all cursor-pointer shadow-xs"
          >
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search CTA */}
        <div>
          <button
            type="submit"
            className="w-full h-[42px] sm:h-[44px] flex items-center justify-center gap-2 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white font-medium text-sm shadow-xs active:scale-98 transition-all duration-150 cursor-pointer"
          >
            <Search className="w-4 h-4 shrink-0 text-white" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  )
}
