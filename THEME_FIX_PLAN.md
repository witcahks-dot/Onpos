# THEME_FIX_PLAN — Tema Kalıcılık ve Çözüm Uygulama Planı

**Tarih:** 2026-08-28  
**Hedef:** Admin panelinden seçilen temanın sayfa yenilendiğinde, yeni sekmede ve public frontend'de kesin ve kalıcı olarak korunması.

---

## 1. Uygulanacak Çözüm Mimarisi

Kalıcı tema yönetimini 3 sağlam temele oturtacağız:

```
┌────────────────────────────────────────────────────────┐
│ 1. Admin UI & Store                                    │
│    - AdminSettingsPage: useEffect ile form senkronize │
│    - useCMSStore: API yanıtını doğrula & re-sync et    │
└──────────────────────────┬─────────────────────────────┘
                           │ POST /api/cms/settings
┌──────────────────────────▼─────────────────────────────┐
│ 2. Next.js API & Cookie Katmanı                        │
│    - Set-Cookie: paypos_theme_id (1 yıl geçerli)       │
│    - /tmp/cms-db.json fallback + DB sync               │
│    - Güncel settings yanıtı döndür (200 OK)            │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ 3. Server Layout & Client Hydrator                     │
│    - Root layout: Cookie'den temayı SSR anında oku    │
│    - <html data-theme="..."> anında render edilsin     │
│    - Sıfır FOUC / Sıfır flicker / Kesintisiz kalıcılık │
└────────────────────────────────────────────────────────┘
```

---

## 2. Değiştirilecek Dosyalar ve Yapılacak İşlemler

### Adım 1: `src/app/api/cms/[entity]/route.ts`
- `POST` ve `PUT` işlemlerinde `entity === 'settings'` ise:
  - Gönderilen `themeId` (`theme-existing` veya `theme-fintech`) değerini doğrula.
  - HTTP Yanıtında `Set-Cookie` başlığı ile `paypos_theme_id` çerezini set et (`Path=/; Max-Age=31536000; SameSite=Lax`).
  - `writeCMSData` fonksiyonunu çağır ve dönen güncel `settings` nesnesini JSON olarak döndür.
- `GET /api/cms/all` ve `GET /api/cms/settings` isteklerinde:
  - İstek çerezlerinde `paypos_theme_id` varsa ve geçerliyse, `data.settings.themeId` alanını çerez değeriyle zenginleştir.

### Adım 2: `src/lib/cms-db.ts`
- `writeCMSData` fonksiyonuna `/tmp/cms-db.json` ve güvenli serverless write fallback'i ekle.
- `readCMSData` fonksiyonunun `/tmp/cms-db.json` varsa öncelikli okumasını sağla.

### Adım 3: `src/lib/cms-store.ts`
- `updateSettings` metodunda:
  ```ts
  updateSettings: async (newSettings) => {
    try {
      const res = await fetch('/api/cms/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (!res.ok) throw new Error('Sunucu ayarları kaydedemedi');
      const savedData = await res.json();
      set({ settings: normalizeSiteSettings(savedData) });
      if (typeof document !== 'undefined' && newSettings.themeId) {
        document.cookie = `paypos_theme_id=${newSettings.themeId}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.setAttribute('data-theme', newSettings.themeId);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
      throw err;
    }
  }
  ```

### Adım 4: `src/app/admin/settings/page.tsx`
- `useEffect` ekleyerek `settings` nesnesi store'a yüklendiğinde `form` state'inin güncellenmesini sağla:
  ```ts
  useEffect(() => {
    if (settings) {
      setForm(prev => ({
        ...prev,
        ...settings,
        themeId: (settings.themeId || 'theme-existing') as ThemeId,
      }));
    }
  }, [settings]);
  ```
- `handleSubmit` içinde `try / catch` ile hata yakalama ekle, hata durumunda kullanıcıya hata mesajı göster.

### Adım 5: `src/app/layout.tsx`
- Sunucu tarafında `cookies()` üzerinden `paypos_theme_id` çerezini oku.
- `<html data-theme={themeId}>` olarak doğrudan SSR çıktısı ver.

---

## 3. Doğrulama ve Test Adımları
1. **TEST 1:** Admin panelinde `Fintech Teması` seçilip kaydedilecek, API'nin 200 OK ve `Set-Cookie` döndüğü doğrulanacak.
2. **TEST 2:** Admin sayfası `F5` ile yenilenecek; seçimin `Fintech Teması` olarak kaldığı doğrulanacak.
3. **TEST 3:** Public ana sayfa (`/`) `F5` ile yenilenecek; Fintech temasının açıldığı doğrulanacak.
4. **TEST 4:** Yeni gizli sekme açılacak; temanın korunduğu doğrulanacak.
5. **TEST 5:** Admin'den `Mevcut Tema` seçilip kaydedilecek; sistemin ters yönde kusursuz çalıştığı doğrulanacak.
