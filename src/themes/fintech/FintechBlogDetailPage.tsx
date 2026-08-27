'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import { BlogPost } from '@/types';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function FintechBlogDetailPage({ post }: { post: BlogPost }) {
  const { blogPosts } = useCMSStore();
  const coverImg = resolveImageUrl(post.coverImage, 'cover');
  const otherPosts = (blogPosts || []).filter(p => p.id !== post.id).slice(0, 3);

  return (
    <FintechThemeShell>
      <div className="bg-slate-50 border-b border-slate-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-950">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-slate-950">Blog</Link>
            <span>/</span>
            <span className="text-slate-950 truncate max-w-xs">{post.title}</span>
          </div>

          <Link href="/blog" className="flex items-center gap-1 text-slate-800 hover:text-blue-600">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tüm Yazılar</span>
          </Link>
        </div>
      </div>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-4 text-center">
            <span className="inline-block bg-blue-50 text-blue-800 text-xs font-black px-3.5 py-1 rounded-full">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-xs text-slate-500 font-bold">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-700" /> {post.author} ({post.authorRole || 'Yazar'})</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-700" /> {post.publishedAt}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-700" /> {post.readTime}</span>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 max-h-[460px]">
            <img src={coverImg} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div
            className="prose max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed font-medium space-y-4 pt-4"
            dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2">Etiketler:</span>
              {post.tags.map((t, i) => (
                <span key={i} className="bg-slate-100 text-slate-800 text-[11px] font-bold px-3 py-1 rounded-full">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {otherPosts.length > 0 && (
            <div className="pt-12 border-t border-slate-200 space-y-6">
              <h3 className="text-xl font-black text-slate-950">Diğer Yazılar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {otherPosts.map(p => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all space-y-2 group"
                  >
                    <span className="text-[10px] font-bold text-blue-600 uppercase block">{p.category}</span>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {p.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </FintechThemeShell>
  );
}
