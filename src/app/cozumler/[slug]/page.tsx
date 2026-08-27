'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCMSStore } from '@/lib/cms-store';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingSolutionDetailPage from '@/themes/existing/ExistingSolutionDetailPage';
import FintechSolutionDetailPage from '@/themes/fintech/FintechSolutionDetailPage';

export default function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const solutions = useCMSStore((state) => state.solutions);

  const solution = solutions.find(s => s.slug === resolvedParams.slug);

  if (!solution) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Header />
        <div className="py-20 text-center space-y-4">
          <h2 className="text-2xl font-bold">Sektörel çözüm bulunamadı.</h2>
          <Link href="/cozumler" className="bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl">Çözümlere Dön</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <ThemeDispatcher
      existing={<ExistingSolutionDetailPage solution={solution} />}
      fintech={<FintechSolutionDetailPage solution={solution} />}
    />
  );
}

