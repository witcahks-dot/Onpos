# PAYPOS / ONPOS2 — Baseline ve Proje Envanteri Raporu (Aşama 0)

## 1. Yönetici Özeti ve Proje Kimliği
- **Proje Adı:** ONPOS2 / PAYPOS Kurumsal POS & Ödeme Teknolojileri Web Sitesi ve CMS
- **Canlı Adres:** https://onpos2.vercel.app
- **Mevcut Tema:** `theme-existing` (PAYPOS Kurumsal Beyaz & Mavi Tema)
- **Hedef Tema:** `theme-fintech` (Koyu/Modern Fintech, Kart/Metrik Odaklı Tasarım)
- **Temel Mimari İlkesi:** Tek veritabanı, tek CMS admin paneli, ortak veri/DTO katmanı, iki bağımsız sunum teması.

---

## 2. Teknoloji Yığını ve Çalışma Ortamı

| Bileşen | Kullanılan Sürüm / Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.1 (App Router + Turbopack) | Server & Client Components, Route Handlers |
| **React** | React 19.2.8 / React DOM 19.2.8 | En güncel React çekirdeği |
| **Dil / Tip Sistemi** | TypeScript 5.x / @types/node 20 | Katı tip tanımları (`src/types/index.ts`) |
| **Stil / CSS** | Tailwind CSS v4 (`@tailwindcss/postcss` 4.x) | Vanilla CSS değişkenleri (`globals.css`, CSS variables) |
| **Durum Yönetimi (State)** | Zustand 5.0.15 (`persist` middleware) | `useCMSStore`, `useAuthStore` |
| **Animasyon & İkonlar** | Framer Motion 13.1.1, Lucide React 1.33.0 | 3D Slider, geçişler ve ikon seti |
| **Validasyon & Harita** | Zod 4.4.3, Turkey Map React 2.0.6 | Form şema doğrulaması ve interaktif Türkiye haritası |
| **Veritabanı / Backend** | Supabase JS 2.112.3 + Yerel JSON Veritabanı | `data/cms-db.json` birincil, Supabase opsiyonel senkron |
| **Build & Lint** | Next CLI (`next build`), ESLint 9 | Turbopack derleme altyapısı |

---

## 3. `package.json` Script Envanteri

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

- **`npm run dev`**: Next.js geliştirme sunucusunu başlatır.
- **`npm run build`**: Turbopack ile statik ve dinamik sayfaları optimize ederek üretim paketini derler.
- **`npm run start`**: Üretim derlemesini çalıştırır.
- **`npm run lint`**: ESLint ile kod kalite ve kural kontrolü yapar.

---

## 4. Git Çalışma Ağacı ve Branch Durumu

- **Aktif Branch:** `main` (`origin/main` ile senkron)
- **Çalışma Ağacı Durumu:** `clean` (Hiçbir bekleyen veya uncommitted değişiklik yok)
- **Son Durum:** Aşama 0 ve Aşama 1 kapsamında kaynak kodda hiçbir değişiklik yapılmamıştır; yalnızca audit ve mimari raporları oluşturulmuştur.

---

## 5. Build, Tip Kontrolü ve Lint Sonuçları

### A. TypeScript Tip Kontrolü (`npx tsc --noEmit`)
- **Durum:** ✅ **BAŞARILI (0 HATA)**
- Tüm tip tanımları ve arayüzler hatasız derlenmektedir.

### B. Next.js Üretim Derlemesi (`npm run build`)
- **Durum:** ✅ **BAŞARILI (51/51 SAYFA DERLENDİ)**
- 43 adet statik sayfa (`○ Static`) ve 8 adet dinamik sayfa (`ƒ Dynamic`) hatasız oluşturulmuştur.

