'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Briefcase, Send, CheckCircle2, MapPin, Clock } from 'lucide-react';

export default function CareersPage() {
  const jobs = [
    { id: 'j1', title: 'Senior Android POS Geliştirici', dept: 'Yazılım & Ar-Ge', loc: 'İstanbul (Levent)', type: 'Tam Zamanlı' },
    { id: 'j2', title: 'Saha Destek & Kurulum Uzmanı', dept: 'Operasyon', loc: 'Ankara / İzmir', type: 'Saha' },
    { id: 'j3', title: 'Fintech Ürün Yöneticisi (Product Manager)', dept: 'Ürün Yönetimi', loc: 'İstanbul (Hibrit)', type: 'Tam Zamanlı' },
  ];

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Kurumsal', href: '/kurumsal/hakkimizda' }, { label: 'Kariyer' }]} />

        <section className="bg-white py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Ekibimize Katılın</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Geleceğin Ödeme Teknolojilerini <span className="text-gradient-blue">Birlikte İnşa Edelim</span>
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Yenilikçi, dinamik ve hızla büyüyen fintech ekibimizde yerinizi alın. Açık pozisyonları inceleyin ve hemen CV'nizi gönderin.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Open Positions List */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Açık Pozisyonlar</h2>
              {jobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{job.dept}</span>
                    <span className="text-xs text-slate-400 font-semibold">{job.type}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{job.loc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Application Form */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl h-fit">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Genel Başvuru Formu</h3>
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Başvurunuz Alındı!</h4>
                  <p className="text-xs text-slate-500">İnsan kaynakları ekibimiz CV'nizi inceleyerek en kısa sürede dönüş yapacaktır.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Ad Soyad *</label>
                    <input type="text" required placeholder="Adınız ve Soyadınız" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">E-Posta *</label>
                    <input type="email" required placeholder="ornek@email.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Telefon *</label>
                    <input type="tel" required placeholder="05XX XXX XX XX" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pozisyon Seçimi</label>
                    <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <option>Genel Başvuru</option>
                      {jobs.map(j => (
                        <option key={j.id}>{j.title}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md">
                    Başvuruyu Gönder
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
