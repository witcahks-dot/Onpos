'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, ArrowRight, Lock, Award, HeartHandshake } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function Footer() {
  const { settings, products, services, footerConfig } = useCMSStore();

  const cfg = footerConfig || {
    footerStyle: 'full',
    footerLogoUrl: 'https://www.yazarkasasatisi.com/upload/logos/POSLOGO.jpg',
    brandDescription: 'Hugin, Ingenico, Paygo, Inpos, Pax ve Beko yetkili satış & teknik servis noktası. 81 ilde 24 saatte adrese teslimat ve ikame cihaz garantisi.',
    showContactInfoUnderLogo: true,
    showFeatureCards: true,
    featureCards: [
      { id: 'f1', title: 'PCI-PTS 6.x Güvenlik', subtitle: 'Uluslararası BDDK & EMV L1/L2 onaylı ödeme standartları.', iconName: 'ShieldCheck' },
      { id: 'f2', title: 'P2PE Şifreleme', subtitle: 'End-to-End uçtan uca şifrelenmiş güvenli kart saklama altyapısı.', iconName: 'Lock' },
      { id: 'f3', title: 'GİB & ÖKC Onaylı', subtitle: 'Gelir İdaresi Başkanlığı yeni nesil mevzuat uyumlu mali hafıza.', iconName: 'Award' },
      { id: 'f4', title: '7/24 Saha Desteği', subtitle: '2 saat içinde adresinizde birebir ikame cihaz garantisi.', iconName: 'HeartHandshake' },
    ],
    col1Title: 'POS ÜRÜNLERİ',
    col1Links: [
      { id: 'l1', label: 'Hugin Tiger T300 4G Yazarkasa POS', href: '/pos-cihazlari/hugin-tiger-t300', isVisible: true },
      { id: 'l2', label: 'Inpos M530 Mobil Yazarkasa POS', href: '/pos-cihazlari/inpos-m530', isVisible: true },
      { id: 'l3', label: 'Paygo SP630 ECR 4G Pro Yazarkasa POS', href: '/pos-cihazlari/paygo-sp630', isVisible: true },
      { id: 'l4', label: 'Ingenico Move 5000F Mobil Yazarkasa POS', href: '/pos-cihazlari/ingenico-move-5000f', isVisible: true },
      { id: 'l5', label: 'Hugin S1 Android Yazarkasa POS', href: '/pos-cihazlari/hugin-s1', isVisible: true },
    ],
    col2Title: 'HİZMETLER & ÇÖZÜMLER',
    col2Links: [
      { id: 's1', label: 'Yazarkasa POS Yetkili Satış & Adreste Kurulum', href: '/hizmetler/satis-ve-kurulum', isVisible: true },
      { id: 's2', label: 'Ödeal & Düşük Komisyonlu Ödeme Altyapısı', href: '/cozumler/odeko-komisyon', isVisible: true },
      { id: 's3', label: '7/24 Kesintisiz Yerinde Teknik Servis & İkame', href: '/hizmetler/7-24-teknik-servis', isVisible: true },
      { id: 's4', label: 'e-Fatura & e-Arşiv Entegrasyon Danışmanlığı', href: '/hizmetler/e-fatura-danismanligi', isVisible: true },
      { id: 's5', label: 'Sektörel Ödeme Çözümleri', href: '/cozumler', isVisible: true },
    ],
    col3Title: 'KURUMSAL & DESTEK',
    col3Links: [
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
    showNewsletter: true,
    newsletterTitle: 'Mali & Mevzuat Güncellemeleri',
    newsletterSubtitle: 'Yeni GİB tebliğleri ve komisyon avantajlarından ilk siz haberdar olun.',
    newsletterPlaceholder: 'E-posta adresiniz',
    newsletterButtonText: 'Abone Ol',
    copyrightText: '© 2026 PAYPOS Ödeme Teknolojileri A.Ş. Tüm Hakları Saklıdır.',
    legalLinks: [
      { id: 'leg1', label: 'KVKK Aydınlatma Metni', href: '/kurumsal/kvkk', isVisible: true },
      { id: 'leg2', label: 'Gizlilik Politikası', href: '/kurumsal/gizlilik', isVisible: true },
      { id: 'leg3', label: 'Çerez Politikası', href: '/kurumsal/cerezler', isVisible: true },
    ],
    showSocialLinks: true,
    showWorkingHours: true,
    showPaymentBadges: true,
  };

  const logoToRender = cfg.footerLogoUrl || settings.logoUrl;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Badges Bar */}
        {cfg.showFeatureCards !== false && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-xs">
            {(cfg.featureCards || []).map(card => (
              <div key={card.id} className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                <ShieldCheck className="w-8 h-8 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm">{card.title}</h4>
                  <p className="text-slate-400 mt-0.5">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <Link href="/" className="flex items-center gap-2.5">
              {logoToRender && logoToRender.trim() !== '' ? (
                <img
                  src={logoToRender}
                  alt={settings.siteName || 'Logo'}
                  style={{ height: `${(settings.logoHeight || 36) + 4}px` }}
                  className="object-contain max-w-[220px] bg-white/95 p-1.5 rounded-lg border border-slate-700 shadow-md"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-600/30">
                    P
                  </div>
                  <span className="text-xl font-extrabold text-white tracking-tight">
                    PAY<span className="text-blue-500">POS</span>
                  </span>
                </div>
              )}
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {cfg.brandDescription || 'Hugin, Ingenico, Paygo, Inpos, Pax ve Beko yetkili satış & teknik servis noktası.'}
            </p>

            {cfg.showContactInfoUnderLogo !== false && (
              <div className="space-y-2 text-xs text-slate-400 pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{settings.phoneFormatted}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{settings.email}</span>
                </div>
              </div>
            )}

            {/* E-Bülten Aboneliği Formu */}
            {cfg.showNewsletter !== false && (
              <div className="pt-3">
                <span className="text-[11px] font-bold text-white block mb-1.5">{cfg.newsletterTitle || 'E-Bülten & Mevzuat Güncellemeleri'}</span>
                <FooterNewsletterForm placeholder={cfg.newsletterPlaceholder} buttonText={cfg.newsletterButtonText} />
              </div>
            )}
          </div>

          {/* Col 2: POS Devices / Custom Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {cfg.col1Title || 'POS ÜRÜNLERİ'}
            </h4>
            <ul className="space-y-2 text-xs">
              {(cfg.col1Links && cfg.col1Links.length > 0
                ? cfg.col1Links.filter(l => l.isVisible)
                : (products || []).slice(0, 5).map(p => ({ id: p.id, label: p.name, href: `/pos-cihazlari/${p.slug}`, isVisible: true }))
              ).map(link => (
                <li key={link.id}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/pos-cihazlari" className="text-blue-400 font-semibold hover:underline flex items-center gap-1 mt-2">
                  <span>Tüm Kataloğu İncele</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Solutions & Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {cfg.col2Title || 'HİZMETLER & ÇÖZÜMLER'}
            </h4>
            <ul className="space-y-2 text-xs">
              {(cfg.col2Links && cfg.col2Links.length > 0
                ? cfg.col2Links.filter(l => l.isVisible)
                : (services || []).map(s => ({ id: s.id, label: s.name, href: `/hizmetler/${s.slug}`, isVisible: true }))
              ).map(link => (
                <li key={link.id}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Corporate & Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {cfg.col3Title || 'KURUMSAL & DESTEK'}
            </h4>
            <ul className="space-y-2 text-xs">
              {(cfg.col3Links && cfg.col3Links.length > 0
                ? cfg.col3Links.filter(l => l.isVisible)
                : [
                    { id: 'k1', label: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
                    { id: 'k2', label: 'Tarihçe & Kronoloji', href: '/kurumsal/tarihcemiz' },
                    { id: 'k3', label: 'Sertifika ve Belgeler', href: '/kurumsal/belgelerimiz' },
                    { id: 'k4', label: 'Referanslarımız', href: '/kurumsal/referanslar' },
                    { id: 'k5', label: 'Yönetim Ekibi', href: '/kurumsal/ekibimiz' },
                    { id: 'k6', label: 'Kariyer Pozisyonları', href: '/kurumsal/kariyer' },
                    { id: 'k7', label: 'Banka Hesapları & IBAN', href: '/kurumsal/banka-hesaplari' },
                    { id: 'k8', label: 'E-Katalog PDF Center', href: '/kurumsal/e-katalog' },
                    { id: 'k9', label: 'Sıkça Sorulan Sorular (SSS)', href: '/sss' },
                  ]
              ).map(link => (
                <li key={link.id}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {cfg.copyrightText || '© 2026 PAYPOS Ödeme Teknolojileri A.Ş. Tüm Hakları Saklıdır.'}
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {(cfg.legalLinks && cfg.legalLinks.length > 0
              ? cfg.legalLinks.filter(l => l.isVisible)
              : [
                  { id: 'l1', label: 'KVKK Aydınlatma Metni', href: '/kurumsal/kvkk' },
                  { id: 'l2', label: 'Gizlilik Politikası', href: '/kurumsal/gizlilik' },
                  { id: 'l3', label: 'Çerez Politikası', href: '/kurumsal/cerezler' },
                ]
            ).map((link, idx) => (
              <React.Fragment key={link.id}>
                {idx > 0 && <span>•</span>}
                <Link href={link.href} className="hover:text-slate-300 transition-colors">
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
            <span>•</span>
            <Link href="/admin" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Yönetici Paneli (CMS Login)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterNewsletterForm({ placeholder, buttonText }: { placeholder?: string; buttonText?: string }) {
  const subscribeNewsletter = useCMSStore((state) => state.subscribeNewsletter);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('submitting');
    const ok = await subscribeNewsletter(email);
    if (ok) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder || 'E-posta adresiniz'}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
        >
          {status === 'submitting' ? '...' : (buttonText || 'Abone Ol')}
        </button>
      </div>
      {status === 'success' && (
        <span className="text-[10px] font-bold text-emerald-400 block">✓ E-bülten kaydınız başarıyla alındı!</span>
      )}
      {status === 'error' && (
        <span className="text-[10px] font-bold text-rose-400 block">Kayıt oluşturulurken bir hata oluştu.</span>
      )}
    </form>
  );
}
