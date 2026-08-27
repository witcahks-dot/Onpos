'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function FintechMetricsSection() {
  const { trustStats, cloudPanel } = useCMSStore();

  const stat1 = trustStats?.[0] || { number: '50K+', label: 'Yıllık İşlem Adedi', desc: 'Son bir yılda 263 binden fazla güvenli ödeme işlemi.' };
  const stat2 = trustStats?.[1] || { number: '10,000+', label: 'Aktif Üye İşyeri', desc: '81 ilde 7/24 kesintisiz çalışan POS ağı.' };

  return (
    <section className="bg-white py-20 border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Visual with Balance Overlay Card */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-8 bg-slate-900 border border-slate-800">
            
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
              alt="PAYPOS Kullanıcısı"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Balance Card Overlay (Matching reference image) */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/60 shadow-xl max-w-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">Günlük Ciro</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">Bugün</span>
              </div>

              <div className="text-xl font-black text-slate-950">
                ₺ 15,560.00
              </div>

              {/* Sparkline curve with badge */}
              <div className="relative pt-1">
                <svg className="w-full h-10 text-slate-950" viewBox="0 0 120 30" fill="none">
                  <path
                    d="M0 25 Q 30 5, 60 20 T 120 10"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
                <div className="absolute right-6 top-0 bg-slate-950 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow">
                  1,500 ₺
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Two Grid Metric Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
            
            {/* Card 1: Black Card with Emblem & Arrow */}
            <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between flex-1 relative group">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                </div>
                <Link
                  href="/referanslar"
                  className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors text-white"
                  aria-label="Referanslara git"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="pt-8 space-y-1">
                <div className="text-4xl sm:text-5xl font-black tracking-tight">{stat1.number}</div>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">{stat1.desc}</p>
              </div>
            </div>

            {/* Card 2: Light Gray Card */}
            <div className="bg-slate-100 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-between flex-1">
              <div className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                {stat2.number}
              </div>
              <div className="pt-4">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">{stat2.label}</h4>
                <p className="text-xs text-slate-500 mt-1 font-medium">{stat2.desc}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
