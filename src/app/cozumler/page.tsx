'use client';

import React from 'react';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingSolutionsPage from '@/themes/existing/ExistingSolutionsPage';
import FintechSolutionsPage from '@/themes/fintech/FintechSolutionsPage';

export default function SolutionsPage() {
  return (
    <ThemeDispatcher
      existing={<ExistingSolutionsPage />}
      fintech={<FintechSolutionsPage />}
    />
  );
}

