# PropertyLink: Broker Operational Handover & Admin Guide

Welcome to **PropertyLink**, the bespoke property inventory and client conversion platform designed for independent Indian real-estate brokers and agencies in **Panvel, Kharghar, and Navi Mumbai**.

This operational manual provides a complete walkthrough of how to operate the platform, manage listings, convert inbound buyer inquiries, and customize agency branding.

---

## 1. Accessing the Admin Operations Portal

- **Admin Login Route:** `/admin/login`
- **Default Credentials (Local / Staging):**
  - **Email:** `admin@apexrealty.in`
  - **Password:** `Admin@PropertyLink2026!`
- **Role:** Full Agency Owner / Broker Admin

> **Security Note:** In production with Supabase Auth, routes under `/admin/*` are protected via Next.js Middleware and Supabase Row Level Security (RLS). Public visitors cannot access unpublished drafts or lead contact records.

---

## 2. Managing Properties (Add / Edit / Clone / Status)

### 2.1 Adding a New Property
Navigate to **Properties** -> **Add Property** (`/admin/properties/new`). Fill out the structured sections:

1. **Basic Details:**
   - **Property Title:** E.g., *"Hiranandani Fortune City 2 BHK Luxury Flat"*
   - **Listing Purpose:** *Buy* or *Rent*
   - **Property Type:** *Apartment, Independent Villa, Plot / Land, Commercial Shop, or Office Space*
   - **Price in INR:** Enter numeric value (e.g., `8500000`). The system automatically converts this to Indian standard representation (`₹85 Lakh` or `₹1.25 Cr`).
   - **Price on Request / Negotiable:** Toggle if price is subject to discussion.

2. **Specifications:**
   - **BHK:** 1, 2, 3, 4+ BHK
   - **Carpet Area:** State the exact MahaRERA usable carpet area in sq ft.
   - **Floor Details:** Floor number and total floors in the tower.
   - **Facing:** East, North-East, Vastu-compliant, etc.
   - **Possession Date:** "Ready to Move" or prospective possession month/year.

3. **Location & Society:**
   - **Locality:** Panvel, Kharghar, Kamothe, Taloja, New Panvel, Seawoods, Ulwe, or CBD Belapur.
   - **Society / Project Name:** Project name (e.g., *Marathon Nexzone, Godrej Highlands*).
   - **Google Maps Link:** Optional embed or link for neighborhood preview.

4. **Media & Documents:**
   - **Image Upload:** Upload high-resolution 16:9 or 4:3 photographs. Drag to reorder, and mark your elevation or living room shot as the **Cover Image**.
   - **Walkthrough Video:** Paste a YouTube video tour URL.
   - **Floor Plan & Brochure:** Upload or link PDFs for high-intent buyer downloads.
   - **MahaRERA Registration Number:** E.g., `P52000012345`. This displays a verified badge on the listing.

5. **Publishing Status:**
   - **Draft:** Save without making public while awaiting photos or documents.
   - **Available:** Published immediately on the live website.
   - **Under Negotiation:** Keeps the listing visible but communicates active tokens.
   - **Sold / Rented:** Preserves deal proof for prospective sellers without misleading current searchers.

### 2.2 Duplicating Properties
Brokers frequently have multiple similar configurations in the same development. Click the **Duplicate** button on any listing in the table to create a pre-filled clone and change just the floor number and unit price.

---

## 3. Lead Capture & Inquiry Pipeline

Every inquiry captured across the site includes full context:
- **Client Name**
- **Mobile Number OR Email** (visitors choose their preferred contact method)
- **Specific Property & Locality Interested In**
- **Budget & Buy/Rent Intent**
- **Capture Source:** Homepage Hero, Property Page, Soft Exit Prompt, or Direct WhatsApp Link.

### 3.1 One-Click WhatsApp Follow-Up
On any lead in the **Enquiries** (`/admin/leads`) pipeline:
- Click the green **WhatsApp** icon.
- This immediately opens WhatsApp Web or your mobile WhatsApp with a pre-filled message addressing the buyer by name and citing the exact property they viewed.

### 3.2 Lead Status Tracking
Organize prospects through clear operational stages:
- `New`: Fresh inbound submission awaiting callback.
- `Contacted`: Initial conversation held; requirements clarified.
- `Site Visit Scheduled`: Date and time confirmed for physical inspection.
- `Negotiation`: Token/offer discussed between buyer and owner.
- `Closed Won`: Deal registered and brokerage settled.
- `Closed Lost`: Buyer opted out or purchased elsewhere.

### 3.3 Exporting Leads
Click **Export to CSV** at the top right of the Enquiries table to download an Excel-ready spreadsheet of all contacts for offline broadcasts or agency records.

---

## 4. Agency Branding & Site Customization

Navigate to **Site Settings** (`/admin/settings`):
- **Agency Name:** Defaults to *Apex Realty Panvel*.
- **Direct WhatsApp Number:** The phone number used for floating WhatsApp buttons and deep links.
- **Office Address:** Physical location in Panvel / Navi Mumbai displayed in the footer and contact sections.
- **MahaRERA Firm License Number:** Displayed across footer and trust centers to satisfy regulatory guidelines.

---

## 5. Trust Signals & Conversion Optimization

1. **Zero Fake Tactics:** The platform strictly avoids fake countdown timers, fake stock counters, or misleading badges.
2. **Speed to Lead:** Responding to WhatsApp inquiries within 15 minutes yields a 70%+ increase in site visit confirmations.
3. **MahaRERA Clarity:** Clear titles and verified numbers create an instant differentiator against generic marketplace portals.

---

*For technical assistance, updates, or custom database migrations, contact the engineering team or refer to `supabase/migrations/`.*
