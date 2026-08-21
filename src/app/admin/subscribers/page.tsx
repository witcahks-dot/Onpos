'use client';

import React from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Mail, Download } from 'lucide-react';

export default function AdminSubscribersPage() {
  const subscribers = useCMSStore((state) => state.subscribers) || [];

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,E-Posta,Kayıt Tarihi\n" 
      + subscribers.map(s => `"${s.email}","${s.createdAt}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `paypos_bulten_aboneleri_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <span>Bülten Aboneleri Listesi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Web sitesindeki bülten formunu dolduran e-posta aboneleri.</p>
        </div>

        <button
          onClick={exportCSV}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>CSV Olarak İndir</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
            <tr>
              <th className="p-4">E-Posta Adresi</th>
              <th className="p-4">Kayıt Tarihi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subscribers.map((sub, idx) => (
              <tr key={sub.id || idx} className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-900">{sub.email}</td>
                <td className="p-4 text-slate-500">{sub.createdAt}</td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={2} className="p-8 text-center text-slate-400">
                  Henüz bülten abonesi bulunmuyor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
