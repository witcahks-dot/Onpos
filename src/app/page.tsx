'use client';

import React from 'react';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingHomePage from '@/themes/existing/ExistingHomePage';
import FintechHomePage from '@/themes/fintech/FintechHomePage';

export default function HomePage() {
  return (
    <ThemeDispatcher
      existing={<ExistingHomePage />}
      fintech={<FintechHomePage />}
    />
  );
}

