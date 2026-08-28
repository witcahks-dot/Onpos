'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import {
  Save,
  CheckCircle2,
  Palette,
  Layout,
  Sparkles,
  Sliders,
  Image as ImageIcon,
  Eye,
  SlidersHorizontal,
  Check,
  MessageCircle,
  Phone,
  PhoneCall,
  Monitor
} from 'lucide-react';
import { ThemeId } from '@/types';
import { AlertCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useCMSStore();
  const [form, setForm] = useState({
    ...settings,
    themeId: (settings.themeId || 'theme-existing') as ThemeId,
    logoHeight: settings.logoHeight || 40,
    showLogoText: settings.showLogoText !== false,
    showQuickContactButtons: settings.showQuickContactButtons !== false,
    quickContactPosition: settings.quickContactPosition || 'left',
    quickContactPhone: settings.quickContactPhone || settings.phoneFormatted || '0530 417 15 65',
    quickContactWhatsapp: settings.quickContactWhatsapp || '905304171565',
    quickContactMessage: settings.quickContactMessage || 'Merhaba, POS cihazları ve ödeme çözümleri hakkında hızlı bilgi almak istiyorum.',
  });
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync form when settings are hydrated from API
  React.useEffect(() => {
    if (settings) {
      setForm(prev => ({
        ...prev,
        ...settings,
        themeId: (settings.themeId || 'theme-existing') as ThemeId,
        logoHeight: settings.logoHeight || 40,
        showLogoText: settings.showLogoText !== false,
        showQuickContactButtons: settings.showQuickContactButtons !== false,
        quickContactPosition: settings.quickContactPosition || 'left',
        quickContactPhone: settings.quickContactPhone || settings.phoneFormatted || '0530 417 15 65',
        quickContactWhatsapp: settings.quickContactWhatsapp || '905304171565',
        quickContactMessage: settings.quickContactMessage || 'Merhaba, POS cihazları ve ödeme çözümleri hakkında hızlı bilgi almak istiyorum.',
      }));
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number' || name === 'logoHeight') {
      setForm(prev => ({ ...prev, [name]: Number(value) }));
    } else if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [socialKey]: value },
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      await updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Ayarlar kaydedilirken bir hata oluştu.';
      setErrorMsg(msg);
    }
  };

  const stockLogos = [
    { name: 'Orijinal Yazarkasa Satış Logosu', url: 'https://www.yazarkasasatisi.com/upload/logos/POSLOGO.jpg' },
    { name: 'Vektörel Kalkan Rozeti', url: '/images/logo.svg' },
    { name: 'Düz Metin & Şık İkon', url: '' },
  ];

  const colorPresets = [
    { id: 'corporate-blue', name: 'Kurumsal Mavi', primary: '#2563eb', accent: '#1e3a8a', desc: 'Klasik Fintek & Güven Rengi' },
    { id: 'indigo-violet', name: 'İnovatif İndigo', primary: '#4f46e5', accent: '#312e81', desc: 'Modern & Teknolojik İmaj' },
    { id: 'emerald-teal', name: 'Prestij Zümrüt', primary: '#059669', accent: '#064e3b', desc: 'Sürdürülebilir & Büyüme Rengi' },
    { id: 'midnight-navy', name: 'Lüks Gece Mavisi', primary: '#1e293b', accent: '#0f172a', desc: 'Ultra Premium & Ağırbaşlı' },
    { id: 'slate-black', name: 'Minimal Siyah', primary: '#0f172a', accent: '#020617', desc: 'Sade & Monokrom Minimalist' },
  ];

  const themes: { id: ThemeId; name: string; badge: string; desc: string; previewColor: string; tags: string[] }[] = [
    {
      id: 'theme-existing',
      name: 'Mevcut Tema (PAYPOS Beyaz & Mavi)',
      badge: 'KLASİK KURUMSAL',
      desc: 'Orijinal beyaz ve kurumsal mavi tabanlı arayüz. Geniş hero alanı, dinamik Türkiye haritası ve klasik kurumsal bölümler.',
      previewColor: 'from-blue-600 to-indigo-700',
      tags: ['Beyaz / Mavi', 'Türkiye Haritası', 'Geleneksel Kurumsal']
    },
    {
      id: 'theme-fintech',
      name: 'Fintech Teması (Modern Koyu & Metrik Odaklı)',
      badge: 'REFERANS FİNTEK TASARIMI',
      desc: 'Referans görseldeki üst düzey finans & ödeme teknolojileri teması. 3D cihaz sunumu, komisyon sparkline kartları, bakiye paneli, sürtünmesiz ödeme özellikleri ve modern 2-sütunlu SSS.',
      previewColor: 'from-slate-950 via-slate-900 to-emerald-950',
      tags: ['Koyu & Modern', 'Finansal Metrikler', 'Sürtünmesiz POS & Sparkline']
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Palette className="w-6 h-6 text-blue-600" />
          <span>Tema, Logo & Sistem Ayarları</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Sitenizin aktif temasını, logosunu, yüzen iletişim butonlarını ve genel ayarlarını tek ekrandan yönetin.
        </p>
      </div>

      {saved && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Ayarlar ve tema seçimi başarıyla kaydedildi! Canlı sitede anında aktif edildi.</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-rose-50 text-rose-700 p-4 rounded-xl border border-rose-200 flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">

        {/* 0. ACTIVE THEME SWITCHER */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-blue-600/30 shadow-lg space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-600" />
                <span>0. Aktif Canlı Tema Seçimi (Multi-Theme Engine)</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Tek tıkla sitenin tüm public sayfalarında gösterilecek aktif tasarım temasını değiştirin.
              </p>
            </div>
            <span className="text-[10px] font-black uppercase bg-blue-600 text-white px-3 py-1 rounded-full shadow-sm">
              ÇOKLU TEMA MOTORU
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {themes.map((t) => {
              const isSelected = (form.themeId || 'theme-existing') === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setForm({ ...form, themeId: t.id })}
                  className={`p-5 rounded-3xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 shadow-xl ring-2 ring-blue-600/20'
                      : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                        {t.badge}
                      </span>
                      {isSelected ? (
                        <div className="flex items-center gap-1 text-blue-600 font-extrabold text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Aktif Tema</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-semibold">Seçmek için tıkla</span>
                      )}
                    </div>

                    <div className={`h-20 rounded-2xl bg-gradient-to-br ${t.previewColor} flex items-center justify-center p-3 text-white shadow-inner`}>
                      <span className="font-extrabold text-sm tracking-tight">{t.name}</span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{t.name}</h4>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{t.desc}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {t.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
        {/* LOGO MANAGEMENT & BRAND IDENTITY SECTION */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span>1. Logo Düzenleme & Marka Kimliği</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Sitenin üst menü ve alt bilgi kısmındaki logosunu ve boyutunu özelleştirin.</p>
            </div>
            <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
              DİNAMİK LOGO
            </span>
          </div>

          {/* Logo Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-bold text-slate-800">Logo Görsel Bağlantısı (URL)</label>
              <input
                type="text"
                name="logoUrl"
                value={form.logoUrl || ''}
                onChange={handleChange}
                placeholder="https://.../logo.png veya /images/logo.svg"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <span className="text-[10px] text-slate-500 block">
                Doğrudan görsel URL'si girebilir veya aşağıdaki hazır stok logolardan seçebilirsiniz.
              </span>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-slate-800">Favicon Bağlantısı (URL)</label>
              <input
                type="text"
                name="faviconUrl"
                value={form.faviconUrl || ''}
                onChange={handleChange}
                placeholder="/favicon.ico"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <span className="text-[10px] text-slate-500 block">
                Tarayıcı sekmesinde görünen ikon simgesi.
              </span>
            </div>
          </div>

          {/* Stock Preset Logos */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-800">Hazır Logo Şablonları</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stockLogos.map((stock, i) => {
                const isSelected = form.logoUrl === stock.url;
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setForm({ ...form, logoUrl: stock.url })}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-600/30'
                        : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">{stock.name}</span>
                      <span className="text-[10px] text-slate-400 truncate block max-w-[180px]">
                        {stock.url || 'Varsayılan Metin Rozeti'}
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logo Height Slider & Show Text Switch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-800">Logo Yüksekliği ({form.logoHeight || 40}px)</label>
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <input
                type="range"
                name="logoHeight"
                min="24"
                max="72"
                step="2"
                value={form.logoHeight || 40}
                onChange={handleChange}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>24px (Küçük)</span>
                <span>40px (Standart)</span>
                <span>72px (Büyük)</span>
              </div>
            </div>

            <div className="space-y-2 flex flex-col justify-center">
              <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Sitede Sadece Logo Görseli Gösterilir (Yan Yanındaki Metinler Kaldırılmıştır)</span>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING QUICK CONTACT BUTTONS SECTION (SOL TARAFTAKİ WHATSAPP VE TELEFON İKONLARI) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>2. Yüzen WhatsApp & Telefon Hızlı İletişim Butonları</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Sitenin sol (veya sağ) alt köşesinde sabit duran hızlı iletişim balonlarını özelleştirin.</p>
            </div>
            <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              YENİ MODÜL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Show/Hide Switch */}
            <div className="space-y-2 flex flex-col justify-center">
              <label className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  name="showQuickContactButtons"
                  checked={form.showQuickContactButtons}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-600"
                />
                <div>
                  <span className="font-bold text-slate-900 block">Yüzen İletişim Butonlarını Göster</span>
                  <span className="text-[10px] text-slate-500 block">Sitede WhatsApp ve Telefon hızlı ulaşım ikonlarını aktif eder.</span>
                </div>
              </label>
            </div>

            {/* Position Picker */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-800">Ekranda Duruş Konumu</label>
              <select
                name="quickContactPosition"
                value={form.quickContactPosition || 'left'}
                onChange={handleChange}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
              >
                <option value="left">👈 Sol Alt Köşe (İstediğiniz Standart Konum)</option>
                <option value="right">👉 Sağ Alt Köşe</option>
              </select>
              <span className="text-[10px] text-slate-500 block">
                İkonların ekranın solunda mı sağında mı duracağını belirler.
              </span>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* WhatsApp Number & Message */}
            <div className="space-y-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5 text-emerald-700">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Ayarları</span>
              </h4>
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">WhatsApp Numarası (Ülke Kodlu)</label>
                <input
                  type="text"
                  name="quickContactWhatsapp"
                  value={form.quickContactWhatsapp || ''}
                  onChange={handleChange}
                  placeholder="905304171565"
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Varsayılan Hazır Mesaj</label>
                <input
                  type="text"
                  name="quickContactMessage"
                  value={form.quickContactMessage || ''}
                  onChange={handleChange}
                  placeholder="Merhaba, bilgi almak istiyorum."
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>
            </div>

            {/* Phone Call Number */}
            <div className="space-y-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5 text-blue-700">
                <Phone className="w-4 h-4" />
                <span>Hızlı Telefon Arama Ayarları</span>
              </h4>
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">Aranacak Telefon Numarası</label>
                <input
                  type="text"
                  name="quickContactPhone"
                  value={form.quickContactPhone || ''}
                  onChange={handleChange}
                  placeholder="0530 417 15 65"
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Mobil cihazdan basıldığında doğrudan bu numara aranır.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* DESIGN & THEME PRESETS SECTION */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>3. Renk Paleti & Tema Seçeneği</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Sitenin genel renk tonunu ve marka kimliğini belirleyin.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {colorPresets.map((preset) => {
              const isSelected = (form.colorPreset || 'corporate-blue') === preset.id;
              return (
                <button
                  type="button"
                  key={preset.id}
                  onClick={() => setForm({ ...form, colorPreset: preset.id as any, primaryColor: preset.primary, accentColor: preset.accent })}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-600/30'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-xs">{preset.name}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: preset.primary }} />
                      <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: preset.accent }} />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">{preset.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Custom Color Pickers */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <label className="block font-bold text-slate-800 text-xs">Özel Ana Renk (Primary Color)</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="primaryColor"
                  value={form.primaryColor || '#2563eb'}
                  onChange={handleChange}
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  name="primaryColor"
                  value={form.primaryColor || '#2563eb'}
                  onChange={handleChange}
                  className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <label className="block font-bold text-slate-800 text-xs">Özel Vurgu Rengi (Accent Color)</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="accentColor"
                  value={form.accentColor || '#1e3a8a'}
                  onChange={handleChange}
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  name="accentColor"
                  value={form.accentColor || '#1e3a8a'}
                  onChange={handleChange}
                  className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900 text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* LAYOUT DENSITY & CARD STYLE SECTION */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Layout className="w-4 h-4 text-blue-600" />
              <span>4. Ferahlık Düzeni & Kart Stili</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Sitenin boşluk genişliğini ve görsel kart yapılarını belirleyin.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-bold text-slate-800">Ferahlık & Boşluk Modu</label>
              <select
                name="layoutDensity"
                value={form.layoutDensity || 'spacious'}
                onChange={handleChange}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
              >
                <option value="spacious">🌿 Ferah & Geniş (Göz Yormayan Yüksek Boşluk)</option>
                <option value="balanced">⚖️ Dengeli Standart Düzen</option>
                <option value="compact">📱 Kompakt Düzen</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-slate-800">Kart & Çerçeve Stili</label>
              <select
                name="cardStyle"
                value={form.cardStyle || 'soft-border'}
                onChange={handleChange}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
              >
                <option value="soft-border">✨ İnce Yumuşak Çerçeve (Minimal Klas)</option>
                <option value="elevated-shadow">☁️ Gölgeli Kabarık Kartlar</option>
                <option value="minimal-flat">📄 Düz Minimal Zemin (Çerçevesiz)</option>
              </select>
            </div>
          </div>
        </div>

        {/* BASIC SITE SETTINGS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>5. Genel Marka & İletişim Bilgileri</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Site / Marka Adı</label>
              <input
                type="text"
                name="siteName"
                value={form.siteName}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Slogan (Tagline)</label>
              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Telefon (Görünür Format)</label>
              <input
                type="text"
                name="phoneFormatted"
                value={form.phoneFormatted}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">E-Posta Adresi</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Genel Merkez Adresi</label>
            <textarea
              name="address"
              rows={2}
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Ayarları & Yüzen Butonları Kaydet ve Canlıya Al</span>
          </button>
        </div>
      </form>
    </div>
  );
}
