'use client';

import React from 'react';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingContactPage from '@/themes/existing/ExistingContactPage';
import FintechContactPage from '@/themes/fintech/FintechContactPage';

export default function ContactPage() {
  return (
    <ThemeDispatcher
      existing={<ExistingContactPage />}
      fintech={<FintechContactPage />}
    />
  );
}

