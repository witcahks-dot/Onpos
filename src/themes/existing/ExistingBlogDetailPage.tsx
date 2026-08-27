'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { BlogPost } from '@/types';
import { Calendar, Clock, User } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';

export default function ExistingBlogDetailPage({ post }: { post: BlogPost }) {
  const coverImg = resolveImageUrl(post.coverImage, 'cover');

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

        <article className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-4 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">{post.title}</h1>
              
              <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-blue-600" /> {post.author} ({post.authorRole})</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-600" /> {post.publishedAt}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-600" /> {post.readTime}</span>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg h-96 border border-slate-200">
              <img src={coverImg} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
              <p className="font-semibold text-slate-900 text-base">{post.excerpt}</p>
              <div dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
