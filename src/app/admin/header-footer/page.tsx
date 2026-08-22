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
  Info,
  Menu as MenuIcon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Award,
  Lock,
  HeartHandshake,
  ShieldCheck
} from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';
import { MenuItem, FooterLinkItem, FooterBadgeCard } from '@/types';

export default function AdminHeaderFooterPage() {
  const { 
    settings, 
    menu, 
    headerConfig, 
    footerConfig, 
    fetchCMSData, 
    updateHeaderConfig, 
    updateFooterConfig, 
    updateMenu 
  } = useCMSStore();

  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header');
  const [notification, setNotification] = useState<string | null>(null);

  // Local Header Form State
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

  // Local Menu Items State
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newMenuLabel, setNewMenuLabel] = useState('');
  const [newMenuHref, setNewMenuHref] = useState('');

  // Local Footer Form State
  const [footerForm, setFooterForm] = useState({
    footerStyle: 'full' as 'full' | 'compact' | 'minimal',
    footerLogoUrl: '',
    brandDescription: '',
    showContactInfoUnderLogo: true,
    
    showFeatureCards: true,
    featureCards: [] as FooterBadgeCard[],
    
    col1Title: 'POS ÜRÜNLERİ',
    col1Links: [] as FooterLinkItem[],
    
    col2Title: 'HİZMETLER & ÇÖZÜMLER',
    col2Links: [] as FooterLinkItem[],
    
    col3Title: 'KURUMSAL & DESTEK',
    col3Links: [] as FooterLinkItem[],
    
    showNewsletter: true,
    newsletterTitle: 'Mali & Mevzuat Güncellemeleri',
    newsletterSubtitle: 'Yeni GİB tebliğleri ve komisyon avantajlarından ilk siz haberdar olun.',
    newsletterPlaceholder: 'E-posta adresiniz',
    newsletterButtonText: 'Abone Ol',
    
    copyrightText: '',
    legalLinks: [] as FooterLinkItem[],
    showSocialLinks: true,
    showWorkingHours: true,
    showPaymentBadges: true,
  });

  useEffect(() => {
    fetchCMSData();
  }, [fetchCMSData]);

  useEffect(() => {
    if (menu) {
      setMenuItems([...menu].sort((a, b) => a.order - b.order));
    }

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
        footerLogoUrl: footerConfig.footerLogoUrl || settings?.logoUrl || '',
        brandDescription: footerConfig.brandDescription || 'Hugin, Ingenico, Paygo, Inpos, Pax ve Beko yetkili satış & teknik servis noktası.',
        showContactInfoUnderLogo: footerConfig.showContactInfoUnderLogo !== false,
        
        showFeatureCards: footerConfig.showFeatureCards !== false,
        featureCards: footerConfig.featureCards || [
          { id: 'f1', title: 'PCI-PTS 6.x Güvenlik', subtitle: 'Uluslararası BDDK & EMV L1/L2 onaylı ödeme standartları.' },
          { id: 'f2', title: 'P2PE Şifreleme', subtitle: 'End-to-End uçtan uca şifrelenmiş güvenli kart saklama altyapısı.' },
          { id: 'f3', title: 'GİB & ÖKC Onaylı', subtitle: 'Gelir İdaresi Başkanlığı yeni nesil mevzuat uyumlu mali hafıza.' },
          { id: 'f4', title: '7/24 Saha Desteği', subtitle: '2 saat içinde adresinizde birebir ikame cihaz garantisi.' },
        ],
        
        col1Title: footerConfig.col1Title || 'POS ÜRÜNLERİ',
        col1Links: footerConfig.col1Links || [
          { id: 'l1', label: 'Hugin Tiger T300 4G Yazarkasa POS', href: '/pos-cihazlari/hugin-tiger-t300', isVisible: true },
          { id: 'l2', label: 'Inpos M530 Mobil Yazarkasa POS', href: '/pos-cihazlari/inpos-m530', isVisible: true },
          { id: 'l3', label: 'Paygo SP630 ECR 4G Pro Yazarkasa POS', href: '/pos-cihazlari/paygo-sp630', isVisible: true },
          { id: 'l4', label: 'Ingenico Move 5000F Mobil Yazarkasa POS', href: '/pos-cihazlari/ingenico-move-5000f', isVisible: true },
          { id: 'l5', label: 'Hugin S1 Android Yazarkasa POS', href: '/pos-cihazlari/hugin-s1', isVisible: true },
        ],
        
        col2Title: footerConfig.col2Title || 'HİZMETLER & ÇÖZÜMLER',
        col2Links: footerConfig.col2Links || [
          { id: 's1', label: 'Yazarkasa POS Yetkili Satış & Adreste Kurulum', href: '/hizmetler/satis-ve-kurulum', isVisible: true },
          { id: 's2', label: 'Ödeal & Düşük Komisyonlu Ödeme Altyapısı', href: '/cozumler/odeko-komisyon', isVisible: true },
          { id: 's3', label: '7/24 Kesintisiz Yerinde Teknik Servis & İkame', href: '/hizmetler/7-24-teknik-servis', isVisible: true },
          { id: 's4', label: 'e-Fatura & e-Arşiv Entegrasyon Danışmanlığı', href: '/hizmetler/e-fatura-danismanligi', isVisible: true },
          { id: 's5', label: 'Sektörel Ödeme Çözümleri', href: '/cozumler', isVisible: true },
        ],
        
        col3Title: footerConfig.col3Title || 'KURUMSAL & DESTEK',
        col3Links: footerConfig.col3Links || [
          { id: 'k1', label: 'Hakkımızda', href: '/kurumsal/hakkimizda', isVisible: true },
          { id: 'k2', label: 'Tarihçe & Kronoloji', href: '/kurumsal/tarihcemiz', isVisible: true },
          { id: 'k3', label: 'Sertifika ve Belgeler', href: '/kurumsal/belgelerimiz', isVisible: true },
          { id: 'k4', label: 'Referanslarımız', href: '/kurumsal/referanslar', isVisible: true },
          { id: 'k5', label: 'Yönetim Ekibi', href: '/kurumsal/ekibimiz', isVisible: true },
          { id: 'k6', label: 'Kariyer Pozisyonları', href: '/kurumsal/kariyer', isVisible: true },
          { id: 'k7', label: 'Banka Hesapları & IBAN', href: '/kurumsal/banka-hesaplari', isVisible: true },
          { id: 'k8', label: 'E-Katalog PDF Center', href: '/kurumsal/e-katalog', isVisible: true },
          { id: 'k9', label: 'Sıkça Sorulan Sorular (SSS)', href: '/sss', isVisible: true },
        ],
        
        showNewsletter: footerConfig.showNewsletter !== false,
        newsletterTitle: footerConfig.newsletterTitle || 'Mali & Mevzuat Güncellemeleri',
        newsletterSubtitle: footerConfig.newsletterSubtitle || 'Yeni GİB tebliğleri ve komisyon avantajlarından ilk siz haberdar olun.',
        newsletterPlaceholder: footerConfig.newsletterPlaceholder || 'E-posta adresiniz',
        newsletterButtonText: footerConfig.newsletterButtonText || 'Abone Ol',
        
        copyrightText: footerConfig.copyrightText || '© 2026 PAYPOS Ödeme Teknolojileri A.Ş. Tüm Hakları Saklıdır.',
        legalLinks: footerConfig.legalLinks || [
          { id: 'leg1', label: 'KVKK Aydınlatma Metni', href: '/kurumsal/kvkk', isVisible: true },
          { id: 'leg2', label: 'Gizlilik Politikası', href: '/kurumsal/gizlilik', isVisible: true },
          { id: 'leg3', label: 'Çerez Politikası', href: '/kurumsal/cerezler', isVisible: true },
        ],
        showSocialLinks: footerConfig.showSocialLinks !== false,
        showWorkingHours: footerConfig.showWorkingHours !== false,
        showPaymentBadges: footerConfig.showPaymentBadges !== false,
      });
    }
  }, [headerConfig, footerConfig, menu, settings]);

  // MENU ITEM ACTIONS
  const handleMoveMenu = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= menuItems.length) return;
    const updated = [...menuItems];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    
    // re-assign orders
    const reordered = updated.map((item, i) => ({ ...item, order: i + 1 }));
    setMenuItems(reordered);
  };

  const handleToggleMenuVisible = (id: string) => {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, isVisible: !m.isVisible } : m));
  };

  const handleAddMenuItem = () => {
    if (!newMenuLabel || !newMenuHref) {
      alert('Lütfen başlık ve yönlendirme bağlantısı (URL) girin.');
      return;
    }
    const newItem: MenuItem = {
      id: 'm-' + Date.now(),
      label: newMenuLabel,
      href: newMenuHref,
      order: menuItems.length + 1,
      isVisible: true,
    };
    setMenuItems([...menuItems, newItem]);
    setNewMenuLabel('');
    setNewMenuHref('');
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(m => m.id !== id));
  };

  // FOOTER LINK ACTIONS
  const handleAddFooterLink = (col: 'col1' | 'col2' | 'col3' | 'legal') => {
    const label = prompt('Link Başlığı:');
    const href = prompt('Link Yönlendirme URL\'si:');
    if (!label || !href) return;

    const newLink: FooterLinkItem = {
      id: 'fl-' + Date.now(),
      label,
      href,
      isVisible: true,
    };

    if (col === 'col1') {
      setFooterForm(prev => ({ ...prev, col1Links: [...(prev.col1Links || []), newLink] }));
    } else if (col === 'col2') {
      setFooterForm(prev => ({ ...prev, col2Links: [...(prev.col2Links || []), newLink] }));
    } else if (col === 'col3') {
      setFooterForm(prev => ({ ...prev, col3Links: [...(prev.col3Links || []), newLink] }));
    } else if (col === 'legal') {
      setFooterForm(prev => ({ ...prev, legalLinks: [...(prev.legalLinks || []), newLink] }));
    }
  };

  const handleDeleteFooterLink = (col: 'col1' | 'col2' | 'col3' | 'legal', id: string) => {
    if (col === 'col1') {
      setFooterForm(prev => ({ ...prev, col1Links: (prev.col1Links || []).filter(l => l.id !== id) }));
    } else if (col === 'col2') {
      setFooterForm(prev => ({ ...prev, col2Links: (prev.col2Links || []).filter(l => l.id !== id) }));
    } else if (col === 'col3') {
      setFooterForm(prev => ({ ...prev, col3Links: (prev.col3Links || []).filter(l => l.id !== id) }));
    } else if (col === 'legal') {
      setFooterForm(prev => ({ ...prev, legalLinks: (prev.legalLinks || []).filter(l => l.id !== id) }));
    }
  };

  // SAVE HANDLERS
  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHeaderConfig(headerForm);
    await updateMenu(menuItems);
    showNotice('Header ayarları ve Üst Menü sıralaması başarıyla kaydedildi!');
  };

  const handleSaveFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateFooterConfig(footerForm);
    showNotice('Detaylı Footer ayarları ve bağlantıları başarıyla kaydedildi!');
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
            Sitenin en üst (Header/Topbar/Menü) ve en alt (Footer/Sütunlar/Rozetler) bölümlerinin tüm içerik ve bağlantılarını detaylıca yönetin.
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
          <span>Header (Topbar, Logo & Üst Menü)</span>
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
          <span>Footer (Detaylı Sütunlar & Rozetler)</span>
        </button>
      </div>

      {/* HEADER TAB CONTENT */}
      {activeTab === 'header' && (
        <form onSubmit={handleSaveHeader} className="space-y-6">
          {/* Topbar Settings */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <PanelTop className="w-5 h-5 text-blue-600" />
              <span>1. Üst Siyah Duyuru Bandı (Topbar)</span>
            </h2>

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

          {/* Header Actions & Navigation Links */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <MenuIcon className="w-5 h-5 text-blue-600" />
              <span>2. Üst Menü Bağlantıları & Sıralaması (Header Menu)</span>
            </h2>

            {/* Quick Add Menu Link */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="text-xs font-black text-slate-700 uppercase tracking-wider">Hızlı Yeni Menü Elemanı Ekle</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Menü Başlığı (Örn: Çözümler)"
                  value={newMenuLabel}
                  onChange={(e) => setNewMenuLabel(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-800 text-sm px-3.5 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
                <input
                  type="text"
                  placeholder="Bağlantı URL (Örn: /cozumler)"
                  value={newMenuHref}
                  onChange={(e) => setNewMenuHref(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-800 text-sm px-3.5 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
                <button
                  type="button"
                  onClick={handleAddMenuItem}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Listeye Ekle</span>
                </button>
              </div>
            </div>

            {/* Menu Items Table */}
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all ${
                    item.isVisible ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 font-black text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const updated = [...menuItems];
                          updated[index].label = e.target.value;
                          setMenuItems(updated);
                        }}
                        className="font-extrabold text-slate-900 text-sm bg-transparent border-b border-dashed border-slate-300 focus:border-blue-600 focus:outline-none"
                      />
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{item.href}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => handleMoveMenu(index, 'up')}
                      disabled={index === 0}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                      title="Yukarı Taş"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveMenu(index, 'down')}
                      disabled={index === menuItems.length - 1}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                      title="Aşağı Taş"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleMenuVisible(item.id)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        item.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                      title={item.isVisible ? 'Gizle' : 'Aktif Et'}
                    >
                      {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMenuItem(item.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Header & Üst Menü Ayarlarını Kaydet</span>
            </button>
          </div>
        </form>
      )}

      {/* FOOTER TAB CONTENT */}
      {activeTab === 'footer' && (
        <form onSubmit={handleSaveFooter} className="space-y-6">
          {/* Logo & Description */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <PanelBottom className="w-5 h-5 text-blue-600" />
              <span>1. Footer Kurumsal Tanıtım & Logo</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  Footer Logo URL
                </label>
                <input
                  type="text"
                  value={footerForm.footerLogoUrl}
                  onChange={(e) => setFooterForm({ ...footerForm, footerLogoUrl: e.target.value })}
                  placeholder="https://.../logo.png"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
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
                  placeholder="© 2026 PAYPOS Ödeme Teknolojileri A.Ş. Tüm Hakları Saklıdır."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                Logo Altı Kurumsal Tanıtım Açıklama Yazısı
              </label>
              <textarea
                rows={3}
                value={footerForm.brandDescription}
                onChange={(e) => setFooterForm({ ...footerForm, brandDescription: e.target.value })}
                placeholder="Hugin, Ingenico, Paygo, Inpos, Pax ve Beko yetkili satış & teknik servis noktası..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          {/* Footer Columns Links */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>2. Footer Sütun Bağlantıları (3 Ana Sütun)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sütun 1 */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider">1. Sütun</span>
                  <button
                    type="button"
                    onClick={() => handleAddFooterLink('col1')}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Ekle
                  </button>
                </div>
                <input
                  type="text"
                  value={footerForm.col1Title}
                  onChange={(e) => setFooterForm({ ...footerForm, col1Title: e.target.value })}
                  placeholder="POS ÜRÜNLERİ"
                  className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-extrabold px-3 py-2 rounded-xl focus:outline-none"
                />
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {(footerForm.col1Links || []).map(link => (
                    <div key={link.id} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-slate-200">
                      <span className="truncate max-w-[140px] font-bold text-slate-800">{link.label}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteFooterLink('col1', link.id)}
                        className="text-rose-600 hover:bg-rose-50 p-1 rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sütun 2 */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider">2. Sütun</span>
                  <button
                    type="button"
                    onClick={() => handleAddFooterLink('col2')}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Ekle
                  </button>
                </div>
                <input
                  type="text"
                  value={footerForm.col2Title}
                  onChange={(e) => setFooterForm({ ...footerForm, col2Title: e.target.value })}
                  placeholder="HİZMETLER & ÇÖZÜMLER"
                  className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-extrabold px-3 py-2 rounded-xl focus:outline-none"
                />
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {(footerForm.col2Links || []).map(link => (
                    <div key={link.id} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-slate-200">
                      <span className="truncate max-w-[140px] font-bold text-slate-800">{link.label}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteFooterLink('col2', link.id)}
                        className="text-rose-600 hover:bg-rose-50 p-1 rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sütun 3 */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider">3. Sütun</span>
                  <button
                    type="button"
                    onClick={() => handleAddFooterLink('col3')}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Ekle
                  </button>
                </div>
                <input
                  type="text"
                  value={footerForm.col3Title}
                  onChange={(e) => setFooterForm({ ...footerForm, col3Title: e.target.value })}
                  placeholder="KURUMSAL & DESTEK"
                  className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-extrabold px-3 py-2 rounded-xl focus:outline-none"
                />
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {(footerForm.col3Links || []).map(link => (
                    <div key={link.id} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-slate-200">
                      <span className="truncate max-w-[140px] font-bold text-slate-800">{link.label}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteFooterLink('col3', link.id)}
                        className="text-rose-600 hover:bg-rose-50 p-1 rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Badges & Newsletter */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>3. Güvenlik Rozetleri & E-Bülten Görünürlüğü</span>
            </h2>

            {/* Show Feature Badges */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-sm font-extrabold text-slate-900">Güvenlik Rozetleri Bandı (PCI-PTS, BDDK, GİB)</div>
                <div className="text-xs text-slate-500 font-medium">Footer'ın en üstündeki 4 adet güvenlik kartı şeridini açar veya kapatır.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={footerForm.showFeatureCards}
                  onChange={(e) => setFooterForm({ ...footerForm, showFeatureCards: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Show Newsletter */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <div className="text-sm font-extrabold text-slate-900">E-Bülten Aboneliği Formu</div>
                <div className="text-xs text-slate-500 font-medium">Footer sol altındaki E-Bülten kayıt kutusunu gösterir.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={footerForm.showNewsletter}
                  onChange={(e) => setFooterForm({ ...footerForm, showNewsletter: e.target.checked })}
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
              <span>Detaylı Footer Ayarlarını Kaydet</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
