'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import QuoteModal from '@/components/ui/QuoteModal';
import { useCMSStore } from '@/lib/cms-store';
import { CheckCircle2, ShieldCheck, ArrowRight, Headphones, Phone } from 'lucide-react';

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { services, settings } = useCMSStore();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const service = services.find(s => s.slug === resolvedParams.slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Header />
        <div className="py-20 text-center space-y-4">
          <h2 className="text-2xl font-bold">Hizmet bulunamadı.</h2>
          <Link href="/hizmetler" className="bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl">Hizmetlere Dön</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Hizmetlerimiz', href: '/hizmetler' }, { label: service.name }]} />

        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/60 inline-block mb-2">
                {service.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">{service.name}</h1>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-medium">{service.fullDesc}</p>
            </div>

            {service.images[0] && (
              <div className="rounded-3xl overflow-hidden shadow-md h-80 border border-slate-200/90">
                <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-4">
                <h3 className="text-base font-extrabold text-slate-900">Öne Çıkan Hizmet Özellikleri</h3>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50/60 p-6 sm:p-8 rounded-3xl border border-blue-100/90 space-y-4">
                <h3 className="text-base font-extrabold text-slate-900">İşletmenize Sağlayacağı Avantajlar</h3>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  {service.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-xl font-black text-white">Bu Hizmetten Faydalanmak İster misiniz?</h3>
                <p className="text-xs text-slate-400 font-medium">Hemen teklif isteyin veya yetkili destek ekibimizle görüşün.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-7 py-3.5 rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap"
                >
                  Hemen Başvur & Teklif Al
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultService={service.name}
      />

      <Footer />
    </div>
  );
}
