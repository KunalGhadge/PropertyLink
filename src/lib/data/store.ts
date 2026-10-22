import { DEMO_AGENCY, DEMO_AGENTS, DEMO_PROPERTIES, DEMO_SETTINGS, DEMO_TESTIMONIALS, DEMO_LEADS, DEMO_SITE_VISITS } from './mock-data'
import { PropertyWithImages, Lead, SiteVisit, SiteSettings, Agent, Testimonial, DashboardStats } from '@/types'

// Global state container for demo/runtime mode
interface GlobalState {
  agency: typeof DEMO_AGENCY
  settings: SiteSettings
  agents: Agent[]
  properties: PropertyWithImages[]
  leads: Lead[]
  siteVisits: SiteVisit[]
  testimonials: Testimonial[]
}

const state: GlobalState = {
  agency: { ...DEMO_AGENCY },
  settings: { ...DEMO_SETTINGS },
  agents: [...DEMO_AGENTS],
  properties: [...DEMO_PROPERTIES],
  leads: [...DEMO_LEADS],
  siteVisits: [...DEMO_SITE_VISITS],
  testimonials: [...DEMO_TESTIMONIALS],
}

// Hydrate from browser localStorage on client load
if (typeof window !== 'undefined') {
  try {
    const savedAgents = localStorage.getItem('propertylink_agents')
    if (savedAgents) state.agents = JSON.parse(savedAgents)

    const savedProps = localStorage.getItem('propertylink_properties')
    if (savedProps) state.properties = JSON.parse(savedProps)

    const savedSettings = localStorage.getItem('propertylink_settings')
    if (savedSettings) state.settings = JSON.parse(savedSettings)

    const savedLeads = localStorage.getItem('propertylink_leads')
    if (savedLeads) state.leads = JSON.parse(savedLeads)

    const savedVisits = localStorage.getItem('propertylink_site_visits')
    if (savedVisits) state.siteVisits = JSON.parse(savedVisits)
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e)
  }
}

function persistState(key: 'agents' | 'properties' | 'settings' | 'leads' | 'site_visits') {
  if (typeof window === 'undefined') return
  try {
    if (key === 'agents') localStorage.setItem('propertylink_agents', JSON.stringify(state.agents))
    if (key === 'properties') localStorage.setItem('propertylink_properties', JSON.stringify(state.properties))
    if (key === 'settings') localStorage.setItem('propertylink_settings', JSON.stringify(state.settings))
    if (key === 'leads') localStorage.setItem('propertylink_leads', JSON.stringify(state.leads))
    if (key === 'site_visits') localStorage.setItem('propertylink_site_visits', JSON.stringify(state.siteVisits))
    
    // Broadcast change across tabs and components
    window.dispatchEvent(new CustomEvent('propertylink_store_updated', { detail: { key } }))
  } catch (e) {
    console.warn('Failed to persist state to localStorage:', e)
  }
}

