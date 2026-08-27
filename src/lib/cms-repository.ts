import { readCMSData } from './cms-db';
import {
  normalizeCMSData,
  normalizeSiteSettings,
  resolveActiveTheme
} from './data-normalizers';
import {
  CMSData,
  SiteSettings,
  PosProduct,
  ServiceItem,
  SolutionItem,
  ProjectItem,
  CustomPage,
  BlogPost,
  FaqItem,
  ReferenceItem,
  MenuItem,
  HeroSlide,
  ThemeId
} from '@/types';

// ============================================================================
// CENTRALIZED CMS REPOSITORY / QUERY SERVICE
// ============================================================================

export function getCMSData(): CMSData {
  const raw = readCMSData();
  return normalizeCMSData(raw);
}

export function getActiveTheme(): ThemeId {
  const settings = getSettings();
  return resolveActiveTheme(settings);
}

export function getSettings(): SiteSettings {
  const data = getCMSData();
  return normalizeSiteSettings(data.settings);
}

export function getVisibleMenuItems(): MenuItem[] {
  const data = getCMSData();
  return (data.menu || [])
    .filter(m => m.isVisible !== false)
    .sort((a, b) => (a.order ?? 1) - (b.order ?? 1));
}

export function getActiveHeroSlides(): HeroSlide[] {
  const data = getCMSData();
  return (data.heroSlides || [])
    .filter(s => s.isActive !== false)
    .sort((a, b) => (a.order ?? 1) - (b.order ?? 1));
}

export function getProducts(category?: string): PosProduct[] {
  const data = getCMSData();
  let list = data.products || [];
  if (category && category !== 'Hepsi') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  return list.sort((a, b) => (a.order ?? 1) - (b.order ?? 1));
}

export function getFeaturedProducts(): PosProduct[] {
  const products = getProducts();
  return products.filter(p => p.isFeatured);
}

export function getProductBySlug(slug: string): PosProduct | undefined {
  const products = getProducts();
  const cleanSlug = slug.trim().toLowerCase();
  return products.find(p => p.slug.toLowerCase() === cleanSlug || p.id === slug);
}

export function getServices(): ServiceItem[] {
  const data = getCMSData();
  return (data.services || []).sort((a, b) => (a.order ?? 1) - (b.order ?? 1));
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  const services = getServices();
  const cleanSlug = slug.trim().toLowerCase();
  return services.find(s => s.slug.toLowerCase() === cleanSlug || s.id === slug);
}

export function getSolutions(): SolutionItem[] {
  const data = getCMSData();
  return data.solutions || [];
}

export function getSolutionBySlug(slug: string): SolutionItem | undefined {
  const solutions = getSolutions();
  const cleanSlug = slug.trim().toLowerCase();
  return solutions.find(s => s.slug.toLowerCase() === cleanSlug || s.id === slug);
}

export function getProjects(): ProjectItem[] {
  const data = getCMSData();
  return data.projects || [];
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  const projects = getProjects();
  const cleanSlug = slug.trim().toLowerCase();
  return projects.find(p => p.slug.toLowerCase() === cleanSlug || p.id === slug);
}

export function getCustomPageBySlug(slug: string): CustomPage | undefined {
  const data = getCMSData();
  const pages = data.customPages || [];
  const cleanSlug = slug.trim().toLowerCase();
  return pages.find(
    p => p.slug.toLowerCase() === cleanSlug || 
         p.id.toLowerCase() === cleanSlug || 
         p.id === `cp-${cleanSlug}`
  );
}

export function getBlogPosts(): BlogPost[] {
  const data = getCMSData();
  return data.blogPosts || [];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  const cleanSlug = slug.trim().toLowerCase();
  return posts.find(p => p.slug.toLowerCase() === cleanSlug || p.id === slug);
}

export function getFaqs(category?: string): FaqItem[] {
  const data = getCMSData();
  let faqs = (data.faqs || []).sort((a, b) => (a.order ?? 1) - (b.order ?? 1));
  if (category && category !== 'Hepsi') {
    faqs = faqs.filter(f => f.category.toLowerCase() === category.toLowerCase());
  }
  return faqs;
}

export function getReferences(): ReferenceItem[] {
  const data = getCMSData();
  return (data.references || []).sort((a, b) => (a.order ?? 1) - (b.order ?? 1));
}
