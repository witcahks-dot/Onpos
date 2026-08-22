export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  logoHeight?: number;
  showLogoText?: boolean;
  primaryColor: string;
  accentColor: string;
  colorPreset?: 'corporate-blue' | 'indigo-violet' | 'emerald-teal' | 'slate-black' | 'midnight-navy';
  layoutDensity?: 'spacious' | 'balanced' | 'compact';
  cardStyle?: 'soft-border' | 'elevated-shadow' | 'minimal-flat';
  phone: string;
  phoneFormatted: string;
  email: string;
  address: string;
  workingHours: string;
  socialLinks: {
    whatsapp: string;
    telegram: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  currency: string;
  language: string;
  activeTheme: 'light' | 'dark';
  topbarText: string;
  headerStyle: 'standard' | 'minimal' | 'floating';
  footerStyle: 'full' | 'compact' | 'minimal';
  showQuickContactButtons?: boolean;
  quickContactPosition?: 'left' | 'right';
  quickContactPhone?: string;
  quickContactWhatsapp?: string;
  quickContactMessage?: string;
}

export interface HomeSectionConfig {
  id: string;
  name: string;
  order: number;
  enabled: boolean;
  description?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  order: number;
  isVisible: boolean;
  badge?: string;
  badgeColor?: string;
  isMegaMenu?: boolean;
  iconName?: string;
  isExternal?: boolean;
  parentId?: string;
  children?: MenuItem[];
}

export interface MegaMenuCategory {
  id: string;
  title: string;
  desc: string;
  iconName: string;
  href: string;
  badge?: string;
  colorBg?: string;
}

export interface MegaMenuConfig {
  featuredProductId?: string;
  spotlightBadge: string;
  spotlightTitle: string;
  spotlightDesc: string;
  spotlightPriceText: string;
  spotlightCtaText: string;
  spotlightCtaUrl: string;
  bottomNoticeText: string;
  bottomNoticeLinkText: string;
  bottomNoticeLinkUrl: string;
  categories: MegaMenuCategory[];
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  posName: string;
  imageUrl: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  order: number;
  isActive: boolean;
}

export interface TrustStat {
  id: string;
  number: string;
  label: string;
  desc: string;
  order: number;
}

export interface CorporateIntroConfig {
  badge: string;
  title: string;
  description: string;
  bulletPoints: string[];
  imageUrl?: string;
  imageBadge?: string;
  imageTitle?: string;
  imageDesc?: string;
  card1Title?: string;
  card1Desc?: string;
  card2Title?: string;
  card2Desc?: string;
}

export interface CloudPanelConfig {
  badge: string;
  title: string;
  description: string;
  todayRevenue: string;
  todayGrowth: string;
  activeDevicesCount: string;
  uptimePercent: string;
  txSpeed: string;
}

export interface WhyUsItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  order: number;
}

export interface PosProduct {
  id: string;
  slug: string;
  name: string;
  category: 'Android POS' | 'Mobil POS' | 'Masaüstü POS' | 'Akıllı POS' | 'Yazarkasa POS' | 'Aksesuarlar';
  shortDesc: string;
  fullDesc: string;
  price?: number;
  oldPrice?: number;
  isDiscounted?: boolean;
  discountLabel?: string;
  sku: string;
  brand: string;
  inStock: boolean;
  specs: {
    display: string;
    os: string;
    connectivity: string;
    nfc: string;
    printer: string;
    battery: string;
    weight: string;
    security: string;
  };
  features: string[];
  images: string[];
  pdfSpecUrl?: string;
  videoUrl?: string;
  isFeatured: boolean;
  order: number;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  benefits: string[];
  images: string[];
  videoUrl?: string;
  order: number;
}

export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  features: string[];
  targetAudience: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  status: 'Tamamlandı' | 'Devam Ediyor';
  completionDate: string;
  coverImage: string;
  gallery: string[];
  description: string;
  utilizedProducts: string[];
  utilizedServices: string[];
}

export interface ReferenceItem {
  id: string;
  name: string;
  logo: string;
  category: string;
  city?: string;
  district?: string;
  description: string;
  websiteUrl?: string;
  order: number;
}

export interface TestimonialItem {
  id: string;
  authorName: string;
  authorTitle: string;
  company: string;
  city: string;
  comment: string;
  rating: number;
  avatar: string;
  date: string;
  isApproved: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
  order: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  isFeatured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl: string;
  album: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'POS' | 'Ödeme' | 'Teknik Destek' | 'Satın Alma' | 'Kurulum' | 'Genel';
  order: number;
}

