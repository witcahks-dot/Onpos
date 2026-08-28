import {
  SiteSettings,
  PosProduct,
  ServiceItem,
  SolutionItem,
  ProjectItem,
  MenuItem,
  HeroSlide,
  CustomPage,
  FaqItem,
  ReferenceItem,
  TestimonialItem,
  BlogPost,
  CMSData,
  ThemeId
} from '@/types';
import { defaultCMSData } from './default-data';

// ============================================================================
// 1. THEME RESOLUTION & NORMALIZATION
// ============================================================================

export function resolveActiveTheme(settings?: Partial<SiteSettings> | null): ThemeId {
  if (settings?.themeId === 'theme-fintech') {
    return 'theme-fintech';
  }
  return 'theme-existing';
}

// ============================================================================
// 2. MEDIA & URL NORMALIZERS
// ============================================================================

const FALLBACK_IMAGES = {
  pos: '/images/hugin-tiger-t300.png',
  logo: 'https://www.yazarkasasatisi.com/upload/logos/POSLOGO.jpg',
  cover: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=800&auto=format&fit=crop',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
};

export function resolveImageUrl(
  url?: string | null,
  fallbackType: keyof typeof FALLBACK_IMAGES = 'pos'
): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return FALLBACK_IMAGES[fallbackType];
  }
  return url.trim();
}

export function cleanPhoneNumber(phone?: string | null): string {
  if (!phone) return '905304171565';
  return phone.replace(/\D/g, '');
}

