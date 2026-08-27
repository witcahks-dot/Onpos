'use client';

import React from 'react';
import FintechHeader from './components/FintechHeader';
import FintechFooter from './components/FintechFooter';

export default function FintechThemeShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-slate-950 selection:text-white">
      <FintechHeader />
      <main className="flex-1 space-y-0">
        {children}
      </main>
      <FintechFooter />
    </div>
  );
}
