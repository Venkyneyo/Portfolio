-- ==========================================
-- SUPABASE / POSTGRESQL PORTFOLIO SCHEMAS
-- Execute this script in the Supabase SQL Editor
-- ==========================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILE TABLE
CREATE TABLE IF NOT EXISTS profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    hero_headline_1 TEXT,
    hero_headline_gradient_1 TEXT,
    hero_headline_2 TEXT,
    hero_headline_gradient_2 TEXT,
    roles TEXT[] DEFAULT '{}',
    bio TEXT,
    about_text TEXT,
    profile_image TEXT,
    resume_url TEXT,
    email TEXT,
    location TEXT,
    availability TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    years_experience INT DEFAULT 0,
    shipped_projects INT DEFAULT 0,
    uptime_percentage NUMERIC DEFAULT 100.0,
    active_users TEXT DEFAULT '0',
    theme_config JSONB DEFAULT '{"bgColor": "#050816", "accentColor": "#8b5cf6"}'::jsonb,
    seo_metadata JSONB DEFAULT '{"title": "Developer Portfolio", "description": "My professional showcase website"}'::jsonb,
    banner_image TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    level INT NOT NULL CHECK (level >= 0 AND level <= 100),
    category TEXT NOT NULL,
    icon TEXT,
    color TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    long_description TEXT,
    category TEXT NOT NULL,
    cover_image TEXT,
    images TEXT[] DEFAULT '{}',
    demo_video TEXT,
    tags TEXT[] DEFAULT '{}',
    stats JSONB DEFAULT '{}'::jsonb,
    features TEXT[] DEFAULT '{}',
    architecture_diagram JSONB DEFAULT '{"nodes":[], "connections":[]}'::jsonb,
    database_diagram JSONB DEFAULT '{"tables":[]}'::jsonb,
    workflow_diagram JSONB DEFAULT '{"steps":[]}'::jsonb,
    live_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS experience (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    location TEXT,
    description TEXT,
    highlights TEXT[] DEFAULT '{}',
    tech_stack TEXT[] DEFAULT '{}',
    logo TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS education (
    id TEXT PRIMARY KEY,
    degree TEXT NOT NULL,
    field TEXT,
    institution TEXT NOT NULL,
    period TEXT NOT NULL,
    location TEXT,
    grade TEXT,
    description TEXT,
    highlights TEXT[] DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS certifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    expiry_date TEXT,
    credential_id TEXT,
    credential_url TEXT,
    badge_image TEXT,
    file_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    organization TEXT,
    date TEXT NOT NULL,
    description TEXT,
    metric TEXT,
    icon TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. BLOGS TABLE
CREATE TABLE IF NOT EXISTS blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    tags TEXT[] DEFAULT '{}',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft'))
);

-- 9. NAVIGATION TABLE
CREATE TABLE IF NOT EXISTS navigation (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    path TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0
);

-- 10. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    company TEXT,
    avatar TEXT,
    text TEXT NOT NULL,
    rating INT DEFAULT 5
);

-- 11. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low'))
);


-- ==========================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 1. Public Select access for everyone (Visitor)
CREATE POLICY "Public select profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public select skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public select projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public select experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public select education" ON education FOR SELECT USING (true);
CREATE POLICY "Public select certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public select achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public select blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Public select navigation" ON navigation FOR SELECT USING (true);
CREATE POLICY "Public select testimonials" ON testimonials FOR SELECT USING (true);

-- 2. Insert access for visitors (to submit messages)
CREATE POLICY "Visitor insert messages" ON messages FOR INSERT WITH CHECK (true);

-- 3. Full Write/Update/Delete access for Authenticated Users (Admin Cockpit)
CREATE POLICY "Admin write profile" ON profile FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write experience" ON experience FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write education" ON education FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write certifications" ON certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write achievements" ON achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write blogs" ON blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write navigation" ON navigation FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin write messages" ON messages FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- ==========================================
-- STORAGE BUCKETS SETUP
-- Run this in Supabase Storage UI to create 
-- public bucket 'portfolio-media'.
-- ==========================================
-- Make sure to create the bucket 'portfolio-media' with Public access.
