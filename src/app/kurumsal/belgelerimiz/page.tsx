'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { ShieldCheck, FileText, Download } from 'lucide-react';

export default function CertificatesPage() {
  const docs = [
    { title: 'PCI-PTS 6.x Uluslararası Güvenlik Sertifikası', code: 'CERT-PCI-2026-99', file: '/docs/pci-pts-cert.pdf' },
    { title: 'EMV Level 1 & Level 2 Kart Okuyucu Onayı', code: 'CERT-EMV-L1L2-04', file: '/docs/emv-l1l2-cert.pdf' },
    { title: 'GİB Yeni Nesil ÖKC Uyum Sertifikası', code: 'CERT-GIB-OKC-2026', file: '/docs/gib-okc-cert.pdf' },
    { title: 'ISO/IEC 27001 Bilgi Güvenliği Yönetim Sistemi', code: 'ISO-27001-2026-PAY', file: '/docs/iso-27001.pdf' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Kurumsal', href: '/kurumsal/hakkimizda' }, { label: 'Belgelerimiz & Sertifikalar' }]} />

        <section className="bg-slate-50 py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Uluslararası Güvence</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Sertifikalarımız ve <span className="text-gradient-blue">Yetki Belgelerimiz</span>
            </h1>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {docs.map((doc, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                    <span className="text-[11px] font-mono text-slate-400 block mt-0.5">{doc.code}</span>
                  </div>
                </div>

                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-colors"
                  title="PDF İndir"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
