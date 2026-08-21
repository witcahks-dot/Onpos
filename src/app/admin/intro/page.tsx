'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { BookOpen, Save, Image as ImageIcon, Sparkles, Check, Layers, ShieldCheck, Zap } from 'lucide-react';
import { CorporateIntroConfig } from '@/types';

export default function AdminIntroPage() {
  const { corporateIntro, updateCorporateIntro } = useCMSStore();
  const [formData, setFormData] = useState<CorporateIntroConfig>(
    corporateIntro || {
      badge: 'YAZARKASA SATIŞI & TEKNİK SERVİS',
      title: 'Yeni Nesil Ödeme Teknolojilerinde Güvenilir Çözüm Ortağınız.',
      description: 'Yazarkasa Satışı (DR Barkod) olarak Hugin, Ingenico, Paygo, Inpos, Pax, Beko ve Cas yetkili satış ve servis noktası olarak işletmenizin yanındayız.',
      bulletPoints: [
        '%100 Mali Mevzuat ve GİB Uyumluluğu',
        '24 Saatte Adresinizde Yetkili Kurulum',
        '7/24 Telefon ve Kesintisiz İkame Desteği',
        'Ödeal ve Tüm Bankalarla Entegre Altyapı',
      ],
      imageUrl: '/images/corporate-intro-demo.jpg',
      imageBadge: 'BDDK & PCI-PTS 6.X',
      imageTitle: 'Saha & Restoran Kullanımına Tam Uyumlu',
      imageDesc: 'Yüksek kaliteli termal yazıcı ve dokunmatik cam ekran.',
      card1Title: 'Ultra Hızlı İşlem',
      card1Desc: 'Milisaniyeler içinde temassız ödeme.',
      card2Title: '%100 Güvenli Altyapı',
      card2Desc: 'Uçtan uca P2PE şifrelenmiş veri iletimi.',
    }
  );
  const [saved, setSaved] = useState(false);

  const stockDemoImages = [
    { name: '🌟 Yeni Nesil Android POS Kafe (Yüklü Görsel)', url: '/images/corporate-intro-demo.jpg' },
    { name: '💼 Mağaza & Kasa Ödeme POS', url: 'https://images.unsplash.com/photo-1556742049-0a67daf40d3a?q=80&w=1000&auto=format&fit=crop' },
    { name: '🛒 Restoran Masaüstü POS', url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1000&auto=format&fit=crop' },
    { name: '🏬 Perakende Satış Ekranı', url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1000&auto=format&fit=crop' },
  ];

  const handlePointChange = (idx: number, val: string) => {
    const pts = [...(formData.bulletPoints || [])];
    pts[idx] = val;
    setFormData({ ...formData, bulletPoints: pts });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCorporateIntro(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>Ana Sayfa Kurumsal Tanıtım Bölümü Yönetimi</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">Ana sayfadaki "Yeni Nesil Ödeme..." bölümünün sol metinlerini, sağ büyük görselini ve öne çıkan kartlarını düzenleyin.</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-xs font-bold border border-emerald-200 animate-in fade-in">
          ✓ Kurumsal tanıtım metinleri ve görselleri kalıcı olarak başarıyla güncellendi!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* SECTION 1: LEFT TEXT CONTENT */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>1. Sol Taraf Metin İçerikleri</span>
          </h3>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Üst Rozet / Etiket Metni</label>
            <input
              type="text"
              value={formData.badge || ''}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Ana Başlık</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-black text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Açıklama Paragrafı</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
              required
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="block font-bold text-slate-700">Tik İşaretli Öne Çıkan Maddeler (4 Adet)</label>
            {(formData.bulletPoints || ['', '', '', '']).map((pt, idx) => (
              <input
                key={idx}
                type="text"
                value={pt}
                onChange={(e) => handlePointChange(idx, e.target.value)}
                placeholder={`Madde #${idx + 1}`}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
              />
            ))}
          </div>
        </div>

        {/* SECTION 2: RIGHT VISUAL SHOWCASE & DEMO IMAGE SELECTOR */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-blue-600" />
            <span>2. Sağ Taraf Büyük Tanıtım Görseli & Başlıkları</span>
          </h3>

          {/* Preset Demo Images */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-700">Hazır Demo Görsel Seçici veya Özel URL Girin</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stockDemoImages.map((img, idx) => {
                const isSelected = formData.imageUrl === img.url;
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setFormData({ ...formData, imageUrl: img.url })}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/30 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs text-slate-900 font-bold">{img.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Görsel URL Adresi</label>
            <input
              type="text"
              value={formData.imageUrl || ''}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="/images/corporate-intro-demo.jpg"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
            />
          </div>

          {/* Live Preview of Image */}
          {formData.imageUrl && (
            <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
              <img
                src={formData.imageUrl}
                alt="Önizleme"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/corporate-intro-demo.jpg';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded-full w-fit mb-1">
                  {formData.imageBadge || 'BDDK & PCI-PTS 6.X'}
                </span>
                <h4 className="font-bold text-xs">{formData.imageTitle || 'Görsel Başlığı'}</h4>
                <p className="text-[10px] text-slate-300">{formData.imageDesc || 'Görsel açıklaması'}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Görsel Üstü Rozet</label>
              <input
                type="text"
                value={formData.imageBadge || ''}
                onChange={(e) => setFormData({ ...formData, imageBadge: e.target.value })}
                placeholder="BDDK & PCI-PTS 6.X"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Görsel Üstü Başlık</label>
              <input
                type="text"
                value={formData.imageTitle || ''}
                onChange={(e) => setFormData({ ...formData, imageTitle: e.target.value })}
                placeholder="Saha & Restoran Kullanımına Tam Uyumlu"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Görsel Üstü Açıklama</label>
              <input
                type="text"
                value={formData.imageDesc || ''}
                onChange={(e) => setFormData({ ...formData, imageDesc: e.target.value })}
                placeholder="Yüksek kaliteli termal yazıcı..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: STACKED METRIC CARDS */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>3. Sağ Taraf Özellik Kartları (Mavi & Siyah Kartlar)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1 */}
            <div className="space-y-3 p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
              <h4 className="font-extrabold text-blue-900 text-xs flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>1. Mavi Özellik Kartı</span>
              </h4>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kart Başlığı</label>
                <input
                  type="text"
                  value={formData.card1Title || ''}
                  onChange={(e) => setFormData({ ...formData, card1Title: e.target.value })}
                  placeholder="Ultra Hızlı İşlem"
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kart Açıklaması</label>
                <input
                  type="text"
                  value={formData.card1Desc || ''}
                  onChange={(e) => setFormData({ ...formData, card1Desc: e.target.value })}
                  placeholder="Milisaniyeler içinde temassız ödeme."
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="space-y-3 p-4 bg-slate-900 text-white rounded-2xl border border-slate-800">
              <h4 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>2. Siyah Özellik Kartı</span>
              </h4>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Kart Başlığı</label>
                <input
                  type="text"
                  value={formData.card2Title || ''}
                  onChange={(e) => setFormData({ ...formData, card2Title: e.target.value })}
                  placeholder="%100 Güvenli Altyapı"
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-bold text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Kart Açıklaması</label>
                <input
                  type="text"
                  value={formData.card2Desc || ''}
                  onChange={(e) => setFormData({ ...formData, card2Desc: e.target.value })}
                  placeholder="Uçtan uca P2PE şifrelenmiş veri iletimi."
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-medium text-slate-300"
                />
              </div>
            </div>

          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Tüm Değişiklikleri Kaydet</span>
          </button>
        </div>

      </form>
    </div>
  );
}
