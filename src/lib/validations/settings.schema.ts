import { z } from 'zod'

export const settingsSchema = z.object({
  brand_name: z.string().min(2, 'Brand name is required'),
  tagline: z.string().optional().nullable(),
  logo_url: z.string().optional().nullable(),
  primary_color: z.string().default('#0F172A'),
  secondary_color: z.string().default('#0284C7'),
  accent_color: z.string().default('#25D366'),
  hero_headline: z.string().min(10, 'Hero headline is required'),
  hero_subheadline: z.string().optional().nullable(),
  hero_bg_image: z.string().optional().nullable(),
  hero_cta_text: z.string().default('Browse Properties'),
  hero_cta_secondary: z.string().default('Chat on WhatsApp'),
  about_title: z.string().optional().nullable(),
  about_description: z.string().optional().nullable(),
  broker_name: z.string().optional().nullable(),
  broker_designation: z.string().optional().nullable(),
  broker_experience_years: z.coerce.number().min(0).default(10),
  broker_photo_url: z.string().optional().nullable(),
  areas_served: z.array(z.string()).default([]),
  phone_number: z.string().min(10, 'Valid phone number is required'),
  whatsapp_number: z.string().min(10, 'Valid WhatsApp number is required'),
  email: z.string().email('Valid email is required'),
  office_address: z.string().optional().nullable(),
  rera_number: z.string().optional().nullable(),
  footer_disclaimer: z.string().optional().nullable(),
})

export type SettingsFormValues = z.infer<typeof settingsSchema>
