'use client';

import React, { useState, useEffect } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { SlidersHorizontal, MoveUp, MoveDown, Eye, EyeOff, Save, Sparkles, Check, HelpCircle } from 'lucide-react';
import { HomeSectionConfig } from '@/types';

export default function AdminSectionsPage() {
  const { homeSections, updateHomeSections, fetchCMSData } = useCMSStore();
  const [sections, setSections] = useState<HomeSectionConfig[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchCMSData();
  }, [fetchCMSData]);

  useEffect(() => {
    if (homeSections && homeSections.length > 0) {
      // Sort local array by order
      const sorted = [...homeSections].sort((a, b) => a.order - b.order);
      setSections(sorted);
    }
  }, [homeSections]);

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...sections];
    const temp = newArr[index];
    newArr[index] = newArr[index - 1];
    newArr[index - 1] = temp;

    // Recalculate order numbers 1..N
    const reordered = newArr.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    setSections(reordered);
  };

  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const newArr = [...sections];
    const temp = newArr[index];
    newArr[index] = newArr[index + 1];
    newArr[index + 1] = temp;

    // Recalculate order numbers 1..N
    const reordered = newArr.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    setSections(reordered);
  };

  const handleToggleEnabled = (id: string) => {
    const updated = sections.map((sec) =>
      sec.id === id ? { ...sec, enabled: !sec.enabled } : sec
    );
    setSections(updated);
  };

  const handleSave = async () => {
    await updateHomeSections(sections);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-600" />
            <span>Ana Sayfa Modül Sıralama & Görünürlük Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ana sayfadaki bölümlerin sırasını değiştirin, istemediğiniz bölümleri pasif yapıp tamamen gizleyin.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-6 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer w-fit"
        >
          <Save className="w-4 h-4" />
          <span>Sıralama & Durumu Kaydet</span>
        </button>
      </div>

      {saved && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-xs font-bold border border-emerald-200 animate-in fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>✓ Ana sayfa bölüm sıralaması ve aktif/pasif durumları başarıyla güncellendi!</span>
        </div>
      )}

      {/* Interactive Section List */}
      <div className="space-y-3">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              sec.enabled
                ? 'bg-white border-slate-200/90 shadow-xs hover:border-blue-200'
                : 'bg-slate-50/70 border-slate-200 opacity-60'
            }`}
          >
            {/* Left: Section Order Badge & Info */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                  sec.enabled ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-300 text-slate-600'
                }`}
              >
                #{idx + 1}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-sm truncate">{sec.name}</h3>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                      sec.enabled
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    {sec.enabled ? 'Aktif (Gösteriliyor)' : 'Pasif (Gizli)'}
                  </span>
                </div>
                {sec.description && (
                  <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">{sec.description}</p>
                )}
              </div>
            </div>

            {/* Right: Controls (Move Up, Move Down, Toggle Switch) */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              
              {/* Move Up */}
              <button
                type="button"
                onClick={() => handleMoveUp(idx)}
                disabled={idx === 0}
                className="p-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-xl transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                title="Bir Üste Taşı"
              >
                <MoveUp className="w-4 h-4" />
              </button>

              {/* Move Down */}
              <button
                type="button"
                onClick={() => handleMoveDown(idx)}
                disabled={idx === sections.length - 1}
                className="p-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-xl transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                title="Bir Alta Taşı"
              >
                <MoveDown className="w-4 h-4" />
              </button>

              {/* Toggle Active / Passive */}
              <button
                type="button"
                onClick={() => handleToggleEnabled(sec.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  sec.enabled
                    ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                }`}
              >
                {sec.enabled ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Gizle</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Aktif Et</span>
                  </>
                )}
              </button>

            </div>

          </div>
        ))}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-8 py-3.5 rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Tüm Değişiklikleri Kaydet</span>
        </button>
      </div>

    </div>
  );
}
