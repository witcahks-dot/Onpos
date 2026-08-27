# PAYPOS / ONPOS2 — Ortak Veri Sözleşmesi (DATA_CONTRACT.md) (Aşama 2)

Bu doküman, tek veritabanı ve tek admin paneli üzerinden hem mevcut temayı (`theme-existing`) hem de yeni fintek temasını (`theme-fintech`) besleyecek **Ortak Veri Sözleşmesi (Unified Data Contract)** tanımlarını içerir.

---

## 1. Temel Veri Sözleşmesi İlkeleri

1. **Tek Doğruluk Kaynağı (Single Source of Truth):**
   Her iki tema da aynı veritabanı koleksiyonlarından ve DTO modellerinden beslenir. Tema başına ayrı tablo (`products_fintech` vb.) açılmaz.
2. **Geriye Dönük Tam Uyumluluk (Zero-Breaking Guarantee):**
   Mevcut temanın (`theme-existing`) tükettiği hiçbir alan adı silinmez veya tipi değiştirilmez. Farklı isimlendirmeler (`isActive` vs `active`, `item_order` vs `order`) DTO normalizer katmanında çift yönlü adapte edilir.
3. **Tip Güvenliği:**
   Tüm veri yapıları `src/types/index.ts` ve runtime Zod şemaları ile tam tip güvencesi altındadır.
4. **Sunum İzolasyonu:**
   Veritabanı ve API iş verisini taşır; görsel stil ve tema sunumu tema bileşenleri tarafından yönetilir.

---

## 2. Entity Bazlı Detaylı Veri Sözleşmesi Matrisi

### 1. Site Ayarları & Marka Kimliği (`SiteSettings`)

| Entity | DB Alanı | API Alanı | Admin Form Alanı | Existing Theme Kullanımı | Fintech Theme Kullanımı | Normalizer / Adapter İhtiyacı | Eksik Alan | Karar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `SiteSettings` | `site_name` | `siteName` | `siteName` | Header & SEO başlığı | Header & Fintek SEO başlığı | `snake_case <-> camelCase` | Yok | Ortak DTO'dan okunur. |
| `SiteSettings` | `tagline` | `tagline` | `tagline` | Hero & Meta açıklama | Fintek Hero alt başlık | Yok | Yok | Standart string. |
| `SiteSettings` | `logo_url` | `logoUrl` | `logoUrl` | Header & Footer logosu | Fintek Header & Footer logosu | Boş/kırık URL için fallback | Yok | Görsel hatasında metin/kalkan logo fallback. |
| `SiteSettings` | `favicon_url` | `faviconUrl` | `faviconUrl` | Tarayıcı sekme ikonu | Tarayıcı sekme ikonu | Yok | Yok | Standart icon URL. |
| `SiteSettings` | `primary_color` | `primaryColor` | `primaryColor` | CSS `--primary-color` | Fintek Mavi/Neon vurgu rengi | Hex to RGB dönüşümü (`CMSHydrator`) | Yok | CSS değişkenine enjekte edilir. |
| `SiteSettings` | `accent_color` | `accentColor` | `accentColor` | CSS `--accent-color` | Fintek Lacivert/Koyu vurgu | Hex to RGB dönüşümü | Yok | CSS değişkenine enjekte edilir. |
| `SiteSettings` | `phone` / `phone_formatted` | `phone` / `phoneFormatted` | `phoneFormatted` | Topbar, Footer, İletişim | Fintek Topbar, İletişim ve Tel CTA | `tel:` linki için `\D` temizleme | Yok | Hem görünür hem aranabilir format sunulur. |
| `SiteSettings` | `email` | `email` | `email` | Footer & İletişim | Fintek Footer & İletişim | Yok | Yok | Standart e-posta formatı. |
| `SiteSettings` | `address` | `address` | `address` | Footer & İletişim | Fintek İletişim Kartı | Yok | Yok | Standart adres metni. |
| `SiteSettings` | `working_hours` | `workingHours` | `workingHours` | Topbar & Footer | Fintek Destek Kartı | Yok | Yok | Standart çalışma saatleri. |
| `SiteSettings` | `social_links` | `socialLinks` | `socialLinks.*` | Footer sosyal ikonlar | Fintek Footer sosyal linkler | Obje normalizasyonu | Yok | `{ whatsapp, telegram, instagram, linkedin, youtube }`. |
| `SiteSettings` | `currency` | `currency` | Sabit `₺` | Fiyat rozetleri | Fintek bakiye ve fiyat etiketleri | Varsayılan `₺` ataması | Yok | Ortak DTO'da dinamik hale getirilecek. |
| `SiteSettings` | `language` | `language` | Sabit `TR` | HTML `lang="tr"` | HTML `lang="tr"` | Varsayılan `TR` | Yok | Standart dil kodu. |
| `SiteSettings` | `active_theme` | `activeTheme` | `activeTheme` | Dark/Light modu | Dark/Light modu | `light \| dark` | Yok | Kök class kontrolü. |
| `SiteSettings` | `theme_id` *(Yeni)* | `themeId` *(Yeni)* | `themeId` (Radyo/Seçim) | `'theme-existing'` seçiliyse | `'theme-fintech'` seçiliyse | Varsayılan: `'theme-existing'` | **Eklenecek** | **Admin'den tema seçimi yapılacak; tek ayarla iki tema yönetilecek.** |
| `SiteSettings` | `quick_contact_*` | `quickContact*` | `quickContact*` | Yüzen butonlar | Fintek yüzen butonlar | Boolean/String normalizer | Yok | Sol/sağ konumlu yüzen butonlar. |

