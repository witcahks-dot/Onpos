'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { cleanPhoneNumber, buildWhatsAppLink } from '@/lib/data-normalizers';

export default function FintechContactPage() {
  const { settings, submitQuoteRequest } = useCMSStore();
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    city: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) return;
    setStatus('submitting');
    await submitQuoteRequest({
      ...form,
      selectedService: 'Genel İletişim',
      selectedProduct: 'İletişim Formu',
      kvkkAccepted: true,
    });
    setStatus('success');
  };

  const waLink = buildWhatsAppLink(settings.quickContactWhatsapp || settings.socialLinks?.whatsapp || settings.phone);

  return (
    <FintechThemeShell>
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span>7/24 İletişim ve Destek</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Bizimle İletişime Geçin
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-medium">
            Yeni nesil POS cihazları, özel komisyon oranları ve kurumsal iş birlikleri için uzman ekibimize ulaşın.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Info Cards Left */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-6">
                <h3 className="text-lg font-black text-slate-950">İletişim Bilgileri</h3>
                
                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-950 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 block">Çağrı Merkezi</span>
                      <a href={`tel:${settings.phone || '08503080000'}`} className="font-black text-slate-950 text-sm hover:text-blue-600">
                        {settings.phoneFormatted || '0850 308 00 00'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-950 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 block">E-Posta</span>
                      <a href={`mailto:${settings.email || 'info@onpos.com.tr'}`} className="font-black text-slate-950 hover:text-blue-600">
                        {settings.email || 'info@onpos.com.tr'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-950 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 block">Genel Merkez</span>
                      <span className="font-medium text-slate-700 leading-relaxed block">
                        {settings.address || 'Merkez Mah. Fintek Plaza No:12 Şişli / İstanbul'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-950 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 block">Çalışma Saatleri</span>
                      <span className="font-medium text-slate-700">
                        {settings.workingHours || 'Pazartesi - Cumartesi: 08:30 - 19:00'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-full transition-all text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Canlı Destek Hattı</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Form Right */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              <div className="space-y-2 mb-6">
                <h3 className="text-xl font-black text-slate-950">Bize Mesaj Gönderin</h3>
                <p className="text-xs text-slate-500 font-medium">Formu doldurun, müşteri temsilcimiz en kısa sürede sizi arasın.</p>
              </div>

              {status === 'success' ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-black text-emerald-950">Mesajınız Alındı!</h4>
                  <p className="text-xs text-emerald-800">Müşteri temsilcimiz en kısa sürede sizinle iletişime geçecektir.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-xs font-bold text-emerald-700 underline pt-2"
                  >
                    Yeni mesaj gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Ad Soyad *</label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={e => setForm({ ...form, fullName: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-950"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Telefon Numarası *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-950"
                        placeholder="05XX XXX XX XX"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">E-Posta</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-950"
                        placeholder="ornek@sirket.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Şirket / Firma Adı</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-950"
                        placeholder="Firma Ünvanı"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Mesajınız</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-950 resize-none"
                      placeholder="Talebiniz veya ilgilendiğiniz POS modeli..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-slate-950 hover:bg-slate-800 text-white font-black py-3.5 rounded-full transition-all text-xs active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{status === 'submitting' ? 'Gönderiliyor...' : 'Mesajı Gönder'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </FintechThemeShell>
  );
}
