export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agencies: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          email: string
          phone: string
          whatsapp_number: string
          rera_number: string | null
          address: string | null
          city: string
          state: string
          pincode: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          email: string
          phone: string
          whatsapp_number: string
          rera_number?: string | null
          address?: string | null
          city?: string
          state?: string
          pincode?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          email?: string
          phone?: string
          whatsapp_number?: string
          rera_number?: string | null
          address?: string | null
          city?: string
          state?: string
          pincode?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          agency_id: string | null
          email: string
          full_name: string
          phone: string | null
          role: 'super_admin' | 'broker_admin' | 'agent'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          agency_id?: string | null
          email: string
          full_name: string
          phone?: string | null
          role?: 'super_admin' | 'broker_admin' | 'agent'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string | null
          email?: string
          full_name?: string
          phone?: string | null
          role?: 'super_admin' | 'broker_admin' | 'agent'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      agents: {
        Row: {
          id: string
          agency_id: string
          user_id: string | null
          name: string
          email: string
          phone: string
          whatsapp_number: string | null
          designation: string | null
          avatar_url: string | null
          experience_years: number | null
          specialization: string[] | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          user_id?: string | null
          name: string
          email: string
          phone: string
          whatsapp_number?: string | null
          designation?: string | null
          avatar_url?: string | null
          experience_years?: number | null
          specialization?: string[] | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string
          whatsapp_number?: string | null
          designation?: string | null
          avatar_url?: string | null
          experience_years?: number | null
          specialization?: string[] | null
          is_active?: boolean
          created_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          agency_id: string
          created_by: string | null
          title: string
          slug: string
          description: string | null
          property_type: 'flat' | 'villa' | 'plot' | 'shop' | 'office' | 'penthouse' | 'other'
          listing_type: 'sale' | 'rent' | 'lease'
          status: 'available' | 'sold' | 'rented' | 'under_negotiation' | 'hidden'
          price: number
          price_unit: 'absolute' | 'lakh' | 'crore'
          rent_period: 'monthly' | 'yearly' | null
          bhk: number | null
          bathrooms: number | null
          balconies: number | null
          carpet_area: number
          builtup_area: number | null
          area_unit: 'sqft' | 'sqmt'
          floor_number: number | null
          total_floors: number | null
          furnishing: 'unfurnished' | 'semi_furnished' | 'fully_furnished'
          facing: string | null
          age_of_property: string | null
          possession_date: string | null
          city: string
          locality: string
          society_or_project: string | null
          full_address: string | null
          map_link: string | null
          latitude: number | null
          longitude: number | null
          amenities: string[]
          video_url: string | null
          brochure_url: string | null
          floor_plan_url: string | null
          rera_number: string | null
          owner_name: string | null
          owner_phone: string | null
          hide_owner_contact: boolean
          featured: boolean
          is_new: boolean
          is_hot_deal: boolean
          meta_title: string | null
          meta_description: string | null
          og_image: string | null
          view_count: number
          whatsapp_click_count: number
          call_click_count: number
          created_at: string
          updated_at: string
          deleted_at?: string | null
        }
        Insert: {
          id?: string
          agency_id: string
          created_by?: string | null
          title: string
          slug: string
          description?: string | null
          property_type: 'flat' | 'villa' | 'plot' | 'shop' | 'office' | 'penthouse' | 'other'
          listing_type: 'sale' | 'rent' | 'lease'
          status?: 'available' | 'sold' | 'rented' | 'under_negotiation' | 'hidden'
          price: number
          price_unit?: 'absolute' | 'lakh' | 'crore'
          rent_period?: 'monthly' | 'yearly' | null
          bhk?: number | null
          bathrooms?: number | null
          balconies?: number | null
          carpet_area: number
          builtup_area?: number | null
          area_unit?: 'sqft' | 'sqmt'
          floor_number?: number | null
          total_floors?: number | null
          furnishing?: 'unfurnished' | 'semi_furnished' | 'fully_furnished'
          facing?: string | null
          age_of_property?: string | null
          possession_date?: string | null
          city?: string
          locality: string
          society_or_project?: string | null
          full_address?: string | null
          map_link?: string | null
          latitude?: number | null
          longitude?: number | null
          amenities?: string[]
          video_url?: string | null
          brochure_url?: string | null
          floor_plan_url?: string | null
          rera_number?: string | null
          owner_name?: string | null
          owner_phone?: string | null
          hide_owner_contact?: boolean
          featured?: boolean
          is_new?: boolean
          is_hot_deal?: boolean
          meta_title?: string | null
          meta_description?: string | null
          og_image?: string | null
          view_count?: number
          whatsapp_click_count?: number
          call_click_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          created_by?: string | null
          title?: string
          slug?: string
          description?: string | null
          property_type?: 'flat' | 'villa' | 'plot' | 'shop' | 'office' | 'penthouse' | 'other'
          listing_type?: 'sale' | 'rent' | 'lease'
          status?: 'available' | 'sold' | 'rented' | 'under_negotiation' | 'hidden'
          price?: number
          price_unit?: 'absolute' | 'lakh' | 'crore'
          rent_period?: 'monthly' | 'yearly' | null
          bhk?: number | null
          bathrooms?: number | null
          balconies?: number | null
          carpet_area?: number
          builtup_area?: number | null
          area_unit?: 'sqft' | 'sqmt'
          floor_number?: number | null
          total_floors?: number | null
          furnishing?: 'unfurnished' | 'semi_furnished' | 'fully_furnished'
          facing?: string | null
          age_of_property?: string | null
          possession_date?: string | null
          city?: string
          locality?: string
          society_or_project?: string | null
          full_address?: string | null
          map_link?: string | null
          latitude?: number | null
          longitude?: number | null
          amenities?: string[]
          video_url?: string | null
          brochure_url?: string | null
          floor_plan_url?: string | null
          rera_number?: string | null
          owner_name?: string | null
          owner_phone?: string | null
          hide_owner_contact?: boolean
          featured?: boolean
          is_new?: boolean
          is_hot_deal?: boolean
          meta_title?: string | null
          meta_description?: string | null
          og_image?: string | null
          view_count?: number
          whatsapp_click_count?: number
          call_click_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          agency_id: string
          url: string
          alt_text: string | null
          display_order: number
          is_cover: boolean
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          agency_id: string
          url: string
          alt_text?: string | null
          display_order?: number
          is_cover?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          agency_id?: string
          url?: string
          alt_text?: string | null
          display_order?: number
          is_cover?: boolean
          created_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          agency_id: string
          property_id: string | null
          name: string
          phone: string
          email: string | null
          message: string | null
          budget_min: number | null
          budget_max: number | null
          preferred_location: string | null
          source: 'website_form' | 'whatsapp' | 'property_page' | 'landing_page' | 'manual'
          status: 'new' | 'contacted' | 'interested' | 'site_visit_scheduled' | 'negotiation' | 'won' | 'lost'
          assigned_to: string | null
          notes: string | null
          follow_up_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          property_id?: string | null
          name: string
          phone: string
          email?: string | null
          message?: string | null
          budget_min?: number | null
          budget_max?: number | null
          preferred_location?: string | null
          source?: 'website_form' | 'whatsapp' | 'property_page' | 'landing_page' | 'manual'
          status?: 'new' | 'contacted' | 'interested' | 'site_visit_scheduled' | 'negotiation' | 'won' | 'lost'
          assigned_to?: string | null
          notes?: string | null
          follow_up_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          property_id?: string | null
          name?: string
          phone?: string
          email?: string | null
          message?: string | null
          budget_min?: number | null
          budget_max?: number | null
          preferred_location?: string | null
          source?: 'website_form' | 'whatsapp' | 'property_page' | 'landing_page' | 'manual'
          status?: 'new' | 'contacted' | 'interested' | 'site_visit_scheduled' | 'negotiation' | 'won' | 'lost'
          assigned_to?: string | null
          notes?: string | null
          follow_up_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      site_visits: {
        Row: {
          id: string
          agency_id: string
          property_id: string
          lead_id: string | null
          customer_name: string
          customer_phone: string
          customer_email: string | null
          visit_date: string
          visit_time: string
          status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
          assigned_agent_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          property_id: string
          lead_id?: string | null
          customer_name: string
          customer_phone: string
          customer_email?: string | null
          visit_date: string
          visit_time: string
          status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
          assigned_agent_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          property_id?: string
          lead_id?: string | null
          customer_name?: string
          customer_phone?: string
          customer_email?: string | null
          visit_date?: string
          visit_time?: string
          status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
          assigned_agent_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          agency_id: string
          client_name: string
          client_location: string | null
          client_photo_url: string | null
          rating: number
          review: string
          property_type: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          client_name: string
          client_location?: string | null
          client_photo_url?: string | null
          rating?: number
          review: string
          property_type?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          client_name?: string
          client_location?: string | null
          client_photo_url?: string | null
          rating?: number
          review?: string
          property_type?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          agency_id: string
          brand_name: string
          tagline: string | null
          logo_url: string | null
          favicon_url: string | null
          primary_color: string
          secondary_color: string
          accent_color: string
          hero_headline: string
          hero_subheadline: string | null
          hero_bg_image: string | null
          hero_cta_text: string
          hero_cta_secondary: string
          about_title: string | null
          about_description: string | null
          broker_name: string | null
          broker_designation: string | null
          broker_experience_years: number | null
          broker_photo_url: string | null
          areas_served: string[]
          phone_number: string
          whatsapp_number: string
          email: string
          office_address: string | null
          google_maps_embed: string | null
          social_facebook: string | null
          social_instagram: string | null
          social_youtube: string | null
          social_linkedin: string | null
          rera_number: string | null
          footer_disclaimer: string | null
          why_choose_us: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          brand_name: string
          tagline?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          primary_color?: string
          secondary_color?: string
          accent_color?: string
          hero_headline?: string
          hero_subheadline?: string | null
          hero_bg_image?: string | null
          hero_cta_text?: string
          hero_cta_secondary?: string
          about_title?: string | null
          about_description?: string | null
          broker_name?: string | null
          broker_designation?: string | null
          broker_experience_years?: number | null
          broker_photo_url?: string | null
          areas_served?: string[]
          phone_number?: string
          whatsapp_number?: string
          email?: string
          office_address?: string | null
          google_maps_embed?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_youtube?: string | null
          social_linkedin?: string | null
          rera_number?: string | null
          footer_disclaimer?: string | null
          why_choose_us?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          brand_name?: string
          tagline?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          primary_color?: string
          secondary_color?: string
          accent_color?: string
          hero_headline?: string
          hero_subheadline?: string | null
          hero_bg_image?: string | null
          hero_cta_text?: string
          hero_cta_secondary?: string
          about_title?: string | null
          about_description?: string | null
          broker_name?: string | null
          broker_designation?: string | null
          broker_experience_years?: number | null
          broker_photo_url?: string | null
          areas_served?: string[]
          phone_number?: string
          whatsapp_number?: string
          email?: string
          office_address?: string | null
          google_maps_embed?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_youtube?: string | null
          social_linkedin?: string | null
          rera_number?: string | null
          footer_disclaimer?: string | null
          why_choose_us?: Json
          created_at?: string
          updated_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          agency_id: string
          property_id: string | null
          event_type: 'page_view' | 'property_view' | 'whatsapp_click' | 'call_click' | 'lead_submit' | 'site_visit_request'
          device_type: string | null
          referrer: string | null
          page_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          property_id?: string | null
          event_type: 'page_view' | 'property_view' | 'whatsapp_click' | 'call_click' | 'lead_submit' | 'site_visit_request'
          device_type?: string | null
          referrer?: string | null
          page_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          property_id?: string | null
          event_type?: 'page_view' | 'property_view' | 'whatsapp_click' | 'call_click' | 'lead_submit' | 'site_visit_request'
          device_type?: string | null
          referrer?: string | null
          page_url?: string | null
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          agency_id: string
          actor_id: string | null
          action: string
          target_type: string
          target_id: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          actor_id?: string | null
          action: string
          target_type: string
          target_id?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          actor_id?: string | null
          action?: string
          target_type?: string
          target_id?: string | null
          metadata?: Json
          created_at?: string
        }
      }
    }
  }
}
