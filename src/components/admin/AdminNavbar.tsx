'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, ExternalLink, Bell, Search, Menu } from 'lucide-react'

interface AdminNavbarProps {
  title?: string
  onMenuToggle?: () => void
}

export function AdminNavbar({ title = 'Overview', onMenuToggle }: AdminNavbarProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Title & Mobile Menu Trigger */}
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Add Property Button */}
        <Link
          href="/admin/properties/new"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#c5a059] hover:bg-[#b38b42] text-[#0c0f14] font-bold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Property</span>
        </Link>

        {/* Public Site Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          <span>View Site</span>
        </Link>

        {/* Broker Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-slate-300">
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
              alt="Rajesh Sharma"
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              Rajesh Sharma
            </span>
            <span className="text-[10px] text-slate-500 block leading-tight">
              Broker Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
