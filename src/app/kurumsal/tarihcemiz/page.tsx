'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Calendar, Award, Rocket, Globe } from 'lucide-react';

export default function HistoryPage() {
  const timeline = [
    { year: '2018', title: 'PAYPOS Kuruluşu', desc: 'İstanbul Ar-Ge laboratuvarında bulut tabanlı PayOS çekirdeği geliştirilmeye başlandı.' },
    { year: '2020', title: 'İlk 1.000 POS Cihazı Sahada', desc: 'Restoran ve perakende zincirleriyle ilk büyük ölçekli entegrasyon anlaşmaları imzalandı.' },
    { year: '2023', title: 'Smart POS X1 Android Dönüşümü', desc: 'Yeni nesil Android 12 dokunmatik terminals ve 81 ilde 7/24 saha servis ekibi kuruldu.' },
    { year: '2026', title: 'GİB & ÖKC Tam Uyum & Bulut Portal', desc: '10.000+ aktif işletmeye ulaşarak aylık 5 milyon başarılı işlem hacmine erişildi.' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Kurumsal', href: '/kurumsal/hakkimizda' }, { label: 'Tarihçe & Kronoloji' }]} />

        <section className="bg-slate-50 py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Kilometre Taşlarımız</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              PAYPOS <span className="text-gradient-blue">Tarihçesi & Gelişim Serüveni</span>
            </h1>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative border-l-2 border-blue-200 ml-4 space-y-12">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative pl-8 group">
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-600/30">
                    ✓
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm group-hover:border-blue-300 transition-all">
                    <span className="text-sm font-black text-blue-600">{item.year}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
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
