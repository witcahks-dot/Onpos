'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, TrendingUp, BarChart3, PieChart, Sparkles } from 'lucide-react';

export default function FintechFeatureInsights() {
  return (
    <section className="py-20 sm:py-28 bg-[#fcfcfd] border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: UI Analytics Card Stack (Matching Demo Pixel-for-Pixel) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* Ambient Shadow Box */}
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xl space-y-6">
              
              {/* Header inside Main Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Mini Card 1: Audience 240.8K with Bar Chart */}
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

                {/* Mini Card 2: Product Categories $196K Circular Ring */}
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

              {/* Floating Pill Card: Page views $50.8K + 24.6% */}
              <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Total Volume</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-lg sm:text-xl font-black text-slate-900">$50.8K</span>
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

          {/* Right Column: Headline, Bullet List & Pill CTA */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Turn Clicks Into Conversions With Seamless Checkout
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Make Every Transaction Count With A Payment System That's Built For Speed And Security. 81 ilde 24 saatte kurulum ve kesintisiz teknik destek.
            </p>

            {/* Bullet List with Arrow Carats */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm font-bold text-slate-800 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-black text-sm">›</span>
                <span>Instant Payment Insights & Real-Time Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-black text-sm">›</span>
                <span>Track Payments Instantly With Zero Downtime</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-black text-sm">›</span>
                <span>%0.99'dan Başlayan Avantajlı Komisyon Oranları</span>
              </div>
            </div>

            {/* Solid Black Pill Button */}
            <div className="pt-3 flex justify-center lg:justify-start">
              <Link
                href="/pos-cihazlari"
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
