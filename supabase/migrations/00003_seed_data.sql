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
    '#0C0F14',
    '#B38B42',
    '#C5A059',
    'Find Your Perfect Home in Panvel, Navi Mumbai & Beyond',
    'Verified listings, honest guidance, and a smoother property journey.',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    'Explore Properties',
    'WhatsApp Us',
    '14+ Years of Trust & Over 1,200 Happy Homeowners in Navi Mumbai',
    'Founded by Rajesh Sharma, Apex Realty is Navi Mumbai’s most trusted boutique real estate advisory. We specialize in verified inventory across Panvel, Kharghar, Taloja, Kamothe, Belapur, and Seawoods. Our commitment is simple: absolute legal clarity, zero buyer brokerage on developer inventory, and end-to-end guidance from site visit to registration.',
    'Rajesh Sharma',
    'Founder & Principal Broker',
    14,
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    ARRAY['Panvel', 'Kharghar', 'Kamothe', 'Taloja', 'Seawoods', 'CBD Belapur', 'New Panvel', 'Ulwe', 'Kalamboli'],
    '+91 98201 23456',
    '+91 98201 23456',
    'contact@apexrealty.in',
    'Shop 12, Ground Floor, Orion Plaza, Sector 15, Old Panvel, Navi Mumbai - 410206',
    'MahaRERA Reg No: A52000012345',
    'Disclaimer: Apex Realty is an authorized marketing partner for registered builders under MahaRERA. Project images, specifications and pricing are subject to revision as per developer guidelines.'
) ON CONFLICT (agency_id) DO NOTHING;

