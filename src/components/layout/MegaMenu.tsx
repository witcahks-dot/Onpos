'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Monitor, ShieldCheck, CreditCard, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

interface MegaMenuProps {
  onClose: () => void;
}

export default function MegaMenu({ onClose }: MegaMenuProps) {
  const { products, megaMenuConfig } = useCMSStore();
  
  // Find featured product or use configured spotlight data
  const selectedProduct = products.find(p => p.id === megaMenuConfig?.featuredProductId) || products.find(p => p.isFeatured) || products[0];

  const spotlightBadge = megaMenuConfig?.spotlightBadge || selectedProduct?.discountLabel || 'ÖNE ÇIKAN CİHAZ';
  const spotlightTitle = megaMenuConfig?.spotlightTitle || selectedProduct?.name || 'Smart POS X1 Android';
  const spotlightDesc = megaMenuConfig?.spotlightDesc || selectedProduct?.shortDesc || 'Ultra hızlı dokunmatik ekran ve temassız ödeme.';
  const spotlightPriceText = megaMenuConfig?.spotlightPriceText || (selectedProduct?.price ? `${selectedProduct.price.toLocaleString('tr-TR')} ₺'den başlayan fiyatlarla` : 'Özel Fiyat Teklifi');
  const spotlightCtaText = megaMenuConfig?.spotlightCtaText || 'Cihazı İncele & Fiyat Al';
  const spotlightCtaUrl = megaMenuConfig?.spotlightCtaUrl || (selectedProduct ? `/pos-cihazlari/${selectedProduct.slug}` : '/pos-cihazlari');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return Smartphone;
      case 'CreditCard': return CreditCard;
      case 'Monitor': return Monitor;
      case 'ShieldCheck': return ShieldCheck;
      default: return Sparkles;
    }
  };

  const categories = megaMenuConfig?.categories || [
    {
      id: 'cat-1',
      title: 'Android POS',
      desc: 'Dokunmatik ekranlı, akıllı işletim sistemli yeni nesil POS terminalleri.',
      iconName: 'Smartphone',
      href: '/pos-cihazlari?category=Android+POS',
      colorBg: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'cat-2',
      title: 'Mobil POS',
      desc: 'Saha kuryeleri ve mobil satış ekipleri için cep boy kablosuz cihazlar.',
      iconName: 'CreditCard',
      href: '/pos-cihazlari?category=Mobil+POS',
      colorBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      id: 'cat-3',
      title: 'Masaüstü POS',
      desc: 'Market ve mağaza kasa başları için yüksek hızlı çift ekranlı çözümler.',
      iconName: 'Monitor',
      href: '/pos-cihazlari?category=Masaüstü+POS',
      colorBg: 'bg-cyan-50 text-cyan-600',
    },
    {
      id: 'cat-4',
      title: 'Yazarkasa POS (ÖKC)',
      desc: 'GİB ve mali mevzuatlara tam uyumlu mali hafızalı akıllı yazarkasalar.',
      iconName: 'ShieldCheck',
      href: '/pos-cihazlari?category=Yazarkasa+POS',
      colorBg: 'bg-sky-50 text-sky-600',
    },
  ];

  return (
    <div
      className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl py-8 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 8 Cols: Categories Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat.iconName);
              return (
                <Link
                  key={cat.id || cat.title}
                  href={cat.href}
                  onClick={onClose}
                  className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50/80 transition-all duration-200 relative overflow-hidden"
                >
                  <div className={`p-3 rounded-xl ${cat.colorBg || 'bg-blue-50 text-blue-600'} shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                        {cat.title}
                      </h4>
                      {cat.badge && (
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-600" />
                </Link>
              );
            })}
          </div>

          {/* Right 4 Cols: Featured Product Spotlight */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xl border border-slate-800">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md shadow-blue-600/30">
                  {spotlightBadge}
                </span>
                {selectedProduct?.discountLabel && (
                  <span className="text-[10px] font-bold text-emerald-400">
                    {selectedProduct.discountLabel}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">{spotlightTitle}</h3>
              <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">{spotlightDesc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="text-xs font-semibold text-blue-300 mb-3">
                {spotlightPriceText}
              </div>
              <Link
                href={spotlightCtaUrl}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-3 rounded-xl w-full transition-all shadow-lg shadow-blue-600/30 active:scale-95"
              >
                <span>{spotlightCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Mega Menu Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {megaMenuConfig?.bottomNoticeText || 'Tüm cihazlarımız 2 yıl resmi garanti ve 7/24 ikame desteği ile gelir.'}
          </span>
          <Link
            href={megaMenuConfig?.bottomNoticeLinkUrl || '/pos-cihazlari'}
            onClick={onClose}
            className="text-blue-600 font-bold hover:underline flex items-center gap-1"
          >
            <span>{megaMenuConfig?.bottomNoticeLinkText || 'Tüm POS Ürünlerini Gör Kataloğu Aç'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
