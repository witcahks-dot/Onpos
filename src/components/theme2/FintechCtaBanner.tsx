'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

export default function FintechCtaBanner() {
  const { footerConfig } = useCMSStore();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/cms/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg(data.message || 'Bülten kaydınız başarıyla alındı.');
        setEmail('');
      } else {
        setStatus('error');
        setMsg(data.message || 'Bir hata oluştu.');
      }
    } catch {
      setStatus('error');
      setMsg('Bağlantı hatası.');
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Rounded Banner Container matching demo */}
        <div className="bg-[#111827] text-white rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Geometric Graphic Circles in Background */}
          <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full border border-white/5 pointer-events-none -mr-20 -mb-20" />
          <div className="absolute right-0 bottom-0 w-48 h-48 rounded-full border border-white/5 pointer-events-none -mr-8 -mb-8" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {footerConfig?.newsletterTitle || 'Subscribe to get updated'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                {footerConfig?.newsletterSubtitle || 'Get the latest financial tips, updates, and smart money advice right in your inbox. Stay informed, stay ahead — no spam, just value.'}
              </p>
            </div>

            {/* Right Form / Pill Button */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-end">
              {status === 'success' ? (
                <div className="bg-emerald-900/80 text-emerald-300 border border-emerald-700 px-5 py-3 rounded-full text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{msg}</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/10 border border-white/15 rounded-full px-5 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="shrink-0 bg-white hover:bg-slate-100 text-slate-900 text-xs font-black px-7 py-3 rounded-full transition-all active:scale-95 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Kaydediliyor...' : 'Get started'}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
