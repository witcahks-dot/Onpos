'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import { ArrowRight, Newspaper, Calendar, Clock, User } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function FintechBlogPage() {
  const { blogPosts } = useCMSStore();

  return (
    <FintechThemeShell>
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5 text-blue-400" />
            <span>Mali Mevzuat ve Fintek Haberleri</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Blog ve Duyurular
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-medium">
            Yeni nesil POS tebliğleri, Gelir İdaresi Başkanlığı düzenlemeleri ve ödeme teknolojileri rehberleri.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              const img = resolveImageUrl(post.coverImage, 'cover');
              return (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden h-48 bg-slate-100 border border-slate-200 relative">
                      <img
                        src={img}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-blue-600" /> {post.publishedAt}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-black text-slate-950 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-medium">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-4">
                    <span className="text-[11px] font-bold text-slate-600">
                      {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-extrabold px-4 py-2 rounded-full transition-all shadow-xs"
                    >
                      <span>Oku</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </FintechThemeShell>
  );
}