export function buildWhatsAppLink(phone?: string | null, message?: string | null): string {
  const clean = cleanPhoneNumber(phone);
  const text = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${clean}${text ? `?text=${text}` : ''}`;
}

export function formatCurrency(amount?: number | null, currencySymbol = '₺'): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'Özel Teklif';
  }
  return `${amount.toLocaleString('tr-TR')} ${currencySymbol}`;
}

// ============================================================================
// 3. ENTITY NORMALIZERS (DTO ADAPTERS)
// ============================================================================

export function normalizeSiteSettings(raw?: any): SiteSettings {
  const def = defaultCMSData.settings;
  const s = raw || {};
  return {
    siteName: s.siteName || def.siteName,
    tagline: s.tagline || def.tagline,
    logoUrl: s.logoUrl !== undefined ? s.logoUrl : def.logoUrl,
    faviconUrl: s.faviconUrl || def.faviconUrl,
    logoHeight: s.logoHeight || def.logoHeight || 40,
    showLogoText: s.showLogoText !== undefined ? s.showLogoText : def.showLogoText,
    primaryColor: s.primaryColor || def.primaryColor,
    accentColor: s.accentColor || def.accentColor,
    colorPreset: s.colorPreset || def.colorPreset || 'corporate-blue',
    layoutDensity: s.layoutDensity || def.layoutDensity || 'spacious',
    cardStyle: s.cardStyle || def.cardStyle || 'soft-border',
    phone: s.phone || def.phone,
    phoneFormatted: s.phoneFormatted || def.phoneFormatted,
    email: s.email || def.email,
    address: s.address || def.address,
    workingHours: s.workingHours || def.workingHours,
    socialLinks: {
      whatsapp: s.socialLinks?.whatsapp || def.socialLinks.whatsapp,
      telegram: s.socialLinks?.telegram || def.socialLinks.telegram,
      instagram: s.socialLinks?.instagram || def.socialLinks.instagram,
      linkedin: s.socialLinks?.linkedin || def.socialLinks.linkedin,
      youtube: s.socialLinks?.youtube || def.socialLinks.youtube,
    },
    currency: s.currency || def.currency || '₺',
    language: s.language || def.language || 'TR',
    activeTheme: s.activeTheme || def.activeTheme || 'light',
    themeId: s.themeId === 'theme-fintech' ? 'theme-fintech' : 'theme-existing',
    topbarText: s.topbarText || def.topbarText,
    headerStyle: s.headerStyle || def.headerStyle || 'standard',
    footerStyle: s.footerStyle || def.footerStyle || 'full',
    showQuickContactButtons: s.showQuickContactButtons !== undefined ? s.showQuickContactButtons : true,
    quickContactPosition: s.quickContactPosition || 'left',
    quickContactPhone: s.quickContactPhone || s.phoneFormatted || def.phoneFormatted,
    quickContactWhatsapp: s.quickContactWhatsapp || cleanPhoneNumber(s.phone) || '905304171565',
    quickContactMessage: s.quickContactMessage || def.quickContactMessage,
  };
}

/**
 * Maps Supabase PostgreSQL snake_case row to TypeScript camelCase SiteSettings
 */
export function mapDbRowToSiteSettings(row: Record<string, any>): Partial<SiteSettings> {
  if (!row || typeof row !== 'object') return {};
  return {
    siteName: row.site_name ?? row.siteName,
    tagline: row.tagline,
    logoUrl: row.logo_url ?? row.logoUrl,
    faviconUrl: row.favicon_url ?? row.faviconUrl,
    primaryColor: row.primary_color ?? row.primaryColor,
    accentColor: row.accent_color ?? row.accentColor,
    phone: row.phone,
    phoneFormatted: row.phone_formatted ?? row.phoneFormatted,
    email: row.email,
    address: row.address,
    workingHours: row.working_hours ?? row.workingHours,
    socialLinks: row.social_links ?? row.socialLinks,
    currency: row.currency,
    language: row.language,
    activeTheme: row.active_theme ?? row.activeTheme,
    themeId: (row.theme_id ?? row.themeId) === 'theme-fintech' ? 'theme-fintech' : 'theme-existing',
    topbarText: row.topbar_text ?? row.topbarText,
    headerStyle: row.header_style ?? row.headerStyle,
    footerStyle: row.footer_style ?? row.footerStyle,
    showQuickContactButtons: row.show_quick_contact_buttons ?? row.showQuickContactButtons,
    quickContactPosition: row.quick_contact_position ?? row.quickContactPosition,
    quickContactPhone: row.quick_contact_phone ?? row.quickContactPhone,
    quickContactWhatsapp: row.quick_contact_whatsapp ?? row.quickContactWhatsapp,
    quickContactMessage: row.quick_contact_message ?? row.quickContactMessage,
  };
}

/**
 * Maps TypeScript camelCase SiteSettings to Supabase PostgreSQL snake_case row
 */
export function mapSiteSettingsToDbRow(settings: Partial<SiteSettings>): Record<string, any> {
  const s = settings || {};
  const row: Record<string, any> = {
    id: 'default',
    updated_at: new Date().toISOString(),
  };

  if (s.siteName !== undefined) row.site_name = s.siteName;
  if (s.tagline !== undefined) row.tagline = s.tagline;
  if (s.logoUrl !== undefined) row.logo_url = s.logoUrl;
  if (s.faviconUrl !== undefined) row.favicon_url = s.faviconUrl;
  if (s.primaryColor !== undefined) row.primary_color = s.primaryColor;
  if (s.accentColor !== undefined) row.accent_color = s.accentColor;
  if (s.phone !== undefined) row.phone = s.phone;
  if (s.phoneFormatted !== undefined) row.phone_formatted = s.phoneFormatted;
  if (s.email !== undefined) row.email = s.email;
  if (s.address !== undefined) row.address = s.address;
  if (s.workingHours !== undefined) row.working_hours = s.workingHours;
  if (s.socialLinks !== undefined) row.social_links = s.socialLinks;
  if (s.currency !== undefined) row.currency = s.currency;
  if (s.language !== undefined) row.language = s.language;
  if (s.activeTheme !== undefined) row.active_theme = s.activeTheme;
  if (s.themeId !== undefined) {
    row.theme_id = s.themeId === 'theme-fintech' ? 'theme-fintech' : 'theme-existing';
  }
  if (s.topbarText !== undefined) row.topbar_text = s.topbarText;
  if (s.headerStyle !== undefined) row.header_style = s.headerStyle;
  if (s.footerStyle !== undefined) row.footer_style = s.footerStyle;

  return row;
}

export function normalizePosProduct(raw: Partial<PosProduct>): PosProduct {
  return {
    id: raw.id || `p-${Date.now()}`,
    slug: raw.slug || `pos-${Date.now()}`,
    name: raw.name || 'Akıllı POS Cihazı',
    category: raw.category || 'Android POS',
    shortDesc: raw.shortDesc || '',
    fullDesc: raw.fullDesc || raw.shortDesc || '',
    price: raw.price,
    oldPrice: raw.oldPrice,
    isDiscounted: Boolean(raw.isDiscounted),
    discountLabel: raw.discountLabel || '',
    sku: raw.sku || 'POS-001',
    brand: raw.brand || 'PAYPOS',
    inStock: raw.inStock !== false,
    specs: {
      display: raw.specs?.display || '5.5 inç HD Dokunmatik',
      os: raw.specs?.os || 'Android 10 / PayPOS OS',
      connectivity: raw.specs?.connectivity || '4G LTE / Wi-Fi / Bluetooth',
      nfc: raw.specs?.nfc || 'Temassız EMV L1/L2 Destekli',
      printer: raw.specs?.printer || '58mm Termal Dahili Fiş Yazıcı',
      battery: raw.specs?.battery || '5200 mAh Lityum-İyon',
      weight: raw.specs?.weight || '390 gr',
      security: raw.specs?.security || 'PCI-PTS 6.x & GİB Onaylı',
      ...(raw.specs || {}),
    },
    features: Array.isArray(raw.features) && raw.features.length > 0 ? raw.features : [
      'GİB ve BDDK onaylı yeni nesil ödeme mimarisi',
      'Tüm banka ve yemek kartı uygulamalarıyla tam uyumlu',
      '7/24 ikame cihaz ve yerinde servis garantisi'
    ],
    images: Array.isArray(raw.images) && raw.images.length > 0 ? raw.images : [FALLBACK_IMAGES.pos],
    pdfSpecUrl: raw.pdfSpecUrl || '',
    videoUrl: raw.videoUrl || '',
    isFeatured: Boolean(raw.isFeatured),
    order: raw.order ?? 1,
  };
}

export function normalizeServiceItem(raw: Partial<ServiceItem>): ServiceItem {
  return {
    id: raw.id || `srv-${Date.now()}`,
    slug: raw.slug || `service-${Date.now()}`,
    name: raw.name || 'Ödeme Hizmeti',
    category: raw.category || 'Teknik Servis & Kurulum',
    iconName: raw.iconName || 'ShieldCheck',
    shortDesc: raw.shortDesc || '',
    fullDesc: raw.fullDesc || raw.shortDesc || '',
    features: Array.isArray(raw.features) ? raw.features : [],
    benefits: Array.isArray(raw.benefits) ? raw.benefits : [],
    images: Array.isArray(raw.images) && raw.images.length > 0 ? raw.images : [FALLBACK_IMAGES.cover],
    videoUrl: raw.videoUrl || '',
    order: raw.order ?? 1,
  };
}

export function normalizeSolutionItem(raw: Partial<SolutionItem>): SolutionItem {
  return {
    id: raw.id || `sol-${Date.now()}`,
    slug: raw.slug || `cozum-${Date.now()}`,
    title: raw.title || 'Sektörel Çözüm',
    category: raw.category || 'Genel',
    shortDesc: raw.shortDesc || '',
    fullDesc: raw.fullDesc || raw.shortDesc || '',
    image: raw.image || FALLBACK_IMAGES.cover,
    features: Array.isArray(raw.features) ? raw.features : [],
    targetAudience: raw.targetAudience || 'Tüm İşletmeler',
  };
}

export function normalizeProjectItem(raw: Partial<ProjectItem>): ProjectItem {
  return {
    id: raw.id || `prj-${Date.now()}`,
    slug: raw.slug || `proje-${Date.now()}`,
    title: raw.title || 'Ödeme Projesi',
    category: raw.category || 'Kurumsal',
    client: raw.client || 'Kurumsal Müşteri',
    location: raw.location || 'Türkiye',
    status: raw.status === 'Devam Ediyor' ? 'Devam Ediyor' : 'Tamamlandı',
    completionDate: raw.completionDate || '2026',
    coverImage: raw.coverImage || FALLBACK_IMAGES.cover,
    gallery: Array.isArray(raw.gallery) ? raw.gallery : [],
    description: raw.description || '',
    utilizedProducts: Array.isArray(raw.utilizedProducts) ? raw.utilizedProducts : [],
    utilizedServices: Array.isArray(raw.utilizedServices) ? raw.utilizedServices : [],
  };
}

export function normalizeMenuItem(raw: Partial<MenuItem>): MenuItem {
  return {
    id: raw.id || `menu-${Date.now()}`,
    label: raw.label || 'Menü Öğesi',
    href: raw.href || '#',
    order: raw.order ?? 1,
    isVisible: raw.isVisible !== false,
    badge: raw.badge || '',
    badgeColor: raw.badgeColor || '',
    isMegaMenu: Boolean(raw.isMegaMenu),
    iconName: raw.iconName || '',
    isExternal: Boolean(raw.isExternal),
    parentId: raw.parentId,
    children: raw.children,
  };
}

export function normalizeHeroSlide(raw: Partial<HeroSlide>): HeroSlide {
  return {
    id: raw.id || `slide-${Date.now()}`,
    title: raw.title || 'Yeni Nesil POS Çözümleri',
    subtitle: raw.subtitle || '',
    badge: raw.badge || 'GİB ONAYLI YENİ NESİL',
    description: raw.description || '',
    posName: raw.posName || 'Hugin Tiger T300',
    imageUrl: resolveImageUrl(raw.imageUrl, 'pos'),
    primaryCtaText: raw.primaryCtaText || 'Hemen Teklif Al',
    primaryCtaUrl: raw.primaryCtaUrl || '#teklif-al',
    secondaryCtaText: raw.secondaryCtaText || 'İncele',
    secondaryCtaUrl: raw.secondaryCtaUrl || '/pos-cihazlari',
    order: raw.order ?? 1,
    isActive: raw.isActive !== false,
  };
}

export function normalizeCustomPage(raw: Partial<CustomPage>): CustomPage {
  return {
    id: raw.id || `page-${Date.now()}`,
    slug: raw.slug || `sayfa-${Date.now()}`,
    title: raw.title || 'Kurumsal Sayfa',
    summary: raw.summary || '',
    coverImage: raw.coverImage || '',
    template: raw.template || 'blank',
    contentHtml: raw.contentHtml || '',
    blocks: Array.isArray(raw.blocks) ? raw.blocks : [],
    metaTitle: raw.metaTitle || raw.title || 'PAYPOS',
    metaDescription: raw.metaDescription || raw.summary || '',
    isPublished: raw.isPublished !== false,
    updatedAt: raw.updatedAt || new Date().toISOString().split('T')[0],
  };
}

export function normalizeFaqItem(raw: Partial<FaqItem>): FaqItem {
  return {
    id: raw.id || `faq-${Date.now()}`,
    question: raw.question || '',
    answer: raw.answer || '',
    category: raw.category || 'Genel',
    order: raw.order ?? 1,
  };
}

export function normalizeReferenceItem(raw: Partial<ReferenceItem>): ReferenceItem {
  return {
    id: raw.id || `ref-${Date.now()}`,
    name: raw.name || 'Referans',
    logo: resolveImageUrl(raw.logo, 'logo'),
    category: raw.category || 'Genel',
    city: raw.city || '',
    district: raw.district || '',
    description: raw.description || '',
    websiteUrl: raw.websiteUrl || '',
    order: raw.order ?? 1,
  };
}

export function normalizeTestimonialItem(raw: Partial<TestimonialItem>): TestimonialItem {
  return {
    id: raw.id || `tst-${Date.now()}`,
    authorName: raw.authorName || 'Müşteri',
    authorTitle: raw.authorTitle || 'İşletme Sahibi',
    company: raw.company || '',
    city: raw.city || 'İstanbul',
    comment: raw.comment || '',
    rating: raw.rating ?? 5,
    avatar: resolveImageUrl(raw.avatar, 'avatar'),
    date: raw.date || '2026',
    isApproved: raw.isApproved !== false,
  };
}

export function normalizeBlogPost(raw: Partial<BlogPost>): BlogPost {
  return {
    id: raw.id || `post-${Date.now()}`,
    slug: raw.slug || `haber-${Date.now()}`,
    title: raw.title || 'Haber Başlığı',
    category: raw.category || 'Mali Mevzuat',
    excerpt: raw.excerpt || '',
    content: raw.content || '',
    author: raw.author || 'PAYPOS Editör',
    authorRole: raw.authorRole || 'Ödeme Sistemleri Uzmanı',
    publishedAt: raw.publishedAt || '2026',
    readTime: raw.readTime || '3 dk',
    coverImage: resolveImageUrl(raw.coverImage, 'cover'),
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    isFeatured: Boolean(raw.isFeatured),
  };
}

// ============================================================================
// 4. CMS DATA COMPLETE NORMALIZER
// ============================================================================

export function normalizeCMSData(raw?: Partial<CMSData> | null): CMSData {
  const data = raw || {};
  return {
    ...defaultCMSData,
    ...data,
    settings: normalizeSiteSettings(data.settings),
    menu: (data.menu || defaultCMSData.menu).map(normalizeMenuItem),
    megaMenuConfig: data.megaMenuConfig || defaultCMSData.megaMenuConfig,
    heroSlides: (data.heroSlides || defaultCMSData.heroSlides).map(normalizeHeroSlide),
    trustStats: data.trustStats || defaultCMSData.trustStats,
    corporateIntro: data.corporateIntro || defaultCMSData.corporateIntro,
    cloudPanel: data.cloudPanel || defaultCMSData.cloudPanel,
    whyUs: data.whyUs || defaultCMSData.whyUs,
    aboutPage: data.aboutPage || defaultCMSData.aboutPage,
    products: (data.products || defaultCMSData.products).map(normalizePosProduct),
    services: (data.services || defaultCMSData.services).map(normalizeServiceItem),
    solutions: (data.solutions || defaultCMSData.solutions).map(normalizeSolutionItem),
    projects: (data.projects || defaultCMSData.projects).map(normalizeProjectItem),
    references: (data.references || defaultCMSData.references).map(normalizeReferenceItem),
    testimonials: (data.testimonials || defaultCMSData.testimonials).map(normalizeTestimonialItem),
    team: data.team || defaultCMSData.team,
    blogPosts: (data.blogPosts || defaultCMSData.blogPosts).map(normalizeBlogPost),
    gallery: data.gallery || defaultCMSData.gallery,
    faqs: (data.faqs || defaultCMSData.faqs).map(normalizeFaqItem),
    dealers: data.dealers || defaultCMSData.dealers,
    bankAccounts: data.bankAccounts || defaultCMSData.bankAccounts,
    catalogs: data.catalogs || defaultCMSData.catalogs,
    customPages: (data.customPages || defaultCMSData.customPages).map(normalizeCustomPage),
    submissions: data.submissions || [],
    subscribers: data.subscribers || [],
    homeSections: data.homeSections || defaultCMSData.homeSections,
    adminUsers: data.adminUsers || defaultCMSData.adminUsers,
    headerConfig: data.headerConfig || defaultCMSData.headerConfig,
    footerConfig: data.footerConfig || defaultCMSData.footerConfig,
  };
}
