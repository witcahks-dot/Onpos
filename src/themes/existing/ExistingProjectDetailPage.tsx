'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { ProjectItem } from '@/types';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function ExistingProjectDetailPage({ project }: { project: ProjectItem }) {
  const img = resolveImageUrl(project.coverImage, 'cover');

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Projeler', href: '/projeler' }, { label: project.title }]} />

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  {project.status}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">{project.title}</h1>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">{project.description}</p>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg h-96 border border-slate-200">
              <img src={img} alt={project.title} className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase block">Müşteri / Kurum</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">{project.client}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block">Lokasyon / Bölge</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">{project.location}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block">Tamamlanma Tarihi</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">{project.completionDate}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
