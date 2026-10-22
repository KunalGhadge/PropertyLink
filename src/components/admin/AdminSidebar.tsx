'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  Users2,
  Calendar,
  BarChart3,
  Settings,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  LogOut,
  BookOpen,
  UserCheck,
} from 'lucide-react'

interface AdminSidebarProps {
  agencyName?: string
  brandLogo?: string | null
}

export function AdminSidebar({
  agencyName = 'Apex Realty Panvel',
}: AdminSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Properties', href: '/admin/properties', icon: Building2 },
    { label: 'Enquiries', href: '/admin/enquiries', icon: Users2 },
    { label: 'Site Visits', href: '/admin/site-visits', icon: Calendar },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Team & Agents', href: '/admin/team', icon: UserCheck },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
    { label: 'Broker Guide', href: '/admin/guide', icon: BookOpen },
  ]

  return (
    <aside className="w-64 bg-neutral-950 text-neutral-400 flex flex-col justify-between border-r border-neutral-900 shrink-0 sticky top-0 h-screen overflow-y-auto">
      <div className="p-5 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-neutral-900">
          <div className="w-9 h-9 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-xs tracking-tight shadow-sm shrink-0">
            PL
          </div>
          <div className="overflow-hidden">
            <span className="font-semibold text-white text-sm truncate block tracking-tight">
              {agencyName}
            </span>
            <span className="text-[10px] uppercase font-medium text-neutral-400 tracking-wider flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Broker Operations
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-xs'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/80 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Info & Public Site Link */}
      <div className="p-4 border-t border-neutral-900 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-medium transition-colors border border-neutral-800/80"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            View Public Site
          </span>
          <span className="text-[10px] text-neutral-500 font-normal">Live ↗</span>
        </Link>

        <div className="pt-2 px-1 flex items-center justify-between text-[11px] text-neutral-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Apex Realty
          </span>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('propertylink_auth')
                document.cookie = 'propertylink_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
              }
              window.location.href = '/admin/login'
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  )
}
