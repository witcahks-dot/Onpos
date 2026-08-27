'use client';

import React from 'react';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingGalleryPage from '@/themes/existing/ExistingGalleryPage';
import FintechGalleryPage from '@/themes/fintech/FintechGalleryPage';

export default function GalleryPage() {
  return (
    <ThemeDispatcher
      existing={<ExistingGalleryPage />}
      fintech={<FintechGalleryPage />}
    />
  );
}

