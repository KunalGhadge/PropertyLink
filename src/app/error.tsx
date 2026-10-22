'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, MessageCircle, ShieldCheck } from 'lucide-react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console or error reporter
    console.error('App runtime error caught by boundary:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between selection:bg-white selection:text-black relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f15_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-neutral-900">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xs tracking-tight shadow-md">
            PL
          </div>
          <span className="font-semibold text-white tracking-tight text-sm">
            Apex Realty Panvel
          </span>
        </Link>

        <span className="text-[11px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
          <span>System Protected</span>
        </span>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-xl mx-auto px-6 py-16 text-center space-y-6 flex-1 flex flex-col justify-center items-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-2xl relative mx-auto">
          <AlertTriangle className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
            Unexpected Interruption
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-md mx-auto">
            We experienced a brief hiccup while rendering this section. Your session and data are secure.
          </p>
        </div>

        {error.digest && (
          <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-[11px] font-mono text-neutral-400 max-w-sm w-full truncate">
            Error Ref: {error.digest}
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-md cursor-pointer active:scale-98"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider border border-neutral-800 transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        <div className="pt-4">
          <a
            href="https://wa.me/919820012345?text=Hi%20Rajesh%2C%20I%20hit%20an%20unexpected%20error%20on%20the%20website.%20Please%20assist%20me."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Notify Broker directly on WhatsApp</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 border-t border-neutral-900 text-center text-xs text-neutral-400">
        <p>Apex Realty Panvel • Support: +91 98200 12345</p>
      </footer>
    </div>
  )
}
