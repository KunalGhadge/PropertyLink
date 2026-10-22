'use client'

import React, { useState, useEffect } from 'react'
import { WifiOff, Wifi, RefreshCw, X } from 'lucide-react'

export function OfflineNotice() {
  const [isOffline, setIsOffline] = useState(false)
  const [wasOffline, setWasOffline] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    setIsOffline(!navigator.onLine)

    const handleOnline = () => {
      setIsOffline(false)
      setWasOffline(true)
      setDismissed(false)
      const timer = setTimeout(() => {
        setWasOffline(false)
      }, 4000)
      return () => clearTimeout(timer)
    }

    const handleOffline = () => {
      setIsOffline(true)
      setWasOffline(false)
      setDismissed(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const checkConnection = async () => {
    setIsChecking(true)
    try {
      // Ping favicon or api health with cache busting
      await fetch('/favicon.ico?t=' + Date.now(), { method: 'HEAD', cache: 'no-store' })
      setIsOffline(false)
      setWasOffline(true)
      setTimeout(() => setWasOffline(false), 3000)
    } catch {
      setIsOffline(true)
    } finally {
      setIsChecking(false)
    }
  }

  // 1. Back online flash notification
  if (wasOffline && !isOffline) {
    return (
      <aside
        aria-label="Network status notification"
        className="fixed bottom-6 right-6 z-[9998] max-w-sm bg-neutral-950 text-white border border-emerald-500/30 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 backdrop-blur-md"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <Wifi className="w-4 h-4 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white">Connection Restored</p>
          <p className="text-[11px] text-neutral-400">Live property inventory & WhatsApp ready.</p>
        </div>
      </aside>
    )
  }

  // 2. Offline banner
  if (isOffline && !dismissed) {
    return (
      <aside
        aria-label="Offline status banner"
        className="fixed bottom-6 right-6 left-6 sm:left-auto z-[9998] sm:max-w-md bg-neutral-950/95 text-white border border-amber-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <WifiOff className="w-4 h-4" />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white tracking-tight flex items-center gap-2">
                <span>Offline Mode</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              </span>
              <button
                onClick={() => setDismissed(true)}
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
              No internet connection detected. You can still view loaded properties and cached listings.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={checkConnection}
                disabled={isChecking}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-[11px] font-semibold hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin' : ''}`} />
                <span>{isChecking ? 'Checking...' : 'Check Connection'}</span>
              </button>
              <span className="text-[10px] text-neutral-400">Auto-retries on reconnect</span>
            </div>
          </div>
        </div>
      </aside>
    )
  }

  return null
}
