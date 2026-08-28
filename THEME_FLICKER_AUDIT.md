# THEME_FLICKER_AUDIT — Tema Kırpışma (Flicker) Kök Neden Denetim Raporu

**Tarih:** 2026-08-28  
**İncelenen Dosyalar:**
- `src/app/layout.tsx` (L64-96)
- `src/themes/ThemeDispatcher.tsx` (L1-37)
- `src/components/CMSHydrator.tsx` (L1-105)
- `src/lib/cms-store.ts` (L114-168)
- `src/lib/default-data.ts` (L1-38)
- `src/lib/cms-repository.ts` (L23-45)
- `src/app/page.tsx` (L1-17)
- `src/themes/fintech/FintechHomePage.tsx` (L1-54)
- `src/themes/existing/ExistingHomePage.tsx` (L1-50)

---

## 1. 16 Maddelik Kök Neden Denetimi ve Kesin Kanıtlar

### 1. İlk server HTML hangi tema ile üretiliyor?
- **Kanıt:** [src/app/layout.tsx](file:///Users/macos/Desktop/onpos2/src/app/layout.tsx#L72-L89) içinde `<html>` tag'i `data-theme="theme-fintech"` (veya DB değeri) ile oluşturulmaktadır.
- **Kritik Uyuşmazlık:** Ancak `<body>` içindeki sayfa içeriği [src/themes/ThemeDispatcher.tsx](file:///Users/macos/Desktop/onpos2/src/themes/ThemeDispatcher.tsx#L12-L36) üzerinden **HER ZAMAN `ExistingHomePage` (`theme-existing`)** olarak üretilmektedir.
- **Neden:** `ThemeDispatcher` sunucuda render edilirken `useCMSStore()`'un varsayılan initial state'ini (`defaultCMSData.settings.themeId = 'theme-existing'`) okumaktadır.

### 2. `layout.tsx` temayı nereden okuyor?
- **Kanıt:** [src/app/layout.tsx](file:///Users/macos/Desktop/onpos2/src/app/layout.tsx#L74-L79):
  `dbTheme = await getActiveThemeAsync()`, `themeCookie = cookieStore.get("paypos_theme_id")?.value`.
- **Eksiklik:** `layout.tsx` temayı DB'den okumakta ancak bu `initialTheme` değerini `ThemeDispatcher`'a veya `useCMSStore`'a prop / provider ile **aktarmamaktadır**.

### 3. `ThemeDispatcher` ilk render’da hangi değeri kullanıyor?
- **Kanıt:** [src/themes/ThemeDispatcher.tsx](file:///Users/macos/Desktop/onpos2/src/themes/ThemeDispatcher.tsx#L13-L16):
  `const { settings } = useCMSStore();`
  `let activeTheme: ThemeId = (settings?.themeId === 'theme-fintech') ? 'theme-fintech' : 'theme-existing';`
- `settings.themeId` ilk anda `defaultCMSData`'dan geldiği için `activeTheme` daima `'theme-existing'` değerini almaktadır.

### 4. Zustand store ilk state olarak hangi temayı atıyor?
- **Kanıt:** [src/lib/cms-store.ts](file:///Users/macos/Desktop/onpos2/src/lib/cms-store.ts#L114-L115) `create<CMSStoreState>((set, get) => ({ ...defaultCMSData, ... }))` ve [src/lib/default-data.ts](file:///Users/macos/Desktop/onpos2/src/lib/default-data.ts#L29):
  `themeId: 'theme-existing'` sabit değeri atanmaktadır.

### 5. Client hydration sırasında store server’dan gelen temayı eziyor mu?
- **Kanıt:** Evet. Sunucu `<html>` seviyesinde `theme-fintech` üretse bile, client tarafında JS çalıştığı anda Zustand store belleğinde `theme-existing` ile başlar ve ilk hydration bu değerle tamamlanır.

### 6. API’den gelen settings cevabı ilk render’dan sonra renderer’ı değiştiriyor mu?
- **Kanıt:** [src/components/CMSHydrator.tsx](file:///Users/macos/Desktop/onpos2/src/components/CMSHydrator.tsx#L26-L28) ve [src/lib/cms-store.ts](file:///Users/macos/Desktop/onpos2/src/lib/cms-store.ts#L143-L167):
  Sayfa yüklendikten sonra `CMSHydrator` `fetchCMSData()` çağırır. 100-300ms sonra `/api/cms/all` cevabı geldiğinde `set({ ...data })` çalışır ve `ThemeDispatcher` re-render olarak `ExistingHomePage`'i unmount edip `FintechHomePage`'i mount eder. Bu durum kullanıcının gözü önünde belirgin bir sıçrama (flicker) yaratır.

### 7. Cookie ile DB çelişirse hangisi kazanıyor?
- **Kanıt:** `layout.tsx` L79'da `initialTheme = dbTheme || cookie` denmektedir. Ancak `ThemeDispatcher` ikisini de doğrudan dinlemediği için ilk render'da default state (`theme-existing`), ardından API'den gelen DB cevabı kazanmaktadır.

### 8. `data-theme` attribute ile gerçek React renderer aynı değeri mi kullanıyor?
- **Kanıt:** HAYIR! İlk HTML çıktısında `<html data-theme="theme-fintech">` (Koyu arka plan stili) varken, gövdede `<ExistingHomePage />` (Beyaz klasik tema bileşenleri) bulunmaktadır.

### 9. Farklı public route’lar aynı tema kaynağını mı kullanıyor?
- **Kanıt:** Evet. `src/app/page.tsx`, `src/app/pos-cihazlari/page.tsx`, `src/app/hizmetler/page.tsx`, `src/app/cozumler/page.tsx`, `src/app/blog/page.tsx`, `src/app/projeler/page.tsx` vb. tüm route'lar `ThemeDispatcher` kullanmaktadır ve hepsi aynı yarış durumuna (race condition) maruz kalmaktadır.

### 10. `loading.tsx`, Suspense veya fallback kısa süreli eski temayı render ediyor mu?
- **Kanıt:** Özel bir `loading.tsx` yoktur; ancak `ThemeDispatcher` veri gelene kadar varsayılan olarak `existing` temasını render etmektedir.

### 11. `theme-existing` fallback’i veri henüz gelmediğinde kullanıcıya gösteriliyor mu?
- **Kanıt:** Evet. [src/themes/ThemeDispatcher.tsx](file:///Users/macos/Desktop/onpos2/src/themes/ThemeDispatcher.tsx#L16-L35) satırlarında `settings?.themeId` API'den güncellenene kadar `existing` JSX ağacı gösterilmektedir.

### 12. SSR ve client HTML arasında hydration mismatch var mı?
- **Kanıt:** SSR anında `ThemeDispatcher` `ExistingHomePage` ürettiği ve client ilk hydration anında da Zustand `theme-existing` ile başladığı için React hydration hatası fırlatmamakta; ancak görsel olarak 150ms sonra ikinci bir render ile tüm sayfa değişmektedir.

### 13. Birden fazla `ThemeDispatcher`, ThemeProvider veya tema state’i var mı?
- **Kanıt:** Tek bir `ThemeDispatcher` bileşeni vardır; ancak tema bilgisi 4 bağımsız noktada ayrı ayrı tutulmaktadır:
  1. `RootLayout` sunucu değişkeni (`initialTheme`)
  2. `<html>` `data-theme` DOM attribute
  3. `paypos_theme_id` HTTP Cookie
  4. `useCMSStore` Zustand client state

### 14. CSS’de transition veya animation temalar arası geçiş hissi oluşturuyor mu?
- **Kanıt:** [src/app/globals.css](file:///Users/macos/Desktop/onpos2/src/app/globals.css) ve [src/components/CMSHydrator.tsx](file:///Users/macos/Desktop/onpos2/src/components/CMSHydrator.tsx#L31-L95) içinde `--primary-color` ve layout density değişkenleri DOM'a enjekte edildiğinde element stilleri anlık olarak yeniden hesaplanmaktadır.

### 15. `useEffect` içinde theme state’i sonradan değiştiriliyor mu?
- **Kanıt:** [src/components/CMSHydrator.tsx](file:///Users/macos/Desktop/onpos2/src/components/CMSHydrator.tsx#L26-L28) satırında `useEffect` -> `fetchCMSData()` -> `set({ settings })` akışı ile tema sonradan değiştirilmektedir.

### 16. Public site build-time statik HTML ile runtime DB değerini karıştırıyor mu?
- **Kanıt:** Sayfalar `cookies()` ve dynamic API nedeniyle dinamik SSR'dır; ancak client component olan `ThemeDispatcher` server'daki runtime DB değerini doğrudan alamadığı için build-time statik `defaultCMSData`'ya düşmektedir.
