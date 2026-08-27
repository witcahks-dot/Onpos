'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { ArrowRight, Sparkles, Plus, ArrowUpRight } from 'lucide-react';

export default function FintechProductsSection() {
  const { products } = useCMSStore();
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');

  const categories = ['Hepsi', 'Android POS', 'Mobil POS', 'Masaüstü POS', 'Yazarkasa POS'];

  const filtered = selectedCategory === 'Hepsi'
    ? products
    : (products || []).filter(p => p.category === selectedCategory);

  const fallbackImage = '/images/corporate-intro-demo.jpg';

  return (
    <section className="py-20 sm:py-28 bg-[#fbfbfe] border-b border-slate-100/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/70 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                ÖNE ÇIKAN CİHAZ KATALOĞU
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Yeni Nesil <span className="text-slate-900">POS Cihazları.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg">
              GİB onaylı, dokunmatik ekranlı ve yüksek batarya performanslı akıllı ödeme terminalleri.
            </p>
          </div>

          {/* Category Filter Pills matching demo */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Minimalist Ultra-Clean Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {(filtered || []).map((product) => {
            const productImage = (product.images && product.images[0] && product.images[0].trim() !== '')
              ? product.images[0]
              : fallbackImage;

            return (
              <div
                key={product.id}
                className="bg-white rounded-[28px] border border-slate-200/80 hover:border-slate-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-xl"
              >
                {/* Device Canvas with Subtle Backdrop */}
                <div className="bg-[#f7f8fb] p-6 flex items-center justify-center h-60 sm:h-64 relative overflow-hidden group-hover:bg-[#f2f4f9] transition-colors">
                  
                  {/* Floating Discount / Badge */}
                  {product.discountLabel && (
                    <span className="absolute top-3.5 right-3.5 z-10 text-[9px] font-black uppercase tracking-wider bg-[#111827] text-white px-3 py-1 rounded-full shadow-xs">
                      {product.discountLabel}
                    </span>
                  )}

                  {/* Device Image */}
                  <img
                    src={productImage}
                    alt={product.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                    className="max-h-48 sm:max-h-52 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                  />
                </div>

                {/* Card Content & Action Button */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md inline-block">
                      {product.category}
                    </span>

                    <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-slate-700 transition-colors leading-snug truncate">
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium">
                      {product.shortDesc || 'GİB ve BDDK onaylı, temassız ve QR kodlu ödeme destekleyen akıllı POS cihazı.'}
                    </p>
                  </div>

                  {/* Price & Pill Details Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Fiyat</span>
                      <span className="text-sm sm:text-base font-black text-slate-900">
                        {product.price ? `₺${product.price.toLocaleString('tr-TR')}` : 'Özel Teklif'}
                      </span>
                    </div>

                    <Link
                      href={`/pos-cihazlari/${product.slug}`}
                      className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
                      aria-label="İncele"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
