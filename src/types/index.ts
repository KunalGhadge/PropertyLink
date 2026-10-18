import { Database } from './database.types'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']> = Database['public'][T]

export type Agency = Tables<'agencies'>
export type Profile = Tables<'profiles'>
export type Agent = Tables<'agents'>
export type PropertyRow = Tables<'properties'>
export type PropertyImage = Tables<'property_images'>
export type Lead = Tables<'leads'>
export type SiteVisit = Tables<'site_visits'>
export type Testimonial = Tables<'testimonials'>
export type SiteSettings = Tables<'site_settings'>
export type AnalyticsEvent = Tables<'analytics_events'>
export type AuditLog = Tables<'audit_logs'>

// Property with joined images and agent
export interface PropertyWithImages extends PropertyRow {
  images: PropertyImage[]
  agent?: Agent
}

// Property Filter Parameters
export interface PropertyFilterParams {
  query?: string
  listing_type?: 'sale' | 'rent' | 'all'
  property_type?: string
  bhk?: number | 'all'
  min_price?: number
  max_price?: number
  locality?: string
  furnishing?: string
  status?: string
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular'
  amenities?: string[]
  page?: number
  limit?: number
}

// Why Choose Us Card
export interface WhyChooseUsItem {
  title: string
  desc: string
  icon: string
}

// Admin Dashboard Analytics Summary
export interface DashboardStats {
  totalProperties: number
  activeProperties: number
  soldProperties: number
  rentedProperties: number
  totalViews: number
  viewsToday: number
  viewsThisWeek: number
  viewsThisMonth: number
  totalLeads: number
  newLeads: number
  whatsappClicks: number
  callClicks: number
  siteVisitsScheduled: number
  topProperties: {
    id: string
    title: string
    locality: string
    price: number
    view_count: number
    whatsapp_click_count: number
  }[]
  leadsByStatus: Record<string, number>
  leadsBySource: Record<string, number>
  viewsTrend: { date: string; views: number; leads: number }[]
}

// WhatsApp structured query builder props
export interface WhatsAppMessageProps {
  propertyTitle?: string
  priceFormatted?: string
  locality?: string
  propertyUrl?: string
  clientName?: string
  customMessage?: string
}
