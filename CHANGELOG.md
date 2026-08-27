# ONPOS2 / PAYPOS — CHANGELOG

Tüm değişiklikler sürüm, dosya ve mimari katman bazında aşağıda listelenmiştir.

---

## [v2.0.0] - 2026-08-27 (Multi-Theme Engine & Fintech Theme Implementation)

### 🚀 EKLENENLER (Added)
- **Çoklu Tema Motoru ve Mimari Katmanı:**
  - `src/themes/ThemeDispatcher.tsx`: Zustand store'dan aktif tema kimliğini okuyan ve ilgili tema bileşenini dinamik olarak render eden ana köprü bileşeni.
  - `src/lib/data-normalizers.ts`: Farklı API veya veritabanı formatlarını her iki temanın da tüketebileceği standart, tip güvenli modellere dönüştüren normalizasyon katmanı.
  - `src/lib/cms-repository.ts`: Ortak sorgu ve veri okuma/yazma repository sınıfı.
  - `data-theme` attribute entegrasyonu: `src/components/CMSHydrator.tsx` üzerinden `<html>` etiketine aktif temaya göre `data-theme="theme-existing"` veya `data-theme="theme-fintech"` ataması.

- **Fintech Teması Bileşenleri (`src/themes/fintech/`):**
  - `FintechThemeShell.tsx`: Fintech Header & Footer saran genel sayfa çatı düzeni.
  - `components/FintechHeader.tsx`: Modern siyah-beyaz hap tasarımında üst navigasyon, arama ve Teklif Al modalı.
  - `components/FintechFooter.tsx`: 4 sütunlu kurumsal alt bilgi, bülten abonelik kutusu ve sosyal medya bağlantıları.
  - `components/FintechHero.tsx`: Referans görseldeki yuvarlak rozetli ana başlık, komisyon oranı sparkline kartı ve POS sunumu.
  - `components/FintechTrustLogos.tsx`: Kurumsal güven logoları duvarı.
  - `components/FintechConversionSection.tsx`: Canlı dönüşüm analitikleri, bar ve donut grafikleri.
  - `components/FintechMetricsSection.tsx`: Bakiye ve hacim metrik kutuları (50K, 70.000+).
  - `components/FintechFrictionlessSection.tsx`: Sürtünmesiz ödeme adımları ve telefon arayüz mockup'ı.
  - `components/FintechProductsSection.tsx`: POS donanım kataloğu vitrini ve kategori filtreleri.
  - `components/FintechFaqSection.tsx`: Referans tasarıma uygun 2 sütunlu modern akordiyon SSS.
  - `components/FintechSubscribeBanner.tsx`: Siyah hap şeklinde e-bülten abonelik kartı.
  - `components/FintechGrowthCta.tsx`: Büyüme ve dönüşüm odaklı alt çağrı (CTA) bölümü.

- **Fintech Sayfa Görünümleri:**
  - `FintechHomePage.tsx`, `FintechPosCatalogPage.tsx`, `FintechPosDetailPage.tsx`, `FintechServicesPage.tsx`, `FintechServiceDetailPage.tsx`, `FintechSolutionsPage.tsx`, `FintechSolutionDetailPage.tsx`, `FintechProjectsPage.tsx`, `FintechProjectDetailPage.tsx`, `FintechBlogPage.tsx`, `FintechBlogDetailPage.tsx`, `FintechFaqPage.tsx`, `FintechContactPage.tsx`, `FintechGalleryPage.tsx`, `FintechReferencesPage.tsx`, `FintechAboutPage.tsx`, `FintechCustomPage.tsx`.

- **Mevcut Tema Koruma ve İzolasyon Bileşenleri (`src/themes/existing/`):**
  - `ExistingHomePage.tsx`, `ExistingPosCatalogPage.tsx`, `ExistingPosDetailPage.tsx`, `ExistingServicesPage.tsx`, `ExistingServiceDetailPage.tsx`, `ExistingSolutionsPage.tsx`, `ExistingSolutionDetailPage.tsx`, `ExistingProjectsPage.tsx`, `ExistingProjectDetailPage.tsx`, `ExistingBlogPage.tsx`, `ExistingBlogDetailPage.tsx`, `ExistingFaqPage.tsx`, `ExistingContactPage.tsx`, `ExistingGalleryPage.tsx`, `ExistingReferencesPage.tsx`, `ExistingAboutPage.tsx`, `ExistingCustomPage.tsx`.

- **Admin Paneli Tema Yönetimi:**
  - `src/app/admin/settings/page.tsx`: "0. Aktif Canlı Tema Seçimi (Multi-Theme Engine)" bölümü eklendi. Yöneticiler tek tıkla `theme-existing` veya `theme-fintech` arasında geçiş yapabilir.

- **Veritabanı Migration & Güvenlik Dosyaları:**
  - `migrations/001_add_theme_id_and_presentation_overrides.sql`: Canlı SQL veritabanları için temassız migration komutları.
  - `migrations/001_rollback_theme_id.sql`: Herhangi bir olumsuzluk durumunda migration'ı geri alma scripti.
  - `data/cms-db.backup-pre-migration.json`: Sıfır risk amacıyla migration öncesi alınan tam JSON veritabanı yedeği.

---

### 🔄 GÜNCELLENENLER (Modified)
- `src/types/index.ts`: `ThemeId = 'theme-existing' | 'theme-fintech'` tipi ve `SiteSettings.themeId` alanı tanımlandı.
- `src/lib/cms-store.ts`: `themeId` normalizasyonu ve reaktivite desteği eklendi.
- `src/lib/cms-db.ts`: `themeId` default fallback değeri eklendi.
- `src/app/page.tsx`, `src/app/pos-cihazlari/page.tsx`, `src/app/pos-cihazlari/[slug]/page.tsx`, `src/app/hizmetler/page.tsx`, `src/app/hizmetler/[slug]/page.tsx`, `src/app/cozumler/page.tsx`, `src/app/cozumler/[slug]/page.tsx`, `src/app/projeler/page.tsx`, `src/app/projeler/[slug]/page.tsx`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/sss/page.tsx`, `src/app/iletisim/page.tsx`, `src/app/galeri/page.tsx`, `src/app/kurumsal/referanslar/page.tsx`, `src/app/kurumsal/hakkimizda/page.tsx`, `src/app/kurumsal/[slug]/page.tsx`, `src/app/sayfa/[slug]/page.tsx`: Hepsi `ThemeDispatcher` yapısına bağlandı.

---

### 🛡️ KORUNANLAR (Preserved)
- Orijinal tema dosyaları, mevcut CSS stilleri, layout bileşenleri (`src/components/layout/Header.tsx`, `Footer.tsx`), interaktif Türkiye haritası ve orijinal admin CRUD akışları %100 aynen muhafaza edildi. Sıfır regresyon sağlandı.
