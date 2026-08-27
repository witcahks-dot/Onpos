'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import { PosProduct } from '@/types';
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Zap, Sparkles, Phone } from 'lucide-react';
import { formatCurrency, resolveImageUrl } from '@/lib/data-normalizers';
import QuoteModal from '@/components/ui/QuoteModal';

export default function FintechPosDetailPage({ product }: { product: PosProduct }) {
  const { settings, products } = useCMSStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const images = (product.images && product.images.length > 0)
    ? product.images
    : ['/images/hugin-tiger.png'];

  const otherProducts = (products || [])
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  return (
    <FintechThemeShell>
      {/* Breadcrumb & Navigation */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-950">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/pos-cihazlari" className="hover:text-slate-950">POS Cihazları</Link>
            <span>/</span>
            <span className="text-slate-950 truncate max-w-xs">{product.name}</span>
          </div>

          <Link href="/pos-cihazlari" className="flex items-center gap-1 text-slate-800 hover:text-blue-600">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kataloğa Dön</span>
          </Link>
        </div>
      </div>

      {/* Main Product Hero */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Gallery Left */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex items-center justify-center min-h-[380px] sm:min-h-[460px] relative shadow-inner">
                <img
                  src={resolveImageUrl(images[selectedImage], 'pos')}
                  alt={product.name}
                  className="max-h-80 sm:max-h-96 object-contain drop-shadow-2xl transition-all"
                />
                {product.discountLabel && (
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full shadow">
                    {product.discountLabel}
                  </span>
                )}
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                  {product.category}
                </span>
              </div>

              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-2xl p-2 bg-slate-50 border-2 transition-all shrink-0 ${
                        selectedImage === i ? 'border-slate-950 shadow-md' : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={resolveImageUrl(img, 'pos')} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Summary Right */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 text-[11px] font-black px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>GİB & BDDK Onaylı Mali Hafıza</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {product.shortDesc}
                </p>
              </div>

              {/* Price Row */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block">Kurumsal Satış / Kiralama Fiyatı</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                    {formatCurrency(product.price, settings.currency)}
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  Stokta Mevcut (Hemen Teslim)
                </span>
              </div>

              {/* CTA Action Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="w-full sm:w-auto flex-1 bg-slate-950 hover:bg-slate-800 text-white font-extrabold py-4 px-8 rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Hemen Teklif Alın</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${settings.phone || '08503080000'}`}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-extrabold py-4 px-6 rounded-full transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Müşteri Danışmanı</span>
                </a>
              </div>

              {/* Key Features List */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Öne Çıkan Özellikler
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                  {product.features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  )) || (
                    <>
                      <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Temassız NFC & QR Kod Ödeme</div>
                      <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Dahili Termal Fiş Yazıcı</div>
                      <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 4G LTE & Wi-Fi Çift Hat</div>
                      <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 72 Saate Varan Pil Ömrü</div>
                    </>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Technical Specifications Table */}
      {product.specs && (
        <section className="py-16 bg-slate-50 border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Teknik Özellikler
              </h3>
              <p className="text-xs text-slate-500">Donanım mimarisi ve sertifikasyon detayları</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm max-w-4xl mx-auto">
              <div className="divide-y divide-slate-100 text-xs">
                {product.specs.display && (
                  <div className="grid grid-cols-3 p-4">
                    <span className="font-bold text-slate-500">Ekran</span>
                    <span className="col-span-2 font-extrabold text-slate-900">{product.specs.display}</span>
                  </div>
                )}
                {product.specs.os && (
                  <div className="grid grid-cols-3 p-4">
                    <span className="font-bold text-slate-500">İşletim Sistemi</span>
                    <span className="col-span-2 font-extrabold text-slate-900">{product.specs.os}</span>
                  </div>
                )}
                {product.specs.printer && (
                  <div className="grid grid-cols-3 p-4">
                    <span className="font-bold text-slate-500">Yazıcı Modülü</span>
                    <span className="col-span-2 font-extrabold text-slate-900">{product.specs.printer}</span>
                  </div>
                )}
                {product.specs.battery && (
                  <div className="grid grid-cols-3 p-4">
                    <span className="font-bold text-slate-500">Batarya Kapasitesi</span>
                    <span className="col-span-2 font-extrabold text-slate-900">{product.specs.battery}</span>
                  </div>
                )}
                {product.specs.connectivity && (
                  <div className="grid grid-cols-3 p-4">
                    <span className="font-bold text-slate-500">Bağlantı Türü</span>
                    <span className="col-span-2 font-extrabold text-slate-900">{product.specs.connectivity}</span>
                  </div>
                )}
                {product.specs.printer && (
                  <div className="grid grid-cols-3 p-4">
                    <span className="font-bold text-slate-500">Fiş Yazıcı</span>
                    <span className="col-span-2 font-extrabold text-slate-900">{product.specs.printer}</span>
                  </div>
                )}
                {product.specs.security && (
                  <div className="grid grid-cols-3 p-4">
                    <span className="font-bold text-slate-500">Güvenlik Standardı</span>
                    <span className="col-span-2 font-extrabold text-slate-900">{product.specs.security}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other POS Hardware Recommendations */}
      {otherProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Benzer POS Donanımları
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/pos-cihazlari/${p.slug}`}
                  className="bg-slate-50 hover:bg-slate-100/80 rounded-3xl p-5 border border-slate-200 transition-all flex items-center gap-4 group"
                >
                  <img
                    src={resolveImageUrl(p.images?.[0], 'pos')}
                    alt={p.name}
                    className="w-16 h-16 object-contain shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-bold block">{p.category}</span>
                    <span className="text-xs font-black text-slate-950 font-mono mt-1 block">
                      {formatCurrency(p.price, settings.currency)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={product.name}
      />
    </FintechThemeShell>
  );
}
