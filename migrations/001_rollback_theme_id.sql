-- =========================================================================
-- PAYPOS CMS - MIGRATION 001 ROLLBACK SCRIPT
-- Status: PREPARED / NOT EXECUTED
-- Description: Safely reverts migration 001 by dropping theme_overrides
--              and removing theme_id from settings table.
-- =========================================================================

BEGIN;

-- 1. DROP THEME OVERRIDES TABLE & POLICIES
DROP TABLE IF EXISTS public.theme_overrides CASCADE;

-- 2. DROP THEME_ID COLUMN FROM SETTINGS TABLE
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'settings'
          AND column_name = 'theme_id'
    ) THEN
        ALTER TABLE public.settings DROP COLUMN theme_id;
    END IF;
END $$;

COMMIT;
