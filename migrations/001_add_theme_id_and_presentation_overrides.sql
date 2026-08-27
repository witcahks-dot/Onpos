-- =========================================================================
-- PAYPOS CMS - MIGRATION 001: ADD THEME_ID AND PRESENTATION OVERRIDES
-- Status: PREPARED / NOT EXECUTED (Awaiting explicit user approval)
-- Description: Adds 'theme_id' to settings with default 'theme-existing'
--              and creates relational 'theme_overrides' for non-intrusive styling.
-- =========================================================================

BEGIN;

-- 1. ADD THEME_ID TO SETTINGS TABLE (IF NOT EXISTS)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'settings'
          AND column_name = 'theme_id'
    ) THEN
        ALTER TABLE public.settings
        ADD COLUMN theme_id TEXT NOT NULL DEFAULT 'theme-existing';
        
        COMMENT ON COLUMN public.settings.theme_id IS 'Active visual theme identifier: theme-existing | theme-fintech';
    END IF;
END $$;

-- 2. CREATE THEME PRESENTATION OVERRIDES TABLE (RELATIONAL, ZERO CORE DATA POLLUTION)
CREATE TABLE IF NOT EXISTS public.theme_overrides (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    theme_id TEXT NOT NULL CHECK (theme_id IN ('theme-existing', 'theme-fintech')),
    entity_type TEXT NOT NULL CHECK (entity_type IN ('product', 'service', 'solution', 'project', 'hero_slide', 'custom_page', 'section')),
    entity_id TEXT NOT NULL,
    override_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT uq_theme_entity UNIQUE (theme_id, entity_type, entity_id)
);

-- Index for fast lookup by theme and entity
CREATE INDEX IF NOT EXISTS idx_theme_overrides_lookup 
ON public.theme_overrides (theme_id, entity_type, entity_id);

-- 3. ROW LEVEL SECURITY (RLS) POLICIES FOR THEME OVERRIDES
ALTER TABLE public.theme_overrides ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
          AND tablename = 'theme_overrides' 
          AND policyname = 'Allow public read theme_overrides'
    ) THEN
        CREATE POLICY "Allow public read theme_overrides" 
        ON public.theme_overrides FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
          AND tablename = 'theme_overrides' 
          AND policyname = 'Allow admin all theme_overrides'
    ) THEN
        CREATE POLICY "Allow admin all theme_overrides" 
        ON public.theme_overrides FOR ALL USING (true);
    END IF;
END $$;

COMMIT;
