import { create } from 'zustand';
import {
  CMSData,
  SiteSettings,
  HomeSectionConfig,
  MenuItem,
  MegaMenuConfig,
  HeroSlide,
  TrustStat,
  CorporateIntroConfig,
  CloudPanelConfig,
  WhyUsItem,
  PosProduct,
  ServiceItem,
  SolutionItem,
  ProjectItem,
  ReferenceItem,
  TestimonialItem,
  TeamMember,
  BlogPost,
  GalleryItem,
  FaqItem,
  DealerBranch,
  BankAccount,
  ECatalog,
  CustomPage,
  QuoteSubmission,
  AboutPageData
} from '@/types';
import { defaultCMSData } from './default-data';

interface CMSStoreState extends CMSData {
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCMSData: () => Promise<void>;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  updateHomeSections: (sections: HomeSectionConfig[]) => Promise<void>;
  updateMenu: (menuItems: MenuItem[]) => Promise<void>;
  updateMegaMenuConfig: (config: Partial<MegaMenuConfig>) => Promise<void>;
  
  saveHeroSlide: (slide: Partial<HeroSlide>) => Promise<void>;
  deleteHeroSlide: (id: string) => Promise<void>;
  
  updateTrustStats: (stats: TrustStat[]) => Promise<void>;
  updateCorporateIntro: (intro: CorporateIntroConfig) => Promise<void>;
  updateAboutPage: (aboutData: AboutPageData) => Promise<void>;
  saveCMSSection: (sectionKey: string, data: any) => Promise<void>;
  updateCloudPanel: (config: CloudPanelConfig) => Promise<void>;
  updateWhyUs: (items: WhyUsItem[]) => Promise<void>;

