'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import { SolutionItem } from '@/types';
import { ArrowLeft, ArrowRight, Check, Layers, Phone } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';
import QuoteModal from '@/components/ui/QuoteModal';

export default function FintechSolutionDetailPage({ solution }: { solution: SolutionItem }) {
  const { settings, solutions } = useCMSStore();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const img = resolveImageUrl(solution.image, 'cover');
  const otherSolutions = (solutions || []).filter(s => s.id !== solution.id).slice(0, 3);

  return (
    <FintechThemeShell>
      <div className="bg-slate-50 border-b border-slate-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-950">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/cozumler" className="hover:text-slate-950">Çözümler</Link>
            <span>/</span>
            <span className="text-slate-950 truncate max-w-xs">{solution.title}</span>
          </div>

          <Link href="/cozumler" className="flex items-center gap-1 text-slate-800 hover:text-blue-600">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Çözümlere Dön</span>
          </Link>
        </div>
      </div>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
                  {solution.targetAudience || 'Sektörel Çözüm'}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                  {solution.title}
                </h1>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {solution.shortDesc}
                </p>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 max-h-[420px]">
                <img src={img} alt={solution.title} className="w-full h-full object-cover" />
              </div>

              <div className="prose max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed font-medium space-y-4">
                {solution.fullDesc ? (
                  <p>{solution.fullDesc}</p>
                ) : (
                  <p>
                    İşletmenizin ciro artışını destekleyen ve muhasebe/ERP sistemleri ile tam entegre çalışan yeni nesil finansal teknolojiler.
                  </p>
                )}
              </div>

              {solution.features && solution.features.length > 0 && (
                <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
                  <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">
                    Temel Çözüm Avantajları
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
                    {solution.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6 sticky top-24">
              <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Teklif Al</span>
                  <h3 className="text-xl font-black text-white">
                    Sektörünüze Özel Teklif
                  </h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    İşletmenize en uygun komisyon oranı ve donanım paketini belirleyelim.
                  </p>
                </div>

                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="w-full bg-white hover:bg-slate-100 text-slate-950 font-black py-3.5 px-6 rounded-full transition-all text-xs active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Teklif İsteyin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${settings.phone || '08503080000'}`}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-extrabold py-3.5 px-6 rounded-full transition-all text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>{settings.phoneFormatted || '0850 308 00 00'}</span>
                </a>
              </div>

              {otherSolutions.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Diğer Sektörel Çözümler
                  </h4>
                  <div className="space-y-2">
                    {otherSolutions.map(s => (
                      <Link
                        key={s.id}
                        href={`/cozumler/${s.slug}`}
                        className="block p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-extrabold text-slate-800 hover:text-blue-600"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </FintechThemeShell>
  );
}
