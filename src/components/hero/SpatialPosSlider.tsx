'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Shield, ArrowRight, Sparkles, CheckCircle2, Zap, Lock, Wifi } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function SpatialPosSlider() {
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
      className="relative bg-white overflow-hidden theme-section-py border-b border-slate-100 selection:bg-blue-600 selection:text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Glowing Ambient Halo Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-theme-primary-light rounded-full blur-[120px] pointer-events-none opacity-60 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Typography & Quick Spec Pills (Fixed Height Layered Stage) */}
          <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[340px] flex items-center justify-center lg:justify-start">
            {activeSlides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex flex-col justify-center space-y-5 text-center lg:text-left transition-all duration-500 ease-in-out ${
                    isActive
                      ? 'opacity-100 z-10 translate-y-0 pointer-events-auto'
                      : 'opacity-0 z-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  {/* Glowing Eyebrow Badge */}
                  <div>
                    <div className="inline-flex items-center gap-2 bg-theme-primary-light text-theme-primary border border-theme-primary-light px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
                      <span>{slide.badge || 'AKILLI ÖDEME TEKNOLOJİSİ'}</span>
                    </div>
                  </div>

                  {/* High-Impact Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
                    {slide.title.split(' ')[0]} <br />
                    <span className="text-gradient-theme">
                      {slide.title.split(' ').slice(1).join(' ')}
                    </span>
                  </h1>

                  {/* Concise Description */}
                  <p className="text-base text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 line-clamp-2">
                    {slide.description}
                  </p>

                  {/* Visual Spec Badges */}
                  <div className="flex flex-wrap gap-3 pt-1 text-xs font-extrabold text-slate-800 justify-center lg:justify-start">
                    <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>%0.99'dan Başlayan Oranlar</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>24 Saatte Adrese Teslim</span>
                    </div>
                  </div>

                  {/* Call to Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 justify-center lg:justify-start">
                    <Link
                      href={slide.primaryCtaUrl || '#teklif-al'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-theme-primary hover:opacity-90 text-white text-sm font-extrabold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-theme-primary active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <Shield className="w-4 h-4" />
                      <span>{slide.primaryCtaText || 'Hemen POS Teklifi Al'}</span>
                    </Link>

                    <Link
                      href={slide.secondaryCtaUrl || '/pos-cihazlari'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-900 border border-slate-200 text-sm font-extrabold px-7 py-4 rounded-2xl transition-all whitespace-nowrap"
                    >
                      <span>{slide.secondaryCtaText || 'Tüm Modelleri İncele'}</span>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: 3D Spatial Device Showcase with Floating Badges */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] flex items-center justify-center overflow-hidden">
            
            {/* Top-Left Floating Badge */}
            <div className="absolute top-2 left-2 sm:left-6 z-30 bg-white/90 backdrop-blur-xl border border-white/80 p-3.5 rounded-2xl shadow-xl shadow-slate-900/10 flex items-center gap-3 hidden sm:flex animate-bounce-slow">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-black text-slate-900 block leading-tight">0.8 Saniye İşlem</span>
                <span className="text-[9px] text-emerald-600 font-bold block">Temassız Kart Okuma</span>
              </div>
            </div>

            {/* Bottom-Right Floating Badge */}
            <div className="absolute bottom-4 right-2 sm:right-6 z-30 bg-white/90 backdrop-blur-xl border border-white/80 p-3.5 rounded-2xl shadow-xl shadow-slate-900/10 flex items-center gap-3 hidden sm:flex animate-bounce-slow">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                <Lock className="w-5 h-5 text-theme-primary" />
              </div>
              <div>
                <span className="text-[11px] font-black text-slate-900 block leading-tight">BDDK & GİB Onaylı</span>
                <span className="text-[9px] text-slate-500 font-bold block">PCI-PTS 6.x Güvenlik</span>
              </div>
            </div>

            {/* Center Stage Cards Layer */}
            <div className="relative w-full max-w-lg h-full flex items-center justify-center">
              {activeSlides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                const prevIdx = (idx - 1 + activeSlides.length) % activeSlides.length;
                const nextIdx = (idx + 1) % activeSlides.length;
                const leftSlide = activeSlides[prevIdx];
                const rightSlide = activeSlides[nextIdx];

                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                      isActive
                        ? 'opacity-100 z-20 scale-100 pointer-events-auto'
                        : 'opacity-0 z-0 scale-95 pointer-events-none'
                    }`}
                  >
                    {/* Left Preview Device */}
                    {activeSlides.length > 1 && (
                      <div
                        onClick={prevSlide}
                        className="absolute left-2 cursor-pointer z-10 hidden sm:block opacity-40 hover:opacity-80 transition-opacity -translate-x-12 scale-85"
                      >
                        <div className="w-44 h-60 bg-slate-50 p-4 rounded-3xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-lg">
                          <img
                            src={leftSlide.imageUrl}
                            alt={leftSlide.posName}
                            className="w-32 h-40 object-contain"
                          />
                          <span className="text-xs font-bold text-slate-700 mt-2 truncate w-full px-2">
                            {leftSlide.posName}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Active Center Device Card */}
                    <div className="w-72 sm:w-80 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xl flex flex-col items-center justify-between text-center relative overflow-hidden group">
                      <div className="absolute top-4 left-4 bg-theme-primary-light text-theme-primary border border-theme-primary-light text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                        {slide.posName}
                      </div>

                      <div className="py-6 my-2">
                        <img
                          src={slide.imageUrl}
                          alt={slide.posName}
                          className="w-56 h-64 sm:h-72 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 font-extrabold">
                        <span className="flex items-center gap-1">
                          <Wifi className="w-3.5 h-3.5 text-theme-primary" />
                          <span>Dual SIM + Wi-Fi</span>
                        </span>
                        <span className="text-theme-primary font-black">%100 Temassız</span>
                      </div>
                    </div>

                    {/* Right Preview Device */}
                    {activeSlides.length > 1 && (
                      <div
                        onClick={nextSlide}
                        className="absolute right-2 cursor-pointer z-10 hidden sm:block opacity-40 hover:opacity-80 transition-opacity translate-x-12 scale-85"
                      >
                        <div className="w-44 h-60 bg-slate-50 p-4 rounded-3xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-lg">
                          <img
                            src={rightSlide.imageUrl}
                            alt={rightSlide.posName}
                            className="w-36 h-40 object-contain"
                          />
                          <span className="text-xs font-bold text-slate-700 mt-2 truncate w-full px-2">
                            {rightSlide.posName}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrow Buttons */}
            {activeSlides.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-1 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 shadow-xl border border-slate-200 transition-all active:scale-95 cursor-pointer"
                  aria-label="Önceki"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-1 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 shadow-xl border border-slate-200 transition-all active:scale-95 cursor-pointer"
                  aria-label="Sonraki"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

          </div>
        </div>

        {/* Modern Bullet Dots Pagination */}
        {activeSlides.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 mt-10">
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
                      ? 'w-9 h-3 bg-blue-600 shadow-md shadow-blue-600/40'
                      : 'w-3 h-3 bg-slate-300 hover:bg-blue-400 hover:scale-110'
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
