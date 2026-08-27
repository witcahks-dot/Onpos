'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCMSStore } from '@/lib/cms-store';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingPosDetailPage from '@/themes/existing/ExistingPosDetailPage';
import FintechPosDetailPage from '@/themes/fintech/FintechPosDetailPage';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { products } = useCMSStore();

  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Header />
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">Aradığınız POS cihazı bulunamadı.</h2>
          <p className="text-xs text-slate-500">Ürün kataloğumuz güncellenmiş veya kaldırılmış olabilir.</p>
          <Link href="/pos-cihazlari" className="inline-block bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl">
            Tüm Cihazlara Dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <ThemeDispatcher
      existing={<ExistingPosDetailPage product={product} />}
      fintech={<FintechPosDetailPage product={product} />}
    />
  );
}

