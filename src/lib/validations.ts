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
