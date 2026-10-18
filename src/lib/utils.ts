import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format Indian Currency:
 * 18,500,000 => ₹1.85 Cr
 * 9,200,000  => ₹92 Lakh
 * 45,000     => ₹45,000 / month (if rent)
 */
export function formatIndianPrice(amount: number, listingType: string = 'sale', rentPeriod: string | null = 'monthly'): string {
  if (amount == null || isNaN(amount)) return 'Price on Request'
  if (amount === 0) return 'Price on Request'

  if (listingType === 'rent' || listingType === 'lease') {
    const period = rentPeriod === 'yearly' ? '/yr' : '/mo'
    if (amount >= 100000) {
      const lakh = (amount / 100000).toFixed(2).replace(/\.00$/, '')
      return `₹${lakh} L${period}`
    }
    return `₹${amount.toLocaleString('en-IN')}${period}`
  }

  if (amount >= 10000000) {
    const crore = (amount / 10000000).toFixed(2).replace(/\.00$/, '')
    return `₹${crore} Cr`
  }

  if (amount >= 100000) {
    const lakh = (amount / 100000).toFixed(2).replace(/\.00$/, '')
    return `₹${lakh} Lakh`
  }

  return `₹${amount.toLocaleString('en-IN')}`
}

/**
 * Format carpet or builtup area with unit
 */
export function formatArea(area: number, unit: string = 'sqft'): string {
  if (!area) return 'N/A'
  const formatted = area.toLocaleString('en-IN')
  return `${formatted} ${unit === 'sqmt' ? 'sq.m' : 'sq.ft.'}`
}

/**
 * Generate URL safe slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * Generate structured WhatsApp chat URL
 */
export function buildWhatsAppUrl(
  phone: string,
  params: {
    propertyTitle?: string
    price?: string
    location?: string
    propertyUrl?: string
    customMessage?: string
  }
): string {
  // Clean phone number: remove spaces, plus, hyphens
  const cleanPhone = phone.replace(/[^0-9]/g, '')
  
  let message = ''
  if (params.customMessage) {
    message = params.customMessage
  } else if (params.propertyTitle) {
    message = `Hi, I am interested in this property:\n\n*${params.propertyTitle}*\nPrice: ${params.price || 'N/A'}\nLocation: ${params.location || 'Navi Mumbai'}\nLink: ${params.propertyUrl || ''}\n\nPlease share the brochure, floor plan, and schedule a site visit.`
  } else {
    message = `Hi Apex Realty, I would like to inquire about properties in Panvel & Navi Mumbai. Please share available listings.`
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

/**
 * Format Indian Phone Number (+91 XXXXX XXXXX)
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '')
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  }
  return phone
}

/**
 * Format relative date (e.g. 2 days ago, Today, etc.)
 */
export function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
