'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Shield, ArrowRight, Sparkles, CheckCircle2, Zap, Lock, CreditCard, Star } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function VisualHeroBannerSlider() {
  const heroSlides = useCMSStore((state) => state.heroSlides);
  const activeSlides = (heroSlides || []).filter(s => s.isActive).sort((a, b) => a.order - b.order);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    if (activeSlides.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prevSlide = useCallback(() => {
    if (activeSlides.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, activeSlides.length]);

  if (activeSlides.length === 0) return null;

  return (
    <section
      className="relative bg-slate-950 text-white overflow-hidden theme-section-py border-b border-slate-800 selection:bg-blue-600 selection:text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Gradient Mesh & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-corporate-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Stage Stage Wrapper */}
        <div className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center">
          {activeSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-500 ease-in-out ${
                  isActive
                    ? 'opacity-100 z-10 translate-y-0 pointer-events-auto'
                    : 'opacity-0 z-0 translate-y-2 pointer-events-none'
                }`}
              >
                {/* Left Column: Minimal & Punchy Typography */}
                <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                  {/* Eyebrow Badge */}
                  <div>
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-inner">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>{slide.badge || 'YENİ NESİL VİTRİN'}</span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                    {slide.title.split(' ')[0]} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                      {slide.title.split(' ').slice(1).join(' ')}
                    </span>
                  </h1>

                  {/* Minimal Description */}
                  <p className="text-base text-slate-300 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 line-clamp-2">
                    {slide.description}
                  </p>

                  {/* Quick Feature Badges */}
                  <div className="flex flex-wrap gap-3 pt-1 text-xs font-extrabold text-slate-200 justify-center lg:justify-start">
                    <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 backdrop-blur-md">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>GİB & BDDK Onaylı</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 backdrop-blur-md">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>0.8s Temassız Okuma</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-3 justify-center lg:justify-start">
                    <Link
                      href={slide.primaryCtaUrl || '#teklif-al'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-black px-8 py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/30 active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <Shield className="w-4 h-4" />
                      <span>{slide.primaryCtaText || 'Hemen Teklif Al'}</span>
                    </Link>

                    <Link
                      href={slide.secondaryCtaUrl || '/pos-cihazlari'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-sm font-extrabold px-7 py-4 rounded-2xl transition-all whitespace-nowrap"
                    >
                      <span>{slide.secondaryCtaText || 'Model Detayı'}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Visual Product Showcase Image */}
                <div className="lg:col-span-6 relative flex items-center justify-center">
                  
                  {/* Glowing Device Aura Ring */}
                  <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] bg-blue-600/20 rounded-full blur-[90px] pointer-events-none" />

                  {/* Massive Product Image Card */}
                  <div className="relative z-10 p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 to-slate-900/60 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl group hover:border-blue-500/40 transition-all duration-300">
                    
                    {/* Device Badge Overlay */}
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
                      {slide.posName}
                    </div>

                    <div className="py-4 my-2 flex items-center justify-center">
                      <img
                        src={slide.imageUrl}
                        alt={slide.posName}
                        className="w-64 h-72 sm:w-80 sm:h-84 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Bottom Status Card */}
                    <div className="w-full pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Stokta Var • 24 Saatte Kargo</span>
                      </span>
                      <span className="text-blue-400 font-extrabold">2 Yıl Garanti</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrow Buttons */}
        {activeSlides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-800 shadow-2xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              aria-label="Önceki"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-800 shadow-2xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              aria-label="Sonraki"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bullet Dots Pagination */}
        {activeSlides.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 mt-8 relative z-20">
            {activeSlides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  title={slide.posName}
                  aria-label={`Slayt ${idx + 1}: ${slide.posName}`}
                  className={`transition-all duration-500 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-10 h-3 bg-blue-500 shadow-lg shadow-blue-500/50'
                      : 'w-3 h-3 bg-slate-700 hover:bg-blue-400'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
