'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import { ArrowRight, Wrench, Shield, Clock, Award, Sparkles } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function FintechServicesPage() {
  const { services } = useCMSStore();

  return (
    <FintechThemeShell>
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5 text-blue-400" />
            <span>Teknik Servis ve Saha Operasyonları</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Uçtan Uca POS Hizmetleri
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-medium">
            Mali hafıza değişimi, yerinde teknik bakım, periyodik kalibrasyon ve 7/24 ikame cihaz temini ile işiniz hiç durmasın.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv) => {
              const img = resolveImageUrl(srv.images?.[0], 'cover');
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden h-48 bg-slate-100 border border-slate-200">
                      <img
                        src={img}
                        alt={srv.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                        {srv.category || 'Teknik Servis'}
                      </span>
                      <h3 className="text-lg font-black text-slate-950 group-hover:text-blue-600 transition-colors">
                        {srv.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-medium">
                        {srv.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-4">
                    <span className="text-xs font-bold text-slate-500">
                      Yetkili Servis
                    </span>
                    <Link
                      href={`/hizmetler/${srv.slug}`}
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
