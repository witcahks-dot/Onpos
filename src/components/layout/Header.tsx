'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown, PhoneCall, Shield, CreditCard, Layers, Sparkles } from 'lucide-react';
import { useCMSStore } from '@/lib/cms-store';
import Topbar from './Topbar';
import MegaMenu from './MegaMenu';
import SearchOverlay from './SearchOverlay';
import QuoteModal from '@/components/ui/QuoteModal';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const { settings, menu, headerConfig, fetchCMSData } = useCMSStore();

  useEffect(() => {
    fetchCMSData();
  }, [fetchCMSData]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleMenuItems = (menu || [])
    .filter(item => item.isVisible)
    .sort((a, b) => a.order - b.order);

  const handleOpenQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsQuoteModalOpen(true);
  };

  const isSticky = headerConfig?.stickyHeader !== false;

  return (
    <header className={`${isSticky ? 'sticky top-0' : 'relative'} z-40 w-full bg-white shadow-xs`}>
      {/* Topbar */}
      <Topbar />

      {/* Main Navigation Bar */}
      <div
        className={`w-full bg-white border-b border-slate-100 transition-all duration-300 ${
          isScrolled ? 'py-2 shadow-md shadow-slate-900/5' : 'py-3'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Brand Logo Only */}
          <Link href="/" className="flex items-center shrink-0 group py-1">
            {settings.logoUrl && settings.logoUrl.trim() !== '' && !imgError ? (
              <img
                src={settings.logoUrl}
                alt={settings.siteName || 'Logo'}
                onError={() => setImgError(true)}
                style={{ height: `${settings.logoHeight || 44}px` }}
                className="object-contain max-w-[220px] transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
                  P
                </div>
                <span className="text-lg font-black text-slate-900 tracking-tight">
                  PAY<span className="text-blue-600">POS</span>
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 justify-center flex-1 min-w-0">
            {visibleMenuItems.map(item => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              const isPosMenu = item.isMegaMenu || item.label === 'POS Cihazları' || item.href === '/pos-cihazlari';

              if (isPosMenu) {
                return (
                  <div
                    key={item.id}
                    className="relative shrink-0"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-[13px] font-extrabold whitespace-nowrap transition-all ${
                        isActive
                          ? 'text-theme-primary bg-theme-primary-light shadow-xs font-black'
                          : 'text-slate-700 hover:text-theme-primary hover:bg-slate-100/70'
                      }`}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase shrink-0 ${item.badgeColor || 'bg-theme-primary text-white'}`}>
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-theme-primary' : 'text-slate-400'}`} />
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-[13px] font-extrabold whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'text-theme-primary bg-theme-primary-light shadow-xs font-black'
                      : 'text-slate-700 hover:text-theme-primary hover:bg-slate-100/70'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase shrink-0 ${item.badgeColor || 'bg-emerald-600 text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Live Search Trigger Button */}
            {headerConfig?.showSearch !== false && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl text-slate-600 hover:text-theme-primary hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-transparent hover:border-slate-200"
                title="Arama Yap (Cmd+K)"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span className="hidden xl:inline text-slate-400 text-xs">Ara...</span>
                <span className="hidden xl:inline bg-slate-100 border border-slate-200 text-slate-500 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                  ⌘K
                </span>
              </button>
            )}

            {/* Teklif Al Primary CTA Button */}
            {headerConfig?.showQuoteButton !== false && (
              <button
                onClick={handleOpenQuote}
                className="hidden sm:inline-flex items-center justify-center gap-2 bg-theme-primary hover:opacity-90 text-white text-xs font-extrabold px-4 xl:px-5 py-2.5 rounded-xl transition-all shadow-md shadow-theme-primary active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Shield className="w-4 h-4 shrink-0" />
                <span>{headerConfig?.quoteButtonText || 'Teklif Al'}</span>
              </button>
            )}

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
              aria-label="Menüyü Aç/Kapat"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>

          </div>

        </div>
      </div>

      {/* Hover Dropdown Mega Menu for POS Devices */}
      {isMegaMenuOpen && (
        <MegaMenu
          onClose={() => setIsMegaMenuOpen(false)}
        />
      )}

      {/* Search Overlay Drawer */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 text-sm font-bold">
          <div className="flex flex-col space-y-1">
            {visibleMenuItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                    isActive ? 'bg-blue-600 text-white font-extrabold' : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleOpenQuote(e);
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-black py-3.5 rounded-xl shadow-lg"
            >
              <Shield className="w-4 h-4" />
              <span>Hızlı Teklif Alın</span>
            </button>
          </div>
        </div>
      )}

      {/* Global Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </header>
  );
}
