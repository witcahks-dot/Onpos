import fs from 'fs';
import path from 'path';
import { CMSData, SiteSettings } from '@/types';
import { defaultCMSData } from './default-data';
import { normalizeCMSData, normalizeSiteSettings, mapDbRowToSiteSettings, mapSiteSettingsToDbRow } from './data-normalizers';
import { isSupabaseConfigured, getSupabaseServerClient, supabase } from './supabase';

// Store DB outside `src/` to prevent Next.js dev server from triggering file-watcher HMR reboots on file write
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'cms-db.json');
const TMP_DB_FILE = path.join('/tmp', 'paypos-cms-db.json');
const LEGACY_DB_FILE = path.join(process.cwd(), 'src', 'data', 'cms-db.json');

export { defaultCMSData };

let inMemoryCache: CMSData | null = null;

function ensureDataDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // Ignore read-only directory creation errors in serverless
  }
}

/**
 * Synchronous local reader with /tmp and filesystem fallback
 */
export function readCMSData(): CMSData {
  if (inMemoryCache) {
    return inMemoryCache;
  }

  ensureDataDirectory();
  try {
    let rawContent: string | null = null;

    // 1. Check /tmp fallback first (writable in serverless lambda)
    if (fs.existsSync(TMP_DB_FILE)) {
      try {
        rawContent = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      } catch (e) {
        console.warn('Could not read TMP_DB_FILE:', e);
      }
    }

    // 2. Check primary DB_FILE
    if (!rawContent && fs.existsSync(DB_FILE)) {
      try {
        rawContent = fs.readFileSync(DB_FILE, 'utf-8');
      } catch (e) {
        console.warn('Could not read DB_FILE:', e);
      }
    }

    // 3. Check legacy DB file
    if (!rawContent && fs.existsSync(LEGACY_DB_FILE)) {
      try {
        rawContent = fs.readFileSync(LEGACY_DB_FILE, 'utf-8');
      } catch (e) {
        console.warn('Could not read LEGACY_DB_FILE:', e);
      }
    }

    if (rawContent) {
      const parsed = JSON.parse(rawContent);
      const data = normalizeCMSData(parsed);
      inMemoryCache = data;
      return data;
    }

    inMemoryCache = defaultCMSData;
    try {
      fs.writeFileSync(TMP_DB_FILE, JSON.stringify(defaultCMSData, null, 2), 'utf-8');
    } catch {
      // ignore
    }
    return inMemoryCache;
  } catch (error) {
    console.error('Error reading CMS database file:', error);
    return defaultCMSData;
  }
}

/**
 * Asynchronous reader with true Supabase DB Read-Through
 */
export async function readCMSDataAsync(): Promise<CMSData> {
  const base = readCMSData();

  if (isSupabaseConfigured) {
    try {
      const client = getSupabaseServerClient();
      if (client) {
        const { data, error } = await client
          .from('settings')
          .select('*')
          .eq('id', 'default')
          .single();

        if (data && !error) {
          const dbSettings = mapDbRowToSiteSettings(data);
          const merged: CMSData = {
            ...base,
            settings: normalizeSiteSettings({ ...base.settings, ...dbSettings }),
          };
          inMemoryCache = merged;
          return merged;
        } else if (error) {
          console.warn('[cms-db] Supabase settings query warning (using local fallback):', error.message);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown DB error';
      console.warn('[cms-db] Supabase connection error (using local fallback):', msg);
    }
  }

  return base;
}

/**
 * Synchronous local writer (updates memory, /tmp and local file)
 */
export function writeCMSData(data: Partial<CMSData>): CMSData {
  ensureDataDirectory();
  try {
    const current = readCMSData();
    const updated: CMSData = {
      ...current,
      ...data,
      settings: data.settings ? { ...current.settings, ...data.settings } : current.settings,
      corporateIntro: data.corporateIntro ? { ...current.corporateIntro, ...data.corporateIntro } : current.corporateIntro,
      cloudPanel: data.cloudPanel ? { ...current.cloudPanel, ...data.cloudPanel } : current.cloudPanel,
      aboutPage: data.aboutPage ? { ...current.aboutPage, ...data.aboutPage } : current.aboutPage,
    };

    const normalized = normalizeCMSData(updated);

    // Update in-memory singleton cache immediately
    inMemoryCache = normalized;

    // 1. Write to /tmp database file (guaranteed writable in AWS Lambda / Vercel Serverless)
    try {
      fs.writeFileSync(TMP_DB_FILE, JSON.stringify(normalized, null, 2), 'utf-8');
    } catch (tmpErr) {
      console.warn('Could not write to TMP_DB_FILE:', tmpErr);
    }

    // 2. Attempt to write to primary database file (works in local dev / persistent container)
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(normalized, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('Primary DB_FILE is read-only in this environment, persisted to /tmp:', fsErr);
    }

    // 3. Also update legacy file if present without breaking
    try {
      if (fs.existsSync(LEGACY_DB_FILE)) {
        fs.writeFileSync(LEGACY_DB_FILE, JSON.stringify(normalized, null, 2), 'utf-8');
      }
    } catch {
      // ignore legacy file write warning
    }

    return normalized;
  } catch (error) {
    console.error('Error writing CMS database file:', error);
    if (inMemoryCache) {
      return inMemoryCache;
    }
    throw error;
  }
}

/**
 * Asynchronous writer with true Supabase DB Write-Through & Verification
 */
export async function writeCMSDataAsync(data: Partial<CMSData>): Promise<CMSData> {
  if (data.settings && isSupabaseConfigured) {
    const client = getSupabaseServerClient();
    if (client) {
      const dbRow = mapSiteSettingsToDbRow(data.settings);
      
      // 1. Guaranteed await on DB upsert
      const { error: upsertErr } = await client
        .from('settings')
        .upsert(dbRow, { onConflict: 'id' });

      if (upsertErr) {
        console.error('[cms-db] Supabase settings write-through error:', upsertErr);
        throw new Error('Veritabanına ayarlar kaydedilemedi: ' + upsertErr.message);
      }

      // 2. Re-read from production DB to confirm and verify written value
      const { data: verifiedRow, error: verifyErr } = await client
        .from('settings')
        .select('*')
        .eq('id', 'default')
        .single();

      if (verifiedRow && !verifyErr) {
        const verifiedSettings = normalizeSiteSettings(mapDbRowToSiteSettings(verifiedRow));
        data.settings = verifiedSettings;
      }
    }
  }

  // Persist locally / in-memory as well
  return writeCMSData(data);
}
