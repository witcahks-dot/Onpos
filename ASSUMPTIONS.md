# PAYPOS / ONPOS2 — Varsayımlar ve Karar Matrisi (Aşama 0 & 1)

Bu doküman, projede kesin kanıtı olmayan varsayımlardan kaçınmak ve mimari kararları netleştirmek amacıyla hazırlanmıştır.

---

## 1. Doğrulanan Kesin Gerçekler (Kanıtlı)

1. **Çift Tema Desteği:** 
   - Mevcut tema `theme-existing` adı altında korunacak.
   - Yeni tema `theme-fintech` olarak adlandırılacak ve referans görseldeki koyu/modern fintek estetiğini tüm sayfalara (Header, Hero, Ürünler, Hizmetler, Çözümler, SSS, İletişim, Footer vb.) uygulayacaktır.
2. **Tek Veritabanı ve Ortak Tablolar:**
   - Veritabanında `products_theme_fintech`, `services_theme_fintech` gibi ayrı tablolar oluşturulmayacaktır.
   - Tüm ürünler, hizmetler, çözümler, referanslar, menüler, hero slaytları her iki tema tarafından ortak veri modelinden tüketilecektir.
3. **Veri Depolama Mimarisi:**
   - Sistem birincil olarak `data/cms-db.json` dosyasını kullanmakta, opsiyonel olarak Supabase ile senkronize olmaktadır.
4. **Kod Değişikliği Yasağı:**
   - Aşama 0 ve Aşama 1 boyunca hiçbir kaynak kod ve veritabanı kaydı değiştirilmemiştir.

---

## 2. Mimari Kararlar ve Sorular

### A. Aktif Tema Ayarının Yeri
- **Mevcut Durum:** `SiteSettings` içinde `activeTheme: 'light' | 'dark'` mevcuttur ve `globals.css` üzerinde dark class'ı eklemektedir.
- **Önerilen Karar:** `SiteSettings` modeline `themeId: 'theme-existing' | 'theme-fintech'` alanı eklenecek, geriye uyumluluk için varsayılan değer `'theme-existing'` olacaktır. `activeTheme` ('light' | 'dark') alanı alt renk modu olarak korunacaktır.

### B. Referans Tema Görselindeki Fintek Modülleri
- Referans görselde yer alan bileşenler:
  1. **Fintech Hero:** Metrik etiketleri ("Take Control of Your Financial Future", "12+ Years", "Finance Rate 78%"), CTA butonları, fintek danışman görseli ve etkileşimli kartlar.
  2. **Trust Logos:** Segment, Samsung, Monday.com, Oracle vb. (Admin `references` tablosundan beslenir).
  3. **Feature / Value Proposition:** "Turn Clicks Into Conversions With Seamless Checkout", bakiye ve kategori kartları (Admin `solutions` ve `products` verilerinden beslenir).
  4. **Metrik & Hacim:** 50K Contributions, 70,000+ Clients (Admin `trustStats` ve `cloudPanel` verilerinden beslenir).
  5. **Frictionless Payments:** POS & Mobil uygulama tanıtımı (Admin `products` ve `services` verilerinden beslenir).
  6. **Modern FAQ Accordion:** İki sütunlu veya temiz akordeon yapısı (Admin `faqs` tablosundan beslenir).
  7. **Subscribe & Growth CTA:** Bülten kutusu ve teklif CTA'sı (Admin `settings` ve `footerConfig` verilerinden beslenir).
  8. **Fintech Footer:** 3 sütunlu modern fintek footer'ı (Admin `footerConfig` ve `menu` verilerinden beslenir).

---

## 3. Sıfır Varsayım Politikası Kapsamında Kullanıcı Onayına Sunulan Maddeler

1. **Aşama 0 ve 1 Tamamlanma Onayı:** Raporlar incelendikten sonra Aşama 2 (Veri Sözleşmesi) ve Aşama 3 (Migration Planı) adımlarına geçiş onayı beklenmektedir.
2. **Tema Seçimi Konumu:** Admin panelinde "Genel Ayarlar" (`/admin/settings`) ekranına "Aktif Site Teması: [Mevcut Tema (PAYPOS Standart) | Fintech Teması (Modern Fintek)]" seçim arayüzü eklenecektir.