---

### 2. Navigasyon & Header/Footer Menüsü (`MenuItem`, `MegaMenuConfig`, `HeaderConfig`, `FooterConfig`)

| Entity | DB Alanı | API Alanı | Admin Form Alanı | Existing Theme Kullanımı | Fintech Theme Kullanımı | Normalizer / Adapter İhtiyacı | Eksik Alan | Karar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `MenuItem` | `id` | `id` | `id` | React key | React key | ID oluşturucu | Yok | Standart UUID/String. |
| `MenuItem` | `label` | `label` | `label` | Menü metni | Fintek Menü metni | Yok | Yok | Standart string. |
| `MenuItem` | `href` | `href` | `href` | Sayfa linki | Fintek sayfa linki | Relative/External link ayrımı | Yok | Next.js Link formatı. |
| `MenuItem` | `item_order` | `order` | Sıralama alanı | Menü sıralaması | Fintek menü sıralaması | `item_order <-> order` mapping | Yok | DTO katmanında `order: item.order ?? item.item_order`. |
| `MenuItem` | `is_visible` | `isVisible` | Toggle Switch | Görünür menü filtreleme | Fintek görünür menü | `is_visible <-> isVisible` mapping | Yok | `isVisible: item.isVisible ?? item.is_visible ?? true`. |
| `MenuItem` | `badge`, `badgeColor` | `badge`, `badgeColor` | `badge`, `badgeColor` | Menü rozeti ("Yeni", "GİB") | Fintek menü rozeti | Yok | Yok | Opsiyonel rozet. |
| `MenuItem` | `isMegaMenu` | `isMegaMenu` | Checkbox | Dropdown MegaMenu | Fintek MegaMenu / Dropdown | Boolean | Yok | Hover durumunda POS kataloğu açar. |
| `MegaMenuConfig` | JSONB / Object | `megaMenuConfig` | `/admin/header-footer` | Ürün spotlight kartı | Fintek ürün spotlight kartı | Obje normalizasyonu | Yok | POS cihazı vitrini ve alt bilgi. |
| `HeaderConfig` | JSONB / Object | `headerConfig` | `/admin/header-footer` | Topbar & Arama & CTA | Fintek Header & CTA ("Get Started") | Obje normalizasyonu | Yok | Header görünüm ayarları. |
| `FooterConfig` | JSONB / Object | `footerConfig` | `/admin/header-footer` | 4 Sütunlu Kurumsal Footer | 3 Sütunlu Fintek Footer ("Resources, Company, Get in touch") | Sütun bağlantıları normalizer | Yok | Admin'den girilen sütun linkleri Fintek footer'a eşlenir. |

