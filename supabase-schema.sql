-- =========================================================================
-- PAYPOS CMS - SUPABASE DATABASE INITIALIZATION SCHEMA
-- Paste this entire script into your Supabase Project's SQL Editor & Run.
-- =========================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    site_name TEXT NOT NULL DEFAULT 'PAYPOS Ödeme Teknolojileri',
    tagline TEXT DEFAULT 'Yeni Nesil POS & İşletme Ödeme Çözümleri',
    logo_url TEXT DEFAULT '/images/logo.svg',
    favicon_url TEXT DEFAULT '/favicon.ico',
    primary_color TEXT DEFAULT '#2563eb',
    accent_color TEXT DEFAULT '#1e3a8a',
    phone TEXT DEFAULT '+90 850 308 00 00',
    phone_formatted TEXT DEFAULT '0850 308 00 00',
    email TEXT DEFAULT 'destek@paypos.com.tr',
    address TEXT DEFAULT 'Büyükdere Cad. No: 195 Kanyon Kantor Kat: 8, Levent / İstanbul',
    working_hours TEXT DEFAULT 'Pzt - Cmt: 08:30 - 19:00 | 7/24 Teknik Destek',
    social_links JSONB DEFAULT '{"whatsapp": "https://wa.me/908503080000", "telegram": "https://t.me/paypos_official", "instagram": "https://instagram.com/paypos_tr", "linkedin": "https://linkedin.com/company/paypos-odeme", "youtube": "https://youtube.com/paypos_tr"}'::jsonb,
    currency TEXT DEFAULT '₺',
    language TEXT DEFAULT 'TR',
    active_theme TEXT DEFAULT 'light',
    topbar_text TEXT DEFAULT 'Ödemelerde %0.99''dan Başlayan Komisyon Oranlarıyla Hızlı Kurulum!',
    header_style TEXT DEFAULT 'standard',
    footer_style TEXT DEFAULT 'full',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. MENU ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.menu (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    item_order INT DEFAULT 1,
    is_visible BOOLEAN DEFAULT TRUE,
    parent_id TEXT
);

-- 3. HERO SLIDES TABLE
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    subtitle TEXT,
    badge TEXT,
    description TEXT,
    pos_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    primary_cta_text TEXT,
    primary_cta_url TEXT,
    secondary_cta_text TEXT,
    secondary_cta_url TEXT,
    slide_order INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE
);

-- 4. POS PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    short_desc TEXT,
    full_desc TEXT,
    price NUMERIC,
    old_price NUMERIC,
    is_discounted BOOLEAN DEFAULT FALSE,
    discount_label TEXT,
    sku TEXT,
    brand TEXT DEFAULT 'PAYPOS',
    in_stock BOOLEAN DEFAULT TRUE,
    specs JSONB NOT NULL DEFAULT '{}'::jsonb,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    pdf_spec_url TEXT,
    video_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    product_order INT DEFAULT 1
);

-- 5. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    icon_name TEXT DEFAULT 'ShieldCheck',
    short_desc TEXT,
    full_desc TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    service_order INT DEFAULT 1
);

-- 6. SOLUTIONS TABLE
CREATE TABLE IF NOT EXISTS public.solutions (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    short_desc TEXT,
    full_desc TEXT,
    image TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    target_audience TEXT
);

-- 7. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    client TEXT,
    location TEXT,
    status TEXT DEFAULT 'Tamamlandı',
    completion_date TEXT,
    cover_image TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    utilized_products JSONB DEFAULT '[]'::jsonb,
    utilized_services JSONB DEFAULT '[]'::jsonb
);

-- 8. REFERENCES TABLE
CREATE TABLE IF NOT EXISTS public.references (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    category TEXT,
    description TEXT,
    website_url TEXT,
    ref_order INT DEFAULT 1
);

-- 9. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    author_name TEXT NOT NULL,
    author_title TEXT,
    company TEXT,
    city TEXT,
    comment TEXT NOT NULL,
    rating INT DEFAULT 5,
    avatar TEXT,
    date TEXT,
    is_approved BOOLEAN DEFAULT TRUE
);

-- 10. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT,
    photo TEXT,
    linkedin TEXT,
    instagram TEXT,
    email TEXT,
    member_order INT DEFAULT 1
);

-- 11. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    author TEXT,
    author_role TEXT,
    published_at TEXT,
    read_time TEXT,
    cover_image TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT FALSE
);

-- 12. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'Genel',
    faq_order INT DEFAULT 1
);

-- 13. BANK ACCOUNTS TABLE
CREATE TABLE IF NOT EXISTS public.bank_accounts (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    bank_name TEXT NOT NULL,
    branch TEXT,
    account_holder TEXT NOT NULL,
    iban TEXT NOT NULL,
    currency TEXT DEFAULT 'TRY',
    logo TEXT
);

-- 14. DEALERS TABLE
CREATE TABLE IF NOT EXISTS public.dealers (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    hours TEXT
);

-- 15. CATALOGS TABLE
CREATE TABLE IF NOT EXISTS public.catalogs (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    cover_image TEXT,
    pdf_url TEXT NOT NULL,
    description TEXT,
    file_size TEXT,
    updated_at TEXT
);

-- 16. SUBMISSIONS TABLE (TEKLİF TALEPLERİ)
CREATE TABLE IF NOT EXISTS public.submissions (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    city TEXT,
    selected_service TEXT,
    selected_product TEXT,
    message TEXT,
    file_name TEXT,
    kvkk_accepted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'Yeni'
);

-- 17. SUBSCRIBERS TABLE (BÜLTEN ABONELERİ)
CREATE TABLE IF NOT EXISTS public.subscribers (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE PUBLIC RLS READ FOR ALL TABLES
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow public all settings" ON public.settings FOR ALL USING (true);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public all products" ON public.products FOR ALL USING (true);

-- Repeat open access policies for remaining tables
ALTER TABLE public.menu ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all menu" ON public.menu FOR ALL USING (true);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all hero_slides" ON public.hero_slides FOR ALL USING (true);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all services" ON public.services FOR ALL USING (true);

ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all solutions" ON public.solutions FOR ALL USING (true);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all projects" ON public.projects FOR ALL USING (true);

ALTER TABLE public.references ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all references" ON public.references FOR ALL USING (true);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all testimonials" ON public.testimonials FOR ALL USING (true);

ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all team" ON public.team FOR ALL USING (true);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all blog_posts" ON public.blog_posts FOR ALL USING (true);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all faqs" ON public.faqs FOR ALL USING (true);

ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all bank_accounts" ON public.bank_accounts FOR ALL USING (true);

ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all dealers" ON public.dealers FOR ALL USING (true);

ALTER TABLE public.catalogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all catalogs" ON public.catalogs FOR ALL USING (true);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all submissions" ON public.submissions FOR ALL USING (true);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all subscribers" ON public.subscribers FOR ALL USING (true);
