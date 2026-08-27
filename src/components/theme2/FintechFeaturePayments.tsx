'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FintechFeaturePayments() {
  return (
    <section className="py-20 sm:py-28 bg-[#fbfbfe] border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline, Bullet List & Pill CTA */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Power Your Sales With Frictionless Payments
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Deliver A Frictionless Buying Experience With Secure, Responsive, And Fully Integrated Payment Tools. İster mağazada ister mobil sahada anında tahsilat.
            </p>

            {/* Bullet list with carats */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm font-bold text-slate-800 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-black text-sm">›</span>
                <span>Real-Time Payment Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-black text-sm">›</span>
                <span>Accept Payments Quickly And Securely</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-black text-sm">›</span>
                <span>Effortless Integration With Your Platform & Yazarkasa</span>
              </div>
            </div>

            {/* Black Pill Button */}
            <div className="pt-3 flex justify-center lg:justify-start">
              <Link
                href="#teklif-al"
                className="inline-flex items-center justify-center bg-[#111827] hover:bg-slate-800 text-white text-xs font-black px-8 py-3.5 rounded-full transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Create Account</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Visual Portrait with Phone/Card & Floating Metrics */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Subtle Circular Backdrop Curve */}
            <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] bg-[#eef2f8] rounded-full flex items-center justify-center overflow-hidden border border-slate-200/60">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                alt="Payment Solutions Success"
                className="w-full h-full object-cover object-top translate-y-3 scale-110"
              />
            </div>

            {/* Floating Metric Pill Overlay ($50.8K 24.6%) */}
            <div className="absolute bottom-4 left-4 sm:left-10 bg-white/95 backdrop-blur-xl border border-slate-200/90 p-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[200px] animate-bounce-slow">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Page views</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-lg font-black text-slate-900">$50.8K</span>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    24.6% ↑
                  </span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold ml-auto">
                •••
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
