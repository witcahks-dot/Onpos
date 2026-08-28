# THEME_STORAGE_TRUTH_REPORT — Depolama ve Kalıcılık Gerçeklik Raporu

**Tarih:** 2026-08-28  
**İncelenen Dosyalar:** `src/lib/cms-db.ts`, `src/lib/supabase.ts`, `src/app/api/cms/[entity]/route.ts`, `src/lib/cms-store.ts`, `supabase-schema.sql`

---

## 1. Production Ortamında Fiziksel Depolama Akışı

```
[Admin / Client]
       │
       ▼ POST /api/cms/settings { themeId: 'theme-fintech' }
[Next.js Serverless Route Handler]
       │
       ├─► writeCMSData() 
       │      ├─► 1. /tmp/paypos-cms-db.json  (YALNIZCA O ANKİ KONTEYNERDE GEÇİCİ)
       │      ├─► 2. data/cms-db.json         (VERCEL'DE READ-ONLY / BAŞARISIZ)
       │      └─► 3. syncToSupabase()         (Eğer Env Var varsa asenkron upsert)
       │
       └─► Set-Cookie: paypos_theme_id=...    (YALNIZCA O TARAYICI İÇİN GEÇERLİ)
```

### 🔴 Kritik Gerçekler:
1. **`/tmp` Kalıcı Değildir:** Serverless (Vercel/AWS Lambda) mimarisinde `/tmp` yalnızca o anki konteynerin geçici disk alanıdır. Yeni bir serverless container başlatıldığında (cold-start), trafik farklı bir instance'a veya farklı bir coğrafi bölgeye gittiğinde `/tmp` boştur.
2. **`data/cms-db.json` Salt Okunurdur:** Vercel dağıtımında `/var/task/data/cms-db.json` dosyasına yazma yapılamaz (`EROFS`).
3. **Cookie Global Değildir:** `Set-Cookie` yalnızca temayı değiştiren yöneticinin tarayıcısında saklanır. Başka bir kullanıcı, müşteri veya farklı bir cihaz public siteye girdiğinde `themeId` değerini okuyamaz.
4. **`readCMSData()` Veritabanından Okumuyor:** `src/lib/cms-db.ts` içindeki `readCMSData()` fonksiyonu Supabase / Postgres veritabanından veri **okumamaktadır**; yalnızca diskten okumaktadır.

---

## 2. Global "Source of Truth" İhtiyacı

Aktif tema ayarının tüm dünyadaki tüm kullanıcılar, yeni oturumlar, farklı tarayıcılar ve serverless cold start'lar için kalıcı ve ortak olması için:
- **Ana Kaynak (Source of Truth):** Doğrudan kalıcı veritabanı (`public.settings` tablosundaki `theme_id` kolonu) olmalıdır.
- **`readCMSData()`:** Sunucu tarafında veritabanından güncel `settings` kaydını okumalıdır.
- **`writeCMSData()`:** Ayarları doğrudan veritabanına `upsert` etmeli ve işlem tamamlanmadan başarılı yanıt dönmemelidir.
- **Cookie:** Yalnızca SSR anında 0 ms HTML render desteği sağlayan ikincil yardımcı bir önbellek olmalı; veritabanının yerine geçmemelidir.
