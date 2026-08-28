# THEME_FIX_CHANGELOG — Tema Kalıcılık Düzeltmeleri Değişiklik Günlüğü

**Tarih:** 2026-08-28  
**Sürüm:** v2.1.0 — Persistent Multi-Layer Theme Engine  

---

## 1. Değiştirilen Dosyalar ve Yapılan Değişiklikler

### 1. `src/lib/cms-db.ts`
- Vercel ve AWS Lambda serverless ortamlarında kök dosya sistemi salt okunur (`EROFS`) olduğunda çökmeyi önleyen `/tmp/paypos-cms-db.json` storage fallback'i eklendi.
- `readCMSData()` ve `writeCMSData()` fonksiyonları `/tmp` depolaması, birincil JSON dosyası ve Supabase senkronizasyonunu güvenli `try-catch` blokları içinde yürütecek şekilde güçlendirildi.

### 2. `src/app/api/cms/[entity]/route.ts`
- `POST` ve `PUT` işlemlerinde `settings.themeId` güncellendiğinde yanıta `Set-Cookie: paypos_theme_id=...; Path=/; Max-Age=31536000; SameSite=Lax` başlığı eklendi.
- `GET /api/cms/all` isteğinde gelen çerezdeki `paypos_theme_id` değeri okunarak yanıt verisindeki `settings.themeId` ile garanti altına alındı.

### 3. `src/lib/cms-store.ts`
- `updateSettings` fonksiyonu `fetch` çağrısını `await` edecek, HTTP durum kodunu doğrulayacak (`res.ok`) ve sunucudan dönen gerçek veriyi store'a kaydedecek şekilde refactor edildi.
- Tarayıcıda anında reaktivite için `document.cookie` ve `document.documentElement.setAttribute('data-theme', themeId)` istemci taraflı tetikleyicisi eklendi.
- `fetchCMSData` fonksiyonu sayfa yenilendiğinde istemci çerezini kontrol ederek temanın sıfırlanmasını engeller hale getirildi.

### 4. `src/app/admin/settings/page.tsx`
- Sayfa açılışında API'den gelen `settings` verisi ile form alanlarını otomatik senkronize eden `React.useEffect` eklendi.
- Form kaydetme işlemine `try / catch` ile hata yakalama ve görsel hata bildirim (`errorMsg`) kutusu eklendi.

### 5. `src/app/layout.tsx`
- `RootLayout` sunucu tarafında `cookies()` üzerinden `paypos_theme_id` çerezini okuyacak şekilde `async` yapıldı ve `<html data-theme={themeId}>` doğrudan sunucu çıktısı (SSR) olarak yapılandırıldı.

### 6. `src/themes/ThemeDispatcher.tsx`
- İstemci tarafında hydration öncesi çerez kontrolü eklenerek sayfa yenilemelerinde sıfır gecikme (0 ms FOUC) sağlandı.
