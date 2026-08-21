'use client';

import React, { useState, useEffect } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Building, Save, ShieldCheck, Award, Target, Plus, Trash2 } from 'lucide-react';
import { AboutPageData } from '@/types';

export default function AdminAboutPage() {
  const { aboutPage, saveCMSSection } = useCMSStore();
  const [form, setForm] = useState<AboutPageData>({
    title: '',
    subtitle: '',
    heroBadge: '',
    heroDescription: '',
    storyTitle: '',
    storyContent: '',
    visionTitle: '',
    visionContent: '',
    missionTitle: '',
    missionContent: '',
    values: [],
    certifications: [],
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (aboutPage) {
      setForm(aboutPage);
    }
  }, [aboutPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveCMSSection('aboutPage', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddValue = () => {
    setForm({
      ...form,
      values: [...(form.values || []), { title: 'Yeni Değer', desc: 'Açıklama' }],
    });
  };

  const handleRemoveValue = (index: number) => {
    const updated = [...(form.values || [])];
    updated.splice(index, 1);
    setForm({ ...form, values: updated });
  };

  const handleAddCert = () => {
    setForm({
      ...form,
      certifications: [
        ...(form.certifications || []),
        { title: 'Yeni Sertifika', issuer: 'Düzenleyen Kurum', badge: 'RESMİ ONAYLI' },
      ],
    });
  };

  const handleRemoveCert = (index: number) => {
    const updated = [...(form.certifications || [])];
    updated.splice(index, 1);
    setForm({ ...form, certifications: updated });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            <span>Hakkımızda Sayfası Özel Yönetim Paneli (`/kurumsal/hakkimizda`)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Bu ekran doğrudan bağımsız `/kurumsal/hakkimizda` sayfasının içeriklerini düzenler. Ana sayfa verileriyle karışmaz.
          </p>
        </div>

        {saved && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full animate-in fade-in">
            ✓ Değişiklikler Kaydedildi!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Section 1: Hero Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">1. Sayfa Hero Üst Başlık & Giriş Metni</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Üst Rozet Metni</label>
              <input
                type="text"
                value={form.heroBadge || ''}
                onChange={(e) => setForm({ ...form, heroBadge: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Alt Başlık (Subtitle)</label>
              <input
                type="text"
                value={form.subtitle || ''}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Ana Sayfa Başlığı (H1)</label>
            <input
              type="text"
              value={form.title || ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Giriş Açıklama Paragrafı</label>
            <textarea
              rows={3}
              value={form.heroDescription || ''}
              onChange={(e) => setForm({ ...form, heroDescription: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            />
          </div>
        </div>

        {/* Section 2: Story, Vision & Mission */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">2. Hikayemiz, Vizyon & Misyon</h3>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Hikayemiz Başlığı</label>
            <input
              type="text"
              value={form.storyTitle || ''}
              onChange={(e) => setForm({ ...form, storyTitle: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Hikayemiz İçerik Metni</label>
            <textarea
              rows={4}
              value={form.storyContent || ''}
              onChange={(e) => setForm({ ...form, storyContent: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Vizyon İçeriği</label>
              <textarea
                rows={3}
                value={form.visionContent || ''}
                onChange={(e) => setForm({ ...form, visionContent: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Misyon İçeriği</label>
              <textarea
                rows={3}
                value={form.missionContent || ''}
                onChange={(e) => setForm({ ...form, missionContent: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Core Values Grid */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900 text-sm">3. Temel Kurumsal Değerler</h3>
            <button
              type="button"
              onClick={handleAddValue}
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Değer Ekle</span>
            </button>
          </div>

          <div className="space-y-3">
            {(form.values || []).map((val, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="text"
                  placeholder="Başlık"
                  value={val.title}
                  onChange={(e) => {
                    const updated = [...form.values];
                    updated[idx].title = e.target.value;
                    setForm({ ...form, values: updated });
                  }}
                  className="w-1/3 p-2 bg-white border border-slate-200 rounded-lg font-bold"
                />
                <input
                  type="text"
                  placeholder="Açıklama"
                  value={val.desc}
                  onChange={(e) => {
                    const updated = [...form.values];
                    updated[idx].desc = e.target.value;
                    setForm({ ...form, values: updated });
                  }}
                  className="flex-1 p-2 bg-white border border-slate-200 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveValue(idx)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Certifications */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900 text-sm">4. Lisans & Güvenlik Sertifikaları</h3>
            <button
              type="button"
              onClick={handleAddCert}
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Sertifika Ekle</span>
            </button>
          </div>

          <div className="space-y-3">
            {(form.certifications || []).map((cert, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 items-center">
                <input
                  type="text"
                  placeholder="Sertifika İsmi"
                  value={cert.title}
                  onChange={(e) => {
                    const updated = [...form.certifications];
                    updated[idx].title = e.target.value;
                    setForm({ ...form, certifications: updated });
                  }}
                  className="p-2 bg-white border border-slate-200 rounded-lg font-bold"
                />
                <input
                  type="text"
                  placeholder="Düzenleyen Kurum"
                  value={cert.issuer}
                  onChange={(e) => {
                    const updated = [...form.certifications];
                    updated[idx].issuer = e.target.value;
                    setForm({ ...form, certifications: updated });
                  }}
                  className="p-2 bg-white border border-slate-200 rounded-lg"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Rozet (Örn: RESMİ ONAYLI)"
                    value={cert.badge}
                    onChange={(e) => {
                      const updated = [...form.certifications];
                      updated[idx].badge = e.target.value;
                      setForm({ ...form, certifications: updated });
                    }}
                    className="p-2 bg-white border border-slate-200 rounded-lg w-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCert(idx)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Hakkımızda Sayfasını Güncelle & Yayınla</span>
          </button>
        </div>
      </form>
    </div>
  );
}
