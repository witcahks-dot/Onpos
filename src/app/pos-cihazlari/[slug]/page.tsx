'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import QuoteModal from '@/components/ui/QuoteModal';
import { useCMSStore } from '@/lib/cms-store';
import { Check, ShieldCheck, Download, ArrowRight, Phone, MessageCircle, Truck, Clock, RefreshCw } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { products, settings } = useCMSStore();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Header />
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">Aradığınız POS cihazı bulunamadı.</h2>
          <p className="text-xs text-slate-500">Ürün kataloğumuz güncellenmiş veya kaldırılmış olabilir.</p>
          <Link href="/pos-cihazlari" className="inline-block bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl">
            Tüm Cihazlara Dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const whatsappUrl = `https://wa.me/${(settings.phone || '905304171565').replace(/\D/g, '')}?text=${encodeURIComponent(`Merhaba, ${product.name} hakkında detaylı bilgi ve fiyat teklifi almak istiyorum.`)}`;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'POS Cihazları', href: '/pos-cihazlari' }, { label: product.name }]} />

        {/* Product Overview Hero */}
        <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Product Gallery Image */}
              <div className="lg:col-span-6 bg-slate-50/80 rounded-3xl p-8 sm:p-12 border border-slate-200/90 flex items-center justify-center relative overflow-hidden group">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-h-96 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                {product.discountLabel && (
                  <span className="absolute top-6 left-6 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    {product.discountLabel}
                  </span>
                )}
              </div>

              {/* Product Details & Actions */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/60 inline-block mb-3">
                    {product.category} — SKU: {product.sku}
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-medium">
                    {product.fullDesc}
                  </p>
                </div>

                {/* Price Display Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wider">Tavsiye Edilen Fiyat</span>
                    {product.price ? (
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-black text-slate-900 font-mono">
                          {product.price.toLocaleString('tr-TR')} ₺
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-slate-400 line-through font-mono">
                            {product.oldPrice.toLocaleString('tr-TR')} ₺
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-base font-bold text-blue-600">Özel Fiyat Teklifi Alın</span>
                    )}
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-200">
                    Stokta Var
                  </span>
                </div>

                {/* Key Features Bullet List */}
                <div className="space-y-2 text-xs font-semibold text-slate-700 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 active:scale-95"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Cihaz İçin Teklif Alın</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-colors shadow-md active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Sipariş</span>
                  </a>
                </div>

                {/* Assurance Badges */}
                <div className="grid grid-cols-3 gap-3 pt-2 text-[11px] text-slate-500 font-medium text-center border-t border-slate-100">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>24 Saat Adreste Kurulum</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RefreshCw className="w-4 h-4 text-blue-600" />
                    <span>7/24 İkame Cihaz Garantisi</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>2 Yıl Yetkili Garanti</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Specifications Table */}
        <section className="py-16 bg-slate-50/60 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Teknik Özellikler Tablosu</h2>
              <p className="text-xs text-slate-500 font-medium">{product.name} detaylı donanım ve yazılım spesifikasyonları.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left">
                <tbody>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900 w-1/3">Ekran & Çözünürlük</td>
                    <td className="p-4 text-slate-700 font-medium">{product.specs?.display || '3.5 inç Touch'}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-900">İşletim Sistemi</td>
                    <td className="p-4 text-slate-700 font-medium">{product.specs?.os || 'Mali OS'}</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Bağlantı Özellikleri</td>
                    <td className="p-4 text-slate-700 font-medium">{product.specs?.connectivity || '4G / Wi-Fi'}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-900">Temassız NFC</td>
                    <td className="p-4 text-slate-700 font-medium">{product.specs?.nfc || 'Var'}</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Fiş Yazıcısı</td>
                    <td className="p-4 text-slate-700 font-medium">{product.specs?.printer || '58mm Termal'}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-900">Batarya Kapasitesi</td>
                    <td className="p-4 text-slate-700 font-medium">{product.specs?.battery || '5000 mAh'}</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Ağırlık</td>
                    <td className="p-4 text-slate-700 font-medium">{product.specs?.weight || '400 gr'}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Güvenlik Sertifikaları</td>
                    <td className="p-4 text-emerald-600 font-bold">{product.specs?.security || 'GİB & BDDK Onaylı'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <h3 className="text-xl font-bold text-slate-900 text-center">Benzer POS Cihazları</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map(rel => (
                  <div key={rel.id} className="bg-white rounded-3xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-lg transition-all">
                    <img src={rel.images[0]} alt={rel.name} className="h-44 object-contain mx-auto mb-4" />
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-full">{rel.category}</span>
                      <h4 className="text-sm font-bold text-slate-900">{rel.name}</h4>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="font-mono font-bold text-slate-900">{rel.price ? `${rel.price.toLocaleString('tr-TR')} ₺` : 'Teklif Alın'}</span>
                        <Link href={`/pos-cihazlari/${rel.slug}`} className="text-xs font-bold text-blue-600 hover:underline">İncele →</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={product.name}
      />

      <Footer />
    </div>
  );
}
