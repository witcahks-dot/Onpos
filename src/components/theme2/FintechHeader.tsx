'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCMSStore } from '@/lib/cms-store';
import { Menu, X, Shield, ArrowUpRight } from 'lucide-react';

export default function FintechHeader() {
  const pathname = usePathname();
  const { settings, menu, headerConfig } = useCMSStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visibleMenuItems = (menu || [])
    .filter(item => item.isVisible)
    .sort((a, b) => a.order - b.order);

  // Fallback default nav pills matching the demo screenshot
  const defaultNavItems = [
    { id: 'n1', label: 'Business', href: '/#features' },
    { id: 'n2', label: 'Pricing', href: '/pos-cihazlari' },
    { id: 'n3', label: 'Features', href: '/hizmetler' },
    { id: 'n4', label: 'About', href: '/kurumsal/hakkimizda' },
  ];

  const navItems = visibleMenuItems.length > 0
    ? visibleMenuItems.slice(0, 5)
    : defaultNavItems;

  return (
    <header className="w-full bg-[#fbfbfe] border-b border-slate-100/80 sticky top-0 z-50 backdrop-blur-md bg-[#fbfbfe]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Minimalist Geometric Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          {settings.logoUrl && settings.logoUrl.trim() !== '' ? (
            <img
              src={settings.logoUrl}
              alt={settings.siteName || 'PAYPOS Logo'}
              style={{ height: `${Math.min(settings.logoHeight || 36, 42)}px` }}
              className="object-contain max-w-[180px] transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center gap-2.5">
              {/* Minimalist Geometric Triquetra / Rings Icon matching demo */}
              <div className="w-9 h-9 rounded-full border-2 border-slate-900 flex items-center justify-center relative group-hover:rotate-45 transition-transform duration-500">
                <div className="w-4 h-4 rounded-full border border-slate-900 absolute -top-1" />
                <div className="w-4 h-4 rounded-full border border-slate-900 absolute -bottom-1 -left-1" />
                <div className="w-4 h-4 rounded-full border border-slate-900 absolute -bottom-1 -right-1" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                PAY<span className="font-light text-slate-500">POS</span>
              </span>
            </div>
          )}
        </Link>

        {/* Center: Sleek Centered Pill Navigation Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-white/80 border border-slate-200/70 p-1.5 rounded-full shadow-xs backdrop-blur-sm">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || (index === 0 && pathname === '/');
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Log in Text + Solid Black Pill Sign Up Button */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/admin/login"
            className="hidden sm:inline-flex text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors"
          >
            Log in
          </Link>

          <Link
            href="#teklif-al"
            className="inline-flex items-center justify-center gap-1.5 bg-[#111827] hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            <span>{headerConfig?.quoteButtonText || 'Sign up'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-800 hover:bg-slate-100 border border-slate-200"
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-3 animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 flex items-center justify-between">
            <Link href="/admin/login" className="text-xs font-bold text-slate-700">
              Yönetici Girişi (Log in)
            </Link>
            <Link
              href="#teklif-al"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#111827] text-white text-xs font-bold px-5 py-2.5 rounded-full"
            >
              Hemen Başvur (Sign up)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
