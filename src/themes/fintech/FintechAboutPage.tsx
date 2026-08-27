'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import { ShieldCheck, Award, Users, CheckCircle2, TrendingUp } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function FintechAboutPage() {
  const { aboutPage, trustStats, team, settings } = useCMSStore();

  const data = aboutPage || {
    title: 'Hakkımızda',
    subtitle: 'Yeni nesil ödeme teknolojilerinde güven ve inovasyon.',
    heroBadge: 'KURUMSAL PROFİL',
    heroDescription: '2014 yılından bu yana 10.000\'den fazla işletmeye güvenli ödeme çözümleri sunuyoruz.',
    storyTitle: 'Hikayemiz & Büyüme Yolculuğumuz',
    storyContent: '2014 yılından bu yana 10.000\'den fazla işletmeye güvenli ödeme çözümleri sunuyoruz.',
    visionTitle: 'Vizyonumuz',
    visionContent: 'Finansal teknolojilerde lider ve en güvenilir çözüm ortağı olmak.',
    missionTitle: 'Misyonumuz',
    missionContent: 'Türkiye genelinde her ölçekteki işletmenin dijital tahsilat süreçlerini kolaylaştırmak.',
    values: [],
    certifications: []
  };

  return (
    <FintechThemeShell>
      {/* Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>{data.heroBadge || 'Kurumsal Profil'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {data.title || 'Hakkımızda'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-medium">
            {data.heroDescription || data.subtitle}
          </p>
        </div>
      </section>

      {/* Story & Numbers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {data.storyTitle || 'Ödeme Dünyasında Güven ve Uzmanlık'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {data.storyContent}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase">{data.missionTitle || 'Misyonumuz'}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{data.missionContent}</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase">{data.visionTitle || 'Vizyonumuz'}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{data.visionContent}</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
                alt="PAYPOS Ofis"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Stats Bar */}
          {trustStats && trustStats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
              {trustStats.map((st, i) => (
                <div key={i} className="text-center p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-slate-950 font-mono">{st.number}</div>
                  <div className="text-xs font-extrabold text-slate-800">{st.label}</div>
                  <div className="text-[11px] text-slate-500">{st.desc}</div>
                </div>
              ))}
            </div>
          )}

          {/* Team Members */}
          {team && team.length > 0 && (
            <div className="space-y-8 pt-8 border-t border-slate-100">
              <div className="text-center space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  Liderlik ve Yönetim Ekibimiz
                </h3>
                <p className="text-xs text-slate-500">Alanında uzman fintek ve donanım mühendisleri</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((m) => (
                  <div key={m.id} className="bg-slate-50 rounded-3xl p-5 border border-slate-200 text-center space-y-3 group hover:bg-white hover:shadow-xl transition-all">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-slate-950 transition-colors">
                      <img src={resolveImageUrl(m.photo, 'avatar')} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-950">{m.name}</h4>
                      <p className="text-xs text-blue-600 font-bold">{m.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </FintechThemeShell>
  );
}
