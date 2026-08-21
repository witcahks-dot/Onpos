'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Image as ImageIcon, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { GalleryItem } from '@/types';

export default function AdminGalleryPage() {
  const { gallery, saveGalleryItem, deleteGalleryItem } = useCMSStore();
  const [editing, setEditing] = useState<Partial<GalleryItem> | null>(null);

  const handleCreateNew = () => {
    setEditing({
      title: '',
      category: 'Kurumsal',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop',
      album: 'Genel',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveGalleryItem(editing);
    setEditing(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <span>Medya Galerisi Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">/galeri sayfasında sergilenen fotoğraf ve video medya albümü.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Medya Ekle</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">{editing.id ? 'Medyayı Düzenle' : 'Yeni Medya Ekle'}</h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Medya Başlığı</label>
              <input
                type="text"
                value={editing.title || ''}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Medya Tipi</label>
              <select
                value={editing.type || 'photo'}
                onChange={(e) => setEditing({ ...editing, type: e.target.value as 'photo' | 'video' })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              >
                <option value="photo">Fotoğraf</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Medya Görsel URL</label>
            <input
              type="text"
              value={editing.url || ''}
              onChange={(e) => setEditing({ ...editing, url: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              required
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg">
              İptal
            </button>
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg flex items-center gap-1">
              <Save className="w-4 h-4" />
              <span>Kaydet</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
            <img src={item.thumbnailUrl || item.url} alt={item.title} className="w-full h-32 object-cover rounded-xl" />
            <div>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase">
                {item.type} • {item.album}
              </span>
              <h4 className="font-bold text-slate-900 text-xs mt-1">{item.title}</h4>
            </div>

            <div className="flex items-center justify-end gap-1 pt-2 border-t border-slate-100">
              <button onClick={() => setEditing(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteGalleryItem(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
