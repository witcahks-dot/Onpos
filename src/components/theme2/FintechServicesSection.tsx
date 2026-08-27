'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { Plus, ArrowUpRight, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function FintechServicesSection() {
  const { services } = useCMSStore();

  const fallbackImages = [
    'https://images.unsplash.com/photo-1556742049-0a67e5572293?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop',
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-100/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/70 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                HİZMET PORTFÖYÜ
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Kurumsal <span className="text-slate-900">Ödeme Hizmetleri.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg">
              Fiziki mağazalardan mobil teslimatlara kadar tüm ödeme altyapınızı güçlendiren profesyonel hizmetler.
            </p>
          </div>

          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900 hover:text-slate-600 transition-colors shrink-0"
          >
            <span>Tüm Hizmetleri İncele</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Card Minimalist Fintech Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {(services || []).slice(0, 4).map((service, idx) => {
            const coverImage = (service.images && service.images[0] && service.images[0].trim() !== '')
              ? service.images[0]
              : fallbackImages[idx % fallbackImages.length];

            return (
              <div
                key={service.id}
                className="bg-[#fbfbfe] rounded-[28px] border border-slate-200/80 hover:border-slate-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-xl"
              >
                {/* Image Container */}
                <div className="h-52 sm:h-56 relative overflow-hidden bg-slate-900">
                  <img
                    src={coverImage}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {/* Category Pill inside image bottom */}
                  <span className="absolute bottom-3 left-4 text-[10px] font-black uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1 rounded-full shadow-sm">
                    {service.category || 'ÖDEME HİZMETİ'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-slate-700 transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                      {service.shortDesc || service.fullDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">Detaylı İncele</span>
                    <Link
                      href={`/hizmetler/${service.slug}`}
                      className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
                      aria-label="İncele"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
