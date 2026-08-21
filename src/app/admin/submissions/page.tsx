'use client';

import React from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { QuoteSubmission } from '@/types';
import { Inbox, Phone, Mail, Building, Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function AdminSubmissionsPage() {
  const { submissions, updateSubmissionStatus } = useCMSStore();

  const handleStatusChange = (id: string, status: QuoteSubmission['status']) => {
    updateSubmissionStatus(id, status);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Gelen Teklif Talepleri</h1>
        <p className="text-xs text-slate-500 mt-1">Siteden başvuru yapan müşterilerin taleplerini inceleyin ve durumlarını güncelleyin.</p>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">Henüz teklif talebi bulunmamaktadır.</h3>
        </div>
      ) : (
        <div className="space-y-4 text-xs">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{sub.fullName}</h3>
                  <p className="text-slate-500 font-medium">{sub.company || 'Bireysel Başvuru'} — {sub.city || 'Şehir Belirtilmedi'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">{sub.createdAt}</span>
                  <select
                    value={sub.status}
                    onChange={(e) => handleStatusChange(sub.id, e.target.value as QuoteSubmission['status'])}
                    className="p-2 rounded-xl font-bold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Yeni">Yeni</option>
                    <option value="İnceleniyor">İnceleniyor</option>
                    <option value="Tamamlandı">Tamamlandı</option>
                    <option value="İptal">İptal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Telefon</span>
                    <span className="font-bold text-slate-800">{sub.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">E-Posta</span>
                    <span className="font-bold text-slate-800">{sub.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Talep Edilen Cihaz</span>
                    <span className="font-bold text-slate-800">{sub.selectedProduct || 'Genel Teklif'}</span>
                  </div>
                </div>
              </div>

              {sub.message && (
                <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">Müşteri Notu:</span>
                  <p className="text-slate-700 leading-relaxed">{sub.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
