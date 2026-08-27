'use client';

import React from 'react';
import FintechThemeShell from './FintechThemeShell';
import FintechFaqSection from './components/FintechFaqSection';
import FintechGrowthCta from './components/FintechGrowthCta';
import { HelpCircle } from 'lucide-react';

export default function FintechFaqPage() {
  return (
    <FintechThemeShell>
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Yardım & Destek Merkezi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-medium">
            POS kiralama, komisyon oranları, banka aktarımları ve teknik servis süreçlerine dair tüm cevaplar.
          </p>
        </div>
      </section>

      <FintechFaqSection />
      <FintechGrowthCta />
    </FintechThemeShell>
  );
}
