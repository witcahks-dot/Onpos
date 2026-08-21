'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, Check, Lock, Smartphone } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function CorporateIntro() {
  const corporateIntro = useCMSStore((state) => state.corporateIntro);

  return (
    <section className="theme-section-py bg-white border-b border-slate-100 selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Short, Punchy Editorial Content */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 bg-theme-primary-light text-theme-primary px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-theme-primary-light shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
              <span>{corporateIntro?.badge || 'YAZARKASA SATIŞI & TEKNİK SERVİS'}</span>
            </div>

            {/* Concise Title */}
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {corporateIntro?.title || 'Yeni Nesil Ödeme Teknolojileri.'}
            </h2>

            {/* Short Paragraph */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {corporateIntro?.description || 'Hugin, Ingenico, Paygo, Inpos ve Beko yetkili satış ve teknik servisi olarak 81 ilde işletmenizin yanındayız.'}
            </p>

            {/* Compact Bullet Points (2-Col Grid) */}
            <div className="grid grid-cols-1 gap-2.5 pt-1 text-xs text-slate-800 font-extrabold">
              {(corporateIntro?.bulletPoints || []).slice(0, 3).map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/kurumsal/hakkimizda"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-theme-primary text-white text-xs font-black px-6 py-3.5 rounded-2xl transition-all shadow-md active:scale-95 whitespace-nowrap"
              >
                <span>Kurumsal Detaylar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* Right Column: LARGE DOMINANT VISUAL SHOWCASE CARD (8 COLUMNS) */}
          <div className="lg:col-span-8 relative">
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 group h-[440px] sm:h-[500px] bg-slate-950">
              
              {/* High-Res Dominant Image */}
              <img
                src={corporateIntro?.imageUrl || '/images/corporate-intro-demo.jpg'}
                alt={corporateIntro?.imageTitle || 'PAYPOS Akıllı Donanım'}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/corporate-intro-demo.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />

              {/* Dark Gradient Vignette for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white" />

              {/* FLOATING GLASSMAPPING METRIC BADGES ON IMAGE */}
              
              {/* Top-Right Badge: Feature 1 */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-xl border border-white/80 p-4 rounded-2xl shadow-2xl text-slate-900 max-w-[210px] hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-theme-primary text-white flex items-center justify-center font-black shrink-0 shadow-md">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black leading-tight text-slate-900">
                    {corporateIntro?.card1Title || 'Ultra Hızlı İşlem'}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bold mt-0.5 leading-tight">
                    {corporateIntro?.card1Desc || 'Milisaniyeler içinde ödeme.'}
                  </p>
                </div>
              </div>

              {/* Bottom-Right Badge: Feature 2 */}
              <div className="absolute bottom-24 right-4 sm:bottom-6 sm:right-6 z-10 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl shadow-2xl text-white max-w-[220px] hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black leading-tight text-white">
                    {corporateIntro?.card2Title || '%100 Güvenli Altyapı'}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-tight">
                    {corporateIntro?.card2Desc || 'Uçtan uca P2PE şifreleme.'}
                  </p>
                </div>
              </div>

              {/* Bottom Left Main Image Text Overlay */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto z-10 space-y-1.5 max-w-lg">
                <span className="text-[10px] font-black uppercase tracking-wider bg-theme-primary text-white px-3.5 py-1 rounded-full inline-block shadow-md">
                  {corporateIntro?.imageBadge || 'BDDK & PCI-PTS 6.X'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                  {corporateIntro?.imageTitle || 'Saha & Restoran Kullanımına Tam Uyumlu'}
                </h3>
                <p className="text-xs text-slate-300 font-medium line-clamp-2">
                  {corporateIntro?.imageDesc || 'Yüksek kaliteli termal yazıcı ve dokunmatik cam ekran ile kesintisiz satış.'}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