// ---------------- Property Store Functions ----------------
export function getProperties(params?: {
  query?: string
  listing_type?: string
  property_type?: string
  bhk?: number | 'all'
  min_price?: number
  max_price?: number
  locality?: string
  furnishing?: string
  status?: string
  sort?: string
}): PropertyWithImages[] {
  let list = [...state.properties]

  if (params?.status && params.status !== 'all') {
    list = list.filter((p) => p.status === params.status)
  } else {
    // default public view excludes hidden
    list = list.filter((p) => p.status !== 'hidden')
  }

  if (params?.listing_type && params.listing_type !== 'all') {
    list = list.filter((p) => p.listing_type === params.listing_type)
  }

  if (params?.property_type && params.property_type !== 'all') {
    list = list.filter((p) => p.property_type.toLowerCase() === params.property_type?.toLowerCase())
  }

  if (params?.bhk && params.bhk !== 'all') {
    const bhkNum = Number(params.bhk)
    if (!isNaN(bhkNum)) {
      list = list.filter((p) => p.bhk === bhkNum)
    }
  }

  if (params?.min_price != null && params.min_price > 0) {
    list = list.filter((p) => p.price >= (params.min_price || 0))
  }

  if (params?.max_price != null && params.max_price > 0) {
    list = list.filter((p) => p.price <= (params.max_price || Infinity))
  }

  if (params?.locality && params.locality !== 'all') {
    const loc = params.locality.toLowerCase()
    list = list.filter((p) => p.locality.toLowerCase().includes(loc))
  }

  if (params?.furnishing && params.furnishing !== 'all') {
    list = list.filter((p) => p.furnishing === params.furnishing)
  }

  if (params?.query && params.query.trim()) {
    const q = params.query.toLowerCase().trim()
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        (p.society_or_project && p.society_or_project.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
    )
  }

  // Sorting
  if (params?.sort === 'price_asc') {
    list.sort((a, b) => a.price - b.price)
  } else if (params?.sort === 'price_desc') {
    list.sort((a, b) => b.price - a.price)
  } else if (params?.sort === 'popular') {
    list.sort((a, b) => b.view_count - a.view_count)
  } else {
    // newest default
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  return list
}

export function getAllPropertiesAdmin(): PropertyWithImages[] {
  return [...state.properties]
}

export function getPropertyBySlug(slug: string): PropertyWithImages | undefined {
  return state.properties.find((p) => p.slug === slug)
}

export function getPropertyById(id: string): PropertyWithImages | undefined {
  return state.properties.find((p) => p.id === id)
}

export function getFeaturedProperties(limit = 6): PropertyWithImages[] {
  return state.properties
    .filter((p) => p.status === 'available' && p.featured)
    .slice(0, limit)
}

export function getSimilarProperties(currentId: string, locality: string, limit = 3): PropertyWithImages[] {
  return state.properties
    .filter((p) => p.id !== currentId && p.locality === locality && p.status !== 'hidden')
    .slice(0, limit)
}

export function createProperty(prop: Partial<PropertyWithImages>): PropertyWithImages {
  const newProp: PropertyWithImages = {
    id: `prop-${Date.now()}`,
    agency_id: state.agency.id,
    created_by: 'user-broker-1',
    title: prop.title || 'Untitled Property',
    slug: prop.slug || `property-${Date.now()}`,
    description: prop.description || '',
    property_type: prop.property_type || 'flat',
    listing_type: prop.listing_type || 'sale',
    status: prop.status || 'available',
    price: prop.price || 5000000,
    price_unit: prop.price_unit || 'lakh',
    rent_period: prop.rent_period || null,
    bhk: prop.bhk || 2,
    bathrooms: prop.bathrooms || 2,
    balconies: prop.balconies || 1,
    carpet_area: prop.carpet_area || 750,
    builtup_area: prop.builtup_area || 950,
    area_unit: prop.area_unit || 'sqft',
    floor_number: prop.floor_number || 5,
    total_floors: prop.total_floors || 14,
    furnishing: prop.furnishing || 'unfurnished',
    facing: prop.facing || 'East',
    age_of_property: prop.age_of_property || '0-1 years',
    possession_date: prop.possession_date || 'Ready to Move',
    city: prop.city || 'Navi Mumbai',
    locality: prop.locality || 'Panvel',
    society_or_project: prop.society_or_project || '',
    full_address: prop.full_address || '',
    map_link: prop.map_link || '',
    latitude: prop.latitude || null,
    longitude: prop.longitude || null,
    amenities: prop.amenities || ['Security', 'Lift', 'Parking'],
    video_url: prop.video_url || null,
    brochure_url: prop.brochure_url || null,
    floor_plan_url: prop.floor_plan_url || null,
    rera_number: prop.rera_number || 'MahaRERA: In Process',
    owner_name: prop.owner_name || 'Confidential Owner',
    owner_phone: prop.owner_phone || '+91 98200 00000',
    hide_owner_contact: prop.hide_owner_contact ?? true,
    featured: prop.featured ?? false,
    is_new: prop.is_new ?? true,
    is_hot_deal: prop.is_hot_deal ?? false,
    meta_title: prop.meta_title || prop.title || '',
    meta_description: prop.meta_description || prop.description?.slice(0, 150) || '',
    og_image: prop.images?.[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    view_count: 0,
    whatsapp_click_count: 0,
    call_click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: prop.images && prop.images.length > 0 ? prop.images : [
      {
        id: `img-${Date.now()}`,
        property_id: `prop-${Date.now()}`,
        agency_id: state.agency.id,
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        alt_text: prop.title || 'Property Image',
        display_order: 0,
        is_cover: true,
        created_at: new Date().toISOString(),
      }
    ],
  }
  state.properties.unshift(newProp)
  persistState('properties')
  return newProp
}

export function updateProperty(id: string, updates: Partial<PropertyWithImages>): PropertyWithImages | null {
  const index = state.properties.findIndex((p) => p.id === id)
  if (index === -1) return null
  state.properties[index] = {
    ...state.properties[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }
  persistState('properties')
  return state.properties[index]
}

export function deleteProperty(id: string): boolean {
  const index = state.properties.findIndex((p) => p.id === id)
  if (index === -1) return false
  state.properties.splice(index, 1)
  persistState('properties')
  return true
}

export function softDeleteProperty(id: string): boolean {
  const prop = state.properties.find((p) => p.id === id)
  if (!prop) return false
  prop.status = 'hidden'
  prop.deleted_at = new Date().toISOString()
  prop.updated_at = new Date().toISOString()
  persistState('properties')
  return true
}

export function restoreProperty(id: string): boolean {
  const prop = state.properties.find((p) => p.id === id)
  if (!prop) return false
  prop.status = 'available'
  prop.deleted_at = null
  prop.updated_at = new Date().toISOString()
  persistState('properties')
  return true
}

export function markPropertyAsSold(id: string): boolean {
  const prop = state.properties.find((p) => p.id === id)
  if (!prop) return false
  prop.status = 'sold'
  prop.updated_at = new Date().toISOString()
  persistState('properties')
  return true
}

export function duplicateProperty(id: string): PropertyWithImages | null {
  const original = state.properties.find((p) => p.id === id)
  if (!original) return null
  const clone = {
    ...original,
    id: `prop-${Date.now()}`,
    title: `${original.title} (Copy)`,
    slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  state.properties.unshift(clone)
  persistState('properties')
  return clone
}

export function incrementPropertyMetric(id: string, metric: 'view' | 'whatsapp' | 'call'): void {
  const prop = state.properties.find((p) => p.id === id)
  if (!prop) return
  if (metric === 'view') prop.view_count += 1
  if (metric === 'whatsapp') prop.whatsapp_click_count += 1
  if (metric === 'call') prop.call_click_count += 1
}

// ---------------- Leads Store Functions ----------------
export function getLeads(): Lead[] {
  return [...state.leads].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export function createLead(leadData: {
  name: string
  phone?: string
  email?: string
  message?: string
  budget_range?: string
  budget_min?: number
  budget_max?: number
  preferred_location?: string
  property_id?: string
  preferred_contact?: string
  listing_purpose?: string
  property_type?: string
  source?: string
}): Lead {
  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    agency_id: state.agency.id,
    property_id: leadData.property_id || null,
    name: leadData.name,
    phone: leadData.phone || '',
    email: leadData.email || null,
    message: leadData.message || (leadData.budget_range ? `Budget: ${leadData.budget_range} | Purpose: ${leadData.listing_purpose || 'buy'} | Type: ${leadData.property_type || 'any'}` : null),
    budget_min: leadData.budget_min || null,
    budget_max: leadData.budget_max || null,
    preferred_location: leadData.preferred_location || null,
    source: (leadData.source as any) || 'website_form',
    status: 'new',
    assigned_to: null,
    notes: null,
    follow_up_date: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  state.leads.unshift(newLead)
  return newLead
}

export function updateLeadStatus(id: string, status: Lead['status'], notes?: string): Lead | null {
  const lead = state.leads.find((l) => l.id === id)
  if (!lead) return null
  lead.status = status
  if (notes) lead.notes = notes
  lead.updated_at = new Date().toISOString()
  return lead
}

export function assignLead(id: string, agentId: string | null): Lead | null {
  const lead = state.leads.find((l) => l.id === id)
  if (!lead) return null
  lead.assigned_to = agentId
  lead.updated_at = new Date().toISOString()
  return lead
}

export function deleteLead(id: string): boolean {
  const index = state.leads.findIndex((l) => l.id === id)
  if (index === -1) return false
  state.leads.splice(index, 1)
  return true
}

// ---------------- Site Visits Store Functions ----------------
export function getSiteVisits(): SiteVisit[] {
  return [...state.siteVisits].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export function createSiteVisit(data: {
  property_id: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  visit_date: string
  visit_time: string
  notes?: string
}): SiteVisit {
  const newVisit: SiteVisit = {
    id: `visit-${Date.now()}`,
    agency_id: state.agency.id,
    property_id: data.property_id,
    lead_id: null,
    customer_name: data.customer_name,
    customer_phone: data.customer_phone,
    customer_email: data.customer_email || null,
    visit_date: data.visit_date,
    visit_time: data.visit_time,
    status: 'scheduled',
    assigned_agent_id: DEMO_AGENTS[0].id,
    notes: data.notes || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  state.siteVisits.unshift(newVisit)
  return newVisit
}

export function updateSiteVisitStatus(id: string, status: SiteVisit['status']): SiteVisit | null {
  const visit = state.siteVisits.find((v) => v.id === id)
  if (!visit) return null
  visit.status = status
  visit.updated_at = new Date().toISOString()
  return visit
}

// ---------------- Site Settings Store Functions ----------------
export function getSiteSettings(): SiteSettings {
  return { ...state.settings }
}

export function updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
  state.settings = {
    ...state.settings,
    ...updates,
    updated_at: new Date().toISOString(),
  }
  persistState('settings')
  return { ...state.settings }
}

// ---------------- Agents Store Functions ----------------
export function getAgents(): Agent[] {
  return [...state.agents]
}

export function createAgent(agentData: Partial<Agent>): Agent {
  const newAgent: Agent = {
    id: `agent-${Date.now()}`,
    agency_id: state.agency.id,
    user_id: null,
    name: agentData.name || 'New Consultant',
    email: agentData.email || 'agent@apexrealty.in',
    phone: agentData.phone || '+91 98200 00000',
    whatsapp_number: agentData.whatsapp_number || agentData.phone || '+91 98200 00000',
    designation: agentData.designation || 'Property Consultant',
    avatar_url: agentData.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    experience_years: agentData.experience_years || 3,
    specialization: agentData.specialization || ['Residential Sales'],
    is_active: agentData.is_active ?? true,
    created_at: new Date().toISOString(),
  }
  state.agents.push(newAgent)
  persistState('agents')
  return newAgent
}

export function updateAgent(id: string, updates: Partial<Agent>): Agent | null {
  const index = state.agents.findIndex((a) => a.id === id)
  if (index === -1) return null
  state.agents[index] = {
    ...state.agents[index],
    ...updates,
  }
  persistState('agents')
  return state.agents[index]
}

export function deleteAgent(id: string): boolean {
  const index = state.agents.findIndex((a) => a.id === id)
  if (index === -1) return false
  state.agents.splice(index, 1)
  persistState('agents')
  return true
}

export function toggleAgentStatus(id: string): Agent | null {
  const agent = state.agents.find((a) => a.id === id)
  if (!agent) return null
  agent.is_active = !agent.is_active
  persistState('agents')
  return agent
}

// ---------------- Testimonials Store Functions ----------------
export function getTestimonials(): Testimonial[] {
  return [...state.testimonials].filter((t) => t.is_active)
}

// ---------------- Analytics Dashboard Stats ----------------
export function getDashboardStats(): DashboardStats {
  const totalProperties = state.properties.length
  const activeProperties = state.properties.filter((p) => p.status === 'available').length
  const soldProperties = state.properties.filter((p) => p.status === 'sold').length
  const rentedProperties = state.properties.filter((p) => p.status === 'rented').length

  const totalViews = state.properties.reduce((sum, p) => sum + p.view_count, 0)
  const whatsappClicks = state.properties.reduce((sum, p) => sum + p.whatsapp_click_count, 0)
  const callClicks = state.properties.reduce((sum, p) => sum + p.call_click_count, 0)

  const leadsByStatus: Record<string, number> = {
    new: 0,
    contacted: 0,
    interested: 0,
    site_visit_scheduled: 0,
    negotiation: 0,
    won: 0,
    lost: 0,
  }
  const leadsBySource: Record<string, number> = {
    website_form: 0,
    whatsapp: 0,
    property_page: 0,
    landing_page: 0,
    manual: 0,
  }

  state.leads.forEach((l) => {
    leadsByStatus[l.status] = (leadsByStatus[l.status] || 0) + 1
    leadsBySource[l.source] = (leadsBySource[l.source] || 0) + 1
  })

  const topProperties = [...state.properties]
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      title: p.title,
      locality: p.locality,
      price: p.price,
      view_count: p.view_count,
      whatsapp_click_count: p.whatsapp_click_count,
    }))

  return {
    totalProperties,
    activeProperties,
    soldProperties,
    rentedProperties,
    totalViews,
    viewsToday: 148,
    viewsThisWeek: 1240,
    viewsThisMonth: 5820,
    totalLeads: state.leads.length,
    newLeads: state.leads.filter((l) => l.status === 'new').length,
    whatsappClicks,
    callClicks,
    siteVisitsScheduled: state.siteVisits.filter((v) => v.status === 'scheduled' || v.status === 'confirmed').length,
    topProperties,
    leadsByStatus,
    leadsBySource,
    viewsTrend: [
      { date: 'Mon', views: 320, leads: 4 },
      { date: 'Tue', views: 410, leads: 7 },
      { date: 'Wed', views: 390, leads: 5 },
      { date: 'Thu', views: 560, leads: 9 },
      { date: 'Fri', views: 680, leads: 12 },
      { date: 'Sat', views: 920, leads: 16 },
      { date: 'Sun', views: 1140, leads: 21 },
    ],
  }
}
