-- Migration: 00002_rls_policies.sql
-- Description: Row Level Security (RLS) policies and Storage security for multi-tenant isolation

-- 1. Helper functions to retrieve active tenant & role from JWT/profiles
CREATE OR REPLACE FUNCTION public.get_auth_agency_id()
RETURNS UUID AS $$
  SELECT agency_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 2. Enable RLS on all tables
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 3. Agencies Policies
CREATE POLICY "Public can view active agencies"
ON public.agencies FOR SELECT
USING (is_active = true);

CREATE POLICY "Super admins can manage all agencies"
ON public.agencies FOR ALL
TO authenticated
USING (public.get_auth_role() = 'super_admin');

CREATE POLICY "Broker admins can view and update their own agency"
ON public.agencies FOR UPDATE
TO authenticated
USING (id = public.get_auth_agency_id())
WITH CHECK (id = public.get_auth_agency_id());

-- 4. Profiles Policies
CREATE POLICY "Users can view profiles in their own agency"
ON public.profiles FOR SELECT
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- 5. Agents Policies
CREATE POLICY "Public can view active agents"
ON public.agents FOR SELECT
USING (is_active = true);

CREATE POLICY "Agency members can manage agents"
ON public.agents FOR ALL
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin')
WITH CHECK (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

-- 6. Properties Policies
-- Public can view visible properties
CREATE POLICY "Public can view published properties"
ON public.properties FOR SELECT
USING (status != 'hidden');

-- Authenticated broker/agent can view all their agency properties including hidden
CREATE POLICY "Agency users can view all agency properties"
ON public.properties FOR SELECT
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

CREATE POLICY "Agency users can insert properties"
ON public.properties FOR INSERT
TO authenticated
WITH CHECK (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

CREATE POLICY "Agency users can update their properties"
ON public.properties FOR UPDATE
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin')
WITH CHECK (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

CREATE POLICY "Agency users can delete their properties"
ON public.properties FOR DELETE
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

-- 7. Property Images Policies
CREATE POLICY "Public can view property images"
ON public.property_images FOR SELECT
USING (true);

CREATE POLICY "Agency users can manage property images"
ON public.property_images FOR ALL
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin')
WITH CHECK (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

-- 8. Leads Policies
-- Anyone on web can submit a lead
CREATE POLICY "Public can create leads"
ON public.leads FOR INSERT
WITH CHECK (true);

-- Only agency members can view/manage their leads
CREATE POLICY "Agency users can view their leads"
ON public.leads FOR SELECT
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

CREATE POLICY "Agency users can update their leads"
ON public.leads FOR UPDATE
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin')
WITH CHECK (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

CREATE POLICY "Agency users can delete their leads"
ON public.leads FOR DELETE
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

-- 9. Site Visits Policies
-- Public can request a site visit
CREATE POLICY "Public can schedule site visits"
ON public.site_visits FOR INSERT
WITH CHECK (true);

CREATE POLICY "Agency users can view their site visits"
ON public.site_visits FOR SELECT
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

CREATE POLICY "Agency users can update their site visits"
ON public.site_visits FOR UPDATE
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin')
WITH CHECK (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

-- 10. Testimonials Policies
CREATE POLICY "Public can view active testimonials"
ON public.testimonials FOR SELECT
USING (is_active = true);

CREATE POLICY "Agency users can manage testimonials"
ON public.testimonials FOR ALL
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin')
WITH CHECK (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

-- 11. Site Settings Policies
CREATE POLICY "Public can view site settings"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Agency admins can update site settings"
ON public.site_settings FOR ALL
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin')
WITH CHECK (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

-- 12. Analytics Events Policies
CREATE POLICY "Public can log analytics events"
ON public.analytics_events FOR INSERT
WITH CHECK (true);

CREATE POLICY "Agency users can view their analytics"
ON public.analytics_events FOR SELECT
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

-- 13. Audit Logs Policies
CREATE POLICY "Agency users can view their audit logs"
ON public.audit_logs FOR SELECT
TO authenticated
USING (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

CREATE POLICY "System can record audit logs"
ON public.audit_logs FOR INSERT
TO authenticated
WITH CHECK (agency_id = public.get_auth_agency_id() OR public.get_auth_role() = 'super_admin');

-- 14. Supabase Storage Setup & Security Policies
-- Buckets: property-media, agency-assets, documents
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('property-media', 'property-media', true),
    ('agency-assets', 'agency-assets', true),
    ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Public can view public bucket assets
CREATE POLICY "Public Access for property-media"
ON storage.objects FOR SELECT
USING (bucket_id IN ('property-media', 'agency-assets'));

-- Authenticated agency users can upload to their agency folder: agency_id/filename
CREATE POLICY "Tenant restricted upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id IN ('property-media', 'agency-assets', 'documents') AND
    (storage.foldername(name))[1] = public.get_auth_agency_id()::text
);

CREATE POLICY "Tenant restricted update"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id IN ('property-media', 'agency-assets', 'documents') AND
    (storage.foldername(name))[1] = public.get_auth_agency_id()::text
);

CREATE POLICY "Tenant restricted delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id IN ('property-media', 'agency-assets', 'documents') AND
    (storage.foldername(name))[1] = public.get_auth_agency_id()::text
);
