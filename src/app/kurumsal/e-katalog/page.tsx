'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useCMSStore } from '@/lib/cms-store';
import { Download, FileText, ExternalLink } from 'lucide-react';

export default function ECatalogPage() {
  const catalogs = useCMSStore((state) => state.catalogs);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Kurumsal', href: '/kurumsal/hakkimizda' }, { label: 'E-Katalog' }]} />

        <section className="bg-white py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Dokümantasyon</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              E-Katalog ve <span className="text-gradient-blue">Dijital Broşürler</span>
            </h1>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {catalogs.map(cat => (
              <div key={cat.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
                <img src={cat.coverImage} alt={cat.title} className="w-32 h-40 object-cover rounded-xl shadow-md border border-slate-100" />
                <div className="space-y-3 text-center sm:text-left">
                  <h3 className="text-base font-bold text-slate-900">{cat.title}</h3>
                  <p className="text-xs text-slate-500">{cat.description}</p>
                  <span className="text-[11px] font-mono text-slate-400 block">Dosya Boyutu: {cat.fileSize}</span>
                  <a
                    href={cat.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF Katalog İndir</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
