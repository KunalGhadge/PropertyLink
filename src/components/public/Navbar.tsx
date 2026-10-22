'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, MessageCircle, Menu, X, ChevronDown, PlusCircle } from 'lucide-react'
import { SiteSettings } from '@/types'
import { WhatsAppButton } from './WhatsAppButton'

interface NavbarProps {
  settings?: SiteSettings
}

export function Navbar({ settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const brandName = settings?.brand_name || 'PROPERTYLINK'
  const phoneNumber = settings?.phone_number || '+91 98201 23456'
  const whatsappNumber = settings?.whatsapp_number || '+91 98201 23456'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-neutral-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo in Clean Architectural Sans */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-black uppercase">
              {brandName}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-800">
            <Link
              href="/properties"
              className="hover:text-black font-medium transition-colors flex items-center gap-1"
            >
              <span>Properties</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </Link>
            <Link
              href="/buy"
              className="hover:text-black font-medium transition-colors"
            >
              Buy
            </Link>
            <Link
              href="/rent"
              className="hover:text-black font-medium transition-colors"
            >
              Rent
            </Link>
            <Link
              href="/about"
              className="hover:text-black font-medium transition-colors"
            >
              Company
            </Link>
            <Link
              href="/contact"
              className="hover:text-black font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action CTAs: Call / WhatsApp */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-black text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Book a Call</span>
            </a>

            <WhatsAppButton
              phone={whatsappNumber}
              size="sm"
              label="WhatsApp"
              className="shadow-xs"
            />
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <WhatsAppButton phone={whatsappNumber} size="sm" variant="icon" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white text-black border-b border-neutral-200 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-sm">
            <Link
              href="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-neutral-100 font-medium text-black"
            >
              Explore Properties
            </Link>
            <Link
              href="/buy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-neutral-100 font-medium text-black"
            >
              Buy Homes & Plots
            </Link>
            <Link
              href="/rent"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-neutral-100 font-medium text-black"
            >
              Rent Verified Properties
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-neutral-100 font-medium text-black"
            >
              About Broker & MahaRERA
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 font-medium text-black"
            >
              Contact & Office Location
            </Link>
          </nav>

          <div className="pt-4 border-t border-neutral-200 space-y-2.5">
            <a
              href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-black text-white text-xs font-semibold uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              <span>Call Broker: {phoneNumber}</span>
            </a>
            <WhatsAppButton
              phone={whatsappNumber}
              size="md"
              label="Chat on WhatsApp"
              className="w-full justify-center"
            />
            <div className="pt-2 text-center">
              <Link
                href="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs text-neutral-500 hover:text-black font-medium"
              >
                Advisor Login →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
