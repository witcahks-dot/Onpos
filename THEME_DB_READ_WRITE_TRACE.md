# THEME_DB_READ_WRITE_TRACE — Veritabanı Okuma & Yazma Takip Raporu

**Tarih:** 2026-08-28  
**İncelenen Katmanlar:** `cms-db.ts`, `data/cms-db.json`, `data-normalizers.ts`, `supabase.ts`

---

## 1. Veri Yapısı ve Kolon Eşleşmesi

| Tablo / Varlık | Alan (Field) | Tip | Kabul Edilen Değerler | Varsayılan (Fallback) |
|---|---|---|---|---|
| `settings` | `themeId` | `string` (`ThemeId`) | `'theme-existing'` \| `'theme-fintech'` | `'theme-existing'` |
| `settings` | `siteName` | `string` | Serbest metin | `'Yazarkasa Satışı...'` |
| `settings` | `logoUrl` | `string` | URL / path | `'/upload/logos/POSLOGO.jpg'` |
| `settings` | `primaryColor` | `string` (Hex) | `#2563eb` vb. | `#2563eb` |
| `settings` | `showQuickContactButtons` | `boolean` | `true` \| `false` | `true` |

---

## 2. Yazma Operasyonu Takibi (`writeCMSData`)

1. `readCMSData()` çağrılarak mevcut veri okunur.
2. Gelen `data.settings` objesi mevcut `settings` ile birleştirilir (`merged`).
3. `normalizeCMSData` çalıştırılır:
   ```ts
   // data-normalizers.ts L103:
   themeId: s.themeId === 'theme-fintech' ? 'theme-fintech' : 'theme-existing',
   ```
4. `inMemoryCache = normalized;` atanır.
5. **Kritik Hata / Blokaj Noktası:**
   `fs.writeFileSync(DB_FILE, JSON.stringify(normalized, null, 2), 'utf-8');`
   - Yerel ortamda: `data/cms-db.json` dosyasına başarıyla yazar.
   - Vercel Serverless ortamında: `/var/task/data/cms-db.json` salt okunurdur. Dosyaya yazma işlemi engellenir veya geçici konteyner sonlandığında sıfırlanır.

---

## 3. Okuma Operasyonu Takibi (`readCMSData`)

1. `if (inMemoryCache) return inMemoryCache;`
   - Node.js süreci hayattaysa bellekten döner.
   - Ancak Vercel Serverless'ta her yeni istek veya farklı lambda instance'ı için `inMemoryCache = null` olarak başlar.
2. `fs.existsSync(DB_FILE)` kontrol edilir.
3. Dosyadan JSON okunur ve `normalizeCMSData(parsed)` çalıştırılır.
4. Sunucudaki dosya değiştirilemediği için her zaman statik dağıtım dosyasındaki `themeId: 'theme-existing'` okunur.

---

## 4. Kalıcı Çözüm İçin Veritabanı & Storage Mimarisi

Kalıcılık için 3 kademeli **"Multi-Layer Persistence Strategy"** uygulanmalıdır:

1. **Katman 1 (Cookie / HTTP Header State):**
   - Tema ayarı `POST /api/cms/settings` çağrısında `Set-Cookie: paypos_theme_id=theme-fintech; Path=/; Max-Age=31536000; SameSite=Lax` başlığı ile hem client hem de server tarafında saklanır.
   - Sayfa yenilendiğinde Next.js Server Components, middleware ve layout doğrudan cookie'den anında `theme-fintech` değerini okur (0 ms gecikme, SSR uyumlu, sıfır FOUC).

2. **Katman 2 (Kalıcı JSON Storage & /tmp Fallback):**
   - Serverless ortamda `/tmp/cms-db.json` ve `data/cms-db.json` çift yönlü desteklenir.

3. **Katman 3 (Supabase / Postgres / DB Sync):**
   - `readCMSData` ve `writeCMSData` fonksiyonları `isSupabaseConfigured` aktifse asenkron olarak `settings` tablosundaki `themeId` değerini günceller ve okur.
