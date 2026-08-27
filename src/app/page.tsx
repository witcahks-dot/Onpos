'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCMSStore } from '@/lib/cms-store';

// Tema 1 (Klasik Kurumsal POS) Bileşenleri
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SpatialPosSlider from '@/components/hero/SpatialPosSlider';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import CorporateIntro from '@/components/home/CorporateIntro';
import ServicesSection from '@/components/home/ServicesSection';
import ReferencesLogoWall from '@/components/home/ReferencesLogoWall';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import FaqSection from '@/components/home/FaqSection';
import LatestNewsSection from '@/components/home/LatestNewsSection';
import SolutionsSection from '@/components/home/SolutionsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import TechnologyDashboardSection from '@/components/home/TechnologyDashboardSection';
import TeamSection from '@/components/home/TeamSection';
import TestimonialSlider from '@/components/home/TestimonialSlider';
import TrustStats from '@/components/home/TrustStats';

// Tema 2 (Minimalist Fintech & SaaS Demo) Bileşenleri
import FintechHeader from '@/components/theme2/FintechHeader';
import FintechHero from '@/components/theme2/FintechHero';
import FintechLogoWall from '@/components/theme2/FintechLogoWall';
import FintechFeatureInsights from '@/components/theme2/FintechFeatureInsights';
import FintechBentoStats from '@/components/theme2/FintechBentoStats';
import FintechFeaturePayments from '@/components/theme2/FintechFeaturePayments';
import FintechFaq from '@/components/theme2/FintechFaq';
import FintechCtaBanner from '@/components/theme2/FintechCtaBanner';
import FintechFooter from '@/components/theme2/FintechFooter';

function DynamicThemePage() {
  const searchParams = useSearchParams();
  const { settings, homeSections, fetchCMSData } = useCMSStore();

  useEffect(() => {
    fetchCMSData();
  }, [fetchCMSData]);

  // Determine active theme (URL query param overrides DB setting for live testing)
  const queryTheme = searchParams.get('theme');
  const activeTheme = queryTheme === 'theme1'
    ? 'theme1'
    : queryTheme === 'theme2'
    ? 'theme2'
    : (settings.selectedTheme === 'theme1' || settings.activeTheme === 'theme1' ? 'theme1' : 'theme2');

  // ==========================================
  // TEMA 2: MINIMALIST FINTECH & SAAS DEMO TASARIMI
  // ==========================================
  if (activeTheme === 'theme2') {
    return (
      <div className="min-h-screen bg-[#fbfbfe] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
        {/* Minimalist Floating Pill Header */}
        <FintechHeader />

        <main className="flex-1 space-y-0">
          {/* Asymmetric Hero with Portrait & Floating Finance Curve */}
          <FintechHero />

          {/* Monochrome Logo Wall */}
          <FintechLogoWall />

          {/* Feature 1: Turn Clicks Into Conversions Stack */}
          <FintechFeatureInsights />

          {/* Bento Grid: Balance Card, 50K & 70K Clients */}
          <FintechBentoStats />

          {/* Feature 2: Frictionless Payments & Mobile POS */}
          <FintechFeaturePayments />

          {/* Minimalist 2-Column FAQ Accordion */}
          <FintechFaq />

          {/* Dark Rounded Curved Newsletter Banner */}
          <FintechCtaBanner />

          {/* Embedded Lead/Quote Form */}
          <QuoteFormSection />
        </main>

        {/* Minimalist 4-Column Footer & Dark Copyright Strip */}
        <FintechFooter />
      </div>
    );
  }

  // ==========================================
  // TEMA 1: KLASIK KURUMSAL POS TEMASI
  // ==========================================
  const renderSectionComponent = (id: string) => {
    switch (id) {
      case 'hero':
        return <SpatialPosSlider key="hero" />;
      case 'products':
        return <FeaturedProductsSection key="products" />;
      case 'intro':
        return <CorporateIntro key="intro" />;
      case 'services':
        return <ServicesSection key="services" />;
      case 'references':
        return <ReferencesLogoWall key="references" />;
      case 'quote':
        return <QuoteFormSection key="quote" />;
      case 'whyUs':
        return <WhyUsSection key="whyUs" />;
      case 'faq':
        return <FaqSection key="faq" />;
      case 'blog':
        return <LatestNewsSection key="blog" />;
      case 'solutions':
        return <SolutionsSection key="solutions" />;
      case 'projects':
        return <ProjectsSection key="projects" />;
      case 'cloud':
        return <TechnologyDashboardSection key="cloud" />;
      case 'team':
        return <TeamSection key="team" />;
      case 'testimonials':
        return <TestimonialSlider key="testimonials" />;
      case 'stats':
        return <TrustStats key="stats" />;
      default:
        return null;
    }
  };

  const defaultSectionsOrder = [
    { id: 'hero', enabled: true, order: 1 },
    { id: 'products', enabled: true, order: 2 },
    { id: 'intro', enabled: true, order: 3 },
    { id: 'services', enabled: true, order: 4 },
    { id: 'references', enabled: true, order: 5 },
    { id: 'quote', enabled: true, order: 6 },
  ];

  const activeSections = (homeSections && homeSections.length > 0)
    ? [...homeSections].sort((a, b) => a.order - b.order).filter(s => s.enabled)
    : defaultSectionsOrder.filter(s => s.enabled);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      <main className="flex-1 space-y-0">
        {activeSections.map((sec) => renderSectionComponent(sec.id))}
      </main>
      <Footer />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fbfbfe]" />}>
      <DynamicThemePage />
    </Suspense>
  );
}
