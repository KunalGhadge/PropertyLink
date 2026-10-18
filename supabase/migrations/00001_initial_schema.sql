-- Migration: 00001_initial_schema.sql
-- Description: Core schema for PropertyLink multi-tenant real estate platform

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Agencies (Tenants)
CREATE TABLE IF NOT EXISTS public.agencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    rera_number TEXT,
    address TEXT,
    city TEXT NOT NULL DEFAULT 'Navi Mumbai',
    state TEXT NOT NULL DEFAULT 'Maharashtra',
    pincode TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. User Profiles (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'broker_admin' CHECK (role IN ('super_admin', 'broker_admin', 'agent')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Agents / Team Members
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp_number TEXT,
    designation TEXT DEFAULT 'Senior Property Consultant',
    avatar_url TEXT,
    experience_years INTEGER DEFAULT 5,
    specialization TEXT[] DEFAULT ARRAY['Residential Sales', 'Panvel & Kharghar'],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Properties
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    property_type TEXT NOT NULL CHECK (property_type IN ('flat', 'villa', 'plot', 'shop', 'office', 'penthouse', 'other')),
    listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent', 'lease')),
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented', 'under_negotiation', 'hidden')),
    price NUMERIC NOT NULL CHECK (price >= 0),
    price_unit TEXT NOT NULL DEFAULT 'lakh' CHECK (price_unit IN ('absolute', 'lakh', 'crore')),
    rent_period TEXT CHECK (rent_period IN ('monthly', 'yearly') OR rent_period IS NULL),
    bhk INTEGER,
    bathrooms INTEGER DEFAULT 1,
    balconies INTEGER DEFAULT 1,
    carpet_area NUMERIC NOT NULL CHECK (carpet_area > 0),
    builtup_area NUMERIC,
    area_unit TEXT NOT NULL DEFAULT 'sqft' CHECK (area_unit IN ('sqft', 'sqmt')),
    floor_number INTEGER,
    total_floors INTEGER,
    furnishing TEXT NOT NULL DEFAULT 'unfurnished' CHECK (furnishing IN ('unfurnished', 'semi_furnished', 'fully_furnished')),
    facing TEXT,
    age_of_property TEXT,
    possession_date TEXT,
    city TEXT NOT NULL DEFAULT 'Navi Mumbai',
    locality TEXT NOT NULL,
    society_or_project TEXT,
    full_address TEXT,
    map_link TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    amenities TEXT[] DEFAULT '{}',
    video_url TEXT,
    brochure_url TEXT,
    floor_plan_url TEXT,
    rera_number TEXT,
    owner_name TEXT,
    owner_phone TEXT,
    hide_owner_contact BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    is_hot_deal BOOLEAN DEFAULT false,
    meta_title TEXT,
    meta_description TEXT,
    og_image TEXT,
    view_count INTEGER DEFAULT 0,
    whatsapp_click_count INTEGER DEFAULT 0,
    call_click_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_agency_property_slug UNIQUE (agency_id, slug)
);

-- 5. Property Images
CREATE TABLE IF NOT EXISTS public.property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_cover BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT,
    budget_min NUMERIC,
    budget_max NUMERIC,
    preferred_location TEXT,
    source TEXT NOT NULL DEFAULT 'website_form' CHECK (source IN ('website_form', 'whatsapp', 'property_page', 'landing_page', 'manual')),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'site_visit_scheduled', 'negotiation', 'won', 'lost')),
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    notes TEXT,
    follow_up_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Site Visits
