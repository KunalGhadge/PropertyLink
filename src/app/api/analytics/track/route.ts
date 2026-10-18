import { NextResponse } from 'next/server'
import { incrementPropertyMetric } from '@/lib/data/store'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event_type, property_id } = body

    if (!event_type) {
      return NextResponse.json({ error: 'Missing event_type' }, { status: 400 })
    }

    if (property_id) {
      if (event_type === 'property_view') incrementPropertyMetric(property_id, 'view')
      if (event_type === 'whatsapp_click') incrementPropertyMetric(property_id, 'whatsapp')
      if (event_type === 'call_click') incrementPropertyMetric(property_id, 'call')
    }

    const supabase = await createClient()
    if (supabase) {
      await (supabase as any).from('analytics_events').insert({
        agency_id: '00000000-0000-0000-0000-000000000001',
        property_id: property_id || null,
        event_type,
        device_type: 'mobile',
      })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
