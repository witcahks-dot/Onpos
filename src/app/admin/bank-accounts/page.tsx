'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { CreditCard, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { BankAccount } from '@/types';

export default function AdminBankAccountsPage() {
  const { bankAccounts, saveBankAccount, deleteBankAccount } = useCMSStore();
  const [editing, setEditing] = useState<Partial<BankAccount> | null>(null);

  const handleCreateNew = () => {
    setEditing({
      bankName: 'Garanti BBVA',
      branch: 'Levent Kurumsal Şubesi',
      accountHolder: 'PAYPOS ÖDEME TEKNOLOJİLERİ A.Ş.',
      iban: 'TR00 0000 0000 0000 0000 0000 00',
      currency: 'TRY',
      logo: 'https://dummyimage.com/120x40/047857/ffffff&text=BANKA',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveBankAccount(editing);
    setEditing(null);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span>Banka Hesapları & IBAN Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">/kurumsal/banka-hesaplari sayfasında tek tıkla kopyalanabilir banka bilgileri.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Banka Hesabı Ekle</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">{editing.id ? 'Banka Hesabını Düzenle' : 'Yeni Banka Hesabı Ekle'}</h3>
            <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Banka Adı</label>
              <input
                type="text"
                value={editing.bankName || ''}
                onChange={(e) => setEditing({ ...editing, bankName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Şube Bilgisi</label>
              <input
                type="text"
                value={editing.branch || ''}
                onChange={(e) => setEditing({ ...editing, branch: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Hesap Sahibi (Alıcı)</label>
            <input
              type="text"
              value={editing.accountHolder || ''}
              onChange={(e) => setEditing({ ...editing, accountHolder: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">IBAN Numarası</label>
            <input
              type="text"
              value={editing.iban || ''}
              onChange={(e) => setEditing({ ...editing, iban: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
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
        {bankAccounts.map((acc) => (
          <div key={acc.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 text-sm block">{acc.bankName}</span>
              <span className="text-xs text-slate-500 block">{acc.branch}</span>
              <span className="text-xs font-mono font-bold text-blue-600 block pt-1">{acc.iban}</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setEditing(acc)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-1">
                <Edit3 className="w-4 h-4" />
                <span>Düzenle</span>
              </button>
              <button onClick={() => deleteBankAccount(acc.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold flex items-center gap-1">
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
