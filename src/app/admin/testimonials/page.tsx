'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Star, Plus, Trash2, Edit3, Save, X, CheckCircle, XCircle } from 'lucide-react';
import { TestimonialItem } from '@/types';

export default function AdminTestimonialsPage() {
  const { testimonials, saveTestimonial, deleteTestimonial } = useCMSStore();
  const [editing, setEditing] = useState<Partial<TestimonialItem> | null>(null);

  const handleCreateNew = () => {
    setEditing({
      authorName: '',
      authorTitle: 'İşletme Sahibi',
      company: '',
      city: 'İstanbul',
      comment: '',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      date: new Date().toLocaleDateString('tr-TR'),
      isApproved: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveTestimonial(editing);
    setEditing(null);
  };

  const toggleApproval = async (test: TestimonialItem) => {
    await saveTestimonial({ ...test, isApproved: !test.isApproved });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>Müşteri Yorumları Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Ana sayfadaki müşteri yorumları carousel'i ve onay sistemi.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Yorum Ekle</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">{editing.id ? 'Yorumu Düzenle' : 'Yeni Yorum Ekle'}</h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Müşteri Ad Soyad</label>
              <input
                type="text"
                value={editing.authorName || ''}
                onChange={(e) => setEditing({ ...editing, authorName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Unvan / Şirket</label>
              <input
                type="text"
                value={editing.company || ''}
                onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Yorum Metni</label>
            <textarea
              rows={3}
              value={editing.comment || ''}
              onChange={(e) => setEditing({ ...editing, comment: e.target.value })}
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
        {testimonials.map((test) => (
          <div key={test.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{test.authorName}</span>
                <button
                  onClick={() => toggleApproval(test)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    test.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {test.isApproved ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  <span>{test.isApproved ? 'Yayında' : 'Onay Bekliyor'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 font-semibold">{test.company} • {test.city}</p>
              <p className="text-xs text-slate-700 italic">"{test.comment}"</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setEditing(test)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-1">
                <Edit3 className="w-4 h-4" />
                <span>Düzenle</span>
              </button>
              <button onClick={() => deleteTestimonial(test.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold flex items-center gap-1">
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
