'use client';

import React from 'react';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingBlogPage from '@/themes/existing/ExistingBlogPage';
import FintechBlogPage from '@/themes/fintech/FintechBlogPage';

export default function BlogPage() {
  return (
    <ThemeDispatcher
      existing={<ExistingBlogPage />}
      fintech={<FintechBlogPage />}
    />
  );
}

