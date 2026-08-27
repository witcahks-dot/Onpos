'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { ArrowRight, CheckCircle2, Send } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function FintechFooter() {
  const { settings, menu, footerConfig, subscribeNewsletter } = useCMSStore();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const cfg = footerConfig || {
    footerStyle: 'full',
    brandDescription: 'Empowering better money habits through smart, secure, and simple financial tools.',
    copyrightText: 'Copyright 2026 ©, All rights reserved.',
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('submitting');
    const ok = await subscribeNewsletter(email);
    if (ok) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } else {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-white text-slate-900 pt-16 pb-12 border-t border-slate-200/90 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand Emblem & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-white font-black text-base shadow-sm group-hover:bg-blue-600 transition-colors">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="8" r="4" />
                  <path d="M12 12v9" />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">
                {settings.siteName || 'PAYPOS'}
              </span>
            </Link>

            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-medium">
              {cfg.brandDescription || 'Empowering better money habits through smart, secure, and simple financial tools.'}
            </p>

            {/* Social Icons (Black outline/fill matching reference) */}
            <div className="flex items-center gap-2 pt-2 text-slate-900">
              <a
                href={settings.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-950 hover:text-white flex items-center justify-center transition-colors text-slate-700"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                </svg>
              </a>
              <a
                href={settings.socialLinks?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-950 hover:text-white flex items-center justify-center transition-colors text-slate-700"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={settings.socialLinks?.youtube || 'https://youtube.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-950 hover:text-white flex items-center justify-center transition-colors text-slate-700"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={settings.socialLinks?.telegram || 'https://t.me'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-950 hover:text-white flex items-center justify-center transition-colors text-slate-700"
                aria-label="Telegram"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Resources / Solutions */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {cfg.col1Title || 'Kaynaklar'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><Link href="/pos-cihazlari" className="hover:text-slate-950 transition-colors">POS Modelleri</Link></li>
              <li><Link href="/hizmetler" className="hover:text-slate-950 transition-colors">Teknik Servis</Link></li>
              <li><Link href="/cozumler" className="hover:text-slate-950 transition-colors">Sektörel Çözümler</Link></li>
              <li><Link href="/projeler" className="hover:text-slate-950 transition-colors">Projeler</Link></li>
              <li><Link href="/kurumsal/e-katalog" className="hover:text-slate-950 transition-colors">E-Katalog İndir</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {cfg.col2Title || 'Kurumsal'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><Link href="/kurumsal/hakkimizda" className="hover:text-slate-950 transition-colors">Hakkımızda</Link></li>
              <li><Link href="/kurumsal/referanslar" className="hover:text-slate-950 transition-colors">Referanslar</Link></li>
              <li><Link href="/kurumsal/belgelerimiz" className="hover:text-slate-950 transition-colors">Sertifikalarımız</Link></li>
              <li><Link href="/kurumsal/banka-hesaplari" className="hover:text-slate-950 transition-colors">Banka Hesapları</Link></li>
              <li><Link href="/kurumsal/bayiler" className="hover:text-slate-950 transition-colors">Bayi Ağı</Link></li>
              <li><Link href="/sss" className="hover:text-slate-950 transition-colors">S.S.S</Link></li>
            </ul>
          </div>

          {/* Col 4: Get in touch & Newsletter Input */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              İletişime Geçin
            </h4>
            <p className="text-xs text-slate-500">
              Yeni nesil ödeme teknolojileri ve avantajlı komisyon oranları için e-bültenimize katılın.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-950 outline-none transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="absolute right-1.5 w-7 h-7 rounded-full bg-slate-950 hover:bg-slate-800 text-white flex items-center justify-center transition-colors disabled:opacity-50"
                  aria-label="Abone Ol"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {status === 'success' && (
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Bülten aboneliğiniz tamamlandı!
                </span>
              )}
            </form>

            <div className="pt-2 text-[11px] text-slate-500 space-y-0.5">
              <div>Telefon: <span className="font-bold text-slate-800">{settings.phoneFormatted}</span></div>
              <div>E-posta: <span className="font-bold text-slate-800">{settings.email}</span></div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            {cfg.copyrightText || 'Copyright 2026 ©, All rights reserved.'}
          </div>

          <div className="flex items-center gap-5">
            <Link href="/kurumsal/kvkk" className="hover:text-slate-900 transition-colors">KVKK</Link>
            <Link href="/kurumsal/gizlilik" className="hover:text-slate-900 transition-colors">Gizlilik İlkeleri</Link>
            <Link href="/iletisim" className="hover:text-slate-900 transition-colors">İletişim</Link>
            <Link href="/admin" className="text-blue-600 font-bold hover:underline">CMS Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
