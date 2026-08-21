'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckSquare, Sparkles, Building2, MapPin } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

export default function ProjectsSection() {
  const projects = useCMSStore((state) => state.projects);

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Başarı Hikayelerimiz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tamamlanan büyük ölçekli entegrasyon projeleri.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Kurumsal devlerin kasa dönüşümlerini görsel galeri ile keşfedin.
          </p>
        </div>

        {/* Visual Gallery Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Cover Image Container */}
              <div className="h-64 sm:h-72 relative overflow-hidden bg-slate-100">
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {proj.status}
                </div>

                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-3 text-xs text-blue-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{proj.client}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{proj.location}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">{proj.title}</h3>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-5 bg-slate-50/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200">
                  {proj.category}
                </span>

                <Link
                  href={`/projeler/${proj.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>Proje Detayı</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