---

### 3. Hero Slider & Fintek Vitrin Modülü (`HeroSlide`, `TrustStat`, `CorporateIntroConfig`)

| Entity | DB Alanı | API Alanı | Admin Form Alanı | Existing Theme Kullanımı | Fintech Theme Kullanımı | Normalizer / Adapter İhtiyacı | Eksik Alan | Karar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `HeroSlide` | `id` | `id` | `id` | Slayt key | Slayt key | Yok | Yok | Standart ID. |
| `HeroSlide` | `title` | `title` | `title` | 3D Slider başlığı | Fintek Hero ana başlığı | Yok | Yok | Slogan ve ana manşet. |
| `HeroSlide` | `subtitle`, `badge` | `subtitle`, `badge` | `subtitle`, `badge` | Slider rozet & alt metin | Fintek rozet & metrik etiketleri | Yok | Yok | Örn: "12+ Years Experience". |
| `HeroSlide` | `description` | `description` | `description` | Cihaz açıklama paragrafı | Fintek Hero açıklama metni | Yok | Yok | Standart metin. |
| `HeroSlide` | `pos_name` | `posName` | `posName` | 3D Slider model adı | Fintek öne çıkan cihaz adı | `pos_name <-> posName` | Yok | Model adı. |
| `HeroSlide` | `image_url` | `imageUrl` | `imageUrl` | 3D Spatial Cihaz görseli | Fintek Hero POS & Danışman görseli | Boş URL fallback'i | Yok | Standart görsel URL. |
| `HeroSlide` | `primary_cta_*` | `primaryCta*` | `primaryCta*` | "Hemen Teklif Al" | "Get Started" / "Teklif Al" | Yok | Yok | Birincil CTA buton metin/link. |
| `HeroSlide` | `secondary_cta_*` | `secondaryCta*` | `secondaryCta*` | "İncele" | "See Details" / "İncele" | Yok | Yok | İkincil CTA buton metin/link. |
| `HeroSlide` | `slide_order` | `order` | Sıralama | Slayt sırası | İlk aktif slayt verisi | `slide_order <-> order` | Yok | Sıralama alanı. |
| `HeroSlide` | `is_active` | `isActive` | Toggle | Aktif slayt filtreleme | Aktif slayt filtreleme | `is_active <-> isActive` | Yok | Boolean durum. |
| `TrustStat` | JSONB / Table | `trustStats[]` | `/admin/stats` | Güven istatistik bandı | Fintek 50K/70,000+ metrik kartları | Dizi normalizasyonu | Yok | `{ number, label, desc }`. |
| `CloudPanelConfig` | JSONB / Object | `cloudPanel` | `/admin/cloud-panel` | Teknoloji dashboard'u | Fintek $50.8K / ₺15,560 bakiye & grafik kartları | DTO normalizasyonu | Yok | Cihaz adedi, uptime, işlem hızı ve gelir metrikleri. |

---

### 4. POS Cihazı Ürün Kataloğu (`PosProduct`)