### C. ESLint Kontrolü (`npm run lint`)
- **Durum:** ⚠️ **38 HATA / 144 UYARI** (Mevcut kod tabanındaki baseline)
- **Hata Nedenleri:**
  1. JSX içinde kaçış karakteri kullanılmamış tırnak işaretleri (`react/no-unescaped-entities`).
  2. Bazı store ve bileşen fonksiyonlarında `any` tipi kullanımı (`@typescript-eslint/no-explicit-any`).
  3. `FilterModal.tsx` içinde render sırasında bileşen örneklendirilmesi (`react-hooks/static-components`).
  4. Kullanılmayan import ve değişken uyarıları (`@typescript-eslint/no-unused-vars`).

---

## 6. Ortam Değişkenleri (Environment Variables) Envanteri

> [!IMPORTANT]
> Güvenlik kuralı gereğince değişken değerleri kesinlikle okunmamış ve listelenmemiştir; yalnızca değişken adları ve kullanıldıkları dosyalar tespit edilmiştir:

| Değişken Adı | Kullanıldığı Dosya | Amacı |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `src/lib/supabase.ts` | Supabase API endpoint URL'si (İsteğe bağlı) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `src/lib/supabase.ts` | Supabase anonim istemci erişim anahtarı |

*Not: Proje kökünde aktif `.env` dosyası bulunmamakta olup, sistem `data/cms-db.json` yerel dosya motoru ile tam bağımsız olarak çalışabilmektedir.*

---

## 7. Veri Depolama, ORM ve Migration Mimarisi

1. **Birincil Veri Deposu:** `data/cms-db.json` (Proje kökünde, Next.js HMR dosya izleyicisinin dışında).
2. **Yedek / Eski Veri Dosyası:** `src/data/cms-db.json`.
3. **Varsayılan Fallback Verisi:** `src/lib/default-data.ts` (37 KB zengin kurumsal başlangıç verisi).
4. **Veritabanı I/O Katmanı:** `src/lib/cms-db.ts` (`readCMSData()`, `writeCMSData()`, `inMemoryCache` singleton).
5. **Bulut Veritabanı Şeması:** `supabase-schema.sql` (17 adet ilişkisel tablo ve RLS politikaları).
6. **Medya Depolama:** 
   - Statik yerel dosyalar: `/public/images/*`, `/favicon.ico`
   - Dış CDN / URL referansları: `https://www.yazarkasasatisi.com/upload/...`, `https://images.unsplash.com/...`

---

## 8. Kimlik Doğrulama ve Yetkilendirme (Auth & Roles)

1. **State Store:** `src/lib/auth-store.ts` (Zustand `persist` ile `paypos-admin-auth` localStorage anahtarı).
2. **Kullanıcı Rolleri:** `Super Admin`, `Yönetici`, `Editör`.
3. **Kullanıcı Kaynağı:**
   - Dinamik: `useCMSStore.getState().adminUsers` (CMS veritabanında kayıtlı kullanıcılar).
   - Statik Yedek: Varsayılan admin bilgileri (`admin@paypos.com.tr`).
4. **İstemci Koruması:** `src/components/admin/AdminGuard.tsx` (İstemci tarafında oturumu olmayanları `/admin/login` sayfasına yönlendirir).
5. **Sunucu Koruması Durumu:** `/api/cms/[entity]` endpoint'i şu anda açık durumdadır (Session/Cookie token doğrulaması bulunmamaktadır).

---

## 9. Önbellekleme, Revalidation ve Veri Senkronizasyonu

1. **API Seviyesi:** `src/app/api/cms/[entity]/route.ts`
   - `export const dynamic = 'force-dynamic'`
   - `export const revalidate = 0`
2. **İstemci Seviyesi:** `src/lib/cms-store.ts`
   - `fetch('/api/cms/all', { cache: 'no-store' })` ile her sayfa yüklenişinde güncel veriyi çeker.
3. **Hydration:** `src/components/CMSHydrator.tsx`
   - Kök `RootLayout` seviyesinde çalışır, temayı ve CSS değişkenlerini (`--primary-color`, `--accent-color`, `--card-padding` vb.) DOM köküne (`document.documentElement`) anında uygular.
