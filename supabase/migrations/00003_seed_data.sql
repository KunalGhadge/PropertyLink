-- Migration: 00003_seed_data.sql
-- Description: Realistic seed data for Apex Realty Navi Mumbai demo tenant

-- 1. Insert Demo Agency
INSERT INTO public.agencies (
    id, name, slug, logo_url, email, phone, whatsapp_number, rera_number, address, city, state, pincode, is_active
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Apex Realty Navi Mumbai',
    'apex-realty',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80',
    'contact@apexrealty.in',
    '+91 98201 23456',
    '+91 98201 23456',
    'MahaRERA Reg: A52000012345',
    'Shop 12, Ground Floor, Orion Plaza, Sector 15, Old Panvel, Navi Mumbai',
    'Navi Mumbai',
    'Maharashtra',
    '410206',
    true
) ON CONFLICT (id) DO NOTHING;

-- 2. Insert Agents
INSERT INTO public.agents (
    id, agency_id, name, email, phone, whatsapp_number, designation, avatar_url, experience_years, specialization, is_active
) VALUES 
(
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000001',
    'Rajesh Sharma',
    'rajesh@apexrealty.in',
    '+91 98201 23456',
    '+91 98201 23456',
    'Founder & Principal Broker',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    14,
    ARRAY['High-End Luxury', 'Kharghar & Panvel', 'Commercial Investment'],
    true
),
(
    '00000000-0000-0000-0000-000000000102',
    '00000000-0000-0000-0000-000000000001',
    'Rahul Patil',
    'agent.rahul@apexrealty.in',
    '+91 98199 87654',
    '+91 98199 87654',
    'Senior Property Advisor',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    7,
    ARRAY['Affordable Housing', 'Taloja & Kamothe', 'First Time Buyers'],
    true
),
(
    '00000000-0000-0000-0000-000000000103',
    '00000000-0000-0000-0000-000000000001',
    'Pooja Nair',
    'pooja.nair@apexrealty.in',
    '+91 97690 11223',
    '+91 97690 11223',
    'Client Relationship Manager',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    5,
    ARRAY['NRI Advisory', 'Belapur & Seawoods', 'Home Loan Assistance'],
    true
)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Site Settings
INSERT INTO public.site_settings (
    agency_id, brand_name, tagline, logo_url, primary_color, secondary_color, accent_color,
    hero_headline, hero_subheadline, hero_bg_image, hero_cta_text, hero_cta_secondary,
    about_title, about_description, broker_name, broker_designation, broker_experience_years,
    broker_photo_url, areas_served, phone_number, whatsapp_number, email, office_address,
    rera_number, footer_disclaimer
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Apex Realty Panvel',
    'Navi Mumbai’s Premier Real Estate Consultancy',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80',
    '#0F172A',
    '#0284C7',
    '#25D366',
    'Find Your Dream Home in Panvel, Navi Mumbai & Kharghar',
    'Verified premium apartments, golf-view villas, and high-yield properties with 100% MahaRERA transparency and zero hidden brokerage.',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    'Explore 100+ Properties',
    'Chat on WhatsApp',
    '14+ Years of Trust & Over 1,200 Happy Homeowners in Navi Mumbai',
    'Founded by Rajesh Sharma, Apex Realty is Navi Mumbai’s most trusted boutique real estate advisory. We specialize in verified inventory across Panvel, Kharghar, Taloja, Kamothe, and Seawoods. Our commitment is simple: absolute legal clarity, zero buyer brokerage on developer inventory, and end-to-end guidance from site visit to registration.',
    'Rajesh Sharma',
    'Founder & Principal Broker',
    14,
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    ARRAY['Panvel', 'Kharghar', 'Kamothe', 'Taloja Phase 1 & 2', 'Seawoods', 'CBD Belapur', 'New Panvel', 'Ulwe'],
    '+91 98201 23456',
    '+91 98201 23456',
    'contact@apexrealty.in',
    'Shop 12, Ground Floor, Orion Plaza, Sector 15, Old Panvel, Navi Mumbai - 410206',
    'MahaRERA Reg No: A52000012345',
    'Disclaimer: Apex Realty is an authorized marketing partner for registered builders under MahaRERA. Project images, specifications and pricing are subject to revision as per developer guidelines.'
) ON CONFLICT (agency_id) DO UPDATE SET brand_name = EXCLUDED.brand_name;

