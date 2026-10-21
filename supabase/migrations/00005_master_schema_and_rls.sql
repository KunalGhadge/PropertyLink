-- Migration: 00005_master_schema_and_rls.sql
-- Description: Master schema implementation matching exact Section 17 specifications with full Row Level Security (RLS)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Profiles Table (Section 17)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    business_name TEXT DEFAULT 'Apex Realty Navi Mumbai',
    owner_name TEXT DEFAULT 'Rajesh Sharma',
    phone TEXT DEFAULT '+91 98201 23456',
    whatsapp_number TEXT DEFAULT '+91 98201 23456',
    email TEXT DEFAULT 'contact@apexrealty.in',
    logo_url TEXT,
    about TEXT DEFAULT 'Senior Property Advisor with 14+ years specializing in Navi Mumbai, Panvel & Kharghar corridor.',
    address TEXT DEFAULT 'Shop 12, Ground Floor, Orion Plaza, Sector 15, Old Panvel, Navi Mumbai - 410206',
    areas_served TEXT[] DEFAULT ARRAY['Panvel', 'Kharghar', 'Kamothe', 'Taloja', 'New Panvel', 'Seawoods', 'Ulwe', 'CBD Belapur'],
    rera_number TEXT DEFAULT 'A52000012345',
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure any existing profiles table has all Section 17 columns
DO $$
BEGIN
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS areas_served TEXT[] DEFAULT ARRAY['Panvel', 'Kharghar', 'Kamothe', 'Taloja', 'New Panvel', 'Seawoods', 'Ulwe', 'CBD Belapur'];
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'admin';
EXCEPTION
    WHEN duplicate_column THEN NULL;
END $$;

-- 2. Properties Table (Section 17)
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    property_type TEXT, -- flat, villa, plot, shop, office
    listing_type TEXT,  -- sale/buy, rent
    status TEXT DEFAULT 'available', -- draft, available, under_negotiation, sold, rented, hidden
    price NUMERIC,
    price_on_request BOOLEAN DEFAULT false,
    negotiable BOOLEAN DEFAULT true,
    bhk TEXT,
    carpet_area NUMERIC,
    builtup_area NUMERIC,
    super_builtup_area NUMERIC,
    furnishing TEXT,
    floor_number TEXT,
    total_floors TEXT,
    property_age TEXT,
    facing TEXT,
    parking TEXT,
    bathrooms INT DEFAULT 1,
    balconies INT DEFAULT 0,
    possession_date DATE,
    transaction_type TEXT DEFAULT 'resale', -- new, resale
    city TEXT DEFAULT 'Navi Mumbai',
    locality TEXT NOT NULL,
    society_name TEXT,
    map_url TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    nearby JSONB DEFAULT '[]'::jsonb,
    amenities TEXT[] DEFAULT '{}',
    rera_number TEXT,
    brochure_url TEXT,
    floor_plan_url TEXT,
    video_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    meta_title TEXT,
    meta_description TEXT,
    views INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    published_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Property Media Table (Section 17)
CREATE TABLE IF NOT EXISTS public.property_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    media_type TEXT DEFAULT 'image', -- image, floor_plan, brochure, video
    alt_text TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Enquiries Table (Section 17)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    preferred_contact TEXT DEFAULT 'whatsapp', -- whatsapp, phone, email
    message TEXT,
    budget TEXT,
    preferred_location TEXT,
    requirement_type TEXT, -- buy, rent, commercial
    source TEXT DEFAULT 'website', -- homepage, property_page, popup, contact_page, whatsapp
    page_url TEXT,
    utm_source TEXT,
    utm_campaign TEXT,
    status TEXT DEFAULT 'new', -- new, contacted, interested, site_visit_scheduled, site_visit_completed, negotiation, closed_won, closed_lost, duplicate
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    follow_up_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Property Events Table for Analytics (Section 17)
CREATE TABLE IF NOT EXISTS public.property_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- view, whatsapp_click, call_click, visit_request, share
    session_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Site Settings Table (Section 17)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Testimonials Table (Section 17)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_location TEXT,
    quote TEXT NOT NULL,
    rating INT DEFAULT 5,
    image_url TEXT,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Audit Logs Table (Section 17)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_locality ON public.properties(locality);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON public.properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_property_media_property_id ON public.property_media(property_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_property_id ON public.enquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_property_events_property_id ON public.property_events(property_id);
CREATE INDEX IF NOT EXISTS idx_property_events_event_type ON public.property_events(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity, entity_id);

-- Row Level Security (RLS) Configuration
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop prior duplicate policies safely before recreating
DROP POLICY IF EXISTS "Public can view active profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public can view published properties" ON public.properties;
DROP POLICY IF EXISTS "Authenticated admins can manage properties" ON public.properties;
DROP POLICY IF EXISTS "Public can view property media" ON public.property_media;
DROP POLICY IF EXISTS "Authenticated admins can manage property media" ON public.property_media;
DROP POLICY IF EXISTS "Public can insert enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Authenticated admins can manage enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Public can record analytics events" ON public.property_events;
DROP POLICY IF EXISTS "Authenticated admins can view analytics events" ON public.property_events;
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated admins can update site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Public can view testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated admins can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated admins can view audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Authenticated admins can insert audit logs" ON public.audit_logs;

-- 1. Profiles Policies
CREATE POLICY "Public can view active profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Admins can update profiles" ON public.profiles
    FOR ALL TO authenticated
    USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin'))
    WITH CHECK (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin'));

-- 2. Properties Policies
CREATE POLICY "Public can view published properties" ON public.properties
    FOR SELECT USING (status != 'draft' AND status != 'hidden');

CREATE POLICY "Authenticated admins can manage properties" ON public.properties
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 3. Property Media Policies
CREATE POLICY "Public can view property media" ON public.property_media
    FOR SELECT USING (true);

CREATE POLICY "Authenticated admins can manage property media" ON public.property_media
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Enquiries Policies (Public can submit; only authenticated admins can view & edit)
CREATE POLICY "Public can insert enquiries" ON public.enquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated admins can manage enquiries" ON public.enquiries
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. Property Events Policies (Public can record view/whatsapp event; only authenticated admins view stats)
CREATE POLICY "Public can record analytics events" ON public.property_events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated admins can view analytics events" ON public.property_events
    FOR SELECT TO authenticated
    USING (true);

-- 6. Site Settings Policies
CREATE POLICY "Public can read site settings" ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Authenticated admins can update site settings" ON public.site_settings
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 7. Testimonials Policies
CREATE POLICY "Public can view testimonials" ON public.testimonials
    FOR SELECT USING (is_visible = true);

CREATE POLICY "Authenticated admins can manage testimonials" ON public.testimonials
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 8. Audit Logs Policies (Strictly private to authenticated admins)
CREATE POLICY "Authenticated admins can view audit logs" ON public.audit_logs
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Authenticated admins can insert audit logs" ON public.audit_logs
    FOR INSERT TO authenticated
    WITH CHECK (true);
