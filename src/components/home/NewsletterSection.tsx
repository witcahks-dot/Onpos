'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-12 bg-blue-600 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold tracking-tight">Yeniliklerden ve Fırsatlardan Haberdar Olun</h3>
            <p className="text-xs text-blue-100">POS kampanya oranları ve mevzuat değişiklikleri e-postanıza gelsin.</p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-blue-700/80 px-5 py-3 rounded-xl border border-blue-400/40 text-xs font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Bülten aboneliğiniz başarıyla kaydedildi!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-md mx-auto md:mx-0">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresiniz..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shrink-0"
                >
                  Abone Ol
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
