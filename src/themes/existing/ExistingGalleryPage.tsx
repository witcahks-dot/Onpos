'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useCMSStore } from '@/lib/cms-store';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function ExistingGalleryPage() {
  const gallery = useCMSStore((state) => state.gallery);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Foto & Video Galeri' }]} />

        <section className="bg-white py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Medya Galerimiz</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Fotoğraf ve <span className="text-gradient-blue">Video Arşivi</span>
            </h1>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map(item => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <img src={resolveImageUrl(item.thumbnailUrl || item.url, 'cover')} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-4 left-4 bg-slate-900/80 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
                      {item.type === 'video' ? 'Video' : 'Fotoğraf'}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <span className="text-xs text-slate-400 mt-1 block">{item.album || item.category}</span>
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
