'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useCMSStore } from '@/lib/cms-store';
import { Calendar, Clock, User } from 'lucide-react';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const blogPosts = useCMSStore((state) => state.blogPosts);
  const post = blogPosts.find(b => b.slug === resolvedParams.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Header />
        <div className="py-20 text-center space-y-4">
          <h2 className="text-2xl font-bold">Blog yazısı bulunamadı.</h2>
          <Link href="/blog" className="bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl">Blog Sayfasına Dön</Link>
        </div>
        <Footer />
      </div>
    );
  }

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
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
              <p className="font-semibold text-slate-900 text-base">{post.excerpt}</p>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
