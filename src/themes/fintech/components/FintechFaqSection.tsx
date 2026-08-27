'use client';

import React, { useState } from 'react';
import { useCMSStore } from '@/lib/cms-store';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FintechFaqSection() {
  const { faqs } = useCMSStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const fallbackFaqs = [
    { question: 'What does this platform do?', answer: 'PAYPOS, yeni nesil Android ve Mobil POS cihazları üzerinden düşük komisyonla güvenli kart ve temassız ödeme almanızı sağlar.' },
    { question: 'Is my personal and financial data secure?', answer: 'Tüm sistemimiz BDDK, PCI-PTS 6.x ve Gelir İdaresi Başkanlığı (GİB) mali hafıza güvenlik standartlarına tam uyumludur.' },
    { question: 'Can I use it on my phone and computer?', answer: 'Evet, bulut servis panelimiz üzerinden tüm cihazlarınızı telefon ve bilgisayarınızdan anlık takip edebilirsiniz.' },
    { question: 'Is customer support available if I need help?', answer: '7/24 kesintisiz çağrı merkezi ve 2 saat içinde yerinde ikame cihaz desteği sunuyoruz.' },
    { question: 'How do I cancel my subscription or service?', answer: 'Taahhütsüz paketlerimizde dilediğiniz zaman cihazınızı iade edebilir veya aboneliğinizi sonlandırabilirsiniz.' },
    { question: 'Do I need to connect my bank account?', answer: 'Evet, ödemelerinizin ertesi iş günü kesintisiz hesabınıza aktarılması için IBAN bilginizi tanımlamanız yeterlidir.' },
    { question: 'What types of accounts can I link?', answer: 'Türkiye’deki tüm kamu ve özel bankalara ait vadesiz ticari veya şahıs hesaplarını bağlayabilirsiniz.' },
    { question: 'What happens if I switch banks?', answer: 'Yönetim panelinden dilediğiniz zaman hesap bilgilerinizi güncelleyebilir, ertesi gün yeni hesabınıza aktarım alabilirsiniz.' },
  ];

  const items = (faqs && faqs.length > 0) ? faqs : fallbackFaqs;

  // Split into left and right columns
  const half = Math.ceil(items.length / 2);
  const leftCol = items.slice(0, half);
  const rightCol = items.slice(half);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-20 border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            POS cihazları, komisyon oranları ve teknik destek süreçleri hakkında en çok merak edilen sorular.
          </p>
        </div>

        {/* 2-Column Accordion Grid (Matching reference image) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-2 items-start">
          
          {/* Left Column */}
          <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
            {leftCol.map((item, i) => {
              const globalIdx = i;
              const isOpen = openIndex === globalIdx;
              return (
                <div key={globalIdx} className="py-4">
                  <button
                    onClick={() => toggle(globalIdx)}
                    className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.question}
                    </span>
                    <span className="p-1 text-slate-400 group-hover:text-slate-900 transition-colors shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pb-1 text-xs text-slate-600 leading-relaxed font-medium animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
            {rightCol.map((item, i) => {
              const globalIdx = half + i;
              const isOpen = openIndex === globalIdx;
              return (
                <div key={globalIdx} className="py-4">
                  <button
                    onClick={() => toggle(globalIdx)}
                    className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.question}
                    </span>
                    <span className="p-1 text-slate-400 group-hover:text-slate-900 transition-colors shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pb-1 text-xs text-slate-600 leading-relaxed font-medium animate-in fade-in duration-200">
                      {item.answer}
                    </div>
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
