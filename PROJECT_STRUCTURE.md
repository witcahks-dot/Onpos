# PAYPOS / ONPOS2 — Proje Dizin ve Modül Ağacı (Aşama 0)

## 1. Dizin Hiyerarşisi

```
onpos2/
├── data/                               # Proje veritabanı JSON dosyası (HMR dışı)
│   └── cms-db.json                     # Aktif CMS veritabanı (Settings, Products, Menu vb.)
├── public/                             # Statik medya ve genel varlıklar
│   ├── favicon.ico
│   ├── file.svg / globe.svg / ...
│   └── images/                         # POS görselleri, logolar
├── src/
│   ├── app/                            # Next.js App Router sayfaları ve API handler'ları
│   │   ├── admin/                      # CMS Yönetici Paneli sayfaları (27 sayfa)
│   │   │   ├── about/page.tsx          # Hakkımızda sayfası CMS yönetimi
│   │   │   ├── bank-accounts/page.tsx  # Banka hesapları & IBAN yönetimi
│   │   │   ├── blog/page.tsx           # Blog & haber içerik yönetimi
│   │   │   ├── catalogs/page.tsx       # PDF E-katalog yönetimi
│   │   │   ├── cloud-panel/page.tsx    # Bulut servis ve teknoloji paneli yönetimi
│   │   │   ├── dealers/page.tsx        # Bayi / Şube harita ve liste yönetimi
│   │   │   ├── faqs/page.tsx           # Sıkça sorulan sorular yönetimi
│   │   │   ├── gallery/page.tsx        # Foto/video galeri yönetimi
│   │   │   ├── header-footer/page.tsx  # Header & Footer detaylı konfigürasyon
│   │   │   ├── hero/page.tsx           # 3D Spatial Hero Slider slayt yönetimi
│   │   │   ├── intro/page.tsx          # Kurumsal tanıtım blok yönetimi
│   │   │   ├── layout.tsx              # Admin sidebar, header, auth guard düzeni
│   │   │   ├── login/page.tsx          # Admin giriş ekranı
│   │   │   ├── menu/page.tsx           # Navigasyon menüsü yönetimi
│   │   │   ├── page.tsx                # Admin ana kontrol dashboard'u
│   │   │   ├── pages/page.tsx          # Dinamik özel sayfa ve blok oluşturucu
│   │   │   ├── products/page.tsx       # POS cihazı ürün kataloğu yönetimi
│   │   │   ├── projects/page.tsx       # Kurumsal proje yönetimi
│   │   │   ├── references/page.tsx     # Referans logo wall ve müşteri yönetimi
│   │   │   ├── sections/page.tsx       # Ana sayfa modül sıralama ve aktif/pasif
│   │   │   ├── services/page.tsx       # Hizmet portföyü yönetimi
│   │   │   ├── settings/page.tsx       # Genel ayarlar, logo, renkler, yüzen butonlar
│   │   │   ├── solutions/page.tsx      # Sektörel çözümler yönetimi
│   │   │   ├── stats/page.tsx          # Güven ve hacim istatistikleri
│   │   │   ├── submissions/page.tsx    # Gelen teklif formları ve durum yönetimi
│   │   │   ├── subscribers/page.tsx    # E-bülten aboneleri
│   │   │   ├── team/page.tsx           # Yönetim ve uzman ekip yönetimi
│   │   │   ├── testimonials/page.tsx   # Müşteri yorumları ve yıldız değerlendirmeleri
│   │   │   ├── users/page.tsx          # Admin kullanıcı ve yetki yönetimi
│   │   │   └── why-us/page.tsx         # Neden Biz maddeleri yönetimi
│   │   │
│   │   ├── api/                        # Backend REST Route Handlers
│   │   │   └── cms/[entity]/route.ts   # Evrensel CMS CRUD endpoint'i (GET, POST, PUT, DELETE)
│   │   │
│   │   ├── blog/                       # Blog listesi (`/blog`) ve detay (`/blog/[slug]`)
│   │   ├── cozumler/                   # Sektörel çözümler (`/cozumler` & `/cozumler/[slug]`)
│   │   ├── galeri/                     # Medya galerisi (`/galeri`)
│   │   ├── hizmetler/                  # Hizmetler listesi (`/hizmetler` & `/hizmetler/[slug]`)
│   │   ├── iletisim/                   # İletişim sayfası (`/iletisim`)
│   │   ├── kurumsal/                   # Kurumsal alt sayfalar
│   │   │   ├── banka-hesaplari/page.tsx
│   │   │   ├── bayiler/page.tsx
│   │   │   ├── belgelerimiz/page.tsx
│   │   │   ├── e-katalog/page.tsx
│   │   │   ├── ekibimiz/page.tsx
│   │   │   ├── hakkimizda/page.tsx
│   │   │   ├── kariyer/page.tsx
│   │   │   ├── referanslar/page.tsx
│   │   │   ├── tarihcemiz/page.tsx
│   │   │   └── [slug]/page.tsx         # Dinamik kurumsal sayfalar
│   │   ├── pos-cihazlari/              # Ürün kataloğu (`/pos-cihazlari` & `/[slug]`)
│   │   ├── projeler/                   # Projeler (`/projeler` & `/[slug]`)
│   │   ├── referanslar/page.tsx        # Doğrudan referanslar route'u
│   │   ├── sayfa/[slug]/page.tsx       # Dinamik CMS özel sayfaları
│   │   ├── sss/page.tsx                # Sıkça Sorulan Sorular sayfası
│   │   ├── globals.css                 # CSS değişkenleri, Tailwind ve global stiller
│   │   ├── layout.tsx                  # Kök HTML layout'u, fontlar, SEO ve Hydrator
│   │   ├── not-found.tsx               # Özel 404 sayfası
│   │   └── page.tsx                    # Dinamik ana sayfa renderer'ı
│   │
│   ├── components/                     # Yeniden kullanılabilir UI bileşenleri
│   │   ├── admin/                      # Admin koruyucu (`AdminGuard.tsx`)
│   │   ├── common/                     # `ClientMountedOnly.tsx`
│   │   ├── hero/                       # `SpatialPosSlider.tsx` (3D CoverFlow Hero Slider)
│   │   ├── home/                       # Ana sayfa bölüm bileşenleri (15 adet modül)
│   │   │   ├── CorporateIntro.tsx
│   │   │   ├── FaqSection.tsx
│   │   │   ├── FeaturedProductsSection.tsx
│   │   │   ├── LatestNewsSection.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── QuoteFormSection.tsx
│   │   │   ├── ReferencesLogoWall.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── SolutionsSection.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   ├── TechnologyDashboardSection.tsx
│   │   │   ├── TestimonialSlider.tsx
│   │   │   ├── TrustStats.tsx
│   │   │   └── WhyUsSection.tsx
│   │   ├── layout/                     # Header, Footer, Topbar, MegaMenu, QuickContact vb.
│   │   ├── references/                 # Türkiye haritası ve referans modalı
│   │   ├── ui/                         # `QuoteModal.tsx`, `SocialIcons.tsx`
│   │   └── CMSHydrator.tsx             # DOM CSS değişken senkronizasyon motoru
│   │
│   ├── data/                           # İkincil / yedek JSON dosyası
│   │   └── cms-db.json
│   ├── lib/                            # İş mantığı, veri tabanı ve store katmanı
│   │   ├── auth-store.ts               # Yönetici oturum store'u
│   │   ├── cms-db.ts                   # Dosya okuma/yazma ve cache mekanizması
│   │   ├── cms-store.ts                # Zustand global CMS veri deposu (768 satır)
│   │   ├── default-data.ts             # Varsayılan başlangıç verisi (38 KB)
│   │   ├── supabase.ts                 # Supabase istemci bağlantısı
│   │   ├── turkeyDistricts.ts          # İl ve ilçe veritabanı
│   │   └── validations.ts              # Zod şema doğrulamaları
│   └── types/
│       └── index.ts                    # 487 satırlık kapsamlı TypeScript veri sözleşmesi
├── supabase-schema.sql                 # PostgreSQL / Supabase şema oluşturma scripti
├── package.json                        # Bağımlılıklar ve scriptler
├── tsconfig.json                       # TypeScript yapılandırması
└── next.config.ts                      # Next.js yapılandırması
```

---

## 2. Temel Modül Sorumlulukları

| Katman / Modül | Dosya Konumu | Sorumluluk |
| :--- | :--- | :--- |
| **Data Contract** | `src/types/index.ts` | Tüm model tipleri (`SiteSettings`, `PosProduct`, `ServiceItem` vb.) |
| **Storage & I/O** | `src/lib/cms-db.ts` | Dosya I/O, singleton memory cache, veri güvenliği |
| **REST Handler** | `src/app/api/cms/[entity]/route.ts` | Çoklu entity GET/POST/PUT/DELETE handler'ı |
| **Global Client Store** | `src/lib/cms-store.ts` | API çağrıları, local state, optimistic updates |
| **Theme Hydration** | `src/components/CMSHydrator.tsx` | Renk paletleri, boşluk yoğunluğu ve CSS değişkenlerinin DOM'a enjeksiyonu |
| **Dynamic Page Registry**| `src/app/page.tsx` | Admin panelindeki sıralama ve aktiflik durumuna göre dinamik modül render'ı |
| **Admin Navigation** | `src/app/admin/layout.tsx` | Gruplanmış akordeon menü, oturum denetimi ve sayaç rozetleri |
