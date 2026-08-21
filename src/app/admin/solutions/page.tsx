'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Briefcase, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { SolutionItem } from '@/types';

export default function AdminSolutionsPage() {
  const { solutions, saveSolution, deleteSolution } = useCMSStore();
  const [editing, setEditing] = useState<Partial<SolutionItem> | null>(null);

  const handleEdit = (sol: SolutionItem) => {
    setEditing(sol);
  };

  const handleCreateNew = () => {
    setEditing({
      title: '',
      slug: '',
      category: 'Restoran',
      shortDesc: '',
      fullDesc: '',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
      features: [''],
      targetAudience: '',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const slug = editing.slug || editing.title?.toLowerCase().replace(/[^a-z0-0]/g, '-') || 'cozum';
    await saveSolution({ ...editing, slug });
    setEditing(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <span>Sektörel Çözümler Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Restoran, Perakende, Lojistik sektörel ödeme çözümleri CRUD paneli.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Çözüm Ekle</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">{editing.id ? 'Çözümü Düzenle' : 'Yeni Çözüm Ekle'}</h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Çözüm Başlığı</label>
              <input
                type="text"
                value={editing.title || ''}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
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
            <label className="block font-bold text-slate-700 mb-1">Kısa Açıklama</label>
            <input
              type="text"
              value={editing.shortDesc || ''}
              onChange={(e) => setEditing({ ...editing, shortDesc: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Görsel URL</label>
            <input
              type="text"
              value={editing.image || ''}
              onChange={(e) => setEditing({ ...editing, image: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              required
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg"
            >
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
        {solutions.map((sol) => (
          <div key={sol.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-2">
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase">
                {sol.category}
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{sol.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{sol.shortDesc}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleEdit(sol)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"
              >
                <Edit3 className="w-4 h-4" />
                <span>Düzenle</span>
              </button>
              <button
                onClick={() => deleteSolution(sol.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"
              >
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
