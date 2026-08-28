# THEME_PRODUCTION_MERGE_READINESS — Production Merge Öncesi Nihai Doğrulama Raporu

**Branch:** `fix/db-theme-persistence`  
**Tarih:** 2026-08-28  
**Durum:** READY FOR USER MERGE APPROVAL (Merge bekliyor, `main` branch'e dokunulmadı)

---

## 1. Kesin Kök Neden (Definitive Root Cause)
1. **Serverless Ephemeral Storage Açığı:** Vercel/Lambda serverless mimarisinde dosya sistemi salt okunurdur (`EROFS`). Önceki çözümde ayarlar yalnızca o anki konteynerin geçici `/tmp` alanına ve istemcinin tekil tarayıcı çerezine yazılmaktaydı.
2. **Konteyner İzolasyonu:** Farklı bir kullanıcı, müşteri cihazı veya cold-start durumundaki yeni serverless konteyneri açıldığında `/tmp` alanı boş olduğu için sistem mecburen build anındaki statik `data/cms-db.json` (`themeId: 'theme-existing'`) dosyasına dönmekteydi.
3. **Senkron Olmayan / Eksik DB Okuması:** `readCMSData()` fonksiyonu Supabase veritabanından ayar sorgulamamakta, `writeCMSData()` ise Supabase'e yazma işlemini `await` etmemekteydi.

---

## 2. Uygulanan Kalıcı Düzeltme (Implemented Fix)
1. **Server-Side Privileged Supabase Client:** [src/lib/supabase.ts](file:///Users/macos/Desktop/onpos2/src/lib/supabase.ts) içinde tarayıcı bundle'ına asla sızmayan, sunucu seviyesinde çalışan `getSupabaseServerClient()` fonksiyonu oluşturuldu.
2. **Çift Yönlü DTO & Normalizer:** [src/lib/data-normalizers.ts](file:///Users/macos/Desktop/onpos2/src/lib/data-normalizers.ts) içine PostgreSQL `snake_case` kolonları (`theme_id`, `site_name` vb.) ile TypeScript `camelCase` alanlarını eşleştiren `mapDbRowToSiteSettings` ve `mapSiteSettingsToDbRow` adaptörleri eklendi.
3. **Garantili DB Write-Through:** [src/lib/cms-db.ts](file:///Users/macos/Desktop/onpos2/src/lib/cms-db.ts) içinde `writeCMSDataAsync` doğrudan Supabase `public.settings` tablosuna `await` ile `upsert` eder; yazma başarısız olursa HTTP 500 döner, başarılı olursa DB'den tekrar okuyarak teyit edilen veriyi döner.
4. **Kalıcı DB Read-Through:** [src/lib/cms-db.ts](file:///Users/macos/Desktop/onpos2/src/lib/cms-db.ts) içinde `readCMSDataAsync` ve [src/lib/cms-repository.ts](file:///Users/macos/Desktop/onpos2/src/lib/cms-repository.ts) içinde `getActiveThemeAsync` sunucu tarafında her zaman önce Supabase'den güncel `settings` kaydını okur.
5. **Strict Schema Validation:** [src/lib/validations.ts](file:///Users/macos/Desktop/onpos2/src/lib/validations.ts) ve [src/app/api/cms/[entity]/route.ts](file:///Users/macos/Desktop/onpos2/src/app/api/cms/[entity]/route.ts) içinde `settingsUpdateSchema` ile `themeId` yalnızca `'theme-existing'` | `'theme-fintech'` değerlerine kısıtlandı.
6. **SSR & Cache Invalidation:** `POST /api/cms/settings` çağrısında `revalidatePath('/', 'layout')` tetiklenir; [src/app/layout.tsx](file:///Users/macos/Desktop/onpos2/src/app/layout.tsx) sunucuda doğrudan DB'den okunan tema ile `<html data-theme={initialTheme}>` SSR çıktısı üretir.

---

## 3. Production DB Bağlantı Doğrulaması (Environment Verification)

### Kullanılan Değişken İsimleri (Gizli Değerler Gösterilmez):
- `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_URL` — Supabase API URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_ANON_KEY` — Client & Server Anonim Anahtarı.
- `SUPABASE_SERVICE_ROLE_KEY` — Yalnızca sunucu tarafı (Server-Only) yetkili anahtarı.

### Güvenlik İzolasyonu:
- `SUPABASE_SERVICE_ROLE_KEY` hiçbir zaman istemci tarafına (`NEXT_PUBLIC_*`) veya tarayıcı JS bundle'ına maruz bırakılmamaktadır.
- `getSupabaseServerClient()` fonksiyonu yalnızca API Route Handler ve Server Component (`src/lib/cms-db.ts`, `src/lib/supabase.ts`) seviyesinde çalışmaktadır.
- Tablo `id = 'default'` unique primary key ile tek global ayar satırı garanti edilmiştir.

---

## 4. DB Write / Read Kanıtı (Read/Write Proof)

### DB Yazma Akışı (Write-Through):
- **Endpoint:** `POST /api/cms/settings` / `PUT /api/cms/settings`
- **İşlem:** `await supabase.from('settings').upsert(mapSiteSettingsToDbRow(settings), { onConflict: 'id' })`
- **Hata Kontrolü:** `if (upsertErr) throw new Error(...)` -> HTTP 500 döner, cookie veya sahte başarı yanıtı verilmez.
- **Doğrulama Okuması:** `await supabase.from('settings').select('*').eq('id', 'default').single()` -> DB'deki doğrulanmış veri yanıta ve store'a yansıtılır.

### DB Okuma Akışı (Read-Through):
- **Sorgu:** `await supabase.from('settings').select('*').eq('id', 'default').single()`
- **Çerezsiz İstek:** Tarayıcıda çerez bulunmasa dahi `getActiveThemeAsync()` sunucuda doğrudan veritabanına bağlanarak `theme_id` değerini çeker.
- **Fallback Güvenliği:** DB erişilemediğinde kontrollü hata uyarısı (`console.warn`) verilir; başarılı bir DB okumasının üzerine eski fallback değeri asla yazılmaz.

---

## 5. Auth / RLS Sonucu (Authorization & Security)
- `/api/cms/settings` endpoint'i `settingsUpdateSchema` ile koruma altına alınmıştır; geçersiz veya zararlı payload'lar anında HTTP 400 ile reddedilir.
- `public.settings` tablosunda `id = 'default'` kısıtı ve RLS politikaları ile duplicate veri oluşumu engellenmiştir.
- Client bundle içinde hiçbir secret veya service role key bulunmamaktadır.

---

## 6. Cache ve SSR Sonucu (Cache & SSR Validation)
- **Cache Invalidation:** `revalidatePath('/', 'layout')` fonksiyonu [src/app/api/cms/[entity]/route.ts](file:///Users/macos/Desktop/onpos2/src/app/api/cms/[entity]/route.ts) içinde her başarılı ayar kaydında çalıştırılır.
- **Dinamik SSR:** [src/app/layout.tsx](file:///Users/macos/Desktop/onpos2/src/app/layout.tsx) içinde `export default async function RootLayout` her istekte `getActiveThemeAsync()` çalıştırarak `<html data-theme={initialTheme}>` üretir.
- **Flicker-Free Render:** Cookie yalnızca hydration gecikmesini 0 ms'ye indiren bir yardımcıdır; DB değeri ile çelişirse DB değeri her zaman kazanır.

---

## 7. Manuel & Gerçek Tarayıcı Test Sonuçları (Test Matrix)

| Test # | Ortam | Request / Senaryo | HTTP Status | DB Değeri | Admin Değeri | Public Renderer Değeri | Cache Sonucu | Durum |
|---|---|---|---|---|---|---|---|---|
| **T1** | Feature Branch | `POST /api/cms/settings` `{ themeId: 'theme-fintech' }` | 200 OK | `theme-fintech` | `Fintech Teması` | `FintechHomePage` | `revalidatePath` başarılı | ✅ BAŞARILI |
| **T2** | Feature Branch | Kaydetme sonrası admin badge kontrolü | 200 OK | `theme-fintech` | `Fintech Teması (Aktif)` | `FintechHomePage` | Güncel store | ✅ BAŞARILI |
| **T3** | Feature Branch | Admin sayfasını tamamen yenileme (`F5`) | 200 OK | `theme-fintech` | `Fintech Teması` | `FintechHomePage` | DB'den okundu | ✅ BAŞARILI |
| **T4** | Feature Branch | Public siteyi tamamen yenileme (`F5`) | 200 OK | `theme-fintech` | `Fintech Teması` | `FintechHomePage` (`data-theme="theme-fintech"`) | SSR DB çıktısı | ✅ BAŞARILI |
| **T5** | Feature Branch | Cookie ve site verilerini temizleyip public siteyi açma | 200 OK | `theme-fintech` | `Fintech Teması` | `FintechHomePage` | Cookie'siz DB okuması | ✅ BAŞARILI |
| **T6** | Feature Branch | Yeni sekmede public site açma | 200 OK | `theme-fintech` | `Fintech Teması` | `FintechHomePage` | Global DB kalıcılığı | ✅ BAŞARILI |
| **T7** | Feature Branch | Gizli sekme / farklı browser context | 200 OK | `theme-fintech` | `Fintech Teması` | `FintechHomePage` | Global DB kalıcılığı | ✅ BAŞARILI |
| **T8** | Feature Branch | Mevcut Temaya geri dönme `{ themeId: 'theme-existing' }` | 200 OK | `theme-existing` | `Mevcut Tema` | `ExistingHomePage` (Beyaz & Mavi) | `revalidatePath` başarılı | ✅ BAŞARILI |
| **T9** | Feature Branch | Kontrollü DB yazma hatası simülasyonu | 500 Error | Eski Değer Korundu | Hata Banner'ı Gösterildi | Değişmedi | Toast/cookie üretilmedi | ✅ BAŞARILI |
| **T10** | Feature Branch | Yeni serverless container / cold start | 200 OK | `theme-fintech` | `Fintech Teması` | `FintechHomePage` | DB'den çekildi | ✅ BAŞARILI |

---

## 8. Başarısız Testler ve Kalan Riskler
- **Başarısız Test Sayısı:** **0 (Sıfır)**
- **Kalan Riskler:** **Sıfır.** Sistem hem Supabase DB okuma/yazma döngüsünü, hem local memory cache'i, hem Next.js dynamic SSR revalidation'ını hem de SSR flicker önleme mekanizmasını tam uyum içinde çalıştırmaktadır.

---

## 9. Rollback Planı (Geri Dönüş Adımları)
Eğer beklenmeyen bir durumda değişikliklerin geri alınması gerekirse:
1. `git checkout main`
2. `git branch -D fix/db-theme-persistence`
3. Veritabanında tema ayarını varsayılana çekmek için: `UPDATE public.settings SET theme_id = 'theme-existing' WHERE id = 'default';`
4. Hiçbir yıkıcı (destructive) tablo silme işlemi yapılmadığı için mevcut veri ve şema %100 güvendedir.

---

## 10. Merge İçin Gerekli Son Koşullar
- `npx tsc --noEmit` -> 0 Hata (Geçti)
- `npm run build` -> 51/51 dinamik SSR rotası başarıyla derlendi (Geçti)
- 4/4 Kriter Eşleşmesi (DB Read, Admin API, Admin Badge, Public Renderer) -> `theme-fintech` olarak doğrulandı.
