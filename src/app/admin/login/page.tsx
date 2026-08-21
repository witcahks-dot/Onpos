'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();
  
  const [email, setEmail] = useState('admin@paypos.com.tr');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Lütfen e-posta ve şifre giriniz.');
      return;
    }

    const success = login(email, password);
    if (success) {
      router.push('/admin');
    } else {
      setError('Geçersiz kullanıcı adı veya şifre.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 to-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg shadow-blue-600/30">
            P
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">PAYPOS CMS</h1>
          <p className="text-xs text-slate-500 font-semibold">Yönetim Paneline Hoş Geldiniz</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-semibold p-3.5 rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Credentials Box */}
        <div className="bg-blue-50/80 p-3.5 rounded-2xl border border-blue-100 text-[11px] text-blue-900 space-y-1">
          <div className="font-bold flex items-center gap-1 text-blue-700">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Demo Giriş Bilgileri:</span>
          </div>
          <div>E-Posta: <code className="font-mono bg-blue-100 px-1 py-0.5 rounded">admin@paypos.com.tr</code></div>
          <div>Şifre: <code className="font-mono bg-blue-100 px-1 py-0.5 rounded">admin123</code></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">E-Posta / Kullanıcı Adı</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@paypos.com.tr"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Yönetici Şifresi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sisteme Giriş Yap</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center gap-1">
            <span>← Canlı Siteye Dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
