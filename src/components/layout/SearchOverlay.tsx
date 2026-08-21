'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, CreditCard, Layers, FileText, ArrowRight } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const { products, services, blogPosts, customPages } = useCMSStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredProducts = trimmed
    ? products.filter(
        p => p.name.toLowerCase().includes(trimmed) || p.category.toLowerCase().includes(trimmed) || p.shortDesc.toLowerCase().includes(trimmed)
      )
    : [];

  const filteredServices = trimmed
    ? services.filter(
        s => s.name.toLowerCase().includes(trimmed) || s.shortDesc.toLowerCase().includes(trimmed)
      )
    : [];

  const filteredBlog = trimmed
    ? blogPosts.filter(
        b => b.title.toLowerCase().includes(trimmed) || b.excerpt.toLowerCase().includes(trimmed)
      )
    : [];

  const filteredPages = trimmed
    ? customPages.filter(
        p => p.title.toLowerCase().includes(trimmed) || p.summary.toLowerCase().includes(trimmed)
      )
    : [];

  const totalResults = filteredProducts.length + filteredServices.length + filteredBlog.length + filteredPages.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-6 py-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ürün, hizmet, blog veya sayfa arayın... (Örn: Android POS, QR ödeme, Garanti)"
            className="w-full pl-4 pr-10 text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Content Results */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {!trimmed && (
            <div className="text-center py-10">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-600">Arama yapmak için yukarıya en az bir harf yazın.</p>
              <p className="text-xs text-slate-400 mt-1">Örnek aramalar: "Smart POS", "Yazarkasa", "Tarihçe", "Teknik Destek"</p>
            </div>
          )}

          {trimmed && totalResults === 0 && (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-slate-700">"{query}" için eşleşen bir sonuç bulunamadı.</p>
              <p className="text-xs text-slate-400 mt-1">Farklı anahtar kelimeler kullanarak tekrar deneyin.</p>
            </div>
          )}

          {/* Categorized Products */}
          {filteredProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
                <CreditCard className="w-4 h-4" />
                <span>Ürünler ({filteredProducts.length})</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredProducts.map(prod => (
                  <Link
                    key={prod.id}
                    href={`/pos-cihazlari/${prod.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{prod.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{prod.shortDesc}</p>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full shrink-0">
                      {prod.category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Categorized Services */}
          {filteredServices.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                <Layers className="w-4 h-4" />
                <span>Hizmetler ({filteredServices.length})</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredServices.map(serv => (
                  <Link
                    key={serv.id}
                    href={`/hizmetler/${serv.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{serv.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{serv.shortDesc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Categorized Blog Posts */}
          {filteredBlog.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">
                <FileText className="w-4 h-4" />
                <span>Blog & Haberler ({filteredBlog.length})</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredBlog.map(post => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">{post.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{post.excerpt}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0 ml-3">{post.publishedAt}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Kapatmak için ESC tuşuna basın</span>
          <span>Arama sonuçları canlı filtrelenmektedir</span>
        </div>
      </div>
    </div>
  );
}
