'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ShieldAlert, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <span className="text-6xl font-black text-slate-900 tracking-tight block">404</span>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Aradığınız Sayfayı Bulamadık</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak erişilemiyor olabilir.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>

            <Link
              href="/pos-cihazlari"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3 rounded-xl transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-slate-500" />
              <span>Ürünler Kataloğu</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
