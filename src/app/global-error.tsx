'use client'

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6 antialiased font-sans">
        <div className="max-w-md w-full bg-[#0e1014] border border-neutral-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-normal text-white">System Interrupted</h1>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              An unexpected application error occurred. Click reload to refresh your secure session.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="w-full py-3 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Application</span>
          </button>
        </div>
      </body>
    </html>
  )
}
