'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Shield, ArrowRight, Sparkles, CheckCircle2, Zap, Lock, Eye, Award } from 'lucide-react';
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

  const activeSlide = activeSlides[currentIndex];

  return (
    <section
      className="relative bg-slate-950 text-white overflow-hidden py-16 sm:py-24 border-b border-slate-800 selection:bg-blue-600 selection:text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Cinematic Ambient Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_40%,rgba(37,99,235,0.22),transparent)]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-corporate-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Fullscreen Stage Container */}
        <div className="relative min-h-[500px] sm:min-h-[540px] flex items-center justify-center">
          {activeSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            const titleParts = slide.title.split(' ');
            const mainWord = titleParts[0] || 'AKILLI';
            const restWords = titleParts.slice(1).join(' ') || 'ÖDEME TEKNOLOJİSİ';

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 ease-in-out ${
                  isActive
                    ? 'opacity-100 z-10 translate-y-0 pointer-events-auto'
                    : 'opacity-0 z-0 translate-y-4 pointer-events-none'
                }`}
              >
                {/* Left Column: Bold Kinetic Typography & Action */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-20">
                  
                  {/* Top Badge */}
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>{slide.badge || 'CINEMATIC SPOTLIGHT'}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      0{idx + 1} / 0{activeSlides.length}
                    </span>
                  </div>

                  {/* Dramatic Headline */}
                  <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.95] drop-shadow-2xl">
                    <span className="block text-white">{mainWord}</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                      {restWords}
                    </span>
                  </h1>

                  {/* Minimal Description */}
                  <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 line-clamp-2">
                    {slide.description}
                  </p>

                  {/* Glassmorphism Feature Chips */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs font-extrabold text-slate-200">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-xl shadow-lg">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>0.8s Temassız Okuma</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-xl shadow-lg">
                      <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>PCI-PTS 6.x & GİB Onaylı</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                    <Link
                      href={slide.primaryCtaUrl || '#teklif-al'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-black px-9 py-4.5 rounded-2xl transition-all shadow-2xl shadow-blue-600/40 active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <Shield className="w-4 h-4" />
                      <span>{slide.primaryCtaText || 'Hemen POS Teklifi Al'}</span>
                    </Link>

                    <Link
                      href={slide.secondaryCtaUrl || '/pos-cihazlari'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 text-sm font-extrabold px-8 py-4.5 rounded-2xl backdrop-blur-xl transition-all whitespace-nowrap"
                    >
                      <span>{slide.secondaryCtaText || 'Modeli İncele'}</span>
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Massive Full-Height Perspective POS Image Stage */}
                <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
                  
                  {/* Glowing Backlight Disc */}
                  <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/25 rounded-full blur-[100px] pointer-events-none" />

                  {/* Device Showcase Stage Container */}
                  <div className="relative z-10 w-full flex items-center justify-center">
                    <div className="relative group">
                      
                      {/* Floating Glass Specs Badge */}
                      <div className="absolute -top-4 -right-2 sm:-right-6 z-30 bg-slate-900/90 backdrop-blur-2xl border border-slate-700/80 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 hidden sm:flex">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[11px] font-black text-white block leading-none">{slide.posName}</span>
                          <span className="text-[9px] text-emerald-400 font-bold block mt-0.5">%0.99 Komisyon Oranı</span>
                        </div>
                      </div>

                      {/* Massive Product Image */}
                      <img
                        src={slide.imageUrl}
                        alt={slide.posName}
                        className="w-72 h-80 sm:w-96 sm:h-[420px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Floor Shadow Reflector */}
                      <div className="w-64 h-8 bg-blue-600/30 rounded-full blur-xl mx-auto -mt-6" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Navigation Controls */}
        {activeSlides.length > 1 && (
          <div className="flex items-center justify-between pt-8 border-t border-slate-800/80 relative z-20">
            {/* Slide Name & Counter Indicator */}
            <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
              <span className="text-white font-mono">{currentIndex + 1} / {activeSlides.length}</span>
              <span className="text-slate-600">•</span>
              <span className="text-blue-400 font-extrabold">{activeSlide.posName}</span>
            </div>

            {/* Bullet Indicators */}
            <div className="flex items-center gap-2">
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
                        ? 'w-10 h-2.5 bg-blue-500 shadow-lg shadow-blue-500/50'
                        : 'w-2.5 h-2.5 bg-slate-800 hover:bg-blue-400'
                    }`}
                  />
                );
              })}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 transition-all active:scale-95 cursor-pointer"
                aria-label="Önceki"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextSlide}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 transition-all active:scale-95 cursor-pointer"
                aria-label="Sonraki"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
