'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import QuoteModal from '@/components/ui/QuoteModal';

export default function FintechGrowthCta() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <section className="bg-white py-16 text-center font-sans border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
          Need A Little More To Grow?
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto font-medium">
          İşletmenizin ciro ve işlem hacmine en uygun komisyon oranları ve özel donanım çözümleri için hemen başvurun.
        </p>

        <div className="pt-2">
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-black px-8 py-3.5 rounded-full transition-all shadow-xl active:scale-95 cursor-pointer"
          >
            <span>Get started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </section>
  );
}
