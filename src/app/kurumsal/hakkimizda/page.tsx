'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import TrustStats from '@/components/home/TrustStats';
import { ShieldCheck, Award, Target, Eye, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';
import Link from 'next/link';

export default function AboutPage() {
  const { aboutPage } = useCMSStore();

  const data = aboutPage || {
    title: 'Ödeme Teknolojilerinde Güvenli Gelecek',
    subtitle: 'PAYPOS Kurumsal Profil & Şirket Bilgileri',
    heroBadge: 'KURUMSAL PROFİL',
    heroDescription: 'PAYPOS Ödeme Teknolojileri A.Ş., Türkiye genelindeki 10.000+ üye iş yerinin tahsilat süreçlerini en yeni Android ve PCI-PTS standartlı POS donanımlarıyla güvene almaktadır.',
    storyTitle: 'Hikayemiz & Büyüme Yolculuğumuz',
    storyContent: '2018 yılında kurulan şirketimiz, hantal geleneksel POS sistemlerinin yerine yüksek hızlı, bulut tabanlı ve Android işletim sistemli akıllı ödeme terminallerini getirmeyi misyon edinmiştir. Bugün 81 ilde aktif hizmet veren 200+ kişilik uzman kadromuzla işletmelerin nakit akışını ve ciro güvenliğini 7/24 sağlama alıyoruz.',
    visionTitle: 'Vizyonumuz',
    visionContent: 'Türkiye ve bölge coğrafyasında her ölçekteki işletmenin ilk tercihi olan, en inovatif ve güvenilir ödeme teknolojileri ekosistemi olmak.',
    missionTitle: 'Misyonumuz',
    missionContent: 'İşletmelerin finansal tahsilat süreçlerindeki karmakarışık komisyon ve donanım engellerini ortadan kaldırarak şeffaf, anlık ve yüksek hızlı ödeme çözümleri sunmak.',
    values: [
      { title: 'Mutlak Güvenlik', desc: 'BDDK, EMV L1/L2 ve PCI-PTS 6.x uluslararası yüksek güvenlik standartları.' },
      { title: 'Saha Kesintisizliği', desc: '7/24 aktif çağrı merkezi ve 2 saatte yerinde ikame donanım garantisi.' },
      { title: 'Şeffaf Finansman', desc: 'Gizli masrafsız esnek komisyon oranları ve ertesi iş günü hesaba geçiş.' },
      { title: 'İnovatif Donanım', desc: 'Android işletim sistemli, dokunmatik ekranlı ve entegre adisyon yazılımları.' }
    ],
    certifications: [
      { title: 'BDDK Lisanslı Ödeme Hizmetleri', issuer: 'Bankacılık Düzenleme ve Denetleme Kurumu', badge: 'RESMİ ONAYLI' },
      { title: 'PCI-PTS 6.x Sertifikasyon', issuer: 'Payment Card Industry Security Standards Council', badge: 'ULUSLARARASI' },
      { title: 'EMV Level 1 & Level 2 Uyum', issuer: 'EMVCo Global Security', badge: 'TAM UYUM' },
      { title: 'ISO 27001 Bilgi Güvenliği', issuer: 'International Organization for Standardization', badge: 'KALİTE GÜVENCE' }
    ]
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Kurumsal', href: '/kurumsal/hakkimizda' }, { label: 'Hakkımızda' }]} />

        {/* Hero Banner Section */}
        <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center max-w-3xl">
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full inline-block">
              {data.heroBadge || 'KURUMSAL PROFİL'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {data.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {data.heroDescription}
            </p>
          </div>
        </section>

        {/* Corporate Story & Vision/Mission Grid */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Story Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  TARİHÇE & HİKAYEMİZ
                </span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  {data.storyTitle || 'Hikayemiz & Büyüme Yolculuğumuz'}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {data.storyContent}
                </p>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/pos-cihazlari"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>POS Cihazlarını İncele</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/kurumsal/referanslar"
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2"
                  >
                    <span>Referanslarımızı Gör</span>
                  </Link>
                </div>
              </div>

              {/* Vision & Mission Cards */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
                  <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-blue-400" />
                    <h3 className="text-lg font-black">{data.visionTitle || 'Vizyonumuz'}</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {data.visionContent}
                  </p>
                </div>

                <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-200" />
                    <h3 className="text-lg font-black">{data.missionTitle || 'Misyonumuz'}</h3>
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed font-medium">
                    {data.missionContent}
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values Grid */}
            <div className="space-y-8 pt-8 border-t border-slate-100">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Temel Kurumsal Değerlerimiz</h3>
                <p className="text-xs text-slate-500 font-medium">İşletmelerimize sunduğumuz hizmetin temel direkleri.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(data.values || []).map((val, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3 hover:shadow-lg transition-all">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-black">
                      0{idx + 1}
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{val.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Compliance */}
            <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-black text-blue-400 uppercase tracking-widest">GÜVENLİK & LİSANS</span>
                  <h3 className="text-2xl font-black mt-1">Uluslararası Uyumluluk & Sertifikalar</h3>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-300">BDDK & PCI-PTS 6.x Lisanslı</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(data.certifications || []).map((cert, idx) => (
                  <div key={idx} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-2">
                    <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full uppercase inline-block">
                      {cert.badge}
                    </span>
                    <h4 className="font-bold text-xs text-white leading-tight">{cert.title}</h4>
                    <p className="text-[11px] text-slate-400">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Global Trust Stats */}
        <TrustStats />
      </main>

      <Footer />
    </div>
  );
}
