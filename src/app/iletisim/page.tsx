'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import { useCMSStore } from '@/lib/cms-store';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const settings = useCMSStore((state) => state.settings);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'İletişim' }]} />

        {/* Hero */}
        <section className="bg-slate-50 py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block font-mono">Bize Ulaşın</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              İletişim ve <span className="text-gradient-blue">Destek Merkezimiz</span>
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              PAYPOS uzmanları 7/24 sorularınızı yanıtlamaya hazırdır. Adres, telefon veya formu doldurarak bize anında ulaşabilirsiniz.
            </p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Telefon</h3>
                <p className="text-xs text-slate-500 font-semibold">{settings.phoneFormatted}</p>
                <p className="text-[11px] text-slate-400">7/24 Müşteri Hizmetleri</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">E-Posta</h3>
                <p className="text-xs text-slate-500 font-semibold">{settings.email}</p>
                <p className="text-[11px] text-slate-400">Genel & Destek Talepleri</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Adres</h3>
                <p className="text-xs text-slate-500">{settings.address}</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Çalışma Saatleri</h3>
                <p className="text-xs text-slate-500">{settings.workingHours}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Map Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-100 rounded-3xl overflow-hidden shadow-inner h-80 border border-slate-200 flex items-center justify-center text-slate-400 text-sm font-semibold">
              <div className="text-center space-y-2">
                <MapPin className="w-8 h-8 text-blue-600 mx-auto" />
                <p className="text-slate-700 font-bold">{settings.siteName} Genel Merkez Haritası</p>
                <p className="text-xs text-slate-500">{settings.address}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Quote Form */}
        <QuoteFormSection />
      </main>

      <Footer />
    </div>
  );
}
