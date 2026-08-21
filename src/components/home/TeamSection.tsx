'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { IconLinkedin } from '@/components/ui/SocialIcons';
import { useCMSStore } from '@/lib/cms-store';

export default function TeamSection() {
  const team = useCMSStore((state) => state.team);

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>Yönetim ve Uzman Kadro</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Ödeme teknolojilerinin arkasındaki <span className="text-gradient-blue">deneyimli ekip.</span>
            </h2>
          </div>
          <Link
            href="/kurumsal/ekibimiz"
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Tüm Ekibimizi Gör →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all text-center space-y-4 group"
            >
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">{member.title}</p>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2">{member.bio}</p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2 border-t border-slate-200/60">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <IconLinkedin className="w-4 h-4" />
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
