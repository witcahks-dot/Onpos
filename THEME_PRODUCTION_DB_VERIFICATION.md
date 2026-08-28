# THEME_PRODUCTION_DB_VERIFICATION — Production DB ve Güvenlik Doğrulama Raporu

**Branch:** `fix/db-theme-persistence`  
**Tarih:** 2026-08-28  

---

## 1. Environment ve Veritabanı Hedefleri İncelemesi

### Kullanılan Değişken İsimleri (Gizli Değerler Gösterilmez):
- `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_URL` — Supabase API URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_ANON_KEY` — Client & Server Anonim Anahtarı.
- `SUPABASE_SERVICE_ROLE_KEY` — Yalnızca sunucu tarafı (Server-Only) yetkili anahtarı.

### Güvenlik İzolasyonu:
- `SUPABASE_SERVICE_ROLE_KEY` hiçbir zaman istemci tarafına (`NEXT_PUBLIC_*`) veya tarayıcı JS bundle'ına maruz bırakılmamaktadır.
- `getSupabaseServerClient()` fonksiyonu yalnızca API Route Handler ve Server Component (`src/lib/cms-db.ts`, `src/lib/supabase.ts`) seviyesinde çalışmaktadır.

---

## 2. Tekil Satır ve Şema Bütünlüğü

- **Tablo:** `public.settings`
- **Birincil Anahtar (Primary Key):** `id = 'default'`
- **Yazma Operasyonu:** `supabase.from('settings').upsert(dbRow, { onConflict: 'id' })`
- **Sonuç:** Asla duplicate settings kaydı oluşamaz; tek ve merkezi satır güncellenir.
- **Kolonlar:** `theme_id` (`'theme-existing'` | `'theme-fintech'`), `active_theme` (`'light'` | `'dark'`).
