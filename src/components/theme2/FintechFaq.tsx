'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Plus, X } from 'lucide-react';

export default function FintechFaq() {
  const { faqs } = useCMSStore();
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
  });

  const defaultFaqs = [
    { id: 'faq-1', question: 'What does this platform do?', answer: 'We provide end-to-end smart POS terminals, next-generation fiscal cash register integration, and lowest commission payment processing.' },
    { id: 'faq-2', question: 'Can I use it on my phone and computer?', answer: 'Yes! Our cloud-based merchant panel allows you to monitor all transactions live on iOS, Android, macOS and Windows.' },
    { id: 'faq-3', question: 'Is customer support available if I need help?', answer: 'We offer 24/7 on-site technical support and immediate replacement device guarantee within 2 hours across 81 cities.' },
    { id: 'faq-4', question: 'How do I cancel my subscription?', answer: 'There are no long-term lock-in contracts or cancellation penalty fees. You can pause or cancel anytime.' },
    { id: 'faq-5', question: 'What types of accounts can I link?', answer: 'You can link all major Turkish state and private bank accounts with instant next-day settlement.' },
    { id: 'faq-6', question: 'Do I need to connect my bank account?', answer: 'You can, but it is optional. Connecting your account gives you real-time tracking and automatic batch settlements.' },
  ];

  const items = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  const toggleFaq = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Split into 2 columns matching the demo layout
  const midPoint = Math.ceil(items.length / 2);
  const leftCol = items.slice(0, midPoint);
  const rightCol = items.slice(midPoint);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Centered Headline */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked <br className="hidden sm:inline" /> Questions
          </h2>
        </div>

        {/* 2-Column Minimalist Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 items-start">
          
          {/* Left Column */}
          <div className="space-y-4">
            {leftCol.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div key={faq.id} className="border-b border-slate-200/80 pb-4 transition-colors">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left gap-4 py-2 group cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <span className="text-slate-500 group-hover:text-slate-900 shrink-0">
                      {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="text-xs text-slate-500 font-medium leading-relaxed pt-2 pr-6 animate-in fade-in">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightCol.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div key={faq.id} className="border-b border-slate-200/80 pb-4 transition-colors">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left gap-4 py-2 group cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <span className="text-slate-500 group-hover:text-slate-900 shrink-0">
                      {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="text-xs text-slate-500 font-medium leading-relaxed pt-2 pr-6 animate-in fade-in">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
