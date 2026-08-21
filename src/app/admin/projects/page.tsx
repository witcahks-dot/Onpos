'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { CheckSquare, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { ProjectItem } from '@/types';

export default function AdminProjectsPage() {
  const { projects, saveProject, deleteProject } = useCMSStore();
  const [editing, setEditing] = useState<Partial<ProjectItem> | null>(null);

  const handleCreateNew = () => {
    setEditing({
      title: '',
      slug: '',
      category: 'Perakende',
      client: '',
      location: 'İstanbul',
      status: 'Tamamlandı',
      completionDate: '2026',
      coverImage: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop',
      gallery: [],
      description: '',
      utilizedProducts: [],
      utilizedServices: [],
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const slug = editing.slug || editing.title?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'proje';
    await saveProject({ ...editing, slug });
    setEditing(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-600" />
            <span>Projelerimiz Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Kurumsal entegrasyon projeleri ve vaka analizleri CRUD paneli.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Proje Ekle</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">{editing.id ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}</h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Proje Başlığı</label>
              <input
                type="text"
                value={editing.title || ''}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Müşteri / Kurum</label>
              <input
                type="text"
                value={editing.client || ''}
                onChange={(e) => setEditing({ ...editing, client: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori</label>
              <input
                type="text"
                value={editing.category || ''}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Lokasyon</label>
              <input
                type="text"
                value={editing.location || ''}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tamamlanma Tarihi</label>
              <input
                type="text"
                value={editing.completionDate || ''}
                onChange={(e) => setEditing({ ...editing, completionDate: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Kapak Görsel URL</label>
            <input
              type="text"
              value={editing.coverImage || ''}
              onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm">
            <div>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase">
                {proj.category}
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">{proj.title}</h4>
              <p className="text-xs text-slate-500">Müşteri: {proj.client} • {proj.location}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setEditing(proj)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-1">
                <Edit3 className="w-4 h-4" />
                <span>Düzenle</span>
              </button>
              <button onClick={() => deleteProject(proj.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold flex items-center gap-1">
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
