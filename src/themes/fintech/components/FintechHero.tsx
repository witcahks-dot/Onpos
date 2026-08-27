'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { ArrowRight, Plus, Sparkles, TrendingUp, ShieldCheck, Check } from 'lucide-react';
import QuoteModal from '@/components/ui/QuoteModal';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function FintechHero() {
  const { heroSlides, settings, corporateIntro } = useCMSStore();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const activeSlide = (heroSlides || []).find(s => s.isActive !== false) || heroSlides?.[0];

  const title = activeSlide?.title || 'Take Control of Your Financial Future.';
  const subtitle = activeSlide?.description || corporateIntro?.description || 'Your all-in-one solution to smarter money management. Track spending, set goals, and make informed financial decisions with clarity and ease.';
  const primaryCta = activeSlide?.primaryCtaText || 'Get Started';
  const secondaryCta = activeSlide?.secondaryCtaText || 'See Details';

  // Advisor image fallback
  const heroImage = resolveImageUrl(
    activeSlide?.imageUrl,
    'pos'
  );

  return (
    <section className="relative bg-white pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-7 space-y-6 max-w-2xl">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{activeSlide?.badge || 'YENİ NESİL ÖDEME VE FİNTEK ALTYAPISI'}</span>
            </div>

            {/* Main Headline (Matching reference image typography) */}
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                {title}{' '}
                <span className="inline-flex items-center justify-center align-middle w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950 text-white ml-2 shadow-md">
                  <Plus className="w-5 h-5" />
                </span>
              </h1>
            </div>

            {/* Subtitle Paragraf */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {subtitle}
            </p>

            {/* Action Buttons (Get Started & See Details) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold px-7 py-4 rounded-full transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/pos-cihazlari"
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-xs sm:text-sm font-extrabold px-6 py-4 rounded-full transition-all shadow-xs active:scale-95"
              >
                {secondaryCta}
              </Link>
            </div>

            {/* Trust bullet tags */}
            <div className="flex items-center gap-6 pt-4 text-xs font-bold text-slate-500">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>BDDK & GİB Onaylı</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>%0.99'dan Başlayan Oranlar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>24 Saatte Teslimat</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Circular Badge and Finance Rate Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Background Soft Glow */}
            <div className="absolute inset-0 bg-blue-50/70 rounded-full blur-3xl -z-10 scale-90" />

            {/* Main Visual Container */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-slate-100 to-slate-200/60 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xl flex flex-col items-center overflow-visible">
              
              {/* Top Right Circular Badge: "12+ YEARS OF EXPERIENCE" */}
              <div className="absolute -top-5 -right-5 sm:-top-6 sm:-right-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border border-slate-200 shadow-xl flex flex-col items-center justify-center p-2 text-center animate-spin-slow">
                <div className="text-base sm:text-lg font-black text-slate-950 leading-none">12+</div>
                <span className="text-[7px] sm:text-[8px] font-black uppercase text-slate-600 tracking-wider mt-1">
                  Yıllık Sektör Deneyimi
                </span>
              </div>

              {/* Main Image (POS / Advisor Hero) */}
              <div className="w-full flex items-center justify-center py-4">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                  alt="PAYPOS Fintek Danışmanı"
                  className="max-h-80 sm:max-h-96 object-cover rounded-2xl shadow-lg border border-slate-200"
                />
              </div>

              {/* Floating Bottom Card: "Finance Rate 78%" with Sparkline */}
              <div className="absolute -bottom-5 left-4 sm:left-6 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 backdrop-blur-md">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-extrabold text-slate-900">Komisyon Tasarrufu</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.2 rounded">78%</span>
                  </div>
                  {/* Gold Wave Sparkline */}
                  <svg className="w-28 h-6 text-amber-500" viewBox="0 0 100 25" fill="none">
                    <path
                      d="M0 20 Q 25 5, 50 15 T 100 5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </section>
  );
}
