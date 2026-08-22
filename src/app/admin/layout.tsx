'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { useCMSStore } from '@/lib/cms-store';
import AdminGuard from '@/components/admin/AdminGuard';
import {
  Settings,
  Menu as MenuIcon,
  Sliders,
  CreditCard,
  Layers,
  Briefcase,
  FileText,
  Inbox,
  ArrowLeft,
  LayoutDashboard,
  ExternalLink,
  LogOut,
  Building2,
  HelpCircle,
  Users,
  Image as ImageIcon,
  Award,
  BookOpen,
  Cloud,
  Mail,
  Star,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Folder,
  ShoppingCart,
  MessageSquare,
  ShieldCheck,
  Globe,
  Radio,
  SlidersHorizontal,
  Bell,
  Layout
} from 'lucide-react';

interface NavSubItem {
  label: string;
  href: string;
  badge?: string | number;
}

interface NavCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  isCollapsible?: boolean;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }[];
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { submissions, subscribers, testimonials, fetchCMSData } = useCMSStore();

  useEffect(() => {
    fetchCMSData();
  }, [fetchCMSData]);

  if (pathname === '/admin/login') {
    return <AdminGuard>{children}</AdminGuard>;
  }

  const newSubmissionsCount = (submissions || []).filter(s => s.status === 'Yeni').length;
  const subscribersCount = (subscribers || []).length;
  const testimonialsCount = (testimonials || []).length;

  const categories: NavCategory[] = [
    {
      id: 'site-mgmt',
      title: 'Site Yönetimi',
      icon: Settings,
      isCollapsible: true,
      items: [
        { label: 'Genel Ayarlar & Logo', href: '/admin/settings', icon: Settings },
        { label: 'Header & Footer Yönetimi', href: '/admin/header-footer', icon: Layout },
        { label: 'Kullanıcı Yönetimi', href: '/admin/users', icon: Users },
        { label: 'Ana Sayfa Modül Sıralama', href: '/admin/sections', icon: SlidersHorizontal },
        { label: 'Bulut Servis Paneli', href: '/admin/cloud-panel', icon: Cloud },
      ],
    },
    {
      id: 'content-mgmt',
      title: 'İçerik Yönetimi',
      icon: Layers,
      isCollapsible: true,
      items: [
        { label: 'Ürün Yönetimi (POS)', href: '/admin/products', icon: CreditCard },
        { label: 'Hizmet Yönetimi', href: '/admin/services', icon: Layers },
        { label: 'Sektörel Çözümler', href: '/admin/solutions', icon: Briefcase },
        { label: 'Proje Yönetimi', href: '/admin/projects', icon: CheckSquare },
        { label: 'Sayfa Yönetimi', href: '/admin/pages', icon: FileText },
        { label: 'Ana Sayfa Kurumsal Tanıtım', href: '/admin/intro', icon: BookOpen },
        { label: 'Hakkımızda Sayfası', href: '/admin/about', icon: Building2 },
        { label: 'S.S.S (Sıkça Sorulan Sorular)', href: '/admin/faqs', icon: HelpCircle },
        { label: 'Referans Yönetimi', href: '/admin/references', icon: Award },
        { label: 'E-Katalog Yönetimi', href: '/admin/catalogs', icon: FileText },
        { label: 'Ekip Yönetimi', href: '/admin/team', icon: Users },
        { label: 'Bayi / Şube Yönetimi', href: '/admin/dealers', icon: Building2 },
        { label: 'Haber & Blog Yönetimi', href: '/admin/blog', icon: FileText },
        { label: 'Slider Yönetimi (Hero)', href: '/admin/hero', icon: Sliders },
        { label: 'Foto Galeri', href: '/admin/gallery', icon: ImageIcon },
        { label: 'Banka Hesapları & IBAN', href: '/admin/bank-accounts', icon: CreditCard },
      ],
    },
    {
      id: 'notifications',
      title: 'Bildirimler & Gelen Talepler',
      icon: Bell,
      isCollapsible: true,
      items: [
        {
          label: 'Gelen Teklif Formu',
          href: '/admin/submissions',
          icon: Inbox,
          badge: newSubmissionsCount,
          badgeColor: newSubmissionsCount > 0 ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-slate-100 border-slate-300 text-slate-500',
        },
        {
          label: 'E-Bülten Aboneleri',
          href: '/admin/subscribers',
          icon: Mail,
          badge: subscribersCount,
          badgeColor: 'bg-blue-50 border-blue-400 text-blue-600',
        },
        {
          label: 'Müşteri Görüşleri',
          href: '/admin/testimonials',
          icon: Star,
          badge: testimonialsCount,
          badgeColor: 'bg-amber-50 border-amber-400 text-amber-600',
        },
      ],
    },
  ];

  // Active Category Single-Expand State matching exact light sidebar screenshots
  const activeCatId = categories.find(cat => cat.items.some(item => item.href === pathname))?.id || 'content-mgmt';
  const [openCatIds, setOpenCatIds] = useState<Record<string, boolean>>({
    'site-mgmt': true,
    'content-mgmt': true,
    'notifications': true,
  });

  const toggleCategory = (catId: string) => {
    setOpenCatIds(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-blue-600 selection:text-white">
        
        {/* LIGHT WHITE SIDEBAR (MATCHING USER SCREENSHOTS EXACTLY) */}
        <aside className="w-64 bg-white text-slate-800 flex flex-col justify-between p-4 shrink-0 hidden md:flex h-screen sticky top-0 border-r border-slate-200/90 shadow-xs">
          <div className="space-y-3 flex-1 flex flex-col min-h-0">
            
            {/* Sidebar Brand Header */}
            <div className="flex items-center gap-3 px-2 py-2.5 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-sm">
                P
              </div>
              <div className="truncate">
                <span className="font-black text-slate-900 text-sm tracking-tight block">YÖNETİM PANELSİ</span>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Site CMS Kontrol Merkezi</span>
              </div>
            </div>

            {/* Navigation Category Groups */}
            <nav className="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar pt-1">
              
              {/* Dashboard Direct Link */}
              <Link
                href="/admin"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  pathname === '/admin'
                    ? 'bg-blue-50 text-blue-600 font-black border-l-4 border-blue-600 pl-2.5'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-slate-500" />
                <span>Genel Bakış</span>
              </Link>

              {categories.map((cat) => {
                const isOpen = openCatIds[cat.id] !== false;
                const hasActiveChild = cat.items.some((item) => item.href === pathname);

                return (
                  <div key={cat.id} className="space-y-1">
                    {/* Category Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <cat.icon className="w-4 h-4 text-slate-500" />
                        <span className="font-bold text-slate-900">{cat.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>

                    {/* Category Items */}
                    {isOpen && (
                      <div className="pl-4 space-y-0.5 border-l border-slate-100 ml-3 py-0.5">
                        {cat.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                                isActive
                                  ? 'text-blue-600 font-extrabold bg-blue-50/80'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                                <span className="truncate">{item.label}</span>
                              </div>

                              {/* Square Red/Emerald Badge matching user screenshot */}
                              {item.badge !== undefined && (
                                <span
                                  className={`text-[10px] font-mono font-bold px-1.5 py-0.2 border rounded shrink-0 ${
                                    item.badgeColor || 'bg-slate-50 border-slate-300 text-slate-600'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

            </nav>

          </div>

          {/* User Footer info & Logout */}
          <div className="pt-3 border-t border-slate-100 space-y-2 shrink-0 text-xs">
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <div className="truncate pr-2">
                <span className="font-bold text-slate-800 block truncate text-xs">{user?.name || 'Sistem Yöneticisi'}</span>
                <span className="text-[10px] text-slate-400 block truncate">{user?.email}</span>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors shrink-0 cursor-pointer"
                title="Oturumu Kapat"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors px-1"
            >
              <span className="flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
                <span>Canlı Sitemize Git</span>
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
            <div>
              <h2 className="text-base font-black text-slate-900">PAYPOS Content Management System</h2>
              <p className="text-[11px] text-slate-400 font-medium">Tüm site içeriklerini ve gelen talepleri canlı güncelleyin.</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Sistem Aktif</span>
              </span>
              <button
                onClick={logout}
                className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Çıkış</span>
              </button>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
