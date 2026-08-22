'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { HeroSlide } from '@/types';
import { Plus, Trash2, Edit2, Save, CheckCircle2, Sliders } from 'lucide-react';

export default function AdminHeroPage() {
  const { heroSlides, saveHeroSlide, deleteHeroSlide } = useCMSStore();
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);
  const [saved, setSaved] = useState(false);

  const startNew = () => {
    setEditingSlide({
      id: '',
      title: 'YENİ NESİL ANDROID POS',
      subtitle: 'Ödemelerin Geleceği',
      badge: '2026 MODEL',
      description: 'Ultra hızlı dokunmatik ekran ve temassız ödeme teknolojisi.',
      posName: 'Smart POS',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67daf40d3a?q=80&w=800&auto=format&fit=crop',
      primaryCtaText: 'Teklif Al',
      primaryCtaUrl: '#teklif-al',
      secondaryCtaText: 'İncele',
      secondaryCtaUrl: '/pos-cihazlari',
      order: heroSlides.length + 1,
      isActive: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    await saveHeroSlide(editingSlide);
    setEditingSlide(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Spatial Hero Slider Yönetimi</h1>
          <p className="text-xs text-slate-500 mt-1">Ana sayfadaki 3D POS cihazı carousel slaytlarını yönetin.</p>
        </div>

        <button
          onClick={startNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Slayt Ekle</span>
        </button>
      </div>

      {saved && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Spatial slider slaytı başarıyla güncellendi!</span>
        </div>
      )}

      {/* Edit Modal / Inline Form */}
      {editingSlide && (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4 text-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {editingSlide.id ? 'Slaytı Düzenle' : 'Yeni Slayt Ekle'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">POS Cihaz Adı</label>
              <input
                type="text"
                value={editingSlide.posName || ''}
                onChange={e => setEditingSlide({ ...editingSlide, posName: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Üst Rozet Metni (Badge)</label>
              <input
                type="text"
                value={editingSlide.badge || ''}
                onChange={e => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Ana Manşet Başlığı (Title)</label>
            <input
              type="text"
              value={editingSlide.title || ''}
              onChange={e => setEditingSlide({ ...editingSlide, title: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Açıklama Metni</label>
            <textarea
              rows={2}
              value={editingSlide.description || ''}
              onChange={e => setEditingSlide({ ...editingSlide, description: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">POS Görsel URL (Transparent PNG / Render)</label>
            <input
              type="text"
              value={editingSlide.imageUrl || ''}
              onChange={e => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditingSlide(null)}
              className="px-5 py-3 rounded-xl bg-slate-100 font-bold text-slate-600"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-md"
            >
              Slaytı Kaydet
            </button>
          </div>
        </form>
      )}

      {/* Slide List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {heroSlides.map((slide) => (
          <div key={slide.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-start gap-4">
              <img src={slide.imageUrl} alt={slide.posName} className="w-20 h-24 object-contain rounded-xl bg-slate-50 p-2 border border-slate-100 shrink-0" />
              <div>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full">{slide.badge}</span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{slide.posName}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{slide.title}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className={`font-bold px-2.5 py-0.5 rounded-full ${slide.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                {slide.isActive ? 'Aktif' : 'Pasif'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingSlide(slide)}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                  title="Düzenle"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteHeroSlide(slide.id)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