-- 4. Insert 10 Exact Requested Demo Properties
INSERT INTO public.properties (
    id, agency_id, title, slug, description, property_type, listing_type, status,
    price, price_unit, rent_period, bhk, bathrooms, balconies, carpet_area, builtup_area, area_unit,
    floor_number, total_floors, furnishing, facing, age_of_property, possession_date,
    city, locality, society_or_project, full_address, map_link, amenities,
    rera_number, owner_name, owner_phone, hide_owner_contact, featured, is_new, is_hot_deal,
    view_count, whatsapp_click_count, call_click_count
) VALUES 
-- 1. 2 BHK flat in Kharghar, ₹85 lakh
(
    '00000000-0000-0000-0000-000000000201',
    '00000000-0000-0000-0000-000000000001',
    'Paradise Sai Crystal - 2 BHK Valley View Flat',
    '2-bhk-flat-in-kharghar-85-lakh',
    'Beautiful 2 BHK corner residence in prime Kharghar Sector 35. Overlooking scenic Kharghar hills, this apartment offers cross ventilation, vitrified tiles, granite kitchen platform, and dry balcony. Located 5 minutes from Central Park and Metro station.',
    'flat', 'sale', 'available',
    8500000, 'lakh', null, 2, 2, 1, 720, 960, 'sqft',
    14, 22, 'semi_furnished', 'East', '0-1 years', 'Ready to Move',
    'Navi Mumbai', 'Kharghar', 'Sai Crystal',
    'Plot 12, Sector 35, Kharghar, Navi Mumbai, Maharashtra 410210',
    'https://maps.google.com/?q=Kharghar+Sector+35',
    ARRAY['Swimming Pool', 'Gymnasium', 'Landscape Garden', 'Children Play Area', 'Covered Parking', '24x7 Security', 'High Speed Elevators'],
    'MahaRERA: P52000021430', 'Mr. Amit Deshmukh', '+91 98200 99887', true,
    true, true, true, 642, 51, 24
),
-- 2. 3 BHK flat in Panvel, ₹1.25 crore
(
    '00000000-0000-0000-0000-000000000202',
    '00000000-0000-0000-0000-000000000001',
    'Godrej City Woodland - 3 BHK Premium Deck Residence',
    '3-bhk-flat-in-panvel-1-25-crore',
    'Experience golf township living at Godrej City, Panvel. This expansive 3 BHK residence boasts a private sundeck, large living and dining layout, modular kitchen with chimney, and access to a 9-hole golf course, grand clubhouse, and international school inside the township.',
    'flat', 'sale', 'available',
    12500000, 'crore', null, 3, 3, 2, 1080, 1420, 'sqft',
    12, 26, 'semi_furnished', 'North-East', 'Under Construction', 'Dec 2026',
    'Navi Mumbai', 'Panvel', 'Godrej City Woodland',
    'Thombrewadi, Panvel-Matheran Road, Navi Mumbai 410206',
    'https://maps.google.com/?q=Godrej+City+Panvel',
    ARRAY['9-Hole Golf Course', 'Olympic Lap Pool', 'Luxury Clubhouse', 'Squash & Tennis Courts', 'Covered Parking', '24x7 Security'],
    'MahaRERA: P52000018990', 'Vikram Singhania', '+91 98211 44556', true,
    true, true, true, 810, 73, 38
),
-- 3. 1 BHK rental in Kalamboli, ₹15,000/month
(
    '00000000-0000-0000-0000-000000000203',
    '00000000-0000-0000-0000-000000000001',
    'Siddhi Pooja Heights - 1 BHK Modern Rental Apartment',
    '1-bhk-rental-kalamboli-15000-month',
    'Well-ventilated 1 BHK flat for rent in Kalamboli Sector 10. Close to Sion-Panvel Highway and D-Mart. Semi-furnished with kitchen cabinets, curtain rods, and water heater. Ideal for working professionals and small families.',
    'flat', 'rent', 'available',
    15000, 'absolute', 'monthly', 1, 1, 1, 460, 600, 'sqft',
    4, 7, 'semi_furnished', 'East', '1-5 years', 'Immediate',
    'Navi Mumbai', 'Kalamboli', 'Siddhi Pooja Heights',
    'Sector 10, Kalamboli, Navi Mumbai 410218',
    'https://maps.google.com/?q=Kalamboli+Sector+10',
    ARRAY['High Speed Lift', '24x7 Water Supply', 'Security Guard', 'Power Backup', 'CCTV Surveillance'],
    'MahaRERA: P52000008712', 'Suresh Patil', '+91 98203 11224', true,
    false, true, false, 420, 38, 19
),
-- 4. Residential plot in Taloja, ₹45 lakh
(
    '00000000-0000-0000-0000-000000000204',
    '00000000-0000-0000-0000-000000000001',
    'Greenfield Meadows - G+2 Approved Residential Plot',
    'residential-plot-taloja-45-lakh',
    'Rare CIDCO transfer residential plot with clear title in developing Taloja Phase 2. G+2 bungalow construction permitted with 1.5 FSI. 40-feet asphalt road front, underground stormwater drainage, and MSEB electricity poles in place.',
    'plot', 'sale', 'available',
    4500000, 'lakh', null, null, 0, 0, 1800, 1800, 'sqft',
    null, null, 'unfurnished', 'North', 'New', 'Immediate Possession',
    'Navi Mumbai', 'Taloja', 'Greenfield Meadows Phase 2',
    'Sector 24, Taloja Phase 2, Navi Mumbai 410208',
    'https://maps.google.com/?q=Taloja+Phase+2',
    ARRAY['CIDCO Clear Title', '40ft Wide Road', 'Gated Boundary Wall', 'Water & Power Lines', 'Tree Plantation', 'Bank Loan Available'],
    'MahaRERA: P52000030114', 'Kailash Mehra', '+91 98205 77889', true,
    true, true, true, 550, 48, 27
),
-- 5. Shop in Panvel market, ₹90 lakh
(
    '00000000-0000-0000-0000-000000000205',
    '00000000-0000-0000-0000-000000000001',
    'Orion Commercial Galleria - Prime High-Street Retail Shop',
    'shop-panvel-market-90-lakh',
    'High-footfall ground floor commercial retail shop on the main Panvel railway station access road. Excellent 14-feet frontage with floor-to-ceiling glass shutter, loft provision, and attached private washroom.',
    'shop', 'sale', 'available',
    9000000, 'lakh', null, null, 1, 0, 340, 450, 'sqft',
    0, 4, 'unfurnished', 'West', '0-1 years', 'Ready for Fitouts',
    'Navi Mumbai', 'Panvel', 'Orion Galleria',
    'Station Road, Old Panvel Market, Navi Mumbai 410206',
    'https://maps.google.com/?q=Panvel+Station+Road',
    ARRAY['14ft Frontage Glass Façade', '3-Phase Heavy Power Connection', 'Attached Washroom', 'Visitor Parking', 'Dedicated Glow-Sign Board Space'],
    'MahaRERA: P52000014299', 'Deepak Shah', '+91 98201 33445', true,
    true, false, true, 730, 62, 34
),
-- 6. Office in Belapur, ₹1.8 crore
(
    '00000000-0000-0000-0000-000000000206',
    '00000000-0000-0000-0000-000000000001',
    'CBD Corporate Park - Grade-A IT & Corporate Office',
    'office-belapur-1-8-crore',
    'Fully furnished, plug-and-play commercial corporate office space in Sector 15, CBD Belapur. Designed with 24 ergonomic workstations, 2 director cabins, 8-seater conference room with video conferencing, server room, and dry pantry.',
    'office', 'sale', 'available',
    18000000, 'crore', null, null, 2, 0, 1150, 1520, 'sqft',
    8, 18, 'fully_furnished', 'North', '1-5 years', 'Immediate',
    'Navi Mumbai', 'CBD Belapur', 'CBD Corporate Park Tower B',
    'Sector 15, CBD Belapur, Navi Mumbai 400614',
    'https://maps.google.com/?q=CBD+Belapur+Sector+15',
    ARRAY['Centralized VRV Air Conditioning', '24 Furnished Workstations', 'Conference Room', '2 Reserved Basement Car Parks', '100% Power Backup', 'Access Control Security'],
    'MahaRERA: P52000019550', 'Anand Kothari', '+91 98202 55667', true,
    true, false, false, 590, 44, 22
),
-- 7. Villa in New Panvel, ₹2.4 crore
(
    '00000000-0000-0000-0000-000000000207',
    '00000000-0000-0000-0000-000000000001',
    'Palm Greens Luxury Estates - 4 BHK Private Garden Villa',
    'villa-new-panvel-2-4-crore',
    'Exquisite independent duplex villa nestled inside a secure gated enclave in New Panvel. Features a private landscaped front lawn, plunge pool on terrace, double-height ceiling in the formal living room, Italian marble finishes, separate servant quarter, and 2 covered car parks.',
    'villa', 'sale', 'available',
    24000000, 'crore', null, 4, 4, 3, 2850, 3400, 'sqft',
    1, 2, 'semi_furnished', 'East', 'New', 'Ready to Move',
    'Navi Mumbai', 'New Panvel', 'Palm Greens Enclave',
    'Sector 5A, New Panvel East, Navi Mumbai 410206',
    'https://maps.google.com/?q=New+Panvel+Sector+5A',
    ARRAY['Private Garden & Lawn', 'Rooftop Plunge Pool', 'Solar Water Heating', '2 Covered Car Parks', 'Clubhouse with Gymnasium', '24x7 Security & CCTV'],
    'MahaRERA: P52000022391', 'Dr. Sanjay Kelkar', '+91 98209 88112', true,
    true, true, true, 940, 85, 47
),
-- 8. 2 BHK resale flat in Kamothe, ₹72 lakh
(
    '00000000-0000-0000-0000-000000000208',
    '00000000-0000-0000-0000-000000000001',
    'Akshar Shreeji Heights - 2 BHK Well-Maintained Resale Flat',
    '2-bhk-resale-flat-kamothe-72-lakh',
    'Immaculately maintained 2 BHK resale apartment with CIDCO transfer clearance in Sector 19, Kamothe. Offers dual balconies overlooking the podium garden, modular kitchen, piped gas line, dedicated covered stilt parking, and 7-minute walking distance to Mansarovar railway station.',
    'flat', 'sale', 'available',
    7200000, 'lakh', null, 2, 2, 2, 685, 890, 'sqft',
    6, 14, 'semi_furnished', 'North-East', '3-5 years', 'Ready to Move',
    'Navi Mumbai', 'Kamothe', 'Shreeji Heights',
    'Sector 19, Kamothe, Navi Mumbai 410209',
    'https://maps.google.com/?q=Kamothe+Sector+19',
    ARRAY['Covered Stilt Parking', 'CIDCO Transfer Done', 'Piped Natural Gas', 'Podium Garden', 'Children Play Area', 'Bank Loan Approved by SBI & HDFC'],
    'MahaRERA: P52000007812', 'Manish Rane', '+91 98199 44332', true,
    true, false, true, 680, 59, 32
),
-- 9. Commercial space in Ulwe, ₹65 lakh
(
    '00000000-0000-0000-0000-000000000209',
    '00000000-0000-0000-0000-000000000001',
    'Delta Horizon - Multi-Utility Commercial Showroom / Clinic',
    'commercial-space-ulwe-65-lakh',
    'First floor corner commercial showroom or clinic space in rapid-growth Ulwe Sector 19. Just 2 minutes from Bamandongri railway station and Atal Setu (MTHL) corridor. High visual visibility, wide staircase, elevator, and ample open parking for clients.',
    'shop', 'sale', 'available',
    6500000, 'lakh', null, null, 1, 0, 520, 680, 'sqft',
    1, 12, 'unfurnished', 'North-West', 'New', 'Ready for Possession',
    'Navi Mumbai', 'Ulwe', 'Delta Horizon',
    'Sector 19, Ulwe, Navi Mumbai 410206',
    'https://maps.google.com/?q=Ulwe+Sector+19',
    ARRAY['Corner Frontage', 'Customer Car Parking', '3-Phase Power', 'Elevator Access', 'Attached Washroom', 'Near Atal Setu Connector'],
    'MahaRERA: P52000016345', 'Girish Thakkar', '+91 98204 99001', true,
    false, true, false, 480, 36, 17
),
-- 10. 4 BHK penthouse in Seawoods, ₹3.2 crore
(
    '00000000-0000-0000-0000-000000000210',
    '00000000-0000-0000-0000-000000000001',
    'Grand Central Crest - 4 BHK Ultra-Luxury Sea View Penthouse',
    '4-bhk-penthouse-seawoods-3-2-crore',
    'The pinnacle of luxury in Seawoods Sector 40. Top-floor duplex penthouse commanding panoramic, unobstructed views of the Arabian Sea and flamingo sanctuary. Boasts a private rooftop entertainment deck, double-height grand salon, Italian Statuario marble, smart home automation, and 3 covered basement parking slots.',
    'penthouse', 'sale', 'available',
    32000000, 'crore', null, 4, 5, 3, 2400, 3100, 'sqft',
    24, 24, 'fully_furnished', 'West', '1-3 years', 'Ready to Move',
    'Navi Mumbai', 'Seawoods', 'Grand Central Crest',
    'Sector 40, Seawoods West, Navi Mumbai 400706',
    'https://maps.google.com/?q=Seawoods+Sector+40',
    ARRAY['Flamingo Sanctuary & Sea View', 'Private Rooftop Deck', 'Smart Home Automation', '3 Covered Basement Parks', 'Infinity Lap Pool', 'Concierge & Valet Service'],
    'MahaRERA: P52000029100', 'Naveen Aggarwal', '+91 98205 66778', true,
    true, false, true, 1120, 98, 53
)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Property Images
INSERT INTO public.property_images (property_id, agency_id, url, alt_text, display_order, is_cover) VALUES
('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'Sai Crystal Kharghar Living', 0, true),
('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 'Balcony Deck', 1, false),
('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', 'Godrej City Panvel Elevation', 0, true),
('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', 'Kalamboli Apartment Living', 0, true),
('00000000-0000-0000-0000-000000000204', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', 'Taloja Residential Plot Layout', 0, true),
('00000000-0000-0000-0000-000000000205', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', 'Panvel Commercial Retail Galleria', 0, true),
('00000000-0000-0000-0000-000000000206', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', 'Belapur Office Interior', 0, true),
('00000000-0000-0000-0000-000000000207', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', 'Palm Greens Villa Façade', 0, true),
('00000000-0000-0000-0000-000000000208', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', 'Kamothe Resale Flat Living', 0, true),
('00000000-0000-0000-0000-000000000209', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', 'Ulwe Commercial Building', 0, true),
('00000000-0000-0000-0000-000000000210', '00000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80', 'Seawoods Penthouse Living & Terrace', 0, true)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Testimonials
INSERT INTO public.testimonials (
    agency_id, client_name, client_location, rating, review, property_type, display_order
) VALUES 
(
    '00000000-0000-0000-0000-000000000001',
    'Dr. Anand Deshpande',
    'Bought 3 BHK in Panvel',
    5,
    'Rajesh and his team at Apex Realty were transparent from day one. Zero hidden charges, accurate title verification, and free AC cab visits made buying our home in Godrej City completely stress-free.',
    'Residential Apartment',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'Neha & Siddharth Rao',
    'Bought 2 BHK in Kharghar',
    5,
    'Being first-time buyers in Navi Mumbai, we were cautious about legal clearances. Apex Realty verified the MahaRERA documents and negotiated the best direct developer deal without any brokerage on our launch booking.',
    'Residential Apartment',
    2
),
(
    '00000000-0000-0000-0000-000000000001',
    'Priyanka & Saurabh Sen',
    'Bought 2 BHK in Kamothe',
    5,
    'Found an amazing resale unit in Kamothe within our budget. The broker assisted with CIDCO transfer documentation and seamless SBI home loan disbursal in just 10 days.',
    'Resale Apartment',
    3
)
ON CONFLICT (id) DO NOTHING;

-- 7. Insert Realistic Leads
INSERT INTO public.leads (
    agency_id, property_id, name, phone, email, message, budget_min, budget_max,
    preferred_location, source, status, notes
) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000201',
    'Sameer Joshi',
    '+91 98200 12345',
    'sameer.joshi@gmail.com',
    'Interested in 2 BHK at Kharghar. Would like to schedule an accompanied site visit this Saturday.',
    7500000,
    9000000,
    'Kharghar',
    'website_form',
    'site_visit_scheduled',
    'Pre-approved home loan from HDFC. Prefers morning visit.'
),
(
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000202',
    'Kavita Menon',
    '+91 98190 55443',
    'kavita.menon@outlook.com',
    'Looking for 3 BHK flat in Panvel near golf course. Please share floor plans.',
    11000000,
    13500000,
    'Panvel',
    'whatsapp',
    'interested',
    'Sent PDF brochure on WhatsApp. Client interested in mid-level floors.'
),
(
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000210',
    'Manish Merchant',
    '+91 99201 88776',
    'm.merchant@globaltrade.in',
    'Enquiring about the Seawoods Sea View penthouse. Ready for immediate purchase if title is 100% clear.',
    30000000,
    35000000,
    'Seawoods',
    'property_page',
    'negotiation',
    'High net-worth buyer. Offer placed at 3.10 Cr, discussing with seller.'
)
ON CONFLICT (id) DO NOTHING;

-- 8. Insert Site Visits
INSERT INTO public.site_visits (
    id, agency_id, property_id, customer_name, customer_phone, customer_email,
    visit_date, visit_time, status, assigned_agent_id, notes
) VALUES
(
    '00000000-0000-0000-0000-000000000401',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000201',
    'Sameer Joshi',
    '+91 98200 12345',
    'sameer.joshi@gmail.com',
    CURRENT_DATE + INTERVAL '2 days',
    '11:00 AM',
    'scheduled',
    '00000000-0000-0000-0000-000000000101',
    'AC Cab pickup from Kharghar railway station booked.'
),
(
    '00000000-0000-0000-0000-000000000402',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000207',
    'Vikram Chawla',
    '+91 98222 33441',
    'vikram.c@chawla.com',
    CURRENT_DATE + INTERVAL '3 days',
    '04:00 PM',
    'confirmed',
    '00000000-0000-0000-0000-000000000101',
    'Accompanied villa tour for family. Bring master plan map.'
)
ON CONFLICT (id) DO NOTHING;
