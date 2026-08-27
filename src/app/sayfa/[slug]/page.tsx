'use client';

import React, { use } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCMSStore } from '@/lib/cms-store';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingCustomPage from '@/themes/existing/ExistingCustomPage';
import FintechCustomPage from '@/themes/fintech/FintechCustomPage';

export default function CustomPageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const { customPages } = useCMSStore();
  const page = customPages.find(p => p.slug === slug || p.id === slug);

  if (!page) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900">Sayfa Bulunamadı</h1>
            <p className="text-xs text-slate-500">Aradığınız kurumsal sayfa yayınlanmamış veya kaldırılmış olabilir.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <ThemeDispatcher
      existing={<ExistingCustomPage page={page} />}
      fintech={<FintechCustomPage page={page} />}
    />
  );
}

