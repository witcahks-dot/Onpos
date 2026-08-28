import { z } from 'zod';

/**
 * XSS & HTML Tag Sanitizer
 * Strips script tags, HTML tags and malicious payloads from user-supplied strings.
 */
export function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/**
 * Lead & Quote Request Validation Schema
 */
export const quoteSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Ad Soyad en az 2 karakter olmalıdır.')
    .max(100, 'Ad Soyad en fazla 100 karakter olabilir.')
    .transform(sanitizeInput),
  phone: z
    .string()
    .trim()
    .regex(/^(\+90|0)?[5][0-9]{9}$/, 'Lütfen geçerli bir Türkiye cep telefonu numarası giriniz (Örn: 0530XXXXXXX).'),
  email: z
    .string()
    .trim()
    .email('Geçerli bir e-posta adresi giriniz.')
    .max(120, 'E-posta adresi çok uzun.')
    .transform(sanitizeInput),
  company: z
    .string()
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : '')),
  city: z
    .string()
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : '')),
  selectedProduct: z
    .string()
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : '')),
  selectedService: z
    .string()
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : '')),
  message: z
    .string()
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : '')),
  taxNumber: z
    .string()
    .regex(/^[0-9]{10,11}$/, 'Vergi No / TC Kimlik No 10 veya 11 haneli olmalıdır.')
    .optional()
    .or(z.literal('')),
  kvkkAccepted: z.boolean().optional().default(true),
});

export type QuoteSubmissionInput = z.infer<typeof quoteSubmissionSchema>;

/**
 * Newsletter Subscription Validation Schema
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Lütfen geçerli bir e-posta adresi giriniz.')
    .max(120, 'E-posta adresi çok uzun.')
    .transform(sanitizeInput),
});

/**
 * Settings & Theme Update Validation Schema
 */
export const settingsUpdateSchema = z.object({
  themeId: z.enum(['theme-existing', 'theme-fintech']).optional(),
  activeTheme: z.enum(['light', 'dark']).optional(),
  siteName: z.string().optional(),
  tagline: z.string().optional(),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  logoHeight: z.number().optional(),
  showLogoText: z.boolean().optional(),
  primaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  colorPreset: z.enum(['corporate-blue', 'indigo-violet', 'emerald-teal', 'slate-black', 'midnight-navy']).optional(),
  layoutDensity: z.enum(['spacious', 'balanced', 'compact']).optional(),
  cardStyle: z.enum(['soft-border', 'elevated-shadow', 'minimal-flat']).optional(),
  phone: z.string().optional(),
  phoneFormatted: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  workingHours: z.string().optional(),
  currency: z.string().optional(),
  language: z.string().optional(),
  topbarText: z.string().optional(),
  headerStyle: z.enum(['standard', 'minimal', 'floating']).optional(),
  footerStyle: z.enum(['full', 'compact', 'minimal']).optional(),
  socialLinks: z.object({
    whatsapp: z.string().optional(),
    telegram: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
  }).optional(),
  showQuickContactButtons: z.boolean().optional(),
  quickContactPosition: z.enum(['left', 'right']).optional(),
  quickContactPhone: z.string().optional(),
  quickContactWhatsapp: z.string().optional(),
  quickContactMessage: z.string().optional(),
}).passthrough();

