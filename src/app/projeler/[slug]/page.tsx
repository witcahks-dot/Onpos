'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCMSStore } from '@/lib/cms-store';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingProjectDetailPage from '@/themes/existing/ExistingProjectDetailPage';
import FintechProjectDetailPage from '@/themes/fintech/FintechProjectDetailPage';

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const projects = useCMSStore((state) => state.projects);
  const project = projects.find(p => p.slug === resolvedParams.slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Header />
        <div className="py-20 text-center space-y-4">
          <h2 className="text-2xl font-bold">Proje bulunamadı.</h2>
          <Link href="/projeler" className="bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl">Projelere Dön</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <ThemeDispatcher
      existing={<ExistingProjectDetailPage project={project} />}
      fintech={<FintechProjectDetailPage project={project} />}
    />
  );
}