export interface DealerBranch {
  id: string;
  title: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  branch: string;
  accountHolder: string;
  iban: string;
  currency: string;
  logo: string;
}

export interface ECatalog {
  id: string;
  title: string;
  coverImage: string;
  pdfUrl: string;
  description: string;
  fileSize: string;
  updatedAt: string;
}

export interface PageBlock {
  id: string;
  type: 'text' | 'image' | 'callout' | 'features' | 'cta';
  title?: string;
  content?: string;
  imageUrl?: string;
  items?: string[];
  ctaText?: string;
  ctaUrl?: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  template?: 'blank' | 'corporate' | 'support' | 'partnership';
  contentHtml: string;
  blocks?: PageBlock[];
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
  updatedAt: string;
}

export interface QuoteSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  selectedService?: string;
  selectedProduct?: string;
  message: string;
  fileName?: string;
  kvkkAccepted: boolean;
  createdAt: string;
  status: 'Yeni' | 'İnceleniyor' | 'Tamamlandı' | 'İptal';
}

export interface SubscriberItem {
  id: string;
  email: string;
  createdAt: string;
}

export interface AboutPageData {
  title: string;
  subtitle: string;
  heroBadge: string;
  heroDescription: string;
  storyTitle: string;
  storyContent: string;
  visionTitle: string;
  visionContent: string;
  missionTitle: string;
  missionContent: string;
  values: Array<{ title: string; desc: string }>;
  certifications: Array<{ title: string; issuer: string; badge: string }>;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'Super Admin' | 'Yönetici' | 'Editör';
  status: 'Aktif' | 'Pasif';
  createdAt: string;
  lastLogin?: string;
}

export interface HeaderConfig {
  showTopbar: boolean;
  topbarText: string;
  topbarPhone: string;
  topbarWhatsapp: string;
  showSearch: boolean;
  showQuoteButton: boolean;
  quoteButtonText: string;
  quoteButtonUrl: string;
  stickyHeader: boolean;
  headerStyle: 'standard' | 'minimal' | 'floating';
}

export interface FooterLinkItem {
  id: string;
  label: string;
  href: string;
  isVisible: boolean;
}

export interface FooterBadgeCard {
  id: string;
  title: string;
  subtitle: string;
  iconName?: string;
}

export interface FooterConfig {
  footerStyle: 'full' | 'compact' | 'minimal';
  footerLogoUrl?: string;
  brandDescription: string;
  showContactInfoUnderLogo?: boolean;
  
  showFeatureCards?: boolean;
  featureCards?: FooterBadgeCard[];
  
  col1Title?: string;
  col1Links?: FooterLinkItem[];
  
  col2Title?: string;
  col2Links?: FooterLinkItem[];
  
  col3Title?: string;
  col3Links?: FooterLinkItem[];
  
  showNewsletter?: boolean;
  newsletterTitle?: string;
  newsletterSubtitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  
  copyrightText: string;
  legalLinks?: FooterLinkItem[];
  showSocialLinks: boolean;
  showWorkingHours: boolean;
  showPaymentBadges: boolean;
  quickLinksTitle?: string;
  productsTitle?: string;
  contactTitle?: string;
}

export interface HeroConfig {
  sliderTheme: 'theme1' | 'theme2';
  autoplaySpeed?: number;
}

export interface CMSData {
  settings: SiteSettings;
  menu: MenuItem[];
  megaMenuConfig: MegaMenuConfig;
  heroSlides: HeroSlide[];
  trustStats: TrustStat[];
  corporateIntro: CorporateIntroConfig;
  cloudPanel: CloudPanelConfig;
  whyUs: WhyUsItem[];
  aboutPage: AboutPageData;
  products: PosProduct[];
  services: ServiceItem[];
  solutions: SolutionItem[];
  projects: ProjectItem[];
  references: ReferenceItem[];
  testimonials: TestimonialItem[];
  team: TeamMember[];
  blogPosts: BlogPost[];
  gallery: GalleryItem[];
  faqs: FaqItem[];
  dealers: DealerBranch[];
  bankAccounts: BankAccount[];
  catalogs: ECatalog[];
  customPages: CustomPage[];
  submissions: QuoteSubmission[];
  subscribers: SubscriberItem[];
  homeSections?: HomeSectionConfig[];
  adminUsers?: AdminUser[];
  headerConfig?: HeaderConfig;
  footerConfig?: FooterConfig;
  heroConfig?: HeroConfig;
}
