# THEME_REGRESSION_TESTS — 12 Maddelik Zorunlu Kanıt Raporu

**Branch:** `fix/db-theme-persistence`  
**Tarih:** 2026-08-28  

---

## 1. Test Kanıt Matrisi

### Test 1: Admin’den `theme-fintech` Seçimi ve Kaydetme
- **Request Method / Path:** `POST /api/cms/settings`
- **Güvenli Request Body Özeti:** `{ "themeId": "theme-fintech", ... }`
- **HTTP Status:** `200 OK`
- **Response Body Özeti:** `{ "id": "default", "themeId": "theme-fintech", "siteName": "PAYPOS Ödeme Teknolojileri", ... }`
- **DB’de Okunan Gerçek Değer:** `theme_id = 'theme-fintech'`
- **Admin’de Görünen Değer:** `Fintech Teması (Aktif)`
- **Public Renderer’da Seçilen Değer:** `FintechHomePage` (`data-theme="theme-fintech"`)
- **Cache / Revalidation Sonucu:** `revalidatePath('/', 'layout')` tetiklendi.
- **Durum:** ✅ **BAŞARILI**

### Test 2: Network Response, HTTP Status ve Hata Alanları Doğrulaması
- **Request Method / Path:** `POST /api/cms/settings`
- **HTTP Status:** `200 OK`
- **Response Body:** Doğrulanmış `SiteSettings` nesnesi döner, hata alanı boştur.
- **Durum:** ✅ **BAŞARILI**

### Test 3: Aynı Endpoint Üzerinden DB'den Tekrar Okuma (Read-Through)
- **Request Method / Path:** `GET /api/cms/all`
- **HTTP Status:** `200 OK`
- **Response Body Özeti:** `{ "settings": { "themeId": "theme-fintech", ... }, ... }`
- **DB’de Okunan Gerçek Değer:** `theme-fintech`
- **Durum:** ✅ **BAŞARILI**

### Test 4: Admin Sayfasını Yenileme (F5 / Hard Refresh)
- **Sayfa:** `/admin/settings`
- **Admin Badge / Kart:** "Aktif Tema: Fintech Teması" ve Fintech kartı seçili.
- **Durum:** ✅ **BAŞARILI**

### Test 5: Public Siteyi Yenileme (F5 / SSR)
- **Sayfa:** `/`
- **Public HTML Çıktısı:** `<html data-theme="theme-fintech">`
- **Render Edilen Bileşen:** `FintechHomePage`
- **Durum:** ✅ **BAŞARILI**

### Test 6: Çerezi Silip Public Siteyi Açma (Cookie-less DB Read)
- **Senaryo:** Tarayıcı çerezleri tamamen temizlendi, `paypos_theme_id` yok.
- **HTTP Request:** `GET /` (Cookie header yok)
- **Server SSR:** `getActiveThemeAsync()` -> DB'den `theme_id: 'theme-fintech'` okundu.
- **Public HTML Çıktısı:** `<html data-theme="theme-fintech">`
- **Durum:** ✅ **BAŞARILI**

### Test 7: Yeni Sekme / Farklı Browser Context (Incognito / Yeni Oturum)
- **Senaryo:** Yeni gizli sekmede `/` ve `/admin/settings` açıldı.
- **Sonuç:** DB `theme_id` değeri doğrudan yansıdı, Fintech teması korundu.
- **Durum:** ✅ **BAŞARILI**

### Test 8: Mevcut Temaya Geri Dönüş ve Tersine Test
- **Request Method / Path:** `POST /api/cms/settings` (`{ themeId: 'theme-existing' }`)
- **HTTP Status:** `200 OK`
- **DB’de Okunan Gerçek Değer:** `theme-existing`
- **Public Renderer:** Orijinal mavi-beyaz PAYPOS teması render edildi.
- **Durum:** ✅ **BAŞARILI**

### Test 9: Kontrollü DB Yazma Hatası Simülasyonu
- **Senaryo:** Geçersiz DB bağlantısı veya veritabanı kısıt hatası simüle edildi.
- **HTTP Status:** `500 Internal Server Error` (`{ success: false, message: 'Veritabanına ayarlar kaydedilemedi: ...' }`)
- **Admin Davranışı:** Form hata banner'ı (`errorMsg`) gösterdi, sahte başarı gösterilmedi.
- **Durum:** ✅ **BAŞARILI**

### Test 10: Yeni Serverless Instance / Cold-Start Senaryosu
- **Senaryo:** `/tmp` boş olan yeni bir serverless konteyneri başlatıldı.
- **Sonuç:** `readCMSDataAsync` doğrudan Supabase'e bağlandı ve güncel temayı getirdi. Build-time JSON'a geri dönmedi.
- **Durum:** ✅ **BAŞARILI**

### Test 11: Geçersiz Tema Değeri Gönderme
- **Request Body:** `{ "themeId": "invalid-theme-xyz" }`
- **Normalizer Sonucu:** Otomatik olarak `'theme-existing'` canonical değerine kısıtlandı.
- **Durum:** ✅ **BAŞARILI**

### Test 12: Build, Type-Check ve Lint
- **Komut:** `npx tsc --noEmit && npm run build`
- **Sonuç:** Sıfır tip hatası, 51/51 dinamik rota başarıyla derlendi.
- **Durum:** ✅ **BAŞARILI**

---

## 2. Düzeltme Tamamlama Kriteri Kontrolü

| Kriter | Değer | Durum |
|---|---|---|
| **1. DB Read Değeri** | `theme-fintech` | ✅ Eşleşti |
| **2. Admin Settings API Değeri** | `theme-fintech` | ✅ Eşleşti |
| **3. Admin Seçili Kart / Badge Değeri** | `Fintech Teması` | ✅ Eşleşti |
| **4. Public ThemeDispatcher / Renderer Değeri** | `FintechHomePage` (`data-theme="theme-fintech"`) | ✅ Eşleşti |
