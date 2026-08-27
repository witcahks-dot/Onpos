# ONPOS2 / PAYPOS — QA & Regresyon Test Kontrol Listesi

## 1. Test Kapsamı ve Genel Bilgiler
- **Test Edilen Sistem:** Çoklu Tema Motoru (`theme-existing` & `theme-fintech`)
- **Tarih:** 2026-08-27
- **Admin / CMS Entegrasyonu:** Tek veritabanı (`data/cms-db.json`), tek Zustand store (`useCMSStore`), tek API (`/api/cms/[entity]`).
- **Hedef URL'ler:** Tüm 51 public ve admin rotası.

---

## 2. Tema Geçiş ve Çekirdek Motor Doğrulaması

| Madde | Test Senaryosu | Beklenen Sonuç | Durum |
|---|---|---|---|
| **TM-01** | Admin Ayarlar'dan `theme-fintech` seçilip kaydedilmesi | `settings.themeId` `'theme-fintech'` olur, `<html>` etiketi `data-theme="theme-fintech"` alır, tüm public rotalar Fintech temasını render eder. | PASSED (Doğrulandı) |
| **TM-02** | Admin Ayarlar'dan `theme-existing` seçilip kaydedilmesi | `settings.themeId` `'theme-existing'` olur, `<html>` etiketi `data-theme="theme-existing"` alır, orijinal PAYPOS mavi-beyaz teması %100 birebir render edilir. | PASSED (Doğrulandı) |
| **TM-03** | Canlı Tema Değişiminde Sayfa Yenileme / Reaktivite | Zustand store reaktivitesi sayesinde anında tüm rotalarda temanın değişmesi, veri kaybı yaşanmaması. | PASSED (Doğrulandı) |
| **TM-04** | Tek Veritabanı ve Veri Tutarlılığı | Her iki temanın da aynı ürün, hizmet, referans ve blog listesini ortak normalize edilmiş tiplerle okuması. | PASSED (Doğrulandı) |

---

## 3. Rota Bazlı Görünüm ve Dispatcher Testleri

| Rota | Açıklama | Existing Görünüm | Fintech Görünüm | Durum |
|---|---|---|---|---|
| `/` | Ana Sayfa | `ExistingHomePage` | `FintechHomePage` (Hero, Sparkline, Metrics, Conversion, POS, SSS, Newsletter) | PASSED |
| `/pos-cihazlari` | POS Kataloğu | `ExistingPosCatalogPage` | `FintechPosCatalogPage` (Grid, Filtre, Modal) | PASSED |
| `/pos-cihazlari/[slug]` | POS Detayı | `ExistingPosDetailPage` | `FintechPosDetailPage` (3D Mockup, Özellikler, Teklif Al) | PASSED |
| `/hizmetler` | Hizmetler | `ExistingServicesPage` | `FintechServicesPage` | PASSED |
| `/hizmetler/[slug]` | Hizmet Detayı | `ExistingServiceDetailPage` | `FintechServiceDetailPage` | PASSED |
| `/cozumler` | Sektörel Çözümler | `ExistingSolutionsPage` | `FintechSolutionsPage` | PASSED |
| `/cozumler/[slug]` | Çözüm Detayı | `ExistingSolutionDetailPage` | `FintechSolutionDetailPage` | PASSED |
| `/projeler` | Projeler | `ExistingProjectsPage` | `FintechProjectsPage` | PASSED |
| `/projeler/[slug]` | Proje Detayı | `ExistingProjectDetailPage` | `FintechProjectDetailPage` | PASSED |
| `/blog` | Blog & Haberler | `ExistingBlogPage` | `FintechBlogPage` | PASSED |
| `/blog/[slug]` | Blog Detayı | `ExistingBlogDetailPage` | `FintechBlogDetailPage` | PASSED |
| `/sss` | S.S.S | `ExistingFaqPage` | `FintechFaqPage` | PASSED |
| `/iletisim` | İletişim | `ExistingContactPage` | `FintechContactPage` | PASSED |
| `/galeri` | Medya Galerisi | `ExistingGalleryPage` | `FintechGalleryPage` | PASSED |
| `/kurumsal/referanslar` | Referanslar | `ExistingReferencesPage` (İnteraktif TR Haritası) | `FintechReferencesPage` (İnteraktif TR Haritası + Fintech Shell) | PASSED |
| `/kurumsal/hakkimizda` | Hakkımızda | `ExistingAboutPage` | `FintechAboutPage` | PASSED |
| `/kurumsal/[slug]` & `/sayfa/[slug]` | Özel Sayfalar | `ExistingCustomPage` | `FintechCustomPage` | PASSED |

---

## 4. Admin Paneli & Form Fonksiyonları

| Alan | Kontrol Noktası | Sonuç | Durum |
|---|---|---|---|
| **Admin Settings** | Aktif Canlı Tema Seçici (0. Bölüm) | 2 tema için görsel kartlar, anında seçim ve kaydetme | PASSED |
| **Admin Settings** | Logo ve Favicon Özelleştirme | Değiştirilen logo her iki temada da anında uygulanır | PASSED |
| **Admin Settings** | Yüzen WhatsApp & Telefon Butonları | Konum ve görünürlük ayarları her iki temada sorunsuz çalışır | PASSED |
| **Teklif & Formlar** | Teklif Al Modalı ve İletişim Formları | Gönderilen formlar `submissions` tablosuna başarıyla yazılır | PASSED |
| **Bülten Aboneliği** | Fintech Newsletter & Footer Formu | E-postalar `subscribers` tablosuna eklenir | PASSED |

---

## 5. Build, Tip Güvenliği ve Performans

- **TypeScript Type Check:** `npx tsc --noEmit` -> **0 HATA (Exit code 0)**
- **Next.js Production Build:** `npm run build` -> **51/51 Rota Başarıyla Derlendi (Exit code 0)**
- **Turbopack & Statik Optimizasyon:** Tüm statik sayfalar prerender edildi, dinamik rotalar ISR/SSR hazır.
