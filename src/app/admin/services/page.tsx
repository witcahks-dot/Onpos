'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Layers, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { ServiceItem } from '@/types';

export default function AdminServicesPage() {
  const { services, saveService, deleteService } = useCMSStore();
  const [editing, setEditing] = useState<Partial<ServiceItem> | null>(null);

  const handleCreateNew = () => {
    setEditing({
      name: '',
      slug: '',
      category: 'Ödeme Teknolojileri',
      iconName: 'CreditCard',
      shortDesc: '',
      fullDesc: '',
      features: ['24 Saat Kurulum', 'Ücretsiz Bakım'],
      benefits: ['Düşük Komisyon', '7/24 Saha Desteği'],
      images: ['https://images.unsplash.com/photo-1556742049-0a67daf40d3a?q=80&w=800&auto=format&fit=crop'],
      order: (services?.length || 0) + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const slug = editing.slug || editing.name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'hizmet';
    await saveService({ ...editing, slug });
    setEditing(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>Hizmetlerimiz Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Ana sayfada ve /hizmetler sayfasında gösterilen kurumsal hizmetlerin CRUD paneli.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Hizmet Ekle</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">{editing.id ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}</h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Hizmet Adı</label>
              <input
                type="text"
                value={editing.name || ''}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori</label>
              <input
                type="text"
                value={editing.category || ''}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Kısa Açıklama (Ana Sayfa Kartı)</label>
            <input
              type="text"
              value={editing.shortDesc || ''}
              onChange={(e) => setEditing({ ...editing, shortDesc: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Detaylı Açıklama (Hizmet Sayfası)</label>
            <textarea
              rows={3}
              value={editing.fullDesc || ''}
              onChange={(e) => setEditing({ ...editing, fullDesc: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Görsel URL (Görsel Odaklı Şık Kart)</label>
            <div className="space-y-2">
              <input
                type="text"
                value={editing.images?.[0] || ''}
                onChange={(e) => setEditing({ ...editing, images: [e.target.value] })}
                placeholder="https://... veya /images/..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                required
              />

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, images: ['/images/corporate-intro-demo.jpg'] })}
                  className="px-3 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-[11px] font-bold rounded-lg text-slate-700 transition-colors"
                >
                  🖼️ Demo POS Kafe Görseli
                </button>
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, images: ['https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop'] })}
                  className="px-3 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-[11px] font-bold rounded-lg text-slate-700 transition-colors"
                >
                  💳 Ödeme Kartı Görseli
                </button>
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, images: ['https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop'] })}
                  className="px-3 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-[11px] font-bold rounded-lg text-slate-700 transition-colors"
                >
                  🛠️ Teknik Servis Görseli
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg cursor-pointer">
              İptal
            </button>
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer shadow-md">
              <Save className="w-4 h-4" />
              <span>Kaydet</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((srv) => (
          <div key={srv.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase">
                {srv.category}
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">{srv.name}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{srv.shortDesc}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setEditing(srv)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-1">
                <Edit3 className="w-4 h-4" />
                <span>Düzenle</span>
              </button>
              <button onClick={() => deleteService(srv.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold flex items-center gap-1">
                <Trash2 className="w-4 h-4" />
                <span>Sil</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
