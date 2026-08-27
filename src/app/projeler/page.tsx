'use client';

import React from 'react';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingProjectsPage from '@/themes/existing/ExistingProjectsPage';
import FintechProjectsPage from '@/themes/fintech/FintechProjectsPage';

export default function ProjectsPage() {
  return (
    <ThemeDispatcher
      existing={<ExistingProjectsPage />}
      fintech={<FintechProjectsPage />}
    />
  );
}

