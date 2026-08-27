'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCMSStore } from '@/lib/cms-store';

// ==========================================
// TEMA 1: KLASİK KURUMSAL POS BİLEŞENLERİ
// ==========================================
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

// ==========================================
// TEMA 2: MİNİMALİST FİNTECH DEMO BİLEŞENLERİ
// ==========================================
import FintechHeader from '@/components/theme2/FintechHeader';
import FintechHero from '@/components/theme2/FintechHero';
import FintechLogoWall from '@/components/theme2/FintechLogoWall';
import FintechProductsSection from '@/components/theme2/FintechProductsSection';
import FintechIntroSection from '@/components/theme2/FintechIntroSection';
import FintechServicesSection from '@/components/theme2/FintechServicesSection';
import FintechSolutionsSection from '@/components/theme2/FintechSolutionsSection';
import FintechBentoStats from '@/components/theme2/FintechBentoStats';
import FintechFaq from '@/components/theme2/FintechFaq';
import FintechWhyUsSection from '@/components/theme2/FintechWhyUsSection';
import FintechBlogSection from '@/components/theme2/FintechBlogSection';
import FintechTestimonialSection from '@/components/theme2/FintechTestimonialSection';
import FintechCtaBanner from '@/components/theme2/FintechCtaBanner';
import FintechFooter from '@/components/theme2/FintechFooter';

function DynamicThemePage() {
  const searchParams = useSearchParams();
  const { settings, homeSections, fetchCMSData } = useCMSStore();

  useEffect(() => {
    fetchCMSData();
  }, [fetchCMSData]);

  // Determine active theme (URL query param overrides DB setting for instant live preview)
  const queryTheme = searchParams.get('theme');
  const activeTheme = queryTheme === 'theme1'
    ? 'theme1'
    : queryTheme === 'theme2'
    ? 'theme2'
    : (settings.selectedTheme === 'theme1' || settings.activeTheme === 'theme1' ? 'theme1' : 'theme2');

  // Fallback section ordering
  const defaultSectionsOrder = [
    { id: 'hero', enabled: true, order: 1 },
    { id: 'references', enabled: true, order: 2 },
    { id: 'intro', enabled: true, order: 3 },
    { id: 'stats', enabled: true, order: 4 },
    { id: 'solutions', enabled: true, order: 5 },
    { id: 'products', enabled: true, order: 6 },
    { id: 'services', enabled: true, order: 7 },
    { id: 'faq', enabled: true, order: 8 },
    { id: 'whyUs', enabled: true, order: 9 },
    { id: 'blog', enabled: true, order: 10 },
    { id: 'testimonials', enabled: true, order: 11 },
    { id: 'quote', enabled: true, order: 12 },
  ];

  const activeSections = (homeSections && homeSections.length > 0)
    ? [...homeSections].sort((a, b) => a.order - b.order).filter(s => s.enabled)
    : defaultSectionsOrder.filter(s => s.enabled);

  // ==========================================
  // TEMA 2: SECTION RENDERER
  // ==========================================
  const renderTheme2Section = (id: string) => {
    switch (id) {
      case 'hero':
        return <FintechHero key="hero" />;
      case 'references':
        return <FintechLogoWall key="references" />;
      case 'intro':
        return <FintechIntroSection key="intro" />;
      case 'stats':
        return <FintechBentoStats key="stats" />;
      case 'solutions':
        return <FintechSolutionsSection key="solutions" />;
      case 'products':
        return <FintechProductsSection key="products" />;
      case 'services':
        return <FintechServicesSection key="services" />;
      case 'faq':
        return (
          <React.Fragment key="faq-cta-group">
            <FintechFaq />
            <FintechCtaBanner />
          </React.Fragment>
        );
      case 'whyUs':
        return <FintechWhyUsSection key="whyUs" />;
      case 'blog':
        return <FintechBlogSection key="blog" />;
      case 'testimonials':
        return <FintechTestimonialSection key="testimonials" />;
      case 'quote':
        return <QuoteFormSection key="quote" />;
      case 'projects':
        return <ProjectsSection key="projects" />;
      case 'cloud':
        return <TechnologyDashboardSection key="cloud" />;
      case 'team':
        return <TeamSection key="team" />;
      default:
        return null;
    }
  };

  // ==========================================
  // TEMA 1: SECTION RENDERER
  // ==========================================
  const renderTheme1Section = (id: string) => {
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

  // Render Theme 2
  if (activeTheme === 'theme2') {
    return (
      <div className="min-h-screen bg-[#fbfbfe] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
        <FintechHeader />
        <main className="flex-1 space-y-0">
          {activeSections.map((sec) => renderTheme2Section(sec.id))}
        </main>
        <FintechFooter />
      </div>
    );
  }

  // Render Theme 1
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      <main className="flex-1 space-y-0">
        {activeSections.map((sec) => renderTheme1Section(sec.id))}
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
