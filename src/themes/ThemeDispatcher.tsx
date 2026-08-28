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
  
  let activeTheme: ThemeId = (settings?.themeId === 'theme-fintech') ? 'theme-fintech' : 'theme-existing';

  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/paypos_theme_id=(theme-[a-z]+)/);
    if (match && match[1] && (match[1] === 'theme-fintech' || match[1] === 'theme-existing')) {
      activeTheme = match[1] as ThemeId;
    }
  }

  if (activeTheme === 'theme-fintech') {
    return <>{fintech}</>;
  }

  return <>{existing}</>;
}
