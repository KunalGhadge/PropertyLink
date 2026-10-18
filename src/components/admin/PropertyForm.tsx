'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { propertySchema, PropertyFormValues } from '@/lib/validations/property.schema'
import { PropertyWithImages } from '@/types'
import { ImageUploader, UploadedImage } from './ImageUploader'
import { slugify } from '@/lib/utils'
import { Save, ArrowLeft, Loader2, Sparkles, Flame, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

interface PropertyFormProps {
  initialData?: PropertyWithImages
  onSubmitSuccess: (data: PropertyFormValues) => void
  isEditing?: boolean
}

const ALL_AMENITIES = [
  'Swimming Pool',
  'Infinity Pool',
  'Gymnasium',
  'Clubhouse',
  'Children Play Area',
  'Covered Car Parking',
  '24x7 Security',
  'Power Backup',
  'High Speed Elevators',
  'EV Charging Station',
  'Landscaped Gardens',
  'Tennis Court',
  'Badminton Court',
  'Jogging Track',
  'Vastu Compliant',
  'Solar Water Heating',
  'Intercom Facility',
  'CCTV Surveillance',
]

export function PropertyForm({ initialData, onSubmitSuccess, isEditing = false }: PropertyFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<UploadedImage[]>(
    initialData?.images && initialData.images.length > 0
      ? initialData.images.map((img, i) => ({
          id: img.id,
          url: img.url,
          alt_text: img.alt_text,
          display_order: img.display_order ?? i,
          is_cover: img.is_cover ?? i === 0,
        }))
      : [
          {
            id: 'default-1',
            url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            alt_text: 'Living room view',
            display_order: 0,
            is_cover: true,
          },
        ]
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema) as any,
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          description: initialData.description || '',
          property_type: initialData.property_type,
          listing_type: initialData.listing_type,
          status: initialData.status,
          price: initialData.price,
          price_unit: initialData.price_unit,
          rent_period: initialData.rent_period,
          bhk: initialData.bhk,
          bathrooms: initialData.bathrooms || 1,
          balconies: initialData.balconies || 1,
          carpet_area: initialData.carpet_area,
          builtup_area: initialData.builtup_area,
          area_unit: initialData.area_unit,
          floor_number: initialData.floor_number,
          total_floors: initialData.total_floors,
          furnishing: initialData.furnishing,
          facing: initialData.facing || 'East',
          age_of_property: initialData.age_of_property || '0-1 years',
          possession_date: initialData.possession_date || 'Ready to Move',
          city: initialData.city,
          locality: initialData.locality,
          society_or_project: initialData.society_or_project || '',
          full_address: initialData.full_address || '',
          map_link: initialData.map_link || '',
          amenities: initialData.amenities || [],
          video_url: initialData.video_url || '',
          brochure_url: initialData.brochure_url || '',
          floor_plan_url: initialData.floor_plan_url || '',
          rera_number: initialData.rera_number || '',
          owner_name: initialData.owner_name || '',
          owner_phone: initialData.owner_phone || '',
          hide_owner_contact: initialData.hide_owner_contact ?? true,
          featured: initialData.featured ?? false,
          is_new: initialData.is_new ?? false,
          is_hot_deal: initialData.is_hot_deal ?? false,
          meta_title: initialData.meta_title || '',
          meta_description: initialData.meta_description || '',
          images: initialData.images || [],
        }
      : {
          title: '',
          slug: '',
          description: '',
          property_type: 'flat',
          listing_type: 'sale',
          status: 'available',
          price: 7500000,
          price_unit: 'lakh',
          rent_period: null,
          bhk: 2,
          bathrooms: 2,
          balconies: 1,
          carpet_area: 720,
          builtup_area: 960,
          area_unit: 'sqft',
          floor_number: 7,
          total_floors: 14,
          furnishing: 'unfurnished',
          facing: 'East',
          age_of_property: '0-1 years',
          possession_date: 'Ready to Move',
          city: 'Navi Mumbai',
          locality: 'Panvel',
          society_or_project: '',
          full_address: '',
          map_link: '',
          amenities: ['24x7 Security', 'Covered Car Parking', 'High Speed Elevators'],
          video_url: '',
          brochure_url: '',
          floor_plan_url: '',
          rera_number: 'MahaRERA: In Process',
          owner_name: '',
          owner_phone: '',
          hide_owner_contact: true,
          featured: false,
          is_new: true,
          is_hot_deal: false,
          meta_title: '',
          meta_description: '',
          images: [],
        },
  })

  const titleWatch = watch('title')

  const handleTitleBlur = () => {
    const currentSlug = watch('slug')
    if (!currentSlug && titleWatch) {
      setValue('slug', slugify(titleWatch))
    }
  }

  const selectedAmenities = watch('amenities') || []
  const toggleAmenity = (amenity: string) => {
    const next = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity]
    setValue('amenities', next)
  }

  const onSubmit = async (data: PropertyFormValues) => {
    setIsSubmitting(true)
    data.images = images
    try {
      onSubmitSuccess(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Properties</span>
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all active:scale-98 disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isEditing ? 'Save Changes' : 'Publish Property'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Core Info, Specifications, Media, Amenities */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Basic Information */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Basic Property Information
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Property Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Godrej Highland - 3 BHK Luxury Deck Residence"
                  {...register('title')}
                  onBlur={handleTitleBlur}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 font-medium"
                />
                {errors.title && <p className="text-xs text-rose-600 mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. godrej-highland-3-bhk-kharghar"
                  {...register('slug')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 font-mono text-xs"
                />
                {errors.slug && <p className="text-xs text-rose-600 mt-1">{errors.slug.message}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Full Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Detailed description of features, views, kitchen fittings, society amenities, and connectivity..."
                  {...register('description')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 leading-relaxed"
                />
                {errors.description && <p className="text-xs text-rose-600 mt-1">{errors.description.message}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Configurations */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Pricing & Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Listing Type
                </label>
                <select
                  {...register('listing_type')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="sale">For Sale (Outright)</option>
                  <option value="rent">For Rent</option>
                  <option value="lease">Commercial Lease</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Property Type
                </label>
                <select
                  {...register('property_type')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="flat">Apartment / Flat</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="villa">Row House / Villa</option>
                  <option value="plot">Plot / Land</option>
                  <option value="shop">Retail Shop</option>
                  <option value="office">Commercial Office</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Price in Rupees (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 8500000"
                  {...register('price')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                />
                {errors.price && <p className="text-xs text-rose-600 mt-1">{errors.price.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  BHK
                </label>
                <input
                  type="number"
                  {...register('bhk')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Carpet Area (sq.ft) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  {...register('carpet_area')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  {...register('bathrooms')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Balconies
                </label>
                <input
                  type="number"
                  {...register('balconies')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Floor
                </label>
                <input
                  type="number"
                  placeholder="e.g. 14"
                  {...register('floor_number')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Total Floors
                </label>
                <input
                  type="number"
                  placeholder="e.g. 28"
                  {...register('total_floors')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Furnishing
                </label>
                <select
                  {...register('furnishing')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi_furnished">Semi-Furnished</option>
                  <option value="fully_furnished">Fully Furnished</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Facing / Vastu
                </label>
                <select
                  {...register('facing')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="East">East</option>
                  <option value="North">North</option>
                  <option value="North-East">North-East</option>
                  <option value="West">West</option>
                  <option value="South">South</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Location Details */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Location & Society Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Locality / Sector <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kharghar, Panvel, Kamothe, Taloja..."
                  {...register('locality')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                  Society or Project Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Godrej Highland / Hiranandani Fortune City"
                  {...register('society_or_project')}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Full Physical Address
              </label>
              <input
                type="text"
                placeholder="Plot no, Sector, Landmark, Navi Mumbai PIN..."
                {...register('full_address')}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Google Maps Share Link
              </label>
              <input
                type="text"
                placeholder="https://maps.google.com/?q=..."
                {...register('map_link')}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
              />
            </div>
          </div>

          {/* Section 4: Property Images Manager */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Property Images & Media
            </h3>
            <ImageUploader images={images} onChange={setImages} />
          </div>

          {/* Section 5: Amenities Selector */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Amenities & Lifestyle Features
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ALL_AMENITIES.map((amenity) => {
                const checked = selectedAmenities.includes(amenity)
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all ${
                      checked
                        ? 'bg-sky-50 border-sky-400 text-sky-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {checked ? '✓ ' : '+ '}
                    {amenity}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Badges, Status, Owner Details, SEO */}
        <div className="lg:col-span-4 space-y-6">
          {/* Listing Status & Flags */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Status & Highlights
            </h3>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Listing Status
              </label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
              >
                <option value="available">Available (Public)</option>
                <option value="sold">Sold Out</option>
                <option value="rented">Rented</option>
                <option value="under_negotiation">Under Negotiation</option>
                <option value="hidden">Hidden / Draft</option>
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                />
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Mark as Featured on Homepage
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('is_hot_deal')}
                  className="w-4 h-4 rounded text-rose-500 focus:ring-rose-400"
                />
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  Mark as Hot Deal
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('is_new')}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400"
                />
                <span className="text-xs font-bold text-slate-800">
                  Mark as New Launch
                </span>
              </label>
            </div>
          </div>

          {/* Owner Details & Contact Visibility */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Owner Details (Private)
            </h3>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Owner Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Anand Mahindra"
                {...register('owner_name')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Owner Mobile Number
              </label>
              <input
                type="tel"
                placeholder="+91 98200 00000"
                {...register('owner_phone')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('hide_owner_contact')}
                  className="w-4 h-4 rounded text-sky-600 mt-0.5"
                />
                <span className="text-xs text-slate-700 leading-tight">
                  <strong>Hide owner phone from public site.</strong> All leads and inquiries will route directly to you (the broker).
                </span>
              </label>
            </div>
          </div>

          {/* RERA & Media Links */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Legal & Media URLs
            </h3>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                MahaRERA Number
              </label>
              <input
                type="text"
                placeholder="e.g. MahaRERA: P52000028754"
                {...register('rera_number')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                YouTube Walkthrough Video URL
              </label>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                {...register('video_url')}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
