'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useCMSStore } from '@/lib/cms-store';
import { ArrowRight, Check, ShieldCheck, Sparkles, Filter } from 'lucide-react';

export default function PosProductsPage() {
  const products = useCMSStore((state) => state.products);
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

        {/* Products Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="bg-slate-50 p-8 flex items-center justify-center h-64 relative group-hover:bg-blue-50/20 transition-colors">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="max-h-52 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discountLabel && (
                      <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                        {product.discountLabel}
                      </span>
                    )}
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-2">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                        {product.shortDesc}
                      </p>

                      <div className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Ekran:</span>
                          <span className="font-semibold text-slate-800">{product.specs.display.split(' ')[0]}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Bağlantı:</span>
                          <span className="font-semibold text-slate-800">{product.specs.connectivity}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Güvenlik:</span>
                          <span className="font-semibold text-emerald-600">PCI PTS 6.x</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        {product.price ? (
                          <span className="text-lg font-black text-slate-900">
                            {product.price.toLocaleString('tr-TR')} ₺
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-blue-600">Özel Teklif Alın</span>
                        )}
                      </div>
                      <Link
                        href={`/pos-cihazlari/${product.slug}`}
                        className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20"
                      >
                        <span>Detaylı İncele</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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
