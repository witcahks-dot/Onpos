# THEME_REAL_FIX_PLAN — Gerçek ve Kalıcı Veritabanı Mimarisi Çözüm Planı

**Tarih:** 2026-08-28  
**Hedef:** Tema seçiminin `/tmp` veya yalnızca tek tarayıcı çerezi yerine, doğrudan **gerçek merkezi veritabanı (Supabase / Postgres / Persistent DB Storage)** source of truth yapılarak tüm dünyadaki tüm kullanıcılar için kalıcı hale getirilmesi.

---

## 1. Mimari Prensipler ve Zorunlu Kurallar

1. **Tek Source of Truth:** `public.settings` tablosundaki `theme_id` kolonu tek ve tartışmasız merkezi kaynak olacaktır.
2. **Kalıcı Okuma (DB Read-Through):** `readCMSData()` ve `GET /api/cms/all` fonksiyonları sunucu tarafında önce veritabanındaki `settings` kaydını okuyacak; yalnızca veritabanı bağlantısı yoksa yerel JSON'a fallback yapacaktır.
3. **Senkron & Garantili Yazma (DB Write-Through):** `POST /api/cms/settings` endpoint'i veritabanına `upsert` işlemini `await` edecek; yazma başarısız olursa HTTP 500 dönecek, asla sahte 200 dönmeyecektir.
4. **Başarı Yanıtında DB'den Okunan Değerin Dönülmesi:** Backend, veritabanına yazdıktan sonra tekrar okuduğu güncel `settings` verisini yanıtta döndürecek; frontend bu değeri store'a yazacaktır.
5. **Cookie'nin Doğru Rolü:** Cookie yalnızca ilk HTML yanıtında (SSR) 0 ms flicker önleme amaçlı kullanılacak; global veritabanının yerine geçmeyecektir.
6. **Canonical Değer Validasyonu:** Yalnızca `'theme-existing'` ve `'theme-fintech'` değerleri kabul edilecek; diğer tüm değerler reddedilecektir.
7. **Duplicate Kayıt Engelleme:** `id = 'default'` unique primary key ile tek global ayar satırı garanti edilecektir.

---

## 2. Değişiklik Yapılacak Dosyalar ve Plan

### 1. `src/lib/cms-db.ts`
- `getSettingsFromDB()` ve `saveSettingsToDB()` fonksiyonları `async` olarak Supabase / Postgres client ile bağlanacak.
- `readCMSDataAsync()` / `readCMSData()`: Veritabanı bağlıysa `supabase.from('settings').select('*').eq('id', 'default').single()` ile güncel ayarları çekecek.
- `writeCMSDataAsync()`: `supabase.from('settings').upsert({ id: 'default', theme_id: data.settings.themeId, ... })` işlemini `await` edecek ve doğrulanmış veriyi dönecek.

### 2. `src/app/api/cms/[entity]/route.ts`
- `GET /api/cms/all` ve `GET /api/cms/settings`: `await readCMSDataAsync()` ile veritabanındaki güncel `theme_id`'yi dönecek.
- `POST /api/cms/settings`: `await writeCMSDataAsync({ settings: body })` ile doğrudan veritabanına yazacak, başarılı olduğunda DB'den gelen güncel nesneyi dönecek.

### 3. `src/lib/cms-store.ts`
- `updateSettings`: API'ye istek attıktan sonra dönen doğrulanmış DB verisini store'a yazacak. Hata alırsa kullanıcıya bildirecek.

### 4. `src/app/admin/settings/page.tsx`
- Form kaydetme anında DB yanıtı başarısızsa hata mesajı gösterecek; başarılıysa güncel temanın DB'den teyit edildiğini belirtecek.

---

## 3. Doğrulama ve Test Adımları
- **Test A:** Admin panelinde Fintech teması seçilip kaydedilecek.
- **Test B:** Farklı bir bilgisayardan veya çerezleri temizlenmiş gizli sekmeden doğrudan `GET /api/cms/all` atılacak; dönen JSON'da `themeId: 'theme-fintech'` olduğu teyit edilecek.
- **Test C:** Public site tüm tarayıcılarda Fintech teması olarak açılacak.
- **Test D:** Mevcut temaya dönüldüğünde aynı DB zinciri tersine işletilecek.
