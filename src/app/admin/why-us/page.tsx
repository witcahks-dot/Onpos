'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Award, Save } from 'lucide-react';
import { WhyUsItem } from '@/types';

export default function AdminWhyUsPage() {
  const { whyUs, updateWhyUs } = useCMSStore();
  const [items, setItems] = useState<WhyUsItem[]>(whyUs || []);
  const [saved, setSaved] = useState(false);

  const handleChange = (index: number, field: keyof WhyUsItem, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateWhyUs(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          <span>Neden Biz? Avantaj Kartları Yönetimi</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">Ana sayfadaki 01-04 numaralı kurumsal avantaj kartları.</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-xs font-bold border border-emerald-200">
          ✓ Neden Biz kartları kaydedildi!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
            <span className="text-xs font-bold text-blue-600 block">Kart #{item.num}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kart Başlığı</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChange(idx, 'title', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Açıklama Metni</label>
                <input
                  type="text"
                  value={item.desc}
                  onChange={(e) => handleChange(idx, 'desc', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Kartları Kaydet</span>
        </button>
      </form>
    </div>
  );
}
