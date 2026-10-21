'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminNavbar } from '@/components/admin/AdminNavbar'
import { getSiteSettings } from '@/lib/data/store'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (isLoginPage) {
    return <>{children}</>
  }

  const getPageTitle = (path: string) => {
    if (path === '/admin') return 'Dashboard Overview'
    if (path.startsWith('/admin/properties/new')) return 'Create New Property'
    if (path.includes('/edit')) return 'Edit Property'
    if (path.startsWith('/admin/properties')) return 'Manage Properties'
    if (path.startsWith('/admin/leads') || path.startsWith('/admin/enquiries')) return 'Leads & Enquiries Pipeline'
    if (path.startsWith('/admin/site-visits')) return 'Site Visits Schedule'
    if (path.startsWith('/admin/analytics')) return 'Analytics & Conversion'
    if (path.startsWith('/admin/settings')) return 'Site Customization & Branding'
    if (path.startsWith('/admin/team')) return 'Team & Agents Management'
    if (path.startsWith('/admin/guide')) return 'Broker Onboarding & Operations Guide'
    return 'Broker Portal'
  }

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-64">
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar
          title={getPageTitle(pathname)}
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <main className="p-4 sm:p-8 flex-1 overflow-x-hidden max-w-7xl w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
