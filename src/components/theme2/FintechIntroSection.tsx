'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { Plus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function FintechIntroSection() {
  const { corporateIntro } = useCMSStore();

  const title = corporateIntro?.title || 'Turn Clicks Into Conversions With Seamless Checkout';
  const description = corporateIntro?.description || 'Make Every Transaction Count With A Payment System That\'s Built For Speed And Security. 81 ilde 24 saatte kurulum ve kesintisiz teknik destek.';
  const points = corporateIntro?.bulletPoints && corporateIntro.bulletPoints.length > 0
    ? corporateIntro.bulletPoints
    : [
        'Instant Payment Insights & Real-Time Tracking',
        'Track Payments Instantly With Zero Downtime',
        '%0.99\'dan Başlayan Avantajlı Komisyon Oranları',
      ];

  return (
    <section className="py-20 sm:py-28 bg-[#fcfcfd] border-b border-slate-100/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: UI Analytics Card Stack (Matching Demo Visual) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xl space-y-6">
              
              {/* Header inside Main Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Mini Card 1: Audience 240.8K Bar Chart */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Audience</span>
                    <span className="text-[9px] text-slate-400">3 months ▼</span>
                  </div>
                  <div className="text-xl font-black text-slate-900">240.8K</div>
                  {/* Vertical Bar Chart Bars */}
                  <div className="flex items-end justify-between gap-1.5 h-14 pt-2">
                    <div className="w-2.5 bg-slate-300 rounded-t h-4" />
                    <div className="w-2.5 bg-slate-300 rounded-t h-8" />
                    <div className="w-2.5 bg-slate-900 rounded-t h-12" />
                    <div className="w-2.5 bg-slate-300 rounded-t h-6" />
                    <div className="w-2.5 bg-slate-300 rounded-t h-10" />
                    <div className="w-2.5 bg-slate-900 rounded-t h-14" />
                  </div>
                </div>

                {/* Mini Card 2: Product Categories Circular Ring */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Product categories</span>
                  <div className="my-2 relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-900 border-t-emerald-500 border-r-blue-500 flex items-center justify-center">
                      <span className="text-xs font-black text-slate-900">$196K</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-[9px] text-slate-500 font-bold">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-900" /> POS Satış</span>
                      <span className="text-slate-800">$16K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Komisyon</span>
                      <span className="text-slate-800">$72K</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Pill Card: Page views $50.8K */}
              <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    {corporateIntro?.imageBadge || 'Total Volume'}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-lg sm:text-xl font-black text-slate-900">
                      {corporateIntro?.imageTitle || '$50.8K'}
                    </span>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      24.6% ↑
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                  •••
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Dynamic Corporate Intro Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                {corporateIntro?.badge || 'KURUMSAL TANITIM & ALTYAPI'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              {description}
            </p>

            {/* Bullet List */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm font-bold text-slate-800 text-left max-w-md mx-auto lg:mx-0">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-slate-400 font-black text-sm">›</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Solid Black Pill Button */}
            <div className="pt-3 flex justify-center lg:justify-start">
              <Link
                href="/kurumsal/hakkimizda"
                className="inline-flex items-center justify-center bg-[#111827] hover:bg-slate-800 text-white text-xs font-black px-8 py-3.5 rounded-full transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>See Details</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
