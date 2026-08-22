'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  PanelTop, 
  PanelBottom, 
  CheckCircle2, 
  Save, 
  Sliders, 
  Phone, 
  MessageSquare, 
  Search, 
  Shield, 
  ExternalLink, 
  FileText, 
  CreditCard, 
  Clock, 
  Share2,
  Info
} from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function AdminHeaderFooterPage() {
  const { settings, headerConfig, footerConfig, fetchCMSData, updateHeaderConfig, updateFooterConfig } = useCMSStore();
  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header');
  const [notification, setNotification] = useState<string | null>(null);

  // Local Form States
  const [headerForm, setHeaderForm] = useState({
    showTopbar: true,
    topbarText: '',
    topbarPhone: '',
    topbarWhatsapp: '',
    showSearch: true,
    showQuoteButton: true,
    quoteButtonText: 'Hemen Teklif Al',
    quoteButtonUrl: '#teklif-al',
    stickyHeader: true,
    headerStyle: 'standard' as 'standard' | 'minimal' | 'floating',
  });

  const [footerForm, setFooterForm] = useState({
    footerStyle: 'full' as 'full' | 'compact' | 'minimal',
    brandDescription: '',
    copyrightText: '',
    showSocialLinks: true,
    showWorkingHours: true,
    showPaymentBadges: true,
    quickLinksTitle: 'Hızlı Erişim',
    productsTitle: 'POS Çözümleri',
    contactTitle: 'İletişim & Destek',
  });

  useEffect(() => {
    fetchCMSData();
  }, [fetchCMSData]);

  useEffect(() => {
    if (headerConfig) {
      setHeaderForm({
        showTopbar: headerConfig.showTopbar !== false,
        topbarText: headerConfig.topbarText || '81 İlde 24 Saatte Adrese Teslimat ve İkame Desteği',
        topbarPhone: headerConfig.topbarPhone || settings?.phoneFormatted || '0530 417 15 65',
        topbarWhatsapp: headerConfig.topbarWhatsapp || settings?.socialLinks?.whatsapp || '905304171565',
        showSearch: headerConfig.showSearch !== false,
        showQuoteButton: headerConfig.showQuoteButton !== false,
        quoteButtonText: headerConfig.quoteButtonText || 'Hemen Teklif Al',
        quoteButtonUrl: headerConfig.quoteButtonUrl || '#teklif-al',
        stickyHeader: headerConfig.stickyHeader !== false,
        headerStyle: headerConfig.headerStyle || 'standard',
      });
    }

    if (footerConfig) {
      setFooterForm({
        footerStyle: footerConfig.footerStyle || 'full',
        brandDescription: footerConfig.brandDescription || 'Hugin, Ingenico, Paygo, Inpos, Pax ve Beko yetkili satış & teknik servis noktası.',
        copyrightText: footerConfig.copyrightText || '© 2026 PAYPOS Ödeme Teknolojileri. Tüm Hakları Saklıdır.',
        showSocialLinks: footerConfig.showSocialLinks !== false,
        showWorkingHours: footerConfig.showWorkingHours !== false,
        showPaymentBadges: footerConfig.showPaymentBadges !== false,
        quickLinksTitle: footerConfig.quickLinksTitle || 'Hızlı Erişim',
        productsTitle: footerConfig.productsTitle || 'POS Çözümleri',
        contactTitle: footerConfig.contactTitle || 'İletişim & Destek',
      });
    }
  }, [headerConfig, footerConfig, settings]);

  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHeaderConfig(headerForm);
    showNotice('Header (Üst Menü) ayarları başarıyla kaydedildi ve canlıya aktarıldı!');
  };

  const handleSaveFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateFooterConfig(footerForm);
    showNotice('Footer (Alt Bilgi) ayarları başarıyla kaydedildi ve canlıya aktarıldı!');
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5 text-blue-600 font-extrabold text-xs tracking-wider uppercase mb-1">
            <Layout className="w-4 h-4" />
            <span>SİTE NAVİGASYON & MİMARİ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Header & Footer Yönetimi
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Sitenin en üst (Header/Topbar) ve en alt (Footer) bölümlerinin içeriğini, duyuru metinlerini ve buton görünürlüklerini detaylıca düzenleyin.
          </p>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3.5 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('header')}
          className={`flex items-center gap-2.5 px-6 py-3.5 border-b-2 font-black text-sm transition-all cursor-pointer ${
            activeTab === 'header'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <PanelTop className="w-4 h-4" />
          <span>Header (Üst Kısım & Topbar)</span>
        </button>

        <button
          onClick={() => setActiveTab('footer')}
          className={`flex items-center gap-2.5 px-6 py-3.5 border-b-2 font-black text-sm transition-all cursor-pointer ${
            activeTab === 'footer'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <PanelBottom className="w-4 h-4" />
          <span>Footer (Alt Bilgi Kısımı)</span>
        </button>
      </div>

      {/* HEADER TAB CONTENT */}
      {activeTab === 'header' && (
        <form onSubmit={handleSaveHeader} className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <PanelTop className="w-5 h-5 text-blue-600" />
              <span>Üst Siyah Duyuru Bandı (Topbar)</span>
            </h2>

            {/* Enable Topbar Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-sm font-extrabold text-slate-900">Topbar Duyuru Bandını Göster</div>
                <div className="text-xs text-slate-500 font-medium">Sitenin en üstündeki siyah duyuru şeridini açar veya kapatır.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={headerForm.showTopbar}
                  onChange={(e) => setHeaderForm({ ...headerForm, showTopbar: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {headerForm.showTopbar && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                    Duyuru Metni
                  </label>
                  <input
                    type="text"
                    value={headerForm.topbarText}
                    onChange={(e) => setHeaderForm({ ...headerForm, topbarText: e.target.value })}
                    placeholder="81 İlde 24 Saatte Adrese Teslimat ve İkame Desteği"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                    Topbar Telefon Numarası
                  </label>
                  <input
                    type="text"
                    value={headerForm.topbarPhone}
                    onChange={(e) => setHeaderForm({ ...headerForm, topbarPhone: e.target.value })}
                    placeholder="0530 417 15 65"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                    Topbar WhatsApp Numarası
                  </label>
                  <input
                    type="text"
                    value={headerForm.topbarWhatsapp}
                    onChange={(e) => setHeaderForm({ ...headerForm, topbarWhatsapp: e.target.value })}
                    placeholder="905304171565"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <span>Ana Header & Buton Ayarları</span>
            </h2>

            {/* Sticky Header Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-sm font-extrabold text-slate-900">Sabit Kayan Menü (Sticky Header)</div>
                <div className="text-xs text-slate-500 font-medium">Sayfa aşağı kaydırıldığında menünün ekranın üstünde sabit kalmasını sağlar.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={headerForm.stickyHeader}
                  onChange={(e) => setHeaderForm({ ...headerForm, stickyHeader: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Show Search Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-sm font-extrabold text-slate-900">Arama Butonu (⌘K Search)</div>
                <div className="text-xs text-slate-500 font-medium">Header sağ kısmındaki canlı arama butonunu açar veya kapatır.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={headerForm.showSearch}
                  onChange={(e) => setHeaderForm({ ...headerForm, showSearch: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Show Quote Button Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-sm font-extrabold text-slate-900">Sağ Eylem Butonu (Teklif Al)</div>
                <div className="text-xs text-slate-500 font-medium">Header sağındaki mavi butonun görünürlüğünü kontrol eder.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={headerForm.showQuoteButton}
                  onChange={(e) => setHeaderForm({ ...headerForm, showQuoteButton: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {headerForm.showQuoteButton && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                    Buton Metni
                  </label>
                  <input
                    type="text"
                    value={headerForm.quoteButtonText}
                    onChange={(e) => setHeaderForm({ ...headerForm, quoteButtonText: e.target.value })}
                    placeholder="Teklif Al"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                    Buton Bağlantı URL'si
                  </label>
                  <input
                    type="text"
                    value={headerForm.quoteButtonUrl}
                    onChange={(e) => setHeaderForm({ ...headerForm, quoteButtonUrl: e.target.value })}
                    placeholder="#teklif-al"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Header Ayarlarını Kaydet</span>
            </button>
          </div>
        </form>
      )}

      {/* FOOTER TAB CONTENT */}
      {activeTab === 'footer' && (
        <form onSubmit={handleSaveFooter} className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <PanelBottom className="w-5 h-5 text-blue-600" />
              <span>Footer Açıklama & Telif Hakkı (Copyright)</span>
            </h2>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                Logo Altı Kurumsal Tanıtım Yazısı
              </label>
              <textarea
                rows={3}
                value={footerForm.brandDescription}
                onChange={(e) => setFooterForm({ ...footerForm, brandDescription: e.target.value })}
                placeholder="Hugin, Ingenico, Paygo, Inpos, Pax ve Beko yetkili satış & teknik servis noktası..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                En Alt Telif Hakkı (Copyright) Metni
              </label>
              <input
                type="text"
                value={footerForm.copyrightText}
                onChange={(e) => setFooterForm({ ...footerForm, copyrightText: e.target.value })}
                placeholder="© 2026 PAYPOS Ödeme Teknolojileri. Tüm Hakları Saklıdır."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Footer Sütun Başlıkları</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  1. Sütun Başlığı
                </label>
                <input
                  type="text"
                  value={footerForm.quickLinksTitle}
                  onChange={(e) => setFooterForm({ ...footerForm, quickLinksTitle: e.target.value })}
                  placeholder="Hızlı Erişim"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  2. Sütun Başlığı
                </label>
                <input
                  type="text"
                  value={footerForm.productsTitle}
                  onChange={(e) => setFooterForm({ ...footerForm, productsTitle: e.target.value })}
                  placeholder="POS Çözümleri"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  3. Sütun Başlığı
                </label>
                <input
                  type="text"
                  value={footerForm.contactTitle}
                  onChange={(e) => setFooterForm({ ...footerForm, contactTitle: e.target.value })}
                  placeholder="İletişim & Destek"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span>Görünürlük & Rozet Ayarları</span>
            </h2>

            {/* Show Payment Badges */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-sm font-extrabold text-slate-900">Güvenlik Rozetleri (PCI-PTS, BDDK, GİB)</div>
                <div className="text-xs text-slate-500 font-medium">Footer'ın en üstündeki güvenlik ve sertifika rozetlerini açar veya kapatır.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={footerForm.showPaymentBadges}
                  onChange={(e) => setFooterForm({ ...footerForm, showPaymentBadges: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Show Working Hours */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-sm font-extrabold text-slate-900">Çalışma Saatleri Kutusu</div>
                <div className="text-xs text-slate-500 font-medium">Footer iletişim sütunundaki çalışma saatleri bilgisini gösterir.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={footerForm.showWorkingHours}
                  onChange={(e) => setFooterForm({ ...footerForm, showWorkingHours: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Show Social Links */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-sm font-extrabold text-slate-900">Sosyal Medya İkonları</div>
                <div className="text-xs text-slate-500 font-medium">Footer altındaki WhatsApp, Instagram, LinkedIn ikonlarını gösterir.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={footerForm.showSocialLinks}
                  onChange={(e) => setFooterForm({ ...footerForm, showSocialLinks: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Footer Ayarlarını Kaydet</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
