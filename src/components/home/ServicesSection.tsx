'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function ServicesSection() {
  const services = useCMSStore((state) => state.services);

  const fallbackImages = [
    '/images/corporate-intro-demo.jpg',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop',
  ];

  return (
    <section className="theme-section-py bg-slate-50/50 border-b border-slate-100 selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Visual Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-theme-primary-light text-theme-primary px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-theme-primary-light shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
            <span>HİZMET PORTFÖYÜ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            İşletmenizin ihtiyacına özel <span className="text-gradient-theme">ödeme hizmetleri.</span>
          </h2>
          <p className="text-sm text-slate-600 font-medium max-w-xl mx-auto">
            Fiziki mağazalardan mobil teslimatlara kadar tüm ödeme altyapınızı güçlendiren kurumsal çözümler.
          </p>
        </div>

        {/* PURE VISUAL SERVICES GRID (ZERO OVERLAY TEXT/ICONS ON IMAGES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {(services || []).map((service, idx) => {
            const coverImage = (service.images && service.images[0] && service.images[0].trim() !== '')
              ? service.images[0]
              : fallbackImages[idx % fallbackImages.length];
            
            return (
              <div
                key={service.id}
                className="theme-card hover:border-theme-primary transition-all duration-500 flex flex-col justify-between overflow-hidden group border border-slate-200/90 shadow-md bg-white rounded-3xl"
              >
                {/* PURE CLEAN IMAGE CANVAS (NO OVERLAY BADGES OR ICONS) */}
                <div className="h-60 sm:h-64 relative overflow-hidden bg-slate-900">
                  <img
                    src={coverImage}
                    alt={service.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImages[idx % fallbackImages.length];
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95"
                  />
                </div>

                {/* Concise Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-theme-primary bg-theme-primary-light px-2.5 py-1 rounded-md inline-block mb-2">
                      {service.category}
                    </span>
                    
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-theme-primary transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed line-clamp-2">
                      {service.shortDesc}
                    </p>
                  </div>

                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-black text-slate-900 group-hover:text-theme-primary transition-colors pt-3.5 border-t border-slate-100 whitespace-nowrap"
                  >
                    <span>Detaylı İncele</span>
                    <ArrowRight className="w-4 h-4 text-theme-primary group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
