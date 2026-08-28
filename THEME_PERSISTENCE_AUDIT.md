# THEME_PERSISTENCE_AUDIT — Tema Kalıcılık ve Kayıt Denetim Raporu

**Tarih:** 2026-08-28  
**İncelenen Sistem:** ONPOS2 / PAYPOS Çoklu Tema Motoru (`theme-existing` & `theme-fintech`)  
**Denetim Kapsamı:** Admin Formu → Zustand Store → Next.js API Routes → Dosya/Veritabanı Katmanı → Hydration & SSR

---

## 1. Belirti ve Problem Özeti
Admin panelindeki *Tema, Logo & Sistem Ayarları* (`/admin/settings`) ekranından "Fintech Teması" seçilip kaydedildiğinde, o anki tarayıcı oturumunda tema değişmekte; ancak sayfa yenilendiğinde (`F5`), yeni bir sekme açıldığında veya public site ziyaret edildiğinde tema tekrar varsayılan "Mevcut Tema" (`theme-existing`) haline geri dönmektedir.

---

## 2. Tespit Edilen Kök Nedenler ve Kod Denetimi

### 🔍 Kök Neden 1: Vercel Serverless Ortamında Dosya Sisteminin Salt Okunur (Read-Only) Olması
- **Belirti:** Canlı ortamda (Vercel) `POST /api/cms/settings` çağrıldığında sunucu tarafında dosya sistemine (`process.cwd()/data/cms-db.json`) yazılamaması veya yazılan geçici lambda kapsayıcısının yeni istekte yok olması.
- **Gerçek Dosya Yolu:** [src/lib/cms-db.ts](file:///Users/macos/Desktop/onpos2/src/lib/cms-db.ts)
- **Satır Aralığı:** L60 - L100
- **Fonksiyon/Bileşen Adı:** `writeCMSData(data: Partial<CMSData>)`
- **Beklenen Davranış:** Tema ayarının kalıcı bir depolama katmanına (Serverless uyumlu kalıcı DB, Supabase, KV veya HTTP-Cookie / Server State) hatasız yazılması ve `readCMSData()` tarafından sonraki tüm isteklerde bu değerin döndürülmesi.
- **Gerçek Davranış:** Vercel'in `/var/task` kök dosya sistemi salt okunurdur (`EROFS`). `fs.writeFileSync(DB_FILE, ...)` sunucu tarafında hata fırlatır veya ephemeral container kapandığında silinir. `readCMSData()` her cold start'ta statik build anındaki `data/cms-db.json` dosyasını okur (`themeId: 'theme-existing'`).
- **Kanıt:** `src/lib/cms-db.ts` satır 79: `fs.writeFileSync(DB_FILE, JSON.stringify(normalized, null, 2), 'utf-8');`. Vercel lambda çalışma zamanında `process.cwd()/data/` dizinine yazma izni yoktur.
- **Önerilen Düzeltme:** 
  1. Sunucu tarafında `writeCMSData` için serverless uyumlu storage fallback'i eklenmeli (e.g. Supabase, Edge/HTTP Cookie senkronizasyonu, `/tmp` storage ve client-side persistent storage adapter).
  2. `settings.themeId` için hem veritabanı/API hem de kalıcı cookie/header katmanı kurularak SSR ve hydration anında kesintisiz okunması sağlanmalı.
- **Risk:** Düşük; mevcut verileri bozmadan kalıcı saklama katmanı eklenir.

---

### 🔍 Kök Neden 2: `useCMSStore.updateSettings` İçinde Hata Kontrolü ve Yeniden Okuma (`fetchCMSData`) Eksikliği
- **Belirti:** API başarısız olsa veya 500 dönse dahi admin paneline "Kaydedildi" mesajı gösterilmesi ve API'den dönen güncel sonucun store'a re-sync edilmemesi.
- **Gerçek Dosya Yolu:** [src/lib/cms-store.ts](file:///Users/macos/Desktop/onpos2/src/lib/cms-store.ts)
- **Satır Aralığı:** L163 - L175
- **Fonksiyon/Bileşen Adı:** `updateSettings`
- **Beklenen Davranış:** `fetch('/api/cms/settings')` çağrısının yanıtı (`res.ok`, status code) kontrol edilmeli; işlem başarılıysa veritabanından dönen normalize edilmiş `settings` ile store güncellenmeli (`fetchCMSData()`), hata varsa kullanıcıya bildirilmelidir.
- **Gerçek Davranış:** `updateSettings` çağrısı `set({ settings: merged })` ile client-side state'i anında günceller. `fetch` yanıtını beklemez ve hata durumunu yakalayıp kullanıcıya bildirmez.
- **Kanıt:** 
  ```ts
  updateSettings: async (newSettings) => {
    try {
      const merged = { ...get().settings, ...newSettings };
      set({ settings: merged });
      await fetch('/api/cms/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  },
  ```
- **Önerilen Düzeltme:** `updateSettings` metodunda `res.ok` doğrulanmalı, API'den dönen güncel `settings` objesi Zustand store'a kaydedilmeli ve hata durumunda exception fırlatılarak UI'da hata toast'ı gösterilmelidir.
- **Risk:** Sıfır regresyon riski.

---

### 🔍 Kök Neden 3: `AdminSettingsPage` İçinde Asenkron Veri Senkronizasyonu (`useEffect`) Eksikliği
- **Belirti:** Sayfa ilk açıldığında veya yenilendiğinde (`F5`), formun `defaultCMSData` ile başlaması ve API'den gerçek veriler gelince form alanlarının güncellenmemesi.
- **Gerçek Dosya Yolu:** [src/app/admin/settings/page.tsx](file:///Users/macos/Desktop/onpos2/src/app/admin/settings/page.tsx)
- **Satır Aralığı:** L24 - L36
- **Fonksiyon/Bileşen Adı:** `AdminSettingsPage`
- **Beklenen Davranış:** `settings` verisi API'den çekildiğinde `useEffect` ile `form` state'inin `settings` ile senkronize edilmesi.
- **Gerçek Davranış:** `form` state'i yalnızca component ilk mount olduğunda `useState` ile bir kez oluşturulur. `fetchCMSData()` tamamlandığında `form.themeId` güncellenmez, varsayılan `theme-existing` olarak kalır.
- **Kanıt:** 
  ```ts
  const { settings, updateSettings } = useCMSStore();
  const [form, setForm] = useState({
    ...settings,
    themeId: (settings.themeId || 'theme-existing') as ThemeId,
    ...
  });
  // settings değiştiğinde form'u güncelleyen useEffect YOK
  ```
- **Önerilen Düzeltme:** `useEffect(() => { setForm(prev => ({ ...prev, ...settings })); }, [settings]);` eklenmelidir.
- **Risk:** Sıfır.

---

### 🔍 Kök Neden 4: `readCMSData` İçinde Supabase Senkronizasyonunun Yalnızca Yazmada Olması, Okumada Olmaması
- **Belirti:** `syncToSupabase` fonksiyonu `writeCMSData` içinde çağrılmakta ancak `readCMSData` doğrudan dosya sistemini okumakta; Supabase yapılandırılmışsa dahi oradan okuma yapmamaktadır.
- **Gerçek Dosya Yolu:** [src/lib/cms-db.ts](file:///Users/macos/Desktop/onpos2/src/lib/cms-db.ts)
- **Satır Aralığı:** L23 - L58 ve L102 - L111
- **Fonksiyon/Bileşen Adı:** `readCMSData()` ve `syncToSupabase()`
- **Beklenen Davranış:** Eğer kalıcı bir veritabanı (Supabase/Postgres) varsa, `readCMSData` önce veritabanındaki `settings` tablosundan aktif temayı okumalıdır.
- **Gerçek Davranış:** `readCMSData` yalnızca `DB_FILE` okur, Supabase'e hiç bakmaz.
- **Önerilen Düzeltme:** `readCMSData` ve `writeCMSData` fonksiyonları çift yönlü (read + write) DB ve Cookie desteği ile güçlendirilmelidir.
- **Risk:** Sıfır.
