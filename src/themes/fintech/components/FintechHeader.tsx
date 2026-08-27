'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCMSStore } from '@/lib/cms-store';
import { Search, Shield, Menu, X, ArrowRight, Sparkles, Phone, MessageCircle } from 'lucide-react';
import SearchOverlay from '@/components/layout/SearchOverlay';
import QuoteModal from '@/components/ui/QuoteModal';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function FintechHeader() {
  const pathname = usePathname();
  const { settings, menu, headerConfig } = useCMSStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleMenuItems = (menu || [])
    .filter(item => item.isVisible !== false)
    .sort((a, b) => (a.order ?? 1) - (b.order ?? 1));

  const logoUrl = resolveImageUrl(settings.logoUrl, 'logo');

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner (Optional if enabled in headerConfig) */}
      {headerConfig?.showTopbar !== false && settings.topbarText && (
        <div className="bg-slate-950 text-slate-300 text-[11px] font-medium py-1.5 px-4 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <span className="truncate flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {settings.topbarText}
            </span>
            <div className="hidden md:flex items-center gap-4 shrink-0 text-slate-400">
              <a href={`tel:${settings.phone || '08503080000'}`} className="hover:text-white flex items-center gap-1">
                <Phone className="w-3 h-3 text-blue-400" />
                <span>{settings.phoneFormatted || '0850 308 00 00'}</span>
              </a>
              <span className="text-slate-700">|</span>
              <span className="text-emerald-400 font-semibold">{settings.workingHours || '7/24 Kesintisiz Destek'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Nav Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/5 py-3 border-b border-slate-100'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo & Symbol */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            {settings.logoUrl && !imgError ? (
              <img
                src={logoUrl}
                alt={settings.siteName || 'PAYPOS Logo'}
                onError={() => setImgError(true)}
                style={{ height: `${settings.logoHeight || 38}px` }}
                className="object-contain max-w-[200px] transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center gap-2.5">
                {/* Fintech Ring Emblem */}
                <div className="w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="8" r="4" />
                    <path d="M12 12v9" />
                  </svg>
                </div>
                <span className="font-black text-lg tracking-tight text-slate-900">
                  {settings.siteName || 'PAYPOS'}
                </span>
              </div>
            )}
          </Link>

          {/* Navigation Pill Container (Matching reference image) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/90 p-1.5 rounded-full border border-slate-200/80 shadow-xs">
            {visibleMenuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 text-[9px] px-1.5 py-0.2 bg-emerald-500 text-white rounded-full font-extrabold uppercase">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Search Trigger */}
            {headerConfig?.showSearch !== false && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Arama Yap (Cmd+K)"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Log in text button */}
            <Link
              href="/admin/login"
              className="hidden sm:inline-block text-xs font-bold text-slate-700 hover:text-slate-950 px-3 py-2 transition-colors"
            >
              Yönetici Girişi
            </Link>

            {/* Primary Sign Up / Teklif Al Button (Black pill from reference image) */}
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-extrabold px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>{headerConfig?.quoteButtonText || 'Hemen Başvur'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100"
              aria-label="Menü"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1 text-sm font-bold">
            {visibleMenuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                    isActive ? 'bg-slate-950 text-white' : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-extrabold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsQuoteOpen(true);
              }}
              className="w-full bg-slate-950 text-white font-extrabold py-3 rounded-full flex items-center justify-center gap-2 shadow-md"
            >
              <Shield className="w-4 h-4" />
              <span>Teklif Alın</span>
            </button>
            <Link
              href="/admin/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center text-xs font-bold text-slate-600 py-2"
            >
              Yönetici Girişi (CMS)
            </Link>
          </div>
        </div>
      )}

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </header>
  );
}
