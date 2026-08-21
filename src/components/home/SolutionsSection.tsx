'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function SolutionsSection() {
  const solutions = useCMSStore((state) => state.solutions);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sektörel Çözümler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sektörünüze özel geliştirilmiş ödeme altyapıları.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Restoranlardan mağazalara, kapıda ödeme kuryelerinden e-ticarete kadar görsellerle desteklenmiş özel donanım ve yazılım sistemleri.
          </p>
        </div>

        {/* Visual Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              className="bg-slate-800/80 rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl group flex flex-col justify-between"
            >
              {/* Dominant Image Container */}
              <div className="h-64 sm:h-72 relative overflow-hidden">
                <img
                  src={sol.image}
                  alt={sol.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {sol.category}
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-xl font-bold text-white leading-tight">{sol.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{sol.shortDesc}</p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{sol.targetAudience}</span>
                </div>

                <Link
                  href={`/cozumler/${sol.slug}`}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
                >
                  <span>Çözümü İncele</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
