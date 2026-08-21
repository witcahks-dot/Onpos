'use client';

import React, { useState } from 'react';
import { ShieldCheck, Send, CheckCircle2, AlertCircle, FileText, Upload } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function QuoteFormSection() {
  const submitQuoteRequest = useCMSStore((state) => state.submitQuoteRequest);
  const products = useCMSStore((state) => state.products);
  const services = useCMSStore((state) => state.services);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    selectedProduct: '',
    selectedService: '',
    message: '',
    kvkkAccepted: false,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      setErrorMessage('Lütfen ad soyad, telefon ve e-posta alanlarını doldurunuz.');
      setStatus('error');
      return;
    }

    if (!formData.kvkkAccepted) {
      setErrorMessage('Devam etmek için KVKK Aydınlatma Metni onayını vermelisiniz.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const success = await submitQuoteRequest(formData);
    if (success) {
      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        city: '',
        selectedProduct: '',
        selectedService: '',
        message: '',
        kvkkAccepted: false,
      });
    } else {
      setStatus('error');
      setErrorMessage('Teklif talebiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.');
    }
  };

  return (
    <section id="teklif-al" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Hızlı Başvuru & Özel Teklif</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              İşletmeniz için en uygun <br />
              <span className="text-blue-400">POS teklifini hemen alın.</span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Formu doldurun; uzman ekibimiz 15 dakika içinde işletmenizin ciro hacmine özel komisyon oranları ve cihaz paketleriyle sizi arasın.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                <span>%0.99\'dan başlayan komisyon oranları</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Aynı gün içinde adreste ücretsiz yerinde kurulum</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Taahhütsüz ve ücretsiz ikame cihaz imkanı</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white text-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-100">
            {status === 'success' ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Teklif Talebiniz Başarıyla Alındı!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Talebiniz müşteri temsilcimize ulaştı. En geç 15 dakika içerisinde sizinle iletişime geçeceğiz.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 bg-blue-600 text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Yeni Form Doldur
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Kurumsal Teklif Formu</h3>
                  <p className="text-xs text-slate-500">Tüm alanları eksiksiz doldurarak hızlı teklif oluşturun.</p>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 text-red-700 text-xs font-semibold p-3.5 rounded-xl border border-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ad Soyad *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Örn: Ahmet Yılmaz"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Telefon Numarası *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Örn: 0532 000 00 00"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">E-Posta Adresi *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ahmet@firmamiz.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Firma / İşletme Adı</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Örn: Karaca Gıda Ltd."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">İlgilendiğiniz Ürün</label>
                    <select
                      name="selectedProduct"
                      value={formData.selectedProduct}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">-- POS Cihazı Seçin --</option>
                      {products.map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">İlgilendiğiniz Hizmet</label>
                    <select
                      name="selectedService"
                      value={formData.selectedService}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">-- Hizmet Seçin --</option>
                      {services.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mesajınız / Ek Notlar</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="İşletmenizdeki şube sayısı veya özel istekleriniz..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* KVKK Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="kvkkAccepted"
                    name="kvkkAccepted"
                    checked={formData.kvkkAccepted}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor="kvkkAccepted" className="text-[11px] text-slate-600 leading-tight">
                    <a href="/kurumsal/kvkk" target="_blank" className="text-blue-600 underline font-semibold">KVKK Aydınlatma Metni</a>'ni okudum ve kişisel verilerimin işlenmesini onaylıyorum.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <span>Teklif Gönderiliyor...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Teklif Talebini Gönder</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
