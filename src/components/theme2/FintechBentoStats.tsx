'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function FintechBentoStats() {
  const { trustStats } = useCMSStore();

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Left Tall Lifestyle Visual with Floating Balance Card */}
          <div className="lg:col-span-6 relative rounded-[32px] overflow-hidden min-h-[440px] sm:min-h-[500px] border border-slate-200/90 shadow-xl group">
            {/* Background Lifestyle Image */}
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
              alt="Merchant Transaction Success"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            {/* Floating Glass Balance Card Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl border border-white/80 p-5 rounded-2xl shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Günlük Ciro Bakiyesi</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    ₺ 15,560.00
                  </div>
                </div>
                <div className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-extrabold px-3 py-1 rounded-full">
                  Ekim - Şubat ▼
                </div>
              </div>

              {/* Dynamic Wave Chart SVG with 1500 Node Badge */}
              <div className="relative pt-2">
                <svg className="w-full h-12 stroke-slate-900 fill-none" viewBox="0 0 200 40">
                  <path
                    d="M 0,35 Q 40,5 80,25 T 140,10 T 200,30"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                {/* 1500 Node Circle */}
                <div className="absolute top-1 left-1/3 bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md">
                  1500+ İşlem
                </div>
              </div>
            </div>

          </div>

          {/* Card 2 & 3: Right Column Stack */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            
            {/* Card 2: Dark 50K Bento Card */}
            <div className="bg-[#111827] text-white rounded-[32px] p-8 sm:p-10 flex flex-col justify-between min-h-[230px] sm:min-h-[240px] shadow-2xl relative overflow-hidden group">
              
              {/* Geometric Icon + Arrow Button */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border border-slate-400" />
                </div>
                
                <Link
                  href="/pos-cihazlari"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-all"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Stat Typography */}
              <div className="space-y-1 pt-6">
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  50K+
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  263 Contributions in the last year • 10.000+ Aktif İşletme
                </p>
              </div>

            </div>

            {/* Card 3: Light 70,000+ Clients Bento Card */}
            <div className="bg-[#f3f4f8] text-slate-900 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between min-h-[230px] sm:min-h-[240px] border border-slate-200/80 shadow-md">
              
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1 rounded-full text-xs font-bold text-slate-700 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Kesintisiz Ödeme Ağı</span>
                </div>
              </div>

              {/* Stat Typography */}
              <div className="space-y-1 pt-6">
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
                  70,000+
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Clients & Active Merchants in 81 Cities across Turkey.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
