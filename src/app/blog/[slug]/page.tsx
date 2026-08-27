'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCMSStore } from '@/lib/cms-store';
import ThemeDispatcher from '@/themes/ThemeDispatcher';
import ExistingBlogDetailPage from '@/themes/existing/ExistingBlogDetailPage';
import FintechBlogDetailPage from '@/themes/fintech/FintechBlogDetailPage';

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
    <ThemeDispatcher
      existing={<ExistingBlogDetailPage post={post} />}
      fintech={<FintechBlogDetailPage post={post} />}
    />
  );
}