| Entity | DB Alanı | API Alanı | Admin Form Alanı | Existing Theme Kullanımı | Fintech Theme Kullanımı | Normalizer / Adapter İhtiyacı | Eksik Alan | Karar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `PosProduct` | `id` | `id` | `id` | Ürün kimliği | Ürün kimliği | Yok | Yok | Standart ID. |
| `PosProduct` | `slug` | `slug` | `slug` | `/pos-cihazlari/[slug]` | `/pos-cihazlari/[slug]` | Slugify normalizer | Yok | URL benzersiz slug'ı. |
| `PosProduct` | `name` | `name` | `name` | Ürün adı | Fintek ürün adı & kart başlığı | Yok | Yok | Örn: "Hugin Tiger T300 4G". |
| `PosProduct` | `category` | `category` | Dropdown | Filtre kategorisi | Fintek kategori filtresi | Enum/String | Yok | 'Android POS', 'Mobil POS', 'Masaüstü POS', 'Yazarkasa POS'. |
| `PosProduct` | `short_desc` | `shortDesc` | `shortDesc` | Liste özet metni | Fintek kart açıklama metni | `short_desc <-> shortDesc` | Yok | Standart metin. |
| `PosProduct` | `full_desc` | `fullDesc` | `fullDesc` | Detay sayfası metni | Fintek detay sayfası metni | `full_desc <-> fullDesc` | Yok | Zengin ürün açıklaması. |
| `PosProduct` | `price`, `old_price`| `price`, `oldPrice` | Sayısal giriş | Fiyat kutusu | Fintek fiyat & taksit bilgisi | Para birimi formatlayıcı | Yok | Sayısal değer (TL). |
| `PosProduct` | `is_discounted` | `isDiscounted` | Checkbox | İndirim etiketi kontrolü | Fintek indirim rozeti | Boolean | Yok | İndirim durumu. |
| `PosProduct` | `discount_label` | `discountLabel` | Metin | "%15 İndirim" rozeti | Fintek kampanya rozeti | `discount_label <-> discountLabel` | Yok | Kampanya metni. |
| `PosProduct` | `sku`, `brand` | `sku`, `brand` | Metin | SKU & Marka bilgisi | Fintek donanım künyesi | Yok | Yok | Marka (PAYPOS, Hugin vb.). |
| `PosProduct` | `in_stock` | `inStock` | Checkbox | "Stokta Var" rozeti | Fintek stok durumu | `in_stock <-> inStock` | Yok | Stok kontrolü. |
| `PosProduct` | `specs` | `specs` | Spesifikasyon Formu | Teknik özellikler tablosu | Fintek donanım kartı özellikleri | JSONB normalizasyonu | Yok | `{ display, os, connectivity, nfc, printer, battery, weight, security }`. |
| `PosProduct` | `features` | `features` | Madde Girişi | Tik işaretli özellik listesi | Fintek özellik maddeleri | `string[]` normalizer | Yok | Öne çıkan 4-6 madde. |
| `PosProduct` | `images` | `images` | Çoklu URL | Ürün galerisi | Fintek ürün görselleri | Boş dizi kontrolü & fallback | Yok | En az 1 görsel garanti edilir. |
| `PosProduct` | `pdf_spec_url` | `pdfSpecUrl` | URL | PDF Şartname indirme | Fintek doküman indirme | `pdf_spec_url <-> pdfSpecUrl` | Yok | Opsiyonel PDF linki. |
| `PosProduct` | `is_featured` | `isFeatured` | Checkbox | Ana sayfa öne çıkanlar | Fintek ana sayfa donanım vitrini | `is_featured <-> isFeatured` | Yok | Ana sayfa vitrin filtresi. |
| `PosProduct` | `product_order` | `order` | Sayı | Katalog sıralaması | Fintek katalog sıralaması | `product_order <-> order` | Yok | Sayısal sıra. |

---

### 5. Hizmetler & Sektörel Çözümler (`ServiceItem`, `SolutionItem`)