-- 4. Insert 10 Realistic Navi Mumbai Properties
INSERT INTO public.properties (
    id, agency_id, title, slug, description, property_type, listing_type, status,
    price, price_unit, bhk, bathrooms, balconies, carpet_area, builtup_area, area_unit,
    floor_number, total_floors, furnishing, facing, age_of_property, possession_date,
    city, locality, society_or_project, full_address, map_link, amenities,
    rera_number, owner_name, owner_phone, hide_owner_contact, featured, is_new, is_hot_deal,
    view_count, whatsapp_click_count, call_click_count
) VALUES 
(
    '00000000-0000-0000-0000-000000000201',
    '00000000-0000-0000-0000-000000000001',
    'Godrej Highland - 3 BHK Luxury Deck Residence',
    'godrej-highland-3-bhk-kharghar-sector-36',
    'Spectacular 3 BHK high-floor apartment at Godrej Highland, nestled at the foothills of Kharghar hills. Features an expansive sundeck offering unobstructed valley views, Italian marble flooring in living room, premium modular kitchen with Siemens fittings, and access to a 45,000 sq.ft. luxury club with Olympic swimming pool.',
    'flat', 'sale', 'available',
    18500000, 'crore', 3, 3, 2, 1120, 1480, 'sqft',
    18, 28, 'semi_furnished', 'East', 'Under Construction', 'Dec 2026',
    'Navi Mumbai', 'Kharghar', 'Godrej Highland',
    'Sector 36, Upper Kharghar, Navi Mumbai, Maharashtra 410210',
    'https://maps.google.com/?q=Kharghar+Sector+36',
    ARRAY['Infinity Pool', 'Gymnasium', 'Valley View Deck', 'Clubhouse', 'Children Play Area', 'Covered Car Parking', '24x7 Security', 'High Speed Elevators', 'EV Charging Station'],
    'MahaRERA: P52000028754', 'Mr. Amit Deshmukh', '+91 98200 99887', true,
    true, true, true, 482, 34, 18
),
(
    '00000000-0000-0000-0000-000000000202',
    '00000000-0000-0000-0000-000000000001',
    'Hiranandani Fortune City - 2 BHK Forest View',
    'hiranandani-fortune-city-2-bhk-panvel',
    'Experience integrated township living at Hiranandani Fortune City, Panvel. This 2 BHK features neoclassical architecture, grand double-height entrance lobby, cross-ventilation, and serene forest views. Minutes from Mumbai-Pune Expressway and upcoming Navi Mumbai International Airport.',
    'flat', 'sale', 'available',
    9200000, 'lakh', 2, 2, 1, 765, 1020, 'sqft',
    11, 32, 'unfurnished', 'North-East', '0-1 years', 'Ready to Move',
    'Navi Mumbai', 'Panvel', 'Hiranandani Fortune City',
    'Survey No. 30, Bhokarpada, Panvel, Navi Mumbai 410206',
    'https://maps.google.com/?q=Hiranandani+Fortune+City+Panvel',
    ARRAY['Landscaped Gardens', 'Swimming Pool', 'Tennis Court', 'Squash Court', 'Mini Theatre', 'School Inside Township', 'Supermarket', '24x7 Power Backup'],
    'MahaRERA: P52000001511', 'Vikram Singhania', '+91 98211 44556', true,
    true, false, true, 630, 52, 29
),
(
    '00000000-0000-0000-0000-000000000203',
    '00000000-0000-0000-0000-000000000001',
    'Marathon Nexzone - 2.5 BHK Panoramic Suite',
    'marathon-nexzone-2-5-bhk-panvel',
    'Spacious 2.5 BHK with dedicated work-from-home study room at Marathon Nexzone. Uninterrupted view of scenic hills and easy access to Panvel railway junction. Complete with modern clubhouse, fitness hub, and internal podium garden.',
    'flat', 'sale', 'available',
    8400000, 'lakh', 2, 2, 2, 820, 1100, 'sqft',
    14, 30, 'unfurnished', 'North', '1-5 years', 'Ready to Move',
    'Navi Mumbai', 'Panvel', 'Marathon Nexzone',
    'National Highway 4B, JNPT Road, Near Palaspe Phata, Panvel 410206',
    'https://maps.google.com/?q=Marathon+Nexzone+Panvel',
    ARRAY['Clubhouse', 'Gym', 'Jogging Track', 'Intercom', 'CCTV Surveillance', 'Solar Water Heating', 'Reserved Parking'],
    'MahaRERA: P52000000142', 'Suresh Kulkarni', '+91 98334 77881', true,
    true, false, false, 395, 27, 12
),
(
    '00000000-0000-0000-0000-000000000204',
    '00000000-0000-0000-0000-000000000001',
    'Sai Miracle - 4 BHK Ultra Luxury Penthouse',
    'sai-miracle-4-bhk-kharghar-central-park',
    'Ultra-premium duplex penthouse overlooking Kharghar Central Park and Golf Course. Features private terrace garden, dedicated jacuzzi, servant quarters, private high-speed elevator access, and 3 reserved basement car parks.',
    'penthouse', 'sale', 'available',
    34000000, 'crore', 4, 5, 3, 2450, 3200, 'sqft',
    21, 22, 'fully_furnished', 'East', '0-1 years', 'Ready to Move',
    'Navi Mumbai', 'Kharghar', 'Sai Miracle',
    'Sector 35, Near Central Park & Metro Station, Kharghar, Navi Mumbai 410210',
    'https://maps.google.com/?q=Central+Park+Kharghar',
    ARRAY['Private Terrace', 'Jacuzzi', 'Servant Quarters', 'Private Elevator', 'Golf Course View', 'Smart Home Automation', '3 Car Parks', 'Infinity Pool'],
    'MahaRERA: P52000019231', 'Anand Mahindra Group Rep', '+91 99201 00223', true,
    true, true, false, 820, 48, 31
),
(
    '00000000-0000-0000-0000-000000000205',
    '00000000-0000-0000-0000-000000000001',
    'Wadhwa Wise City - 1 BHK Smart Lifestyle Home',
    'wadhwa-wise-city-1-bhk-panvel',
    'Affordable luxury by The Wadhwa Group. Pure air, natural sunlight (Design.FIT principle), and master-planned township living with retail, healthcare, and schools. Prime investment asset for rental yields.',
    'flat', 'sale', 'available',
    4500000, 'lakh', 1, 1, 1, 430, 580, 'sqft',
    7, 24, 'unfurnished', 'East', '1-5 years', 'Ready to Move',
    'Navi Mumbai', 'Panvel', 'Wadhwa Wise City',
    'Old Mumbai-Pune Highway, Bhatan, Panvel 410206',
    'https://maps.google.com/?q=Wadhwa+Wise+City+Panvel',
    ARRAY['Landscaped Park', 'Gym', 'Kids Play Area', 'Shuttle Bus to Station', 'Convenience Store', 'Fire Fighting System'],
    'MahaRERA: P52000016254', 'Sanjay Mehta', '+91 98112 33445', true,
    false, false, true, 510, 41, 19
),
(
    '00000000-0000-0000-0000-000000000206',
    '00000000-0000-0000-0000-000000000001',
    'Paradise Sai Sun City - 2 BHK Garden Facing Flat',
    'paradise-sai-sun-city-2-bhk-upper-kharghar',
    'Vastu-compliant 2 BHK apartment in the fast-growing Upper Kharghar hub. Features podium garden views, vitrified tile flooring, granite platform kitchen, and 3-tier safety infrastructure. Quick access to Navi Mumbai Metro.',
    'flat', 'sale', 'available',
    6800000, 'lakh', 2, 2, 1, 675, 910, 'sqft',
    9, 21, 'semi_furnished', 'North-East', 'Under Construction', 'June 2026',
    'Navi Mumbai', 'Kharghar', 'Sai Sun City',
    'Upper Kharghar, Near Ghot Camp, Navi Mumbai 410210',
    'https://maps.google.com/?q=Ghot+Kharghar',
    ARRAY['Swimming Pool', 'Badminton Court', 'Jogging Track', 'Banquet Hall', '24x7 Security', 'High Speed Lifts'],
    'MahaRERA: P52000022312', 'Manoj Joshi', '+91 97665 11229', true,
    true, true, false, 290, 18, 9
),
(
    '00000000-0000-0000-0000-000000000207',
    '00000000-0000-0000-0000-000000000001',
    'Seawoods Grand Central Enclave - 3 BHK Sea View',
    'seawoods-grand-central-3-bhk-residence',
    'Prestigious 3 BHK apartment in prime Seawoods Sector 40. Walking distance from Grand Central Mall and Seawoods railway station. Breathtaking flamingo sanctuary and creek views with ultra-luxury finishes.',
    'flat', 'sale', 'available',
    27500000, 'crore', 3, 3, 2, 1480, 1950, 'sqft',
    16, 26, 'fully_furnished', 'West', '1-5 years', 'Ready to Move',
    'Navi Mumbai', 'Seawoods', 'Grand Central Enclave',
    'Sector 40, Seawoods West, Navi Mumbai 400706',
    'https://maps.google.com/?q=Seawoods+Grand+Central',
    ARRAY['Flamingo Sanctuary View', 'Designer Lobby', 'Infinity Pool', 'Gym', 'Valet Parking', 'Concierge Service', 'Creek View Deck'],
    'MahaRERA: P52000011982', 'Naveen Aggarwal', '+91 98205 66778', true,
    true, false, false, 740, 61, 35
),
(
    '00000000-0000-0000-0000-000000000208',
    '00000000-0000-0000-0000-000000000001',
    'Akshar Silicia - 2 BHK Premium Corner Flat',
    'akshar-silicia-2-bhk-kamothe-sector-19',
    'Ready-to-move spacious 2 BHK corner residence in Kamothe Sector 19. Excellent cross-ventilation, close to Khandeshwar Station and MGM Hospital. Ideal for families seeking a mature residential neighborhood.',
    'flat', 'sale', 'available',
    7900000, 'lakh', 2, 2, 2, 710, 960, 'sqft',
    6, 14, 'semi_furnished', 'East', '1-5 years', 'Ready to Move',
    'Navi Mumbai', 'Kamothe', 'Akshar Silicia',
    'Plot 14, Sector 19, Kamothe, Navi Mumbai 410209',
    'https://maps.google.com/?q=Kamothe+Sector+19',
    ARRAY['Gym', 'Party Lawn', 'Covered Parking', 'Power Backup', 'Security Guards', 'Intercom'],
    'MahaRERA: P52000005432', 'Sunil Chavan', '+91 98920 33441', true,
    false, false, false, 245, 16, 8
),
(
    '00000000-0000-0000-0000-000000000209',
    '00000000-0000-0000-0000-000000000001',
    'Today Royal Elegance - 1 BHK Budget Friendly Flat',
    'today-royal-elegance-1-bhk-taloja',
    'Well-planned 1 BHK apartment near Taloja Metro Station (Line 1). Low maintenance society, zero stamp duty benefits for select units, and excellent rental yield from MIDC & IT workforce.',
    'flat', 'sale', 'available',
    3800000, 'lakh', 1, 1, 1, 445, 600, 'sqft',
    4, 12, 'unfurnished', 'North', '0-1 years', 'Ready to Move',
    'Navi Mumbai', 'Taloja', 'Today Royal Elegance',
    'Sector 24, Taloja Phase 1, Navi Mumbai 410208',
    'https://maps.google.com/?q=Taloja+Phase+1',
    ARRAY['Metro Connectivity', 'Children Play Area', 'Rooftop Gazebo', 'Lift with Generator Backup', 'Fire Safety System'],
    'MahaRERA: P52000008912', 'Ramesh Jadhav', '+91 98207 88990', true,
    false, true, true, 410, 31, 14
),
(
    '00000000-0000-0000-0000-000000000210',
    '00000000-0000-0000-0000-000000000001',
    'Indiabulls Greens - 3 BHK Club Class Apartment',
    'indiabulls-greens-3-bhk-panvel',
    'Luxurious 3 BHK apartment with large master suite, wooden flooring, and double balconies. Located inside Indiabulls Greens, a 50-acre gated township with CBSE school, medical clinic, and Olympic-sized clubhouse.',
    'flat', 'sale', 'available',
    11500000, 'crore', 3, 3, 2, 1050, 1420, 'sqft',
    12, 34, 'semi_furnished', 'East', '5-10 years', 'Ready to Move',
    'Navi Mumbai', 'Panvel', 'Indiabulls Greens',
    'Sector 2, Kon Village, Old Panvel, Navi Mumbai 410206',
    'https://maps.google.com/?q=Indiabulls+Greens+Panvel',
    ARRAY['Olympic Pool', 'Cricket Ground', 'Supermarket', 'Gymnasium', 'School on Campus', '24x7 Security', 'Covered Car Park'],
    'MahaRERA: P52000003104', 'Kiran Shah', '+91 98218 44332', true,
    true, false, false, 590, 42, 22
)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Property Images
INSERT INTO public.property_images (property_id, agency_id, url, alt_text, display_order, is_cover) VALUES
-- Godrej Highland
('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'Godrej Highland Elevation', 0, true),
('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 'Living Room with Balcony Deck', 1, false),
('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', 'Master Bedroom with Views', 2, false),

-- Hiranandani Fortune City
('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', 'Hiranandani Towers View', 0, true),
('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', 'Modern Living Space', 1, false),

-- Marathon Nexzone
('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', 'Marathon Nexzone Podium', 0, true),
('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', 'Spacious Interiors', 1, false),

-- Sai Miracle Penthouse
('00000000-0000-0000-0000-000000000204', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', 'Sai Miracle Penthouse View', 0, true),
('00000000-0000-0000-0000-000000000204', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80', 'Grand Double Height Living Hall', 1, false),

-- Wadhwa Wise City
('00000000-0000-0000-0000-000000000205', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80', 'Wadhwa Wise City Exterior', 0, true),

-- Paradise Sai Sun City
('00000000-0000-0000-0000-000000000206', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80', 'Sai Sun City Clubhouse & Garden', 0, true),

-- Seawoods Grand Central Enclave
('00000000-0000-0000-0000-000000000207', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80', 'Seawoods Luxury Tower', 0, true),

-- Akshar Silicia
('00000000-0000-0000-0000-000000000208', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', 'Akshar Silicia Living Space', 0, true),

-- Today Royal Elegance
('00000000-0000-0000-0000-000000000209', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', 'Today Royal Elegance Complex', 0, true),

-- Indiabulls Greens
('00000000-0000-0000-0000-000000000210', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', 'Indiabulls Greens Panvel', 0, true);

-- 6. Insert Testimonials
INSERT INTO public.testimonials (
    agency_id, client_name, client_location, rating, review, property_type, display_order
) VALUES 
(
    '00000000-0000-0000-0000-000000000001',
    'Dr. Sameer & Neha Joshi',
    'Bought 3 BHK in Godrej Highland, Kharghar',
    5,
    'Rajesh ji and the Apex Realty team made our dream home purchase effortless. They arranged 3 private site visits, verified every MahaRERA document, and negotiated an unbelievable deal with Godrej developers. Truly the most trustworthy broker in Navi Mumbai!',
    '3 BHK Flat',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'Abhishek Verma (Senior VP, HDFC Bank)',
    'Bought 2 BHK in Hiranandani Fortune City, Panvel',
    5,
    'I was skeptical about navigating Panvel property developments, but Rahul from Apex Realty gave clear comparisons on price per sq.ft, upcoming airport infrastructure timelines, and rental yield. Zero brokerage on new launch was a big plus.',
    '2 BHK Flat',
    2
),
(
    '00000000-0000-0000-0000-000000000001',
    'Priyanka & Saurabh Sen',
    'Bought 2 BHK in Kamothe',
    5,
    'Transparent, patient, and highly professional. Apex Realty handled the entire bank loan sanction through SBI within 5 working days. Highly recommend them for anyone searching in Kamothe and Panvel.',
    '2 BHK Flat',
    3
);

-- 7. Insert Realistic Leads
INSERT INTO public.leads (
    agency_id, property_id, name, phone, email, message, budget_min, budget_max,
    preferred_location, source, status, notes
) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000201',
    'Vikas Mahajan',
    '+91 98202 11223',
    'vikas.mahajan@gmail.com',
    'Looking for a 3 BHK in Kharghar with ready possession or 2026 delivery. Need parking for 2 cars.',
    15000000, 20000000, 'Kharghar', 'website_form', 'interested',
    'Spoke on WhatsApp. Interested in Godrej Highland higher floor with deck.'
),
(
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000202',
    'Sneha Rane',
    '+91 98190 33445',
    'sneha.rane@tcs.com',
    'Interested in Hiranandani Fortune City 2 BHK. Want to check bank loan eligibility.',
    8000000, 10000000, 'Panvel', 'whatsapp', 'site_visit_scheduled',
    'Site visit scheduled for upcoming Sunday 11 AM.'
),
(
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000204',
    'Kunal Singhania',
    '+91 99300 77665',
    'kunal@singhaniaholdings.com',
    'Looking for luxury duplex or penthouse facing Central Park. Budget up to 4 Cr.',
    30000000, 40000000, 'Kharghar', 'property_page', 'negotiation',
    'High value client. Offered Sai Miracle penthouse. In token negotiation stage.'
),
(
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000209',
    'Deepak Gaikwad',
    '+91 97680 99001',
    'deepak.gaikwad@rediffmail.com',
    'Need budget 1 BHK under 40 Lakhs near Taloja metro station.',
    3500000, 4000000, 'Taloja', 'landing_page', 'new',
    'New inquiry captured via mobile landing page quick search.'
),
(
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000207',
    'Capt. Rohit Mehra',
    '+91 98210 55443',
    'rohit.mehra@merchantnavy.org',
    'Merchant navy officer looking for sea view residence in Seawoods.',
    25000000, 30000000, 'Seawoods', 'whatsapp', 'won',
    'Successfully closed! Booked unit 1602 at Seawoods Grand Central.'
);

-- 8. Insert Site Visits
INSERT INTO public.site_visits (
    agency_id, property_id, customer_name, customer_phone, customer_email,
    visit_date, visit_time, status, assigned_agent_id, notes
) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000202',
    'Sneha Rane',
    '+91 98190 33445',
    'sneha.rane@tcs.com',
    CURRENT_DATE + INTERVAL '2 days',
    '11:00 AM',
    'confirmed',
    '00000000-0000-0000-0000-0000000102',
    'Pick up requested from Panvel station ticket counter'
),
(
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000201',
    'Vikas Mahajan',
    '+91 98202 11223',
    'vikas.mahajan@gmail.com',
    CURRENT_DATE + INTERVAL '3 days',
    '04:30 PM',
    'scheduled',
    '00000000-0000-0000-0000-0000000101',
    'Client arriving by own car at Godrej Highland sales gallery'
);
