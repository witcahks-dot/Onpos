'use client';

import React from 'react';
import { Zap, ShieldCheck, Headphones, Percent } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function WhyUsSection() {
  const whyUs = useCMSStore((state) => state.whyUs);

  const getIcon = (idx: number) => {
    switch (idx % 4) {
      case 0: return Zap;
      case 1: return ShieldCheck;
      case 2: return Headphones;
      default: return Percent;
    }
  };

  return (
    <section className="theme-section-py bg-white border-b border-slate-100 selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-theme-primary uppercase tracking-widest bg-theme-primary-light px-4 py-1.5 rounded-full border border-theme-primary-light inline-block">
            NEDEN PAYPOS?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            İşletmeler Neden Bizi Tercih Ediyor?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Şeffaf komisyon, kesintisiz 7/24 ikame desteği ve güçlü teknoloji.
          </p>
        </div>

        {/* Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {(whyUs || []).map((item, idx) => {
            const Icon = getIcon(idx);
            return (
              <div
                key={item.id || idx}
                className="theme-card hover:border-theme-primary transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
              >
                {/* 01-04 Number */}
                <div className="text-4xl font-black text-slate-200 group-hover:text-theme-primary-light transition-colors absolute top-6 right-6 font-mono pointer-events-none">
                  {item.num}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-theme-primary-light text-theme-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-theme-primary" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-theme-primary transition-colors leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
