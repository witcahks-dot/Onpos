'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SolutionsSection from '@/components/home/SolutionsSection';

export default function ExistingSolutionsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Çözümler' }]} />
        <SolutionsSection />
      </main>
      <Footer />
    </div>
  );
}
