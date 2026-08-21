'use client';

import React from 'react';
import NextLink from 'next/link';
import { Phone, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { IconWhatsapp } from '@/components/ui/SocialIcons';
import { useCMSStore } from '@/lib/cms-store';

export default function Topbar() {
  const settings = useCMSStore((state) => state.settings);

  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-2 border-b border-slate-900 selection:bg-blue-600 selection:text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left: Clean Announcement */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-300">
          <span className="bg-blue-600/30 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider text-[9px] font-black hidden sm:inline-block">
            YETKİLİ SATIŞ & TEKNİK SERVİS
          </span>
          <span className="truncate">81 İlde 24 Saatte Adrese Teslimat ve İkame Desteği</span>
        </div>

        {/* Right: Quick Direct Contact Links */}
        <div className="flex items-center gap-4 text-[11px] font-bold shrink-0">
          <a
            href={`tel:${(settings.phoneFormatted || '').replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">{settings.phoneFormatted || '0530 417 15 65'}</span>
          </a>

          {settings.socialLinks?.whatsapp && (
            <a
              href={settings.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <IconWhatsapp className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp Canlı Destek</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
