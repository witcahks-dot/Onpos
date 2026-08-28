# THEME_SINGLE_SOURCE_PLAN — Tek Tema Kaynağı ve Sıfır Flicker Çözüm Planı

**Tarih:** 2026-08-28  
**Hedef:** Sayfa açılışında tek bir tema değerinin (DB'den okunan gerçek aktif tema) sunucudan istemciye tek kaynak (Single Source of Truth) olarak aktarılması ve hydration sırasındaki flicker'ın tamamen ortadan kaldırılması.

---

## 1. Mimari Tasarım İlkeleri

1. **Server-to-Client Initial State Enjeksiyonu:**
   - `RootLayout` sunucuda `await getActiveThemeAsync()` ve `await getCMSDataAsync()` ile DB'den güncel `settings` (veya `initialTheme`) değerini okur.
   - Bu değer, bir `ThemeHydrator` / `StoreInitializer` bileşeni ile ilk HTML render anında doğrudan Zustand store'un başlangıç state'ine ve React Context'e enjekte edilir.
   - Böylece `useCMSStore.getState().settings.themeId` istemcide JS belleği oluştuğu ilk milisaniyede zaten doğru tema (`theme-fintech`) ile başlar; asla `defaultCMSData`'daki eski `'theme-existing'` değerine düşmez.

2. **`ThemeDispatcher` Server-Aware Olması:**
   - `ThemeDispatcher`, prop olarak veya Context üzerinden `initialTheme` değerini alır veya store ilk state'inde doğru tema bulunduğu için ilk SSR ve ilk hydration render'ında doğrudan `<FintechHomePage />` üretir.
   - Asla geçici olarak `<ExistingHomePage />` render etmez.

3. **Gereksiz Section Re-render ve Unmount Önleme:**
   - Client API fetch (`fetchCMSData()`) tamamlandığında DB'den dönen tema ile store'daki ilk tema zaten birebir aynı (`theme-fintech`) olacağı için `ThemeDispatcher` sayfayı unmount etmez, DOM ağacında hiçbir sıçrama veya titreşme yaşanmaz.

4. **Kusursuz Dynamic SSR Çıktısı:**
   - HTML ilk frame: `<html data-theme="theme-fintech">` + Gövde: `<FintechThemeShell> ... </FintechThemeShell>`.
   - CSS, HTML ve JS baştan sona %100 uyumlu tek bir tema olarak açılır.

---

## 2. Uygulanacak Dosya Değişiklikleri

### 1. `src/components/CMSHydrator.tsx`
- Sunucudan gelen `initialSettings` veya `initialTheme` verisini prop olarak alıp store'u hydration öncesinde ilk render'da senkronize eden güvenli `StoreInitializer` yapısına dönüştürülür.

### 2. `src/app/layout.tsx`
- Sunucuda okunan `initialTheme` ve `initialSettings` değerini `CMSHydrator` üzerinden alt bileşenlere ve store'a enjekte eder.

### 3. `src/themes/ThemeDispatcher.tsx`
- İlk render anında store'un doğrulanmış başlangıç temasını ve `data-theme` attribute'ünü esas alır; hiçbir koşulda sahte fallback render etmez.

### 4. `src/lib/cms-store.ts`
- `setInitialTheme` / `hydrateInitialData` metodu eklenerek sunucu verisinin ilk render'da store'a tek seferlik ve anında yazılması sağlanır.