CREATE TABLE IF NOT EXISTS public.site_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    visit_date DATE NOT NULL,
    visit_time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
    assigned_agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_location TEXT,
    client_photo_url TEXT,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    property_type TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Site Settings (White-label website configuration)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL UNIQUE REFERENCES public.agencies(id) ON DELETE CASCADE,
    brand_name TEXT NOT NULL,
    tagline TEXT,
    logo_url TEXT,
    favicon_url TEXT,
    primary_color TEXT DEFAULT '#0F172A',
    secondary_color TEXT DEFAULT '#0284C7',
    accent_color TEXT DEFAULT '#25D366',
    hero_headline TEXT NOT NULL DEFAULT 'Find Your Dream Home in Panvel, Navi Mumbai & Kharghar',
    hero_subheadline TEXT DEFAULT 'Verified luxury apartments, builder floors, and premium plots with RERA transparency and zero brokerage assistance.',
    hero_bg_image TEXT,
    hero_cta_text TEXT DEFAULT 'Browse Properties',
    hero_cta_secondary TEXT DEFAULT 'Chat on WhatsApp',
    about_title TEXT DEFAULT 'Trusted Property Partners in Navi Mumbai',
    about_description TEXT,
    broker_name TEXT DEFAULT 'Rajesh Sharma',
    broker_designation TEXT DEFAULT 'Founder & Principal Broker',
    broker_experience_years INTEGER DEFAULT 14,
    broker_photo_url TEXT,
    areas_served TEXT[] DEFAULT ARRAY['Panvel', 'Kharghar', 'Kamothe', 'Taloja', 'Seawoods', 'Belapur', 'New Panvel'],
    phone_number TEXT NOT NULL DEFAULT '+91 98201 23456',
    whatsapp_number TEXT NOT NULL DEFAULT '+91 98201 23456',
    email TEXT NOT NULL DEFAULT 'contact@apexrealty.in',
    office_address TEXT DEFAULT 'Shop 12, Ground Floor, Orion Plaza, Sector 15, Old Panvel, Navi Mumbai - 410206',
    google_maps_embed TEXT,
    social_facebook TEXT,
    social_instagram TEXT,
    social_youtube TEXT,
    social_linkedin TEXT,
    rera_number TEXT DEFAULT 'MahaRERA Reg No: A52000012345',
    footer_disclaimer TEXT DEFAULT 'Disclaimer: PropertyLink provides information sourced from registered developers and owners. MahaRERA registration verified. Prices subject to change without prior notice.',
    why_choose_us JSONB DEFAULT '[
        {"title": "100% MahaRERA Verified", "desc": "Every project and resale title checked for clean legal documentation.", "icon": "ShieldCheck"},
        {"title": "Zero Hidden Brokerage", "desc": "Transparent pricing direct from developer inventory with zero markup.", "icon": "BadgePercent"},
        {"title": "Direct Developer Inventory", "desc": "Exclusive builder ties with Hiranandani, Godrej, Marathon, and Paradise.", "icon": "Building2"},
        {"title": "Doorstep Site Visits", "desc": "Free AC cab pickup and accompanied walkthrough by local property experts.", "icon": "Car"}
    ]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. Analytics Events
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'property_view', 'whatsapp_click', 'call_click', 'lead_submit', 'site_visit_request')),
    device_type TEXT DEFAULT 'mobile',
    referrer TEXT,
    page_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for lightning-fast queries
CREATE INDEX IF NOT EXISTS idx_properties_agency_id ON public.properties(agency_id);
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_city_locality ON public.properties(city, locality);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON public.properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON public.properties(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_properties_search_trgm ON public.properties USING gin (title gin_trgm_ops, locality gin_trgm_ops, society_or_project gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON public.property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_leads_agency_id ON public.leads(agency_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_visits_agency_id ON public.site_visits(agency_id);
CREATE INDEX IF NOT EXISTS idx_site_visits_date ON public.site_visits(visit_date);
CREATE INDEX IF NOT EXISTS idx_analytics_agency_created ON public.analytics_events(agency_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_agency_created ON public.audit_logs(agency_id, created_at DESC);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_agencies_updated_at ON public.agencies;
CREATE TRIGGER update_agencies_updated_at BEFORE UPDATE ON public.agencies FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_properties_updated_at ON public.properties;
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_visits_updated_at ON public.site_visits;
CREATE TRIGGER update_site_visits_updated_at BEFORE UPDATE ON public.site_visits FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
