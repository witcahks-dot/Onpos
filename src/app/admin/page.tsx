'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { CreditCard, Sliders, Menu as MenuIcon, Inbox, ArrowRight, Building, Layers, Briefcase, Building2, CheckSquare, FileText, Settings, BookOpen } from 'lucide-react';

export default function AdminDashboardPage() {
  const { products, heroSlides, menu, submissions } = useCMSStore();

  const stats = [
    { title: 'POS Cihazı Ürünleri', count: products.length, href: '/admin/products', icon: CreditCard, color: 'text-blue-600 bg-blue-50' },
    { title: 'Aktif Hero Slaytları', count: heroSlides.filter(s => s.isActive).length, href: '/admin/hero', icon: Sliders, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'Header Menü Öğeleri', count: menu.filter(m => m.isVisible).length, href: '/admin/menu', icon: MenuIcon, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Gelen Teklifler', count: submissions.length, href: '/admin/submissions', icon: Inbox, color: 'text-amber-600 bg-amber-50' },
  ];

  const pageEditors = [
    { label: 'Ana Sayfa Kurumsal Tanıtım Metinleri (/admin/intro)', href: '/admin/intro', icon: BookOpen, desc: 'Ana sayfadaki "Yeni Nesil Ödeme Teknolojilerinde Güvenilir Çözüm Ortağınız" tanıtım metni, slogan ve 4 maddelik listeyi düzenleyin.' },
    { label: 'Hakkımızda Sayfası (/kurumsal/hakkimizda)', href: '/admin/about', icon: Building, desc: 'Bağımsız Hakkımızda sayfasının Tarihçe, Vizyon, Misyon ve Değerlerini düzenleyin.' },
    { label: 'POS Cihazları Kataloğu (/pos-cihazlari)', href: '/admin/products', icon: CreditCard, desc: 'POS cihazlarını, fiyatları ve teknik detayları ekleyin/düzenleyin.' },
    { label: 'Hizmetlerimiz Sayfası (/hizmetler)', href: '/admin/services', icon: Layers, desc: 'Kurumsal fiziki ve sanal ödeme hizmetlerini düzenleyin.' },
    { label: 'Sektörel Çözümler (/cozumler)', href: '/admin/solutions', icon: Briefcase, desc: 'Restoran, Mağaza ve Saha sektörel çözümlerini düzenleyin.' },
    { label: 'Referanslar & Harita (/kurumsal/referanslar)', href: '/admin/references', icon: Building2, desc: '81 il ve ilçe bazlı üye işletme referanslarını ve haritayı yönetin.' },
    { label: 'Projelerimiz (/projeler)', href: '/admin/projects', icon: CheckSquare, desc: 'Tamamlanan kurumsal projeleri ve vaka analizlerini düzenleyin.' },
    { label: 'Dinamik Sayfalar & Şablonlar (/sayfa/[slug])', href: '/admin/pages', icon: FileText, desc: 'Yeni özel kurumsal sayfalar ve şablonlar oluşturun.' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Yönetim Paneli Genel Özet</h1>
        <p className="text-xs text-slate-500 mt-1">
          Ana sayfa bölümlerini ve her bir bağımsız alt sayfayı ayrı ayrı yönetin.
        </p>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <div>
                <span className="text-3xl font-black text-slate-900 block">{item.count}</span>
                <span className="text-xs font-bold text-slate-600 mt-1 block">{item.title}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Dedicated Page-Specific Management Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900">Sayfa Özelinde İçerik Düzenleme Alanları</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ana sayfa ile bağımsız alt sayfalar birbirine karışmadan her sayfayı kendi özel panelinden yönetebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {pageEditors.map((page, idx) => {
            const Icon = page.icon;
            return (
              <Link
                key={idx}
                href={page.href}
                className="bg-slate-50 hover:bg-blue-50/60 p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white text-blue-600 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-xs group-hover:text-blue-600 transition-colors">
                  {page.label}
                </h4>
                <p className="text-[11px] text-slate-500 leading-normal">{page.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Submissions Overview */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">Son Gelen Teklif Talepleri</h3>
          <Link href="/admin/submissions" className="text-xs font-bold text-blue-600 hover:underline">
            Tümünü Yönet →
          </Link>
        </div>

        {submissions.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">Henüz gelen teklif talebi bulunmuyor.</p>
        ) : (
          <div className="space-y-3">
            {submissions.slice(0, 3).map((sub) => (
              <div key={sub.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{sub.fullName} — {sub.company || 'Bireysel'}</h4>
                  <p className="text-slate-500 mt-0.5">{sub.phone} | {sub.email} | {sub.selectedProduct || 'Genel Teklif'}</p>
                </div>
                <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-[11px]">
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
