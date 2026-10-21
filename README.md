# PropertyLink — Premium Branded Real Estate Platform for Indian Brokers

**PropertyLink** is a production-ready, white-label, mobile-first real estate web platform designed specifically for an individual property broker/agency in India.

It is **NOT** a public marketplace and **NOT** a multi-vendor SaaS. It is an independent broker's own branded digital presence:
- **Public Visitors**: Browse verified residential & commercial properties, filter by budget in Indian format (Lakhs/Crores), and connect directly with the broker via pre-filled WhatsApp deep links.
- **Broker / Owner**: Securely log in to `/admin` to manage listings, track enquiries, schedule accompanied site visits, and customize branding, colors, and hero content without touching a single line of code.

---

## 🌟 Key Features

### 1. Luxury Real Estate Aesthetic
- **Color Palette**: Deep Charcoal/Black (`#0c0f14`), Warm Off-White (`#fdfbf7`), and Muted Gold/Bronze Accent (`#c5a059` / `#b38b42`).
- **Typography**: Display Serif (`Playfair Display`) for headings and clean Sans-Serif (`Plus Jakarta Sans`) for body text.
- **Micro-Animations**: Framer Motion scroll reveals, card hover elevations, smooth transitions, and skeleton loaders.
- **Mobile-First**: Optimized for mid-range Android & iOS smartphones with sticky bottom action bars and full-screen filter drawers.

### 2. High-Converting WhatsApp Deep Link Integration
- Every listing card and property page features an **"Enquire on WhatsApp"** button that opens WhatsApp with a prefilled, structured message:
  ```text
  Hi, I am interested in this property:
  [Property Title]
  Price: [Formatted Indian Price]
  Location: [Locality, City]
  Link: [Direct Property URL]
  ```
- Instant deep-linking without requiring users to register or fill out long lead forms.
- Additional sticky WhatsApp bubble in the navbar, hero section, detail pages, and footer.

### 3. Public Website Structure
1. **Sticky Transparent Navbar**: Seamless glass effect that solidifies on scroll with logo, navigation links, Call Now, and prominent WhatsApp CTAs.
2. **Cinematic Hero**: Full-width imagery with integrated quick-search bar (Buy/Rent, Location, Property Type, Budget, BHK).
3. **Featured Properties**: Curated showcase of top listings with price in Indian notation, carpet area, BHK badge, and quick details.
4. **Live Listings Directly on Homepage**: Instant search by society/project/keyword, multi-criteria filters, result counter, skeleton loading states, empty state with WhatsApp requirement submission, and pagination.
5. **Why Choose Us**: Value proposition cards highlighting MahaRERA verification, zero buyer commission on direct developer inventory, local micro-market expertise, and accompanied AC cab site visits.
6. **About the Broker**: Professional profile of Rajesh Sharma (14+ years experience, 450+ families settled, MahaRERA registration number, and verified client testimonials).
7. **Contact / CTA Section**: Direct phone, office address in Panvel, Google Maps embed, and lead capture form.
8. **Footer**: Clean legal disclaimers, RERA compliance notices, quick navigation, and social links.

### 4. Property Detail Experience (`/property/[slug]`)
- Full-width image gallery with lightbox, counter, and keyboard navigation.
- Key specification facts: Configuration, Carpet Area, Built-up Area, Floor, Facing, Age, Possession, Parking, and Transaction Type.
- Amenities grid with luxury icon chips.
- Google Maps location embed and nearby transit/social infrastructure landmarks (railway station, schools, hospitals, highways).
- Accompanied AC cab site visit request form.
- Similar properties carousel based on locality and property configuration.

### 5. Owner Admin Panel (`/admin`)
- **Dashboard (`/admin`)**: Real-time KPI stat cards (Total Properties, Active Listings, Sold Out, Rentals, Total Enquiries, Site Visits, Property Views), 30-day views/enquiries chart, and recent activity log.
- **Property Management (`/admin/properties`)**:
  - Table and Grid view switchers.
  - Search, filter by status, and filter by locality.
  - **Bulk Actions**: Select multiple properties to Mark as Sold, Toggle Featured, or Move to Trash.
  - **Mark as Sold**: One-click status change with confirmation modal.
  - **Duplicate Property**: Instantly clone existing listings to save time on similar builder inventory.
  - **Soft Delete & Restore**: Dedicated "Trash / Archived" tab to restore or permanently remove listings.
- **Add / Edit Property Form (`/admin/properties/new` & `[id]/edit`)**:
  - Auto-generating URL slug from title.
  - Indian pricing input (Lakhs & Crores).
  - Specifications (BHK, bathrooms, floor, facing, possession date).
  - Multi-image uploader with drag-and-drop, reordering, and cover image assignment.
  - Amenities selector with 18+ pre-configured chips.
  - MahaRERA number and approval details.
- **Enquiries & CRM (`/admin/enquiries`)**:
  - 7-stage sales pipeline: *New → Contacted → Interested → Site Visit Scheduled → Negotiation → Closed → Lost*.
  - 1-click WhatsApp reply with prefilled context, click-to-call, internal notes, and follow-up tracking.
