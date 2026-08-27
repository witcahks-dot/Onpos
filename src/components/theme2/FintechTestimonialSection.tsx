'use client';

import React from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Plus, Star, Quote } from 'lucide-react';

export default function FintechTestimonialSection() {
  const { testimonials } = useCMSStore();

  const approved = (testimonials || []).filter(t => t.isApproved !== false);
  if (approved.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-[#fbfbfe] border-b border-slate-100/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
              <Plus className="w-3 h-3 stroke-[2.5]" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
              MÜŞTERİ DENEYİMLERİ & YORUMLAR
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            İşletmeler Bizim İçin <span className="text-slate-900">Ne Diyor?</span>
          </h2>
        </div>

        {/* 3-Card Minimalist Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approved.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[28px] p-7 sm:p-8 border border-slate-200/80 hover:border-slate-400/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                "{item.comment}"
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {item.authorName?.charAt(0) || 'U'}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-black text-slate-900">{item.authorName}</h4>
                  <p className="text-[10px] text-slate-500">{item.company} • {item.authorTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
