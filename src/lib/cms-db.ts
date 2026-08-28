import fs from 'fs';
import path from 'path';
import { CMSData } from '@/types';
import { defaultCMSData } from './default-data';
import { normalizeCMSData } from './data-normalizers';
import { isSupabaseConfigured, supabase } from './supabase';

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
      // In serverless read-only filesystem, silently fallback to /tmp & cookie persistence
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

    // 4. Async sync to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      syncToSupabase(data).catch(err => console.error('Supabase async sync error:', err));
    }

    return normalized;
  } catch (error) {
    console.error('Error writing CMS database file:', error);
    // Return inMemoryCache if available so the request does not fail
    if (inMemoryCache) {
      return inMemoryCache;
    }
    throw error;
  }
}

async function syncToSupabase(data: Partial<CMSData>) {
  if (!supabase) return;
  try {
    if (data.settings) {
      await supabase.from('settings').upsert({ id: 'default', ...data.settings });
    }
  } catch (err) {
    console.error('Supabase sync error:', err);
  }
}
