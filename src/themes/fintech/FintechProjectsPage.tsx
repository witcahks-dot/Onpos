'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import { ArrowRight, Briefcase, Sparkles, MapPin } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function FintechProjectsPage() {
  const { projects } = useCMSStore();

  return (
    <FintechThemeShell>
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>Saha ve Entegrasyon Projeleri</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Tamamlanan Kurumsal Projeler
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-medium">
            Zincir mağazalar, akaryakıt istasyonları ve lojistik filoları için hayata geçirdiğimiz ödeme altyapı projeleri.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((prj) => {
              const img = resolveImageUrl(prj.coverImage, 'cover');
              return (
                <div
                  key={prj.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden h-48 bg-slate-100 border border-slate-200 relative">
                      <img
                        src={img}
                        alt={prj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-black px-2.5 py-1 rounded-full">
                        {prj.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold">
                        <span>{prj.category}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-blue-600" /> {prj.location}</span>
                      </div>
                      <h3 className="text-lg font-black text-slate-950 group-hover:text-blue-600 transition-colors">
                        {prj.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-medium">
                        {prj.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-4">
                    <span className="text-xs font-bold text-slate-500">
                      Müşteri: {prj.client}
                    </span>
                    <Link
                      href={`/projeler/${prj.slug}`}
                      className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-extrabold px-4 py-2 rounded-full transition-all shadow-xs"
                    >
                      <span>İncele</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </FintechThemeShell>
  );
}
