'use client';

import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCMSStore } from '@/lib/cms-store';

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

export default function ExistingHomePage() {
  const { homeSections } = useCMSStore();

  // Section Component Registry
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
