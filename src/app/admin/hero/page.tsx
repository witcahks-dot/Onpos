'use client';

import React, { useState, useEffect } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { HeroSlide } from '@/types';
import { Plus, Trash2, Edit2, Save, CheckCircle2, Sliders, Layout, Sparkles, Layers, Image as ImageIcon } from 'lucide-react';

export default function AdminHeroPage() {
  const { heroSlides, heroConfig, saveHeroSlide, deleteHeroSlide, updateHeroConfig, fetchCMSData } = useCMSStore();
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    fetchCMSData();
  }, [fetchCMSData]);

  const currentTheme = heroConfig?.sliderTheme || 'theme1';

  const handleSelectTheme = async (theme: 'theme1' | 'theme2') => {
    await updateHeroConfig({ sliderTheme: theme });
    showNotice(theme === 'theme1' ? 'Tema 1 (3D Spatial Cihaz Vitrini) canlıya alındı!' : 'Tema 2 (Görsel Ağırlıklı Fullscreen Banner) canlıya alındı!');
  };

  const showNotice = (msg: string) => {
    setSaved(msg);
    setTimeout(() => setSaved(null), 3500);
  };

  const startNew = () => {
    setEditingSlide({
      id: '',
      title: 'YENİ NESİL ANDROID POS',
      subtitle: 'Ödemelerin Geleceği',
      badge: '2026 MODEL',
      description: 'Ultra hızlı dokunmatik ekran ve temassız ödeme teknolojisi.',
      posName: 'Smart POS',
      imageUrl: 'https://www.yazarkasasatisi.com/upload/urunler/hugin-tiger-t300-4g-yazarkasa-pos.png',
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
    showNotice('Spatial slider slaytı başarıyla güncellendi!');
  };

  return (
    <div className="space-y-8 max-w-6xl pb-16">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs tracking-wider uppercase mb-1">
            <Sliders className="w-4 h-4" />
            <span>HERO SLİDER KONFİGÜRASYONU</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Ana Sayfa Slider & Tema Yönetimi
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Ana sayfa giriş slider'ının görünüm temasını seçin veya slayt içeriklerini düzenleyin.
          </p>
        </div>

        <button
          onClick={startNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Slayt Ekle</span>
        </button>
      </div>

      {/* Success Notification */}
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3.5 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saved}</span>
        </div>
      )}

      {/* THEME SELECTION SECTION */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Layout className="w-5 h-5 text-blue-600" />
            <span>Slider Tema Seçimi (Hero Display Theme)</span>
          </h2>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Dinamik Canlı Değişim
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TEMA 1 CARD */}
          <div
            onClick={() => handleSelectTheme('theme1')}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between space-y-4 ${
              currentTheme === 'theme1'
                ? 'border-blue-600 bg-blue-50/40 shadow-xl shadow-blue-600/10'
                : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
            }`}
          >
            {currentTheme === 'theme1' && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CANLIDA AKTİF</span>
              </div>
            )}

            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-black mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">Tema 1: 3D Spatial Cihaz Vitrini</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                Sol tarafta hızlı rozetler ve açıklamalar, sağ tarafta 3D derinlikli POS cihaz kartları. Çoklu ürün öne çıkarmak için idealdir.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600">İnteraktif 3D Kart Sahnesi</span>
              <button
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-extrabold ${
                  currentTheme === 'theme1'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {currentTheme === 'theme1' ? 'Seçili' : 'Bu Temaya Geç'}
              </button>
            </div>
          </div>

          {/* TEMA 2 CARD */}
          <div
            onClick={() => handleSelectTheme('theme2')}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between space-y-4 ${
              currentTheme === 'theme2'
                ? 'border-blue-600 bg-blue-50/40 shadow-xl shadow-blue-600/10'
                : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
            }`}
          >
            {currentTheme === 'theme2' && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CANLIDA AKTİF</span>
              </div>
            )}

            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-black mb-3">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">Tema 2: Görsel Ağırlıklı Fullscreen Banner</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                Koyu cam (glassmorphism) arka plan, dev boyutta yüksek çözünürlüklü ürün görsel şovu, az ve öz vurucu manşet yazısı.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
              <span className="text-indigo-600 font-extrabold">Büyük Görsel & Koyu Tema</span>
              <button
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-extrabold ${
                  currentTheme === 'theme2'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {currentTheme === 'theme2' ? 'Seçili' : 'Bu Temaya Geç'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal / Inline Form */}
      {editingSlide && (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4 text-xs animate-in fade-in">
          <h3 className="text-lg font-black text-slate-900 mb-2">
            {editingSlide.id ? 'Slaytı Düzenle' : 'Yeni Slayt Ekle'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-extrabold text-slate-700 mb-1">POS Cihaz Adı</label>
              <input
                type="text"
                value={editingSlide.posName || ''}
                onChange={e => setEditingSlide({ ...editingSlide, posName: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-extrabold text-slate-700 mb-1">Üst Rozet Metni (Badge)</label>
              <input
                type="text"
                value={editingSlide.badge || ''}
                onChange={e => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-extrabold text-slate-700 mb-1">Ana Manşet Başlığı (Title)</label>
            <input
              type="text"
              value={editingSlide.title || ''}
              onChange={e => setEditingSlide({ ...editingSlide, title: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              required
            />
          </div>

          <div>
            <label className="block font-extrabold text-slate-700 mb-1">Açıklama Metni (Az & Öz)</label>
            <textarea
              rows={2}
              value={editingSlide.description || ''}
              onChange={e => setEditingSlide({ ...editingSlide, description: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            />
          </div>

          <div>
            <label className="block font-extrabold text-slate-700 mb-1">POS Görsel URL (Şeffaf PNG / Render)</label>
            <input
              type="text"
              value={editingSlide.imageUrl || ''}
              onChange={e => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditingSlide(null)}
              className="px-5 py-3 rounded-xl bg-slate-100 font-bold text-slate-600 cursor-pointer"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-extrabold shadow-md cursor-pointer"
            >
              Slaytı Kaydet
            </button>
          </div>
        </form>
      )}

      {/* Slide List Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span>Mevcut Slayt Listesi ({heroSlides.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-4">
                <img src={slide.imageUrl} alt={slide.posName} className="w-20 h-24 object-contain rounded-xl bg-slate-50 p-2 border border-slate-100 shrink-0" />
                <div>
                  <span className="text-[10px] font-extrabold bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full uppercase">{slide.badge}</span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">{slide.posName}</h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">{slide.title}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className={`font-extrabold px-2.5 py-0.5 rounded-full ${slide.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                  {slide.isActive ? 'Aktif' : 'Pasif'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingSlide(slide)}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Düzenle"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteHeroSlide(slide.id)}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
    </div>
  );
}
