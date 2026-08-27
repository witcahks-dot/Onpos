'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { ChevronRight, ArrowRight, TrendingUp, DollarSign } from 'lucide-react';

export default function FintechConversionSection() {
  const { cloudPanel, solutions, services } = useCMSStore();

  const title = 'Turn Clicks Into Conversions With Seamless Checkout';
  const desc = 'Make Every Transaction Count With A Payment System That\'s Built For Speed And Security.';

  const activeSolution = solutions?.[0];

  return (
    <section className="bg-slate-50/50 py-20 border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Analytics Dashboard Mockups */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6">
              
              {/* Card Header & Total Balance */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Toplam Hacim</span>
                  <div className="text-2xl font-black text-slate-950">
                    {cloudPanel?.todayRevenue || '₺ 240,850.00'}
                  </div>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-black px-2.5 py-1 rounded-full border border-emerald-200">
                  {cloudPanel?.todayGrowth || '+24.6%'}
                </span>
              </div>

              {/* Bar Chart & Category Split Visual */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Bar Chart Box */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500">Aylık İşlem Hacmi</span>
                  <div className="flex items-end gap-1.5 h-20 pt-2">
                    <div className="w-1/5 bg-slate-200 rounded-t h-[40%]" />
                    <div className="w-1/5 bg-slate-300 rounded-t h-[65%]" />
                    <div className="w-1/5 bg-slate-200 rounded-t h-[50%]" />
                    <div className="w-1/5 bg-slate-400 rounded-t h-[80%]" />
                    <div className="w-1/5 bg-slate-950 rounded-t h-[100%]" />
                  </div>
                </div>

                {/* Donut / Category Box */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500">POS Dağılımı</span>
                    <div className="text-sm font-black text-slate-900 mt-1">₺ 196,400</div>
                  </div>
                  <div className="space-y-1 text-[10px] text-slate-500 font-bold">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600" /> Android POS</span>
                      <span>54%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Mobil POS</span>
                      <span>46%</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Pill Card: Page Views / Speed */}
              <div className="p-3 bg-slate-950 text-white rounded-2xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-xs">
                    ⚡
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">İşlem Onay Süresi</span>
                    <span className="text-xs font-black">{cloudPanel?.txSpeed || '0.4 Saniye (Anlık)'}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  PCI PTS 6.x
                </span>
              </div>

            </div>

          </div>

          {/* Right Column: Copy & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 max-w-xl">
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {activeSolution?.title || title}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {activeSolution?.shortDesc || desc}
            </p>

            {/* Bullets with `>` arrow matching reference image */}
            <div className="space-y-3 pt-2 text-sm font-extrabold text-slate-900">
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-slate-950 shrink-0" />
                <span>Anlık ve Şeffaf Ödeme Takibi (Instant Payment Insights)</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-slate-950 shrink-0" />
                <span>Ertesi Gün Kesintisiz Hesap Aktarımı (Track Payments Instantly)</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-slate-950 shrink-0" />
                <span>Tüm Banka Kartları ve Yemek Çekleri Tek Cihazda</span>
              </div>
            </div>

            {/* See Details Button */}
            <div className="pt-2">
              <Link
                href="/cozumler"
                className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold px-7 py-3.5 rounded-full transition-all shadow-md active:scale-95"
              >
                <span>Detayları İncele</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