| Entity | DB Alanı | API Alanı | Admin Form Alanı | Existing Theme Kullanımı | Fintech Theme Kullanımı | Normalizer / Adapter İhtiyacı | Eksik Alan | Karar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `ServiceItem` | `id`, `slug`, `name` | `id`, `slug`, `name` | İsim, Slug | Hizmet başlığı & URL | Fintek hizmet kartı & URL | Standart | Yok | `/hizmetler/[slug]`. |
| `ServiceItem` | `category`, `icon_name` | `category`, `iconName` | Kategori, İkon | Kategori & Lucide İkon | Fintek İkon Rozeti | Dinamik ikon resolver | Yok | Shield, Headset, Zap vb. |
| `ServiceItem` | `short_desc`, `full_desc`| `shortDesc`, `fullDesc` | Özet & Detay | Hizmet anlatımı | Fintek servis açıklaması | `*_desc <-> *Desc` | Yok | Metin alanları. |
| `ServiceItem` | `features`, `benefits` | `features`, `benefits` | Madde girişleri | Özellikler & Avantajlar | Fintek "Frictionless Payments" maddeleri | `string[]` dizi normalizer | Yok | Madde listesi. |
| `ServiceItem` | `images` | `images` | Görsel URL | Hizmet kapak görseli | Fintek servis illüstrasyonu | Dizi kontrolü | Yok | Kapak görseli. |
| `SolutionItem` | `id`, `slug`, `title` | `id`, `slug`, `title` | Başlık, Slug | Çözüm başlığı & URL | Fintek sektörel çözüm kartı | Standart | Yok | `/cozumler/[slug]`. |
| `SolutionItem` | `category`, `target_audience` | `category`, `targetAudience` | Kategori, Hedef Kitle | Perakende, Restoran vb. | Fintek sektör hedefi | `target_audience <-> targetAudience` | Yok | Sektör segmentasyonu. |
| `SolutionItem` | `short_desc`, `full_desc` | `shortDesc`, `fullDesc` | Özet & Detay | Çözüm detayları | Fintek ödeme akışı detayı | Standart | Yok | Çözüm metni. |
| `SolutionItem` | `features`, `image` | `features`, `image` | Maddeler, Görsel | Çözüm görseli & maddeler | Fintek çözüm görseli & maddeler | Standart | Yok | Entegrasyon özellikleri. |

---

### 6. Projeler, Referanslar & Müşteri Görüşleri (`ProjectItem`, `ReferenceItem`, `TestimonialItem`)

| Entity | DB Alanı | API Alanı | Admin Form Alanı | Existing Theme Kullanımı | Fintech Theme Kullanımı | Normalizer / Adapter İhtiyacı | Eksik Alan | Karar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `ProjectItem` | `id`, `slug`, `title` | `id`, `slug`, `title` | Başlık, Slug | Proje başlığı & detay URL | Fintek başarı hikayesi & URL | Standart | Yok | `/projeler/[slug]`. |
| `ProjectItem` | `client`, `location`, `status` | `client`, `location`, `status` | Müşteri, Konum, Durum | Proje künyesi | Fintek kurumsal vaka bilgisi | Status enum | Yok | 'Tamamlandı' \| 'Devam Ediyor'. |
| `ProjectItem` | `cover_image`, `gallery` | `coverImage`, `gallery` | Görseller | Proje galerisi | Fintek vaka görselleri | Dizi fallback'i | Yok | Proje fotoğrafları. |
| `ReferenceItem`| `name`, `logo`, `category` | `name`, `logo`, `category` | İsim, Logo, Kategori | Logo Wall & Müşteri listesi | Fintek "Trusted By Over 100+ Startups" Logo Barı | SVG/PNG Logo normalizer | Yok | Oracle, Samsung vb. logolar. |
| `ReferenceItem`| `city`, `district` | `city`, `district` | İl & İlçe Seçimi | Türkiye Haritası (`TurkeyMap.tsx`) | Fintek müşteri haritası / filtre | İlçe normalizasyonu | Yok | 81 il referans dağılımı. |
| `TestimonialItem`| `author_name`, `comment` | `authorName`, `comment` | İsim, Yorum | Müşteri yorum slider'ı | Fintek referans & alıntı kartı | Standart | Yok | Müşteri görüşü. |
| `TestimonialItem`| `rating`, `is_approved` | `rating`, `isApproved` | Yıldız (1-5), Onay | Onaylı yorum filtreleme | Onaylı yorum filtreleme | `is_approved <-> isApproved` | Yok | Yıldız puanı ve onay durumu. |

