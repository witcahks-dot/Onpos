'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Menu as MenuIcon, ArrowUp, ArrowDown, Plus, Trash2, Save, Eye, EyeOff, Sparkles, Smartphone, CreditCard, Monitor, ShieldCheck, Check, Layers } from 'lucide-react';
import { MenuItem, MegaMenuConfig } from '@/types';

export default function AdminMenuPage() {
  const { menu, updateMenu, megaMenuConfig, updateMegaMenuConfig, products } = useCMSStore();
  const [activeTab, setActiveTab] = useState<'menu' | 'megamenu'>('menu');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menu || []);
  const [megaConfig, setMegaConfig] = useState<MegaMenuConfig>(
    megaMenuConfig || {
      featuredProductId: 'p1',
      spotlightBadge: '2026 AMİRAL GEMİSİ',
      spotlightTitle: 'Smart POS X1 Android Terminal',
      spotlightDesc: 'Ultra hızlı dokunmatik ekran ve temassız ödeme.',
      spotlightPriceText: '12.499 ₺\'den başlayan fiyatlarla',
      spotlightCtaText: 'Cihazı İncele & Fiyat Al',
      spotlightCtaUrl: '/pos-cihazlari/smart-pos-x1',
      bottomNoticeText: 'Tüm cihazlarımız 2 yıl resmi garanti ve 7/24 ikame desteği ile gelir.',
      bottomNoticeLinkText: 'Tüm POS Kataloğunu Gör',
      bottomNoticeLinkUrl: '/pos-cihazlari',
      categories: [],
    }
  );
  const [saved, setSaved] = useState(false);

  // Menu Items Reordering
  const moveItem = (index: number, direction: 'up' | 'down') => {
    const updated = [...menuItems];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updated.forEach((item, i) => item.order = i + 1);
    setMenuItems(updated);
  };

  const handleMenuItemChange = (index: number, field: keyof MenuItem, value: unknown) => {
    const updated = [...menuItems];
    updated[index] = { ...updated[index], [field]: value };
    setMenuItems(updated);
  };

  const handleAddMenuItem = () => {
    const newItem: MenuItem = {
      id: 'menu-' + Date.now(),
      label: 'Yeni Sayfa',
      href: '/yeni-sayfa',
      order: menuItems.length + 1,
      isVisible: true,
      badge: '',
      isMegaMenu: false,
    };
    setMenuItems([...menuItems, newItem]);
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleSaveMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMenu(menuItems);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveMegaMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMegaMenuConfig(megaConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MenuIcon className="w-5 h-5 text-blue-600" />
            <span>Header & Mega Menü Gelişmiş Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Header navigasyon linkleri, rozetler ve POS cihazları açılır mega menüsü.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-200/80 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'menu' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Header Menü Linkleri
          </button>
          <button
            onClick={() => setActiveTab('megamenu')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'megamenu' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mega Menü & Öne Çıkan POS
          </button>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-xs font-bold border border-emerald-200">
          ✓ Menü ve Mega Menü ayarları başarıyla kaydedildi ve canlıya aktarıldı!
        </div>
      )}

      {/* TAB 1: Header Navigasyon Menüsü */}
      {activeTab === 'menu' && (
        <form onSubmit={handleSaveMenu} className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddMenuItem}
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Menü Öğesi Ekle</span>
            </button>
          </div>

          <div className="space-y-3">
            {menuItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm text-xs"
              >
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => moveItem(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(idx, 'down')}
                      disabled={idx === menuItems.length - 1}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-mono font-bold text-slate-400 w-6">#{idx + 1}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 flex-1">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Menü Adı (Label)</label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleMenuItemChange(idx, 'label', e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Bağlantı (Href)</label>
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => handleMenuItemChange(idx, 'href', e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Rozet Metni (Opsiyonel)</label>
                    <input
                      type="text"
                      placeholder="Örn: YENİ, HOT"
                      value={item.badge || ''}
                      onChange={(e) => handleMenuItemChange(idx, 'badge', e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 uppercase"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-4 sm:pt-0">
                    <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.isMegaMenu || false}
                        onChange={(e) => handleMenuItemChange(idx, 'isMegaMenu', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span>Mega Menü</span>
                    </label>

                    <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.isVisible}
                        onChange={(e) => handleMenuItemChange(idx, 'isVisible', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span>{item.isVisible ? 'Yayında' : 'Gizli'}</span>
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteMenuItem(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg shrink-0 self-end sm:self-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Menü Sırasını ve Değişiklikleri Kaydet</span>
          </button>
        </form>
      )}

      {/* TAB 2: Mega Menü ve Öne Çıkan POS Cihazı Konfigürasyonu */}
      {activeTab === 'megamenu' && (
        <form onSubmit={handleSaveMegaMenu} className="space-y-6 text-xs">
          
          {/* Spotlight POS Device Configuration Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Mega Menü Öne Çıkan POS Cihazı Spotlight</span>
            </h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Öne Çıkarılacak POS Ürününü Seçin</label>
              <select
                value={megaConfig.featuredProductId || ''}
                onChange={(e) => {
                  const p = products.find(prod => prod.id === e.target.value);
                  if (p) {
                    setMegaConfig({
                      ...megaConfig,
                      featuredProductId: p.id,
                      spotlightTitle: p.name,
                      spotlightDesc: p.shortDesc,
                      spotlightPriceText: p.price ? `${p.price.toLocaleString('tr-TR')} ₺'den başlayan fiyatlarla` : 'Özel Teklif İle',
                      spotlightCtaUrl: `/pos-cihazlari/${p.slug}`,
                    });
                  } else {
                    setMegaConfig({ ...megaConfig, featuredProductId: e.target.value });
                  }
                }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.category}) - {p.price ? `${p.price.toLocaleString('tr-TR')} ₺` : 'Fiyat Belirtilmedi'}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Spotlight Üst Rozeti</label>
                <input
                  type="text"
                  value={megaConfig.spotlightBadge}
                  onChange={(e) => setMegaConfig({ ...megaConfig, spotlightBadge: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 uppercase font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Spotlight Başlığı</label>
                <input
                  type="text"
                  value={megaConfig.spotlightTitle}
                  onChange={(e) => setMegaConfig({ ...megaConfig, spotlightTitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Spotlight Açıklaması</label>
              <textarea
                rows={2}
                value={megaConfig.spotlightDesc}
                onChange={(e) => setMegaConfig({ ...megaConfig, spotlightDesc: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Fiyat Vurgu Metni</label>
                <input
                  type="text"
                  value={megaConfig.spotlightPriceText}
                  onChange={(e) => setMegaConfig({ ...megaConfig, spotlightPriceText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Buton Metni & URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={megaConfig.spotlightCtaText}
                    onChange={(e) => setMegaConfig({ ...megaConfig, spotlightCtaText: e.target.value })}
                    className="w-1/2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                  <input
                    type="text"
                    value={megaConfig.spotlightCtaUrl}
                    onChange={(e) => setMegaConfig({ ...megaConfig, spotlightCtaUrl: e.target.value })}
                    className="w-1/2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Announcement Bar Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Mega Menü Alt Bilgi & Kataloğa Yönlendirme Barı</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Sol Alt Garanti Metni</label>
                <input
                  type="text"
                  value={megaConfig.bottomNoticeText}
                  onChange={(e) => setMegaConfig({ ...megaConfig, bottomNoticeText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sağ Alt Katalog Link Metni</label>
                <input
                  type="text"
                  value={megaConfig.bottomNoticeLinkText}
                  onChange={(e) => setMegaConfig({ ...megaConfig, bottomNoticeLinkText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Mega Menü Ayarlarını Kaydet</span>
          </button>
        </form>
      )}

    </div>
  );
}
