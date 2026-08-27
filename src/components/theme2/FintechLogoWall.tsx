'use client';

import React from 'react';
import { useCMSStore } from '@/lib/cms-store';

export default function FintechLogoWall() {
  const { references } = useCMSStore();

  const defaultBrands = [
    { name: 'ORACLE', font: 'font-serif font-black tracking-widest' },
    { name: 'MORPHEUS', font: 'font-mono font-extrabold tracking-wider' },
    { name: 'SAMSUNG', font: 'font-sans font-black tracking-tight' },
    { name: 'monday.com', font: 'font-sans font-bold tracking-tight' },
    { name: 'segment', font: 'font-sans font-extrabold lowercase' },
    { name: 'INGENICO', font: 'font-sans font-black tracking-widest' },
    { name: 'HUGIN', font: 'font-mono font-bold tracking-widest' },
  ];

  return (
    <section className="py-14 bg-white border-y border-slate-100/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        
        {/* Title matching demo */}
        <p className="text-xs sm:text-sm font-bold text-slate-500 tracking-wide uppercase">
          Trusted By Over 100+ Startups and freelance business
        </p>

        {/* Monochromatic Logo Strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 hover:opacity-100 transition-opacity">
          {references && references.length > 0 ? (
            references.slice(0, 7).map((ref) => (
              <div key={ref.id} className="grayscale hover:grayscale-0 transition-all duration-300 flex items-center justify-center">
                {ref.logo ? (
                  <img src={ref.logo} alt={ref.name} className="h-6 sm:h-8 max-w-[120px] object-contain" />
                ) : (
                  <span className="text-base sm:text-lg font-black text-slate-700 tracking-tight">{ref.name}</span>
                )}
              </div>
            ))
          ) : (
            defaultBrands.map((brand, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-800 hover:text-slate-900 transition-colors">
                <span className={`text-base sm:text-xl text-slate-600 ${brand.font}`}>{brand.name}</span>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
