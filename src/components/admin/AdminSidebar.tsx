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
  UserCheck,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  LogOut,
  BookOpen,
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
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
    { label: 'Team & Agents', href: '/admin/team', icon: UserCheck },
    { label: 'Broker Guide', href: '/admin/guide', icon: BookOpen },
  ]

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col justify-between border-r border-slate-900 shrink-0 min-h-screen">
      <div className="p-5 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#b38b42] to-[#c5a059] flex items-center justify-center text-[#0c0f14] font-black shadow-md font-serif text-lg">
            PL
          </div>
          <div className="overflow-hidden">
            <span className="font-bold text-white text-sm truncate block font-serif">
              {agencyName}
            </span>
            <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider flex items-center gap-1">
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#c5a059] text-[#0c0f14] font-bold shadow-md shadow-[#c5a059]/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0c0f14]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#0c0f14]/80" />}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Info & Public Site Link */}
      <div className="p-4 border-t border-slate-900 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
            View Public Site
          </span>
          <span className="text-[10px] text-slate-500 font-normal">Live ↗</span>
        </Link>

        <div className="pt-2 px-1 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Tenant: Apex Realty
          </span>
          <Link href="/admin/login" className="hover:text-slate-300">
            Sign out
          </Link>
        </div>
      </div>
    </aside>
  )
}
