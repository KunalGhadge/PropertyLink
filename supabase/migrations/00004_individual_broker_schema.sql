-- Migration: 00004_individual_broker_schema.sql
-- Description: Dedicated single-broker branded real estate platform schema matching exact specifications

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Profiles (Broker/Owner settings & branding)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL DEFAULT 'Apex Realty Navi Mumbai',
    owner_name TEXT NOT NULL DEFAULT 'Rajesh Sharma',
    phone TEXT NOT NULL DEFAULT '+91 98201 23456',
    whatsapp_number TEXT NOT NULL DEFAULT '+91 98201 23456',
    email TEXT NOT NULL DEFAULT 'contact@apexrealty.in',
    logo_url TEXT DEFAULT '/images/logo.png',
    favicon_url TEXT DEFAULT '/favicon.ico',
    about TEXT DEFAULT 'Senior Property Advisor with 14+ years specializing in Navi Mumbai, Panvel & Kharghar corridor.',
    address TEXT DEFAULT 'Shop 12, Ground Floor, Orion Plaza, Sector 15, Old Panvel, Navi Mumbai - 410206',
    city TEXT NOT NULL DEFAULT 'Navi Mumbai',
    rera_number TEXT DEFAULT 'MahaRERA: A52000012345',
    primary_color TEXT DEFAULT '#0c0f14',
    accent_color TEXT DEFAULT '#c5a059',
    social_links JSONB DEFAULT '{"facebook": "", "instagram": "", "youtube": "", "linkedin": ""}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Properties
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    property_type TEXT NOT NULL CHECK (property_type IN ('flat', 'villa', 'plot', 'shop', 'office', 'penthouse', 'commercial', 'other')),
    listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent', 'lease')),
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rent', 'under_negotiation', 'hidden')),
    price NUMERIC NOT NULL CHECK (price >= 0),
    price_label TEXT,
    negotiable BOOLEAN DEFAULT true,
    maintenance_charges NUMERIC DEFAULT 0,
    bhk INTEGER,
    carpet_area NUMERIC NOT NULL CHECK (carpet_area > 0),
    builtup_area NUMERIC,
    floor INTEGER,
    total_floors INTEGER,
    furnishing TEXT NOT NULL DEFAULT 'unfurnished' CHECK (furnishing IN ('unfurnished', 'semi_furnished', 'fully_furnished')),
    facing TEXT DEFAULT 'East',
    property_age TEXT DEFAULT '0-1 years',
    possession_date TEXT DEFAULT 'Ready to Move',
    parking TEXT DEFAULT '1 Covered',
    address TEXT,
    locality TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Navi Mumbai',
    pincode TEXT DEFAULT '410206',
    map_url TEXT,
    nearby_landmarks TEXT[] DEFAULT '{}',
    amenities TEXT[] DEFAULT '{}',
    rera_number TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    hide_owner_contact BOOLEAN DEFAULT true,
    show_price BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 3. Property Media
CREATE TABLE IF NOT EXISTS public.property_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL DEFAULT 'image',
    media_type TEXT NOT NULL DEFAULT 'photo' CHECK (media_type IN ('photo', 'floor_plan', 'brochure', 'video')),
    is_cover BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Enquiries
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT,
    budget TEXT,
    preferred_location TEXT,
    source TEXT NOT NULL DEFAULT 'website' CHECK (source IN ('website', 'whatsapp', 'call', 'referral', 'portal')),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'site_visit_scheduled', 'negotiation', 'closed', 'lost')),
    notes TEXT,
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Site Visits
CREATE TABLE IF NOT EXISTS public.site_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    client_photo_url TEXT,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Activity Logs
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes as specified
CREATE INDEX IF NOT EXISTS idx_exact_properties_slug ON public.properties(slug);
CREATE INDEX IF NOT EXISTS idx_exact_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_exact_properties_city ON public.properties(city);
CREATE INDEX IF NOT EXISTS idx_exact_properties_locality ON public.properties(locality);
CREATE INDEX IF NOT EXISTS idx_exact_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_exact_properties_property_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_exact_properties_listing_type ON public.properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_exact_properties_is_featured ON public.properties(is_featured);
CREATE INDEX IF NOT EXISTS idx_exact_enquiries_property_id ON public.enquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_exact_property_media_property_id ON public.property_media(property_id);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Public can view active profiles / site settings
CREATE POLICY "Public can view broker profile" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Owner can update profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Public can view published & non-deleted properties
CREATE POLICY "Public can view published properties" ON public.properties FOR SELECT USING (is_published = true AND deleted_at IS NULL AND status != 'hidden');
CREATE POLICY "Authenticated owners can manage all properties" ON public.properties FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Media policies
CREATE POLICY "Public can view property media" ON public.property_media FOR SELECT USING (true);
CREATE POLICY "Authenticated owners can manage media" ON public.property_media FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Enquiries policies
CREATE POLICY "Public can submit enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated owners can view/manage enquiries" ON public.enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Site visits policies
CREATE POLICY "Public can request site visits" ON public.site_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated owners can view/manage visits" ON public.site_visits FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Testimonials policies
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Authenticated owners can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Activity logs policies
CREATE POLICY "Authenticated owners can view activity logs" ON public.activity_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated owners can insert activity logs" ON public.activity_logs FOR INSERT TO authenticated WITH CHECK (true);
