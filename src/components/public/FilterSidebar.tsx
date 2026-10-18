'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, RotateCcw, X } from 'lucide-react'

interface FilterSidebarProps {
  onCloseMobile?: () => void
  totalCount?: number
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

export function FilterSidebar({ onCloseMobile, totalCount }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [listingType, setListingType] = useState(searchParams.get('listing_type') || 'all')
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

    router.push(`/properties?${params.toString()}`)
    if (onCloseMobile) onCloseMobile()
  }

  const resetFilters = () => {
    setQuery('')
    setListingType('all')
    setPropertyType('all')
    setBhk('all')
    setLocality('all')
    setFurnishing('all')
    setSort('newest')
    setMinPrice('')
    setMaxPrice('')
    setSelectedAmenities([])
    router.push('/properties')
    if (onCloseMobile) onCloseMobile()
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-sky-600" />
          <h2 className="font-bold text-slate-900 text-base">Filters</h2>
          {totalCount !== undefined && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
              {totalCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Keyword Search */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Search Keyword
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Godrej, Central Park, 3 BHK..."
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Buy / Rent */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Listing Type
        </label>
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
          {[
            { label: 'All', value: 'all' },
            { label: 'Buy', value: 'sale' },
            { label: 'Rent', value: 'rent' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setListingType(item.value)}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                listingType === item.value
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* BHK Config */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          BHK Config
        </label>
        <div className="flex flex-wrap gap-1.5">
          {['all', '1', '2', '3', '4'].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setBhk(val)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                bhk === val
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {val === 'all' ? 'Any BHK' : val === '4' ? '4+ BHK' : `${val} BHK`}
            </button>
          ))}
        </div>
      </div>

      {/* Locality */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Locality
        </label>
        <select
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
        >
          <option value="all">All Localities</option>
          <option value="Panvel">Panvel</option>
          <option value="Kharghar">Kharghar</option>
          <option value="Kamothe">Kamothe</option>
          <option value="Taloja">Taloja</option>
          <option value="Seawoods">Seawoods</option>
          <option value="Belapur">CBD Belapur</option>
          <option value="New Panvel">New Panvel</option>
        </select>
      </div>

      {/* Budget Min / Max */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Budget Range (₹)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min (e.g. 4000000)"
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max (e.g. 15000000)"
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Furnishing */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Furnishing
        </label>
        <select
          value={furnishing}
          onChange={(e) => setFurnishing(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
        >
          <option value="all">Any Furnishing</option>
          <option value="unfurnished">Unfurnished</option>
          <option value="semi_furnished">Semi-Furnished</option>
          <option value="fully_furnished">Fully Furnished</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Sort By
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
        >
          <option value="newest">Newest Listed</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popular">Most Viewed</option>
        </select>
      </div>

      {/* Amenities Multi-Check */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Amenities
        </label>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {COMMON_AMENITIES.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
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
          className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}
