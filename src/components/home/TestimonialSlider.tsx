'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function TestimonialSlider() {
  const testimonials = useCMSStore((state) => state.testimonials);
  const approved = (testimonials || []).filter(t => t.isApproved);
  const [index, setIndex] = useState(0);

  if (approved.length === 0) return null;

  const current = approved[index];

  const next = () => setIndex((index + 1) % approved.length);
  const prev = () => setIndex((index - 1 + approved.length) % approved.length);

  return (
    <section className="py-20 bg-white border-b border-slate-100 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>Müşteri Yorumları</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            İşletmeler PAYPOS hakkında <span className="text-gradient-blue">ne diyor?</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg relative">
          <Quote className="w-16 h-16 text-blue-200/80 absolute top-6 right-8 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            {/* Avatar */}
            <img
              src={current.avatar}
              alt={current.authorName}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md shrink-0"
            />

            <div className="space-y-4 text-center sm:text-left flex-1">
              {/* Stars */}
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Comment text */}
              <p className="text-base sm:text-lg text-slate-700 italic font-medium leading-relaxed">
                "{current.comment}"
              </p>

              {/* Author details */}
              <div>
                <h4 className="text-base font-bold text-slate-900">{current.authorName}</h4>
                <p className="text-xs text-slate-500 font-semibold">
                  {current.authorTitle} — <span className="text-blue-600 font-bold">{current.company}</span> ({current.city})
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200/60">
            <span className="text-xs text-slate-400 font-mono">
              {index + 1} / {approved.length} Yorum
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="p-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-sm"
                aria-label="Önceki Yorum"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-sm"
                aria-label="Sonraki Yorum"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
