'use client';

import React, { use } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useCMSStore } from '@/lib/cms-store';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import QuoteModal from '@/components/ui/QuoteModal';

export default function KurumsalCustomPageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const { customPages } = useCMSStore();
  const page = customPages.find(p => p.slug === slug || p.id === `cp-${slug}`);

  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);

  if (!page) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900">Sayfa Bulunamadı</h1>
            <p className="text-xs text-slate-500">Aradığınız kurumsal sayfa henüz eklenmemiş olabilir.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Kurumsal', href: '/kurumsal/hakkimizda' }, { label: page.title }]} />

        {/* Page Hero Header */}
        <section className="bg-slate-900 text-white py-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3.5 py-1 rounded-full border border-blue-500/20">
              Kurumsal
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{page.title}</h1>
            {page.summary && <p className="text-sm text-slate-300 leading-relaxed font-normal">{page.summary}</p>}
          </div>
        </section>

        {/* Page Content Body */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {page.coverImage && (
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-80">
                <img src={page.coverImage} alt={page.title} className="w-full h-full object-cover" />
              </div>
            )}

            {page.contentHtml && (
              <div
                className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: page.contentHtml }}
              />
            )}

            {(page.blocks || []).map((block) => {
              if (block.type === 'text') {
                return (
                  <div key={block.id} className="space-y-2">
                    {block.title && <h3 className="text-xl font-bold text-slate-900">{block.title}</h3>}
                    <p className="text-sm text-slate-600 leading-relaxed">{block.content}</p>
                  </div>
                );
              }

              if (block.type === 'callout') {
                return (
                  <div key={block.id} className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-2">
                    {block.title && <h4 className="font-bold text-blue-900 text-base">{block.title}</h4>}
                    <p className="text-xs text-blue-800 leading-relaxed">{block.content}</p>
                  </div>
                );
              }

              if (block.type === 'features') {
                return (
                  <div key={block.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                    {block.title && <h4 className="font-bold text-slate-900 text-base">{block.title}</h4>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
                      {(block.items || []).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (block.type === 'cta') {
                return (
                  <div key={block.id} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <h4 className="text-lg font-bold">{block.title || 'Hemen Teklif Alın'}</h4>
                      <p className="text-xs text-blue-100 mt-1">{block.content || 'İşletmenize özel teklif paketleri.'}</p>
                    </div>
                    <button
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="bg-white text-blue-600 hover:bg-blue-50 text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{block.ctaText || 'Teklif Al'}</span>
                    </button>
                  </div>
                );
              }

              return null;
            })}

          </div>
        </section>
      </main>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
      <Footer />
    </div>
  );
}
