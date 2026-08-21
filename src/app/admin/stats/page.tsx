'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Award, Save, RefreshCw } from 'lucide-react';
import { TrustStat } from '@/types';

export default function AdminStatsPage() {
  const { trustStats, updateTrustStats } = useCMSStore();
  const [stats, setStats] = useState<TrustStat[]>(trustStats || []);
  const [saved, setSaved] = useState(false);

  const handleChange = (index: number, field: keyof TrustStat, value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTrustStats(stats);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Güven İstatistikleri Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Ana sayfada 4 sütunda gösterilen sayaç ve istatistik kartları.</p>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-xs font-bold border border-emerald-200">
          ✓ Güven istatistikleri başarıyla kaydedildi!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {stats.map((stat, idx) => (
          <div key={stat.id || idx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
            <span className="text-xs font-bold text-blue-600 block">İstatistik #{idx + 1}</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Büyük Rakam / Değer</label>
                <input
                  type="text"
                  value={stat.number}
                  onChange={(e) => handleChange(idx, 'number', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Başlık / Etiket</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleChange(idx, 'label', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Açıklama</label>
                <input
                  type="text"
                  value={stat.desc}
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
          <span>İstatistikleri Kaydet</span>
        </button>
      </form>
    </div>
  );
}
