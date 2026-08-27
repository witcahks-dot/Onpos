'use client';

import React from 'react';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import { Award, Building2, MapPin, Globe } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function FintechReferencesPage() {
  const { references } = useCMSStore();

  return (
    <FintechThemeShell>
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>İş Ortakları ve Referanslar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            10.000+ Mutlu Üye İşyeri
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-medium">
            Türkiye'nin dört bir yanında PAYPOS altyapısını tercih eden kurumsal markalar ve işletmeler.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center space-y-3 group"
              >
                <div className="h-14 flex items-center justify-center">
                  {ref.logo && ref.logo.startsWith('http') ? (
                    <img src={ref.logo} alt={ref.name} className="max-h-12 max-w-[100px] object-contain grayscale group-hover:grayscale-0 transition-all" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-200 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-black text-xs text-slate-700 transition-colors">
                      {ref.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors truncate max-w-[120px]">
                    {ref.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-bold block">{ref.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FintechThemeShell>
  );
}
