'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCMSStore } from '@/lib/cms-store';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingServiceDetailPage from '@/themes/existing/ExistingServiceDetailPage';
import FintechServiceDetailPage from '@/themes/fintech/FintechServiceDetailPage';

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { services } = useCMSStore();

  const service = services.find(s => s.slug === resolvedParams.slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Header />
        <div className="py-20 text-center space-y-4">
          <h2 className="text-2xl font-bold">Hizmet bulunamadı.</h2>
          <Link href="/hizmetler" className="bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl">Hizmetlere Dön</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <ThemeDispatcher
      existing={<ExistingServiceDetailPage service={service} />}
      fintech={<FintechServiceDetailPage service={service} />}
    />
  );
}

