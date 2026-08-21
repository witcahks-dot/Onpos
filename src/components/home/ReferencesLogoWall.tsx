'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';

export default function ReferencesLogoWall() {
  const references = useCMSStore((state) => state.references);

  return (
    <section className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
            Güçlü Referans Ağımız
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Türkiye'nin önde gelen marka ve zincirlerine güven veriyoruz.
          </h2>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 items-center">
          {(references || []).slice(0, 12).map((ref) => {
            const hasLogo = ref.logo && ref.logo.trim() !== '';
            const initials = ref.name
              ? ref.name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
              : 'POS';

            return (
              <div
                key={ref.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center justify-center space-y-2 group min-h-[100px]"
              >
                {hasLogo ? (
                  <img
                    src={ref.logo}
                    alt={ref.name}
                    className="h-10 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-black text-xs group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    {initials}
                  </div>
                )}

                <span className="text-xs font-bold text-slate-800 line-clamp-1">{ref.name}</span>
                {ref.city && <span className="text-[10px] text-slate-400 font-medium">{ref.city} / {ref.district || 'Merkez'}</span>}
              </div>
            );
          })}
        </div>

        <div>
          <Link
            href="/kurumsal/referanslar"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
          >
            <span>Tüm Referanslarımızı ve İş Ortaklarımızı Gör →</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
