'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Cloud, Save } from 'lucide-react';
import { CloudPanelConfig } from '@/types';

export default function AdminCloudPanelPage() {
  const { cloudPanel, updateCloudPanel } = useCMSStore();
  const [formData, setFormData] = useState<CloudPanelConfig>(
    cloudPanel || {
      badge: 'Bulut PayOS Altyapısı',
      title: 'Tüm POS cihazlarınızı tek panellerden canlı yönetin.',
      description: 'Bulut tabanlı PayOS portalı metni.',
      todayRevenue: '482.950 ₺',
      todayGrowth: '↑ %14 artış',
      activeDevicesCount: '128 / 128',
      uptimePercent: '%100 Online',
      txSpeed: '0.4 Sn',
    }
  );
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCloudPanel(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-blue-600" />
          <span>Bulut Platform Paneli Yönetimi</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">Ana sayfadaki koyu temalı PayOS dashboard önizleme alanı metinleri ve canlı sayaç rakamları.</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-xs font-bold border border-emerald-200">
          ✓ Bulut platform paneli verileri kaydedildi!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs shadow-sm">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Rozet Metni</label>
          <input
            type="text"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Ana Başlık</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Açıklama</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Bugün Ciro Metni</label>
            <input
              type="text"
              value={formData.todayRevenue}
              onChange={(e) => setFormData({ ...formData, todayRevenue: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Büyüme Oranı Metni</label>
            <input
              type="text"
              value={formData.todayGrowth}
              onChange={(e) => setFormData({ ...formData, todayGrowth: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Aktif Cihaz Sayısı Metni</label>
            <input
              type="text"
              value={formData.activeDevicesCount}
              onChange={(e) => setFormData({ ...formData, activeDevicesCount: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">İşlem Hızı Metni</label>
            <input
              type="text"
              value={formData.txSpeed}
              onChange={(e) => setFormData({ ...formData, txSpeed: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Değişiklikleri Kaydet</span>
        </button>
      </form>
    </div>
  );
}
