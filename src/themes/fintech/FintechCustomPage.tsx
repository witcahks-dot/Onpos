'use client';

import React from 'react';
import Link from 'next/link';
import FintechThemeShell from './FintechThemeShell';
import { CustomPage } from '@/types';
import { FileText, ArrowLeft } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function FintechCustomPage({ page }: { page: CustomPage }) {
  const coverImg = page.coverImage ? resolveImageUrl(page.coverImage, 'cover') : null;

  return (
    <FintechThemeShell>
      {/* Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Kurumsal Bilgi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {page.title}
          </h1>
          {page.summary && (
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-medium">
              {page.summary}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {coverImg && (
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 max-h-[400px]">
              <img src={coverImg} alt={page.title} className="w-full h-full object-cover" />
            </div>
          )}

          {page.contentHtml && (
            <div
              className="prose max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed font-medium space-y-4"
              dangerouslySetInnerHTML={{ __html: page.contentHtml }}
            />
          )}

          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-black text-slate-900 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </div>
        </div>
      </section>
    </FintechThemeShell>
  );
}
