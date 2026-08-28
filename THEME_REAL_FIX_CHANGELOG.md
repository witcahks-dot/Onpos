# THEME_REAL_FIX_CHANGELOG — Gerçek Veritabanı Kalıcılık Değişiklik Günlüğü

**Branch:** `fix/db-theme-persistence`  
**Tarih:** 2026-08-28  
**Sürüm:** v2.2.0 (True DB Read-Through & Write-Through Architecture)

---

## 1. Değiştirilen Dosyalar ve Mimari Gerekçeleri

### 1. `src/lib/supabase.ts`
- **Gerekçe:** Sunucu tarafında `SUPABASE_SERVICE_ROLE_KEY` veya anon key kullanarak tarayıcı bundle'ına sızmayan güvenli `getSupabaseServerClient()` eklendi.
- **Güvenlik:** Yüksek yetkili anahtar asla client bundle'a veya `NEXT_PUBLIC_*` değişkenine dahil edilmez.

### 2. `src/lib/data-normalizers.ts`
- **Gerekçe:** PostgreSQL `settings` tablosundaki `snake_case` alanlar (`theme_id`, `site_name`, `logo_url`, `primary_color` vb.) ile TypeScript `SiteSettings` `camelCase` alanları arasında çift yönlü güvenli DTO adaptörleri (`mapDbRowToSiteSettings` ve `mapSiteSettingsToDbRow`) eklendi.
- **Doğrulama:** Yalnızca `'theme-existing'` ve `'theme-fintech'` değerleri kabul edilir.

### 3. `src/lib/cms-db.ts`
- **Gerekçe:** 
  - `readCMSDataAsync()`: Sunucu tarafında önce Supabase `settings` tablosundaki `id = 'default'` kaydını okur. Veritabanı erişilebilirse güncel `theme_id` değerini ana kaynak kabul eder; DB erişilemezse kontrollü fallback yapar.
  - `writeCMSDataAsync()`: Ayarları Supabase `public.settings` tablosuna `await` ederek `upsert` eder. Supabase hata dönerse hata fırlatır; başarılı olursa DB'den tekrar okuyarak doğrulanmış veriyi döner.

### 4. `src/app/api/cms/[entity]/route.ts`
- **Gerekçe:** 
  - `GET /api/cms/all` ve `GET /api/cms/settings`: `readCMSDataAsync()` üzerinden veritabanındaki gerçek `theme_id`'yi döner.
  - `POST /api/cms/settings` ve `PUT /api/cms/settings`: `writeCMSDataAsync()` ile veritabanına `upsert` işlemini `await` eder. DB hatasında `status: 500` döner. Başarılı yazmada `revalidatePath('/', 'layout')` ile Next.js cache'ini geçersiz kılar ve DB'den teyit edilen güncel değeri `status: 200` ile döner.

### 5. `src/lib/cms-repository.ts`
- **Gerekçe:** Server component'ler için `getActiveThemeAsync()` ve `getCMSDataAsync()` fonksiyonları eklendi.

### 6. `src/app/layout.tsx`
- **Gerekçe:** Sunucu tarafında `await getActiveThemeAsync()` çağrısı ile veritabanındaki aktif tema kök `<html data-theme={initialTheme}>` olarak SSR render edilir. Cookie yalnızca yardımcı bir ipucu olarak kullanılır.

### 7. `src/themes/ThemeDispatcher.tsx`
- **Gerekçe:** İstemci tarafında öncelik daima API/DB'den gelen `settings.themeId` değerindedir; hydration anında ise SSR `data-theme` özniteliği okunur.

### 8. `src/lib/cms-store.ts`
- **Gerekçe:** `fetchCMSData` API'den gelen doğrulanmış DB temasını DOM ve yardımcı çereze senkronize eder. `updateSettings` başarısız API yanıtında hata fırlatarak arayüzün sahte başarı göstermesini engeller.