- **Site Visits (`/admin/site-visits`)**: Calendar and list view for customer visit requests with accompanied consultant assignments.
- **Branding & Settings (`/admin/settings`)**: Modify broker name, contact numbers, primary & accent colors, hero headline/subhead, office address, and social links without editing code.

---

## 🏙️ Seed Data: 10 Realistic Indian Demo Properties

The platform is pre-loaded with 10 realistic properties across the Navi Mumbai & Panvel corridor:

| # | Property Title | Locality | Price | Configuration | Carpet Area |
|---|---|---|---|---|---|
| 1 | **2 BHK flat in Kharghar** | Sector 20, Kharghar | ₹85 Lakh | 2 BHK Flat | 720 sq.ft. |
| 2 | **3 BHK flat in Panvel** | Palaspe Phata, Panvel | ₹1.25 Crore | 3 BHK Flat | 1,180 sq.ft. |
| 3 | **1 BHK rental in Kalamboli** | Sector 1E, Kalamboli | ₹15,000 / mo | 1 BHK Flat | 460 sq.ft. |
| 4 | **Residential plot in Taloja** | Sector 26, Taloja Phase 2 | ₹45 Lakh | Residential Plot | 1,100 sq.ft. |
| 5 | **Shop in Panvel market** | Old Panvel Market | ₹90 Lakh | Commercial Shop | 280 sq.ft. |
| 6 | **Office in Belapur** | CBD Belapur Sector 11 | ₹1.8 Crore | IT / Corporate Office | 1,450 sq.ft. |
| 7 | **Villa in New Panvel** | Sector 19, New Panvel East | ₹2.4 Crore | 4 BHK Luxury Villa | 2,400 sq.ft. |
| 8 | **2 BHK resale flat in Kamothe** | Sector 36, Kamothe | ₹72 Lakh | 2 BHK Flat | 680 sq.ft. |
| 9 | **Commercial space in Ulwe** | Sector 19, Ulwe | ₹65 Lakh | Retail / Office Space | 520 sq.ft. |
| 10 | **4 BHK penthouse in Seawoods** | Sector 58, Seawoods Grand | ₹3.2 Crore | 4 BHK Penthouse | 2,850 sq.ft. |

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4, PostCSS, Vanilla CSS tokens, Glassmorphism
- **UI Components**: shadcn/ui patterns, Radix primitives, Lucide icons
- **Database & Auth**: PostgreSQL via Supabase (Auth, Row Level Security, Storage)
- **Animations**: Framer Motion
- **Form Handling & Validation**: React Hook Form, Zod
- **Deployment**: Vercel

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
# Supabase Public Keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Supabase Server-Only Secret (Never exposed to client)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Platform Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Zero-Config Fallback Mode**: If running locally without live Supabase credentials, PropertyLink's internal store automatically powers all 10 realistic properties, search filters, and admin CRUD actions for immediate evaluation!

### 4. Running the Development Server
```bash
npm run dev
```
- Public Portal: [http://localhost:3000](http://localhost:3000)
- Properties Directory: [http://localhost:3000/properties](http://localhost:3000/properties)
- Owner Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🗄️ Database Setup (Supabase)

Five SQL migration files are provided in `supabase/migrations/`:

1. `00001_initial_schema.sql`: Core PostgreSQL schema with GIN trgm full-text search indexes.
2. `00002_rls_policies.sql`: Complete Row Level Security (RLS) policies for tenant data isolation and Supabase Storage buckets.
3. `00003_seed_data.sql`: The 10 realistic Navi Mumbai properties, agent profile, and testimonials.
4. `00004_individual_broker_schema.sql`: Clean standalone single-broker schema matching exact table specifications.
5. `00005_master_schema_and_rls.sql`: Master database schema with full Row Level Security (RLS) policies for all core tables (`profiles`, `properties`, `property_media`, `enquiries`, `property_events`, `site_settings`, `testimonials`, `audit_logs`).

### Running Migrations:
You can run these scripts in your Supabase project's **SQL Editor** in order, or use the Supabase CLI:
```bash
npx supabase link --project-ref your-project-ref
npx supabase db push
```

### Creating Your Admin User in Supabase:
1. In the Supabase Dashboard, navigate to **Authentication → Users → Add User**.
2. Create an admin user with your email and a secure password.
3. In the SQL Editor, grant admin access by linking the user to `profiles`:
   ```sql
   INSERT INTO public.profiles (user_id, business_name, owner_name, email, role)
   VALUES ('YOUR_USER_AUTH_ID', 'Apex Realty Navi Mumbai', 'Rajesh Sharma', 'contact@apexrealty.in', 'owner');
   ```

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub / GitLab.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and select your repository.
3. Add the following Environment Variables in the Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (set to your production domain, e.g., `https://apexrealty.in`)
4. Click **Deploy**. Vercel will build and deploy the production bundle with static optimization.

---

## 📄 License
MIT © PropertyLink
