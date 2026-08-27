'use client';

import React from 'react';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingServicesPage from '@/themes/existing/ExistingServicesPage';
import FintechServicesPage from '@/themes/fintech/FintechServicesPage';

export default function ServicesPage() {
  return (
    <ThemeDispatcher
      existing={<ExistingServicesPage />}
      fintech={<FintechServicesPage />}
    />
  );
}

