import { NextResponse } from 'next/server'
import { siteVisitSchema } from '@/lib/validations/lead.schema'
import { createSiteVisit } from '@/lib/data/store'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validated = siteVisitSchema.safeParse(body)
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validated.error.format() },
        { status: 400 }
      )
    }

    if (validated.data.honeypot) {
      return NextResponse.json({ success: true, message: 'Visit booked' })
    }

    // Try Supabase if configured
    const supabase = await createClient()
    if (supabase) {
      await (supabase as any).from('site_visits').insert({
        agency_id: '00000000-0000-0000-0000-000000000001',
        property_id: validated.data.property_id,
        customer_name: validated.data.customer_name,
        customer_phone: validated.data.customer_phone,
        customer_email: validated.data.customer_email || null,
        visit_date: validated.data.visit_date,
        visit_time: validated.data.visit_time,
        notes: validated.data.notes || null,
        status: 'scheduled',
      })
    }

    const visit = createSiteVisit({
      property_id: validated.data.property_id,
      customer_name: validated.data.customer_name,
      customer_phone: validated.data.customer_phone,
      customer_email: validated.data.customer_email || undefined,
      visit_date: validated.data.visit_date,
      visit_time: validated.data.visit_time,
      notes: validated.data.notes || undefined,
    })

    return NextResponse.json({
      success: true,
      visit,
      message: 'Site visit booked successfully!',
    })
  } catch (err: any) {
    console.error('Site visit error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
