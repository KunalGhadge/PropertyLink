'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, Compass, Search, Home, ArrowRight, MessageCircle, Phone, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/properties?search=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/properties')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between selection:bg-white selection:text-black relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f15_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Simple Brand Nav */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-neutral-900">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xs tracking-tight shadow-md">
            PL
          </div>
          <span className="font-semibold text-white tracking-tight text-sm">
            Apex Realty Panvel
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
      </header>

      {/* Main Interactive Error Presentation */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center space-y-8 flex-1 flex flex-col justify-center items-center">
        {/* Animated 404 Badge */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-2xl relative mx-auto group">
            <Compass className="w-10 h-10 text-neutral-300 animate-[spin_12s_linear_infinite]" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-400 animate-pulse border-2 border-neutral-950" />
          </div>
          <span className="text-7xl sm:text-9xl font-bold tracking-tighter text-neutral-800/80 select-none block -mt-4">
            404
          </span>
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-3 -mt-6">
          <h1 className="text-2xl sm:text-4xl font-normal text-white tracking-tight">
            Property Not Found or Relocated
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
            The listing or page you were seeking may have been sold, marked private, or moved to a new URL in our Navi Mumbai inventory.
          </p>
        </div>

        {/* Interactive Search Bar on 404 Page */}
        <form onSubmit={handleSearch} className="w-full max-w-md relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Panvel, Kharghar, 2 BHK, 3 BHK..."
            className="w-full pl-11 pr-24 py-3 bg-neutral-900 border border-neutral-800 rounded-2xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all shadow-lg"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-white hover:bg-neutral-200 text-black text-xs font-semibold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Nav Chips */}
        <div className="space-y-3 pt-2">
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
            Popular Verified Destinations
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/properties"
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs border border-neutral-800 transition-colors"
            >
              All 100+ Live Listings
            </Link>
            <Link
              href="/buy"
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs border border-neutral-800 transition-colors"
            >
              Buy Homes & Plots
            </Link>
            <Link
              href="/rent"
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs border border-neutral-800 transition-colors"
            >
              Verified Rentals
            </Link>
            <Link
              href="/about"
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs border border-neutral-800 transition-colors"
            >
              Broker Profile & MahaRERA
            </Link>
          </div>
        </div>

        {/* Direct Broker Escape Hatch */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>

          <a
            href="https://wa.me/919820012345?text=Hi%20Rajesh%2C%20I%20hit%20a%20broken%20link%20on%20Apex%20Realty.%20Can%20you%20help%20me%20find%20a%20property%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider border border-neutral-800 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Ask Broker on WhatsApp</span>
          </a>
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 border-t border-neutral-900 text-center text-xs text-neutral-400">
        <p>Apex Realty Panvel • MahaRERA Reg: A52000012345 • Sector 20, Roadpali, Kalamboli, Navi Mumbai</p>
      </footer>
    </div>
  )
}
