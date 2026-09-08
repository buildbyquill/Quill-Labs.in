-- ================================================================================
-- QUILL LABS CMS & ADMIN DASHBOARD - SUPABASE SQL MIGRATION SCHEMA
-- ================================================================================
-- Run this script in your Supabase Project > SQL Editor.
-- It creates the 4 necessary tables, enables RLS, creates access policies,
-- and inserts initial starter data for Quill Labs.
-- ================================================================================

-- 1. Table for Key-Value Website Content & Branding
create table if not exists public.site_content (
    id text primary key,
    value text not null,
    updated_at timestamp with time zone default now()
);

-- 2. Table for Products & Services (Foundations, Layers, Systems)
create table if not exists public.site_products (
    id text primary key,
    title text not null,
    price text not null,
    price_prefix text default 'Starting from',
    timeline text default '7–10 Days',
    best_for text default 'Modern businesses',
    description text default '',
    features text[] default '{}',
    sort_order integer default 0,
    created_at timestamp with time zone default now()
);

-- 3. Table for Work Cards & Portfolio Case Studies
create table if not exists public.site_work_cards (
    id text primary key,
    title text not null,
    track text not null default 'business', -- 'business' or 'creator'
    system_type text not null default 'Lead Generation System',
    image_url text not null,
    badge text default 'Concept work', -- 'Client project' or 'Concept work'
    problem text default '',
    outcome text default '',
    client_review text default '',
    client_name text default '',
    link_url text default 'v1 contact.html',
    sort_order integer default 0,
    created_at timestamp with time zone default now()
);

-- 4. Table for Contact Leads & Customer Inquiries
create table if not exists public.site_leads (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null,
    track text default 'Local Business Launch',
    budget text default 'Not stated',
    message text not null,
    status text default 'new',
    created_at timestamp with time zone default now()
);

-- ================================================================================
-- ROW LEVEL SECURITY (RLS) CONFIGURATION
-- ================================================================================
alter table public.site_content enable row level security;
alter table public.site_products enable row level security;
alter table public.site_work_cards enable row level security;
alter table public.site_leads enable row level security;

-- Policies: Anyone can read website content, products, and work cards
create policy "Public read site_content" on public.site_content for select using (true);
create policy "Public read site_products" on public.site_products for select using (true);
create policy "Public read site_work_cards" on public.site_work_cards for select using (true);

-- Policies: Admin can upsert/update/delete website content, products, and work cards
create policy "Admin manage site_content" on public.site_content for all using (true);
create policy "Admin manage site_products" on public.site_products for all using (true);
create policy "Admin manage site_work_cards" on public.site_work_cards for all using (true);

-- Policies: Leads - Public can insert inquiries; Admin can read and delete
create policy "Public insert site_leads" on public.site_leads for insert with check (true);
create policy "Admin read site_leads" on public.site_leads for select using (true);
create policy "Admin delete site_leads" on public.site_leads for delete using (true);

-- ================================================================================
-- INITIAL SEED DATA FOR QUILL LABS
-- ================================================================================

-- Seed Brand & Copy
insert into public.site_content (id, value) values
    ('brand_name', 'Quill Labs'),
    ('brand_tagline', 'Business Systems Studio'),
    ('brand_logo', './main quill.png'),
    ('brand_wordmark', './wordmark.png'),
    ('brand_color', '#D89032'),
    ('hero_kicker', 'A Business Systems Studio'),
    ('hero_title', 'We don''t build websites. We build business systems that connect attention to revenue.'),
    ('hero_sub', 'Connect the Value. Capture the Sale.'),
    ('hero_note', 'Static assets sitting there. We turn them into a system that actually sells — without you needing to become a tech expert to run it.'),
    ('primary_cta_text', 'Book a strategy call'),
    ('secondary_cta_text', 'Explore the services'),
    ('contact_email', 'buildbyquill@gmail.com')
on conflict (id) do update set value = excluded.value;

-- Seed Products / Foundations
insert into public.site_products (id, title, price, price_prefix, timeline, best_for, description, sort_order) values
    ('prod_1', 'Motion Website', '₹5,999', 'Starting from', '7–10 Days', 'Modern businesses · Agencies', 'Purposeful animations that improve engagement without sacrificing speed.', 1),
    ('prod_2', 'Editorial Website', '₹9,999', 'Starting from', '10–14 Days', 'Premium brands · Creators', 'Editorial storytelling that positions expertise and communicates quality.', 2),
    ('prod_3', 'Scroll Storytelling Website', '₹24,999', 'Starting from', '2–4 Weeks', 'High-ticket services · Enterprise', 'Deep narrative experience that guides prospective buyers through every objection.', 3),
    ('prod_4', 'Custom CMS & Lead CRM', '₹15,000', 'Starting from', '1–2 Weeks', 'Growing local businesses', 'Self-service admin dashboard, dynamic content, and automated lead capture.', 4)
on conflict (id) do nothing;

-- Seed Work Cards
insert into public.site_work_cards (id, title, track, system_type, image_url, badge, problem, outcome, client_review, client_name, link_url, sort_order) values
    ('work_1', 'Destiny Laboratories', 'business', 'Motion Website + WhatsApp', './v1home_files/Screenshot 2026-09-03 170422.png', 'Client project', 'A trust-led pharmaceutical website that presents the brand, product portfolio, and therapeutic expertise clearly.', 'A modern digital presence with useful WhatsApp integration.', 'Really happy with the website developed by QUILL LABS. The final website was exactly what we needed.', 'Amit Rajan, Owner — Destiny Laboratories', 'https://destinylaboratories.com/', 1),
    ('work_2', 'Dental Clinic', 'business', 'Lead Generation System', './v1home_files/398-960x600.jpg', 'Concept work', 'A stable clinic with a brochure website and enquiries scattered across WhatsApp — no way to measure or manage demand.', 'Qualified bookings without manual chasing.', '', '', 'v1 contact.html', 2),
    ('work_3', 'Neighborhood Restaurant', 'business', 'Online Ordering System', './v1home_files/511-960x600.jpg', 'Concept work', 'Loyal regulars and no online ordering — every order depends on a phone call during service hours.', 'Orders keep coming in when the phone isn''t.', '', '', 'v1 contact.html', 3),
    ('work_4', 'Auto Dealership', 'business', 'Inventory + Lead Capture', './v1home_files/516-960x600.jpg', 'Concept work', 'Full inventory but only a brochure website — customers can''t see stock or enquire without a visit.', 'Walk-ins turn into booked test drives.', '', '', 'v1 contact.html', 4),
    ('work_5', 'Knowledge Creator', 'creator', 'Creator Business System', './v1 ourprocess_files/918-960x600.jpg', 'Concept work', 'Thousands of followers and a Linktree — attention converts nowhere, and revenue depends on DMs.', 'The audience finally has a place to buy.', '', '', 'v1 contact.html', 5),
    ('work_6', 'Course Creator', 'creator', 'Product Ecosystem', './v1 ourprocess_files/160-960x600.jpg', 'Concept work', 'A great course sold manually through social media — no sales page, no checkout, no follow-up.', 'Course sales on autopilot after the launch.', '', '', 'v1 contact.html', 6),
    ('work_7', 'Coach / Consultant', 'creator', 'Customer Journey System', './v1 ourprocess_files/309-960x600.jpg', 'Concept work', 'Bookings handled by email, questions repeated on every call, no structured path after payment.', 'From first contact to delivered result without friction.', '', '', 'v1 contact.html', 7)
on conflict (id) do nothing;
