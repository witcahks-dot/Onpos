'use client';

import React from 'react';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingFaqPage from '@/themes/existing/ExistingFaqPage';
import FintechFaqPage from '@/themes/fintech/FintechFaqPage';

export default function FaqPage() {
  return (
    <ThemeDispatcher
      existing={<ExistingFaqPage />}
      fintech={<FintechFaqPage />}
    />
  );
}

