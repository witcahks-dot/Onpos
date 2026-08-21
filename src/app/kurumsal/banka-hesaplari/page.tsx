'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useCMSStore } from '@/lib/cms-store';
import { Copy, Check, Building2, CreditCard } from 'lucide-react';

export default function BankAccountsPage() {
  const bankAccounts = useCMSStore((state) => state.bankAccounts);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyIban = (id: string, iban: string) => {
    navigator.clipboard.writeText(iban);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Kurumsal', href: '/kurumsal/hakkimizda' }, { label: 'Banka Hesapları' }]} />

        <section className="bg-white py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Finansal Bilgiler</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Kurumsal <span className="text-gradient-blue">Banka Hesaplarımız</span>
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Cihaz alımı, servis hizmetleri ve fatura ödemeleriniz için şirketimize ait resmi banka hesap numaraları ve IBAN bilgileri.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {bankAccounts.map((acc) => (
              <div
                key={acc.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {acc.logo && acc.logo.trim() !== '' ? (
                      <img src={acc.logo} alt={acc.bankName} className="h-8 object-contain rounded" />
                    ) : (
                      <span className="text-base font-extrabold text-slate-900">{acc.bankName}</span>
                    )}
                    <span className="text-xs font-bold text-slate-400">({acc.currency})</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{acc.bankName} — {acc.branch}</h3>
                  <p className="text-xs text-slate-500 font-medium">Hesap Sahibi: <strong className="text-slate-800">{acc.accountHolder}</strong></p>
                </div>

                <div className="w-full sm:w-auto bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">IBAN Numarası</span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-slate-900">{acc.iban}</span>
                  </div>

                  <button
                    onClick={() => copyIban(acc.id, acc.iban)}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
                    title="IBAN Kopyala"
                  >
                    {copiedId === acc.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