---

### 7. Kurumsal Sayfalar, S.S.S, Blog & Galeri (`CustomPage`, `AboutPageData`, `FaqItem`, `BlogPost`, `GalleryItem`)

| Entity | DB Alanı | API Alanı | Admin Form Alanı | Existing Theme Kullanımı | Fintech Theme Kullanımı | Normalizer / Adapter İhtiyacı | Eksik Alan | Karar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CustomPage` | `id`, `slug`, `title` | `id`, `slug`, `title` | Başlık, Slug | `/sayfa/[slug]` & `/kurumsal/[slug]` | Fintek Dinamik Sayfa | Slug normalizer | Yok | Kurumsal ve yasal sayfalar. |
| `CustomPage` | `summary`, `cover_image` | `summary`, `coverImage` | Özet, Kapak URL | Sayfa başlık alanı | Fintek sayfa hero alanı | `cover_image <-> coverImage` | Yok | Sayfa özeti. |
| `CustomPage` | `blocks` | `blocks` | Blok Editörü | Dinamik bloklar (metin, callout, CTA) | Fintek zengin içerik blokları | JSONB blok dizisi | Yok | `{ type, title, content, items, ctaText }`. |
| `AboutPageData`| JSONB / Object | `aboutPage` | `/admin/about` | Vizyon, Misyon, Değerler, Sertifikalar | Fintek Şirket Profili & Güvenlik Kartları | Obje normalizasyonu | Yok | Hakkımızda veri sözleşmesi. |
| `FaqItem` | `question`, `answer` | `question`, `answer` | Soru, Cevap | SSS Akordeon listesi | Referans görseldeki 2 sütunlu Fintek SSS Akordeonu | HTML/Text normalizer | Yok | Sıkça sorulan sorular. |
| `FaqItem` | `category`, `faq_order` | `category`, `order` | Kategori, Sıra | Kategori filtreleri (POS, Ödeme vb.) | Fintek SSS kategorileri | `faq_order <-> order` | Yok | Sıralama ve filtreleme. |
| `BlogPost` | `id`, `slug`, `title` | `id`, `slug`, `title` | Başlık, Slug | `/blog` & `/blog/[slug]` | Fintek Haber & Mevzuat Bülteni | Standart | Yok | Haber yazıları. |
| `BlogPost` | `excerpt`, `content` | `excerpt`, `content` | Özet, İçerik | Blog detay metni | Fintek makale düzeni | Markdown/HTML | Yok | Blog içeriği. |
| `BlogPost` | `author`, `cover_image` | `author`, `coverImage` | Yazar, Kapak URL | Yazar kartı & görsel | Fintek yazar profili & görsel | `cover_image <-> coverImage` | Yok | Yazar ve kapak. |
| `GalleryItem` | `title`, `type`, `url` | `title`, `type`, `url` | Başlık, Tür, URL | `/galeri` Lightbox | Fintek Medya Galerisi | `photo \| video` | Yok | Fotoğraf ve video albümleri. |

---

### 8. Teklif Talepleri & Bülten Aboneleri (`QuoteSubmission`, `SubscriberItem`)

| Entity | DB Alanı | API Alanı | Admin Form Alanı | Existing Theme Kullanımı | Fintech Theme Kullanımı | Normalizer / Adapter İhtiyacı | Eksik Alan | Karar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `QuoteSubmission` | `full_name`, `email`, `phone` | `fullName`, `email`, `phone` | Ad Soyad, E-posta, Tel | Teklif Modalı & Formu | Fintek Teklif & Başvuru Formu | Zod `quoteSubmissionSchema` | Yok | Ziyaretçi iletişim verisi. |
| `QuoteSubmission` | `company`, `city`, `message` | `company`, `city`, `message` | Firma, İl, Mesaj | Teklif talep detayları | Fintek başvuru detayları | Standart | Yok | İşletme bilgisi. |
| `QuoteSubmission` | `selected_product`/`service` | `selectedProduct`/`Service` | Ürün/Hizmet Seçimi | Seçili POS veya Hizmet | Fintek seçili finansman/cihaz paketi | Opsiyonel string | Yok | İlgilenilen ürün. |
| `QuoteSubmission` | `status`, `created_at` | `status`, `createdAt` | `/admin/submissions` | 'Yeni' \| 'İnceleniyor' \| 'Tamamlandı' | 'Yeni' \| 'İnceleniyor' \| 'Tamamlandı' | Tarih formatlayıcı | Yok | Admin durum takibi. |
| `SubscriberItem` | `email`, `created_at` | `email`, `createdAt` | `/admin/subscribers` | Footer Bülten Kutusu | Fintek "Subscribe to get updated" Kutusu | Zod `newsletterSchema` | Yok | E-posta bülten kaydı. |

---

### 9. Ekip, Bayiler, E-Katalog & Banka Hesapları (`TeamMember`, `DealerBranch`, `ECatalog`, `BankAccount`)

| Entity | DB Alanı | API Alanı | Admin Form Alanı | Existing Theme Kullanımı | Fintech Theme Kullanımı | Normalizer / Adapter İhtiyacı | Eksik Alan | Karar |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TeamMember` | `name`, `title`, `photo` | `name`, `title`, `photo` | İsim, Unvan, Fotoğraf | Yönetim & Ekip listesi | Fintek Liderlik & Mühendislik Ekibi | Avatar fallback'i | Yok | `/kurumsal/ekibimiz`. |
| `DealerBranch` | `title`, `city`, `address` | `title`, `city`, `address` | Bayi Adı, Şehir, Adres | Bayi & Şube listesi | Fintek Servis Noktaları Haritası | Standart | Yok | `/kurumsal/bayiler`. |
| `ECatalog` | `title`, `pdf_url`, `file_size`| `title`, `pdfUrl`, `fileSize` | Başlık, PDF URL, Boyut | E-Katalog İndirme Merkezi | Fintek Dijital Doküman Merkezi | `pdf_url <-> pdfUrl` | Yok | `/kurumsal/e-katalog`. |
| `BankAccount` | `bank_name`, `iban`, `logo` | `bankName`, `iban`, `logo` | Banka, IBAN, Logo | IBAN Kopyalama Kartları | Fintek FAST/EFT Banka Hesapları | IBAN formatlayıcı | Yok | `/kurumsal/banka-hesaplari`. |

---

## 3. Standardizasyon ve Geriye Uyumluluk Kararları

1. **İsimlendirme Standardı:**
   - Veritabanı ve DTO düzeyinde `camelCase` standarttır (`isActive`, `order`, `shortDesc`, `imageUrl`).
   - Supabase SQL tablosundaki `snake_case` alanlar (`is_active`, `product_order`, `short_desc`, `image_url`) için iki yönlü normalizer fonksiyonları (`toDTO` ve `toEntity`) oluşturulacak, hiçbir mevcut consumer kırılmayacaktır.
2. **Tema Seçimi Kararı:**
   - `SiteSettings` nesnesine `themeId: 'theme-existing' | 'theme-fintech'` alanı eklenecektir.
   - Varsayılan değer `'theme-existing'` olarak atanacak; böylece mevcut canlı sitede hiçbir görsel/işlevsel kırılma yaşanmayacaktır.
3. **Dinamik Modül Sıralaması:**
   - Ana sayfa modül sıralaması (`homeSections`) her iki temada da admin'deki sıralama (`order`) ve aktiflik (`enabled`) değerine göre çalışacaktır.
