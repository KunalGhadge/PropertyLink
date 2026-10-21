'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, RotateCcw, X } from 'lucide-react'

interface FilterSidebarProps {
  onCloseMobile?: () => void
  totalCount?: number
  defaultListingType?: string
}

const COMMON_AMENITIES = [
  'Swimming Pool',
  'Gymnasium',
  'Covered Car Parking',
  'Clubhouse',
  'Children Play Area',
  '24x7 Security',
  'EV Charging Station',
  'Power Backup',
  'Golf Course View',
]

export function FilterSidebar({ onCloseMobile, totalCount, defaultListingType }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [listingType, setListingType] = useState(
    searchParams.get('listing_type') || defaultListingType || 'all'
  )
  const [propertyType, setPropertyType] = useState(searchParams.get('property_type') || 'all')
  const [bhk, setBhk] = useState(searchParams.get('bhk') || 'all')
  const [locality, setLocality] = useState(searchParams.get('locality') || 'all')
  const [furnishing, setFurnishing] = useState(searchParams.get('furnishing') || 'all')
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')
  const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || '')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.getAll('amenities') || []
  )

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (query.trim()) params.set('query', query.trim())
    if (listingType !== 'all') params.set('listing_type', listingType)
    if (propertyType !== 'all') params.set('property_type', propertyType)
    if (bhk !== 'all') params.set('bhk', bhk)
    if (locality !== 'all' && locality.trim()) params.set('locality', locality)
    if (furnishing !== 'all') params.set('furnishing', furnishing)
    if (sort !== 'newest') params.set('sort', sort)
    if (minPrice) params.set('min_price', minPrice)
    if (maxPrice) params.set('max_price', maxPrice)

    selectedAmenities.forEach((a) => params.append('amenities', a))

    const targetUrl = defaultListingType === 'rent' ? '/rent' : defaultListingType === 'sale' ? '/buy' : '/properties'
    router.push(`${targetUrl}?${params.toString()}`)
    if (onCloseMobile) onCloseMobile()
  }

  const resetFilters = () => {
    setQuery('')
    setListingType(defaultListingType || 'all')
    setPropertyType('all')
    setBhk('all')
    setLocality('all')
    setFurnishing('all')
    setSort('newest')
    setMinPrice('')
    setMaxPrice('')
    setSelectedAmenities([])
    const targetUrl = defaultListingType === 'rent' ? '/rent' : defaultListingType === 'sale' ? '/buy' : '/properties'
    router.push(targetUrl)
    if (onCloseMobile) onCloseMobile()
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-black" />
          <h2 className="font-sans font-bold text-black text-base tracking-tight">Filters</h2>
          {totalCount !== undefined && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 font-bold">
              {totalCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-black transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Keyword Search */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
          Search Keyword
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Godrej, Sai Crystal, Golf..."
          className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black"
        />
      </div>

      {/* Buy / Rent Pills */}
      {!defaultListingType && (
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
            Listing Purpose
          </label>
          <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-1 rounded-xl">
            {[
              { label: 'All', value: 'all' },
              { label: 'Buy', value: 'sale' },
              { label: 'Rent', value: 'rent' },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setListingType(item.value)}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  listingType === item.value
                    ? 'bg-black text-white shadow-xs font-bold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* BHK Config Pills */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
          Configuration (BHK)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {['all', '1', '2', '3', '4'].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setBhk(val)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                bhk === val
                  ? 'bg-black text-white border-black shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {val === 'all' ? 'Any' : val === '4' ? '4+ BHK' : `${val} BHK`}
            </button>
          ))}
        </div>
      </div>

      {/* Locality */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
          Locality
        </label>
        <select
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-medium text-black"
        >
          <option value="all">All Localities</option>
          <option value="Panvel">Panvel</option>
          <option value="Kharghar">Kharghar</option>
          <option value="Kamothe">Kamothe</option>
          <option value="Taloja">Taloja</option>
          <option value="Seawoods">Seawoods</option>
          <option value="Belapur">CBD Belapur</option>
          <option value="New Panvel">New Panvel</option>
          <option value="Ulwe">Ulwe</option>
          <option value="Kalamboli">Kalamboli</option>
        </select>
      </div>

      {/* Property Type Pills */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
          Property Type
        </label>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-medium text-black"
        >
          <option value="all">All Types</option>
          <option value="flat">Apartments / Flats</option>
          <option value="penthouse">Penthouses</option>
          <option value="villa">Row Houses / Villas</option>
          <option value="plot">Plots / Land</option>
          <option value="shop">Retail Shops</option>
          <option value="office">Commercial Offices</option>
        </select>
      </div>

      {/* Budget Min / Max */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
          Budget Range (₹)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min (e.g. 4000000)"
            className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max (e.g. 15000000)"
            className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black"
          />
        </div>
      </div>

      {/* Furnishing */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
          Furnishing
        </label>
        <select
          value={furnishing}
          onChange={(e) => setFurnishing(e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-medium text-black"
        >
          <option value="all">Any Furnishing</option>
          <option value="unfurnished">Unfurnished</option>
          <option value="semi_furnished">Semi-Furnished</option>
          <option value="fully_furnished">Fully Furnished</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
          Sort By
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-medium text-black"
        >
          <option value="newest">Newest Listed</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popular">Most Viewed</option>
        </select>
      </div>

      {/* Amenities Multi-Check */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
          Amenities
        </label>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {COMMON_AMENITIES.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer hover:text-black"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="w-4 h-4 rounded text-black focus:ring-black border-neutral-300"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={applyFilters}
          className="w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}
