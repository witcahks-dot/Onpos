'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { ArrowRight, ShieldCheck, Check, Sparkles, Filter } from 'lucide-react';
import { formatCurrency, resolveImageUrl } from '@/lib/data-normalizers';
import QuoteModal from '@/components/ui/QuoteModal';

export default function FintechProductsSection() {
  const { products, settings } = useCMSStore();
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string | undefined>();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const categories = ['Hepsi', 'Android POS', 'Mobil POS', 'Masaüstü POS', 'Yazarkasa POS'];

  const filtered = selectedCategory === 'Hepsi'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleOpenQuote = (productName: string) => {
    setSelectedProductForQuote(productName);
    setIsQuoteOpen(true);
  };

  return (
    <section className="bg-slate-50/50 py-20 border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-slate-200/80 px-3 py-1 rounded-full text-xs font-bold text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Gelişmiş Donanım Kataloğu</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
              Next-Gen POS Hardware
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              GİB ve BDDK onaylı, temassız ve 4G destekli yeni nesil Android ve Mobil POS modelleri.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(0, 6).map((product) => {
            const img = resolveImageUrl(product.images?.[0], 'pos');
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Container with Badge */}
                <div className="bg-slate-50 rounded-2xl p-6 flex items-center justify-center h-60 relative group-hover:bg-slate-100/60 transition-colors">
                  <img
                    src={img}
                    alt={product.name}
                    className="max-h-48 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discountLabel && (
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow">
                      {product.discountLabel}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-200">
                    {product.category}
                  </span>
                </div>

                {/* Info & Specs */}
                <div className="pt-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-950 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                      {product.shortDesc}
                    </p>

                    {/* Mini Specs Row */}
                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-3 border-t border-slate-100">
                      <span>Ekran: <strong className="text-slate-900">{product.specs?.display?.split(' ')[0] || '5.5"'}</strong></span>
                      <span>Bağlantı: <strong className="text-slate-900">{product.specs?.connectivity || '4G/Wi-Fi'}</strong></span>
                      <span className="text-emerald-600 font-bold">PCI PTS 6.x</span>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Fiyat</span>
                      <span className="text-base font-black text-slate-950 font-mono">
                        {formatCurrency(product.price, settings.currency)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenQuote(product.name)}
                        className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-extrabold px-4 py-2.5 rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        Teklif Al
                      </button>
                      <Link
                        href={`/pos-cihazlari/${product.slug}`}
                        className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                        title="İncele"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Products CTA */}
        <div className="text-center pt-4">
          <Link
            href="/pos-cihazlari"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 text-xs sm:text-sm font-extrabold px-8 py-3.5 rounded-full transition-all shadow-xs"
          >
            <span>Tüm POS Donanım Kataloğunu Gör</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={selectedProductForQuote}
      />
    </section>
  );
}
