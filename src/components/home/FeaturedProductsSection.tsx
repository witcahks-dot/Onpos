'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function FeaturedProductsSection() {
  const products = useCMSStore((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');

  const categories = ['Hepsi', 'Android POS', 'Mobil POS', 'Masaüstü POS', 'Yazarkasa POS'];

  const filtered = selectedCategory === 'Hepsi'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const fallbackImage = '/images/corporate-intro-demo.jpg';

  return (
    <section className="theme-section-py bg-slate-50/40 border-b border-slate-100 selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Sleek Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-theme-primary-light text-theme-primary px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-theme-primary-light shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
              <span>ÜÜRÜN KATALOĞU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Yeni Nesil <span className="text-theme-primary">POS Cihazları.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              GİB onaylı, dokunmatik ekranlı ve yüksek batarya performanslı akıllı ödeme terminalleri.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ULTRA-VISUAL PRODUCT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filtered.map((product) => {
            const productImage = (product.images && product.images[0] && product.images[0].trim() !== '')
              ? product.images[0]
              : fallbackImage;

            return (
              <div
                key={product.id}
                className="theme-card hover:border-theme-primary transition-all duration-500 flex flex-col justify-between overflow-hidden group border border-slate-200/90 shadow-md bg-white rounded-3xl"
              >
                {/* LARGE DOMINANT DEVICE IMAGE CONTAINER (H-64 SM:H-72) */}
                <div className="bg-slate-50 p-6 flex items-center justify-center h-64 sm:h-72 relative overflow-hidden group-hover:bg-blue-50/30 transition-colors duration-500">
                  
                  {/* Single Floating Discount Tag (No Overlap) */}
                  {product.discountLabel && (
                    <span className="absolute top-3.5 right-3.5 z-10 text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-xs">
                      {product.discountLabel}
                    </span>
                  )}

                  {/* Device Image with Blend & Drop Shadow */}
                  <img
                    src={productImage}
                    alt={product.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                    className="max-h-52 sm:max-h-56 w-auto object-contain drop-shadow-md group-hover:scale-108 transition-transform duration-700 mix-blend-multiply"
                  />
                </div>

                {/* Minimal & Sleek Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Inline Category Pill (Never Collides) */}
                    <span className="text-[10px] font-black uppercase tracking-wider text-theme-primary bg-theme-primary-light px-2.5 py-1 rounded-md inline-block mb-2">
                      {product.category}
                    </span>

                    <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-theme-primary transition-colors leading-snug truncate">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-1 truncate">
                      {product.brand} • {product.sku}
                    </p>
                  </div>

                  {/* Price & Action Link (No Text Wrapping!) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="shrink-0 min-w-0">
                      <span className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Peşin Fiyat</span>
                      <span className="text-sm sm:text-base font-black text-slate-900 whitespace-nowrap">
                        {(product.price || 0).toLocaleString('tr-TR')} ₺
                      </span>
                    </div>

                    <Link
                      href={`/pos-cihazlari/${product.slug}`}
                      className="inline-flex items-center gap-1.5 bg-slate-900 group-hover:bg-theme-primary text-white text-xs font-black px-3.5 py-2 rounded-xl transition-all shadow-xs shrink-0 active:scale-95 whitespace-nowrap"
                    >
                      <span>İncele</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Catalog Link */}
        <div className="text-center pt-2">
          <Link
            href="/pos-cihazlari"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 text-xs font-black px-8 py-3.5 rounded-2xl border border-slate-200 transition-all shadow-xs"
          >
            <span>Tüm POS Kataloğunu İnceleyin ({products.length} Cihaz)</span>
            <ArrowRight className="w-4 h-4 text-theme-primary" />
          </Link>
        </div>

      </div>
    </section>
  );
}
