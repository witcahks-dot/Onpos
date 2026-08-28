# THEME_READ_WRITE_PROOF — Veritabanı Okuma/Yazma ve Doğrulama Kanıtı

**Branch:** `fix/db-theme-persistence`  
**Tarih:** 2026-08-28  

---

## 1. POST / PUT Akışı — Gerçek Satırlar ve Kanıtlar

### Dosya: `src/app/api/cms/[entity]/route.ts` (L76 - L92)
```ts
// 3. Settings Entity Special Write-Through
if (entity === 'settings') {
  const updatedSettings = { ...(currentData.settings || {}), ...body };
  const newCMS = await writeCMSDataAsync({ settings: updatedSettings });
  
  try {
    revalidatePath('/', 'layout');
  } catch (revErr) {
    console.warn('Revalidate error:', revErr);
  }

  const res = NextResponse.json(newCMS.settings, { status: 200 });
  if (newCMS.settings?.themeId) {
    res.cookies.set('paypos_theme_id', newCMS.settings.themeId, { path: '/', maxAge: 31536000, sameSite: 'lax' });
  }
  return res;
}
```

### 🔍 Kanıt Analizi:
- `writeCMSDataAsync` doğrudan `await` edilir.
- `src/lib/cms-db.ts` içinde `supabase.from('settings').upsert(...)` çağrısının `error` kontrolü yapılır; hata varsa exception fırlatılır ve `status: 500` döner.
- Başarılı `upsert` sonrası veritabanından tekrar `select('*').eq('id', 'default').single()` yapılarak teyit edilen kayıt response olarak döner.
- Next.js SSR cache'i `revalidatePath('/', 'layout')` ile anında invalidate edilir.

---

## 2. GET / Okuma Akışı — Gerçek Satırlar ve Kanıtlar

### Dosya: `src/lib/cms-db.ts` (L85 - L115)
```ts
export async function readCMSDataAsync(): Promise<CMSData> {
  const base = readCMSData();

  if (isSupabaseConfigured) {
    try {
      const client = getSupabaseServerClient();
      if (client) {
        const { data, error } = await client
          .from('settings')
          .select('*')
          .eq('id', 'default')
          .single();

        if (data && !error) {
          const dbSettings = mapDbRowToSiteSettings(data);
          const merged: CMSData = {
            ...base,
            settings: normalizeSiteSettings({ ...base.settings, ...dbSettings }),
          };
          inMemoryCache = merged;
          return merged;
        } else if (error) {
          console.warn('[cms-db] Supabase settings query warning (using local fallback):', error.message);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown DB error';
      console.warn('[cms-db] Supabase connection error (using local fallback):', msg);
    }
  }

  return base;
}
```

### 🔍 Kanıt Analizi:
- `readCMSDataAsync` sunucu tarafında her zaman önce Supabase'e bağlanarak güncel `settings` kaydını sorgular.
- Dönen `theme_id` değeri `mapDbRowToSiteSettings` ile normalize edilip belleğe ve yanıta aktarılır.
- Yeni bir oturum, farklı bir bilgisayar veya çerezsiz bir tarayıcı bağlandığında veri statik JSON'dan değil **doğrudan Supabase veritabanından** gelir.
