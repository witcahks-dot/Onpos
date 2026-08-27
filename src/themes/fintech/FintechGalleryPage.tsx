'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import { Image as ImageIcon, Sparkles, X } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function FintechGalleryPage() {
  const { gallery } = useCMSStore();
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const categories = ['Hepsi', 'Saha Kurulumları', 'Etkinlikler', 'Ofis', 'Donanım'];

  const filtered = selectedCategory === 'Hepsi'
    ? gallery
    : gallery.filter(g => g.category === selectedCategory);

  return (
    <FintechThemeShell>
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>Medya ve Saha Fotoğrafları</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Fotoğraf Galerisi
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-medium">
            Saha kurulumlarımız, kurumsal etkinliklerimiz ve modern POS donanımlarımızdan kareler.
          </p>

          <div className="flex items-center gap-2 pt-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-950 font-black shadow-md'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item) => {
              const img = resolveImageUrl(item.thumbnailUrl || item.url, 'cover');
              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxImg(img)}
                  className="rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 aspect-square relative group cursor-pointer shadow-sm hover:shadow-xl transition-all"
                >
                  <img src={img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] uppercase font-bold text-blue-300">{item.category}</span>
                    <h4 className="text-xs font-black">{item.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700"
          >
            <X className="w-6 h-6" />
          </button>
          <img src={lightboxImg} alt="Büyütülmüş Görsel" className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl" />
        </div>
      )}
    </FintechThemeShell>
  );
}
