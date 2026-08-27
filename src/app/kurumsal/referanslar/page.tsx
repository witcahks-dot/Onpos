'use client';

import React from 'react';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingReferencesPage from '@/themes/existing/ExistingReferencesPage';
import FintechReferencesPage from '@/themes/fintech/FintechReferencesPage';

export default function ReferencesPage() {
  return (
    <ThemeDispatcher
      existing={<ExistingReferencesPage />}
      fintech={<FintechReferencesPage />}
    />
  );
}

