'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { ChevronRight, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import QuoteModal from '@/components/ui/QuoteModal';

export default function FintechFrictionlessSection() {
  const { settings, services } = useCMSStore();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <section className="bg-white py-20 border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Value List */}
          <div className="lg:col-span-6 space-y-6 max-w-xl">
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Power Your Sales With Frictionless Payments
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              Deliver A Frictionless Buying Experience With Secure, Responsive, And Fully Integrated Payment Tools.
            </p>

            <div className="space-y-3 pt-2 text-sm font-extrabold text-slate-900">
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-slate-950 shrink-0" />
                <span>Gerçek Zamanlı Ödeme Takibi (Real-Time Payment Tracking)</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-slate-950 shrink-0" />
                <span>Hızlı, Güvenli ve Temassız Tahsilat (Accept Payments Quickly)</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-slate-950 shrink-0" />
                <span>Platformunuza Zahmetsiz Entegrasyon (Effortless Integration)</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold px-8 py-3.5 rounded-full transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Hemen Başvurun</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual with Card & Pill */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* Halo Backdrop */}
            <div className="absolute inset-0 bg-emerald-50/70 rounded-full blur-3xl -z-10 scale-95" />

            <div className="relative w-full max-w-md bg-gradient-to-tr from-slate-100 to-slate-200/50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl flex flex-col items-center">
              
              {/* Photo of person holding phone/card */}
              <div className="w-full flex items-center justify-center py-2">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
                  alt="Mobil Ödeme Deneyimi"
                  className="max-h-80 sm:max-h-96 object-cover rounded-2xl shadow-lg border border-slate-200"
                />
              </div>

              {/* Floating Pill Card: "$50.8K (24.6%)" */}
              <div className="absolute -bottom-4 -left-4 sm:left-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 backdrop-blur-md">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Günlük Hacim</span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-slate-950">₺ 50,840</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                      +24.6% ↗
                    </span>
                  </div>
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
