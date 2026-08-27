'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import { Plus, ArrowUpRight, Calendar } from 'lucide-react';

export default function FintechBlogSection() {
  const { blogPosts } = useCMSStore();

  const posts = (blogPosts || []).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-100/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/70 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                GÜNCEL BLOG & MEVZUAT
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Ödeme Dünyasından <span className="text-slate-900">Haberler.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg">
              e-Fatura tebliğleri, yeni nesil POS mevzuatları ve işletme tasarruf ipuçları.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900 hover:text-slate-600 transition-colors shrink-0"
          >
            <span>Tüm Yazıları Gör</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Card Minimalist Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#fbfbfe] rounded-[28px] border border-slate-200/80 hover:border-slate-400/80 overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xs hover:shadow-lg"
            >
              {/* Cover Image */}
              <div className="h-52 relative overflow-hidden bg-slate-900">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs font-bold">
                    PAYPOS BLOG
                  </div>
                )}
                <span className="absolute bottom-3 left-4 text-[10px] font-black uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1 rounded-full shadow-sm">
                  {post.category || 'Mevzuat'}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{post.publishedAt || '2025'}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-slate-700 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">Devamını Oku</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
                    aria-label="Oku"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
