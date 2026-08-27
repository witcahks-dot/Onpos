'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/lib/cms-store';
import FintechThemeShell from './FintechThemeShell';
import { ProjectItem } from '@/types';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Building, Check } from 'lucide-react';
import { resolveImageUrl } from '@/lib/data-normalizers';
import QuoteModal from '@/components/ui/QuoteModal';

export default function FintechProjectDetailPage({ project }: { project: ProjectItem }) {
  const { projects } = useCMSStore();
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(0);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const coverImg = resolveImageUrl(project.coverImage, 'cover');
  const gallery = (project.gallery && project.gallery.length > 0) ? project.gallery : [coverImg];
  const otherProjects = (projects || []).filter(p => p.id !== project.id).slice(0, 3);

  return (
    <FintechThemeShell>
      <div className="bg-slate-50 border-b border-slate-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-950">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/projeler" className="hover:text-slate-950">Projeler</Link>
            <span>/</span>
            <span className="text-slate-950 truncate max-w-xs">{project.title}</span>
          </div>

          <Link href="/projeler" className="flex items-center gap-1 text-slate-800 hover:text-blue-600">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Projelere Dön</span>
          </Link>
        </div>
      </div>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
                  {project.category || 'Kurumsal Proje'}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                  {project.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5"><Building className="w-4 h-4 text-slate-700" /> Müşteri: {project.client}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-700" /> Konum: {project.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-700" /> Tarih: {project.completionDate}</span>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 max-h-[440px]">
                <img src={resolveImageUrl(gallery[selectedGalleryImg], 'cover')} alt={project.title} className="w-full h-full object-cover" />
              </div>

              {gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedGalleryImg(i)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedGalleryImg === i ? 'border-slate-950 shadow-md' : 'border-slate-200 opacity-60'
                      }`}
                    >
                      <img src={resolveImageUrl(img, 'cover')} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="prose max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                <p>{project.description}</p>
              </div>

              {project.utilizedProducts && project.utilizedProducts.length > 0 && (
                <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">
                    Kullanılan Donanım & Çözümler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.utilizedProducts.map((p, i) => (
                      <span key={i} className="bg-white border border-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6 sticky top-24">
              <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <h3 className="text-xl font-black text-white">
                  Benzer Bir Projeniz Mi Var?
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  İşletmenizin şube ve filo ölçeğine göre anahtar teslim ödeme donanımı ve entegrasyon teklifi hazırlayalım.
                </p>

                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="w-full bg-white hover:bg-slate-100 text-slate-950 font-black py-3.5 px-6 rounded-full transition-all text-xs active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proje Teklifi Al</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {otherProjects.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Diğer Projelerimiz
                  </h4>
                  <div className="space-y-2">
                    {otherProjects.map(p => (
                      <Link
                        key={p.id}
                        href={`/projeler/${p.slug}`}
                        className="block p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-extrabold text-slate-800 hover:text-blue-600"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </FintechThemeShell>
  );
}
