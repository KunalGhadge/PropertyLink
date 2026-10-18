import { NextResponse } from 'next/server'
import { leadSchema } from '@/lib/validations/lead.schema'
import { createLead } from '@/lib/data/store'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Zod Validation
    const validated = leadSchema.safeParse(body)
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validated.error.format() },
        { status: 400 }
      )
    }

    // 2. Honeypot check for bots
    if (validated.data.honeypot) {
      // Return 200 to trick bots without saving
      return NextResponse.json({ success: true, message: 'Lead received' })
    }

    // 3. Try Supabase if configured
    const supabase = await createClient()
    if (supabase) {
      const { error } = await (supabase as any).from('leads').insert({
        agency_id: '00000000-0000-0000-0000-000000000001',
        name: validated.data.name,
        phone: validated.data.phone,
        email: validated.data.email || null,
        message: validated.data.message || null,
        budget_min: validated.data.budget_min || null,
        budget_max: validated.data.budget_max || null,
        preferred_location: validated.data.preferred_location || null,
        property_id: validated.data.property_id || null,
        source: validated.data.source || 'website_form',
        status: 'new',
      })

      if (error) {
        console.error('Supabase lead insert error:', error)
      }
    }

    // 4. Save to runtime store
    const newLead = createLead({
      name: validated.data.name,
      phone: validated.data.phone,
      email: validated.data.email || undefined,
      message: validated.data.message || undefined,
      budget_min: validated.data.budget_min || undefined,
      budget_max: validated.data.budget_max || undefined,
      preferred_location: validated.data.preferred_location || undefined,
      property_id: validated.data.property_id || undefined,
      source: validated.data.source,
    })

    return NextResponse.json({
      success: true,
      lead: newLead,
      message: 'Enquiry received successfully! Our consultant will call you shortly.',
    })
  } catch (err: any) {
    console.error('Lead submission error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
