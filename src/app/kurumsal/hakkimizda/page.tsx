'use client';

import React from 'react';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingAboutPage from '@/themes/existing/ExistingAboutPage';
import FintechAboutPage from '@/themes/fintech/FintechAboutPage';

export default function AboutPage() {
  return (
    <ThemeDispatcher
      existing={<ExistingAboutPage />}
      fintech={<FintechAboutPage />}
    />
  );
}

