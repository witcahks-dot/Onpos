'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { HelpCircle, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { FaqItem } from '@/types';

export default function AdminFaqsPage() {
  const { faqs, saveFaq, deleteFaq } = useCMSStore();
  const [editing, setEditing] = useState<Partial<FaqItem> | null>(null);

  const handleCreateNew = () => {
    setEditing({
      question: '',
      answer: '',
      category: 'POS',
      order: (faqs?.length || 0) + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveFaq(editing);
    setEditing(null);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span>Sıkça Sorulan Sorular (SSS) Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">SSS sayfasında ve ana sayfadaki akordeon SSS soruları.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Soru Ekle</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">{editing.id ? 'Soruyu Düzenle' : 'Yeni Soru Ekle'}</h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Soru Metni</label>
            <input
              type="text"
              value={editing.question || ''}
              onChange={(e) => setEditing({ ...editing, question: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Cevap Metni</label>
            <textarea
              rows={3}
              value={editing.answer || ''}
              onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
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

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-start justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase">
                {faq.category}
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
              <p className="text-xs text-slate-600">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => setEditing(faq)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteFaq(faq.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
