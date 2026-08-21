'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useCMSStore } from '@/lib/cms-store';
import { MapPin, Phone, Mail, Clock, Filter } from 'lucide-react';

export default function DealersPage() {
  const dealers = useCMSStore((state) => state.dealers);
  const [selectedCity, setSelectedCity] = useState('Hepsi');

  const cities = ['Hepsi', ...Array.from(new Set(dealers.map(d => d.city)))];

  const filtered = selectedCity === 'Hepsi'
    ? dealers
    : dealers.filter(d => d.city === selectedCity);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Kurumsal', href: '/kurumsal/hakkimizda' }, { label: 'Bayilerimiz & Şubeler' }]} />

        <section className="bg-white py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Saha Ağı</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Bölge Müdürlükleri ve <span className="text-gradient-blue">Saha Şubelerimiz</span>
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Türkiye genelinde 81 ilde hizmet veren teknik servis ve bayi noktalarımız. Şehrinizi seçerek size en yakın bölge temsilciliğine ulaşın.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Şehir Seçin:
              </span>
              {cities.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCity === c
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.map((d) => (
                <div key={d.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{d.region}</span>
                    <span className="text-xs font-bold text-slate-400">{d.city}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{d.title}</h3>
                  <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{d.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{d.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{d.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{d.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
