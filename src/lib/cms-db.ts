import fs from 'fs';
import path from 'path';
import { CMSData } from '@/types';
import { defaultCMSData } from './default-data';
import { isSupabaseConfigured, supabase } from './supabase';

// Store DB outside `src/` to prevent Next.js dev server from triggering file-watcher HMR reboots on file write
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'cms-db.json');
const LEGACY_DB_FILE = path.join(process.cwd(), 'src', 'data', 'cms-db.json');

export { defaultCMSData };

let inMemoryCache: CMSData | null = null;

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readCMSData(): CMSData {
  if (inMemoryCache) {
    return inMemoryCache;
  }

  ensureDataDirectory();
  try {
    let rawContent: string | null = null;

    if (fs.existsSync(DB_FILE)) {
      rawContent = fs.readFileSync(DB_FILE, 'utf-8');
    } else if (fs.existsSync(LEGACY_DB_FILE)) {
      rawContent = fs.readFileSync(LEGACY_DB_FILE, 'utf-8');
    }

    if (rawContent) {
      const parsed = JSON.parse(rawContent);
      const data: CMSData = {
        ...defaultCMSData,
        ...parsed,
        settings: { ...defaultCMSData.settings, ...(parsed.settings || {}) },
        corporateIntro: { ...defaultCMSData.corporateIntro, ...(parsed.corporateIntro || {}) },
        cloudPanel: { ...defaultCMSData.cloudPanel, ...(parsed.cloudPanel || {}) },
        aboutPage: { ...defaultCMSData.aboutPage, ...(parsed.aboutPage || {}) },
        homeSections: parsed.homeSections || defaultCMSData.homeSections,
        adminUsers: parsed.adminUsers || defaultCMSData.adminUsers,
        headerConfig: { ...defaultCMSData.headerConfig, ...(parsed.headerConfig || {}) },
        footerConfig: { ...defaultCMSData.footerConfig, ...(parsed.footerConfig || {}) },
        heroConfig: { ...defaultCMSData.heroConfig, ...(parsed.heroConfig || {}) },
      };
      inMemoryCache = data;
      
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      } catch (e) {
        console.error('Initial DB_FILE write error:', e);
      }
      return data;
    }

    inMemoryCache = defaultCMSData;
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultCMSData, null, 2), 'utf-8');
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

    // Update in-memory singleton cache immediately
    inMemoryCache = updated;

    // Write to primary database file outside src/
    fs.writeFileSync(DB_FILE, JSON.stringify(updated, null, 2), 'utf-8');

    // Also update legacy file if present without breaking
    try {
      if (fs.existsSync(LEGACY_DB_FILE)) {
        fs.writeFileSync(LEGACY_DB_FILE, JSON.stringify(updated, null, 2), 'utf-8');
      }
    } catch (legacyErr) {
      // ignore legacy file write warning
    }

    // Async sync to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      syncToSupabase(data).catch(err => console.error('Supabase async sync error:', err));
    }

    return updated;
  } catch (error) {
    console.error('Error writing CMS database file:', error);
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
