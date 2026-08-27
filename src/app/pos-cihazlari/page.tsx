'use client';

import React from 'react';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingPosCatalogPage from '@/themes/existing/ExistingPosCatalogPage';
import FintechPosCatalogPage from '@/themes/fintech/FintechPosCatalogPage';

export default function PosProductsPage() {
  return (
    <ThemeDispatcher
      existing={<ExistingPosCatalogPage />}
      fintech={<FintechPosCatalogPage />}
    />
  );
}
