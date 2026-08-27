'use client';

import React, { useEffect } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import FintechHero from './components/FintechHero';
import FintechTrustLogos from './components/FintechTrustLogos';
import FintechConversionSection from './components/FintechConversionSection';
import FintechMetricsSection from './components/FintechMetricsSection';
import FintechFrictionlessSection from './components/FintechFrictionlessSection';
import FintechProductsSection from './components/FintechProductsSection';
import FintechFaqSection from './components/FintechFaqSection';
import FintechSubscribeBanner from './components/FintechSubscribeBanner';
import FintechGrowthCta from './components/FintechGrowthCta';

export default function FintechHomePage() {
  const { fetchCMSData } = useCMSStore();

  useEffect(() => {
    fetchCMSData();
  }, [fetchCMSData]);

  return (
    <FintechThemeShell>
      {/* 1. Fintech Hero with Advisor & 12+ Years Badge */}
      <FintechHero />

      {/* 2. Trust Logos Bar */}
      <FintechTrustLogos />

      {/* 3. Turn Clicks Into Conversions With Analytics Mockup */}
      <FintechConversionSection />

      {/* 4. Visual Balance & Metric Cards (50K / 70,000+) */}
      <FintechMetricsSection />

      {/* 5. Power Your Sales With Frictionless Payments */}
      <FintechFrictionlessSection />

      {/* 6. Next-Gen POS Products Showcase */}
      <FintechProductsSection />

      {/* 7. 2-Column Modern FAQ Accordion */}
      <FintechFaqSection />

      {/* 8. Black Rounded Subscribe Pill Banner */}
      <FintechSubscribeBanner />

      {/* 9. Need A Little More To Grow CTA */}
      <FintechGrowthCta />
    </FintechThemeShell>
  );
}
