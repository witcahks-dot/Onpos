'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';
import QuoteModal from '@/components/ui/QuoteModal';

export default function FloatingQuickContact() {
  const settings = useCMSStore((state) => state.settings);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  if (settings.showQuickContactButtons === false) {
    return null;
  }

  const isLeft = (settings.quickContactPosition || 'left') === 'left';
  const whatsappNum = (settings.quickContactWhatsapp || '905304171565').replace(/\D/g, '');
  const rawPhone = settings.quickContactPhone || settings.phoneFormatted || '0530 417 15 65';
  const callPhone = rawPhone.replace(/\s+/g, '');
  const message = settings.quickContactMessage || 'Merhaba, POS cihazları ve ödeme çözümleri hakkında hızlı bilgi almak istiyorum.';

  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <div
        className={`fixed bottom-6 z-40 flex flex-col gap-3.5 transition-all duration-300 ${
          isLeft ? 'left-6 items-start' : 'right-6 items-end'
        }`}
      >
        {/* 1. WhatsApp Circular Button */}
        <div className="relative flex items-center group">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/40 border border-emerald-300/40 transition-all hover:scale-110 active:scale-95 relative overflow-hidden"
            aria-label="WhatsApp Destek Hattı"
          >
            {/* Soft Ping Aura */}
            <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping opacity-75" />
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 fill-current" />
          </a>

          {/* Hover Tooltip Pill */}
          <span
            className={`absolute whitespace-nowrap bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-slate-800 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 ${
              isLeft ? 'left-16 ml-1' : 'right-16 mr-1'
            }`}
          >
            💬 WhatsApp Danışma (7/24)
          </span>
        </div>

        {/* 2. Direct Phone Call Circular Button */}
        <div className="relative flex items-center group">
          <a
            href={`tel:${callPhone}`}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xl shadow-blue-600/40 border border-blue-400/40 transition-all hover:scale-110 active:scale-95"
            aria-label={`Hemen Arayın: ${rawPhone}`}
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>

          {/* Hover Tooltip Pill */}
          <span
            className={`absolute whitespace-nowrap bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-slate-800 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 ${
              isLeft ? 'left-16 ml-1' : 'right-16 mr-1'
            }`}
          >
            📞 Hemen Arayın: {rawPhone}
          </span>
        </div>

        {/* 3. Quick Quote Modal Trigger Circular Button */}
        <div className="relative flex items-center group">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-xl shadow-slate-950/40 border border-slate-700 transition-all hover:scale-110 active:scale-95"
            aria-label="Hızlı POS Fiyat Teklifi Alın"
          >
            <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
          </button>

          {/* Hover Tooltip Pill */}
          <span
            className={`absolute whitespace-nowrap bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-slate-800 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 ${
              isLeft ? 'left-16 ml-1' : 'right-16 mr-1'
            }`}
          >
            🛡️ Hızlı POS Teklifi Al
          </span>
        </div>
      </div>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
