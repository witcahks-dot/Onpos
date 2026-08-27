'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function FintechFooter() {
  const { settings, footerConfig } = useCMSStore();
  const [touchEmail, setTouchEmail] = useState('');
  const [touchSent, setTouchSent] = useState(false);

  const handleTouchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!touchEmail) return;
    setTouchSent(true);
    setTimeout(() => setTouchSent(false), 4000);
    setTouchEmail('');
  };

  const col1Links = footerConfig?.col1Links && footerConfig.col1Links.length > 0
    ? footerConfig.col1Links
    : [
        { id: 'c1', label: 'Our Agents', href: '/kurumsal/bayiler' },
        { id: 'c2', label: 'Member Stories', href: '/referanslar' },
        { id: 'c3', label: 'POS Cihazları', href: '/pos-cihazlari' },
        { id: 'c4', label: 'Free trial & Teklif', href: '#teklif-al' },
      ];

  const col2Links = footerConfig?.col2Links && footerConfig.col2Links.length > 0
    ? footerConfig.col2Links
    : [
        { id: 'c5', label: 'Partnerships', href: '/kurumsal/bayiler' },
        { id: 'c6', label: 'Terms of use', href: '/kurumsal/kullanim-kosullari' },
        { id: 'c7', label: 'Privacy', href: '/kurumsal/gizlilik' },
        { id: 'c8', label: 'KVKK Aydınlatma', href: '/kurumsal/kvkk' },
      ];

  return (
    <footer className="w-full bg-[#fbfbfe] border-t border-slate-200/80 pt-16">
      
      {/* Top Section: "Need A Little More To Grow?" CTA Banner matching demo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20 space-y-5 border-b border-slate-200/70">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          Need A Little More To Grow?
        </h3>
        <div>
          <Link
            href="#teklif-al"
            className="inline-flex items-center justify-center bg-[#111827] hover:bg-slate-800 text-white text-xs font-black px-8 py-3.5 rounded-full transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Get started</span>
          </Link>
        </div>
      </div>

      {/* 4-Column Minimalist Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Col 1: Brand & Socials (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              {settings.logoUrl && settings.logoUrl.trim() !== '' ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.siteName || 'PAYPOS Logo'}
                  style={{ height: `${Math.min(settings.logoHeight || 32, 38)}px` }}
                  className="object-contain max-w-[160px]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center relative">
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-900 absolute -top-0.5" />
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-900 absolute -bottom-0.5 -left-0.5" />
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-900 absolute -bottom-0.5 -right-0.5" />
                </div>
              )}
            </Link>

            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm">
              {footerConfig?.brandDescription || 'Empowering better money habits through smart, secure, and simple financial POS tools.'}
            </p>

            {/* Social Pill Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={settings.socialLinks?.instagram || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold hover:bg-slate-700 transition-colors"
                aria-label="Instagram"
              >
                in
              </a>
              <a
                href={settings.socialLinks?.whatsapp || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold hover:bg-slate-700 transition-colors"
                aria-label="WhatsApp"
              >
                wa
              </a>
              <a
                href={settings.socialLinks?.youtube || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold hover:bg-slate-700 transition-colors"
                aria-label="YouTube"
              >
                yt
              </a>
            </div>
          </div>

          {/* Col 2: Resources (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {footerConfig?.col1Title || 'Resources'}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-500">
              {col1Links.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="hover:text-slate-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {footerConfig?.col2Title || 'Company'}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-500">
              {col2Links.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="hover:text-slate-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Get In Touch (Span 4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Get in touch
            </h4>
            <p className="text-xs text-slate-500">
              Bize dilediğiniz zaman ulaşabilir, demo talebi bırakabilirsiniz.
            </p>
            {touchSent ? (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Talebiniz alındı, ekibimiz size ulaşacak.</span>
              </div>
            ) : (
              <form onSubmit={handleTouchSubmit} className="relative max-w-xs">
                <input
                  type="email"
                  required
                  value={touchEmail}
                  onChange={(e) => setTouchEmail(e.target.value)}
                  placeholder="Enter your mail"
                  className="w-full bg-slate-100 border border-slate-200 rounded-full pl-4 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
                  aria-label="Gönder"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Full-width Black Bottom Copyright Strip */}
      <div className="w-full bg-black text-slate-400 py-6 text-center text-xs font-medium border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <p>Copyright 2025 ©, All rights reserved. PAYPOS Ödeme Teknolojileri A.Ş.</p>
        </div>
      </div>

    </footer>
  );
}
