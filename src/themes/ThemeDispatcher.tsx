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
  const activeTheme: ThemeId = (settings?.themeId === 'theme-fintech') ? 'theme-fintech' : 'theme-existing';

  if (activeTheme === 'theme-fintech') {
    return <>{fintech}</>;
  }

  return <>{existing}</>;
}
