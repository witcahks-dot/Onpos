'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Building2, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { DealerBranch } from '@/types';

export default function AdminDealersPage() {
  const { dealers, saveDealer, deleteDealer } = useCMSStore();
  const [editing, setEditing] = useState<Partial<DealerBranch> | null>(null);

  const handleCreateNew = () => {
    setEditing({
      title: '',
      city: 'İstanbul',
      region: 'Marmara',
      address: '',
      phone: '0850 308 00 00',
      email: 'destek@paypos.com.tr',
      hours: 'Pzt - Cmt: 08:30 - 18:30',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveDealer(editing);
    setEditing(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Bayiler & Şubeler Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">/kurumsal/bayiler sayfasındaki şehir filtreli şube rehberi.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Şube Ekle</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">{editing.id ? 'Şubeyi Düzenle' : 'Yeni Şube Ekle'}</h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Şube Başlığı</label>
              <input
                type="text"
                value={editing.title || ''}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Şehir</label>
              <input
                type="text"
                value={editing.city || ''}
                onChange={(e) => setEditing({ ...editing, city: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Adres</label>
            <input
              type="text"
              value={editing.address || ''}
              onChange={(e) => setEditing({ ...editing, address: e.target.value })}
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
        {dealers.map((dlr) => (
          <div key={dlr.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm">
            <div>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase">
                {dlr.city} • {dlr.region}
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">{dlr.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{dlr.address}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setEditing(dlr)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-1">
                <Edit3 className="w-4 h-4" />
                <span>Düzenle</span>
              </button>
              <button onClick={() => deleteDealer(dlr.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold flex items-center gap-1">
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
