'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import QuoteModal from '@/components/ui/QuoteModal';
import { SolutionItem } from '@/types';
import { CheckCircle2 } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function ExistingSolutionDetailPage({ solution }: { solution: SolutionItem }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const img = resolveImageUrl(solution.image, 'cover');

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Çözümler', href: '/cozumler' }, { label: solution.title }]} />

        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/60 inline-block mb-2">
                {solution.targetAudience || 'Sektörel Çözüm'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">{solution.title}</h1>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-medium">{solution.shortDesc || solution.fullDesc}</p>
            </div>

            {img && (
              <div className="rounded-3xl overflow-hidden shadow-md h-80 border border-slate-200/90">
                <img src={img} alt={solution.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">Sektörel Entegrasyon Özellikleri</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-semibold">
                {(solution.features || []).map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-600 text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-600/20">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-xl font-black text-white">Sektörünüze Özel POS Paketini İnceleyin</h3>
                <p className="text-xs text-blue-100 font-medium">İşletmenize özel komisyon ve cihaz teklifini hemen alın.</p>
              </div>
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-7 py-3.5 rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap cursor-pointer"
              >
                Hemen Teklif İste
              </button>
            </div>
          </div>
        </section>
      </main>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      <Footer />
    </div>
  );
}
