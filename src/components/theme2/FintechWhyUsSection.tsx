'use client';

import React from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Plus, ShieldCheck, Zap, Headphones, RefreshCw } from 'lucide-react';

export default function FintechWhyUsSection() {
  const { whyUs } = useCMSStore();

  const defaultWhyUs = [
    { id: 'w1', num: '01', title: '24 Saatte Hızlı Kurum & Teslimat', desc: 'Başvurunuz onaylandığı gün cihazınız adresinize kurulu ve çalışmaya hazır şekilde ulaştırılır.', order: 1 },
    { id: 'w2', num: '02', title: '7/24 Kesintisiz Saha Servisi', desc: 'Olası arıza durumlarında 2 saat içinde ikame cihaz ve yerinde uzman teknisyen desteği.', order: 2 },
    { id: 'w3', num: '03', title: 'En Düşük Komisyon Garantisi', desc: 'Tüm bankalar ve ödeme kuruluşlarıyla entegre %0.99\'dan başlayan avantajlı oranlar.', order: 3 },
    { id: 'w4', num: '04', title: 'GİB ve BDDK Tam Uyum', desc: 'Yeni nesil e-Fatura, e-Arşiv ve mali mevzuata %100 uyumlu lisanslı altyapı.', order: 4 },
  ];

  const items = whyUs && whyUs.length > 0 ? whyUs : defaultWhyUs;

  return (
    <section className="py-20 sm:py-28 bg-[#fbfbfe] border-b border-slate-100/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
              <Plus className="w-3 h-3 stroke-[2.5]" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
              NEDEN BİZİ TERCİH ETMELİSİNİZ?
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            İşletmenizi Büyüten <span className="text-slate-900">Ayrıcalıklar.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            10.000+ üye işyeri arasına katılarak ödeme süreçlerinizde hız, tasarruf ve güven kazanın.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-[28px] p-7 border border-slate-200/80 hover:border-slate-400/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                0{idx + 1}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
