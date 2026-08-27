'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useCMSStore } from '@/lib/cms-store';
import { ArrowRight, Check, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { formatCurrency, resolveImageUrl } from '@/lib/data-normalizers';

export default function ExistingPosCatalogPage() {
  const products = useCMSStore((state) => state.products);
  const currency = useCMSStore((state) => state.settings.currency);
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');

  const categories = ['Hepsi', 'Android POS', 'Mobil POS', 'Masaüstü POS', 'Yazarkasa POS'];

  const filtered = selectedCategory === 'Hepsi'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'POS Cihazları' }]} />

        {/* Page Hero */}
        <section className="bg-white py-12 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Donanım Kataloğu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tüm Akıllı <span className="text-gradient-blue">POS Cihazları</span>
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              İşletmeniz için yüksek performanslı, BDDK & PCI-PTS onaylı, 24 saatte adrese teslim edilen yeni nesil Android, Mobil, Masaüstü ve ÖKC Yazarkasa POS modelleri.
            </p>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 pt-4 overflow-x-auto">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-2">
                <Filter className="w-3.5 h-3.5" /> Filtrele:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Area */}
                    <div className="h-64 bg-slate-50 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden group-hover:bg-blue-50/30 transition-colors">
                      <img
                        src={resolveImageUrl(product.images?.[0], 'pos')}
                        alt={product.name}
                        className="max-h-52 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discountLabel && (
                        <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {product.discountLabel}
                        </span>
                      )}
                      <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full border border-slate-200">
                        {product.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pt-6 space-y-3">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {product.shortDesc}
                      </p>

                      {/* Key features */}
                      <div className="space-y-1.5 pt-2">
                        {product.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom / CTA */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Fiyat</span>
                      <span className="text-lg font-black text-slate-900 font-mono">
                        {formatCurrency(product.price, currency)}
                      </span>
                    </div>

                    <Link
                      href={`/pos-cihazlari/${product.slug}`}
                      className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95"
                    >
                      <span>İncele</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
