'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Building2, Plus, Trash2, Edit3, Save, X, MapPin } from 'lucide-react';
import { ReferenceItem } from '@/types';
import { getDistrictsForCity } from '@/lib/turkeyDistricts';

const turkishCities = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Gaziantep', 'Kayseri',
  'Konya', 'Trabzon', 'Nevşehir', 'Diyarbakır', 'Van', 'Erzurum', 'Balıkesir', 'Denizli',
  'Kocaeli', 'Sakarya', 'Samsun', 'Mersin', 'Muğla', 'Eskişehir', 'Aydın', 'Manisa',
  'Hatay', 'Tekirdağ', 'Zonguldak', 'Çanakkale', 'Rize', 'Ordu', 'Kahramanmaraş'
];

export default function AdminReferencesPage() {
  const { references, saveReference, deleteReference } = useCMSStore();
  const [editing, setEditing] = useState<Partial<ReferenceItem> | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveReference(editing);
    setEditing(null);
  };

  // Get dynamic districts for current selected editing city
  const currentDistricts = editing?.city ? getDistrictsForCity(editing.city) : [];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Referans Yönetimi & İl / İlçe Harita Entegrasyonu</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Türkiye genelindeki iller ve otomatik ilçe listesiyle senkronize referans yönetim ekranı.
          </p>
        </div>

        <button
          onClick={() =>
            setEditing({
              name: '',
              category: 'Restoran',
              city: 'İstanbul',
              district: 'Kadıköy',
              logo: '',
              description: '',
              order: (references.length || 0) + 1,
            })
          }
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Referans Ekle</span>
        </button>
      </div>

      {/* Edit / Add Modal Form */}
      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">{editing.id ? 'Referansı Düzenle' : 'Yeni Referans Ekle'}</h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">İşletme / Firma Adı *</label>
              <input
                type="text"
                placeholder="Örn: Helvacı Ali Cafe"
                value={editing.name || ''}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Sektör / Kategori</label>
              <input
                type="text"
                placeholder="Örn: Restoran, Kafe, Otel, Mağaza"
                value={editing.category || ''}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                required
              />
            </div>
          </div>

          {/* Location City & Dynamic District Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>İl (Harita Şehri) *</span>
              </label>
              <select
                value={editing.city || 'İstanbul'}
                onChange={(e) => {
                  const newCity = e.target.value;
                  const newDistricts = getDistrictsForCity(newCity);
                  setEditing({ ...editing, city: newCity, district: newDistricts[0] || 'Merkez' });
                }}
                className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold cursor-pointer"
              >
                {turkishCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>İlçe / Semt * ({currentDistricts.length} İlçe Mevcut)</span>
              </label>
              <select
                value={editing.district || currentDistricts[0] || 'Merkez'}
                onChange={(e) => setEditing({ ...editing, district: e.target.value })}
                className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold cursor-pointer"
              >
                {currentDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Logo Görsel URL (Opsiyonel)</label>
            <input
              type="text"
              placeholder="https://..."
              value={editing.logo || ''}
              onChange={(e) => setEditing({ ...editing, logo: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Açıklama Metni</label>
            <input
              type="text"
              placeholder="Android POS kullanımı..."
              value={editing.description || ''}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            />
          </div>

          <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl">
              İptal
            </button>
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5">
              <Save className="w-4 h-4" />
              <span>Kaydet ve Haritada Yayınla</span>
            </button>
          </div>
        </form>
      )}

      {/* References Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {references.map((ref) => (
          <div key={ref.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm text-xs">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="bg-red-50 text-red-700 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{ref.city || 'İstanbul'} / {ref.district || 'Kadıköy'}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">#{ref.order}</span>
              </div>
              
              <h4 className="font-bold text-slate-900 text-sm mt-2">{ref.name}</h4>
              <p className="text-slate-500 font-normal">{ref.category} - {ref.description}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setEditing(ref)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteReference(ref.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
