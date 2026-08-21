'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useCMSStore } from '@/lib/cms-store';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ServicesPage() {
  const services = useCMSStore((state) => state.services);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Hizmetlerimiz' }]} />

        <section className="bg-slate-50 py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Kurumsal Hizmet Portföyü</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              İşletmeniz İçin <span className="text-gradient-blue">Kapsamlı Ödeme Hizmetleri</span>
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Fiziki POS cihazı tedariğinden 7/24 saha desteğine, QR ödeme entegrasyonundan mobil satış sistemlerine kadar uçtan uca ödeme yönetimi.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all ${
                  idx % 2 === 1 ? 'bg-slate-50/70' : 'bg-white'
                }`}
              >
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                    {service.category}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900">{service.name}</h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{service.fullDesc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-semibold text-slate-700">
                    {service.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      href={`/hizmetler/${service.slug}`}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition-colors shadow-md"
                    >
                      <span>Hizmet Detayı & Başvuru</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 h-64 rounded-2xl overflow-hidden shadow-inner border border-slate-200">
                  <img
                    src={service.images[0]}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
