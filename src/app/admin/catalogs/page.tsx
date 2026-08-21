'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { FileText, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { ECatalog } from '@/types';

export default function AdminCatalogsPage() {
  const { catalogs, saveCatalog, deleteCatalog } = useCMSStore();
  const [editing, setEditing] = useState<Partial<ECatalog> | null>(null);

  const handleCreateNew = () => {
    setEditing({
      title: '',
      coverImage: 'https://images.unsplash.com/photo-1556742049-0a67daf40d3a?q=80&w=400&auto=format&fit=crop',
      pdfUrl: '/docs/paypos-2026-katalog.pdf',
      description: '',
      fileSize: '14 MB',
      updatedAt: new Date().toISOString().split('T')[0],
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveCatalog(editing);
    setEditing(null);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>E-Katalog PDF Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">/kurumsal/e-katalog sayfasında indirmeye sunulan PDF broşür ve kataloglar.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Katalog Ekle</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">{editing.id ? 'Kataloğu Düzenle' : 'Yeni Katalog Ekle'}</h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Katalog Başlığı</label>
            <input
              type="text"
              value={editing.title || ''}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">PDF İndirme Bağlantısı (URL)</label>
            <input
              type="text"
              value={editing.pdfUrl || ''}
              onChange={(e) => setEditing({ ...editing, pdfUrl: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
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

      <div className="space-y-3">
        {catalogs.map((cat) => (
          <div key={cat.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">{cat.title}</h4>
              <p className="text-xs text-slate-500 font-mono">{cat.pdfUrl} ({cat.fileSize})</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => setEditing(cat)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteCatalog(cat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
