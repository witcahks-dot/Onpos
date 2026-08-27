'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCMSStore } from '@/lib/cms-store';
import FloatingQuickContact from '@/components/layout/FloatingQuickContact';

function hexToRgb(hex: string): string {
  if (!hex || typeof hex !== 'string') return '37, 99, 235';
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  if (cleanHex.length !== 6) return '37, 99, 235';
  const num = parseInt(cleanHex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r}, ${g}, ${b}`;
}

export default function CMSHydrator() {
  const pathname = usePathname();
  const { fetchCMSData, settings } = useCMSStore();

  useEffect(() => {
    fetchCMSData();
  }, [fetchCMSData]);

  // Dynamically sync primary & accent colors, layout density, and card style with CSS root variables
  useEffect(() => {
    if (typeof document !== 'undefined' && settings) {
      const root = document.documentElement;

      // 1. Primary & Accent Colors
      const primaryHex = settings.primaryColor || '#2563eb';
      const accentHex = settings.accentColor || '#1e3a8a';
      root.style.setProperty('--primary-color', primaryHex);
      root.style.setProperty('--primary-rgb', hexToRgb(primaryHex));
      root.style.setProperty('--accent-color', accentHex);
      root.style.setProperty('--accent-rgb', hexToRgb(accentHex));

      // 2. Layout Density
      const density = settings.layoutDensity || 'spacious';
      if (density === 'spacious') {
        root.style.setProperty('--section-py-sm', '5rem');
        root.style.setProperty('--section-py-lg', '7rem');
        root.style.setProperty('--card-padding', '2rem');
      } else if (density === 'compact') {
        root.style.setProperty('--section-py-sm', '2.5rem');
        root.style.setProperty('--section-py-lg', '3.5rem');
        root.style.setProperty('--card-padding', '1.25rem');
      } else {
        // balanced
        root.style.setProperty('--section-py-sm', '3.5rem');
        root.style.setProperty('--section-py-lg', '5rem');
        root.style.setProperty('--card-padding', '1.5rem');
      }

      // 3. Card Style
      const cardStyle = settings.cardStyle || 'soft-border';
      if (cardStyle === 'elevated-shadow') {
        root.style.setProperty('--card-border', '1px solid rgba(241, 245, 249, 1)');
        root.style.setProperty('--card-shadow', '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)');
        root.style.setProperty('--card-radius', '1.75rem');
      } else if (cardStyle === 'minimal-flat') {
        root.style.setProperty('--card-border', 'none');
        root.style.setProperty('--card-shadow', 'none');
        root.style.setProperty('--card-radius', '1.25rem');
      } else {
        // soft-border
        root.style.setProperty('--card-border', '1px solid rgba(226, 232, 240, 0.9)');
        root.style.setProperty('--card-shadow', '0 1px 3px 0 rgba(0, 0, 0, 0.05)');
        root.style.setProperty('--card-radius', '1.5rem');
      }

      // 4. Dark/Light Theme Mode & Active Theme ID
      if (settings.activeTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      const activeThemeId = settings.themeId === 'theme-fintech' ? 'theme-fintech' : 'theme-existing';
      root.setAttribute('data-theme', activeThemeId);
    }
  }, [
    settings?.primaryColor,
    settings?.accentColor,
    settings?.colorPreset,
    settings?.layoutDensity,
    settings?.cardStyle,
    settings?.activeTheme,
    settings?.themeId
  ]);

  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <FloatingQuickContact />}
    </>
  );
}
