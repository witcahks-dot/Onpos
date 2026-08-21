'use client';

import React from 'react';
import { Cloud, CheckCircle, TrendingUp, ShieldCheck, Activity, Smartphone } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function TechnologyDashboardSection() {
  const cloudPanel = useCMSStore((state) => state.cloudPanel);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Cloud className="w-3.5 h-3.5" />
              <span>{cloudPanel?.badge || 'Bulut PayOS Altyapısı'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {cloudPanel?.title || 'Tüm POS cihazlarınızı tek panellerden canlı yönetin.'}
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed">
              {cloudPanel?.description}
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Anlık ciro ve şube bazlı işlem hareketleri</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Tek tıkla uzaktan yazılım ve menü güncelleme</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Otomatik gün sonu ve e-Fatura raporlama</span>
              </div>
            </div>
          </div>

          {/* Right Live UI Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/50 backdrop-blur-xl">
              {/* Top Bar Mock */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">PayOS Enterprise Portal v4.2</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Canlı Bağlantı</span>
                </div>
              </div>

              {/* Stats Mock Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50">
                  <span className="text-[11px] text-slate-400 font-semibold block">Bugün Ciro</span>
                  <span className="text-xl font-bold text-white mt-1 block">{cloudPanel?.todayRevenue || '482.950 ₺'}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{cloudPanel?.todayGrowth || '↑ %14 artış'}</span>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50">
                  <span className="text-[11px] text-slate-400 font-semibold block">Aktif Cihazlar</span>
                  <span className="text-xl font-bold text-white mt-1 block">{cloudPanel?.activeDevicesCount || '128 / 128'}</span>
                  <span className="text-[10px] text-blue-400 font-bold">Tümü Online</span>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50">
                  <span className="text-[11px] text-slate-400 font-semibold block">Uptime</span>
                  <span className="text-xl font-bold text-white mt-1 block">{cloudPanel?.uptimePercent || '%100'}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Kesintisiz</span>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50">
                  <span className="text-[11px] text-slate-400 font-semibold block">İşlem Hızı</span>
                  <span className="text-xl font-bold text-white mt-1 block">{cloudPanel?.txSpeed || '0.4 Sn'}</span>
                  <span className="text-[10px] text-sky-400 font-bold">Ultra Hızlı</span>
                </div>
              </div>

              {/* Transaction Stream Mock */}
              <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-700/40 space-y-3">
                <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
                  <span>Son Başarılı Kart İşlemleri</span>
                  <span className="text-[10px] text-slate-500 font-normal">Canlı Akış</span>
                </div>
                
                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <div>
                      <span className="font-bold text-white block">Smart POS X1 (#1042)</span>
                      <span className="text-[10px] text-slate-500">Kanyon Mağazası • Temassız NFC</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">+1.450,00 ₺</span>
                </div>

                <div className="flex items-center justify-between text-xs py-2">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-indigo-400" />
                    <div>
                      <span className="font-bold text-white block">Pocket POS M3 (#802)</span>
                      <span className="text-[10px] text-slate-500">Saha Kurye #4 • Chip & PIN</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">+385,50 ₺</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
