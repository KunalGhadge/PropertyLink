# PropertyLink — Production-Ready White-Label Real Estate OS

PropertyLink is a custom, white-label, mobile-first real-estate platform designed specifically for Indian real estate brokers, small agencies, and builders. It provides an agency with its own branded property portal, high-converting WhatsApp lead capture, GSAP scroll animations, and a no-code administrative back-office.

---

## 🌟 Key Features

### Public Website
- **Hero with GSAP Scroll Animations**: Parallax imagery, staggered reveals, floating cards, and scroll-triggered animations optimized for Core Web Vitals and `prefers-reduced-motion`.
- **Indian Market Ready**: Native support for **₹ Lakh** and **₹ Crore** formatting, **BHK** configurations, **sq.ft.** carpet area, and **MahaRERA** compliance badges.
- **WhatsApp-First Conversions**:
  - One-tap WhatsApp chat with pre-filled structured enquiry messages containing the property title, price, locality, and direct link.
  - Floating WhatsApp bubble for mobile users.
  - Lead capture form with instant WhatsApp fallback.
- **Filterable Properties Directory (`/properties`)**:
  - Filters for Buy/Rent, Property Type (Flat, Penthouse, Villa, Plot, Commercial), BHK, Budget range, Locality, Furnishing, and Amenities.
  - URL-synchronized query parameters allowing users to bookmark and share filtered views.
- **Detailed Property Page (`/property/[slug]`)**:
  - Fullscreen gallery with lightbox, swipe support, and YouTube/Vimeo video tour modal.
  - Comprehensive specification grid, nearby landmark connectivity, and Google Maps embed.
  - One-click accompanied site visit booking with free AC cab pickup requests.
  - Broker-controlled owner contact privacy (brokers can hide owner phone numbers from public view).
  - Dynamic SEO tags and `RealEstateListing` JSON-LD structured data for Google Real Estate search snippets.

### Broker Admin Portal (`/admin`)
- **Analytics Dashboard**: Real-time cards for total listings, active vs sold vs rented, views (today, this week, this month), total leads, WhatsApp clicks, call clicks, and site visits.
- **Visual Analytics Charts**: Weekly traffic vs enquiry charts and pipeline distribution graphs.
- **Property Management (`/admin/properties`)**:
  - Add, edit, duplicate, delete, archive, and filter listings.
  - Quick toggles for **Featured**, **Hot Deal**, and **Available / Sold** states.
  - Reorder photos, set cover images, and manage amenities.
- **Lead Management & CRM (`/admin/leads`)**:
  - Track leads across pipeline stages (`new`, `contacted`, `interested`, `site_visit_scheduled`, `negotiation`, `won`, `lost`).
  - Add deal notes, assign leads to consultants, and start 1-click WhatsApp chats.
  - Export leads to **CSV** with one click.
- **Accompanied Site Visits Scheduler (`/admin/site-visits`)**:
  - Manage scheduled buyer visits, view pickup requests, and dispatch consultants.
- **No-Code Site Customization (`/admin/settings`)**:
  - Customize brand name, theme colors, hero headline, subhead, CTA buttons, broker biography, phone numbers, WhatsApp business numbers, and MahaRERA disclaimers without writing any code.
- **Team & Advisors (`/admin/team`)**:
  - Manage agents, contact numbers, and geographical specializations.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15+ App Router, React 19, TypeScript |
| **Styling** | Tailwind CSS v4, Vanilla CSS Design System, Glassmorphism |
| **Database & Auth** | PostgreSQL via Supabase (Auth, RLS, Storage) |
| **Animations** | GSAP 3 + ScrollTrigger |
| **Forms & Validation** | React Hook Form, Zod |
| **Data Fetching** | TanStack Query, Server Components & Server Actions |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node.js 20 & 24)
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/PropertyLink.git
cd PropertyLink

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the project root:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-do-not-expose

# Tenant Settings
NEXT_PUBLIC_DEFAULT_AGENCY_ID=00000000-0000-0000-0000-000000000001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note**: PropertyLink includes an intelligent fallback store. If run without live Supabase credentials, the app operates seamlessly with the 10 realistic Navi Mumbai seed properties and demo agency data for immediate interactive evaluation!

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to view the broker admin portal.

---

## 🗄️ Supabase Setup & Database Migrations

Three modular migration files are located in `supabase/migrations/`:

1. `00001_initial_schema.sql`
   - Creates tables: `agencies`, `profiles`, `agents`, `properties`, `property_images`, `leads`, `site_visits`, `testimonials`, `site_settings`, `analytics_events`, `audit_logs`.
   - Sets up indexes (GIN trgm full-text search, composite indexes on locality/price/status).
   - Adds automatic `updated_at` triggers.

2. `00002_rls_policies.sql`
   - Enables Row Level Security (RLS) on all 11 tables.
   - Public read permissions for active agencies, published properties, testimonials, and settings.
   - Public insert for leads, site visit bookings, and anonymous analytics tracking.
   - Strict tenant isolation: brokers and agents can only view, create, and update data matching their JWT `agency_id`.
   - Supabase Storage RLS policies for `property-media`, `agency-assets`, and `documents` buckets.

3. `00003_seed_data.sql`
   - Seeds demo agency **Apex Realty Navi Mumbai**.
   - Seeds 3 property consultants (Rajesh Sharma, Rahul Patil, Pooja Nair).
   - Seeds 10 realistic Navi Mumbai properties across **Panvel, Kharghar, Kamothe, Taloja, and Seawoods**.
   - Seeds initial customer leads, accompanied site visits, and verified client testimonials.

### Running Migrations via Supabase CLI:
```bash
# Link to your Supabase project
npx supabase link --project-ref your-project-id

# Push migrations
npx supabase db push
```
Or execute the SQL files directly in the Supabase Dashboard **SQL Editor**.

---

## 👥 Multi-Tenant Architecture: Onboarding New Brokers

PropertyLink is architected from day one for multi-tenant scalability:

1. Every tenant-owned table contains an `agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE`.
2. PostgreSQL RLS policies evaluate `public.get_auth_agency_id()` from the authenticated user's profile, making cross-tenant data leaks impossible at the database level.
3. To onboard a new agency:
   - Insert a row into `agencies` with the agency's name, slug, phone, and RERA number.
   - Create a user in Supabase Auth and assign their `agency_id` and `role = 'broker_admin'` in `profiles`.
   - Seed default `site_settings` for that agency.
   - The platform can route requests via subdomain (e.g., `agency-slug.propertylink.in`) or custom domain mapping.

---

## 🚢 Deployment to Vercel

1. Push your code to GitHub.
2. In the Vercel Dashboard, select **Add New Project** and import the repository.
3. Configure the Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_DEFAULT_AGENCY_ID`
   - `NEXT_PUBLIC_SITE_URL`
4. Click **Deploy**. Vercel will build and optimize the App Router routes.

---

## 📄 License
MIT © PropertyLink
