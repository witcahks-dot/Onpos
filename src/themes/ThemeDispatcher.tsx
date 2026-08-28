'use client';

import React from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { ThemeId } from '@/types';

interface ThemeDispatcherProps {
  existing: React.ReactNode;
  fintech: React.ReactNode;
}

export default function ThemeDispatcher({ existing, fintech }: ThemeDispatcherProps) {
  const { settings } = useCMSStore();
  
  // 1. Primary: Store value loaded from verified DB API
  let activeTheme: ThemeId = (settings?.themeId === 'theme-fintech') ? 'theme-fintech' : 'theme-existing';

  // 2. Hydration helper: Before store fetch completes, read SSR data-theme or cookie
  if (typeof document !== 'undefined' && !settings?.themeId) {
    const docTheme = document.documentElement.getAttribute('data-theme');
    if (docTheme === 'theme-fintech' || docTheme === 'theme-existing') {
      activeTheme = docTheme as ThemeId;
    } else {
      const match = document.cookie.match(/paypos_theme_id=(theme-[a-z]+)/);
      if (match && (match[1] === 'theme-fintech' || match[1] === 'theme-existing')) {
        activeTheme = match[1] as ThemeId;
      }
    }
  }

  if (activeTheme === 'theme-fintech') {
    return <>{fintech}</>;
  }

  return <>{existing}</>;
}
