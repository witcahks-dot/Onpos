'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && pathname !== '/admin/login' && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [mounted, isAuthenticated, pathname, router]);

  if (!mounted) return null;

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
        <span>Oturum kontrol ediliyor, yönlendiriliyorsunuz...</span>
      </div>
    );
  }

  return <>{children}</>;
}