  saveProduct: (product: Partial<PosProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  
  saveService: (service: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  saveSolution: (solution: Partial<SolutionItem>) => Promise<void>;
  deleteSolution: (id: string) => Promise<void>;
  
  saveProject: (project: Partial<ProjectItem>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  saveReference: (reference: Partial<ReferenceItem>) => Promise<void>;
  deleteReference: (id: string) => Promise<void>;

  saveTestimonial: (testimonial: Partial<TestimonialItem>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  saveTeamMember: (member: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  
  saveBlogPost: (post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;

  saveFaq: (faq: Partial<FaqItem>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;

  saveBankAccount: (account: Partial<BankAccount>) => Promise<void>;
  deleteBankAccount: (id: string) => Promise<void>;

  saveDealer: (dealer: Partial<DealerBranch>) => Promise<void>;
  deleteDealer: (id: string) => Promise<void>;

  saveCatalog: (catalog: Partial<ECatalog>) => Promise<void>;
  deleteCatalog: (id: string) => Promise<void>;

  saveGalleryItem: (item: Partial<GalleryItem>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  
  saveCustomPage: (page: Partial<CustomPage>) => Promise<void>;
  deleteCustomPage: (id: string) => Promise<void>;
  
  submitQuoteRequest: (submission: Partial<QuoteSubmission>) => Promise<boolean>;
  updateSubmissionStatus: (id: string, status: QuoteSubmission['status']) => Promise<void>;
  
  subscribeNewsletter: (email: string) => Promise<boolean>;
}

export const useCMSStore = create<CMSStoreState>((set, get) => ({
  ...defaultCMSData,
  isLoading: false,
  error: null,

  fetchCMSData: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await fetch('/api/cms/all', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch CMS data');
      const data: CMSData = await res.json();
      set({ ...data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message, isLoading: false });
    }
  },

  updateSettings: async (newSettings) => {
    try {
      const merged = { ...get().settings, ...newSettings };
      set({ settings: merged });
      await fetch('/api/cms/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  },

  updateHomeSections: async (sections) => {
    try {
      set({ homeSections: sections });
      await fetch('/api/cms/homeSections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sections),
      });
    } catch (err) {
      console.error('Failed to save homeSections:', err);
    }
  },

  updateMenu: async (menuItems) => {
    try {
      set({ menu: menuItems });
      await fetch('/api/cms/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuItems),
      });
    } catch (err) {
      console.error('Failed to update menu:', err);
    }
  },

  updateMegaMenuConfig: async (config) => {
    try {
      const merged = { ...get().megaMenuConfig, ...config };
      set({ megaMenuConfig: merged });
      await fetch('/api/cms/megaMenuConfig', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
    } catch (err) {
      console.error('Failed to update mega menu config:', err);
    }
  },

  saveHeroSlide: async (slide) => {
    try {
      const method = slide.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/heroSlides', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slide),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save hero slide:', err);
    }
  },

  deleteHeroSlide: async (id) => {
    try {
      const res = await fetch(`/api/cms/heroSlides?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ heroSlides: get().heroSlides.filter(s => s.id !== id) });
    } catch (err) {
      console.error('Failed to delete hero slide:', err);
    }
  },

  updateTrustStats: async (stats) => {
    try {
      set({ trustStats: stats });
      await fetch('/api/cms/trustStats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats),
      });
    } catch (err) {
      console.error('Failed to update stats:', err);
    }
  },

  updateCorporateIntro: async (intro) => {
    try {
      set({ corporateIntro: intro });
      await fetch('/api/cms/corporateIntro', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intro),
      });
    } catch (err) {
      console.error('Failed to update corporate intro:', err);
    }
  },

  updateAboutPage: async (aboutData) => {
    try {
      set({ aboutPage: aboutData });
      await fetch('/api/cms/aboutPage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutData),
      });
    } catch (err) {
      console.error('Failed to update about page:', err);
    }
  },

  saveCMSSection: async (sectionKey, data) => {
    try {
      set({ [sectionKey]: data } as any);
      await fetch(`/api/cms/${sectionKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error(`Failed to save CMS section ${sectionKey}:`, err);
    }
  },

  updateCloudPanel: async (config) => {
    try {
      set({ cloudPanel: config });
      await fetch('/api/cms/cloudPanel', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
    } catch (err) {
      console.error('Failed to update cloud panel:', err);
    }
  },

  updateWhyUs: async (items) => {
    try {
      set({ whyUs: items });
      await fetch('/api/cms/whyUs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
    } catch (err) {
      console.error('Failed to update why us:', err);
    }
  },

  saveProduct: async (product) => {
    try {
      const method = product.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save product:', err);
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/cms/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ products: get().products.filter(p => p.id !== id) });
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  },

  saveService: async (service) => {
    try {
      const method = service.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save service:', err);
    }
  },

  deleteService: async (id) => {
    try {
      const res = await fetch(`/api/cms/services?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ services: get().services.filter(s => s.id !== id) });
    } catch (err) {
      console.error('Failed to delete service:', err);
    }
  },

  saveSolution: async (solution) => {
    try {
      const method = solution.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/solutions', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solution),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save solution:', err);
    }
  },

  deleteSolution: async (id) => {
    try {
      const res = await fetch(`/api/cms/solutions?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ solutions: get().solutions.filter(s => s.id !== id) });
    } catch (err) {
      console.error('Failed to delete solution:', err);
    }
  },

  saveProject: async (project) => {
    try {
      const method = project.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save project:', err);
    }
  },

  deleteProject: async (id) => {
    try {
      const res = await fetch(`/api/cms/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ projects: get().projects.filter(p => p.id !== id) });
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  },

  saveReference: async (ref) => {
    try {
      const method = ref.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/references', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ref),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save reference:', err);
    }
  },

  deleteReference: async (id) => {
    try {
      const res = await fetch(`/api/cms/references?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ references: get().references.filter(r => r.id !== id) });
    } catch (err) {
      console.error('Failed to delete reference:', err);
    }
  },

  saveTestimonial: async (test) => {
    try {
      const method = test.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/testimonials', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save testimonial:', err);
    }
  },

  deleteTestimonial: async (id) => {
    try {
      const res = await fetch(`/api/cms/testimonials?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ testimonials: get().testimonials.filter(t => t.id !== id) });
    } catch (err) {
      console.error('Failed to delete testimonial:', err);
    }
  },

  saveTeamMember: async (member) => {
    try {
      const method = member.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/team', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save team member:', err);
    }
  },

  deleteTeamMember: async (id) => {
    try {
      const res = await fetch(`/api/cms/team?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ team: get().team.filter(m => m.id !== id) });
    } catch (err) {
      console.error('Failed to delete team member:', err);
    }
  },

  saveBlogPost: async (post) => {
    try {
      const method = post.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/blogPosts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save blog post:', err);
    }
  },

  deleteBlogPost: async (id) => {
    try {
      const res = await fetch(`/api/cms/blogPosts?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ blogPosts: get().blogPosts.filter(b => b.id !== id) });
    } catch (err) {
      console.error('Failed to delete blog post:', err);
    }
  },

  saveFaq: async (faq) => {
    try {
      const method = faq.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/faqs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faq),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save faq:', err);
    }
  },

  deleteFaq: async (id) => {
    try {
      const res = await fetch(`/api/cms/faqs?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ faqs: get().faqs.filter(f => f.id !== id) });
    } catch (err) {
      console.error('Failed to delete faq:', err);
    }
  },

  saveBankAccount: async (account) => {
    try {
      const method = account.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/bankAccounts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(account),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save bank account:', err);
    }
  },

  deleteBankAccount: async (id) => {
    try {
      const res = await fetch(`/api/cms/bankAccounts?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ bankAccounts: get().bankAccounts.filter(b => b.id !== id) });
    } catch (err) {
      console.error('Failed to delete bank account:', err);
    }
  },

  saveDealer: async (dealer) => {
    try {
      const method = dealer.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/dealers', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dealer),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save dealer:', err);
    }
  },

  deleteDealer: async (id) => {
    try {
      const res = await fetch(`/api/cms/dealers?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ dealers: get().dealers.filter(d => d.id !== id) });
    } catch (err) {
      console.error('Failed to delete dealer:', err);
    }
  },

  saveCatalog: async (catalog) => {
    try {
      const method = catalog.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/catalogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catalog),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save catalog:', err);
    }
  },

  deleteCatalog: async (id) => {
    try {
      const res = await fetch(`/api/cms/catalogs?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ catalogs: get().catalogs.filter(c => c.id !== id) });
    } catch (err) {
      console.error('Failed to delete catalog:', err);
    }
  },

  saveGalleryItem: async (item) => {
    try {
      const method = item.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/gallery', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save gallery item:', err);
    }
  },

  deleteGalleryItem: async (id) => {
    try {
      const res = await fetch(`/api/cms/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ gallery: get().gallery.filter(g => g.id !== id) });
    } catch (err) {
      console.error('Failed to delete gallery item:', err);
    }
  },

  saveCustomPage: async (page) => {
    try {
      const method = page.id ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/customPages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page),
      });
      if (res.ok) await get().fetchCMSData();
    } catch (err) {
      console.error('Failed to save page:', err);
    }
  },

  deleteCustomPage: async (id) => {
    try {
      const res = await fetch(`/api/cms/customPages?id=${id}`, { method: 'DELETE' });
      if (res.ok) set({ customPages: get().customPages.filter(p => p.id !== id) });
    } catch (err) {
      console.error('Failed to delete page:', err);
    }
  },

  submitQuoteRequest: async (submission) => {
    try {
      const res = await fetch('/api/cms/quote-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
      if (res.ok) {
        await get().fetchCMSData();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Quote submission error:', err);
      return false;
    }
  },

  updateSubmissionStatus: async (id, status) => {
    try {
      const updatedSubmissions = get().submissions.map(sub =>
        sub.id === id ? { ...sub, status } : sub
      );
      set({ submissions: updatedSubmissions });
      await fetch('/api/cms/submissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
    } catch (err) {
      console.error('Failed to update submission status:', err);
    }
  },

  subscribeNewsletter: async (email) => {
    try {
      const res = await fetch('/api/cms/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        await get().fetchCMSData();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Newsletter subscribe error:', err);
      return false;
    }
  },
}));
