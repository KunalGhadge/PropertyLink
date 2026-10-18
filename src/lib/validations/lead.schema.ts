import { z } from 'zod'

const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(indianPhoneRegex, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  message: z.string().optional().or(z.literal('')),
  budget_min: z.number().optional().nullable(),
  budget_max: z.number().optional().nullable(),
  preferred_location: z.string().optional().or(z.literal('')),
  property_id: z.string().optional().nullable(),
  source: z.enum(['website_form', 'whatsapp', 'property_page', 'landing_page', 'manual']),
  honeypot: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
})

export type LeadFormValues = z.infer<typeof leadSchema>

export const siteVisitSchema = z.object({
  property_id: z.string().min(1, 'Property selection is required'),
  customer_name: z.string().min(2, 'Name must be at least 2 characters'),
  customer_phone: z.string().regex(indianPhoneRegex, 'Please enter a valid 10-digit mobile number'),
  customer_email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  visit_date: z.string().min(1, 'Please select a preferred date'),
  visit_time: z.string().min(1, 'Please select a preferred time slot'),
  notes: z.string().optional().or(z.literal('')),
  honeypot: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
})

export type SiteVisitFormValues = z.infer<typeof siteVisitSchema>
