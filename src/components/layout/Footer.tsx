'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, ArrowRight, Lock, Award, HeartHandshake } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function Footer() {
  const { settings, products, services, footerConfig } = useCMSStore();

  const cfg = footerConfig || {
    footerStyle: 'full',
    brandDescription: 'Hugin, Ingenico, Paygo, Inpos, Pax ve Beko yetkili satış & teknik servis noktası. 81 ilde 24 saatte adrese teslimat ve ikame cihaz garantisi.',
    copyrightText: '© 2026 PAYPOS Ödeme Teknolojileri. Tüm Hakları Saklıdır.',
    showSocialLinks: true,
    showWorkingHours: true,
    showPaymentBadges: true,
    quickLinksTitle: 'Hızlı Erişim',
    productsTitle: 'POS Çözümleri',
    contactTitle: 'İletişim & Destek',
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Badges */}
        {cfg.showPaymentBadges !== false && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
              <ShieldCheck className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm">PCI-PTS 6.x Güvenlik</h4>
                <p className="text-slate-400 mt-0.5">Uluslararası BDDK & EMV L1/L2 onaylı ödeme standartları.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
              <Lock className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm">P2PE Şifreleme</h4>
                <p className="text-slate-400 mt-0.5">End-to-End uçtan uca şifrelenmiş güvenli kart saklama altyapısı.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
              <Award className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm">GİB & ÖKC Onaylı</h4>
                <p className="text-slate-400 mt-0.5">Gelir İdaresi Başkanlığı yeni nesil mevzuat uyumlu mali hafıza.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
              <HeartHandshake className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm">7/24 Saha Desteği</h4>
                <p className="text-slate-400 mt-0.5">2 saat içinde adresinizde birebir ikame cihaz garantisi.</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <Link href="/" className="flex items-center gap-2.5">
              {settings.logoUrl && settings.logoUrl.trim() !== '' ? (
                <img
                  src={settings.logoUrl}
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
              {cfg.brandDescription || 'PAYPOS Ödeme Teknolojileri A.Ş., fiziki mağazalardan mobil sahalara kadar tüm ölçekteki işletmeler için yeni nesil akıllı POS ve ödeme altyapıları sunan lider teknoloji firmasıdır.'}
            </p>
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

            {/* E-Bülten Aboneliği Formu */}
            <div className="pt-3">
              <span className="text-[11px] font-bold text-white block mb-1.5">E-Bülten & Mevzuat Güncellemeleri</span>
              <FooterNewsletterForm />
            </div>
          </div>

          {/* Col 2: POS Devices */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              POS Ürünleri
            </h4>
            <ul className="space-y-2 text-xs">
              {(products || []).slice(0, 5).map(prod => (
                <li key={prod.id}>
                  <Link href={`/pos-cihazlari/${prod.slug}`} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span>{prod.name}</span>
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
              Hizmetler & Çözümler
            </h4>
            <ul className="space-y-2 text-xs">
              {(services || []).map(serv => (
                <li key={serv.id}>
                  <Link href={`/hizmetler/${serv.slug}`} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span>{serv.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cozumler" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Sektörel Ödeme Çözümleri</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Kurumsal & Destek
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/kurumsal/hakkimizda" className="hover:text-blue-400 transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/kurumsal/tarihcemiz" className="hover:text-blue-400 transition-colors">
                  Tarihçe & Kronoloji
                </Link>
              </li>
              <li>
                <Link href="/kurumsal/belgelerimiz" className="hover:text-blue-400 transition-colors">
                  Sertifika ve Belgeler
                </Link>
              </li>
              <li>
                <Link href="/kurumsal/referanslar" className="hover:text-blue-400 transition-colors">
                  Referanslarımız
                </Link>
              </li>
              <li>
                <Link href="/kurumsal/ekibimiz" className="hover:text-blue-400 transition-colors">
                  Yönetim Ekibi
                </Link>
              </li>
              <li>
                <Link href="/kurumsal/kariyer" className="hover:text-blue-400 transition-colors">
                  Kariyer Pozisyonları
                </Link>
              </li>
              <li>
                <Link href="/kurumsal/banka-hesaplari" className="hover:text-blue-400 transition-colors">
                  Banka Hesapları & IBAN
                </Link>
              </li>
              <li>
                <Link href="/kurumsal/e-katalog" className="hover:text-blue-400 transition-colors">
                  E-Katalog PDF Center
                </Link>
              </li>
              <li>
                <Link href="/sss" className="hover:text-blue-400 transition-colors">
                  Sıkça Sorulan Sorular (SSS)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {cfg.copyrightText || '© 2026 PAYPOS Ödeme Teknolojileri. Tüm Hakları Saklıdır.'}
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/kurumsal/kvkk" className="hover:text-slate-300 transition-colors">
              KVKK Aydınlatma Metni
            </Link>
            <span>•</span>
            <Link href="/kurumsal/gizlilik" className="hover:text-slate-300 transition-colors">
              Gizlilik Politikası
            </Link>
            <span>•</span>
            <Link href="/kurumsal/cerezler" className="hover:text-slate-300 transition-colors">
              Çerez Politikası
            </Link>
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

function FooterNewsletterForm() {
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
          placeholder="E-posta adresiniz"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shrink-0 disabled:opacity-50"
        >
          {status === 'submitting' ? '...' : 'Abone Ol'}
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

