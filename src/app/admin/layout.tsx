'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminNavbar } from '@/components/admin/AdminNavbar'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true)
      return
    }

    // Check if authenticated in localStorage or cookie
    const isAuthed =
      typeof window !== 'undefined' &&
      (localStorage.getItem('propertylink_auth') === 'true' ||
        document.cookie.includes('propertylink_auth=true'))

    if (!isAuthed) {
      setIsAuthenticated(false)
      router.replace('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [isLoginPage, router, pathname])

  if (isLoginPage) {
    return <>{children}</>
  }

  // Loading state while verifying auth
  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
        <span className="text-xs text-neutral-400 uppercase tracking-widest font-mono">
          Verifying Advisor Access...
        </span>
      </div>
    )
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
    if (path.startsWith('/admin/guide')) return 'Broker Operations Manual'
    return 'Broker Operations'
  }

  return (
    <div className="min-h-screen flex bg-neutral-100 text-neutral-900 selection:bg-black selection:text-white">
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
