'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function FintechSubscribeBanner() {
  const { subscribeNewsletter, footerConfig } = useCMSStore();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('submitting');
    const ok = await subscribeNewsletter(email);
    if (ok) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } else {
      setStatus('error');
    }
  };

  return (
    <section className="bg-white py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Black Rounded Pill Card (Matching reference image) */}
        <div className="bg-slate-950 text-white rounded-[2.5rem] p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl">
          
          {/* Subtle geometric ring in corner */}
          <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full border-[28px] border-slate-900/60 pointer-events-none translate-x-20 translate-y-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Subscribe to get updated
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed font-medium">
                {footerConfig?.newsletterSubtitle || 'Get the latest financial tips, updates, and smart money advice right in your inbox. Stay informed, stay ahead—no spam, just value.'}
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-900/90 p-2 rounded-full border border-slate-800">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={footerConfig?.newsletterPlaceholder || 'Enter your email...'}
                    className="w-full bg-transparent px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-950 text-xs font-black px-6 py-3 rounded-full transition-all shrink-0 active:scale-95 disabled:opacity-50 cursor-pointer shadow-md"
                  >
                    {status === 'submitting' ? '...' : (footerConfig?.newsletterButtonText || 'Get started')}
                  </button>
                </div>

                {status === 'success' && (
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 pl-4">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Bülten aboneliğiniz oluşturuldu!
                  </span>
                )}
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
