'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FaqSection from '@/components/home/FaqSection';

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Sıkça Sorulan Sorular' }]} />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
