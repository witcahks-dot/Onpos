# PAYPOS / ONPOS2 — API ve Backend Fonksiyonları Envanteri (Aşama 1)

Bu doküman, projedeki tüm HTTP route handler'larını, sunucu fonksiyonlarını, veri modellerini, tüketici bileşenlerini ve güvenlik/cache durumlarını gerçek dosya kanıtlarıyla listeler.

---

## 1. Evrensel REST API Endpoint Envanteri (`src/app/api/cms/[entity]/route.ts`)

| Method | Path veya function | Kaynak dosya ve satır | Auth / Rol | Input | Validation | Response | DB Model / Table | Admin Consumer | Frontend Consumer | Cache | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/cms/all` | `src/app/api/cms/[entity]/route.ts:10-33` | Public (Yok) | Yok | Yok | `CMSData` (Tüm veritabanı JSON objesi) | `data/cms-db.json` / All Tables | `src/app/admin/layout.tsx:77`, `src/lib/cms-store.ts:145` | `src/components/CMSHydrator.tsx:27`, `src/app/page.tsx:28`, `Header.tsx:25` | `revalidate: 0`, `cache: 'no-store'` | ✅ Aktif |
| **GET** | `/api/cms/[entity]` | `src/app/api/cms/[entity]/route.ts:10-33` | Public (Yok) | `entity` URL parametresi | Key varlık kontrolü (`entity in data`) | `CMSData[entity]` veya 404 JSON | `data/cms-db.json` -> `[entity]` | Store `fetchCMSData` üzerinden | İhtiyaç halinde tekil getirme | `force-dynamic` | ✅ Aktif |
| **POST** | `/api/cms/quote-submit` | `src/app/api/cms/[entity]/route.ts:46-57` | Public (Ziyaretçi) | `{ fullName, email, phone, company, city, selectedProduct, message, kvkkAccepted }` | `quoteSubmissionSchema` (Zod - `src/lib/validations.ts:3-12`) | `{ success: true, message: string, data: QuoteSubmission }` | `submissions` tablosu / array | `/admin/submissions` (Görüntüleme) | `QuoteModal.tsx:32`, `QuoteFormSection.tsx:55` | Yok | ✅ Aktif |
| **POST** | `/api/cms/subscribers` | `src/app/api/cms/[entity]/route.ts:59-75` | Public (Ziyaretçi) | `{ email: string }` | `newsletterSchema` (Zod - `src/lib/validations.ts:14-17`) | `{ success: true, message: string, data: SubscriberItem }` | `subscribers` tablosu / array | `/admin/subscribers` (Görüntüleme) | `Footer.tsx:257`, `NewsletterSection.tsx` | Yok | ✅ Aktif |
| **POST** | `/api/cms/[entity]` (Array Append) | `src/app/api/cms/[entity]/route.ts:87-94` | Yok (Client Guard Var) | Yeni eleman JSON objesi (`id` opsiyonel) | Yok | Eklenen `newItem` (201 Created) | `products`, `services`, `blogPosts` vb. | `saveProduct`, `saveService`, `saveBlogPost` vb. | Yok | Yok | ✅ Aktif |
| **POST** | `/api/cms/[entity]` (Array Replace) | `src/app/api/cms/[entity]/route.ts:78-82` | Yok (Client Guard Var) | Full Array JSON | `Array.isArray(body)` | Güncellenen Array (200 OK) | `homeSections`, `menu`, `whyUs` vb. | `updateHomeSections`, `updateMenu`, `updateWhyUs` | Yok | Yok | ✅ Aktif |
| **POST** | `/api/cms/[entity]` (Object Merge) | `src/app/api/cms/[entity]/route.ts:97-102` | Yok (Client Guard Var) | Kısmi Obje JSON | `typeof val === 'object'` | Birleştirilmiş Obje (200 OK) | `settings`, `corporateIntro`, `cloudPanel`, `aboutPage` | `updateSettings`, `updateCorporateIntro`, `updateCloudPanel` | Yok | Yok | ✅ Aktif |
| **PUT** | `/api/cms/[entity]` (Single Item Update) | `src/app/api/cms/[entity]/route.ts:144-148` | Yok (Client Guard Var) | Güncellenecek nesne (`id` zorunlu) | `item.id === body.id` eşleşmesi | Güncellenen Array (200 OK) | `products`, `services`, `faqs`, `team` vb. | `saveProduct`, `saveService`, `saveFaq` | Yok | Yok | ✅ Aktif |
| **PUT** | `/api/cms/[entity]` (Bulk Array Update) | `src/app/api/cms/[entity]/route.ts:138-141` | Yok (Client Guard Var) | Güncellenmiş Array JSON | `Array.isArray(body)` | Güncellenen Array (200 OK) | `homeSections`, `menu`, `trustStats` | `updateHomeSections`, `updateMenu` | Yok | Yok | ✅ Aktif |
| **PUT** | `/api/cms/[entity]` (Object Update) | `src/app/api/cms/[entity]/route.ts:151-155` | Yok (Client Guard Var) | Kısmi/Tam Obje JSON | Obje yayma (`{ ...cur, ...body }`) | Güncellenen Obje (200 OK) | `settings`, `headerConfig`, `footerConfig` | `updateSettings`, `updateHeaderConfig`, `updateFooterConfig` | Yok | Yok | ✅ Aktif |
| **DELETE** | `/api/cms/[entity]?id={id}` | `src/app/api/cms/[entity]/route.ts:167-197` | Yok (Client Guard Var) | Query Param `id` | `!id` kontrolü (400 Bad Request) | Kalan Array (200 OK) | `products`, `services`, `heroSlides`, `faqs` vb. | `deleteProduct`, `deleteService`, `deleteHeroSlide` vb. | Yok | Yok | ✅ Aktif |

---

## 2. Dahili Backend / Veri Fonksiyonları (`src/lib/cms-db.ts`)

| Fonksiyon Adı | Kaynak Dosya & Satır | Girdi | Çıktı | Açıklama |
| :--- | :--- | :--- | :--- | :--- |
| `readCMSData()` | `src/lib/cms-db.ts:22-68` | Yok | `CMSData` | Dosyadan JSON okur, in-memory cache'e alır, eksik entity'leri `defaultCMSData` ile tamamlar. |
| `writeCMSData(data)` | `src/lib/cms-db.ts:70-108` | `Partial<CMSData>` | `CMSData` | Veriyi birleştirir, in-memory cache ve `data/cms-db.json` dosyasına senkron yazar; varsa Supabase'e asenkron aktarır. |
| `syncToSupabase(data)` | `src/lib/cms-db.ts:110-119` | `Partial<CMSData>` | `Promise<void>` | Supabase URL ve Anon Key varsa bulut veritabanına `upsert` yapar. |

---

## 3. Zustand Store Eylemleri (Actions) Envanteri (`src/lib/cms-store.ts`)

| Store Action | Tetiklediği Endpoint | Payload / Yöntem | İlgili Sayfalar / Bileşenler |
| :--- | :--- | :--- | :--- |
| `fetchCMSData()` | `GET /api/cms/all` | `cache: 'no-store'` | `RootLayout`, `HomePage`, `Header`, `Footer`, `AdminLayout` |
| `updateSettings()` | `PUT /api/cms/settings` | `Partial<SiteSettings>` | `/admin/settings` -> `CMSHydrator` (Renkler & Tema) |
| `updateHomeSections()` | `PUT /api/cms/homeSections` | `HomeSectionConfig[]` | `/admin/sections` -> `src/app/page.tsx` (Bölüm Sıralama) |
| `updateMenu()` | `PUT /api/cms/menu` | `MenuItem[]` | `/admin/menu` -> `Header.tsx`, `MegaMenu.tsx` |
| `saveHeroSlide()` | `POST / PUT /api/cms/heroSlides` | `Partial<HeroSlide>` | `/admin/hero` -> `SpatialPosSlider.tsx` |
| `saveProduct()` | `POST / PUT /api/cms/products` | `Partial<PosProduct>` | `/admin/products` -> `/pos-cihazlari`, `FeaturedProductsSection` |
| `saveService()` | `POST / PUT /api/cms/services` | `Partial<ServiceItem>` | `/admin/services` -> `/hizmetler`, `ServicesSection` |
| `saveSolution()` | `POST / PUT /api/cms/solutions` | `Partial<SolutionItem>` | `/admin/solutions` -> `/cozumler`, `SolutionsSection` |
| `saveProject()` | `POST / PUT /api/cms/projects` | `Partial<ProjectItem>` | `/admin/projects` -> `/projeler`, `ProjectsSection` |
| `saveCustomPage()` | `POST / PUT /api/cms/customPages`| `Partial<CustomPage>` | `/admin/pages` -> `/sayfa/[slug]`, `/kurumsal/[slug]` |
| `submitQuoteRequest()` | `POST /api/cms/quote-submit` | `Partial<QuoteSubmission>` | `QuoteModal.tsx`, `QuoteFormSection.tsx` -> `/admin/submissions` |
| `subscribeNewsletter()` | `POST /api/cms/subscribers` | `{ email: string }` | `Footer.tsx`, `NewsletterSection.tsx` -> `/admin/subscribers` |
