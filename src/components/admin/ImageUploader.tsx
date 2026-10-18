'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Plus, Trash2, Star, Image as ImageIcon, ArrowUp, ArrowDown } from 'lucide-react'

export interface UploadedImage {
  id?: string
  url: string
  alt_text?: string | null
  display_order: number
  is_cover: boolean
}

interface ImageUploaderProps {
  images: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [newUrl, setNewUrl] = useState('')

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUrl.trim()) return

    const newImage: UploadedImage = {
      id: `img-${Date.now()}`,
      url: newUrl.trim(),
      alt_text: 'Property photo',
      display_order: images.length,
      is_cover: images.length === 0, // auto cover if first
    }

    onChange([...images, newImage])
    setNewUrl('')
  }

  const handleSetCover = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      is_cover: i === index,
    }))
    onChange(updated)
  }

  const handleDelete = (index: number) => {
    const updated = images.filter((_, i) => i !== index)
    // if deleted cover, assign first as cover
    if (updated.length > 0 && !updated.some((img) => img.is_cover)) {
      updated[0].is_cover = true
    }
    onChange(updated)
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= images.length) return

    const updated = [...images]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp

    // re-assign display orders
    updated.forEach((img, i) => {
      img.display_order = i
    })

    onChange(updated)
  }

  return (
    <div className="space-y-4">
      {/* Add Image URL bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Paste public image URL (or upload to Supabase storage)..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
          />
        </div>
        <button
          type="button"
          onClick={handleAddUrl}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Image</span>
        </button>
      </div>

      {/* Grid of Existing Images */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <div
              key={img.id || idx}
              className={`relative aspect-[16/10] rounded-2xl overflow-hidden border-2 bg-slate-100 group shadow-sm transition-all ${
                img.is_cover ? 'border-sky-600 ring-2 ring-sky-500/20' : 'border-slate-200'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt_text || `Photo ${idx + 1}`}
                fill
                sizes="200px"
                className="object-cover"
              />

              {/* Cover Badge */}
              {img.is_cover && (
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-sky-600 text-white text-[10px] font-bold shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Cover</span>
                </div>
              )}

              {/* Action Overlays */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-end gap-1">
                  {!img.is_cover && (
                    <button
                      type="button"
                      onClick={() => handleSetCover(idx)}
                      title="Set as Cover Photo"
                      className="p-1 rounded-lg bg-white/20 hover:bg-white text-white hover:text-slate-900 text-[10px] font-bold"
                    >
                      Make Cover
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    title="Delete Photo"
                    className="p-1 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex justify-between items-center text-white text-[10px]">
                  <span>Order: #{idx + 1}</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1 rounded bg-white/20 hover:bg-white/40 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1 rounded bg-white/20 hover:bg-white/40 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-2 bg-slate-50/50">
          <ImageIcon className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-xs text-slate-500 font-medium">
            No images uploaded yet. Paste image URLs above or configure Supabase storage bucket.
          </p>
        </div>
      )}
    </div>
  )
}
