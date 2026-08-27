'use client';

import React from 'react';
import { useCMSStore } from '@/lib/cms-store';

export default function FintechTrustLogos() {
  const { references } = useCMSStore();

  const brandLogos = [
    { name: 'ORACLE', font: 'font-serif tracking-widest font-black text-xl' },
    { name: 'MORPHEUS', font: 'font-mono tracking-wider font-extrabold text-base' },
    { name: 'SAMSUNG', font: 'font-sans tracking-tight font-black text-lg' },
    { name: 'monday.com', font: 'font-sans lowercase font-extrabold text-lg' },
    { name: 'segment', font: 'font-mono lowercase font-bold text-lg' },
    { name: 'HUGIN', font: 'font-sans font-black tracking-widest text-lg' },
    { name: 'INGENICO', font: 'font-sans font-black text-lg' },
  ];

  return (
    <section className="bg-white py-12 border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        
        <p className="text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider">
          Trusted By Over 10,000+ Businesses and Merchants Across Turkey
        </p>

        {/* Logo Bar Container */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
          {(references && references.length > 0) ? (
            references.slice(0, 7).map((ref) => (
              <div key={ref.id} className="flex items-center justify-center h-10 px-2 transition-transform hover:scale-105">
                {ref.logo && ref.logo.startsWith('http') ? (
                  <img src={ref.logo} alt={ref.name} className="max-h-8 max-w-[120px] object-contain" />
                ) : (
                  <span className="font-black text-slate-800 text-base tracking-tight">{ref.name}</span>
                )}
              </div>
            ))
          ) : (
            brandLogos.map((brand, i) => (
              <div key={i} className="flex items-center justify-center h-8 text-slate-700 select-none">
                <span className={brand.font}>{brand.name}</span>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
