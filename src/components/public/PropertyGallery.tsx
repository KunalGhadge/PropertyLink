'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, X, Play } from 'lucide-react'
import { PropertyImage } from '@/types'

interface PropertyGalleryProps {
  images: PropertyImage[]
  title: string
  videoUrl?: string | null
}

export function PropertyGallery({ images, title, videoUrl }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const activeImage = images[selectedIndex] || images[0]

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Extract YouTube embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/')
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/')
    }
    return url
  }

  return (
    <div className="space-y-3">
      {/* Main Image Banner */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-900 group shadow-lg">
        {activeImage && (
          <Image
            src={activeImage.url}
            alt={activeImage.alt_text || `${title} photo ${selectedIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 75vw"
            className="object-cover transition-transform duration-300 group-hover:scale-102"
          />
        )}

        {/* Gradient shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Prev / Next Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Actions: Photo counter, Video walkthrough button, Lightbox expand */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/10">
              {selectedIndex + 1} / {images.length} Photos
            </span>

            {videoUrl && (
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-600/90 text-white backdrop-blur-md hover:bg-rose-600 transition-colors shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Video Tour</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Open Fullscreen Lightbox"
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/90 hover:bg-white text-slate-900 backdrop-blur-md transition-colors shadow-md"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                selectedIndex === idx
                  ? 'border-[#c5a059] ring-2 ring-[#c5a059]/40 scale-102'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img.url}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md">
          {/* Header */}
          <div className="flex items-center justify-between text-white pb-4">
            <span className="font-semibold text-sm">
              {title} ({selectedIndex + 1}/{images.length})
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Fullscreen View */}
          <div className="relative flex-1 flex items-center justify-center my-auto">
            {activeImage && (
              <div className="relative max-w-5xl max-h-[75vh] w-full h-full">
                <Image
                  src={activeImage.url}
                  alt={title}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0 ${
                  selectedIndex === idx ? 'border-[#c5a059]' : 'border-transparent opacity-50'
                }`}
              >
                <Image src={img.url} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Video Tour Modal */}
      {isVideoModalOpen && videoUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={getEmbedUrl(videoUrl)}
              title="Property Walkthrough Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}
