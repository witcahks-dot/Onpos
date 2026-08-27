'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { Plus, ArrowRight, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

export default function FintechHero() {
  const { heroSlides, settings } = useCMSStore();
  const currentSlide = heroSlides && heroSlides.length > 0 ? heroSlides[0] : null;

  const headline = currentSlide?.title || 'Take Control of Your Financial Future.';
  const description = currentSlide?.description || 'Your all-in-one solution to smarter money management. Track spending, set goals, and make informed financial decisions with clarity and ease.';
  const primaryCta = currentSlide?.primaryCtaText || 'Get Started';
  const secondaryCta = currentSlide?.secondaryCtaText || 'See Details';

  return (
    <section className="relative bg-[#fbfbfe] overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Bold Fintech Typography & Dual Pill CTA */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            
            {/* Small Plus/Star Accent Tag */}
            <div className="inline-flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                {currentSlide?.badge || 'YENİ NESİL AKILLI ÖDEME SİSTEMİ'}
              </span>
            </div>

            {/* High Impact Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-slate-900 tracking-tight leading-[1.06]">
              {headline.includes('.') ? headline : `${headline}.`}
            </h1>

            {/* Concise Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              {description}
            </p>

            {/* Dual Pill CTA Buttons matching Demo Design */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
              <Link
                href="#teklif-al"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#111827] hover:bg-slate-800 text-white text-xs font-black px-8 py-4 rounded-full transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>{primaryCta}</span>
              </Link>

              <Link
                href="/pos-cihazlari"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-slate-100/90 text-slate-900 border border-slate-300 text-xs font-black px-8 py-4 rounded-full transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>{secondaryCta}</span>
              </Link>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-4 flex items-center gap-6 justify-center lg:justify-start text-xs font-bold text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>GİB & BDDK Lisanslı</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>%0.99'dan Başlayan Oranlar</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Stage with Portrait, Circular Halo & Floating UI Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Circular Backdrop Halo */}
            <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] bg-[#edf1f7] rounded-full flex items-center justify-center overflow-hidden border border-slate-200/60 shadow-inner">
              
              {/* Professional Hero Portrait Photo */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Fintech Manager"
                className="w-full h-full object-cover object-top filter contrast-[1.05] translate-y-4 scale-110"
              />
            </div>

            {/* Floating Top-Right Circular Rotating Experience Badge */}
            <div className="absolute -top-3 right-4 sm:right-8 bg-white/95 backdrop-blur-md border border-slate-200 p-3 rounded-full shadow-xl flex items-center justify-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                {/* Circular Text SVG */}
                <svg className="w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[7.5px] font-black uppercase tracking-[2.5px] fill-slate-700">
                    <textPath href="#circlePath" startOffset="0%">
                      • 15+ YEARS OF EXPERIENCE • FINTECH
                    </textPath>
                  </text>
                </svg>
                {/* Center Badge Number */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-none">15+</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Yıl</span>
                </div>
              </div>
            </div>

            {/* Floating Bottom-Left Finance Rate Glass Card */}
            <div className="absolute -bottom-4 left-2 sm:left-6 bg-white/95 backdrop-blur-xl border border-slate-200/90 p-4 sm:p-5 rounded-2xl shadow-2xl flex flex-col gap-2 min-w-[200px] animate-bounce-slow">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black text-slate-800">Finance Rate</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                  78%
                </span>
              </div>

              {/* Dynamic Wave Chart Line */}
              <div className="w-full h-8 flex items-center">
                <svg className="w-full h-full stroke-amber-500 fill-none" viewBox="0 0 120 30">
                  <path
                    d="M 0,20 Q 20,5 40,18 T 80,10 T 120,5"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-1.5">
                <span>Anlık Ciro Artışı</span>
                <span className="text-emerald-600 font-extrabold">+24.8%</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
