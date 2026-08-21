'use client';

import React from 'react';
import { Building2, CreditCard, Headphones, Activity } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function TrustStats() {
  const trustStats = useCMSStore((state) => state.trustStats);

  const getIcon = (idx: number) => {
    switch (idx % 4) {
      case 0: return Building2;
      case 1: return CreditCard;
      case 2: return Headphones;
      default: return Activity;
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-slate-100 selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {(trustStats || []).map((item, idx) => {
            const Icon = getIcon(idx);
            return (
              <div
                key={item.id || idx}
                className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
                    {item.number}
                  </div>
                  
                  <div className="text-sm font-bold text-slate-800 mt-2">{item.label}</div>
                  <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
