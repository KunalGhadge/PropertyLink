import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FlowArtSection } from '@/components/public/FlowArtSection'

export const metadata = {
  title: 'Flow Art Showcase | VEX Real Estate',
  description: 'Interactive pin-on-scroll 30° rotation experience with Bebas Neue typography.',
}

export default function FlowArtStandalonePage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Top Floating Navigation */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider transition-all border border-white/20 shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/70 text-[11px] uppercase tracking-widest border border-white/10">
          Flow Art Interactive Demo
        </span>
      </div>

      {/* Main FlowArt Component */}
      <FlowArtSection />
    </div>
  )
}
